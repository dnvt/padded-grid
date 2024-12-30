import type { CSSProperties, RefObject } from 'react'
import { memo, useMemo, useRef, useCallback } from 'react'
import { Y_GRID as CONFIG } from '@config'
import { useGridDimensions, useVisibleGridLines } from '@hooks'
import { CSSCustomProperties } from '@types'
import { clamp, cx, cs } from '@utils'

import type { YGProps, GridLineStyles, GridFlatStyles } from './types'
import styles from './styles.module.css'

export const YGrid = memo(function YGrid({
  config,
  className = '',
  visibility = CONFIG.visibility,
  style = {},
}: YGProps) {
  const {
    baseUnit = CONFIG.baseUnit,
    color = CONFIG.color,
    height = CONFIG.height,
    variant = CONFIG.variant,
    zIndex = CONFIG.zIndex,
  } = config

  const containerRef = useRef<HTMLDivElement>(null)
  const { height: containerHeight } = useGridDimensions(containerRef)

  const rowCount = useMemo(() => {
    const totalHeight = typeof height === 'number' ? height : containerHeight
    return clamp(Math.ceil(totalHeight / baseUnit), 1, 1000)
  }, [height, containerHeight, baseUnit])

  const visibleRange = useVisibleGridLines({
    totalLines: rowCount,
    lineHeight: baseUnit,
    containerRef: containerRef as RefObject<HTMLDivElement>,
  })

  const getRowStyles = useCallback(
    (idx: number): Partial<CSSProperties & (GridLineStyles | GridFlatStyles)> => ({
      '--grid-top': `${idx * baseUnit}px`,
      '--grid-color': color,
      '--grid-height': variant === 'line' ? '1px' : `${baseUnit}px`,
      '--grid-opacity': variant === 'flat' && idx % 2 === 0 ? '0' : '1',
    }),
    [baseUnit, color, variant],
  )

  const visibleRows = useMemo(() => {
    const rows = []
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      rows.push(
        <div
          key={i}
          className={cx(
            styles.row,
            variant === 'flat' && styles.flat,
          )}
          style={getRowStyles(i)}
          data-row-index={i}
        />,
      )
    }
    return rows
  }, [visibleRange, variant, getRowStyles])

  const containerStyles = useMemo(() =>
    cs({
      '--grid-height': typeof height === 'number' ? `${height}px` : height,
      '--grid-z-index': zIndex,
      '--grid-color': color,
    } as CSSCustomProperties, style),
  [height, zIndex, color, style])

  return (
    <div
      ref={containerRef}
      className={cx(
        styles['ygrid-container'],
        className,
        visibility === 'visible' ? styles.visible : styles.hidden,
      )}
      data-testid="ygrid-container"
      data-variant={variant}
      style={containerStyles}
    >
      {visibleRows}
    </div>
  )
})