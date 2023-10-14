export const removePowerFromHero = async (updateData, heroId) => {
    const url = `http://localhost:5000/api/powers/remove/${heroId}`;
    console.log(updateData)
    const requestOptions = {
        method: 'DELETE',
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

export const addPowersToHero = async (updateData, heroId) => {
    const url = `http://localhost:5000/api/powers/add/${heroId}`;
    console.log(updateData)
    const requestOptions = {
        method: 'POST',
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