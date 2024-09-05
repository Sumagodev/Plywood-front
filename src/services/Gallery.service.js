import axios from "axios";

import { url } from "./url.service";

const serverUrl = url + "/gallery";


export const getGallery = (query) => {
    return axios.get(`${serverUrl}/getGallery?${query}`);
};
