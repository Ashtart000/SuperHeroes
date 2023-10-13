import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_HEROES_ROUTE } from '../../utils/consts';
import { Formik, Form } from 'formik';
import './styles.css';
import { addHeroAvatar, deleteHero, updateHero } from '../../api/heroApi';

const UpdateHeroCard = (props) => {
    const {id, nickname, realName, catchPhrase, descriprion, imagePath, Powers, Predictions, Superimages } = props.hero;
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState([]);
    const [newNickname, setNewNickname] = useState('');
    const [newRealName, setNewRealName] = useState('');

    const delSuperHero = async () => {
        await deleteHero(id);
        navigate(ADMIN_HEROES_ROUTE);
    }

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

    const setImageHandler = async (values, actions) => {
        const { setSubmitting } = actions;
        const formData = new FormData();
        values.superAvatar.forEach((file) => {
            formData.append("superAvatar", file)
        })
        
        console.log(...formData)

        try {
            const serverResponse = await addHeroAvatar(formData, id);
            console.log(serverResponse);
            await props.showHero();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
        <button 
            onClick={() => navigate(ADMIN_HEROES_ROUTE)} 
            className='update-button-return'>Return to list of Superheroes</button>
        <article className='update-card-wrapper'>
            <button onClick={delSuperHero}>Delete this Superhero</button>
            <div className='update-nickname'>
                <h1>{nickname}</h1>
                <label>
                    <span>Редагувати нікнейм: </span>
                    <input placeholder='Введіть новий нікнейм'
                    value={newNickname}
                    onChange={handleNicknameChange}/>
                </label>
                <button onClick={handleNicknameSave}>Save</button>
            </div>
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
            <div className='update-avatar'>
                <img src={`http://localhost:5000/${imagePath}`} alt={nickname} className='hero-avatar'/>
                <Formik 
                    initialValues={{superAvatar: []}}
                    onSubmit={setImageHandler}
                >
                    {({isSubmitting, setFieldValue}) => (
                        <Form>
                            <input 
                                type="file" 
                                name="superAvatar" 
                                accept="image/*"                     
                                onChange={(event) => {
                                    const files = [...event.target.files]
                                    setFieldValue("superAvatar", files)
                                    setAvatar(files);
                                }}
                            />
                            <button type="submit" disabled={avatar.length === 0}>
                                Add or replace avatar
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            
        </article>    
        </>
    );
}

export default UpdateHeroCard;
