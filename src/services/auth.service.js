import jwt_decode from "jwt-decode"

export const saveToken = (token) => {
    localStorage.setItem("cloud_bazar_auth_token", token)
}

export const getDecodedToken = () => {
    let token = localStorage.getItem("cloud_bazar_auth_token")
    if (!token) {
        return null
    }
    let decoded = jwt_decode(token)
    return decoded
}

export const getToken = () => {
    let token = localStorage.getItem("cloud_bazar_auth_token")
    return token
}

export const deleteToken = () => {
    localStorage.removeItem("cloud_bazar_auth_token")
}