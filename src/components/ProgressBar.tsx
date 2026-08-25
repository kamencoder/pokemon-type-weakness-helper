type ProgressBarProps = {
  questionNumber: number;
  totalQuestions: number;
  questionsAnsweredCount: number;
};

export function ProgressBar({
  questionNumber,
  totalQuestions,
  questionsAnsweredCount,
}: ProgressBarProps) {
  const percentage = Math.round(questionsAnsweredCount / totalQuestions * 100);
  return (
    <div className="progress-area">
      <div className="progress-label" aria-hidden="true">
        <span>Question {questionNumber} / {totalQuestions}</span>
        <span>{percentage}%</span>
      </div>
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={questionsAnsweredCount}
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${questionNumber} of ${totalQuestions}, ${percentage}% complete`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
