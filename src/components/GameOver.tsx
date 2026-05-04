import React from 'react';
import '../styles/UI.css';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <div className="game-over-overlay">
      <div>게임 종료</div>
      <button onClick={onRestart}>다시 시작</button>
    </div>
  );
};

export default GameOver;
