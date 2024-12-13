import type { Group } from '../types';
import useStore from '../store';

interface SwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromGroupId: number;
  transactionIndex: number;
}

export default function SwitchModal({
  isOpen,
  onClose,
  fromGroupId,
  transactionIndex,
}: SwitchModalProps) {
  const { groups, switchTransaction } = useStore();
  const fromGroup = groups[fromGroupId];
  const transaction = fromGroup?.transactions[transactionIndex];

  const handleSwitch = (toGroupId: number) => {
    switchTransaction(fromGroupId, toGroupId, transactionIndex);
    onClose();
  };

  if (!isOpen || !transaction) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-medium mb-4 dark:text-gray-100">
            Switch Transaction
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {transaction.particular} - ${transaction.amount.toFixed(2)}
            </div>
          </h2>

          <div className="space-y-4">
            {Object.values(groups)
              .filter((g) => g.id !== fromGroupId)
              .map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleSwitch(group.id)}
                  className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors dark:text-gray-100"
                >
                  {group.name}
                </button>
              ))}
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors dark:text-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}