import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { getServiceURL } from "../../../utils/utils";
import { getAuthToken, getStoreInfo } from "../../../utils/_hooks";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";
import { showToast } from "../../../store/reducers/toasterSlice";
import _ from "lodash";

export const useOnlineShop = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState(Array(6).fill(null));

  useEffect(() => {
    fetchBannerDetails();
  }, []);

  const fetchBannerDetails = async () => {
    dispatch(showSpinner());
    try {
      const params = new URLSearchParams({
        businessName: getStoreInfo()?.store.businessName || ""
      });

      const response = await fetch(`${getServiceURL()}/store/fetchStoreByBusinessName?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
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

  useEffect(() => {
    dispatch(setTitle("Customize Online Shop"));
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  return {
    handleCategorySelect,
    fileUpload,
    banners
  };
};
