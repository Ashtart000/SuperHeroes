import React, { useState } from 'react';
import CreateHeroModal from './AdminPage/CreateHeroModal';

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddHeroOpen, setIsModalAddHeroOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsModalAddHeroOpen(true)}>CREATE SUPERHERO</button>

            <CreateHeroModal 
            isModalOpen={isModalAddHeroOpen}
            setIsModalOpen={setIsModalAddHeroOpen}
            />
        </>
    );
}

export default Admin;
