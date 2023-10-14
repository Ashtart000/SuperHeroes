import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_HEROES_ROUTE } from '../../utils/consts';
import './styles.css';
import { deleteHero } from '../../api/heroApi';
import UpdateNickname from './UpdateComponents/UpdateNickname';
import UpdateRealName from './UpdateComponents/UpdateRealName';
import UpdateAvatar from './UpdateComponents/UpdateAvatar';
import UpdateCatchPhrase from './UpdateComponents/UpdateCatchPhrase';
import UpdateDescription from './UpdateComponents/UpdateDescription';
import UpdatePowers from './UpdateComponents/UpdatePowers';
import UpdatePredictions from './UpdateComponents/UpdatePredictions';

const UpdateHeroCard = (props) => {
    const {id, nickname, realName, catchPhrase, descriprion, imagePath, Powers, Predictions, Superimages } = props.hero;
    const navigate = useNavigate();

    const delSuperHero = async () => {
        await deleteHero(id);
        navigate(ADMIN_HEROES_ROUTE);
    }

    return (
        <>
        <button 
            onClick={() => navigate(ADMIN_HEROES_ROUTE)} 
            className='update-button-return'>Return to list of Superheroes</button>
        <article className='update-card-wrapper'>
            <button onClick={delSuperHero}>Delete this Superhero</button>
            <UpdateNickname hero={props.hero} showHero={props.showHero}/>
            <UpdateAvatar hero={props.hero} showHero={props.showHero}/> 
            <UpdateRealName hero={props.hero} showHero={props.showHero}/>             
            <UpdateCatchPhrase hero={props.hero} showHero={props.showHero}/>
            <UpdateDescription hero={props.hero} showHero={props.showHero}/>
            <UpdatePowers hero={props.hero} showHero={props.showHero}/>
            <UpdatePredictions hero={props.hero} showHero={props.showHero}/>
        </article>    
        </>
    );
}

export default UpdateHeroCard;
