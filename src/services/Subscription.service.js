import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/subscription`;


export const getAllsubscription = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/?${query}&perPage=${1500}`)
}



