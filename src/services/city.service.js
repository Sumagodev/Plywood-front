import axios from 'axios'
import { url } from "./url.service";

const serverUrl = `${url}/city`



export const getCityApi = (query) => {
  return axios.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
  return axios.get(`${serverUrl}/getById/${id}`)
}


