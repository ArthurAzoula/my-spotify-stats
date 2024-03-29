import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecentlyPlayed from './pages/Recently-played';
import Playlist from './pages/Playlist';
import Top from './pages/Top';
import Profile from './pages/Profil';
// Import other pages

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-white">
        <div className="bg-black">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path='/stats' element={<Top />} />
            <Route path='/settings' element={<Profile />} />
            {/* Add more routes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
