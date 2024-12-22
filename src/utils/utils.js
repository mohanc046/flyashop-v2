import _ from "lodash";

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
