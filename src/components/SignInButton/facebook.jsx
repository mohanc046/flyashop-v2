import React from "react";

import { CImage } from "@coreui/react";
import FacebookLogin from "react-facebook-login";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { LoginService } from "../../screens/Login/login.service";

function FacebookOAuthLogin() {
  const navigate = useNavigate();
  const { authenticateFaceBookLogin } = LoginService();

  const navigateToDashboard = () => {
    navigate("/home");
  };

  const onSuccess = async (response) => {
    const token = _.get(response, "access_token", "");
    await authenticateFaceBookLogin({ credential: token, navigateToDashboard });
  };

  return (
    <div>
      <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={onSuccess}
        containerStyle={{
          padding: 0
        }}
        buttonStyle={{
          backgroundColor: "transparent",
          padding: 0,
          borderColor: "transparent"
        }}
        textButton=""
        icon={<CImage align="center" src={config.FACEBOOK} height={50} width={50} />}
      />
    </div>
  );
}

export default FacebookOAuthLogin;
