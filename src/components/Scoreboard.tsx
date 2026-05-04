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
        <h2>점수</h2>
        <p>{score}</p>
      </div>
      <div className="stat">
        <h2>레벨</h2>
        <p>{level}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
