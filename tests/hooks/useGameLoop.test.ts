import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as engine from '../../src/logic/engine';
import { useGameLoop } from '../../src/hooks/useGameLoop';
import type { Tetromino } from '../../src/types/game';

// Mock the engine to have predictable pieces
vi.mock('../../src/logic/engine', async (importOriginal) => {
  const actual = await importOriginal() as Record<string, unknown>;
  return {
    ...actual,
    spawnPiece: vi.fn(),
    isGameOver: vi.fn(),
  };
});

describe('useGameLoop', () => {
  const defaultPiece: Tetromino = { shape: 'I', position: { x: 4, y: 0 }, rotation: 0, color: 'blue' };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    vi.mocked(engine.spawnPiece).mockReturnValue(defaultPiece);
    vi.mocked(engine.isGameOver).mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
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

    // Trigger initial spawn effect
    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    // After initial spawn:
    // activePiece should be piece1
    // nextPiece should be piece2
    expect(result.current.activePiece).toEqual(piece1);
    expect(result.current.nextPiece).toEqual(piece2);
  });

  it('toggles pause with ESC key', async () => {
    const { result } = renderHook(() => useGameLoop());

    // Trigger initial spawn
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current.status).toBe('PLAYING');

    // Press ESC to pause
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.status).toBe('PAUSED');

    // Press ESC again to resume
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.status).toBe('PLAYING');
  });

  it('ignores movement keys when paused', async () => {
    const { result } = renderHook(() => useGameLoop());

    // Trigger initial spawn
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    
    const initialPos = { ...result.current.activePiece?.position };

    // Pause the game
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.status).toBe('PAUSED');

    // Try to move left
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    });
    
    expect(result.current.activePiece?.position).toEqual(initialPos);
  });

  it('does not toggle pause during GAME_OVER', async () => {
    // Mock isGameOver to return true for the initial spawn
    vi.mocked(engine.isGameOver).mockReturnValue(true);
    
    const { result } = renderHook(() => useGameLoop());
    
    // Initial useEffect calls spawn, which calls isGameOver(true) -> sets status to GAME_OVER via setTimeout
    await act(async () => {
      vi.runOnlyPendingTimers(); // for spawn
      vi.runOnlyPendingTimers(); // for setStatus('GAME_OVER')
    });
    
    expect(result.current.status).toBe('GAME_OVER');

    // Press ESC
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      vi.runOnlyPendingTimers();
    });
    
    // Status should still be GAME_OVER, not PAUSED
    expect(result.current.status).toBe('GAME_OVER');
  });
});
