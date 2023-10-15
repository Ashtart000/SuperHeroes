import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import { Context } from '..';

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user)

    return (
        <Routes>
            {user.isAdmin && adminRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
            {user.isAuth && authRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
        </Routes>
    );
}

export default AppRouter;
