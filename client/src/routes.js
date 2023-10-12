import Admin from "./pages/Admin"
import AdminHeroesPage from "./pages/AdminPage/AdminHeroesPage"
import UpdateHero from "./pages/AdminPage/UpdateHero"
import Auth from "./pages/Auth"
import Films from "./pages/Films"
import Main from "./pages/Main"
import NoMatch from "./pages/NoMatch"
import SuperHeroPage from "./pages/SuperHeroPage"
import SuperHeroes from "./pages/SuperHeroes"
import { ADMIN_HEROES_ROUTE, ADMIN_ROUTE, FILMS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NO_MATCH_ROUTE, POWERS_ROUTE, REGISTRATION_ROUTE, SUPERHEROES_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: ADMIN_HEROES_ROUTE,
        element: <AdminHeroesPage />
    },
    {
        path: ADMIN_HEROES_ROUTE + '/:id',
        element: <UpdateHero />
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: MAIN_ROUTE,
        element: <Main />
    },
    {
        path: SUPERHEROES_ROUTE,
        element: <SuperHeroes />
    },
    {
        path: SUPERHEROES_ROUTE + '/:id',
        element: <SuperHeroPage />
    },
    {
        path: FILMS_ROUTE,
        element: <Films />
    },
    {
        path: NO_MATCH_ROUTE,
        element: <NoMatch />
    }
]