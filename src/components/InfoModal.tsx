import { X } from 'lucide-react';
import useStore from '../store';

export default function InfoModal() {
  const { showInfo, toggleInfo } = useStore();

  if (!showInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={toggleInfo}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Split Grocery
          </h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Split Grocery is a modern web application designed to make splitting grocery bills among groups easy and efficient.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>Create multiple shopping groups to organize your expenses</li>
              <li>Add transactions with descriptions and amounts</li>
              <li>Move transactions between groups if needed</li>
              <li>Works offline - all data is stored locally in your browser</li>
              <li>Dark mode support for comfortable viewing</li>
              <li>Clean and intuitive interface</li>
            </ul>

            <h3>How to Use</h3>
            <ol>
              <li>Create a new group by entering a date and group name</li>
              <li>Add transactions to your groups with descriptions and amounts</li>
              <li>Use the move feature to transfer transactions between groups if needed</li>
              <li>All data is automatically saved in your browser</li>
            </ol>

            <p>
              Your data is stored locally in your browser using IndexedDB, ensuring your information remains private and accessible even without an internet connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 