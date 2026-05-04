import React from 'react';
import '../styles/UI.css';

const PauseOverlay: React.FC = () => {
  return (
    <div className="pause-overlay">
      <div>일시정지</div>
      <p style={{ fontSize: '1rem', marginTop: '10px', color: 'var(--color-text)' }}>
        ESC를 눌러 재개하세요
      </p>
    </div>
  );
};

export default PauseOverlay;
