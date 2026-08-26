import type { DailyMode } from '../Settings';
import { Modal } from './Modal';

type Props = {
  onSelect: (mode: DailyMode) => void;
};

export function WelcomeModeModal({ onSelect }: Props) {
  return (
    <Modal labelledBy="welcome-modal-title" describedBy="welcome-modal-desc" className="welcome-modal">
      <h2 className="welcome-modal-title" id="welcome-modal-title">Welcome!</h2>
      <p className="welcome-modal-subtitle" id="welcome-modal-desc">Choose your preferred mode</p>
      <div className="welcome-modal-options">
        <button className="welcome-mode-option" onClick={() => onSelect('pro')}>
          <span className="welcome-mode-header">
            <span className="welcome-mode-name">Pro</span>
            <span className="welcome-mode-badge">Default</span>
          </span>
          <span className="welcome-mode-desc">Quiz includes dual-type defenders. Ideal for more experienced trainers</span>
        </button>
        <button className="welcome-mode-option" onClick={() => onSelect('simple')}>
          <span className="welcome-mode-header">
            <span className="welcome-mode-name">Basic</span>
          </span>
          <span className="welcome-mode-desc">Quiz only shows single-type defenders. Ideal for beginner or rusty trainers</span>
        </button>
      </div>
      <p className="welcome-modal-hint">You can change this any time in Settings</p>
    </Modal>
  );
}
