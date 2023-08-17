import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import spotify from '../assets/spotify_black_logo.png';

const LoginButton = () => {
  return (
    <Link
      to="http://localhost:3000/auth/login"
      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full p-3 transition duration-300 transform hover:scale-105"
    >
      <FontAwesomeIcon icon={faPlayCircle} className="text-xl" />
      <img src={spotify} alt="Spotify Logo" className="w-6 h-6" />
      <span>Login with Spotify</span>
    </Link>
  );
};

export default LoginButton;
