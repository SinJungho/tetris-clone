import React from 'react';
import type { Board as BoardType, Tetromino } from '../types/game';
import Cell from './Cell';
import '../styles/Board.css';
import { getTetrominoMatrix } from '../logic/engine';

interface BoardProps {
  board: BoardType;
  activePiece: Tetromino | null;
}

const Board: React.FC<BoardProps> = ({ board, activePiece }) => {
  // Combine board and active piece for rendering
  const displayGrid = board.grid.map(row => [...row]);

  if (activePiece) {
    const matrix = getTetrominoMatrix(activePiece.shape, activePiece.rotation);
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = activePiece.position.y + y;
          const boardX = activePiece.position.x + x;
          if (boardY >= 0 && boardY < board.height && boardX >= 0 && boardX < board.width) {
            displayGrid[boardY][boardX] = activePiece.shape;
          }
        }
      });
    });
  }

  return (
    <div className="board">
      {displayGrid.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} type={cell} />
        ))
      )}
    </div>
  );
};

export default Board;
