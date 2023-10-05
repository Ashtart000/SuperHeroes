import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import { getAllPowers } from '../../api';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const initialState = {
    nickname: '',
    realName: '',
    description: '',
    catchPhrase: '',
    superAvatar: [],
    powers: [],
    newPower: ''
}

const CreateHeroModal = (props) => {
    const [heroPowers, addHeroPowers] = useState([]);
    const [newPowers, setNewPowers] = useState([]); 
    const [onePower, setOnePower] = useState(''); 

    const handleAddPower = (event) => {
        event.preventDefault();
        if (onePower.trim() !== '') {
            setNewPowers([...newPowers, onePower]); 
         setOnePower(''); // Очищує поле вводу
        }
    };

    const handleDeletePower = (event, index) => {
        event.preventDefault();
        const updatedPowers = [...newPowers];
        updatedPowers.splice(index, 1); // Видаляємо елемент за індексом
        setNewPowers(updatedPowers); 
    }

    const getPowers = async () => {
        const allPowers = await getAllPowers();
        addHeroPowers(allPowers);
    }

    useEffect(() => {
        getPowers()
    }, [])

    const handleSubmitToFormik = async (values, actions) => {
        console.log(values)
    }

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
        >
            <article className='add-hero-wrapper'>
            <Formik 
                initialValues={initialState} 
                onSubmit={handleSubmitToFormik}>
                    {({isSubmitting, setFieldValue}) => {
                        return (
                            <>
                            <Form className='add-hero-form'>
                                <Field placeholder='Nickname' name='nickname'/>
                                <Field placeholder='Real name' name='realName'/>
                                <Field placeholder='Description' name='description'/>
                                <Field placeholder='Catch phrase' name='catchPhrase'/>
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
                                <p>Choose a superpower (or multiple using CTRL)</p>
                                <Field as="select"
                                    name="powers"
                                    multiple>
                                {heroPowers.map((power, index) => (
                                <option key={index} value={power.name}>
                                {power.name}
                                </option>
                                ))}
                                </Field>

                            <input
                                placeholder='Or add new superpower'
                                value={onePower}
                                onChange={(e) => setOnePower(e.target.value)} 
                            />
                            <button onClick={handleAddPower}>Add Power</button>
                            <p>New superpower to add</p>
                            <ul>
                                {newPowers.map((power, index) => (
                                    <li key={index}>{power} <button onClick={handleDeletePower}>Delete</button></li>
                                ))}
                            </ul>
                            

                            <button type='submit'>Add Superhero</button>
                            </Form>
                            </>
                        )
                    }}
                </Formik>
                </article>
                <button onClick={() => props.setIsModalOpen(false)}>Cancel</button>
        </Modal>
        
    );
}

export default CreateHeroModal;
