import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from '../layouts/Layout';
import LoginButton from '../components/LoginButton';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faPlayCircle, faHeadphonesAlt, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import listen_music from '../assets/listen_music.jpg'
import '../styles/home.css';
import { LoggedInProvider, useLoggedIn } from '../context/LoggedInContext';

const Home = () => {

    const { state } = useLoggedIn();
    const [ userData, setUserData ] = useState(null)

    useEffect(() => {
        if (state.isLoggedIn) {
            fetch('/spotify/me')
                .then(response => response.json())
                .then(data => {
                    setUserData(data);     // Met à jour les données de l'utilisateur
                });
        }
    }, [state.isLoggedIn])

    const carouselItems = [
        {
            id: 1,
            title: 'Explore Your Spotify Account',
            description:
                "Connect your Spotify account and delve into a world of personalized exploration. Uncover your profile information, view and edit your data, and get insights into your listening habits.",
            icon: faUser,
        },
        {
            id: 2,
            title: 'Discover Your Recent Tracks',
            description:
                "Get a snapshot of your recent music journey. Discover the tracks you've listened to recently, complete with additional insights and contextual data.",
            icon: faCompactDisc,
        },
        {
            id: 3,
            title: 'Top Listened Music',
            description:
                "Dive into your musical preferences by exploring the songs you've streamed the most. Uncover your top tracks, artists, and albums.",
            icon: faMusic,
        },
        {
            id: 4,
            title: 'Favorite Playlists',
            description:
                "Explore the playlists you've loved and saved. Whether it's your own creations or curated collections, your favorite playlists are just a click away.",
            icon: faPlayCircle,
        },
        {
            id: 5,
            title: 'Followed Artists and Genres',
            description:
                "See who and what you're following. Gain insights into the genres and artists you've been exploring and engaging with.",
            icon: faHeadphonesAlt,
        },
    ];

    return (
        <Layout>
            <div className="bg-gradient-to-r from-gray-800 to-black p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-semibold text-center text-white mb-6 animate-gradient1">
                    <span className="animate-gradient2">"Music</span> is <span className="animate-gradient3">life's</span> heartbeat"
                </h1>

                <p className="text-gray-300 text-lg text-center mb-8 animate-fadeIn">
                    Elevate your musical journey with MySpotify. Seamlessly connect to your Spotify account to explore your profile, data,
                    and listening habits. Uncover insights into your recent tracks, top artists, favorite playlists, and more.
                </p>
                {state.isLoggedIn && userData ? (
                    <div className="flex items-center justify-center space-x-4">
                        <img
                            src={userData.images[0].url}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <p className="text-white">Bienvenue {userData.display_name}</p>
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center mb-8 animate-fadeIn">Discover Key Features</h2>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={5000}
                    centerMode={false}
                    className=""
                    containerClass="carousel-container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 3,
                        },
                        mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 1,
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 464 },
                            items: 2,
                        },
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {carouselItems.map(item => (
                        <div key={item.id} className="bg-gray-800 p-6 min-h-full rounded-xl shadow-md">
                            <FontAwesomeIcon icon={item.icon} className="text-4xl text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </Carousel>

                <div className="mt-12 flex items-center justify-center">
                    <div className="max-w-2xl flex flex-col-reverse md:flex-row items-center">
                        <div className="relative md:order-2 md:ml-8">
                            <img
                                src={listen_music}
                                alt="Person Listening to Music"
                                className="rounded-lg shadow-xl"
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <div className="text-5xl font-bold text-white">
                                    <span className="animate-count">10</span>
                                    <span className="animate-count">K</span>
                                </div>
                                <p className="text-gray-300 ml-2 animate-fadeIn animate-delay-500">
                                    Monthly Active Users
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-center">
                            <h1 className="text-3xl font-semibold animate-fadeIn">
                                <span className="text-green-400">Get Your Music</span> Statistics Everywhere, Anytime
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default Home;
