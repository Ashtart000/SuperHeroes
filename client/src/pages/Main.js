import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainRandomModal from './MainRandomModal';
import { getOneHeroRandom } from '../api/heroApi';
import { getAllImages } from '../api/heroApi';

const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [randomHero, setRandomHero] = useState({});
    const [imagePath, setImagePath] = useState([]);

    const slickSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false
    };

    const showRandomHero = async() => {
        const randomHero = await getOneHeroRandom();
        setRandomHero(randomHero);
    }

    const showImages = async() => {
        const images = await getAllImages();
        setImagePath(images.map(obj => obj.imagePath));
    }

    useEffect(() => {
        showImages()
    }, [])

    return (
        <>
        <div className='slider-wrapper'>
            <Slider {...slickSettings} className="main-slider">
                {imagePath.map((imagePath, index) => (
                    <div key={index} className=''>
                            <img src={`http://localhost:5000/${imagePath}`} 
                            alt={imagePath} 
                            className='main-slider-img'/>
                    </div>
                ))}
            </Slider>
        </div>
        <button onClick={() => {
            setIsModalOpen(true)
            showRandomHero()
            }} className='today-button'>Which superhero are you today?
        </button>

        <MainRandomModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            randomHero={randomHero}
        />
        </>
    );
}

export default Main;
