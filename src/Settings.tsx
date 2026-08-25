export type Mode = 'daily' | 'random';
export type DailyMode = 'simple' | 'pro';

export type Settings = {
    numberOfQuestions: number;
    includeDualTypes: boolean;
    mode: Mode;
    dailyDate: string;
    dailyMode: DailyMode;
}

export const defaultSettings: Settings = {
    numberOfQuestions: 20,
    includeDualTypes: true,
    mode: 'daily',
    dailyDate: new Date().toISOString().slice(0, 10),
    dailyMode: 'simple',
}

function getLastDailyMode(): DailyMode {
    try {
        const stored = localStorage.getItem('last-daily-mode');
        if (stored === 'pro') return 'pro';
    } catch {}
    return 'simple';
}

export function getInitialSettings(): Settings {
    // Hash params (#mode=daily) are preferred for shareable links because they
    // are never sent to the server, so they survive redirects (e.g. /repo → /repo/).
    // Query params (?mode=daily) work as a fallback when there is a trailing slash.
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const search = new URLSearchParams(window.location.search);
    const get = (key: string) => hash.get(key) ?? search.get(key);

    const result = { ...defaultSettings, dailyMode: getLastDailyMode() };

    const mode = get('mode');
    if (mode && (['daily', 'random'] as string[]).includes(mode)) {
        result.mode = mode as Mode;
    }

    const n = Number(get('numberOfQuestions'));
    if ([10, 20, 50, 100].includes(n)) {
        result.numberOfQuestions = n;
    }

    const dual = get('includeDualTypes');
    if (dual === 'true') result.includeDualTypes = true;
    if (dual === 'false') result.includeDualTypes = false;

    const dailyDate = get('dailyDate');
    if (dailyDate && /^\d{4}-\d{2}-\d{2}$/.test(dailyDate) && !isNaN(Date.parse(dailyDate))) {
        result.dailyDate = dailyDate;
    }
    if (!result.dailyDate)
    {
        // If date is not set in URL, default to today
        result.dailyDate = (new Date()).toISOString().slice(0, 10)
    }

    const dailyMode = get('dailyMode');
    if (dailyMode === 'pro') result.dailyMode = 'pro';
    if (dailyMode === 'simple') result.dailyMode = 'simple';

    return result;
}
