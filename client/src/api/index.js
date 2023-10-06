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

export const registerUser = async (data) => {
    const response = await fetch ('http://localhost:5000/api/users/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

export const loginUser = async (data) => {
    const response = await fetch ('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

export const createHero = async (formData) => {
    const response = await fetch ('http://localhost:5000/api/superheroes', {
        method: 'POST',
        body: formData
    })

    return response.json();
}