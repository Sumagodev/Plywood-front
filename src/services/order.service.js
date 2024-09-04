import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/order`;

export const createOrder = async () => {
  return await axiosApiInstance.post(`${serverUrl}/createOrder`);
};

export const orderCallback = async (obj, id) => {
  return await axiosApiInstance.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};

export const getOrderByUserId = async () => {
  return await axiosApiInstance.get(`${serverUrl}/getAllActiveOrdersByUserId`);
};

export const getOrderById = async (id) => {
  return await axiosApiInstance.get(`${serverUrl}/getOrderById/${id}`);
};
export const createCodOrder = async () => {
  return await axiosApiInstance.post(`${serverUrl}/createCodOrder`);
};
