import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';

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
                setTopData(data.items);
                setIsLoading(false);
            });

    }, [selectedType]);

    return (
        <Layout>
            <div className="bg-gradient-to-r from-gray-800 to-black p-8 rounded-lg shadow-xl">
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
                        <option value="genres">Top Genres</option>
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
                                    {selectedType === 'tracks' && (
                                        <div>
                                            <p className="text-white font-semibold">{item.name}</p>
                                            <p className="text-gray-300">{item.artists.map(artist => artist.name).join(', ')}</p>
                                            <img src={item.album.images[0].url} alt={item.album.name} className="w-32 h-32 mx-auto mt-2 rounded-md" />
                                            <p className="text-gray-300">Popularity: {item.popularity}</p>
                                            <p className="text-gray-300">Duration: {Math.floor(item.duration_ms / 60000)}:{((item.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
                                            <a href={item.external_urls.spotify} className="text-blue-500 hover:underline">Listen on Spotify</a>
                                        </div>
                                    )}
                                    {selectedType === 'artists' && (
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
                                                            <p>Genres:</p>
                                                            <ul className="list-disc ml-4">
                                                                {item.genres.map((genre, index) => (
                                                                    <li key={index}>{genre}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {item.external_urls.spotify && (
                                                        <a href={item.external_urls.spotify} className="text-blue-500 hover:underline mt-2">View Artist on Spotify</a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {selectedType === 'albums' && (
                                        <div>
                                            <div className="flex flex-col items-center">
                                                <img src={item.album.images[0].url} alt={item.album.name} className="w-32 h-32 rounded-md mb-4" />
                                                <p className="text-white font-semibold">{item.album.name}</p>
                                                <p className="text-gray-300">Artist: {item.album.artists.map(artist => artist.name).join(', ')}</p>
                                                <p className="text-gray-300">Release Date: {item.album.release_date}</p>
                                                <p className="text-gray-300">Total Tracks: {item.album.total_tracks}</p>
                                                <p className="text-gray-300">Popularity: {item.album.popularity}</p>
                                                <a href={item.album.external_urls.spotify} className="text-blue-500 hover:underline mt-2">View Album on Spotify</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-white">No data available.</p>
                        )
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default Top;
