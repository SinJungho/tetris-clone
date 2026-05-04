import { useState, useCallback, useEffect } from 'react';
import type { Board, Tetromino, GameStatus, ShapeType } from '../types/game';
import { createInitialBoard, spawnPiece, movePiece, rotatePiece, getTetrominoMatrix, checkLines, isGameOver } from '../logic/engine';
import { useInterval } from './useInterval';

export const useGameLoop = (options?: { initialStatus?: GameStatus }) => {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [pieces, setPieces] = useState<{ active: Tetromino | null; next: Tetromino }>(() => ({
    active: null,
    next: spawnPiece(),
  }));
  const [status, setStatus] = useState<GameStatus>(options?.initialStatus || 'PLAYING');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);

  const { active: activePiece, next: nextPiece } = pieces;

  const spawn = useCallback(() => {
    setPieces(prev => {
      if (prev.active !== null) return prev;

      const nextPieceToSpawn = prev.next;
      const followingPiece = spawnPiece();
      
      if (isGameOver(board, nextPieceToSpawn)) {
        setTimeout(() => setStatus('GAME_OVER'), 0);
        return prev;
      }

      return {
        active: nextPieceToSpawn,
        next: followingPiece,
      };
    });
  }, [board]);

  const restart = useCallback(() => {
    setBoard(createInitialBoard());
    setPieces({
      active: null,
      next: spawnPiece(),
    });
    setScore(0);
    setLevel(1);
    setLines(0);
    setStatus('PLAYING');
  }, []);

  const handleLineClears = useCallback((newGrid: (ShapeType | null)[][]) => {
    setBoard(prev => {
      const { board: clearedBoard, linesCleared } = checkLines({ ...prev, grid: newGrid });
      if (linesCleared > 0) {
        setScore(scorePrev => scorePrev + linesCleared * 100 * level);
        setLines(linesPrev => {
          const newTotal = linesPrev + linesCleared;
          if (newTotal >= level * 10) {
            setLevel(l => l + 1);
          }
          return newTotal;
        });
      }
      return clearedBoard;
    });
  }, [level]);

  const lockPiece = useCallback((piece: Tetromino) => {
    setPieces(prev => {
      if (prev.active !== piece) return prev;
      return { ...prev, active: null };
    });

    setBoard(prev => {
      const newGrid = [...prev.grid.map(row => [...row])];
      const matrix = getTetrominoMatrix(piece.shape, piece.rotation);
      
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const boardY = piece.position.y + y;
            const boardX = piece.position.x + x;
            if (boardY >= 0 && boardY < prev.height && boardX >= 0 && boardX < prev.width) {
              newGrid[boardY][boardX] = piece.shape;
            }
          }
        });
      });

      handleLineClears(newGrid);
      return prev; // handleLineClears will update board
    });
  }, [handleLineClears]);

  const drop = useCallback(() => {
    if (!activePiece || status !== 'PLAYING') return;

    const { piece: movedPiece, success } = movePiece(board, activePiece, 'DOWN');
    
    if (success) {
      setPieces(prev => ({ ...prev, active: movedPiece }));
    } else {
      lockPiece(activePiece);
    }
  }, [activePiece, board, lockPiece, status]);

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
    if (e.key === 'Escape') {
      if (status === 'PLAYING') {
        setStatus('PAUSED');
      } else if (status === 'PAUSED') {
        setStatus('PLAYING');
      }
      return;
    }

    if (status !== 'PLAYING' || !activePiece) return;

    if (e.key === 'ArrowLeft') {
      const { piece: moved } = movePiece(board, activePiece, 'LEFT');
      setPieces(prev => ({ ...prev, active: moved }));
    } else if (e.key === 'ArrowRight') {
      const { piece: moved } = movePiece(board, activePiece, 'RIGHT');
      setPieces(prev => ({ ...prev, active: moved }));
    } else if (e.key === 'ArrowDown') {
      drop();
    } else if (e.key === 'ArrowUp') {
      const { piece: rotated } = rotatePiece(board, activePiece);
      setPieces(prev => ({ ...prev, active: rotated }));
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
    if (!activePiece && status === 'PLAYING') {
      const timer = setTimeout(() => spawn(), 0);
      return () => clearTimeout(timer);
    }
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
    setStatus,
  };
};
