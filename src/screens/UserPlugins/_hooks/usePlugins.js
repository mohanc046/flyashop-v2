import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { config } from "../../../config";
import whatsAppLogo from "../../../assets/images/whatsapp-logo.svg";

export const usePlugins = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [currentPlugin, setCurrentPlugin] = useState("");

  const toggle = (plugin) => {
    setModal(!modal);
    setCurrentPlugin(plugin);
  };

  const PluginConfig = [
    {
      title: "Tawk.To : Live Chat",
      description:
        "Offer 24/7 customer support and monitor site visitors with a live chat feature.",
      image: config.TAWK_TO_LOGO
    },
    {
      title: "Google Analytics",
      description:
        "Enable Instagram to set up a Business page where you can create and share your shop.",
      image: config.GOOGLE_ANALYTICS
    },
    {
      title: "WhatsApp",
      description:
        "Enable WhatsApp to set up a Business profile where you can create and share your shop.",
      image: whatsAppLogo
    }
  ];

  useEffect(() => {
    dispatch(setTitle("Plugins"));
  }, []);

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };
  return { handleCategorySelect, toggle, currentPlugin, modal, PluginConfig };
};
