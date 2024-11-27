import { useLayoutEffect, useState, type RefObject } from 'react'
import { rafThrottle } from '@utils'

export function useGridDimensions(ref: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return

    const updateDimensions = rafThrottle(() => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setDimensions((prev) => {
        if (prev.width === rect.width && prev.height === rect.height) {
          return prev
        }
        return { width: rect.width, height: rect.height }
      })
    })

    // Use ResizeObserver for size changes
    const observer = new ResizeObserver(updateDimensions)
    observer.observe(ref.current)

    // Also handle scroll events
    window.addEventListener('scroll', updateDimensions, { passive: true })

    // Initial measurement
    updateDimensions()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateDimensions)
    }
  }, [ref])

  return dimensions
}
