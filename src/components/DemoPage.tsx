import React, { useState } from 'react';
import App from '../App';
import DemoGuide from './DemoGuide';

const DEMO_STEPS = [
  {
    title: "Welcome to GrocerySplitter!",
    description: "This demo will walk you through the main features. GrocerySplitter helps you manage shared grocery expenses seamlessly. Click 'Next' to begin.",
    highlightedElementQuery: "body > div.min-h-screen.flex.flex-col" // More specific: AppLayout's main div
  },
  {
    title: "Creating a New Group",
    description: "Let's start by creating a new group. Enter a date (MM/DD) and a name for your group (e.g., 'Apartment Groceries') in the form below, then click 'Add Group'.",
    // Assuming the form is identifiable. The button is specific.
    highlightedElementQuery: "form.flex.flex-col" 
  },
  {
    title: "Group Created!",
    description: "Great! Your new group card has appeared. This is where you'll manage its expenses.",
    // Assuming GroupCards are rendered in a grid. This targets the first one.
    highlightedElementQuery: ".grid .bg-white:first-child" 
  },
  {
    title: "Adding Transactions",
    description: "Now, let's add some grocery items. Inside the group card, enter an item name (e.g., 'Milk') and its price. Then click 'Add'. Add a couple of items.",
    // Targets the add transaction form within the first group card
    highlightedElementQuery: ".grid .bg-white:first-child form" 
  },
  {
    title: "Viewing Transactions & Total",
    description: "You can see the list of items and the total amount for the group. The app keeps a running total for you.",
    // Targets the transaction list area and total in the first group card
    highlightedElementQuery: ".grid .bg-white:first-child .space-y-2:has(h4)" 
  },
  {
    title: "Editing a Transaction",
    description: "Made a mistake? Click the 'Edit' icon (pencil) to modify item names or prices. Make a change, and then click the 'Save' icon (floppy disk).",
     // Targets the edit icon in the first group card
    highlightedElementQuery: ".grid .bg-white:first-child button[aria-label='Edit transactions']"
  },
  {
    title: "Copying Information",
    description: "You can easily copy the group name, transaction list, or the total amount using the 'Copy' icons next to them.",
    // Targets a copy icon (e.g., one for group name)
    highlightedElementQuery: ".grid .bg-white:first-child button[aria-label='Copy group name and date']" 
  },
  {
    title: "Dark Mode",
    description: "GrocerySplitter supports dark mode. Click the theme toggle (sun/moon icon) in the header to switch themes.",
    highlightedElementQuery: "header button[aria-label='Toggle theme']" // More direct selector
  },
  // Optional: Switching a transaction can be complex to demo automatically.
  // We might simplify or skip this if selectors are too hard without seeing it run.
  // For now, let's assume a basic description.
  {
    title: "Switching Transactions (Advanced)",
    description: "If you add an item to the wrong group, you can switch it. First, ensure you have at least two groups. Then, in edit mode, click the 'Switch' icon (arrows) next to a transaction and select the target group.",
    highlightedElementQuery: ".grid .bg-white:first-child button[aria-label='Switch transaction']" // Placeholder, might need another group existing
  },
  {
    title: "Demo Complete!",
    description: "You've seen the core features of GrocerySplitter! Click 'Finish' to exit the demo and start managing your own expenses.",
  }
];

interface DemoPageProps {
  onDemoEnd?: () => void;
}

const DemoPage: React.FC<DemoPageProps> = ({ onDemoEnd }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDemoActive, setIsDemoActive] = useState(true);

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleEndDemo();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleEndDemo = () => {
    setIsDemoActive(false);
    if (onDemoEnd) {
      onDemoEnd();
    }
    // For now, it just hides the demo guide and calls the callback.
    console.log("Demo ended via DemoPage.");
  };

  const currentStepData = DEMO_STEPS[currentStepIndex];

  return (
    <div>
      <App />
      {isDemoActive && currentStepData && (
        <DemoGuide
          step={currentStepIndex + 1}
          totalSteps={DEMO_STEPS.length}
          title={currentStepData.title}
          description={currentStepData.description}
          highlightedElementQuery={currentStepData.highlightedElementQuery}
          onNext={handleNext}
          onPrev={handlePrev}
          onEnd={handleEndDemo}
        />
      )}
    </div>
  );
};

export default DemoPage;
