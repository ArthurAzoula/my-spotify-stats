import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";


const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  
    useEffect(() => {
      fetch("/spotify/player/recently-played")
        .then((response) => response.json())
        .then((data) => setRecentlyPlayed(data.items)); // Accéder à data.items pour obtenir les éléments récemment joués
    }, []);
  
    return (
      <Layout>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Recently Played Tracks</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyPlayed.map((item) => (
              <div
                key={item.track.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center"
              >
                <img
                  src={item.track.album.images[0].url} // Utilisation des images d'album
                  alt={item.track.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.track.name}</h2>
                  <p className="text-gray-300">{item.track.album.name}</p>
                  <p className="text-gray-300">Duration: {item.track.duration_ms} ms</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  };
  
  export default RecentlyPlayed;
  