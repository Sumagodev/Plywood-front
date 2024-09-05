import axios from "axios";
import { url } from "./url.service";



export const getCountriesApi = async (query) => {
    return axios.get(`${url}/country?${query}`)
}

export const getStateByCountryApi = async (query) => {
    return axios.get(`${url}/state?${query}`)
}

export const getCityByStateApi = async (query) => {
    return axios.get(`${url}/city?${query}`)
}