import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateHeroModal from './AdminPage/CreateHeroModal';
import { ADMIN_HEROES_ROUTE } from '../utils/consts';

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddHeroOpen, setIsModalAddHeroOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => setIsModalAddHeroOpen(true)}>CREATE SUPERHERO</button>
            <button onClick={() => navigate(ADMIN_HEROES_ROUTE)}>EDIT SUPERHERO</button>

            <CreateHeroModal 
            isModalOpen={isModalAddHeroOpen}
            setIsModalOpen={setIsModalAddHeroOpen}
            />
        </>
    );
}

export default Admin;
