import React from 'react';
import type { CellContent } from '../types/game';
import { TETROMINOES } from '../logic/constants';

interface CellProps {
  type: CellContent | null;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const style = {
    backgroundColor: type ? TETROMINOES[type].color : 'transparent',
    border: type ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
  };

  return <div className="cell" style={style} />;
};

export default React.memo(Cell);
