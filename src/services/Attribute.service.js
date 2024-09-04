import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

const serverUrl = url + "/attribute";


export const getAttribute = (query) => {
    return axiosApiInstance.get(`${serverUrl}/getAttribute?${query}`);
};

