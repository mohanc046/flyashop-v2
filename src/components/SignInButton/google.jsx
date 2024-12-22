import React from "react";
import _ from "lodash";
import { CImage } from "@coreui/react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { authenticateGoogleLogin } from "../../screens/Login/login.service";
import { getStoreInfo, getUserProfile } from "../../utils/_hooks";

export const CustomButton = (props) => {
  const { onSuccess, onFailure } = props;

  const login = useGoogleLogin({
    onSuccess: onSuccess,

    onFailure: onFailure
  });

  return (
    <span onClick={() => login()}>
      <CImage align="center" src={config.GOOGLE} height={50} width={50} />
    </span>
  );
};

function GoogleOAuthLogin({ changeState }) {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    const storeInfo = getStoreInfo();
    console.log("store:", storeInfo);
    if (storeInfo?.store) {
      navigate("/home");
    } else {
      changeState((prevState) => ({
        ...prevState,
        screen: "CREATE_STORE"
      }));
    }
  };

  const onSuccess = async (response) => {
    const token = _.get(response, "access_token", "");
    await authenticateGoogleLogin({ credential: token, navigateToDashboard });
  };

  const onFailure = (res) => {
    alert(`Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <CustomButton onSuccess={onSuccess} onFailure={onFailure} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleOAuthLogin;
