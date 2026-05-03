import type { Board, Tetromino, ShapeType } from '../types/game';
import { COLS, ROWS, TETROMINOES } from './constants';

export const createInitialBoard = (): Board => {
  return {
    grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
    width: COLS,
    height: ROWS,
  };
};

export const spawnPiece = (): Tetromino => {
  const shapes: ShapeType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    shape,
    position: { x: Math.floor(COLS / 2) - 1, y: 0 },
    rotation: 0,
    color: TETROMINOES[shape].color,
  };
};

export const getTetrominoMatrix = (shape: ShapeType, rotation: number): number[][] => {
  let matrix = TETROMINOES[shape].shape;
  
  // Basic rotation logic
  for (let i = 0; i < rotation; i++) {
    matrix = matrix[0].map((_, index) => matrix.map(col => col[index]).reverse());
  }
  
  return matrix;
};

export const checkCollision = (board: Board, piece: Tetromino, moveX = 0, moveY = 0, newRotation?: number): boolean => {
  const matrix = getTetrominoMatrix(piece.shape, newRotation ?? piece.rotation);
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== 0) {
        const nextX = piece.position.x + x + moveX;
        const nextY = piece.position.y + y + moveY;
        
        if (
          nextX < 0 || 
          nextX >= board.width || 
          nextY >= board.height ||
          (nextY >= 0 && board.grid[nextY][nextX] !== null)
        ) {
          return true;
        }
      }
    }
  }
  
  return false;
};

export const movePiece = (board: Board, piece: Tetromino, direction: 'LEFT' | 'RIGHT' | 'DOWN'): { piece: Tetromino; success: boolean } => {
  const moveX = direction === 'LEFT' ? -1 : direction === 'RIGHT' ? 1 : 0;
  const moveY = direction === 'DOWN' ? 1 : 0;
  
  if (!checkCollision(board, piece, moveX, moveY)) {
    return {
      piece: {
        ...piece,
        position: { x: piece.position.x + moveX, y: piece.position.y + moveY },
      },
      success: true,
    };
  }
  
  return { piece, success: false };
};

export const rotatePiece = (board: Board, piece: Tetromino): { piece: Tetromino; success: boolean } => {
  const nextRotation = (piece.rotation + 1) % 4;
  
  if (!checkCollision(board, piece, 0, 0, nextRotation)) {
    return {
      piece: {
        ...piece,
        rotation: nextRotation,
      },
      success: true,
    };
  }
  
  return { piece, success: false };
};

export const checkLines = (board: Board): { board: Board; linesCleared: number } => {
  let linesCleared = 0;
  const newGrid = board.grid.filter(row => {
    const isLineFull = row.every(cell => cell !== null);
    if (isLineFull) {
      linesCleared++;
      return false;
    }
    return true;
  });

  while (newGrid.length < board.height) {
    newGrid.unshift(Array(board.width).fill(null));
  }

  return {
    board: { ...board, grid: newGrid },
    linesCleared,
  };
};

export const isGameOver = (board: Board, piece: Tetromino): boolean => {
  return checkCollision(board, piece);
};
