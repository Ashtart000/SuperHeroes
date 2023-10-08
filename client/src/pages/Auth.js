import React, { useContext } from 'react';
import {Formik, Form, Field} from 'formik';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { loginUser, registerUser } from '../api/userApi';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer ( () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const authOnSubmit = async (values, actions) => {
        try {
            let authUser;
            if(!isLogin) {
                authUser = await registerUser(values);
                console.log(authUser);
                navigate(MAIN_ROUTE);
            } else {
                authUser = await loginUser(values);
                console.log(authUser)
                navigate(MAIN_ROUTE);
            }
            user.setUser(user);
            user.setIsAuth(true);
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className='auth-wrapper'>
            <h2>{isLogin ? 'Authorization' : 'Registration'}</h2>
            <Formik initialValues={initialValues} onSubmit={authOnSubmit}>
                {(props) => (
                    <Form className='auth-form'>
                        {isLogin ? null : <Field name="name" placeholder="Type your name" className='auth-field'/>}
                        <Field name="email" placeholder="Type your email" className='auth-field'/>
                        <Field type='password' name="password" placeholder="Type your password" className='auth-field'/>
                        <div className='auth-button-wrapper'>
                            {isLogin ? <div>Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink></div> : <div>Already have an account? <NavLink to={LOGIN_ROUTE}>Sign in</NavLink></div>}
                            
                            <button type='submit' className='auth-button'>{isLogin ? 'Sign in' : 'Sign up'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
})

export default Auth;
