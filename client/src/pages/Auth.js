import React from 'react';
import {Formik, Form, Field} from 'formik';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { loginUser, registerUser } from '../api';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;


    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const authOnSubmit = async (values, actions) => {
        if(!isLogin) {
            const serverResponse = await registerUser(values);
            console.log(serverResponse);
            navigate(MAIN_ROUTE);
        } 
        const serverResponse = await loginUser(values);
        console.log(serverResponse);
        navigate(MAIN_ROUTE);
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
}

export default Auth;
