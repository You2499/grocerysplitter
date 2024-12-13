import { create } from 'zustand';
import type { Store, Group, Transaction } from '../types';
import * as db from '../lib/db';

const useStore = create<Store>((set, get) => ({
  groups: {},
  groupId: 0,
  hasSeenLanding: false,
  showInfo: false,

  initializeStore: async () => {
    const groups = await db.getAllGroups();
    const groupsMap = groups.reduce((acc, group) => {
      acc[group.id] = group;
      return acc;
    }, {} as Record<number, Group>);
    
    const maxId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) : 0;
    const hasSeenLanding = localStorage.getItem('hasSeenLanding') === 'true';
    
    set({
      groups: groupsMap,
      groupId: maxId,
      hasSeenLanding
    });
  },

  setHasSeenLanding: (value: boolean) => {
    localStorage.setItem('hasSeenLanding', String(value));
    set({ hasSeenLanding: value });
  },

  toggleInfo: () => {
    set(state => ({ showInfo: !state.showInfo }));
  },

  addGroup: async (name: string, date: string) => {
    const { groups, groupId } = get();
    const newId = groupId + 1;
    const newGroup: Group = {
      id: newId,
      name: name.toUpperCase(),
      transactions: [],
      date,
    };

    await db.addGroup(newGroup);

    set({
      groups: { ...groups, [newId]: newGroup },
      groupId: newId,
    });
  },

  addTransaction: async (groupId: number, transaction: Transaction) => {
    const { groups } = get();
    const group = groups[groupId];
    if (!group) return;

    const updatedGroup = {
      ...group,
      transactions: [...group.transactions, transaction],
    };

    await db.updateGroup(updatedGroup);

    set({
      groups: { ...groups, [groupId]: updatedGroup },
    });
  },

  removeTransaction: async (groupId: number, index: number) => {
    const { groups } = get();
    const group = groups[groupId];
    if (!group) return;

    const updatedTransactions = [...group.transactions];
    updatedTransactions.splice(index, 1);

    const updatedGroup = {
      ...group,
      transactions: updatedTransactions,
    };

    await db.updateGroup(updatedGroup);

    set({
      groups: { ...groups, [groupId]: updatedGroup },
    });
  },

  updateGroup: async (group: Group) => {
    const { groups } = get();
    
    await db.updateGroup(group);

    set({
      groups: { ...groups, [group.id]: group },
    });
  },

  switchTransaction: async (fromGroupId: number, toGroupId: number, transactionIndex: number) => {
    const { groups } = get();
    const fromGroup = groups[fromGroupId];
    const toGroup = groups[toGroupId];
    if (!fromGroup || !toGroup) return;

    const transaction = fromGroup.transactions[transactionIndex];
    const updatedFromGroup = {
      ...fromGroup,
      transactions: fromGroup.transactions.filter((_, i) => i !== transactionIndex),
    };
    const updatedToGroup = {
      ...toGroup,
      transactions: [...toGroup.transactions, transaction],
    };

    await Promise.all([
      db.updateGroup(updatedFromGroup),
      db.updateGroup(updatedToGroup)
    ]);

    set({
      groups: {
        ...groups,
        [fromGroupId]: updatedFromGroup,
        [toGroupId]: updatedToGroup,
      },
    });
  },

  clearAllData: async () => {
    await db.clearAllGroups();
    set({ groups: {}, groupId: 0 });
  },
}));

export default useStore;