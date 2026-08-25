import { useMemo, useEffect, useState } from 'react'
import posthog from 'posthog-js'
import './App.css'
import { effectivenessDetails, evaluateMatchup, getExpectedScorePercentage, getRandomMatchup, type EffectivenessModifier, type Matchup } from './data/weaknesses';
import { getDailyMatchups } from './data/weaknesses';
import { getInitialSettings, type Settings, type Mode, type DailyMode } from './Settings';
import { saveDailyResult, loadDailyResult } from './storage';

import { Header } from './components/Header';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressBar } from './components/ProgressBar';
import { MatchupCard } from './components/MatchupCard';
import { AnswerButton } from './components/AnswerButton';
import { HelpPanel } from './components/HelpPanel';
import { ResultBanner } from './components/ResultBanner';
import { ScoreView, type AnswerRecord } from './components/ScoreView';

const DAILY_QUESTION_COUNT = 20;

function buildMatchupQueue(s: Settings): Matchup[] {
  if (s.mode === 'daily') return getDailyMatchups(DAILY_QUESTION_COUNT, s.dailyDate, s.dailyMode === 'pro');
  return Array.from({ length: s.numberOfQuestions }, () =>
    getRandomMatchup(s.includeDualTypes ? 2 : 1)
  );
}

const initialSettings = getInitialSettings();
const storedInitial = initialSettings.mode === 'daily'
  ? loadDailyResult(initialSettings.dailyDate, initialSettings.dailyMode)
  : null;

