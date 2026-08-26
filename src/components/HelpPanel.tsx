import { useEffect, useRef } from 'react';
import { effectivenessValueDetailList, getEffectivenessColor } from '../data/weaknesses';

type HelpPanelProps = {
  id?: string;
  includeDualTypes: boolean;
  onClose: () => void;
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

export function HelpPanel({ id, onClose, includeDualTypes }: HelpPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();
  }, []);

  return (
    <div
      id={id}
      className="help-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-panel-title"
      ref={panelRef}
      onKeyDown={trapFocus}
    >
      <h2 id="help-panel-title" className="sr-only">Damage Multipliers</h2>
      <button className="help-close" onClick={onClose} aria-label="Close help">✕</button>
      {effectivenessValueDetailList.map(detail => 
      {
        if (!includeDualTypes && (detail.value === 0.25 || detail.value === 4)){
          return null;
        }

        const helpText = includeDualTypes ? detail.helpText : (detail.helpTextSimple || detail.helpText)
        return  (
        <div key={detail.value} className="help-row">
          <div className="help-badge" style={{ backgroundColor: getEffectivenessColor(detail.value) }}>
            {detail.buttonText}
          </div>
          <div>
            <span className="help-title">{detail.helpTitle}</span>
            <span className="help-desc">{helpText}</span>
          </div>
        </div>
      )
    }
      )}
    </div>
  );
}
