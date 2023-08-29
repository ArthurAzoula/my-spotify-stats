import React, { useState, useEffect, useRef } from 'react';
import spotifyLogo from '../assets/social-spotify.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faMusic, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    fetch('/spotify/me')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={spotifyLogo}
            alt="Spotify Logo"
            className="w-8 h-8 mr-2 transition duration-300 transform hover:scale-110"
          />
          <span className="text-lg font-semibold">MySpotify</span>
        </Link>
        <ul className="space-x-4 flex items-center md:flex md:flex-row md:text-base">
          <li>
            <Link
              to="/"
              className="text-sm hover:text-green-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span className='hidden md:inline'>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/recently-played"
              className="text-sm hover:text-green-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              <span className='hidden md:inline'>Recently Played</span>
            </Link>
          </li>
          <li>
            <Link
              to="/playlist"
              className="text-sm hover:text-green-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              <span className='hidden md:inline'>Playlists & Recommendations</span>
            </Link>
          </li>
          <li>
            <Link
              to="/stats"
              className="text-sm hover:text-green-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              <span className='hidden md:inline'>Statistics</span>
            </Link>
          </li>

          <li>
            {isLoggedIn && userData && userData.images ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="focus:outline-none flex items-center group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-500 bg-green-500 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-green-500">
                    <img
                      src={
                        userData.images && userData.images.length > 0
                          ? userData.images[1].url
                          : ''
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="ml-2">{userData.display_name}</span>
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute mt-2 right-0 bg-white text-gray-800 py-2 rounded z-10">
                    <li>
                      <a
                        href="/settings"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-200 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://localhost:3000/auth/logout"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-200 transition duration-300"
                      >
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
