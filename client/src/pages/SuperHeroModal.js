import React, { useEffect, useState, useContext } from 'react';
import { Context } from '..';
import Modal from 'react-modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToFavourite, isHeroFavourite, removeFromFavourite } from '../api/heroApi';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'},
  };

const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
};

const SuperHeroModal = (props) => {
    const {user} = useContext(Context);
    const {selectedHero} = props;
    console.log(selectedHero)

    const [isFavourite, setIsFavourite] = useState(false);

    const handleAddToFavourite = async () => {
        await addToFavourite(selectedHero.id);
        setIsFavourite(true);
    }

    const handleRemoveFromFavourite = async () => {
        await removeFromFavourite(selectedHero.id);
        setIsFavourite(false);
    }

    const loadIsFavourite = async () => {
        try {
            if (selectedHero && selectedHero.id) {
                const result = await isHeroFavourite(selectedHero.id);
                setIsFavourite(result);
            }
        } catch (error) {
            console.error('Помилка при завантаженні обраного:', error);
        }
    }
    
    useEffect(() => {
        loadIsFavourite();
    }, [selectedHero]);
    
    return (
        <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => {props.setIsModalOpen(false)}}
                style={customStyles}
            >
                {props.selectedHero &&(
                <article className='card-wrapper'>

                {user.isAuth ? 
                    !isFavourite ? 
                        <span className='favourite' title='Додати в обране' onClick={handleAddToFavourite}>&#9829;</span> 
                        : <span className='favourite favourite-added' title='Видалити з обраного' onClick={handleRemoveFromFavourite}>&#9829;</span>
                    : null 
                }
                   
                <h1>{selectedHero.nickname}</h1>
                <img src={`http://localhost:5000/${selectedHero.imagePath}`} alt={selectedHero.nickname} className='hero-avatar'/>
                <h3 className='catch-phrase'>{selectedHero.catchPhrase}</h3>
                <h3 className='real-name'>Real name: {selectedHero.realName}</h3>
                <p>{selectedHero.description}</p>
                <p className='super-powers'>Super Powers:</p>
                <ul className='ul-powers'>
                    {selectedHero.Powers ? selectedHero.Powers.map((power, index) => (
                        <li key={index}>{power.name}</li>
                    ))
                : null}
                </ul>

                <div className='card-slider-wrapper'>
                <Slider {...slickSettings} className="card-slider">
                    {selectedHero.Superimages ? selectedHero.Superimages.map((image, index) => (
                        <div key={index} className=''>
                                <img src={`http://localhost:5000/${image.imagePath}`} 
                                alt={image.imagePath} 
                                className='card-slider-img'/>
                        </div>
                    ))
                : null}
                </Slider>
            </div>
            </article>
                )}
        </Modal>
    );
}

export default SuperHeroModal;
