import { Modal } from './Modal';
import type { Settings, Mode, DailyMode } from '../Settings';

type SettingsPanelProps = {
  pendingSettings: Settings;
  setPendingSettings: React.Dispatch<React.SetStateAction<Settings>>;
  settingsDirty: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const visibleModes: { mode: Mode; label: string }[] = [
  { mode: 'daily', label: 'Daily' },
  { mode: 'random', label: 'Random' },
];

const dailyModes: { dailyMode: DailyMode; label: string }[] = [
  { dailyMode: 'simple', label: 'Basic' },
  { dailyMode: 'pro', label: 'Pro' },
];

export function SettingsPanel({
  pendingSettings,
  setPendingSettings,
  settingsDirty,
  onCancel,
  onSave,
}: SettingsPanelProps) {
  return (
    <Modal labelledBy="settings-panel-title" onEscape={onCancel} className="settings-panel">
      <p className="settings-panel-header" id="settings-panel-title">Settings</p>
      <button className="settings-close" onClick={onCancel} aria-label="Close settings">✕</button>

      <div className="settings-group">
        <span className="settings-label" id="mode-group-label">Mode</span>
        <div className="settings-mode-controls">
          <div className="settings-options" role="group" aria-labelledby="mode-group-label">
            {visibleModes.map(({ mode, label }) => (
              <button
                key={mode}
                className={`settings-option${pendingSettings.mode === mode ? ' active' : ''}`}
                onClick={() => {
                  setPendingSettings(s => ({ ...s, mode }));
                }}
                aria-pressed={pendingSettings.mode === mode}
              >
                {label}
              </button>
            ))}
          </div>
          {pendingSettings.mode === 'daily' && (
            <div className="settings-options" role="group" aria-label="Daily mode difficulty">
              {dailyModes.map(({ dailyMode, label }) => (
                <button
                  key={dailyMode}
                  className={`settings-option${pendingSettings.dailyMode === dailyMode ? ' active' : ''}`}
                  onClick={() => {
                    const includeDualTypes = dailyMode === 'pro';
                    setPendingSettings(s => ({ ...s, dailyMode, includeDualTypes }));
                  }}
                  aria-pressed={pendingSettings.dailyMode === dailyMode}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {pendingSettings.mode === 'daily' && (
        <div className="settings-group">
          <label className="settings-label" htmlFor="daily-date-input">Date</label>
          <input
            id="daily-date-input"
            type="date"
            className="settings-date"
            value={pendingSettings.dailyDate}
            max={new Date(Date.now() + 86400000).toISOString().slice(0, 10)} // One day in the future so they can take tomorrow's quiz early.
            onKeyDown={() => false}
            onClick={e => {(e.target as any)?.showPicker()}}
            onChange={e => setPendingSettings(s => ({ ...s, dailyDate: e.target.value }))}
          />
        </div>
      )}

      {pendingSettings.mode === 'random' && (
        <>
          <div className="settings-group">
            <span className="settings-label" id="length-group-label">Quiz Length</span>
            <div className="settings-options" role="group" aria-labelledby="length-group-label">
              {[10, 20, 50, 100].map(n => (
                <button
                  key={n}
                  className={`settings-option${pendingSettings.numberOfQuestions === n ? ' active' : ''}`}
                  onClick={() => setPendingSettings(s => ({ ...s, numberOfQuestions: n }))}
                  aria-pressed={pendingSettings.numberOfQuestions === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-group">
            <span className="settings-label" id="dual-group-label">Dual Types</span>
            <div className="settings-options" role="group" aria-labelledby="dual-group-label">
              <button
                className={`settings-option${pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: true }))}
                aria-pressed={pendingSettings.includeDualTypes}
              >
                On
              </button>
              <button
                className={`settings-option${!pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: false }))}
                aria-pressed={!pendingSettings.includeDualTypes}
              >
                Off
              </button>
            </div>
          </div>
        </>
      )}

      {settingsDirty && (
        <div className="settings-actions">
          <button className="settings-cancel" onClick={onCancel}>Cancel</button>
          <button className="settings-save" onClick={onSave}>Save & Restart</button>
        </div>
      )}
    </Modal>
  );
}
