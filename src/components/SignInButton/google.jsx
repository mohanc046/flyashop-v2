import React from "react";
import _ from "lodash";
import { CImage } from "@coreui/react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { getStoreInfo } from "../../utils/_hooks";
import { LoginService } from "../../screens/Login/login.service";

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
  const { authenticateGoogleLogin } = LoginService();

  const navigateToDashboard = () => {
    const storeInfo = getStoreInfo();

    if (!_.isEmpty(storeInfo)) {
      navigate("/home");
    } else {
      changeState((prevState) => {
        return {
          ...prevState,
          screen: "CREATE_STORE"
        };
      });
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
