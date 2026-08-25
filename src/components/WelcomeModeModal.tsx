import { useEffect, useRef } from 'react';
import type { DailyMode } from '../Settings';

type Props = {
  onSelect: (mode: DailyMode) => void;
};

function trapFocus(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.key !== 'Tab') return;
  const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function WelcomeModeModal({ onSelect }: Props) {
  const proRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    proRef.current?.focus();
  }, []);

  return (
    <div className="modal-overlay">
      <div
        className="welcome-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-desc"
        onKeyDown={trapFocus}
      >
        <h2 className="welcome-modal-title" id="welcome-modal-title">Welcome!</h2>
        <p className="welcome-modal-subtitle" id="welcome-modal-desc">Choose your preferred mode</p>
        <div className="welcome-modal-options">
          <button
            ref={proRef}
            className="welcome-mode-option"
            onClick={() => onSelect('pro')}
          >
            <span className="welcome-mode-header">
              <span className="welcome-mode-name">Pro</span>
              <span className="welcome-mode-badge">Default</span>
            </span>
            <span className="welcome-mode-desc">Quiz includes dual-type defenders. Ideal for more experienced trainers</span>
          </button>
          <button
            className="welcome-mode-option"
            onClick={() => onSelect('simple')}
          >
            <span className="welcome-mode-header">
              <span className="welcome-mode-name">Basic</span>
            </span>
            <span className="welcome-mode-desc">Quiz only shows single-type defenders. Ideal for beginner or rusty trainers</span>
          </button>
        </div>
        <p className="welcome-modal-hint">You can change this any time in Settings</p>
      </div>
    </div>
  );
}
