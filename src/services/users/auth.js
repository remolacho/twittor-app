import {JWT} from "../../utils/variablesApi"
import jwtDecode from "jwt-decode";

export function setTokenApi(token){
    localStorage.setItem(JWT, token);
}

export function userLoggedApi(){
    const token = getTokenApi()

    if (!token){
        return null
    }

    if (isExpiredToken(token)){
       return logoutUser();
    }

    return jwtDecode(token);
}

export function getTokenApi() {
    return localStorage.getItem(JWT);
}

export function logoutUser(){
    localStorage.removeItem(JWT);
    return null
}

export function isExpiredToken(token){
    const { exp } = jwtDecode(token);
    const expired = exp * 1000;
    const timeOut = expired - Date.now();

    return timeOut < 0
}
