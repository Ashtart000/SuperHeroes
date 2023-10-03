import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuperHeroCard = (props) => {
    const {id, nickname, realName, description, imagePath, catchPhrase, Powers, Superimages} = props.hero;
    console.log(props);

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

    return (
        <>
        <article className='card-wrapper' onClick={props.onClick}>
            <h1>{nickname}</h1>
            <img src={`http://localhost:5000/${imagePath}`} alt={nickname} className='hero-avatar'/>
            <h3 className='catch-phrase'>{catchPhrase}</h3>
            <h3 className='real-name'>Real name: {realName}</h3>
            <p>{description}</p>
            <p>Super Powers:</p>
            <ul className='ul-powers'>
                {Powers.map((power, index) => (
                    <li key={index}>{power.name}</li>
                ))}
            </ul>

            <div className='card-slider-wrapper'>
            <Slider {...slickSettings} className="card-slider">
                {Superimages.map((image, index) => (
                    <div key={index} className=''>
                            <img src={`http://localhost:5000/${image.imagePath}`} 
                            alt={image.imagePath} 
                            className='card-slider-img'/>
                    </div>
                ))}
            </Slider>
        </div>
        </article>
        </>
    );
}

export default SuperHeroCard;
