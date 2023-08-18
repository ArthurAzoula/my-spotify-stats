import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const NotLoggedInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white">
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-5xl mb-4 animate-bounce" />
      <h1 className="text-3xl font-semibold mb-2">Oops! An Error Occurred...</h1>
      <p className="text-gray-300 text-center mb-6">
        We couldn't retrieve your data at the moment. Please check your connection and try again.
      </p>
      <p className="text-gray-300 mb-6">
        To access your data, please log in to your Spotify account.
      </p>
      <LoginButton />
      <Link to="/" className="mt-4 mb-4 text-gray-300 hover:underline flex items-center">
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Go back to Home
      </Link>
    </div>
  );
};

export default NotLoggedInPage;
