import React from "react";
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Button, Container } from "reactstrap";
import * as Icon from "react-feather";

import {
  ToggleMiniSidebar,
  ToggleMobileSidebar,
} from "../../store/customizer/CustomizerSlice";
import Logo from "../logo/Logo";
import "./Header.scss";

const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();
  const title = useSelector((state) => state.headerTitle.title);

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="topbar"
    >
      {/******************************/}
      {/**********Toggle Buttons**********/}
      {/******************************/}
      <div className="d-flex flex-row align-items-center">
        <Button
          color={topbarColor}
          className="d-none d-lg-block"
          onClick={() => dispatch(ToggleMiniSidebar())}
        >
          <Icon.Menu size={22} />
        </Button>
        {/* <div href="/" className="d-sm-flex d-lg-none">
          <Logo />
        </div> */}
        <Button
          color={topbarColor}
          className="d-sm-block d-lg-none"
          onClick={() => dispatch(ToggleMobileSidebar())}
        >
          <Icon.Menu size={22} />
        </Button>
        <h5 className="title">{title}</h5>
      </div>
    </Navbar>
  );
};

export default Header;
