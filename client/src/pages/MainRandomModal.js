import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',},
  };

const MainRandomModal = (props) => {
    const {randomHero} = props;

    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
            >
                {props.randomHero &&(
                <div>
                    <h2>{randomHero.nickname}</h2>

                    <button onClick={() => props.setIsModalOpen(false)}>Close</button>
                </div>
                )}
        </Modal>
    );
}

export default MainRandomModal;
