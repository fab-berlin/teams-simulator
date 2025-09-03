'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { TeamMessages } from '@/types/types';

interface DataContextType {
  data: TeamMessages,
  sortOrder: string,
  loading: boolean,
  error: string | null,
  loadData: (file: File) => Promise<void>,
  toggleSortOrder: () => void,
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TeamMessages>([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (file: File) => {
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      setSortOrder('asc');
      setData(JSON.parse(evt.target?.result as string));
    };
    reader.readAsText(file);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setData([...data.reverse()]);
  }

  const value = {
    data,
    sortOrder,
    loading,
    error,
    loadData,
    toggleSortOrder
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
