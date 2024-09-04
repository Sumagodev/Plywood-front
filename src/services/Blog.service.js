import axios from "axios"
import { url } from "./url.service"

const serverUrl = `${url}/blog`

export const addBlogApi = async (formData) => {
    return axios.post(`${serverUrl}/`, formData)
}
export const editBlogApi = async (id, formData) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData)
}
export const getBlogBySlugApi = async (id) => {
    return axios.get(`${serverUrl}/getById/${id}`)
}
export const deleteBlogApi = async (id) => {
    return axios.delete(`${serverUrl}/deleteById/${id}`)
}

export const getBlogApi = async (query) => {
    return axios.get(`${serverUrl}/?${query}`)
}

export const getBlogBySlug = async (slug) => {
    return axios.get(`${serverUrl}/getById/:${slug}`)
}