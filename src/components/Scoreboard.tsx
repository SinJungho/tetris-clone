import React from 'react';
import '../styles/Scoreboard.css';

interface ScoreboardProps {
  score: number;
  level: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, level }) => {
  return (
    <div className="scoreboard">
      <div className="stat">
        <h2>Score</h2>
        <p>{score}</p>
      </div>
      <div className="stat">
        <h2>Level</h2>
        <p>{level}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
