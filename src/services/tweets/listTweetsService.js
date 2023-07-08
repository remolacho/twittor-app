import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "../users/auth";

function getUrl(type, userId, numPage){
    if (type === "profile"){
        return `${API_HOST}/${V1_API}/tweets?userId=${userId}&page=${numPage}`;
    }

    return `${API_HOST}/${V1_API}/followers/tweets?page=${numPage}`;
}

export function listTweetsService(type, userId, numPage){
    const url = getUrl(type, userId, numPage)

    return fetch(url, params()).then(response => {
        if (response.status === 403){
            return { success: false, message: "El usuario no puede acceder a esta informacion" };
        }

        if (response.status === 400 || response.status === 404){
            return { success: false, message: "Error al buscar los twwets" };
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
