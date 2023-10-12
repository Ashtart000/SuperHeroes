import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_HEROES_ROUTE } from '../../utils/consts';
import { Formik, Form } from 'formik';
import './styles.css';
import { addHeroAvatar } from '../../api/heroApi';

const UpdateHeroCard = (props) => {
    const {id, nickname, realName, catchPhrase, descriprion, imagePath, Powers, Predictions, Superimages } = props.hero;
    const navigate = useNavigate();

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

            <h1>{nickname}</h1>
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
                                // multiple
                                onChange={(event) => {
                                    const files = [...event.target.files]
                                    setFieldValue("superAvatar", files)
                                }}
                            />
                            <button type="submit" disabled={isSubmitting}>Add or replace avatar</button>
                        </Form>
                    )}
                </Formik>
            </div>
            
        </article>    
        </>
    );
}

export default UpdateHeroCard;
