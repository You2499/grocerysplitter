import { X } from 'lucide-react';
import useStore from '../store';

export default function InfoModal() {
  const { showInfo, toggleInfo } = useStore();

  if (!showInfo) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Split Grocery
          </h2>
          <button
            onClick={toggleInfo}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Split Grocery is a modern web application designed to make splitting grocery bills among groups easy and efficient.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Create multiple shopping groups to organize your expenses
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Add transactions with descriptions and amounts
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Move transactions between groups if needed
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Works offline - all data is stored locally in your browser
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Dark mode support for comfortable viewing
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Clean and intuitive interface
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              How to Use
            </h3>
            <ol className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 font-semibold">1.</span>
                Create a new group by entering a date and group name
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">2.</span>
                Add transactions to your groups with descriptions and amounts
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">3.</span>
                Use the move feature to transfer transactions between groups if needed
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-semibold">4.</span>
                All data is automatically saved in your browser
              </li>
            </ol>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            Your data is stored locally in your browser using IndexedDB, ensuring your information remains private and accessible even without an internet connection.
          </p>
        </div>
      </div>
    </div>
  );
} 