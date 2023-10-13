import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getAllHeroes = async (pageNumber) => {
    const limit = 15;
    const offset = limit * (pageNumber - 1);

    const url = `http://localhost:5000/api/superheroes/?limit=${limit}&offset=${offset}`;

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

export const getOneHero = async (heroId) => {
    const url = `http://localhost:5000/api/superheroes/${heroId}`;

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

export const addHeroAvatar = async (image, heroId) => {
    const url = `http://localhost:5000/api/superheroes/avatar/${heroId}`;

    const requestOptions = {
        method: 'PUT',
        body: image
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const deleteHero = async (heroId) => {
    const url = `http://localhost:5000/api/superheroes/${heroId}`;
    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(heroId)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
}

export const updateHero = async (updateData, heroId) => {
    const url = `http://localhost:5000/api/superheroes/${heroId}`;
    console.log(updateData)
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
}