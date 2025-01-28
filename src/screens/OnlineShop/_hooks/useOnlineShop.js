import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { getServiceURL } from "../../../utils/utils";
import { getAuthToken, getStoreInfo } from "../../../utils/_hooks";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";
import { showToast } from "../../../store/reducers/toasterSlice";
import _ from "lodash";
import axios from "axios";
import { FIXED_VALUES } from "../../../utils/constants";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

export const useOnlineShop = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState(Array(6).fill(null));

  useEffect(() => {
    fetchBannerDetails();
  }, []);

  useEffect(() => {
    dispatch(setTitle("Customize Shop"));
  }, []);

  const fetchBannerDetails = async () => {
    dispatch(showSpinner());
    try {
      const response = await fetch(`${getServiceURL()}/store/fetchStoreByBusinessName`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          businessName: getStoreInfo()?.store.domainName || ""
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      const { bannerConfig } = data || {};

      if (bannerConfig) {
        setBanners(bannerConfig.list || Array(6).fill(null));
      } else {
        dispatch(
          showToast({
            type: "error",
            title: "Error",
            message: "Banner details are not configured"
          })
        );
      }
    } catch (error) {
      console.error("Error fetching banner details:", error);
      dispatch(
        showToast({
          type: "error",
          title: "Error",
          message: "Banner details are not configured"
        })
      );
    } finally {
      dispatch(hideSpinner());
    }
  };

  const fileUpload = async (event, index) => {
    try {
      dispatch(showSpinner());
      const files = event.target.files;
      if (!files || files.length === 0) {
        throw new Error("No files selected for upload.");
      }

      const formData = new FormData();
      formData.append("image", files[0]);

      const response = await fetch(`${getServiceURL()}/fileupload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJSON = await response.json();
      const bannerURL = _.get(responseJSON, "imagePath");
      if (!bannerURL) {
        throw new Error("Invalid response: Missing imagePath.");
      }

      setBanners((prevBanners) => {
        const updatedBanners = [...prevBanners];
        updatedBanners[index] = bannerURL;
        return updatedBanners;
      });

      dispatch(
        showToast({
          type: "success",
          title: "Success",
          message: "Banner uploaded successfully"
        })
      );
    } catch (error) {
      console.error("Error uploading banner:", error);
      dispatch(
        showToast({
          type: "error",
          title: "Error",
          message: "Failed to upload banner. Please try again."
        })
      );
    } finally {
      dispatch(hideSpinner());
    }
  };

  const saveBanner = async () => {
    dispatch(showSpinner());
    try {
      const payload = {
        bannerConfig: {
          enable: false,
          list: banners
        },
        businessName: getStoreInfo()?.store.domainName
      };

      const response = await fetch(`${getServiceURL()}/store/update/store`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const { statusCode = "500", message = "Issue while updating store" } = data || {};

      dispatch(
        showToast({
          type: statusCode === SUCCESS ? "success" : "error",
          title: statusCode === SUCCESS ? "Success" : "Error",
          message: statusCode === SUCCESS ? "Updated Successfully" : message
        })
      );
    } catch (error) {
    } finally {
      dispatch(hideSpinner());
    }
  };

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  return {
    handleCategorySelect,
    fileUpload,
    banners,
    saveBanner
  };
};
