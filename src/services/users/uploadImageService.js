import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "./auth";

export function uploadImageService(file, section) {
    return fetch(url(section), params(file, section)).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function url(section){
    return `${API_HOST}/${V1_API}/users/${section}-upload`;
}

function params(file, section) {
    const token = getTokenApi();
    const formData = new FormData();

    formData.append(section, file);

    return {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: formData,
    }
}
