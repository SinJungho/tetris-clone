import React, { useEffect } from 'react';
import '../styles/UI.css';

interface ControlsPopupProps {
  onDismiss: () => void;
}

const ControlsPopup: React.FC<ControlsPopupProps> = ({ onDismiss }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div className="controls-popup-overlay">
      <div className="controls-popup-content">
        <h2>Game Controls</h2>
        <ul className="controls-list">
          <li><span>Left / Right Arrows</span> <span>Move Piece</span></li>
          <li><span>Up Arrow</span> <span>Rotate Piece</span></li>
          <li><span>Down Arrow</span> <span>Soft Drop</span></li>
          <li><span>Space</span> <span>Hard Drop</span></li>
          <li><span>ESC</span> <span>Pause / Resume</span></li>
        </ul>
        <button className="start-button" onClick={onDismiss}>Start Game</button>
      </div>
    </div>
  );
};

export default ControlsPopup;
