import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/productReview`;


export const addReview = async (obj) => {
    return axios.post(`${serverUrl}/`, obj)
}
export const addvendorReview = async (obj) => {
    return axios.post(`${url}/vendorReview`, obj)
}


export const getReviewForProduct = async (query) => {
    return axios.get(`${serverUrl}/getReviewForProduct?${query}`)
}

export const getReviewForVendor = async (query) => {
    return axios.get(`${url}/vendorReview/getReviewForVendors?${query}`)
}