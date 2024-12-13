export interface Transaction {
  particular: string;
  amount: number;
}

export interface Group {
  id: number;
  name: string;
  transactions: Transaction[];
  date: string;
}

export interface Store {
  groups: Record<number, Group>;
  groupId: number;
  initializeStore: () => Promise<void>;
  addGroup: (name: string, date: string) => Promise<void>;
  addTransaction: (groupId: number, transaction: Transaction) => Promise<void>;
  removeTransaction: (groupId: number, index: number) => Promise<void>;
  updateGroup: (group: Group) => Promise<void>;
  switchTransaction: (fromGroupId: number, toGroupId: number, transactionIndex: number) => Promise<void>;
  clearAllData: () => Promise<void>;
}