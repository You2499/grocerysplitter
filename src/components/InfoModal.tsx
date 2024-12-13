import { X } from 'lucide-react';
import useStore from '../store';

export default function InfoModal() {
  const { showInfo, toggleInfo } = useStore();

  if (!showInfo) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full shadow-2xl transform transition-all animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Split Grocery
          </h2>
          <button
            onClick={toggleInfo}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 
                     hover:scale-110 active:scale-95"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Split Grocery is a modern web application designed to make splitting grocery bills among groups easy and efficient.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Create multiple shopping groups to organize your expenses</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Add transactions with descriptions and amounts</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Move transactions between groups if needed</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Works offline - all data is stored locally in your browser</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Dark mode support for comfortable viewing</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="text-blue-500">•</span>
                <span>Clean and intuitive interface</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              How to Use
            </h3>
            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-blue-500">1.</span>
                <span>Create a new group by entering a date and group name</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-blue-500">2.</span>
                <span>Add transactions to your groups with descriptions and amounts</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-blue-500">3.</span>
                <span>Use the move feature to transfer transactions between groups if needed</span>
              </li>
              <li className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="font-medium text-blue-500">4.</span>
                <span>All data is automatically saved in your browser</span>
              </li>
            </ol>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <p className="text-gray-600 dark:text-gray-300">
              Your data is stored locally in your browser using IndexedDB, ensuring your information remains private and accessible even without an internet connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 