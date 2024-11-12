import { useEffect, useState } from 'react'
import { round } from '@/utils'

interface ChromePerformance extends Performance {
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

interface PerformanceMetrics {
  fps: number
  memory: number
  elements: number
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    elements: 0,
  })

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let frames = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const measureFPS = () => {
      frames++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const currentFPS = round(frames, 1)
        setMetrics({
          fps: currentFPS,
          memory: round(
            ((performance as ChromePerformance).memory?.usedJSHeapSize || 0) /
              1048576,
            2
          ),
          elements: document.querySelectorAll(
            '[data-row-index], [data-column-index]'
          ).length,
        })
        frames = 0
        lastTime = now
      }

      animationFrameId = requestAnimationFrame(measureFPS)
    }

    animationFrameId = requestAnimationFrame(measureFPS)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return metrics
}
