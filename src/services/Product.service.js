import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/product`;

export const AddProduct = async (obj) => {
  return axiosApiInstance.post(`${serverUrl}/`, obj);
};

export const getAllProducts = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/?${query}`);
};

export const getAllProductsBySupplierId = async (id) => {
  return axiosApiInstance.get(`${serverUrl}/getAllProductsBySupplierId/${id}`);
};

export const getProductById = async (id) => {
  return axiosApiInstance.get(`${serverUrl}/getProductById/${id}`);
};

export const getProductReviews = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/getReviewOfProduct?${query}`);
};

export const updateProductApi = (formData, id) => {
  return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getSimilarProducts = async (id) => {
  return axiosApiInstance.get(`${serverUrl}/getSimilarProducts/${id}`);
};

export const getrecommondedProducts = async (id) => {
  return axiosApiInstance.get(`${serverUrl}`);
};
export const deleteProductbyId = async (id) => {
  return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`);
};

export const searchProduct = async (query) => {
  return axiosApiInstance.get(`${serverUrl}/searchProductWithQuery?${query}`);
};
