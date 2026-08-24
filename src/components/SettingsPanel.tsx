import type { Settings, Mode } from '../Settings';

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

export function SettingsPanel({
  pendingSettings,
  setPendingSettings,
  settingsDirty,
  onCancel,
  onSave,
}: SettingsPanelProps) {
  return (
    <div className="settings-panel">
      <div className="settings-group">
        <span className="settings-label">Mode</span>
        <div className="settings-options">
          {visibleModes.map(({ mode, label }) => (
            <button
              key={mode}
              className={`settings-option${pendingSettings.mode === mode ? ' active' : ''}`}
              onClick={() => setPendingSettings(s => ({ ...s, mode }))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {pendingSettings.mode === 'daily' && (
        <div className="settings-group">
          <span className="settings-label">Date</span>
          <input
            type="date"
            className="settings-date"
            value={pendingSettings.dailyDate}
            max={new Date().toISOString().slice(0, 10)}
            onChange={e => setPendingSettings(s => ({ ...s, dailyDate: e.target.value }))}
          />
        </div>
      )}

      {pendingSettings.mode === 'random' && (
        <>
          <div className="settings-group">
            <span className="settings-label">Quiz Length</span>
            <div className="settings-options">
              {[10, 20, 50, 100].map(n => (
                <button
                  key={n}
                  className={`settings-option${pendingSettings.numberOfQuestions === n ? ' active' : ''}`}
                  onClick={() => setPendingSettings(s => ({ ...s, numberOfQuestions: n }))}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-group">
            <span className="settings-label">Dual Types</span>
            <div className="settings-options">
              <button
                className={`settings-option${pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: true }))}
              >
                On
              </button>
              <button
                className={`settings-option${!pendingSettings.includeDualTypes ? ' active' : ''}`}
                onClick={() => setPendingSettings(s => ({ ...s, includeDualTypes: false }))}
              >
                Off
              </button>
            </div>
          </div>
        </>
      )}

      {settingsDirty && (
        <>
          <div className="settings-actions">
            <button className="settings-cancel" onClick={onCancel}>Cancel</button>
            <button className="settings-save" onClick={onSave}>Save & Restart</button>
          </div>
        </>
      )}
    </div>
  );
}
