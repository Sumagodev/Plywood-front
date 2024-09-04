import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/flashSales`;


export const createFlashSales = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/`, obj)
}

export const getAllFlashSales = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/getFlashSales?`+query)
}

export const getAllFlashSalesbyUserId = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getFlashSalesByUserId/${id}`)
}

export const getFlashSalebyId = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${id}`)
}

export const updateFlashSalebyId = async (id, obj) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, obj)
}

export const deleteFlashSalebyId = async (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`)
}



