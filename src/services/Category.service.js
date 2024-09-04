import axios from "axios";
import { url } from "./url.service";

let serverUrl = `${url}/category`;


export const getAllCategories = async (query) => {
    return axios.get(`${serverUrl}/getCategory/?${query}`)
}


export const getNestedCategories = async (query) => {
    return axios.get(`${serverUrl}/getNestedCategories/?${query}`)
}
export const getChildCategory = async (id) => {
    return axios.get(`${serverUrl}/getChildCategory/${id}`)
}


export const getNameById = async (id) => {
    return axios.get(`${serverUrl}/getNameById/${id}`)
}

export const getNameBySlug = async (id, query = "") => {
    return axios.get(`${serverUrl}/getNameBySlug/${id}?${query}`)
}



