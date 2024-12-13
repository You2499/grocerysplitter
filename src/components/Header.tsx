import { RotateCcw, Info } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import StoreToggle from './StoreToggle';
import useStore from '../store';

export default function Header() {
  const { clearAllData, toggleInfo } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <ThemeToggle />
          
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Split Grocery
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleInfo}
              className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 
                       hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200 
                       hover:scale-105 active:scale-95"
              aria-label="Show Information"
            >
              <Info className="w-5 h-5" />
            </button>
            
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            
            <StoreToggle />
            
            <button
              onClick={clearAllData}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg 
                       transition-all duration-200 hover:scale-105 active:scale-95"
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