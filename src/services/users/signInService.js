import {API_HOST, V1_API} from "../../utils/variablesApi"

export function signInService(formData) {
    const url = `${API_HOST}/${V1_API}/users/sign-in`;
    const user = parseUser(formData);

    return fetch(url, params(user)).then(response => {
        if (response.status === 403){
            return { success: false, message: "Usuario o contraseña no valido" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function parseUser(formData) {
    return {
        ...formData,
        email: formData.email.toLowerCase(),
    };
}

function params(user) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }
}
