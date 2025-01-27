import React from "react";
import TipCard from "../components/HomePage/TipCard";

function HomePage() {
  return (
    <div className="content">
      <h1 className="tagline">
        Reward awesome people, one <span className="highlight">Zap</span> ⚡ at a time.
      </h1>
      <TipCard type="form" />
      <TipCard type="userMessage" />
      {/* Uncomment the following line when implementing Tip Success */}
      {/* <TipCard type="success" /> */}
    </div>
  );
}

export default HomePage;
