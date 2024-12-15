import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const useHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Home"));
  }, []);
  return {};
};
