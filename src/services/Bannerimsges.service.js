import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/BannerImage`;


export const AddBannerImage = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/postbanner`, obj)
}

export const getAllBannerImages = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/?userId=${query}`)
}
export const getForBannerImagesHomepage = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getbanner`)
}


export const getBannerImageById = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getById/${id}`)
}


export const deleteBannerImage = async (id) => {
    return axiosApiInstance.delete(`${serverUrl}/deletebanner/${id}`)
}


export const updateBannerImageApi = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

