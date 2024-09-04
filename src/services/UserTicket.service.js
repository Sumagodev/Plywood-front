import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/userTicket`;


export const createTicket = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/`, obj)
}

export const getTicketsbyUserId = async (query) => {
    return axiosApiInstance.get(`${serverUrl}/?${query}`)
}



