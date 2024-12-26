import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";
import HorizontalHeader from "./header/HorizontalHeader";
import HorizontalSidebar from "./sidebars/horizontal/HorizontalSidebar";
import Toaster from "../components/Toaster/Toaster";
import Spinner from "../components/Spinner/Spinner";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { getStoreInfo } from "../utils/_hooks";

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);

  const shopInformation = getStoreInfo();

  const { pluginConfig = {} } = shopInformation.store;
  const {
    propertyId = null,
    widgetId = null,
    isActive: isTawkActive = false
  } = pluginConfig.tawk || {};
  const {
    phoneNumber = null,
    isActive: isWhatsAppActive = false,
    userName = ""
  } = pluginConfig.whatsApp || {};

  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? "isMiniSidebar" : ""}`}>
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ""
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? "showSidebar" : ""}`}>
            <Sidebar showMobileSidebar={showMobileSidebar} />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? "fixedTopbar" : ""}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ""}

          <Container fluid className="p-0">
            <div>
              <Outlet />
              <Toaster />
              <Spinner />
            </div>
            {/* <Customizer className={customizerToggle ? "showCustomizer" : ""} /> */}
            {showMobileSidebar || customizerToggle ? <div className="sidebarOverlay" /> : ""}
          </Container>
        </div>

        <div className="position-absolute">
          {isTawkActive && propertyId && widgetId && (
            <TawkMessengerReact propertyId={propertyId} widgetId={widgetId} />
          )}

          {/* Floating WhatsApp Integration */}
          {isWhatsAppActive && phoneNumber && userName && (
            <FloatingWhatsApp phoneNumber={phoneNumber} accountName={userName} />
          )}
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
