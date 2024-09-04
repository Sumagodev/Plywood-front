import axios from "axios"
import { url } from "./url.service"

const serverUrl = `${url}/blogVideo`

export const addBlogVideoApi = async (formData) => {
    return axios.post(`${serverUrl}/`, formData)
}

export const getBlogVideoApi = async (query) => {
    return axios.get(`${serverUrl}/?${query}`)
}

export const editBlogVideoApi = async (id, formData) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

export const getBlogVideoBySlugApi = async (id, formData) => {
    return axios.get(`${serverUrl}/getById/${id}`, formData)
}

export const deleteBlogVideoApi = async (id) => {
    return axios.delete(`${serverUrl}/deleteById/${id}`)
}


export const getBlogVideoBySlug = async (slug) => {
    return axios.get(`${serverUrl}/getById/:${slug}`)
}

