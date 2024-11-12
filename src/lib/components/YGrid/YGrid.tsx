import { memo, useMemo, useRef, useCallback, type CSSProperties } from 'react'

import { useGridDimensions, useVisibleGridLines } from '@hooks'
import { GridVariant } from '@types'
import { clamp, combineClassNames, combineStyles, GRID } from '@utils'

import type { YGProps, YGStyles } from './types'
import styles from '@styles/YGrid.module.css'

function isNumericHeight(height: CSSProperties['height']): height is number {
  return typeof height === 'number'
}

export const YGrid = memo(function YGrid({
  base = GRID.DEFAULTS.BASE,
  color = GRID.DEFAULTS.COLORS.Y_GRID,
  show = false,
  height = '100%',
  variant = GRID.VARIANTS.LINE,
  className,
  style,
}: YGProps) {
  if (!show) return null

  const containerRef = useRef<HTMLDivElement>(null)
  const { height: containerHeight } = useGridDimensions(containerRef)

  const rowCount = useMemo(() => {
    const totalHeight = isNumericHeight(height) ? height : containerHeight
    return clamp(Math.ceil(totalHeight / base), 1, 1000)
  }, [height, containerHeight, base])

  const visibleRange = useVisibleGridLines({
    totalLines: rowCount,
    lineHeight: base,
    containerRef,
  })

  const containerStyles = useMemo(
    () =>
      combineStyles<Partial<YGStyles>>(
        {
          '--grid-height': isNumericHeight(height) ? `${height}px` : height,
          opacity: show ? 1 : 0,
          visibility: show ? 'visible' : 'hidden',
        },
        style ?? {}
      ),
    [height, style, show]
  )

  const getRowStyles = useCallback(
    (idx: number): Partial<YGStyles> => ({
      '--row-top': `${idx * base}px`,
      '--row-color': color,
      '--row-height': variant === GridVariant.Line ? '1px' : `${base}px`,
      '--row-opacity':
        variant === GridVariant.Flat && idx % 2 === 0 ? '0' : '1',
    }),
    [base, color, variant]
  )

  const visibleRows = useMemo(() => {
    const rows = []
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      rows.push(
        <div
          key={i}
          className={combineClassNames(
            styles.row,
            variant === 'flat' && styles.flatRow
          )}
          style={getRowStyles(i)}
          data-row-index={i}
        />
      )
    }
    return rows
  }, [visibleRange, variant, getRowStyles])

  return (
    <div
      ref={containerRef}
      className={combineClassNames(
        styles.container,
        className,
        show ? styles.visible : styles.hidden
      )}
      style={containerStyles}
      data-variant={variant}
      data-testid="ygrid-container"
    >
      {visibleRows}
    </div>
  )
})

YGrid.displayName = 'YGrid'
