export function getAuthToken() {
  return localStorage.getItem("token");
}

export function getUserProfile() {
  const userInfo = localStorage.getItem("userInfo");
  return JSON.parse(userInfo);
}

export function getStoreInfo() {
  const storeInfo = localStorage.getItem("storeInfo");
  return JSON.parse(storeInfo);
}
