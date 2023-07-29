import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <div>
            <h1>Heder</h1>
            <div className="container mx-auto">
                <Outlet />
            </div>
            <h1>footer</h1>
        </div>
    );
}

export default MainLayout;
