import React, { useState } from 'react';
import { updateHero } from '../../../api/heroApi';

const UpdateDescription = (props) => {
    const {id, nickname, realName, catchPhrase, description, imagePath, Powers, Predictions, Superimages } = props.hero;

    const [newDescription, setNewDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    }

    const handleDescriptionSave = async () => {
        try {
            const updateData = {"description": newDescription}
            const serverResponse = await updateHero(updateData, id);
            await props.showHero();
            setNewDescription('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='update-description'>
            <h3>Опис: {description}</h3>
            <label>
                <span>Редагувати опис: </span>
                <input placeholder='Введіть новий опис'
                value={newDescription}
                onChange={handleDescriptionChange}/>
            </label>
            <button onClick={handleDescriptionSave}>Save</button>
        </div>
    );
}

export default UpdateDescription;
