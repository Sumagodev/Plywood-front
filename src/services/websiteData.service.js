// websiteData
import axios from "axios";
import { url } from "./url.service";

const serverUrl = `${url}/websiteData`


export const getWebsiteData = async () => {
    return axios.get(`${serverUrl}/`)
}



export const getSeoBySlugApi = async () => {
    return axios.get(`${url}/seo`)
}
