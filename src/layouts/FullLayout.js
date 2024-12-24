import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";
import HorizontalHeader from "./header/HorizontalHeader";
import HorizontalSidebar from "./sidebars/horizontal/HorizontalSidebar";
import Toaster from "../components/Toaster/Toaster";
import Spinner from "../components/Spinner/Spinner";

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);

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
      </div>
    </main>
  );
};

export default FullLayout;
