import React, { useContext } from 'react';
import { Context } from '..';
import './styles.css';
import logoImg from '../img/logo/logo.png'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    // const role = jwt_decode(localStorage.getItem('token'));
    // console.log(role.role)

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.removeItem('token')
    }

    return (
      <>
      <header>
      <nav className="navbar">
        <NavLink to={MAIN_ROUTE}><img src={logoImg} alt='logo' className='navbar-image'/></NavLink>
        
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
        {user.isAuth 
        ? 
          <>
            <button onClick={() => navigate(ADMIN_ROUTE)} className="login-button">Admin super panel</button>
            <button onClick={logOut} className="login-button">Log out</button>
          </>
        :
          <>
            <button className="login-button" 
              onClick={() => navigate(LOGIN_ROUTE)}>Log in / Register</button>
          </>
        }
      </nav>
      </header>
      </>
    );
})

export default NavBar;
