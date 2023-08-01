import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function MainLayout() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <Outlet />
            </div>
            <h1>footer</h1>
        </div>
    );
}

export default MainLayout;
