import type { AnswerRecord } from './components/ScoreView';

export type DailyResult = {
  score: number;
  total: number;
  answerHistory: AnswerRecord[];
};

const key = (date: string) => `daily-result-${date}`;

export function saveDailyResult(date: string, result: DailyResult): void {
  try {
    localStorage.setItem(key(date), JSON.stringify(result));
  } catch {
    // Storage full or blocked — fail silently
  }
}

export function loadDailyResult(date: string): DailyResult | null {
  try {
    const raw = localStorage.getItem(key(date));
    if (!raw) return null;
    return JSON.parse(raw) as DailyResult;
  } catch {
    return null;
  }
}
