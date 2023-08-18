import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { LoggedInProvider, useLoggedIn } from '../context/LoggedInContext';
import NotLoggedInPage from "../components/NotConnected";

const Playlist = () => {
    const [playlistData, setPlaylistData] = useState([]);
    const { state } = useLoggedIn();

    useEffect(() => {
        if (state.isLoggedIn) {
            fetch('/spotify/playlists')
                .then(response => response.json())
                .then(data => {
                    setPlaylistData(data.items);
                });
        }
    }, []);

    return (
        <Layout>
            {state.isLoggedIn ? (
                <div className="playlist-container">
                    <h1 className="text-2xl font-semibold mb-4">Your Favorite Playlists</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {playlistData.map(playlist => (
                            <a
                                key={playlist.id}
                                href={playlist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="playlist-item hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                                <img
                                    src={playlist.images[0].url}
                                    alt={playlist.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-semibold mt-2">{playlist.name}</h3>
                                <p className="text-gray-500 text-sm">by {playlist.owner.display_name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <NotLoggedInPage />
            )}
        </Layout>
    );
};

export default Playlist;
