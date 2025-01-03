import React from "react";

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CImage } from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";

import SimpleBar from "simplebar-react";

import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import { mobile_nav_config, nav_config, getBuyerLeftNavConfig } from "../config/_nav";

// import { useStoreState, useStoreActions } from "../store/hooks";

import "./sideNav.css";


import _ from "lodash";
import { config } from "../config";
import { getUserProfile } from "../utils/_hooks";
import { isMobileView } from "../utils/utils";

const AppSidebar = () => {
  // const sidebarShow = useStoreState((state) => state.navBar.data.sidebarShow);

  const userInfo = getUserProfile();

  // const metaDataStore = useStoreState((state) => state.metaData.data);

  const { storeBasePath } = "metaDataStore" || {};

  const { role = [] } = userInfo || {};

  const { businessName = "" } = _.get(userInfo, "existingStoreInfo[0].store", {});

  // const unfoldable = useStoreState((state) => state.navBar.data.unfoldable);

  // const updateState = useStoreActions((state) => state.navBar.updateState);

  let navConfig = isMobileView() ? mobile_nav_config : nav_config;

  let desktopLeftNavConfig = role.includes("BUYER")
    ? getBuyerLeftNavConfig(storeBasePath)
    : mobile_nav_config;

  return (
    <CSidebar
      position="fixed"
      // unfoldable={unfoldable}
      // visible={sidebarShow}
      className="app-side-bar"
      onVisibleChange={(visible) => {
        // updateState({ sidebarShow: visible })
      }}>
      {isMobileView() ? (
        <>
          <CSidebarBrand
            className={`d-md-flex DefaultBackGround flex-column align-items-start border-right left-nav-logo-container`}
            to="/">
            <CImage
              className="margin-logo-right left-nav-icon"
              src={config.SHOP_ICON}
              height={48}
            />
            <span className="shop-name"> {businessName ? businessName : "Shop name"} </span>
            <span className="edit-profile"> Edit Profile </span>
          </CSidebarBrand>
          <CSidebarNav>
            <SimpleBar>
              <AppSidebarNav items={navConfig} />
            </SimpleBar>
          </CSidebarNav>
          <CSidebarToggler
            className="d-none d-lg-flex"
            // onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })}
          />
        </>
      ) : (
        <>
          <CSidebarBrand className={`d-none d-md-flex DefaultBackGround border-right`} to="/">
            <CImage className="margin-logo-right" src={config.LOGO_BLUE} height={48} />
          </CSidebarBrand>
          <CSidebarNav>
            <SimpleBar>
              <AppSidebarNav items={desktopLeftNavConfig} />
            </SimpleBar>
          </CSidebarNav>
          <CSidebarToggler
            className="d-none d-lg-flex"
            // onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })}
          />
        </>
      )}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
