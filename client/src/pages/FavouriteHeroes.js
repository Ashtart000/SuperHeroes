import React, {useState, useEffect} from 'react';
import { getAllFavouritesHeroes } from '../api/heroApi';
import SuperHeroCard from './SuperHeroCard';
import SuperHeroModal from './SuperHeroModal';

const FavouriteHeroes = () => {
    const [favouriteHeroes, setFavouriteHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHero, setSelectedHero] = useState(null);

    const loadFavouriteHeroes = () => {
        getAllFavouritesHeroes()
        .then((data) => {
            setFavouriteHeroes(data);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadFavouriteHeroes();
    }, [])

    const renderFavouriteHeroes = () => {
        return favouriteHeroes.map((hero) => <SuperHeroCard
        hero={hero} 
        key={hero.id}
        onClick={() => { // це не обробник, це пропс
            setSelectedHero(hero)
            setIsModalOpen(true)
        }}
        />)
    }
    
    return (
        <div className='card-container'>
            {favouriteHeroes.length > 0 ? renderFavouriteHeroes() : <h2>There are no superheroes here</h2>}
        
            <SuperHeroModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedHero={selectedHero}
            loadFavouriteHeroes={loadFavouriteHeroes}
            />
        </div>
    );
}

export default FavouriteHeroes;
