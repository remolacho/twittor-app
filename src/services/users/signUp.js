import {API_HOST, V1_API} from "../../utils/variablesApi"

export function signUp(formData) {
    const url = `${API_HOST}/${V1_API}/users/sign-up`;
    const user = parseUser(formData);

    return fetch(url, params(user)).then(response => {
        if (response.status === 400){
            return { success: false, message: "El usuario ya existe" };
        }

        return response.json();
    }).then(result =>{
        return result;
    }).catch(() => {
        return { success: false, message: "Error en el servidor" };
    })
}

function parseUser(formData) {
    const user = {
        ...formData,
        email: formData.email.toLowerCase(),
        birthday: new Date(),
    };

    delete user.repeatPassword;

    return user;
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
