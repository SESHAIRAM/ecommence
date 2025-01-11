import React, { lazy, } from 'react'
import { useSelector } from 'react-redux';
// import { Home } from './Pages/Home';

const Entry = lazy(() => import("./Pages/Entry").then((module) => ({ default: module.Entry })));
const Login = lazy(() => import("./Pages/Login").then((module) => ({ default: module.Login })));
const SignUp = lazy(() => import("./Pages/SignUp").then((module) => ({ default: module.SignUp })));
const Home = lazy(() => import("./Pages/Home").then((module) => ({ default: module.Home })));
const Error404 = lazy(() => import("./Pages/Error404").then((module) => ({ default: module.Error404 })));
const Error500 = lazy(() => import("./Pages/Error500").then((module) => ({ default: module.Error500 })));

export const OPRoutes = () => {
    const getAppRouteData = useSelector((state) => state.appstate.route_info);
    return [
        {
            path: "/",
            element: <Entry />,
            isloggedin: false,
        },
        {
            path: "/login",
            element: <Login />,
            isloggedin: false,
        },
        {
            path: "/signup",
            element: <SignUp />,
            isloggedin: false,
        },
        {
            path: "/home",
            element: <Home />,
            isloggedin: true,
        },
        {
            path: "/error500",
            element: <Error500 />,
            isloggedin: false,
        },
        {
            path: "*",
            element: <Error404 />,
            isloggedin: false,
        },
    ]
}
