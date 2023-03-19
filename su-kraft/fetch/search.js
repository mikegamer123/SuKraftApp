import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const searchProducts = (data) => {
    console.log(`${apiUrl}/products/search?querySearch=${data.querySearch}&categoryID=${data.categoryID}`)
    return fetch(`${apiUrl}/products/search?querySearch=${data.querySearch}&categoryID=${data.categoryID}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}

export const searchProducers = (data) => {
    console.log(`${apiUrl}/sellers/search?querySearch=${data.querySearch}&categoryID=${data.categoryID}`)
    return fetch(`${apiUrl}/sellers/search?querySearch=${data.querySearch}&categoryID=${data.categoryID}`, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }
    ).then(x => x);
}