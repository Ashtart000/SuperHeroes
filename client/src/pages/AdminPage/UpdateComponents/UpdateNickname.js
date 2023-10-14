import React, { useState } from 'react';
import { updateHero } from '../../../api/heroApi';

const UpdateNickname = (props) => {
    const {id, nickname, realName, catchPhrase, description, imagePath, Powers, Predictions, Superimages } = props.hero;

    const [newNickname, setNewNickname] = useState('');

    const handleNicknameChange = (event) => {
        setNewNickname(event.target.value);
    }

    const handleNicknameSave = async () => {
        try {
            const updateData = {"nickname": newNickname}
            const serverResponse = await updateHero(updateData, id);
            await props.showHero();
            setNewNickname('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='update-nickname'>
            <h1>Нікнейм: {nickname}</h1>
            <label>
                <span>Редагувати нікнейм: </span>
                <input placeholder='Введіть новий нікнейм'
                value={newNickname}
                onChange={handleNicknameChange}/>
            </label>
            <button onClick={handleNicknameSave}>Save</button>
        </div>
    );
}

export default UpdateNickname;
