import { memo, useMemo, useRef } from 'react'

import { useGridCalculations, useGridDimensions } from '@hooks'
import { GridVariant } from '@types'
import {
  combineClassNames,
  combineStyles,
  parseResponsiveGridValue,
  GRID,
} from '@utils'

import type { XGProps, XGStyles } from './types'
import styles from '@styles/XGrid.module.css'

export const XGrid = memo(function XGrid({
  align = GRID.DEFAULTS.ALIGN,
  className = '',
  color = GRID.DEFAULTS.COLORS.X_GRID,
  columns = GRID.DEFAULTS.COLUMNS,
  columnWidth = GRID.DEFAULTS.COLUMN_WIDTH,
  gap,
  maxWidth = GRID.DEFAULTS.MAX_WIDTH,
  padding,
  show = false,
  style = {},
  variant,
  ...otherProps
}: XGProps) {
  if (!show) return null

  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useGridDimensions(containerRef)

  const adjustedGap = useMemo(() => {
    if (variant === 'line') {
      const baseGap = typeof gap === 'number' ? gap : GRID.DEFAULTS.BASE
      return Math.max(0, baseGap - 1)
    }
    return gap
  }, [variant, gap])

  const getColumnStyles = (
    variant: GridVariant | undefined
  ): Partial<XGStyles> => ({
    '--column-width': variant === 'line' ? '1px' : undefined,
  })

  const { gridTemplateColumns, columnsCount, calculatedGap } =
    useGridCalculations({
      align,
      color,
      columns,
      columnWidth,
      containerWidth: width,
      gap: adjustedGap,
      maxWidth,
      variant,
      ...otherProps,
    })

  const containerStyles = useMemo(() => {
    const styles: Partial<XGStyles> = {
      '--grid-template-columns': gridTemplateColumns,
      '--grid-gap': calculatedGap,
      '--grid-max-width': parseResponsiveGridValue(maxWidth),
      '--grid-columns': columnsCount,
      '--grid-justify': align,
      '--grid-padding': padding,
      '--column-color': color,
      ...getColumnStyles(variant),
    }

    if (variant === 'line') {
      styles['--column-width'] = '1px'
    }

    return combineStyles(styles, style)
  }, [
    gridTemplateColumns,
    calculatedGap,
    maxWidth,
    columnsCount,
    align,
    color,
    style,
    variant,
  ])

  return (
    <div
      ref={containerRef}
      className={combineClassNames(styles.container, className)}
      style={containerStyles}
      data-testid="xgrid-container"
      data-variant={variant}
    >
      <div className={styles.columnsContainer}>
        {Array.from({ length: columnsCount }).map((_, i) => (
          <div
            key={i}
            className={combineClassNames(
              styles.column,
              variant === GridVariant.Line && styles.lineColumn
            )}
            data-column-index={i}
          />
        ))}
      </div>
    </div>
  )
})

XGrid.displayName = 'XGrid'
