import axios from "axios";
import { url } from "./url.service";



export const addNewsLetter = async (obj) => {
    return axios.post(`${url}/newsLetter`, obj)
}
