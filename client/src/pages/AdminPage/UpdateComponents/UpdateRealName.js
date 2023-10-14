import React, { useState } from 'react';
import { updateHero } from '../../../api/heroApi';

const UpdateRealName = (props) => {
    const {id, nickname, realName, catchPhrase, description, imagePath, Powers, Predictions, Superimages } = props.hero;

    const [newRealName, setNewRealName] = useState('');

    const handleRealNameChange = (event) => {
        setNewRealName(event.target.value);
    }

    const handleRealNameSave = async () => {
        try {
            const updateData = {"realName": newRealName}
            const serverResponse = await updateHero(updateData, id);
            await props.showHero();
            setNewRealName('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='update-realName'>
            <h1>{realName}</h1>
            <label>
                <span>Редагувати справжнє ім'я: </span>
                <input placeholder="Введіть нове ім'я"
                value={newRealName}
                onChange={handleRealNameChange}/>
            </label>
            <button onClick={handleRealNameSave}>Save</button>
        </div>
    );
}

export default UpdateRealName;
