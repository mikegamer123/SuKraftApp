import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const createPost = (data) => {
    return fetch(`${apiUrl}/posts/create`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerID: data.sellerID,
                description: data.description,
            })
        }
    ).then(x => x);
}

export const getAllPosts = () => {
    return fetch(`${apiUrl}/posts/get`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}