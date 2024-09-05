import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/userRequirement`;

export const addUserRequirement = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/addUserRequirement`, obj)
}

