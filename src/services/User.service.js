import axios from "axios";
import { url } from "./url.service";
import jwt_decode from "jwt-decode";
import { axiosApiInstance } from "../App";
let serverUrl = `${url}/users`;

export const registerUser = async (obj) => {
  return axios.post(`${serverUrl}/register/`, obj);
};

export const loginUser = async (obj) => {
  return axios.post(`${serverUrl}/app-login/`, obj);
};

export const sentOtp = async (obj) => {
  return axios.post(`${serverUrl}/sentOtp/`, obj);
};
export const getAllUsers = async (query, cancelToken) => {
  if (!cancelToken || !cancelToken?.token) {
    return axios.get(`${serverUrl}/getAllUsersForWebsite?${query}`);
  } else {
    return axios.get(`${serverUrl}/getAllUsersForWebsite?${query}`, {
      cancelToken: cancelToken?.token,
    });
  }
  return axios.get(`${serverUrl}/getAllUsersForWebsite/?${query}`);
};

export const checkForValidSubscription = async (id) => {
  return axios.get(`${serverUrl}/checkForValidSubscription/${id}`);
};
export const checkForValidSubscriptionAndReturnBoolean = async (id) => {
  return axios.get(
    `${serverUrl}/checkForValidSubscriptionAndReturnBoolean/${id}`
  );
};

export const otpLogin = async (obj) => {
  return axios.post(`${serverUrl}/app-login/`, obj);
};
export const getUserById = async (id) => {
  // let decoded = getDecodedToken()
  return axiosApiInstance.get(`${serverUrl}/getUserById/${id}`);
};

export const searchVendorFromDb = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/searchVendor?${query}`);
};

export const updateUserById = async (id, obj) => {
  return axiosApiInstance.patch(`${serverUrl}/updateUserById/${id}`, obj);
};

export const setToken = (token) => {
  localStorage.setItem("AUTH_TOKEN", token);
};

export const getDecodedToken = () => {
  let token = localStorage.getItem("AUTH_TOKEN");
  if (!token) {
    return 0;
  }
  let decodedToken = jwt_decode(token);
  return decodedToken;
};

export const removeToken = () => {
  localStorage.removeItem("AUTH_TOKEN");
};

export const AddReview = async (obj) => {
  return axiosApiInstance.post(`${url}/productReview/`, obj);
};

export const registerUserFcmToken = async (obj) => {
  return await axiosApiInstance.post(`${serverUrl}/registerUserFcmToken`, obj);
};

export const refreshToken = async (obj) => {
  return axios.post(`${serverUrl}/refreshToken`, obj);
};

export const getUserNotifications = async (obj) => {
  return await axiosApiInstance.get(`${serverUrl}/getUserNotifications${obj}`);
};

export const markReadNotifications = async (obj) => {
  return await axiosApiInstance.get(`${serverUrl}/markedAsRead${obj}`);
};

export const getSalesUsers = async () => {
  return await axiosApiInstance.get(`${serverUrl}/getSalesUsers`);
};
