import axios from "axios";
import { url } from "./url.service";
import { axiosApiInstance } from "../App";
let serverUrl = `${url}/stateDetail`;


export const getStateDetails = async () => {
    return axiosApiInstance.get(`${serverUrl}/stateDetails`)
}
