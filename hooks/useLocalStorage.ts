import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validator?: (value: any) => value is T
) {
  const [value, setValue] = useState<T>(defaultValue)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        const parsed = JSON.parse(saved)
        if (validator ? validator(parsed) : true) {
          setValue(parsed)
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error)
    }
  }, [key, validator])

  // Debounced localStorage update
  const setValueWithPersistence = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const nextValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue
      
      // Debounce localStorage writes
      setTimeout(() => {
        try {
          localStorage.setItem(key, JSON.stringify(nextValue))
        } catch (error) {
          console.warn(`Failed to save ${key} to localStorage:`, error)
        }
      }, 100)
      
      return nextValue
    })
  }, [key])

  return [value, setValueWithPersistence] as const
}