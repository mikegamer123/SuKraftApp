import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const getSellerById = async (id) => {
    return fetch(`${apiUrl}/sellers/get/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
        }
    ).then(x => x);
}