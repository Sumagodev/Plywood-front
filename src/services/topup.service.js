import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/topup`;


export const getAlltopups = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/?${query}&perPage=${1500}`)
}

