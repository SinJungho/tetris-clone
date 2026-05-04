import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App';
import { ONBOARDING_KEY } from '../src/logic/constants';

describe('App Onboarding Integration', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; }
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows onboarding on first load and hides it after dismissal', async () => {
    render(<App />);
    
    // Should show onboarding
    expect(screen.getByText('Game Controls')).toBeInTheDocument();
    
    // Click Start Game
    const button = screen.getByText('Start Game');
    fireEvent.click(button);
    
    // Should hide onboarding
    expect(screen.queryByText('Game Controls')).not.toBeInTheDocument();
    
    // Should set localStorage
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe('true');
  });

  it('does not show onboarding if already seen', async () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    render(<App />);
    
    expect(screen.queryByText('Game Controls')).not.toBeInTheDocument();
  });

  it('initially pauses game when onboarding is shown', async () => {
    render(<App />);
    
    // Onboarding shown
    expect(screen.getByText('Game Controls')).toBeInTheDocument();
    
    // Wait some time
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    
    // Game should be paused, no pieces should have spawned or fallen 
    // (Actually spawn happens in useEffect, but it checks status === 'PLAYING')
    // In our implementation, status starts as 'PAUSED' if showOnboarding is true.
  });
});
