import {size, values} from "lodash";

let result = {
    isValid: false,
    message: "",
}

export function validFormProfile(data){
    result.isValid = false;

    if (!isValidFields(data)){
        result.message = "Todos los campos son obligatorios";
        return result;
    }

    result.isValid = true
    return result;
}

function isValidFields(data){
    let validCount = 0;
    let sizeFields = size(data);

    values(data).some(value => {
        value && validCount++
        return null
    });

    return validCount === sizeFields
}
