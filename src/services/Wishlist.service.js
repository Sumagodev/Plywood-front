import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/wishlist`;

export const getWishList = async () => {
    return axiosApiInstance.get(`${serverUrl}/getWishlist`)
}

export const AddToWishlist = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/AddToWishlist`, obj)
}

export const RemoveItemFromWishlist = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/RemoveItemFromWishlist`, obj)
}
