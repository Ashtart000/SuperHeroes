import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_HEROES_ROUTE } from '../utils/consts';

const SuperHeroCard = (props) => {
    const {id, nickname, realName, description, imagePath, catchPhrase, Powers, Superimages} = props.hero;

    const navigate = useNavigate();
    const location = useLocation();
    const isAdminPage = location.pathname === ADMIN_HEROES_ROUTE;

    return (
        <>
        <article className='one-card-wrapper' 
            onClick={props.onClick}
        >

            <h1>{nickname}</h1>
            <img src={`http://localhost:5000/${imagePath}`} alt={nickname} className='hero-avatar'/>
            <h3 className='catch-phrase'>{catchPhrase}</h3>
            {isAdminPage ? <button on onClick={() => navigate(ADMIN_HEROES_ROUTE + '/' + id)}>Edit or Delete</button> : null}
        </article>

        </>
    );
}

export default SuperHeroCard;
