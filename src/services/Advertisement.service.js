import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/advertisement`;


export const AddAdvertisement = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/`, obj)
}

export const getAllAdvertisements = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/?userId=${query}`)
}
export const getForHomepage = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/getForHomepage?${query}`)
}


export const getAdvertisementById = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${id}`)
}


export const deleteAdvertisement = async (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`)
}


export const updateAdvertisementApi = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}


// https://api.plywoodbazar.com/v2/uploads/1727869169525.jpeg
// https://api.plywoodbazar.com/v2/uploads/1727428682804.jpeg
