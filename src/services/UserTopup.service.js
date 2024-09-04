import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/userTopup`;


export const buyTopup = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/buyTopup`, obj)
}

export const getAllSubscriptionbyUserId = async () => {
    return axiosApiInstance.get(`${serverUrl}/getAllSubscriptionbyUserId`)
}



