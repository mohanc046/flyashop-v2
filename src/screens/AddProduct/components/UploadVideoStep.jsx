import { notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import _ from "lodash";
import { getServiceURL } from "../../../utils/utils";
import { getAuthToken } from "../../../utils/_hooks";
import VideoRecorder from "react-video-recorder";
import { config } from "../../../config";
import "../AddProduct.scss";
const MAX_VIDEO_SIZE_MB = 99; // Maximum size in MB

const UploadVideoStep = () => {
  const [state, setState] = useState({
    screen: "ADD_PRODUCT_DETAILS",
    tabName: "Add Products",
    categoryList: [],
    colors: "",
    quantity: "",
    sizes: "",
    gstPercentage: "",
    barcode: "",
    shippingWeight: "",
    discountPrice: "",
    price: "",
    productName: "",
    productDescription: "",
    category: "",
    products: [],
    isUpload: true
  });

  const blobToFile = (theBlob, fileName = "video.mp4") => {
    // Ensure the filename ends with .mp4
    if (!fileName.endsWith(".mp4")) {
      fileName += ".mp4";
    }

    // Get the size of the Blob in bytes
    const videoSizeInBytes = theBlob.size; // Size in bytes
    const videoSizeInMB = videoSizeInBytes / (1024 * 1024); // Convert to MB

    console.log("Video Size:", videoSizeInBytes, "bytes");
    console.log("Video Size:", videoSizeInMB.toFixed(2), "MB"); // Log size in MB

    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: "video/mp4" // Explicitly set the MIME type to mp4
    });
  };

  const handleMaxFileLimitReached = (videoSizeInMB) => {
    alert(`Video size exceeds the 10MB limit. Current size: ${videoSizeInMB.toFixed(2)} MB`);
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0]; // Get the selected file

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    if (fileSizeInMB > MAX_VIDEO_SIZE_MB) {
      // Show an error toast or alert
      handleMaxFileLimitReached(fileSizeInMB);
      return; // Prevent upload
    }

    const formData = new FormData();
    formData.append("image", file);
    await fileUpload(formData);
  };
  const handleRecordedUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      await fileUpload(formData);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileUpload = async (formData) => {
    try {
      // updateState({ isLoaderStatus: true });

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

        // updateProductState({ productImage, productDescription: transcript });

        // updateState({ isLoaderStatus: false });

        notification.open({
          type: "success",
          message: "Product Image uploaded successful!"
        });

        setState({
          ...state,
          screen: "ADD_PRODUCT_DETAILS",
          productDescription: transcript
        });
      } else {
        notification.open({
          type: "warning",
          message: "Facing issue with image upload!"
        });
      }
    } catch (error) {
    } finally {
      // updateState({ isLoaderStatus: false });
    }
  };

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
          <input onChange={handleFileUpload} className="file-input" type="file" />
        </div>

        <div className="button-div" onClick={() => setState({ ...state, isUpload: false })}>
          Record
        </div>

        {/* <span className="paste-link">Paste Link</span> */}
      </div>

      {!state.isUpload ? (
        <div>
          <VideoRecorder
            isFlipped={true}
            showReplayControls={true}
            type={"video/mp4"}
            onRecordingComplete={async (videoBlob) => {
              const videoSizeInMB = videoBlob.size / (1024 * 1024); // Calculate size in MB

              if (videoSizeInMB > MAX_VIDEO_SIZE_MB) {
                // Show an error toast
                handleMaxFileLimitReached(videoSizeInMB);
                return; // Prevent upload
              }

              handleRecordedUpload(blobToFile(videoBlob));
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UploadVideoStep;
