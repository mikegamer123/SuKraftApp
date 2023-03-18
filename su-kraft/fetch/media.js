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

export const uploadVideo = async (postId, image) => {
    const formData = new FormData();
    const videoData = {
        uri: image, // file uri/path
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
export const createEventImage = async (pic, eventId) => {
    const formData = new FormData();
    const imageData = {
        uri: pic.uri, // file uri/path
        name: pic.fileName, //file name
        type: 'image/jpeg', //file type
    }
    formData.append("image_upload", imageData);
    return fetch(`${apiUrl}/image/event/${eventId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${await getJWT()}`,
            },
            body: formData,
        }
    ).then(x => x);
}