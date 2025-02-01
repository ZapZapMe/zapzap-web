// HomePage.jsx
import React from 'react';
import TipCard from '../PageComponents/HomePage/TipCard';
import "../styles/homepage.scss"

function HomePage() {
  return (
    // <div></div>
    <div className="content_container flex">
      <h1 className="tagline">
        Reward awesome people, one <span className="highlight">Zap</span>⚡at a time.
      </h1>
      <TipCard />
    </div>
  );
}

export default HomePage;