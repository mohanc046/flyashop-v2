import _ from "lodash";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import currencyFormatter from "currency-formatter";

export const getUserType = () => {
  let baseURL = window.location.pathname;

  return `${baseURL}`.includes("user") ? "BUYER" : "STORE OWNER";
};

export const isMobileView = () => {
  return window.innerWidth <= 768;
};

export const getServiceURL = () => {
  let SERVICE_URL = "http://localhost:3005/v1";

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

export const getFormattedCurrency = (value) => {
  return currencyFormatter.format(value, { code: "INR" });
};

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

export function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString); // Convert string to Date object
  const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month with leading zero
  const year = date.getFullYear(); // Get year
  return `${day}-${month}-${year}`; // Return formatted string
}

export const generateXlsxReport = (data, fileName) => {
  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.aoa_to_sheet(data);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  const buffer = new ArrayBuffer(wbout.length);

  const view = new Uint8Array(buffer);

  for (let i = 0; i < wbout.length; i++) {
    view[i] = wbout.charCodeAt(i) & 0xff;
  }

  const blob = new Blob([buffer], { type: "application/octet-stream" });

  saveAs(blob, `${fileName}.xlsx`);
};
