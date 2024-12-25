import React, { useState } from "react";
import { notification } from "antd";
import axios from "axios";
import VideoRecorder from "react-video-recorder";
import _ from "lodash";
import { getServiceURL } from "../../../utils/utils";
import { getAuthToken } from "../../../utils/_hooks";
import { config } from "../../../config";
import "../AddProduct.scss";
import { useDispatch } from "react-redux";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";
import { showToast } from "../../../store/reducers/toasterSlice";

const MAX_VIDEO_SIZE_MB = 99; // Maximum size in MB

const UploadVideoStep = ({ updateStore, setActiveStep }) => {
  const dispatch = useDispatch();
  const [isUpload, setIsUpload] = useState(true);

  const blobToFile = (theBlob, fileName = "video.mp4") => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: "video/mp4"
    });
  };

  const handleMaxFileLimitReached = (videoSizeInMB) => {
    alert(
      `Video size exceeds the ${MAX_VIDEO_SIZE_MB}MB limit. Current size: ${videoSizeInMB.toFixed(2)} MB`
    );
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > MAX_VIDEO_SIZE_MB) {
      handleMaxFileLimitReached(fileSizeInMB);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    await fileUpload(formData);
  };

  const handleRecordedUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    await fileUpload(formData);
  };

  const fileUpload = async (formData) => {
    try {
      dispatch(showSpinner());
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

        let transcript = "";

        try {
          const videoResponse = await axios.post(`${URL}/fileupload/extract-video-text`, {
            videoUrl: productImage
          });

          transcript = videoResponse?.data?.transcript || ""; // Use empty string if no transcript is returned
        } catch (extractionError) {
          console.warn("Video extraction failed:", extractionError);
          dispatch(
            showToast({
              type: "error",
              title: "Error",
              message: "Video extraction failed. Continuing with default values."
            })
          );
        }

        updateStore({
          productDescription: transcript,
          productImage: productImage
        });

        // Automatically move to the next step after upload
        setActiveStep((prevStep) => prevStep + 1);
        dispatch(hideSpinner());
      } else {
        notification.open({
          type: "warning",
          message: "Facing issue with image upload!"
        });
      }
    } catch (error) {
      dispatch(hideSpinner());
      console.error("Error uploading file:", error);
      notification.open({
        type: "error",
        message: "An error occurred while uploading the file."
      });
    } finally {
      dispatch(hideSpinner());
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

        <div className="button-div" onClick={() => setIsUpload(false)}>
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
                handleMaxFileLimitReached(videoSizeInMB);
                return;
              }
              handleRecordedUpload(blobToFile(videoBlob));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadVideoStep;
