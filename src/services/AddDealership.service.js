import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/dealershipOwnerRoutes`;


export const Adddealership = async (obj) => {
    try {
        console.log("Request Data:", obj); // Log request data
        const response = await axiosApiInstance.post(`${serverUrl}/addDealershipOpportunity`, obj);
        console.log("Response Data:", response.data); // Log response data
        return response;
    } catch (error) {
        console.error("Error in API call:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const Applydealership = async (obj) => {
    try {
        console.log("Request Data:", obj); // Log request data
        const response = await axiosApiInstance.post(`${url}/dealershipUserRoutes/applyForDealershipOpportunitiy`, obj);
        console.log("Response Data:", response.data); // Log response data
        return response;
    } catch (error) {
        console.error("Error in API call:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getAlldealership = async (query) => {
    return axiosApiInstance.get(`${url}/dealershipOwnerRoutes/getDelearshipOpportunities`)
}
// export const getForHomepage = async (query) => {
//     return axiosApiInstance.get(`${serverUrl}/getForHomepage?${query}`)
// }


export const getdealershipById = async (id) => {
    return axiosApiInstance.get(`${serverUrl}/getDelearshipOpportunities/${id}`)
}


export const deletedealership = async (id) => {
    return axiosApiInstance.delete(`${serverUrl}/dealership-owners/${id}`)
}


export const updatedealershipApi = (formData, id) => {
    return axiosApiInstance.patch(`${serverUrl}/dealership-owners/${id}`, formData)
}

