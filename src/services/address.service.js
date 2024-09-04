import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/address`;


export const getAddress = async () => {
    return axiosApiInstance.get(`${serverUrl}/getUserAddress`)
}
export const addUserAddress = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/addUserAddress`, obj)
}
export const updateAddressById = async (id, obj) => {
    return axiosApiInstance.patch(`${serverUrl}/updateById/${id}`, obj)
}
export const deleteAddressById = async (id, obj) => {
    return axiosApiInstance.delete(`${serverUrl}/deleteById/${id}`, obj)
}


