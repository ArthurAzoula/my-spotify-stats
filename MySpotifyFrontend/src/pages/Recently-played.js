import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { convertDate, convertMsToMinSec, convertDateToString } from '../utils/function';

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    fetch("/spotify/player/recently-played")
      .then((response) => response.json())
      .then((data) => setRecentlyPlayed(data.items));
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
                src={item.track.album.images[0].url}
                alt={item.track.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.track.name}</h2>
                <p className="text-gray-300">{item.track.album.name}</p>
                <p className="text-gray-300 pt-2">
                  Duration: {convertMsToMinSec(item.track.duration_ms).minutes}: 
                {convertMsToMinSec(item.track.duration_ms).seconds} min
                </p>
                <div className="flex items-center text-gray-300">
                  <p>Last played: {convertDate(item.played_at.slice(0, 10))}</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <p>Release date: {convertDateToString(item.track.album.release_date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecentlyPlayed;
