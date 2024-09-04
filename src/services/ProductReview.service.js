import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/productReview`;


export const addReview = async (obj) => {
    return axios.post(`${serverUrl}/`, obj)
}


export const getReviewForProduct = async (query) => {
    return axios.get(`${serverUrl}/getReviewForProduct?${query}`)
}