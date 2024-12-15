import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const useOnlineShop = () => {
  const dispatch = useDispatch();
  const categories = ["Header & Favicon", "Banners", "Pages", "Fonts", "Advanced"];

  useEffect(() => {
    dispatch(setTitle("Customize Online Shop"));
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  return {
    categories,
    handleCategorySelect
  };
};
