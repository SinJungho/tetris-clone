import React from 'react';
import '../styles/UI.css';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <div className="game-over-overlay">
      <div>GAME OVER</div>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default GameOver;
