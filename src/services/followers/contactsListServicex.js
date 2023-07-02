import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "../users/auth";

export function contactsListService(type, numPage, term){
    const url = `${API_HOST}/${V1_API}/users/${type}?page=${numPage}&term=${term}`;

    return fetch(url, params()).then(response => {
        if (response.status === 400){
            return { success: false, message: "No se encontro la lista" };
        }

        if (response.status === 403){
            return { success: false, message: "El usuario no puede acceder a esta informacion" };
        }

        if (response.status === 404){
            return { success: false, message: "No se encontro la lista" };
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
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }
    }
}
