import axios from "axios";

import { url } from "./url.service";
import { axiosApiInstance } from "../App";

const serverUrl = url + "/leads";


export const createLead = (obj) => {
    return axiosApiInstance.post(`${serverUrl}/`, obj);
};

export const getLeadsBycreatedById = (id) => {

    return axios.get(`${serverUrl}/getLeadsBycreatedById/${id}`);
};

export const getLeadsById = (id) => {
    return axios.get(`${serverUrl}/getbyId/${id}`);
};
