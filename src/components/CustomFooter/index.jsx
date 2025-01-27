import React from "react";
import { CFooter, CButton } from "@coreui/react";
import ".././sideNav.css";
import "./index.css";
import { isMobileView } from "../../utils/utils";

const CustomFooter = (props) => {
  return isMobileView() ? (
    <CFooter className="footerCustom mobile">
      <div className="pricingFooterLayout">
        <div className="ms-1 FORT12 startTrialLabelStyle">{`Start free trail now!`}</div>
        <CButton className="button startTrialButtonColor" onClick={() => {}}>
          <label className="starTextLabel">{"START 14-DAYS FREE TRIAL"}</label>
        </CButton>
      </div>
    </CFooter>
  ) : (
    <></>
  );
};

export default React.memo(CustomFooter);
