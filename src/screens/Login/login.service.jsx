import axios from "axios";
import { getServiceURL, getUserType } from "../../utils/utils";
import { FIXED_VALUES } from "../../utils/constants";
import { notification } from "antd";
import _ from "lodash";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

export const initiateLoginWithEmail = async ({ email, setState }) => {
  try {
    const userRole = getUserType();

    let URL = getServiceURL();

    let loginResponse = await axios.post(`${URL}/user/login`, { email, userRole });

    const {
      data: { statusCode = "500", message = "Initiate OTP verification failed!" }
    } = loginResponse;

    if (statusCode === SUCCESS) {
      setState((prevState) => ({
        ...prevState,
        title: "Enter your verification code",
        screen: "OTP",
        email: email
      }));

      notification.open({ type: "success", description: message });
    } else {
      notification.open({ type: "warning", description: message });
    }
  } catch (error) {
    // actions.updateStore({ isLoaderEnabled: false });
  }
};

export const verifyLoginOTP = async ({ state, navigateToDashboard }) => {
  try {
    let URL = getServiceURL();

    let loginResponse = await axios.post(`${URL}/user/verify`, {
      email: state.email,
      otp: state.otp
    });

    console.log(loginResponse);
    const {
      data: {
        statusCode = "500",
        message = "OTP verification failed!",
        authToken,
        userInfo,
        existingStoreInfo
      }
    } = loginResponse;

    if (statusCode === SUCCESS) {
      const { role } = userInfo;

      localStorage.setItem("token", authToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      if (role.includes("BUYER")) {
        localStorage.setItem("storeInfo", JSON.stringify(_.get(existingStoreInfo, "[0]", {})));
        navigateToDashboard();

        return;
      } else {
        navigateToDashboard();
      }

      notification.open({ type: "success", description: message });
    } else {
      notification.open({ type: "warning", description: message });
    }

    // actions.updateStore({ isLoaderEnabled: false });
  } catch (error) {
    console.log(error);
    // actions.updateStore({ isLoaderEnabled: false });
  } finally {
    // actions.updateStore({ isLoaderEnabled: false });
  }
};

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
      //!_.isEmpty(existingStoreInfo) && navigateToDashboard();
      navigateToDashboard();

      return;
    }

    notification.open({ type: "warning", description: message });
  } catch (error) {
    // actions.updateStore({ isLoaderStatus: false });
  }
};

export const authenticateFaceBookLogin = async ({ credential, navigateToDashboard }) => {
  try {
    // actions.updateStore({ isLoaderStatus: true });

    let URL = getServiceURL();

    let loginResponse = await axios.post(`${URL}/user/auth/facebook/callback`, {
      token: credential
    });

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
