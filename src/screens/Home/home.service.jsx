import axios from "axios";
import { getServiceURL } from "../../utils/utils";
import { FIXED_VALUES } from "../../utils/constants";
import { notification } from "antd";
import _ from "lodash";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

export const authenticateGoogleLogin = async ({ credential, navigateToDashboard }) => {
  try {
    // actions.updateStore({ isLoaderStatus: true });

    let URL = getServiceURL();

    let loginResponse = await axios.post(`${URL}/user/auth/google/callback`, { token: credential });

    const {
      data: {
        statusCode = "500",
        message = "Login successful!",
        authToken = "",
        userInfo = {},
        existingStoreInfo = []
      }
    } = loginResponse;

    if (statusCode === SUCCESS) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("storeInfo", JSON.stringify(_.get(existingStoreInfo, "[0]", {})));

      notification.open({ type: "success", description: message });

      !_.isEmpty(existingStoreInfo) && navigateToDashboard();

      return;
    }

    notification.open({ type: "warning", description: message });
  } catch (error) {
    // actions.updateStore({ isLoaderStatus: false });
  }
};
