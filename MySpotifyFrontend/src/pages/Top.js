import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMusic, faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram, faSpotify, faGithub } from '@fortawesome/free-brands-svg-icons';

const Top = () => {
    const [topData, setTopData] = useState([]);
    const [selectedType, setSelectedType] = useState('tracks');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // Simulate a delay for demonstration purposes
        fetch('/spotify/top/' + selectedType)
            .then(response => response.json())
            .then(data => {
                console.log(data.items)
                setTopData(data.items);
                setIsLoading(false);
            });

    }, [selectedType]);

    return (
        <Layout>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-semibold text-center text-white mb-6 animate-gradient1">
                    Your Top Music Statistics
                </h1>
                <div className="flex justify-center mb-8">
                    <select
                        className="bg-gray-700 text-white rounded px-4 py-2 focus:outline-none"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="tracks">Top Tracks</option>
                        <option value="artists">Top Artists</option>
                        <option value="albums">Top Albums</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
                        </div>
                    ) : (
                        (topData && topData.length !== 0) ? (
                            topData.map(item => (
                                <div key={item.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105">
                                    {/* Custom rendering based on selectedType */}
                                    {selectedType === 'tracks' && item && item.external_urls && item.external_urls.spotify && item.album && item.album.images[0].url && (
                                        <div>
                                            <p className="text-white font-semibold">{item.name}</p>
                                            <p className="text-gray-300">{item.artists.map(artist => artist.name).join(', ')}</p>
                                            <img src={item.album.images[0].url} alt={item.album.name} className="w-32 h-32 mx-auto mt-2 rounded-md" />
                                            <p className="text-gray-300">Popularity: {item.popularity}</p>
                                            <p className="text-gray-300">Duration: {Math.floor(item.duration_ms / 60000)}:{((item.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
                                            <a href={item.external_urls.spotify} target='_blank' className="mt-2 flex items-center px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-300">
                                                <FontAwesomeIcon icon={faMusic} className="mr-2 mt-0.5" />
                                                Listen this song on Spotify
                                            </a>
                                        </div>
                                    )}
                                    {selectedType === 'artists' && item && item.external_urls && item.genres && item.external_urls.spotify && (
                                        <div>
                                            {item && (
                                                <div className="flex flex-col items-center">
                                                    {item.images && item.images.length > 0 && (
                                                        <img src={item.images[0].url} alt={item.name} className="w-32 h-32 rounded-full mb-4" />
                                                    )}
                                                    <p className="text-white font-semibold">{item.name}</p>
                                                    <p className="text-gray-300">Popularity: {item.popularity}</p>
                                                    {item.followers && (
                                                        <p className="text-gray-300">Followers: {item.followers.total}</p>
                                                    )}
                                                    {item.genres && (
                                                        <div className="text-gray-300">
                                                            <p className="mb-1">Genres:</p>
                                                            <ul className="flex flex-wrap gap-2">
                                                                {item.genres.map((genre, index) => (
                                                                    <li key={index} className="bg-green-500 text-gray-800 px-2 py-1 rounded">
                                                                        <span className="mr-1">#</span>
                                                                        {genre.toUpperCase()}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {item.external_urls.spotify && (
                                                        <a href={item.external_urls.spotify} target='_blank' className="mt-2 flex items-center px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-300">
                                                            <FontAwesomeIcon icon={faUser} className="mr-2 mt-0.5" />
                                                            View this artist on Spotify
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {selectedType === 'albums' && item && item.album && item.album.images && (
                                        <div className="flex flex-col items-center">
                                            <div className="relative w-32 h-32 rounded-md mb-4 group overflow-hidden">
                                                <img src={item.album.images[0].url} alt={item.album.name} className="w-full h-full rounded-md" />
                                                <div className="absolute inset-0 bg-green-500 bg-opacity-20 transition-opacity opacity-0 group-hover:opacity-100 flex justify-center items-center">
                                                    <a href={item.album.external_urls.spotify} target="_blank" className="text-white hover:underline flex items-center">
                                                        <FontAwesomeIcon icon={faCompactDisc} className="mr-2" />
                                                        View Album
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="text-white font-semibold">{item.album.name}</p>
                                            <p className="text-gray-300">Artist: {item.album.artists.map(artist => (
                                                <a href={artist.external_urls.spotify} target="_blank" className="text-blue-500 hover:underline mx-1">
                                                    {artist.name}
                                                </a>
                                            ))}</p>
                                            <p className="text-gray-300">Release Date: {item.album.release_date}</p>
                                            <p className="text-gray-300">Total Tracks: {item.album.total_tracks}</p>
                                            <p className="text-gray-300">Popularity: {item.album.popularity}</p>
                                        </div>
                                    )}


                                </div>
                            ))
                        ) : (
                            <div className="grid place-items-center w-full h-80 animate-pulse bg-gray-800 rounded-lg shadow-md">
                                <p className="text-white text-center">OUPS.... </p>
                            </div>

                        )
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default Top;
