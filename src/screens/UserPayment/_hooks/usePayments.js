import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const usePayments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Payments"));
  }, []);

  return {};
};
