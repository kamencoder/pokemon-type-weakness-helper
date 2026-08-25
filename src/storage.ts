import type { AnswerRecord } from './components/ScoreView';
import type { DailyMode } from './Settings';

export type DailyResult = {
  score: number;
  total: number;
  answerHistory: AnswerRecord[];
};

const key = (date: string, dailyMode: DailyMode) => `daily-result-${date}-${dailyMode}`;

export function saveDailyResult(date: string, dailyMode: DailyMode, result: DailyResult): void {
  try {
    localStorage.setItem(key(date, dailyMode), JSON.stringify(result));
    localStorage.setItem('last-daily-mode', dailyMode);
  } catch {
    // Storage full or blocked — fail silently
  }
}

export function getPreferredDailyMode(): DailyMode | null {
  try {
    const stored = localStorage.getItem('preferredDailyMode');
    if (stored === 'pro') return 'pro';
    if (stored === 'simple') return 'simple';
  } catch {}
  return null;
}

export function savePreferredDailyMode(mode: DailyMode): void {
  try {
    localStorage.setItem('preferredDailyMode', mode);
  } catch {}
}

export function loadDailyResult(date: string, dailyMode: DailyMode): DailyResult | null {
  try {
    const raw = localStorage.getItem(key(date, dailyMode));
    if (raw) return JSON.parse(raw) as DailyResult;

    // Fall back to old key format (pre-dailyMode feature) treating it as simple
    if (dailyMode === 'simple') {
      const oldRaw = localStorage.getItem(`daily-result-${date}`);
      if (oldRaw) return JSON.parse(oldRaw) as DailyResult;
    }

    return null;
  } catch {
    return null;
  }
}
