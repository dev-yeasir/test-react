import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png';

export const navLinks = (
    <>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/">Problems</Link>
        </li>
        <li>
            <Link to="/">quiz</Link>
        </li>
        <li>
            <Link to="/">ide</Link>
        </li>
        <li>
            <Link to="/">Competition</Link>
        </li>
        <li>
            <Link to="/">Discussion</Link>
        </li>
        <li>
            <Link to="/user-profile">User Profile</Link>
        </li>
        <li className="flex items-center gap-2">
            <Link to="/login">login</Link>/<Link to="/register">Register</Link>
        </li>
    </>
);
function Navbar() {
    return (
        <nav className="max-w-full py-3 mx-auto  px-10  shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <img src={logo} alt="logo" />
                </div>
                {/* navLinks */}
                <ul className="flex items-center gap-10 uppercase text-[20px] font-normal">
                    {navLinks}
                </ul>
            </div>
            {/* navbar for mobile */}
        </nav>
    );
}

export default Navbar;
