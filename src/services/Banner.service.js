import axios from "axios";
import { url,InstagramApiUrl } from "./url.service";

let serverUrl = `${url}/banner`;


export const getAllBanners = async (query) => {
    return axios.get(`${serverUrl}/getBanner?${query}`)
}


export const getBrands = async (query) => {
    return axios.get(`${url}/brand`)
}

export const subscribeNewsletter = async (fomdata) => {
    return axios.post(`${url}/subscription/subscribe`,fomdata)
}

export const getAlltestimonials = async (query) => {
    return axios.get(`${url}/testimonial/getTestimonials?${query}`)
}

export const getTestimonialById = async (id) => {
    return axios.get(`${url}/testimonial/getById/${id}`)
}

export const getNewsLetterApi = async (query) => {
    return axios.get(`${url}/newsLetter?${query}`)
}

export const getSystemSetting = (query) => {
    return axios.get(`${url}/systemSetting/get?${query}`);
};

export const getTeams = (query) => {
    return axios.get(`${url}/team/getTeams?${query}`);
}




