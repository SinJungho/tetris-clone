import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlsPopup from '../../src/components/ControlsPopup';

describe('ControlsPopup', () => {
  it('renders game controls', () => {
    const onDismiss = vi.fn();
    render(<ControlsPopup onDismiss={onDismiss} />);
    
    expect(screen.getByText('게임 조작법')).toBeInTheDocument();
    expect(screen.getByText('블록 이동')).toBeInTheDocument();
    expect(screen.getByText('블록 회전')).toBeInTheDocument();
    expect(screen.getByText('소프트 드롭')).toBeInTheDocument();
    expect(screen.getByText('하드 드롭')).toBeInTheDocument();
    expect(screen.getByText('일시정지 / 재개')).toBeInTheDocument();
  });

  it('calls onDismiss when Start Game button is clicked', () => {
    const onDismiss = vi.fn();
    render(<ControlsPopup onDismiss={onDismiss} />);
    
    const button = screen.getByText('게임 시작');
    fireEvent.click(button);
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
