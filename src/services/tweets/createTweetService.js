import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "../users/auth";

export function createTweetService(tweet){
    const url = `${API_HOST}/${V1_API}/tweet`;

    return fetch(url, params(tweet)).then(response => {
        if (response.status === 403){
            return { success: false, message: "El usuario no puede acceder a esta informacion" };
        }

        if (response.status === 400){
            return { success: false, message: "Error al crear el twwet" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(tweet) {
    const token = getTokenApi();

    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ message: tweet }),
    }
}
