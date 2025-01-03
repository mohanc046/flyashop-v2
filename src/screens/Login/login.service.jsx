import axios from "axios";
import { getServiceURL, getUserType } from "../../utils/utils";
import { FIXED_VALUES } from "../../utils/constants";
import { notification } from "antd";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { hideSpinner, showSpinner } from "../../store/reducers/spinnerSlice";
import { setToken } from "../../store/reducers/tokenSlice";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

export const LoginService = () => {
  const dispatch = useDispatch();

  const initiateLoginWithEmail = async ({ email, setState }) => {
    try {
      dispatch(showSpinner());
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

        dispatch(hideSpinner());
        notification.open({ type: "success", description: message });
      } else {
        dispatch(hideSpinner());
        notification.open({ type: "warning", description: message });
      }
    } catch (error) {
      dispatch(hideSpinner());
    }
  };

  const verifyLoginOTP = async ({ state, navigateToDashboard }) => {
    try {
      dispatch(showSpinner());
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
          dispatch(hideSpinner());
          return;
        } else {
          dispatch(hideSpinner());
          navigateToDashboard();
        }

        notification.open({ type: "success", description: message });
        dispatch(hideSpinner());
      } else {
        notification.open({ type: "warning", description: message });
        dispatch(hideSpinner());
      }
    } catch (error) {
      console.log(error);
      dispatch(hideSpinner());
    } finally {
      dispatch(hideSpinner());
    }
  };

  const authenticateGoogleLogin = async ({ credential, navigateToDashboard }) => {
    try {
      dispatch(showSpinner());
      let URL = getServiceURL();

      let loginResponse = await axios.post(`${URL}/user/auth/google/callback`, {
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

        dispatch(setToken(authToken));

        notification.open({ type: "success", description: message });
        navigateToDashboard();
        dispatch(hideSpinner());
        return;
      }

      dispatch(hideSpinner());
      notification.open({ type: "warning", description: message });
    } catch (error) {
      dispatch(hideSpinner());
    } finally {
      dispatch(hideSpinner());
    }
  };

  const authenticateFaceBookLogin = async ({ credential, navigateToDashboard }) => {
    try {
      dispatch(showSpinner());
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
        dispatch(hideSpinner());
        !_.isEmpty(existingStoreInfo) && navigateToDashboard();
        return;
      }
      dispatch(hideSpinner());
      notification.open({ type: "warning", description: message });
    } catch (error) {
      dispatch(hideSpinner());
    } finally {
      dispatch(hideSpinner());
    }
  };

  return {
    initiateLoginWithEmail,
    verifyLoginOTP,
    authenticateGoogleLogin,
    authenticateFaceBookLogin
  };
};
