"use client";

import { useState, useCallback } from 'react';
import { Transaction } from '@/lib/types';

export function useTransactions(initialTransactions: Transaction[] = []) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    const matchesDateRange =
      (!dateRange.from || new Date(transaction.date) >= dateRange.from) &&
      (!dateRange.to || new Date(transaction.date) <= dateRange.to);

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  return {
    transactions: filteredTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
  };
}