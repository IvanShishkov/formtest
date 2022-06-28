import React from 'react'

export const useDebounce = () => {
  const timer = React.useRef<NodeJS.Timeout | null>(null)

  const debounceCallback = (callback: () => void, delay: number) => {
    if (timer.current)
      clearTimeout(timer.current)

    timer.current = setTimeout(() => callback(), delay)
  }

  return debounceCallback
}
