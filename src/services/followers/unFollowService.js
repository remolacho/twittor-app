import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "../users/auth";

export function unFollowService(followUserId){
    const url = `${API_HOST}/${V1_API}/followers?followUserId=${followUserId}`;

    return fetch(url, params()).then(response => {
        if (response.status === 403){
            return { success: false, message: "El usuario no puede acceder a esta informacion" };
        }

        if (response.status === 404){
            return { success: false, message: "No se encontro el usuario" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params() {
    const token = getTokenApi();

    return {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    }
}
