"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {TeamMessages} from "@/types/types";

interface DataContextType {
  data: TeamMessages
  loading: boolean
  error: string | null
  loadData: (file: File) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TeamMessages>([])
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
