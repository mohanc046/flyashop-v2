import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as LogoDarkIcon } from "../../assets/images/logos/logo-blue.svg";
import { ReactComponent as LogoWhiteIcon } from "../../assets/images/logos/logo-white.svg";

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {isDarkMode || activeSidebarBg !== "white" ? (
        <>
          <LogoWhiteIcon width={150} />
        </>
      ) : (
        <>
          <LogoDarkIcon width={150} />
        </>
      )}
    </Link>
  );
};

export default Logo;
