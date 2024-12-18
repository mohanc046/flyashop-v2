import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const usePlugins = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Plugins"));
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };
  return { handleCategorySelect };
};
