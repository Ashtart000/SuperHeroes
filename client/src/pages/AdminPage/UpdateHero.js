import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getOneHero } from '../../api/heroApi';
import UpdateHeroCard from './UpdateHeroCard';

const UpdateHero = () => {
    const { id } = useParams();

    const [hero, setHero] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // const showHero = async() => {
    //     const hero = await getOneHero(id);
    //     setHero(hero);
    // }

    const showHero = () => {
        getOneHero(id)
        .then((data) => {
            setHero(data)
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        showHero()
        console.log({hero})
    }, [])


    return (
        <>
            <UpdateHeroCard hero={hero} showHero={showHero}/>
        </>
    );
}

export default UpdateHero;
