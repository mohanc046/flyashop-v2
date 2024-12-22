import _ from "lodash";
import moment from "moment";

// import jsPDF from "jspdf";

// export const generateProductCatalogPDF = () => {
//   const doc = new jsPDF({
//     format: "A4",
//     unit: "pt"
//   });

//   doc.setFont("Inter-Regular", "normal");

//   let targetReport = document.getElementById("downloadReport-uniqueID");

//   doc.html(targetReport, {
//     async callback(doc) {
//       await doc.save("productList");
//     },
//     width: 600,
//     windowWidth: 600
//   });
// };

export const isMobileView = () => {
  return window.innerWidth <= 768;
};

export const getServiceURL = () => {
  let SERVICE_URL = "https://flyoapi.afras.in/v1";

  let IS_LOCALHOST = `${window.location.hostname}`.includes("localhost");

  if (!IS_LOCALHOST) {
    SERVICE_URL = "https://flyoapi.afras.in/v1";
  }

  return SERVICE_URL;
};

export function isImageUrl(url) {
  return `${url}`?.match(/\.(jpeg|jpg|gif|png|avif|webp)/) != null;
}

export function isVideoUrl(url) {
  return `${url}`?.match(/\.(mp4|webm|ogg|mov)$/i) != null;
}

export const getTimeAgo = (date) => {
  const propsDate = moment(date);

  const now = moment();

  // Calculate the difference in minutes
  const minutesDifference = now.diff(propsDate, "minutes");

  // Calculate the difference in hours
  const hoursDifference = now.diff(propsDate, "hours");

  // Calculate the difference in days
  const daysDifference = now.diff(propsDate, "days");

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
  } else {
    return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  }
};
