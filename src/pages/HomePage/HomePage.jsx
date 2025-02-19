// HomePage.jsx
import React from 'react';
import TipCard from './Components/TipCard';
import LeaderBoards from './Components/LeaderBoards';
import '../../styles/homepage.scss';
import ZapLogo from '../../assets/zapzap logo.png';

function HomePage() {
  return (
    // <div></div>
    <div className="content_container flex">
      <h1 className="tagline">
        Reward awesome people, one{' '}
        <span className="highlight inline-flex items-center gap-2">
          Zap{' '}
          <img
            className="object-contain h-7 w-7 md:h-10 md:w-10"
            alt="zap-log"
            src={ZapLogo}
          />
        </span>{' '}
        at a time.
      </h1>
      <TipCard />
      <LeaderBoards />
    </div>
  );
}

export default HomePage;
