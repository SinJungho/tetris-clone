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
        <h2>게임 조작법</h2>
        <ul className="controls-list">
          <li><span>왼쪽 / 오른쪽 화살표</span> <span>블록 이동</span></li>
          <li><span>위쪽 화살표</span> <span>블록 회전</span></li>
          <li><span>아래쪽 화살표</span> <span>소프트 드롭</span></li>
          <li><span>스페이스바</span> <span>하드 드롭</span></li>
          <li><span>ESC</span> <span>일시정지 / 재개</span></li>
        </ul>
        <button className="start-button" onClick={onDismiss}>게임 시작</button>
      </div>
    </div>
  );
};

export default ControlsPopup;
