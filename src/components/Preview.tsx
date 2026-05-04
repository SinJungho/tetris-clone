import React from 'react';
import type { Tetromino } from '../types/game';
import { getTetrominoMatrix } from '../logic/engine';
import { TETROMINOES } from '../logic/constants';
import '../styles/UI.css';

interface PreviewProps {
  tetromino: Tetromino;
}

const Preview: React.FC<PreviewProps> = ({ tetromino }) => {
  // Always use a 4x4 matrix for preview to keep the layout consistent
  const matrix = getTetrominoMatrix(tetromino.shape, 0);
  const displayMatrix = Array.from({ length: 4 }, () => Array(4).fill(0));

  // Center the shape in the 4x4 grid
  const offset = tetromino.shape === 'I' ? 0 : tetromino.shape === 'O' ? 1 : 0;
  
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0 && y + offset < 4 && x + offset < 4) {
        displayMatrix[y + offset][x + offset] = cell;
      }
    });
  });

  return (
    <div className="preview">
      <h3>Next</h3>
      <div className="preview-grid">
        {displayMatrix.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="preview-cell"
              style={{
                backgroundColor: cell !== 0 ? TETROMINOES[tetromino.shape].color : 'transparent',
                border: cell !== 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
