"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {read} from "fs";
import {TeamMessages} from "@/types/types";

interface DataContextType {
  data: TeamMessages
  loading: boolean
  error: string | null
  loadData: (file: File) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface DataProviderProps {
  children: ReactNode
  initialFilePath?: string
}

export function DataProvider({ children, initialFilePath }: DataProviderProps) {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = async (file: File) => {
    setLoading(true)
    setError(null)

    const reader = new FileReader();
    reader.onload = (evt) => {
      setData(JSON.parse(evt.target?.result as string).reverse());
    }
    reader.readAsText(file);
  }

  const value = {
    data,
    loading,
    error,
    loadData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
