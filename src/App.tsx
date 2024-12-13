import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import useStore from './store';
import ThemeToggle from './components/ThemeToggle';
import StoreToggle from './components/StoreToggle';
import GroupCard from './components/GroupCard';
import SwitchModal from './components/SwitchModal';
import Header from './components/Header';
import { handleDateInput, isValidDate } from './utils/dateUtils';

export default function App() {
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [switchInfo, setSwitchInfo] = useState({ groupId: 0, transactionIndex: 0 });

  const { groups, addGroup, clearAllData, initializeStore } = useStore();

  useEffect(() => {
    const init = async () => {
      await initializeStore();
      setIsLoading(false);
    };
    init();
  }, [initializeStore]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <form onSubmit={handleAddGroup} className="flex flex-col sm:flex-row gap-4">
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
      </main>
    </div>
  );
}