import { notification } from "antd";
import axios from "axios";
import React, { Component } from "react";
import _ from "lodash";
import { getServiceURL } from "../../../utils/utils";
import { getAuthToken } from "../../../utils/_hooks";
import VideoRecorder from "react-video-recorder";
import { config } from "../../../config";
import "../AddProduct.scss";

const MAX_VIDEO_SIZE_MB = 99; // Maximum size in MB

class UploadVideoStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUploaded: false,
      isUpload: true
    };
  }

  blobToFile = (theBlob, fileName = "video.mp4") => {
    if (!fileName.endsWith(".mp4")) {
      fileName += ".mp4";
    }

    const videoSizeInBytes = theBlob.size;
    const videoSizeInMB = videoSizeInBytes / (1024 * 1024);

    console.log("Video Size:", videoSizeInBytes, "bytes");
    console.log("Video Size:", videoSizeInMB.toFixed(2), "MB");

    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: "video/mp4"
    });
  };

  handleMaxFileLimitReached = (videoSizeInMB) => {
    alert(`Video size exceeds the 10MB limit. Current size: ${videoSizeInMB.toFixed(2)} MB`);
  };

  handleFileUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > MAX_VIDEO_SIZE_MB) {
      this.handleMaxFileLimitReached(fileSizeInMB);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    await this.fileUpload(formData);
  };
  handleRecordedUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      await this.fileUpload(formData);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  fileUpload = async (formData) => {
    try {
      const URL = getServiceURL();

      const response = await fetch(`${URL}/fileupload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      });

      if (response.ok) {
        const responseJSON = await response.json();
        const productImage = _.get(responseJSON, "imagePath");

        let videoResponse = await axios.post(`${URL}/fileupload/extract-video-text`, {
          videoUrl: productImage
        });

        const { message = "", transcript = "", status = false } = videoResponse?.data || {};

        notification.open({
          type: status ? "success" : "error",
          message: message
        });

        this.setState({
          screen: "ADD_PRODUCT_DETAILS",
          productDescription: transcript
        });

        notification.open({
          type: "success",
          message: "Product Image uploaded successfully!"
        });
      } else {
        notification.open({
          type: "warning",
          message: "Facing issue with image upload!"
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  isValidated = () => {
    if (this.state.videoUploaded) {
      this.props.updateStore(this.state);
      return true;
    }
    return false;
  };

  render() {
    const { isUpload } = this.state;

    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-3">
        <div className="addProductDraggerContainer">
          <img className="upload-icon" src={config.UPLOAD_ICON} alt="icon" />
          <label className="addProductDraggerLabel">Drag & Drop Files Here</label>
          <label className="addProductDraggerLabel" style={{ marginTop: "-10px" }}>
            Or
          </label>
          <div className="position-relative">
            <button>Browse</button>
            <input onChange={this.handleFileUpload} className="file-input" type="file" />
          </div>

          <div className="button-div" onClick={() => this.setState({ isUpload: false })}>
            Record
          </div>
        </div>

        {!isUpload && (
          <div>
            <VideoRecorder
              isFlipped={true}
              showReplayControls={true}
              type={"video/mp4"}
              onRecordingComplete={(videoBlob) => {
                const videoSizeInMB = videoBlob.size / (1024 * 1024);
                if (videoSizeInMB > MAX_VIDEO_SIZE_MB) {
                  this.handleMaxFileLimitReached(videoSizeInMB);
                  return;
                }
                this.handleRecordedUpload(this.blobToFile(videoBlob));
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default UploadVideoStep;
