
import {API_HOST, V1_API} from "../../utils/variablesApi"
import {getTokenApi} from "./auth";

export function updateService(formData) {
    const url = `${API_HOST}/${V1_API}/users/update`;

    return fetch(url, params(formData)).then(response => {
        if (response.status === 400){
            return { success: false, message: "No se actualizo el perfil" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function params(user) {
    const token = getTokenApi();

    return {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(user),
    }
}
