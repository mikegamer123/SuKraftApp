import {environment} from "../enviroments/enviroment";
import {getJWT} from "../hooks/getJWT";

const {apiUrl}= environment;

export const getReviewsByProductId = async (id) => {
    return fetch(`${apiUrl}/reviews/getByProduct/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getJWT()}`,
            },
        }
    ).then(x => x);
}

export const createReview = (data) => {
    return fetch(`${apiUrl}/reviews/create`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
    ).then(x => x);
}

