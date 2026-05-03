import React from 'react';
import type { Tetromino } from '../types/game';
import { getTetrominoMatrix } from '../logic/engine';
import { TETROMINOES } from '../logic/constants';
import '../styles/UI.css';

interface PreviewProps {
  tetromino: Tetromino;
}

const Preview: React.FC<PreviewProps> = ({ tetromino }) => {
  const matrix = getTetrominoMatrix(tetromino.shape, 0);

  return (
    <div className="preview">
      <h3>Next</h3>
      <div className="preview-grid">
        {matrix.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="preview-cell"
              style={{
                backgroundColor: cell !== 0 ? TETROMINOES[tetromino.shape].color : 'transparent',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
