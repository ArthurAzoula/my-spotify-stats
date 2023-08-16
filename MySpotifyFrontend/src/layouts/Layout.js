import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="container mx-auto p-4 mb-6">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
