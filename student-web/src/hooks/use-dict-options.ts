import { useQuery } from '@tanstack/react-query'
import { getDictItems } from '@/api/system.api'
import type { DictItem } from '@/api/types'

/** 加载字典选项, staleTime Infinity 避免重复请求 */
export function useDictOptions(code: string) {
  return useQuery({
    queryKey: ['dict', code],
    queryFn: () => getDictItems(code),
    staleTime: Infinity,
  })
}

/** 字典项 → antd Select options */
export function toOptions(items?: DictItem[]) {
  return items?.map((d) => ({ value: d.value, label: d.text })) ?? []
}
