import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const useAddProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Add Product"));
  }, []);

  return {};
};
