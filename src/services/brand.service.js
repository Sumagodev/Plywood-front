import axios from "axios";

import { url } from './url.service'
// import axios from 'axios'

const serverUrl = `${url}/brand`

export const addBrandApi = (formData) => {
  return axios.post(`${serverUrl}/`, formData)
}

export const getBrandApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
  return axios.get(`${serverUrl}/getById/${id}`)
}

export const deleteBrandApi = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateBrandApi = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

