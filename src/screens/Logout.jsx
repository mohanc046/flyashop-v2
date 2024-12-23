import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("storeInfo");
    sessionStorage.clear();
    navigate("/landing");
  }, [navigate]);

  return null;
};

export default Logout;
