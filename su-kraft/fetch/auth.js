import {environment} from "../enviroments/enviroment";

const {apiUrl}= environment;

export const loginUser = (formData) => {
    return fetch(
        `${apiUrl}/login`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}

export const registerUser = (formData) => {
    return fetch(
        `${apiUrl}/register`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    ).then(x => x);
}

export const resetPassword = (email) => {
    return fetch(
        `${apiUrl}/forgotPassword`,
        {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email
            }),
        }
    ).then(x => x);
}