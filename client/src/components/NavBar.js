import React, { useContext } from 'react';
import { Context } from '..';
import './styles.css';
import logoImg from '../img/logo/logo.png'

const NavBar = () => {
    const {user} = useContext(Context);

    return (
      <>
      <header>
      <nav className="navbar">
        <img src={logoImg} alt='logo'className='navbar-image'/>
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/superheroes" className="navbar-link">SuperHeroes</a>
          </li>
          <li className="navbar-item">
            <a href="/films" className="navbar-link">Films with superheroes</a>
          </li>
        </ul>
        <button className="login-button">Login</button>
      </nav>
      </header>
      </>
    );
}

export default NavBar;
