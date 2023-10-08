import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registerUser = async (data) => {
    const response = await $host.post('api/users/registration', {...data})
    localStorage.setItem('token', response.data.token)
    return response.json();
}

export const loginUser = async (data) => {
    const response = await $host.post('api/users/login', {...data})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token);
}

export const check = async () => {
    const response = await $authHost.get('api/users/auth')
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}