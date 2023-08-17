import React, { useState, useEffect, useRef } from 'react';
import spotifyLogo from '../assets/social-spotify.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faMusic, faChartBar, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  const handleDocumentClick = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      closeProfileMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={spotifyLogo} alt="Spotify Logo" className="w-8 h-8 mr-2 transition duration-300 transform hover:scale-110" />
          <span className="text-lg font-semibold">MySpotify</span>
        </Link>
        <ul className="space-x-4 flex items-center">
          <li>
            <Link to="/" className="flex items-center text-sm hover:text-green-500 transition duration-300">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/recently-played" className="flex items-center text-sm hover:text-green-500 transition duration-300">
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Recently Played
            </Link>
          </li>
          <li>
            <Link to="/playlist" className="flex items-center text-sm hover:text-green-500 transition duration-300">
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Playlists & Recommandations
            </Link>
          </li>
          <li>
            <Link to="/stats" className="flex items-center text-sm hover:text-green-500 transition duration-300">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Statistics
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <button onClick={toggleProfileMenu} className="focus:outline-none">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-s transition duration-300" />
                  Profil
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute mt-2 bg-white text-gray-800 py-2 rounded">
                    <li>
                      <a href="/settings" className="flex items-center py-2 px-4 text-sm hover:bg-gray-200 transition duration-300">
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="http://localhost:3000/auth/logout" className="flex items-center py-2 px-4 text-sm hover:bg-gray-200 transition duration-300">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <LoginButton />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
