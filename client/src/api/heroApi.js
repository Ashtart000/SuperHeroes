import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getAllHeroes = async () => {
    const url = 'http://localhost:5000/api/superheroes/';

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getOneHeroRandom = async () => {
    const url = 'http://localhost:5000/api/superheroes/today';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getAllImages = async () => {
    const url = 'http://localhost:5000/api/images';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getAllPowers = async () => {
    const url = 'http://localhost:5000/api/powers';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const createHero = async (formData) => {
    const response = await fetch ('http://localhost:5000/api/superheroes', {
        method: 'POST',
        body: formData
    })

    if(response.status === 400) {
        const error = await response.json();
        console.log(error);
        return Promise.reject(error);
    }

    return response.json();
}