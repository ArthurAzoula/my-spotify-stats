import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faSpotify, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row">
          <div className="md:mr-12 mb-6 md:mb-0">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300 mr-4">
              Privacy Policy
            </a>
            <a href="/terms-of-use" className="text-gray-400 hover:text-white transition duration-300 mr-4">
              Terms of Use
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">
              Contact Us
            </a>
          </div>
        </div>
        <div className="flex items-center mt-6 md:mt-0">
          <a href="https://twitter.com/AzoulaArthur" target='_blank' className="text-gray-400 hover:text-white transition duration-300 mx-2">
            <FontAwesomeIcon icon={faTwitter} className="text-blue-400" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100005979587850" target='_blank' className="text-gray-400 hover:text-white transition duration-300 mx-2">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
          </a>
          <a href="https://www.instagram.com/arthur_azl/" target='_blank' className="text-gray-400 hover:text-white transition duration-300 mx-2">
            <FontAwesomeIcon icon={faInstagram} className="text-pink-500" />
          </a>
          <a href="https://open.spotify.com/user/mgheirkuatma45c0qmdm6gjzk" target='_blank' className="text-gray-400 hover:text-white transition duration-300 mx-2">
            <FontAwesomeIcon icon={faSpotify} className="text-green-400" />
          </a>
          <a href="https://github.com/azoulux" target='_blank' className="text-gray-400 hover:text-white transition duration-300 mx-2">
            <FontAwesomeIcon icon={faGithub} className="text-gray-400" />
          </a>
        </div>
      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <p className="text-center mt-6 text-gray-400">
        &copy; {new Date().getFullYear()} MySpotify. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
