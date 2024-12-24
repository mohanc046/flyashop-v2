import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const useOnlineShop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Customize Online Shop"));
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  return {
    handleCategorySelect
  };
};
