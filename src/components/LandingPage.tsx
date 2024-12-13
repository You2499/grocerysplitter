import { ArrowRight, Check } from 'lucide-react';
import useStore from '../store';

export default function LandingPage() {
  const { setHasSeenLanding } = useStore();

  const features = [
    'Create and manage multiple shopping groups',
    'Add and track transactions within each group',
    'Move transactions between groups',
    'Dark mode support',
    'Works offline with local storage',
    'Clean and modern UI'
  ];

  const handleGetStarted = () => {
    setHasSeenLanding(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Split Grocery
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A modern way to split grocery bills among groups. Simple, fast, and works offline.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {features.map((feature) => (
              <div key={feature} className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>Made with ❤️ using React, TypeScript, and TailwindCSS</p>
      </footer>
    </div>
  );
} 