import React, { useState } from 'react';
import { addPrediction, deletePrediction } from '../../../api/predictionApi';

const UpdatePredictions = (props) => {
    const { id, Predictions } = props.hero;

    const [newPrediction, setNewPrediction] = useState('');

    const handlePredictionDelete = async (predictionId) => {
        await deletePrediction(predictionId);
        await props.showHero();
    }

    const handlePredictionChange = (event) => {
        setNewPrediction(event.target.value);
    }

    const handlePredictionSave = async () => {
        try {
            const updateData = {"description": newPrediction}
            const serverResponse = await addPrediction(updateData, id);
            await props.showHero();
            setNewPrediction('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='update-predictions'>
            <h3>Передбачення від супергероя: </h3>
            <ul>
                {Predictions ? Predictions.map((prediction) => (
                    <li key={prediction.id}>{prediction.description}
                        <button onClick={() => handlePredictionDelete(prediction.id)}>Видалити</button>
                    </li>
                ))
                : null }
            </ul>

            <h3>Додати нове передбачення: </h3>
            <label>
                <span></span>
                <input placeholder='Введіть нове передбачення'
                value={newPrediction}
                onChange={handlePredictionChange}/>
            </label>
            <button onClick={handlePredictionSave}>Save</button>
        </div>
    );
}

export default UpdatePredictions;
