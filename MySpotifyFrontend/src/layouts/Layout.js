import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLoggedIn } from '../context/LoggedInContext';

const Layout = ({ children }) => {

    const { state } = useLoggedIn();

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar isLoggedIn={state.isLoggedIn} />
            <div className="container mx-auto p-4 mb-6">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
