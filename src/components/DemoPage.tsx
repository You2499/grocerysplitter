import React from 'react';
import App from '../App'; // This App import is part of the problem we eventually want to solve
import DemoGuide from './DemoGuide';

interface DemoStep { // Define this if not already globally available
  title: string;
  description: string;
  highlightedElementQuery?: string;
}

interface DemoPageProps {
  currentStepIndex: number;
  DEMO_STEPS: DemoStep[];
  onNext: () => void;
  onPrev: () => void;
  onEnd: () => void;
}

const DemoPage: React.FC<DemoPageProps> = ({
  currentStepIndex,
  DEMO_STEPS,
  onNext,
  onPrev,
  onEnd
}) => {
  const currentStepData = DEMO_STEPS[currentStepIndex];

  // DemoPage no longer needs to return null or handle isDemoActive internally,
  // as App.tsx's showDemo state controls whether DemoPage is rendered at all.
  if (!currentStepData) {
    // This might happen if currentStepIndex is out of bounds, though App.tsx should prevent this.
    // Or, if DEMO_STEPS is empty.
    return null; 
  }

  return (
    <div>
      <App /> {/* This nested App is still here, will be removed in the next major step */}
      <DemoGuide
        step={currentStepIndex + 1}
        totalSteps={DEMO_STEPS.length}
        title={currentStepData.title}
        description={currentStepData.description}
        highlightedElementQuery={currentStepData.highlightedElementQuery}
        onNext={onNext}
        onPrev={onPrev}
        onEnd={onEnd}
      />
    </div>
  );
};

export default DemoPage;
