import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faMusic } from "@fortawesome/free-solid-svg-icons";
import {
  convertDate,
  convertMsToMinSec,
  convertDateToString
} from "../utils/function";


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
            item && item.track && item.track.external_urls.spotify ? (
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
                  <div className="flex mt-4 space-x-4">
                    <a
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      className="flex items-center px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faMusic} className="mr-2" />
                      Song 
                    </a>
                    <a
                      href={item.track.album.artists[0].external_urls.spotify}
                      target="_blank"
                      className="flex items-center px-4 py-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Artist
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <p>No data found</p>
            )
          ))}
        </div>
      </div>
    </Layout>
  );


};

export default RecentlyPlayed;
