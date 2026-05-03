import { useState, useCallback, useEffect } from 'react';
import type { Board, Tetromino, GameStatus } from '../types/game';
import { createInitialBoard, spawnPiece, movePiece, rotatePiece, getTetrominoMatrix, checkLines, isGameOver } from '../logic/engine';
import { useInterval } from './useInterval';

export const useGameLoop = () => {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [activePiece, setActivePiece] = useState<Tetromino | null>(null);
  const [nextPiece, setNextPiece] = useState<Tetromino>(spawnPiece());
  const [status, setStatus] = useState<GameStatus>('PLAYING');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);

  const spawn = useCallback(() => {
    const newPiece = nextPiece;
    const followingPiece = spawnPiece();

    if (isGameOver(board, newPiece)) {
      setStatus('GAME_OVER');
      return;
    }

    setActivePiece(newPiece);
    setNextPiece(followingPiece);
  }, [board, nextPiece]);

  const restart = useCallback(() => {
    setBoard(createInitialBoard());
    setActivePiece(null);
    setNextPiece(spawnPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setStatus('PLAYING');
  }, []);

  const handleLineClears = useCallback((newGrid: any[][]) => {
    const { board: clearedBoard, linesCleared } = checkLines({ ...board, grid: newGrid });
    setBoard(clearedBoard);
    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100 * level);
      setLines(prev => {
        const newTotal = prev + linesCleared;
        if (newTotal >= level * 10) {
          setLevel(l => l + 1);
        }
        return newTotal;
      });
    }
    spawn();
  }, [board, level, spawn]);

  const drop = useCallback(() => {
    if (!activePiece || status !== 'PLAYING') return;

    const { piece: movedPiece, success } = movePiece(board, activePiece, 'DOWN');
    
    if (success) {
      setActivePiece(movedPiece);
    } else {
      lockPiece(activePiece);
    }
  }, [activePiece, board, status]);

  const lockPiece = useCallback((piece: Tetromino) => {
    const newGrid = [...board.grid.map(row => [...row])];
    const matrix = getTetrominoMatrix(piece.shape, piece.rotation);
    
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0 && boardY < board.height && boardX >= 0 && boardX < board.width) {
            newGrid[boardY][boardX] = piece.shape;
          }
        }
      });
    });

    handleLineClears(newGrid);
  }, [board, handleLineClears]);

  const hardDrop = useCallback(() => {
    if (!activePiece || status !== 'PLAYING') return;
    
    let currentPiece = activePiece;
    while (true) {
      const { piece: moved, success } = movePiece(board, currentPiece, 'DOWN');
      if (!success) break;
      currentPiece = moved;
    }
    
    lockPiece(currentPiece);
  }, [activePiece, board, lockPiece, status]);

  const handleInput = useCallback((e: KeyboardEvent) => {
    if (status !== 'PLAYING' || !activePiece) return;

    if (e.key === 'ArrowLeft') {
      const { piece: moved } = movePiece(board, activePiece, 'LEFT');
      setActivePiece(moved);
    } else if (e.key === 'ArrowRight') {
      const { piece: moved } = movePiece(board, activePiece, 'RIGHT');
      setActivePiece(moved);
    } else if (e.key === 'ArrowDown') {
      drop();
    } else if (e.key === 'ArrowUp') {
      const { piece: rotated } = rotatePiece(board, activePiece);
      setActivePiece(rotated);
    } else if (e.code === 'Space') {
      e.preventDefault();
      hardDrop();
    }
  }, [activePiece, board, drop, hardDrop, status]);

  useEffect(() => {
    window.addEventListener('keydown', handleInput);
    return () => window.removeEventListener('keydown', handleInput);
  }, [handleInput]);

  useEffect(() => {
    if (!activePiece && status === 'PLAYING') spawn();
  }, [activePiece, spawn, status]);

  useInterval(() => {
    drop();
  }, status === 'PLAYING' ? Math.max(100, 1000 - (level - 1) * 100) : null);

  return {
    board,
    activePiece,
    nextPiece,
    score,
    level,
    lines,
    status,
    restart,
  };
};
