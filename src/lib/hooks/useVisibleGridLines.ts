import { useState, useCallback, useRef, useLayoutEffect } from 'react'

import type { VisibleLinesConfig, VisibleRange } from '@types'
import { debounce, rafThrottle } from '@utils'

export function useVisibleGridLines({
  totalLines,
  lineHeight,
  containerRef,
  buffer = 160,
}: VisibleLinesConfig): VisibleRange {
  const [visibleRange, setVisibleRange] = useState<VisibleRange>(() => {
    if (!containerRef.current) return { start: 0, end: totalLines }

    const { top } = containerRef.current.getBoundingClientRect()
    const viewportTop = Math.max(0, -top)
    const viewportBottom = viewportTop + window.innerHeight

    const startLine = Math.max(0, Math.floor(viewportTop / lineHeight) - buffer)
    const endLine = Math.min(
      totalLines,
      Math.ceil(viewportBottom / lineHeight) + buffer,
    )

    return { start: startLine, end: endLine }
  })

  const rafRef = useRef<number>(null)

  const calculateVisibleRange = useCallback(() => {
    if (!containerRef.current) return

    const { top } = containerRef.current.getBoundingClientRect()
    const viewportTop = Math.max(0, -top)
    const viewportBottom = viewportTop + window.innerHeight

    const startLine = Math.max(0, Math.floor(viewportTop / lineHeight) - buffer)
    const endLine = Math.min(
      totalLines,
      Math.ceil(viewportBottom / lineHeight) + buffer,
    )

    setVisibleRange((prev: VisibleRange) =>
      prev.start === startLine && prev.end === endLine
        ? prev
        : { start: startLine, end: endLine },
    )
  }, [containerRef, lineHeight, buffer, totalLines])

  const throttledCalculate = useCallback(rafThrottle(calculateVisibleRange), [
    calculateVisibleRange,
  ])

  const handleScroll = useCallback(
    debounce(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(throttledCalculate)
    }, 16),
    [throttledCalculate],
  )

  useLayoutEffect(() => {
    if (!containerRef.current) return

    throttledCalculate()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll, throttledCalculate])

  return visibleRange
}
