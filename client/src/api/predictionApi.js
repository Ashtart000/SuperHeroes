export const deletePrediction = async (predictionId) => {
    const url = `http://localhost:5000/api/predictions/${predictionId}`;

    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(predictionId)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
}

export const addPrediction = async (updateData, id) => {
    const url = 'http://localhost:5000/api/predictions';

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(updateData)
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
}