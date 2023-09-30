import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import SuperHeroes from '../pages/SuperHeroes';
import { Context } from '..';

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
            {/* <Route path='superheroes/*' element={<SuperHeroes />}/> */}
        </Routes>
    );
}

export default AppRouter;
