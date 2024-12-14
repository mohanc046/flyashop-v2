import React from "react";
import { Navbar, Nav, Button, Container, NavItem, Input } from "reactstrap";
import { Menu } from "react-feather";
import { useSelector, useDispatch } from "react-redux";

import { ToggleMobileSidebar } from "../../store/customizer/CustomizerSlice";

import HorizontalLogo from "../logo/HorizontalLogo";

const HorizontalHeader = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  // const isMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const dispatch = useDispatch();
  const title = useSelector((state) => state.headerTitle.title);

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="shadow HorizontalTopbar p-0"
    >
      <Container fluid className="d-flex align-items-center boxContainer">
        {/******************************/}
        {/**********Logo**********/}
        {/******************************/}
        <div className="pe-4 py-3 ">
          <HorizontalLogo />
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}

        <Nav className="me-auto" navbar>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <Menu size={22} />
          </Button>
          <NavItem className="app-search d-none d-lg-flex">
            <Input
              id="txt-srch"
              name="search"
              placeholder="Search & Enter"
              className="rounded-pill"
              type="text"
            />
          </NavItem>
        </Nav>
        <Container fluid className="boxContainer">
          <h5>{title}</h5>
        </Container>
      </Container>
    </Navbar>
  );
};

export default HorizontalHeader;
