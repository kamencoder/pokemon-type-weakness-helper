import { useMemo } from 'react';
import type { Mode, DailyMode, Settings } from '../Settings';
import smileImg from '../assets/results/smile.svg';
import neutralImg from '../assets/results/neutral.svg';
import frownImg from '../assets/results/frown.svg';
import cryImg from '../assets/results/cry.svg';
import { loadDailyResult } from '../storage';


export type AnswerRecord = {
  questionNumber: number;
  matchupLabel: string;
  correct: boolean;
  userAnswerText: string;
  correctAnswerText: string;
  breakdown: string;
};

type ScoreViewProps = {
  answersCorrectCount: number;
  questionsAnsweredCount: number;
  settings: Settings;
  answerHistory: AnswerRecord[];
  onTryMode: (mode: Mode, dailyMode?: DailyMode) => void;
};

export function ScoreView({
  answersCorrectCount,
  questionsAnsweredCount,
  settings,
  answerHistory,
  onTryMode,
}: ScoreViewProps) {

    const scorePercentage = questionsAnsweredCount
      ? Math.round(answersCorrectCount / questionsAnsweredCount * 100)
      : 0;

    const scoreText = useMemo(() => {
      if (scorePercentage >= 90) return "Outstanding!";
      if (scorePercentage >= 80) return "Great job!";
      if (scorePercentage >= 70) return "You did ok!";
      if (scorePercentage >= 60) return "Keep practicing!";
      return "Better luck next time";
    }, [scorePercentage]);

    const scoreImage = useMemo(() => {
      if (scorePercentage >= 80) return smileImg;
      if (scorePercentage >= 60) return neutralImg;
      if (scorePercentage >= 40) return frownImg;
      return cryImg;
    }, [scorePercentage]);

    const scoreColor = useMemo(() => {
      if (scorePercentage >= 90) return '#48c78e';
      if (scorePercentage >= 80) return '#5b8af0';
      if (scorePercentage >= 70) return '#ffe08a';
      if (scorePercentage >= 60) return '#f4a723';
      return '#f14668';
    }, [scorePercentage]);


  // Check whether the Pro daily has already been completed (used for the "Try Pro Mode" prompt).
  const proAlreadyDone = useMemo(() => {
    return loadDailyResult(settings.dailyDate, 'pro') !== null;
  }, [settings.mode, settings.dailyDate]);

  const simpleAlreadyDone= useMemo(() => {
    return loadDailyResult(settings.dailyDate, 'simple') !== null;
  }, [settings.mode, settings.dailyDate]);

  const showTryProButton = !proAlreadyDone;
  const showTrySimpleButton = !simpleAlreadyDone;
  
  const showRandomButton = !showTrySimpleButton || !showTryProButton; // Make sure we only show two buttons  

  return (
    <div className="score-view">
      {/* Announced to screen readers when the score view renders */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Quiz complete. You scored {answersCorrectCount} out of {questionsAnsweredCount}, {scorePercentage} percent. {scoreText}
      </div>
      <div className="score-hero">
        <img src={scoreImage} className="score-image" alt="" aria-hidden="true" />
        <div className="score-percentage" style={{ color: scoreColor }} aria-hidden="true">{scorePercentage}%</div>
      </div>
      <div className="score-tier-text">{scoreText}</div>
      {/* <div className="score-detail">{answersCorrectCount} / {questionsAnsweredCount} correct</div> */}
       {answerHistory.length > 0 && (
        <details className="answer-review">
          <summary className="answer-review-toggle">
            <span>{answersCorrectCount} / {questionsAnsweredCount} correct</span>
            <svg className="answer-review-chevron" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="5 8 10 13 15 8" />
            </svg>
          </summary>
          <div className="answer-review-list">
            {answerHistory.map((record, i) => (
              <div key={i} className={`answer-review-row ${record.correct ? 'correct' : 'incorrect'}`}>
                <div className="answer-review-icon" aria-hidden="true">{record.correct ? '✓' : '✗'}</div>
                <div className="answer-review-content">
                  <div className="answer-review-matchup">
                    <span className="answer-review-num">Q{record.questionNumber}</span>
                    {record.matchupLabel}
                  </div>
                  <div className="answer-review-answers">
                    {record.correct
                      ? <span className="answer-review-correct">{record.correctAnswerText}</span>
                      : <>
                          <span className="answer-review-wrong">{record.userAnswerText}</span>
                          <span> → </span>
                          <span className="answer-review-correct">{record.correctAnswerText}</span>
                        </>
                    }
                    {record.breakdown && (
                      <span className="answer-review-breakdown"> · {record.breakdown}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
      <div className="try-another-section">
        <p className="try-another-header">Try another</p>
        <div className="try-another-buttons">
          {showTrySimpleButton && (
            <button className="primary-button" onClick={() => onTryMode('daily', 'simple')}>
              Simple Daily
            </button>
          )}
          {showTryProButton && (
            <button className="primary-button" onClick={() => onTryMode('daily', 'pro')}>
              Pro Daily
            </button>
          )}
          {showRandomButton && (
            <button className="primary-button" onClick={() => onTryMode('random')}>
              Random
            </button>
          )}
        </div>
      </div>
      {settings.mode === 'daily' && (
        <p className="score-did-you-know">Come back tomorrow for a new daily challenge!</p>
      )}

      <p className="score-did-you-know">
        Did you know? There are{' '}
        <strong>{settings.includeDualTypes ? '3,078' : '324'}</strong>{' '}
        possible type matchups{settings.includeDualTypes ? ' when including both single and dual type pokemon' : ' for single type pokemon'}.

        {/* There are 171 total possible unique type combinations (18 single-type options plus 153 dual-type pairs). Of those, only 9 dual-type combinations are not represented by an existing pokemon.*/}
      </p>
    </div>
  );
}
