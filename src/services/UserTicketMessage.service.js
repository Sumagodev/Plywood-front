import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/userTicketMessage`;


export const AddTicketMessage = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/`, obj)
}

export const getTicketMessagesbyId = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getTicketMessage/${id}`)
}



