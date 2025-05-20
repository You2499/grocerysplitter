import React, { useEffect, useRef } from 'react';

interface DemoGuideProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  highlightedElementQuery?: string;
  onNext: () => void;
  onPrev: () => void;
  onEnd: () => void;
}

const DemoGuide: React.FC<DemoGuideProps> = ({
  step,
  totalSteps,
  title,
  description,
  highlightedElementQuery,
  onNext,
  onPrev,
  onEnd,
}) => {
  const highlightedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Store the original inline style to restore it later
    const originalInlineStyle = highlightedElementRef.current?.style.cssText;

    if (highlightedElementQuery) {
      const element = document.querySelector(highlightedElementQuery) as HTMLElement;
      if (element) {
        element.classList.add('highlighted-demo-element');
        highlightedElementRef.current = element;
      }
    }

    // Cleanup function
    return () => {
      if (highlightedElementRef.current) {
        highlightedElementRef.current.classList.remove('highlighted-demo-element');
        // Restore original inline styles if any
        if (originalInlineStyle) {
            highlightedElementRef.current.style.cssText = originalInlineStyle;
        }
        highlightedElementRef.current = null;
      }
    };
  }, [highlightedElementQuery]);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  };

  const commonButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const prevButtonStyle: React.CSSProperties = {
    ...commonButtonStyle,
    backgroundColor: '#E5E7EB', // light gray
    color: '#374151', // dark gray text
  };

  const nextFinishButtonStyle: React.CSSProperties = {
    ...commonButtonStyle,
    backgroundColor: '#2563EB', // blue
    color: 'white',
    marginLeft: '10px',
  };

  const endDemoButtonStyle: React.CSSProperties = {
    ...commonButtonStyle,
    backgroundColor: '#DC2626', // red
    color: 'white',
    marginLeft: '10px',
  };
  
  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem', // Equivalent to text-xl in Tailwind
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.875rem', // Equivalent to text-sm
    marginBottom: '16px',
  };


  return (
    <div style={overlayStyle}>
      <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '10px' }}>Step {step} of {totalSteps}</p>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onPrev} disabled={step === 1} style={prevButtonStyle}>
          Previous
        </button>
        <button onClick={onNext} style={nextFinishButtonStyle}>
          {step === totalSteps ? 'Finish' : 'Next'}
        </button>
        <button onClick={onEnd} style={endDemoButtonStyle}>
          End Demo
        </button>
      </div>
    </div>
  );
};

export default DemoGuide;
