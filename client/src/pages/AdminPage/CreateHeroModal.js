import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import { createHero, getAllPowers } from '../../api/heroApi';
import { FileUploader } from "react-drag-drop-files";

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', padding: '0', textAlign: 'center'},
  };

const fileTypes = ["JPEG", "PNG", "JPG"];

const initialState = {
    nickname: '',
    realName: '',
    description: '',
    catchPhrase: '',
    superAvatar: [],
    powers: []
};

const CreateHeroModal = (props) => {
    const [error, setError] = useState(null);
    const [heroPowers, addHeroPowers] = useState([]);
    const [newPowers, setNewPowers] = useState([]); 
    const [onePower, setOnePower] = useState(''); 
    const [predictions, setPredictions] = useState([]);
    const [onePrediction, setOnePrediction] = useState('');
    //drap-drop
    const [image, setImage] = useState(null);
    const handleChange = (image) => {
      setImage(image);
    };

    const getPowers = async () => {
        const allPowers = await getAllPowers();
        addHeroPowers(allPowers);
    }

    useEffect(() => {
        getPowers()
    }, [])

    const handleAddPower = (event) => {
        event.preventDefault();
        const existPower = heroPowers.some(power => power.name.trim().toLowerCase() === onePower.trim().toLowerCase());
        if(existPower) {          
            setError(`${onePower} is already exists in Power List`);
            setOnePower(''); 
        }
        else {
            setNewPowers([...newPowers, onePower]); 
            setOnePower(''); 
            setError(null);
        }
    };

    const handleDeletePower = (event, index) => {
        event.preventDefault();
        const updatedPowers = [...newPowers];
        updatedPowers.splice(index, 1); 
        setNewPowers(updatedPowers); 
    };

    const handleAddPrediction = (event) => {
        event.preventDefault();
        if (onePrediction.trim() !== '') {
        setPredictions([...predictions, onePrediction]); 
        setOnePrediction(''); 
        }
    };

    const handleDeletePrediction = (event, index) => {
        event.preventDefault();
        const updatedPredictions = [...predictions];
        updatedPredictions.splice(index, 1); 
        setPredictions(updatedPredictions); 
    };

    const handleSubmitToFormik = async (values, actions) => {
        const { setSubmitting } = actions;
        const formData = new FormData();
        values.superAvatar.forEach((file) => {
            formData.append("superAvatar", file)
        });
        for (const key in values) {
            if (key !== "superAvatar") {
                formData.append(key, values[key]);
            }
        };
        [...newPowers].forEach((newPower) => {
            formData.append('newPower', newPower)
        });
        [...predictions].forEach((prediction) => {
            formData.append('prediction', prediction)
        });
        if(image) {
            [...image].forEach((image) => {
            formData.append('images', image);
        });
        }
        console.log([...formData]);

        try {
            const serverResponse = await createHero(formData);
            console.log(serverResponse);

            if(serverResponse) {
                actions.resetForm();
                setError(null);
            }
            // props.setIsModalOpen(false);
            // await props.loadGroups(props.page);
        } catch (err) {
            setError(err);
        } finally {
            setSubmitting(false);
        }
    }

    const clearFormHandler = (resetForm) => {
        resetForm(); 
        setNewPowers([]);
        setPredictions([]); 
        setImage(null); 
        setError(null);
    };

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
                {({isSubmitting, setFieldValue, resetForm}) => {
                    return (
                        <>
                        <Form className='add-hero-form'>
                            <div className='add-hero-main-info'>
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
                            </div>

                            <div className='add-hero-powers'>
                        <p>Choose a superpower (or multiple using CTRL)</p>
                        <Field as="select"
                            name="powers"
                            multiple
                            className='add-hero-powers-select'>
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
                        <p>New superpower to add:</p>
                        <ul className='add-hero-ul'>
                            {newPowers.map((power, index) => (
                                <li key={index}>{power} <button onClick={handleDeletePower}>Delete</button></li>
                            ))}
                        </ul>
                            </div>
                            <div className='add-hero-predictions'>
                        <input
                            placeholder='Add super prediction from Hero'
                            value={onePrediction}
                            onChange={(e) => setOnePrediction(e.target.value)} 
                        />
                        <button onClick={handleAddPrediction}>Add Prediction</button>
                        <p>Super prediction to add:</p>
                        <ul className='add-hero-ul'>
                            {predictions.map((prediction, index) => (
                                <li key={index}>{prediction} <button onClick={handleDeletePrediction}>Delete</button></li>
                            ))}
                        </ul> 
                            </div> 
                            <div className='add-hero-more-images'>
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="image"
                            types={fileTypes}
                        />
                        {image && Object.values(image).length > 0 ? (
                            <div>
                                <p>Files uploaded:</p>
                                <ul className='add-hero-ul'>
                                    {Object.values(image).map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No files uploaded yet</p>
                        )}
                            </div> 

                        {error && (
                            <div className="error-wrapper">
                                Error: {error.error || error}
                            </div>
                        )}
                        <button type='reset' onClick={() => clearFormHandler(resetForm)}>Clear Form</button>
                        <button type='submit'>Add Superhero</button>
                        </Form>
                        </>
                    )
                }}
            </Formik>
            </article>
            <button onClick={() => props.setIsModalOpen(false)} className='modal-close-btn'>Close</button>
        </Modal>
        
    );
}

export default CreateHeroModal;