function App() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [matchupQueue, setMatchupQueue] = useState<Matchup[]>(() => buildMatchupQueue(initialSettings));
  const [currentIndex, setCurrentIndex] = useState(storedInitial ? storedInitial.total - 1 : 0);
  const [answersCorrectCount, setAnswersCorrectCount] = useState(storedInitial?.score ?? 0);
  const [showResults, setShowResults] = useState(storedInitial != null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [lastAnswerValue, setLastAnswerValue] = useState<EffectivenessModifier | undefined>(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<Settings>(initialSettings);
  const [viewScore, setViewScore] = useState(storedInitial != null);
  const [showHelp, setShowHelp] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>(storedInitial?.answerHistory ?? []);

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [showResults]);

  const currentMatchup = matchupQueue[currentIndex];
  const totalQuestions = matchupQueue.length;
  const questionsAnsweredCount = currentIndex + (showResults ? 1 : 0);
  const finished = showResults && currentIndex >= matchupQueue.length - 1;


  const currentMatchupResults = useMemo(() => {
    if (!currentMatchup) return undefined;
    return evaluateMatchup(currentMatchup);
  }, [currentMatchup]);

  const resultsBreakdown = useMemo(() => {
    if ((currentMatchupResults?.breakdown?.length || 0) < 1) return "";
    return currentMatchupResults!.breakdown
      .map(result => `${result.defendingType.name}: x${result.effectiveness}`)
      .join(", ");
  }, [currentMatchupResults]);

  const settingsDirty =
    pendingSettings.numberOfQuestions !== settings.numberOfQuestions ||
    pendingSettings.includeDualTypes !== settings.includeDualTypes ||
    pendingSettings.mode !== settings.mode ||
    pendingSettings.dailyDate !== settings.dailyDate ||
    pendingSettings.dailyMode !== settings.dailyMode;

  // For daily mode, dual types is determined by dailyMode (pro = dual, simple = single).
  // For random mode, respect the includeDualTypes setting.
  const effectiveIncludeDualTypes =
    settings.mode === 'daily' ? settings.dailyMode === 'pro' : settings.includeDualTypes;

  const showAllMultiplierButtons = effectiveIncludeDualTypes;

  const resetQuiz = (s: Settings) => {
    const stored = s.mode === 'daily' ? loadDailyResult(s.dailyDate, s.dailyMode) : null;
    setMatchupQueue(buildMatchupQueue(s));
    setCurrentIndex(stored ? stored.total - 1 : 0);
    setAnswersCorrectCount(stored ? stored.score : 0);
    setShowResults(stored != null);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setViewScore(stored != null);
    setAnswerHistory(stored ? stored.answerHistory : []);
  };

  const toggleSettings = () => {
    setPendingSettings(settings);
    setSettingsOpen(s => !s);
  };

  const cancelSettings = () => {
    setPendingSettings(settings);
    setSettingsOpen(false);
  };

  const saveSettings = () => {
    setSettings(pendingSettings);
    setSettingsOpen(false);
    resetQuiz(pendingSettings);
  };

  const onNewMatchupClick = () => {
    setShowResults(false);
    setLastAnswerCorrect(undefined);
    setLastAnswerValue(undefined);
    setCurrentIndex(i => i + 1);
  };

  const onTryMode = (mode: Mode, dailyMode?: DailyMode) => {
    const newSettings = { ...settings, mode };
    if (dailyMode){
      newSettings.dailyMode = dailyMode;
    }
    setSettings(newSettings);
    setPendingSettings(newSettings);
    resetQuiz(newSettings);
  };

  const checkAnswer = (userAnswer: EffectivenessModifier) => {
    setLastAnswerValue(userAnswer);
    const correct = userAnswer === currentMatchupResults?.totalEffectiveness;
    setLastAnswerCorrect(correct);
    if (correct) setAnswersCorrectCount(a => a + 1);
    setShowResults(true);

    const defending = currentMatchup!.defendingTypes.map(d => d.name).join('/');

    const newRecord = {
      questionNumber: currentIndex + 1,
      matchupLabel: `${currentMatchup!.attackingType.name} → ${defending}`,
      correct,
      userAnswerText: effectivenessDetails[userAnswer].buttonText,
      correctAnswerText: effectivenessDetails[currentMatchupResults!.totalEffectiveness].buttonText,
      breakdown: resultsBreakdown,
    };
    const newHistory = [...answerHistory, newRecord];
    setAnswerHistory(newHistory);

    if (settings.mode === 'daily' && currentIndex >= matchupQueue.length - 1) {
      saveDailyResult(settings.dailyDate, settings.dailyMode, {
        score: answersCorrectCount + (correct ? 1 : 0),
        total: matchupQueue.length,
        answerHistory: newHistory,
      });

      const finalCorrect = answersCorrectCount + (correct ? 1 : 0);
      const finalTotal = questionsAnsweredCount + 1;
      const scorePercentage = Math.round(finalCorrect / finalTotal * 100);
      posthog.capture('test_results', {
        score_percentage: scorePercentage,
        expected_percentage: getExpectedScorePercentage(matchupQueue),
        correct: finalCorrect,
        total_questions: finalTotal,
        settings_question_count: settings.numberOfQuestions,
        settings_test_type: settings.mode,
        settings_daily_date: settings.dailyDate,
        settings_dual_types: effectiveIncludeDualTypes,
        settings_daily_mode: settings.dailyMode,
      })
    }

    posthog.capture('matchup_answered', {
      matchup: `${currentMatchup!.attackingType.name} vs ${defending}`,
      attacking_type: currentMatchup!.attackingType.name,
      defending_types: defending,
      correct_answer: currentMatchupResults?.totalEffectiveness,
      user_answer: userAnswer,
      correct,
      mode: settings.mode,
    });
  };

  return (
    <>
      <Header
        mode={settings.mode}
        dailyDate={settings.dailyDate}
        dailyMode={settings.dailyMode}
        onSettingsClick={toggleSettings}
      />

      {settingsOpen && (
        <SettingsPanel
          pendingSettings={pendingSettings}
          setPendingSettings={setPendingSettings}
          settingsDirty={settingsDirty}
          onCancel={cancelSettings}
          onSave={saveSettings}
        />
      )}

      {viewScore ? (
        <ScoreView
          answersCorrectCount={answersCorrectCount}
          questionsAnsweredCount={questionsAnsweredCount}
          settings={settings}
          answerHistory={answerHistory}
          onTryMode={onTryMode}
        />
      ) : (
        <>
          <ProgressBar
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            questionsAnsweredCount={questionsAnsweredCount}
          />

          {currentMatchup && <MatchupCard matchup={currentMatchup} />}

          <div className="interaction-area">
            {currentMatchup ? (
              <>
                <div className="question-row">
                  <div className="question-text">What is the damage multiplier for the attack?</div>
                  <button
                    className={`help-trigger${showHelp ? ' active' : ''}`}
                    onClick={() => setShowHelp(h => !h)}
                    aria-label="Explain multipliers"
                  >
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="9"/>
                      <text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="700" stroke="none" fill="currentColor">?</text>
                    </svg>
                  </button>
                </div>

                {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

                <div className="answer-buttons">
                  {[0.25, 0.5, 1, 2, 4].map(value => (
                    <AnswerButton
                      key={value}
                      effectivenessDetail={effectivenessDetails[value as EffectivenessModifier]}
                      showResults={showResults}
                      includeDualTypes={showAllMultiplierButtons}
                      correctAnswer={currentMatchupResults?.totalEffectiveness}
                      lastAnswerValue={lastAnswerValue}
                      onAnswer={checkAnswer}
                    />
                  ))}
                </div>
                <div className="answer-buttons answer-buttons-immune" style={{ marginTop: '1rem' }}>
                  <AnswerButton
                    key={0}
                    effectivenessDetail={effectivenessDetails[0 as EffectivenessModifier]}
                    showResults={showResults}
                    includeDualTypes={showAllMultiplierButtons}
                    correctAnswer={currentMatchupResults?.totalEffectiveness}
                    lastAnswerValue={lastAnswerValue}
                    onAnswer={checkAnswer}
                  />
                </div>

                {showResults && (
                  <ResultBanner
                    lastAnswerCorrect={lastAnswerCorrect!}
                    totalEffectivenessDescription={currentMatchupResults?.totalEffectivenessDescription}
                    resultsBreakdown={resultsBreakdown}
                    finished={finished}
                    onNext={onNewMatchupClick}
                    onViewScore={() => setViewScore(true)}
                  />
                )}
              </>
            ) : (
              <button className="primary-button" onClick={onNewMatchupClick}>Next Matchup</button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App
