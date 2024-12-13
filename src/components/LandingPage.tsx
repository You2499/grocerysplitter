import { ArrowRight, Check } from 'lucide-react';
import useStore from '../store';
import ThemeToggle from './ThemeToggle';

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
      <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="w-10" />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Split Grocery
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Split Grocery
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A modern way to split grocery bills among groups. Simple, fast, and works offline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {features.map((feature) => (
              <div 
                key={feature} 
                className="flex items-start space-x-3 p-4 rounded-xl bg-white dark:bg-gray-800/50 
                         shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <Check className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-500 
                     rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 
                     hover:scale-105 active:scale-95"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
        <p>Made with ❤️ using React, TypeScript, and TailwindCSS</p>
      </footer>
    </div>
  );
} 