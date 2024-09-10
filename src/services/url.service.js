// local urlyar
// export const url = "http://localhost:3016";
export const adminUrl = "https://admin.plywoodbazar.com";
// 
// production url
export const url = "https://api.plywoodbazar.com";
// export const url = "http://13.232.176.232/api";

export const generateImageUrl = (path) => {
  return `${url}/uploads/${path}`;
};
