import { create } from 'zustand'
import { DictItem } from '@/api/types'

interface DictState {
  dict: Record<string, DictItem[]>
  setAll: (d: Record<string, DictItem[]>) => void
  get: (code: string) => DictItem[]
  textOf: (code: string, value: string) => string
}

export const useDict = create<DictState>((set, get) => ({
  dict: {},
  setAll: (d) => set({ dict: d }),
  get: (code) => get().dict[code] || [],
  textOf: (code, value) => {
    const item = get().dict[code]?.find((x) => x.value === String(value))
    return item?.text || String(value)
  }
}))
