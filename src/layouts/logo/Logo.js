import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as LogoDarkIcon } from "../../assets/images/logos/logo-blue.svg";
import { ReactComponent as LogoWhiteIcon } from "../../assets/images/logos/logo-white.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  const navigate = useNavigate();
  return (
    <Link className="d-flex align-items-center gap-2" onClick={() => navigate('/home')}>
      {isDarkMode || activeSidebarBg !== "white" ? (
        <>
          <LogoWhiteIcon width={130} />
        </>
      ) : (
        <>
          <LogoDarkIcon width={130} />
        </>
      )}
    </Link>
  );
};

export default Logo;
