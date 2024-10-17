import axios from "axios";
import { axiosApiInstance } from "../App";
import { url } from "./url.service";

let serverUrl = `${url}/usersubscription`;


export const buySubscription = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/buySubscription`, obj)
}
export const buySubscriptionforhdfc = async (obj) => {
    return axiosApiInstance.post(`${serverUrl}/initiateJuspayPaymentForSubcription`, obj)
}
export const verifyPayment = async (obj) => {
    return axiosApiInstance.post(`${url}/payments/verifyPayment`, obj)
}
// export const buySubscription = async (obj) => {
//     return axiosApiInstance.post(`${serverUrl}/initiateJuspayPaymentForSubcription`, obj)
// }
export const getAllSubscriptionbyUserId = async () => {
    return axiosApiInstance.get(`${serverUrl}/getAllSubscriptionbyUserId`)
}


export const phonepePaymentStatusCheck = async (id) => {
    return axios.get(`${serverUrl}/phonepePaymentStatusCheck/${id}`)
}


export const usersubscriptionMailId = async (id) => {
    return axios.get(`${serverUrl}/sendMailById/${id}`)
}

