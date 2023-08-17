import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch('/spotify/me')
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            });
    }, []);

    if (!userData) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">
                        {userData.display_name}'s Profile
                    </h1>
                    <div className="flex flex-col items-center">
                        <img
                            src={userData.images && userData.images.length > 0 ? userData.images[1].url : ''}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4 border-4 border-green-500"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">{userData.display_name}</h2>
                        <p className="text-gray-600">{userData.email}</p>
                    </div>
                    <div className="mt-6">
                        <div className="py-2 border-t border-b border-gray-300 flex justify-between">
                            <div className="text-gray-600">Country</div>
                            <div className="text-gray-800">{userData.country}</div>
                        </div>
                        <div className="py-2 border-b border-gray-300 flex justify-between">
                            <div className="text-gray-600">Product</div>
                            <div className="text-gray-800">{userData.product}</div>
                        </div>
                        <div className="py-2 border-b border-gray-300 flex justify-between">
                            <div className="text-gray-600">Followers</div>
                            <div className="text-gray-800">{userData.followers.total}</div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <a
                            href={userData.external_urls.spotify}
                            className="text-blue-500 hover:underline transition duration-300"
                        >
                            View on Spotify
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
