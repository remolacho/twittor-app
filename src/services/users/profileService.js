import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "./auth"

export function profileService(userId) {
    const token = getTokenApi();
    const url = `${API_HOST}/${V1_API}/users/profile?userId=${userId}`;

    return fetch(url, params(token)).then(response => {
        if (response.status === 403){
            return { success: false, message: "El usuario no puede acceder a esta informacion" };
        }

        if (response.status === 404){
            return { success: false, message: "El usuario no existe" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })

}

function params(token) {
    return {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    }
}