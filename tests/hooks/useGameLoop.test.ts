import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as engine from '../../src/logic/engine';
import { useGameLoop } from '../../src/hooks/useGameLoop';
import type { Tetromino } from '../../src/types/game';

// Mock the engine to have predictable pieces
vi.mock('../../src/logic/engine', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    spawnPiece: vi.fn(),
  };
});

describe('useGameLoop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('spawns the next piece correctly', async () => {
    const piece1: Tetromino = { shape: 'I', position: { x: 4, y: 0 }, rotation: 0, color: 'blue' };
    const piece2: Tetromino = { shape: 'O', position: { x: 4, y: 0 }, rotation: 0, color: 'yellow' };
    const piece3: Tetromino = { shape: 'T', position: { x: 4, y: 0 }, rotation: 0, color: 'purple' };

    vi.mocked(engine.spawnPiece)
      .mockReturnValueOnce(piece1) // initial nextPiece
      .mockReturnValueOnce(piece2) // first spawn's nextPiece
      .mockReturnValueOnce(piece3); // second spawn's nextPiece

    const { result } = renderHook(() => useGameLoop());

    // Wait for the initial spawn effect
    await act(async () => {});

    // After initial spawn:
    // activePiece should be piece1
    // nextPiece should be piece2
    expect(result.current.activePiece).toEqual(piece1);
    expect(result.current.nextPiece).toEqual(piece2);
  });
});
