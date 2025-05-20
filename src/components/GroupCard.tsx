import { useState } from 'react';
import { Copy, Edit, Save, Trash2, ArrowLeftRight } from 'lucide-react';
import type { Group, Transaction } from '../types';
import useStore from '../store';

interface GroupCardProps {
  group: Group;
  onSwitchTransaction: (groupId: number, transactionIndex: number) => void;
}

export default function GroupCard({ group, onSwitchTransaction }: GroupCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [particular, setParticular] = useState('');
  const [amount, setAmount] = useState('');
  
  const { addTransaction, removeTransaction, updateGroup } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!particular || !amount) return;

    const transaction: Transaction = {
      particular: particular.charAt(0).toUpperCase() + particular.slice(1),
      amount: parseFloat(amount),
    };

    addTransaction(group.id, transaction);
    setParticular('');
    setAmount('');
  };

  const handleCopyTransactions = () => {
    const text = group.transactions
      .map((t) => `${t.particular} - $${t.amount.toFixed(2)}`)
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {group.name}
          </h3>
          <button 
            onClick={() => navigator.clipboard.writeText(`${group.date} ${localStorage.getItem('store') || 'Walmart'} | ${group.name}`)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Copy group name and date"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={particular}
              onChange={(e) => setParticular(e.target.value.replace(/[0-9]/g, ''))}
              placeholder="Item"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm"
            />
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="Price"
              className="w-full sm:w-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">Transactions</h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                aria-label={isEditing ? "Save changes" : "Edit transactions"}
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCopyTransactions}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {group.transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row w-full gap-2">
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <input
                        type="text"
                        defaultValue={transaction.particular}
                        onChange={(e) => {
                          const newTransactions = [...group.transactions];
                          newTransactions[index].particular = e.target.value;
                          updateGroup({ ...group, transactions: newTransactions });
                        }}
                        className="flex-1 px-2 py-1 rounded border text-sm min-w-0"
                      />
                      <input
                        type="text"
                        inputMode="decimal"
                        defaultValue={transaction.amount}
                        onChange={(e) => {
                          const newTransactions = [...group.transactions];
                          newTransactions[index].amount = parseFloat(e.target.value) || 0;
                          updateGroup({ ...group, transactions: newTransactions });
                        }}
                        className="w-24 px-2 py-1 rounded border text-sm"
                      />
                    </div>
                    <div className="flex gap-2 justify-end sm:ml-2">
                      <button
                        onClick={() => removeTransaction(group.id, index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSwitchTransaction(group.id, index)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded"
                        aria-label="Switch transaction"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-900 dark:text-white truncate flex-1">{transaction.particular}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">${transaction.amount.toFixed(2)}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="font-medium text-gray-900 dark:text-white">
            Total: ${group.transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </div>
          <button
            onClick={() => {
              const total = group.transactions.reduce((sum, t) => sum + t.amount, 0);
              navigator.clipboard.writeText(total.toFixed(2));
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}