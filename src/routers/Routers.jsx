import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const routers = new createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
]);

export default routers;
