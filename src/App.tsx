import { useGameLoop } from './hooks/useGameLoop';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Preview from './components/Preview';
import GameOver from './components/GameOver';
import './styles/index.css';

function App() {
  const { board, activePiece, nextPiece, score, status, restart } = useGameLoop();

  return (
    <div className="game-container" style={{ position: 'relative' }}>
      <h1>Tetris Clone</h1>
      <div className="game-layout" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <Board board={board} activePiece={activePiece} />
        <div className="game-info">
          <Scoreboard score={score} level={1} />
          <Preview tetromino={nextPiece} />
        </div>
      </div>
      {status === 'GAME_OVER' && <GameOver onRestart={restart} />}
    </div>
  );
}

export default App;
