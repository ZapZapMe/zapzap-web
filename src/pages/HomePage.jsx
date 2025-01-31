// HomePage.jsx
import React from 'react';
import TipCard from '../components/HomePage/TipCard';

function HomePage() {
  return (
    <div className="content">
      <h1 className="tagline">
        Reward awesome people, one <span className="highlight">Zap</span> ⚡ at
        a time.
      </h1>
      <TipCard />
    </div>
  );
}

export default HomePage;