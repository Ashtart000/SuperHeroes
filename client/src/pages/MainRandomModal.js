import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const MainRandomModal = (props) => {
    const {randomHero} = props;
    console.log(randomHero)



    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
            >
                {props.randomHero &&(
                <div className='random-hero-card'>
                    <h2>Сьогодні ти {randomHero.nickname}</h2>
                    <img src={`http://localhost:5000/${randomHero.imagePath}`} alt={randomHero.nickname} className='hero-avatar'/>
                    <h3 className='real-name'>Справжнє ім'я: {randomHero.realName}</h3>
                    <p>{randomHero.description}</p>
                    <div className='random-prediction'>
                        <p>Передбачення на сьогодні:</p>
                        {randomHero.Predictions && randomHero.Predictions.length > 0 ? <p>{randomHero.Predictions[0].description}</p> 
                        : <p>Поки немає передбачення від Супергероя</p>}
                        
                    </div>

                    <button onClick={() => props.setIsModalOpen(false)}>Close</button>
                </div>
                )}
        </Modal>
    );
}

export default MainRandomModal;
