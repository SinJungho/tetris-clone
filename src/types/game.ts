export type ShapeType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: ShapeType;
  position: Position;
  rotation: number;
  color: string;
}

export type CellContent = ShapeType;

export interface Board {
  grid: (CellContent | null)[][];
  width: number;
  height: number;
}

export type GameStatus = 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export interface GameState {
  activePiece: Tetromino | null;
  nextPiece: Tetromino;
  board: Board;
  score: number;
  level: number;
  linesCleared: number;
  status: GameStatus;
}
