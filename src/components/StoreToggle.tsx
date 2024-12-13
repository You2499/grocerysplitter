import { useState, useEffect } from 'react';

export default function StoreToggle() {
  const [isIndiaBazaar, setIsIndiaBazaar] = useState(false);

  useEffect(() => {
    const store = localStorage.getItem('store');
    setIsIndiaBazaar(store === 'India Bazaar');
  }, []);

  const toggleStore = () => {
    const newStore = isIndiaBazaar ? 'Walmart' : 'India Bazaar';
    setIsIndiaBazaar(!isIndiaBazaar);
    localStorage.setItem('store', newStore);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isIndiaBazaar}
          onChange={toggleStore}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
        {isIndiaBazaar ? 'India Bazaar' : 'Walmart'}
      </span>
    </div>
  );
}