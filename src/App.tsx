import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from './components/AppLayout';
import GroupCard from './components/GroupCard';
import SwitchModal from './components/SwitchModal';
import DemoGuide from './components/DemoGuide'; // Changed import
import useStore from './store';
import { handleDateInput, isValidDate } from './utils/dateUtils';

// DEMO_STEPS array (copied from src/components/DemoPage.tsx)
const DEMO_STEPS = [
  {
    title: "Welcome to GrocerySplitter!",
    description: "This demo will walk you through the main features. GrocerySplitter helps you manage shared grocery expenses seamlessly. Click 'Next' to begin.",
    highlightedElementQuery: "body > div.min-h-screen.flex.flex-col" // More specific: AppLayout's main div
  },
  {
    title: "Creating a New Group",
    description: "Let's start by creating a new group. Enter a date (MM/DD) and a name for your group (e.g., 'Apartment Groceries') in the form below, then click 'Add Group'.",
    highlightedElementQuery: "form.flex.flex-col" 
  },
  {
    title: "Group Created!",
    description: "Great! Your new group card has appeared. This is where you'll manage its expenses.",
    highlightedElementQuery: ".grid .bg-white:first-child" 
  },
  {
    title: "Adding Transactions",
    description: "Now, let's add some grocery items. Inside the group card, enter an item name (e.g., 'Milk') and its price. Then click 'Add'. Add a couple of items.",
    highlightedElementQuery: ".grid .bg-white:first-child form" 
  },
  {
    title: "Viewing Transactions & Total",
    description: "You can see the list of items and the total amount for the group. The app keeps a running total for you.",
    highlightedElementQuery: ".grid .bg-white:first-child .space-y-2:has(h4)" 
  },
  {
    title: "Editing a Transaction",
    description: "Made a mistake? Click the 'Edit' icon (pencil) to modify item names or prices. Make a change, and then click the 'Save' icon (floppy disk).",
    highlightedElementQuery: ".grid .bg-white:first-child button[aria-label='Edit transactions']"
  },
  {
    title: "Copying Information",
    description: "You can easily copy the group name, transaction list, or the total amount using the 'Copy' icons next to them.",
    highlightedElementQuery: ".grid .bg-white:first-child button[aria-label='Copy group name and date']" 
  },
  {
    title: "Dark Mode",
    description: "GrocerySplitter supports dark mode. Click the theme toggle (sun/moon icon) in the header to switch themes.",
    highlightedElementQuery: "header button[aria-label='Toggle theme']" // More direct selector
  },
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

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showDemo, setShowDemo] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Added for demo
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [switchInfo, setSwitchInfo] = useState({ groupId: 0, transactionIndex: 0 });

  const { groups, addGroup, hasSeenLanding, initializeStore } = useStore();

  useEffect(() => {
    const init = async () => {
      await initializeStore();
      setIsLoading(false);
    };
    init();
  }, [initializeStore]);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Demo Handlers
  const handleEndDemo = () => {
    setShowDemo(false); 
    setCurrentStepIndex(0); // Reset for next time
    const store = useStore.getState();
    if (!store.hasSeenLanding) {
      store.setHasSeenLanding(true); // Changed as per instruction
    }
  };

  const handleNextDemoStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleEndDemo(); // Automatically end if it's the last step
    }
  };

  const handlePrevDemoStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.theme = newTheme;
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(date)) {
      setDateError('Please enter a valid date in MM/DD format');
      return;
    }
    if (!groupName) {
      alert('Please enter a group name');
      return;
    }
    addGroup(groupName, date);
    setGroupName('');
    setDate('');
  };

  const handleSwitchTransaction = (groupId: number, transactionIndex: number) => {
    setSwitchInfo({ groupId, transactionIndex });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <AppLayout 
        theme={theme} 
        onThemeToggle={toggleTheme}
        showNewTransaction={false}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </AppLayout>
    );
  }

  if (!hasSeenLanding) {
    return (
      <AppLayout 
        theme={theme} 
        onThemeToggle={toggleTheme}
        showNewTransaction={false}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to GrocerySplitter
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Manage shared grocery expenses seamlessly
            </p>
            <button
              onClick={() => useStore.setState({ hasSeenLanding: true })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowDemo(true)}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Start Demo
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // This variable will be used in the return statement for conditional DemoGuide rendering
  const currentStepData = showDemo ? DEMO_STEPS[currentStepIndex] : null;

  if (showDemo) {
    const demoFormSubmitHandler = (e: React.FormEvent) => {
      e.preventDefault(); 
      // Demo: prevent submission, or potentially advance demo step
    };
    return (
      <> {/* Added Fragment */}
        <AppLayout
          theme={theme}
          onThemeToggle={toggleTheme}
        onNewTransaction={demoFormSubmitHandler} // Demo-proofed handler
        showNewTransaction={true} // Show form UI for demo
      >
        <div className="space-y-8">
          {/* Add Group Form with demo-proofed onSubmit */}
          <form onSubmit={demoFormSubmitHandler} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-none w-full sm:w-24">
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{2}/\d{2}"
                value={date}
                onChange={(e) => handleDateInput(e, setDate, setDateError)}
                placeholder="MM/DD"
                className={`w-full px-4 py-2 rounded-lg border ${
                  dateError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                } dark:bg-gray-800 dark:text-white focus:ring-2 focus:border-transparent`}
              />
              {dateError && (
                <p className="mt-1 text-sm text-red-500">{dateError}</p>
              )}
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="flex-none px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Group</span>
            </button>
          </form>
          {/* Group List (same as normal view) */}
          {Object.values(groups).length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No groups yet. Add your first group above!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(groups).map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onSwitchTransaction={handleSwitchTransaction}
                />
              ))}
            </div>
          )}
        </div>
        {/* Modals and ToastContainer should ideally be outside this specific content block if AppLayout manages them,
            but for this change, we are focused on replacing what DemoPage used to render.
            Assuming AppLayout is the outermost shell for these as well.
            If SwitchModal and ToastContainer are part of the children passed to AppLayout,
            then this structure is fine.
        */}
        <SwitchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fromGroupId={switchInfo.groupId}
          transactionIndex={switchInfo.transactionIndex}
        />
        <ToastContainer
          position="bottom-center"
          theme={theme}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </AppLayout>
      {/* DemoGuide rendered as an overlay */}
      {currentStepData && ( // showDemo is implicitly true here
        <DemoGuide
          step={currentStepIndex + 1}
          totalSteps={DEMO_STEPS.length}
          title={currentStepData.title}
          description={currentStepData.description}
          highlightedElementQuery={currentStepData.highlightedElementQuery}
          onNext={handleNextDemoStep}
          onPrev={handlePrevDemoStep}
          onEnd={handleEndDemo}
        />
      )}
      </> // Closed Fragment
    );
  }

  // For the main app view (not loading, not first landing, not demo)
  return (
    <> {/* Added Fragment */}
      <AppLayout 
        theme={theme} 
        onThemeToggle={toggleTheme}
        onNewTransaction={handleAddGroup} // Real handler for normal mode
        showNewTransaction={true}
      >
        <div className="space-y-8">
        <form onSubmit={handleAddGroup} className="flex flex-col sm:flex-row gap-4"> {/* Real handler for normal mode */}
          <div className="flex-none w-full sm:w-24">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{2}/\d{2}"
              value={date}
              onChange={(e) => handleDateInput(e, setDate, setDateError)}
              placeholder="MM/DD"
              className={`w-full px-4 py-2 rounded-lg border ${
                dateError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              } dark:bg-gray-800 dark:text-white focus:ring-2 focus:border-transparent`}
            />
            {dateError && (
              <p className="mt-1 text-sm text-red-500">{dateError}</p>
            )}
          </div>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="flex-none px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Group</span>
          </button>
        </form>

        {Object.values(groups).length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            No groups yet. Add your first group above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(groups).map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSwitchTransaction={handleSwitchTransaction}
              />
            ))}
          </div>
        )}
      </div>

      <SwitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fromGroupId={switchInfo.groupId}
        transactionIndex={switchInfo.transactionIndex}
      />

      <ToastContainer
        position="bottom-center"
        theme={theme}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </AppLayout>
      {/* DemoGuide is included here too, will not render if showDemo is false */}
      {showDemo && currentStepData && (
        <DemoGuide
          step={currentStepIndex + 1}
          totalSteps={DEMO_STEPS.length}
          title={currentStepData.title}
          description={currentStepData.description}
          highlightedElementQuery={currentStepData.highlightedElementQuery}
          onNext={handleNextDemoStep}
          onPrev={handlePrevDemoStep}
          onEnd={handleEndDemo}
        />
      )}
    </> // Closed Fragment
  );
}