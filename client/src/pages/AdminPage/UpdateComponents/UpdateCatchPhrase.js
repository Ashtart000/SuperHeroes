import React, { useState } from 'react';
import { updateHero } from '../../../api/heroApi';

const UpdateCatchPhrase = (props) => {
    const {id, nickname, realName, catchPhrase, description, imagePath, Powers, Predictions, Superimages } = props.hero;

    const [newCatchPhrase, setNewCatchPhrase] = useState('');

    const handleCatchPhraseChange = (event) => {
        setNewCatchPhrase(event.target.value);
    }

    const handleCatchPhraseSave = async () => {
        try {
            const updateData = {"catchPhrase": newCatchPhrase}
            const serverResponse = await updateHero(updateData, id);
            await props.showHero();
            setNewCatchPhrase('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='update-catchPhrase'>
            <h1>Крилата фраза: {catchPhrase}</h1>
            <label>
                <span>Редагувати крилату фразу: </span>
                <input placeholder='Введіть нову крилату фразу'
                value={newCatchPhrase}
                onChange={handleCatchPhraseChange}/>
            </label>
            <button onClick={handleCatchPhraseSave}>Save</button>
        </div>
    );
}

export default UpdateCatchPhrase;
