export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  const progress = (currentStep / totalSteps) * 100;
  
  const getStepText = () => {
    switch(currentStep) {
      case 1: return 'Basic Info';
      case 2: return 'Fitness Background';
      case 3: return 'Goals & Body Type';
      case 4: return 'Set Your Goal';
      default: return 'Complete';
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-habesha-charcoal">
          Step {currentStep} of {totalSteps}: {getStepText()}
        </span>
        <span className="text-sm font-medium text-habesha-green">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}