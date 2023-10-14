import React, { useState } from 'react';
import { addHeroAvatar } from '../../../api/heroApi';
import { Formik, Form } from 'formik';

const UpdateAvatar = (props) => {
    const {id, nickname, realName, catchPhrase, description, imagePath, Powers, Predictions, Superimages } = props.hero;

    const [avatar, setAvatar] = useState([]);

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
    );
}

export default UpdateAvatar;
