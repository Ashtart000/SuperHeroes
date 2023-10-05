import React, {useState, useEffect} from 'react';
import { getAllHeroes } from '../api';
import SuperHeroCard from './SuperHeroCard';

const SuperHeroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedHero, setSelectedHero] = useState(null);

    const loadHeroes = () => {
        getAllHeroes()
        .then((data) => {
            setHeroes(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadHeroes();
    }, [])

    const renderHeroes = () => {
        return heroes.map((hero) => <SuperHeroCard
        hero={hero} 
        key={hero.id}
        />)
    }

    return (
        <div className='card-container'>
            {heroes.length > 0 ? renderHeroes() : <h2>There are no superheroes here</h2>}
        </div>
    );
}

export default SuperHeroes;
