import { getEffectivenessColor, type EffectivenessModifier, type EffectivenessLevelDetail } from '../data/weaknesses';

type AnswerButtonProps = {
  effectivenessDetail: EffectivenessLevelDetail;
  showResults: boolean;
  includeDualTypes: boolean;
  correctAnswer: EffectivenessModifier | undefined;
  lastAnswerValue: EffectivenessModifier | undefined;
  onAnswer: (value: EffectivenessModifier) => void;
};

export function AnswerButton({
  effectivenessDetail,
  showResults,
  includeDualTypes,
  correctAnswer,
  lastAnswerValue,
  onAnswer,
}: AnswerButtonProps) {
  const { value, buttonText, easyButtonText } = effectivenessDetail;

  if (!includeDualTypes && (value === 0.25 || value === 4)) {
    return null;
  }

  let stateClass = '';
  if (showResults) {
    const isCorrectAnswer = value === correctAnswer;
    const isSelectedWrong = value === lastAnswerValue && !isCorrectAnswer;

    if (isCorrectAnswer) {
      stateClass = 'answer-correct';
    } else if (isSelectedWrong) {
      stateClass = 'answer-selected-wrong';
    } else {
      stateClass = 'answer-dimmed';
    }
  }

  const label = effectivenessDetail.description;

  return (
    <button
      className={`answer-button ${stateClass} ${!includeDualTypes ? 'easymode' : ''}`}
      style={{ backgroundColor: getEffectivenessColor(value) }}
      onClick={() => onAnswer(value)}
      disabled={showResults}
      aria-label={label}
    >
      {includeDualTypes ? buttonText : easyButtonText}
    </button>
  );
}
