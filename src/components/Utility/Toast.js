import { toastError, toastSuccess } from "../../utils/toastutill";

export const successToast = (message) => {
    toastSuccess(message)
}


export const errorToast = (err) => {
    toastError(err)


} 