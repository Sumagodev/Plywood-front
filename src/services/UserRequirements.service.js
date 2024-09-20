import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/userRequirement`;

export const addUserRequirement = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/addUserRequirement`, obj)
}



let serverUrl1 = `${url}/quickenqury`;

export const addquickenquiry = async (obj) => {
    return axiosApiInstance.post(`${serverUrl1}/addquickenquiry`, obj)
}

