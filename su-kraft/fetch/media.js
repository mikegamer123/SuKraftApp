import {getJWT} from "../hooks/getJWT";
import {environment} from "../enviroments/enviroment";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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

export const uploadVideo = async (postId, video) => {
    const formData = new FormData();
    const videoData = {
        uri: video, // file uri/path
        name: uuidv4(), //file name
        type: 'video/mp4', //file type
    }
    formData.append("mediaUpload", videoData);
    return fetch(`${apiUrl}/media/posts/${postId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData
        }
    ).then(x => x);
}