import axios from "axios";
import { url } from "./url.service";
let serverUrl = `${url}/state`;


export const getStates = async () => {
    return axios.get(`${serverUrl}/`)
}
