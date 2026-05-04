import React from 'react';
import '../styles/UI.css';

const PauseOverlay: React.FC = () => {
  return (
    <div className="pause-overlay">
      <div>PAUSED</div>
      <p style={{ fontSize: '1rem', marginTop: '10px', color: 'var(--color-text)' }}>
        Press ESC to Resume
      </p>
    </div>
  );
};

export default PauseOverlay;
