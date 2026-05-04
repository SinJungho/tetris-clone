import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlsPopup from '../../src/components/ControlsPopup';

describe('ControlsPopup', () => {
  it('renders game controls', () => {
    const onDismiss = vi.fn();
    render(<ControlsPopup onDismiss={onDismiss} />);
    
    expect(screen.getByText('Game Controls')).toBeInTheDocument();
    expect(screen.getByText('Move Piece')).toBeInTheDocument();
    expect(screen.getByText('Rotate Piece')).toBeInTheDocument();
    expect(screen.getByText('Soft Drop')).toBeInTheDocument();
    expect(screen.getByText('Hard Drop')).toBeInTheDocument();
    expect(screen.getByText('Pause / Resume')).toBeInTheDocument();
  });

  it('calls onDismiss when Start Game button is clicked', () => {
    const onDismiss = vi.fn();
    render(<ControlsPopup onDismiss={onDismiss} />);
    
    const button = screen.getByText('Start Game');
    fireEvent.click(button);
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
