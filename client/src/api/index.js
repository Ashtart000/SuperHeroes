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