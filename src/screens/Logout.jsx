import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../store/reducers/tokenSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("storeInfo");
    dispatch(clearToken());
    sessionStorage.clear();
    navigate("/landing");
  }, [navigate]);

  return null;
};

export default Logout;
