import React, {useState, useEffect} from 'react';
import { getAllHeroes } from '../api/heroApi';
import SuperHeroCard from './SuperHeroCard';
import SuperHeroModal from './SuperHeroModal';

const SuperHeroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHero, setSelectedHero] = useState(null);

    const loadHeroes = (pageNumber) => {
        getAllHeroes(pageNumber)
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
        loadHeroes(page);
    }, [page])

    const renderHeroes = () => {
        return heroes.map((hero) => <SuperHeroCard
        hero={hero} 
        key={hero.id}
        onClick={() => { // це не обробник, це пропс
            setSelectedHero(hero)
            setIsModalOpen(true)
        }}
        />)
    }

    const prevButtonHandler = () => {
        if(page > 1) {
            setPage(page - 1)
        }
    }

    const nextButtonHandler = () => {
        setPage(page + 1)
    }

    return (
        <div className='card-container'>
            {heroes.length > 0 ? renderHeroes() : <h2>There are no superheroes here</h2>}
            <div>
                <button onClick={prevButtonHandler} disabled={page===1}>Previous page</button>
                <button onClick={nextButtonHandler}disabled={heroes.length<15}>Next page</button>
            </div>

            <SuperHeroModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedHero={selectedHero}
            loadHeroes={loadHeroes}
            page={page}
            />
        </div>
    );
}

export default SuperHeroes;
