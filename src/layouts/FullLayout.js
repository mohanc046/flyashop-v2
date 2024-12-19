import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Customizer from "./customizer/Customizer";
import Sidebar from "./sidebars/vertical/Sidebar";
import HorizontalHeader from "./header/HorizontalHeader";
import HorizontalSidebar from "./sidebars/horizontal/HorizontalSidebar";
import Toaster from "../components/Toaster/Toaster";

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);

  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? "isMiniSidebar" : ""}`}>
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ""
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? "showSidebar" : ""}`}>
            <Sidebar />
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
            </div>
            {/* <Customizer className={customizerToggle ? "showCustomizer" : ""} /> */}
            {showMobileSidebar || customizerToggle ? <div className="sidebarOverlay" /> : ""}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
