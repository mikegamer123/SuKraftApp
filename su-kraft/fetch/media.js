import {getJWT} from "../hooks/getJWT";
import {environment} from "../enviroments/enviroment";

const {apiUrl}= environment;

export const getMedia = async (id) => {
    return fetch(`${apiUrl}/media/get/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
        }
    ).then(x => x);
}