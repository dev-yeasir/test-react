import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';

import EmailVerify from '../pages/UsersPages/EmailVerify/EmailVerify';
import ForgotPassword from '../pages/UsersPages/ForgotPassword/ForgotPassword';
import Login from '../pages/UsersPages/Login/Login';
import Register from '../pages/UsersPages/Register/Register';
import ResetPassword from '../pages/UsersPages/ResetPassword/ResetPassword';
import UserProfile from '../pages/UsersPages/UserProfile/UserProfile';

const routers = new createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/user-profile',
                element: <UserProfile />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/user/verify/:token',
        element: <EmailVerify />,
    },
    {
        path: '/user/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: 'user/reset-password/:token',
        element: <ResetPassword />,
    },
]);

export default routers;
