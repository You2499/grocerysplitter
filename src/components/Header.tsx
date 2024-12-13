import { RotateCcw, Info } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import StoreToggle from './StoreToggle';
import useStore from '../store';

export default function Header() {
  const { clearAllData, toggleInfo } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <ThemeToggle />
          
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Split Grocery
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleInfo}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full transition-colors"
              aria-label="Show Information"
            >
              <Info className="w-5 h-5" />
            </button>
            <StoreToggle />
            <button
              onClick={clearAllData}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              aria-label="Start New Transaction"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}