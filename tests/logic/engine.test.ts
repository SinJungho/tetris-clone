import { describe, it, expect } from 'vitest';
import { createInitialBoard, spawnPiece, movePiece, rotatePiece, checkLines, isGameOver } from '../../src/logic/engine';
import { TETROMINOES } from '../../src/logic/constants';

describe('Game Engine', () => {
  it('creates an empty board', () => {
    const board = createInitialBoard();
    expect(board.width).toBe(10);
    expect(board.height).toBe(20);
    expect(board.grid.length).toBe(20);
    expect(board.grid[0].length).toBe(10);
    expect(board.grid[0][0]).toBeNull();
  });

  it('spawns a piece at the top center', () => {
    const piece = spawnPiece();
    expect(piece.position.y).toBe(0);
    expect(piece.position.x).toBeGreaterThanOrEqual(3);
    expect(piece.position.x).toBeLessThanOrEqual(5);
  });

  it('moves a piece correctly', () => {
    const board = createInitialBoard();
    const piece = spawnPiece();
    const initialPos = { ...piece.position };
    
    const { piece: movedPiece, success } = movePiece(board, piece, 'DOWN');
    expect(success).toBe(true);
    expect(movedPiece.position.y).toBe(initialPos.y + 1);
  });

  it('detects collisions with board boundaries', () => {
    const board = createInitialBoard();
    const piece = spawnPiece();
    piece.position.x = 0;
    
    const { success } = movePiece(board, piece, 'LEFT');
    expect(success).toBe(false);
  });

  it('rotates a piece correctly', () => {
    const board = createInitialBoard();
    const piece = spawnPiece(); // Let's say it's T
    piece.shape = 'T';
    piece.rotation = 0;
    
    const { piece: rotatedPiece, success } = rotatePiece(board, piece);
    expect(success).toBe(true);
    expect(rotatedPiece.rotation).toBe(1);
  });

  it('clears lines correctly', () => {
    const board = createInitialBoard();
    // Fill the bottom row
    for (let x = 0; x < 10; x++) {
      board.grid[19][x] = 'I';
    }
    
    const { board: newBoard, linesCleared } = checkLines(board);
    expect(linesCleared).toBe(1);
    expect(newBoard.grid[19][0]).toBeNull();
  });

  it('detects game over', () => {
    const board = createInitialBoard();
    // Fill the top row
    for (let x = 0; x < 10; x++) {
      board.grid[0][x] = 'I';
    }
    const piece = spawnPiece();
    expect(isGameOver(board, piece)).toBe(true);
  });
});
