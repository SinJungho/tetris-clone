import { useState, useCallback } from 'react';
import { useGameLoop } from './hooks/useGameLoop';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Preview from './components/Preview';
import GameOver from './components/GameOver';
import PauseOverlay from './components/PauseOverlay';
import ControlsPopup from './components/ControlsPopup';
import { ONBOARDING_KEY } from './logic/constants';
import './styles/index.css';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem(ONBOARDING_KEY);
  });

  const { board, activePiece, nextPiece, score, level, status, restart, setStatus } = useGameLoop({
    initialStatus: showOnboarding ? 'PAUSED' : 'PLAYING'
  });

  const handleDismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setStatus('PLAYING');
  }, [setStatus]);

  return (
    <div className="game-container" style={{ position: 'relative' }}>
      <h1>Tetris Clone</h1>
      <div className="game-layout" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <Board board={board} activePiece={activePiece} />
        <div className="game-info">
          <Scoreboard score={score} level={level} />
          <Preview tetromino={nextPiece} />
        </div>
      </div>
      {status === 'PAUSED' && !showOnboarding && <PauseOverlay />}
      {status === 'GAME_OVER' && <GameOver onRestart={restart} />}
      {showOnboarding && <ControlsPopup onDismiss={handleDismissOnboarding} />}
    </div>
  );
}

export default App;
