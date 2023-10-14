import React, { useState, useEffect } from 'react';
import { getAllPowers } from '../../../api/heroApi';
import { addPowersToHero, removePowerFromHero } from '../../../api/powerApi';

const UpdatePowers = (props) => {
    const { id, Powers } = props.hero;
    
    const [error, setError] = useState(null);
    const [allPowers, setAllPowers] = useState([]);
    const [powersToAdd, setPowersToAdd] = useState([]);
    const [onePower, setOnePower] = useState(''); 
    const [newPowers, setNewPowers] = useState([]); 

    const handlePowerDelete = async (powerName) => {
        try {
            const updateData = {"name": powerName}
            const serverResponse = await removePowerFromHero(updateData, id)
            console.log(serverResponse)
            await props.showHero();
        } catch (error) {
            console.log(error)
        }
    }

    const handlePowersToAdd = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setPowersToAdd(selectedOptions);
    }

    const handleAddNewPower = (event) => {
        event.preventDefault();
        const existPower = allPowers.some(power => power.name.trim().toLowerCase() === onePower.trim().toLowerCase());
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

    const handleDeleteNewPower = (event, index) => {
        const updatedPowers = [...newPowers];
        updatedPowers.splice(index, 1); 
        setNewPowers(updatedPowers); 
    };

    const submitAddPower = async () => {
        const allPowersToAdd = {newPowers, powersToAdd};
        await addPowersToHero(allPowersToAdd, id);
        await props.showHero();
        setNewPowers([]);
        setPowersToAdd([])
    }

    const getPowers = async () => {
        const allPowers = await getAllPowers();
        setAllPowers(allPowers);
    }

    useEffect(() => {
        getPowers()
    }, [])

    return (
        <div className='update-powers'>
            <div>
                <h3>Наявні суперсили: </h3>
                <ul>
                    {Powers ? Powers.map((power, index) => (
                        <li key={index}>{power.name}
                            <button onClick={() => handlePowerDelete(power.name)}>X</button>
                            <p>Обережненько! Видаляється відразу, без додаткового запиту</p>
                        </li>
                    ))
                    : null }
                </ul>
            </div>
            <div>
                <h3>Додати суперсили: </h3>
                <select 
                    name='powers'
                    multiple
                    className='update-powers-select'
                    value={powersToAdd}
                    onChange={handlePowersToAdd}
                >
                    {allPowers.map((power, index) => (
                    <option key={index} value={power.name}>
                        {power.name}
                    </option>
                    ))}
                </select>
                <p>Обрані суперсили:</p>
                <ul className='add-hero-ul'>
                    {powersToAdd.map((power, index) => (
                        <li key={index}>{power}</li>
                    ))}
                </ul>
                <div>
                    <p>Введи нову суперсилу, якщо потрібної немає в переліку</p>
                    <input
                        placeholder='Or add new superpower'
                        value={onePower}
                        onChange={(e) => setOnePower(e.target.value)} 
                    />
                    <button onClick={handleAddNewPower}>Додати</button>
                    <div className="update-error-wrapper">
                        {error && (
                            <p>
                                Помилка : {error.error || error}
                            </p>
                        )}
                    </div>
                    <p>Додані суперсили:</p>
                    <ul className='add-hero-ul'>
                        {newPowers.map((power, index) => (
                            <li key={index}>{power} <button onClick={handleDeleteNewPower}>Delete</button></li>
                        ))}
                    </ul>
                </div>


                <button onClick={submitAddPower}>Додати суперсили</button>
            </div>
            
        </div>
    );
}

export default UpdatePowers;
