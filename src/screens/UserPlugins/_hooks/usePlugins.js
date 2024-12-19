import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";

export const usePlugins = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [currentPlugin, setCurrentPlugin] = useState("");

  const toggle = (plugin) => {
    setModal(!modal);
    setCurrentPlugin(plugin);
  };

  useEffect(() => {
    dispatch(setTitle("Plugins"));
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };
  return { handleCategorySelect, toggle, currentPlugin, modal };
};
