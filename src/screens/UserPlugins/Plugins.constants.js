import whatsAppLogo from "../../assets/images/whatsapp-logo.svg";
import { config } from "../../config";

export const pluginsCategories = [
  "All",
  "Manage Store",
  "Shipping",
  "Marketing",
  "Customer Support"
];

export const pluginDetails = [
  {
    title: "Tawk.To : Live Chat",
    description: "Offer 24/7 customer support and monitor site visitors with a live chat feature.",
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
