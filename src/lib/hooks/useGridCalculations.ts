import { useMemo, useCallback } from 'react'

import {
  GRID,
  isAutoCalculatedGrid,
  isColumnPattern,
  isFixedColumns,
  isLineVariant,
  parseGridValue,
  parseResponsiveGridValue,
} from '@utils'
import type {
  CSSValue,
  GridCalculationProps,
  GridCalculationResult,
  ResponsiveValue,
} from '@/types'

// Helper functions for type-safe parsing --------------------------------------

const parseGapValue = (
  gap: ResponsiveValue<CSSValue> | 'auto' | undefined
): string => {
  if (gap === 'auto' || gap === undefined) return 'auto'
  return parseGridValue(gap as CSSValue)
}

const parseColumnValue = (
  column: CSSValue | ResponsiveValue<CSSValue>
): string => {
  if (typeof column === 'number' || typeof column === 'string') {
    return parseGridValue(column as CSSValue)
  }
  return parseResponsiveGridValue(column)
}

// Grid Calculation hook -------------------------------------------------------

export const useGridCalculations = (
  props: GridCalculationProps
): GridCalculationResult => {
  const calculateLineVariant = useCallback((): GridCalculationResult => {
    const effectiveGap = parseGapValue(
      props.gap ?? props.baseFromConfig ?? GRID.DEFAULTS.BASE
    )
    const numericGap = parseInt(effectiveGap, 10)
    const columns = Math.max(
      1,
      Math.floor(props.containerWidth / (numericGap + 1)) + 1
    )

    return {
      gridTemplateColumns: `repeat(${columns}, 1px)`,
      columnsCount: columns,
      calculatedGap: effectiveGap,
    }
  }, [props.containerWidth, props.gap, props.baseFromConfig])

  const calculateColumnPattern = useCallback((): GridCalculationResult => {
    if (!Array.isArray(props.columns)) {
      throw new Error('Columns must be an array for column pattern variant')
    }

    return {
      gridTemplateColumns: props.columns.map(parseColumnValue).join(' '),
      columnsCount: props.columns.length,
      calculatedGap: parseGapValue(props.gap),
    }
  }, [props.columns, props.gap])

  const calculateFixedColumns = useCallback((): GridCalculationResult => {
    if (typeof props.columns !== 'number') {
      throw new Error('Columns must be a number for fixed columns variant')
    }

    return {
      gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
      columnsCount: props.columns,
      calculatedGap: parseGapValue(props.gap),
    }
  }, [props.columns, props.gap])

  const calculateAutoGrid = useCallback((): GridCalculationResult => {
    if (!props.columnWidth) {
      throw new Error('Column width is required for auto calculated grid')
    }

    const parsedGap = parseGapValue(props.gap)
    const parsedWidth = parseResponsiveGridValue(props.columnWidth)
    const numericGap = parseInt(parsedGap === 'auto' ? '0' : parsedGap, 10)
    const numericWidth = parseInt(parsedWidth, 10)

    const columns = Math.floor(
      (props.containerWidth + numericGap) / (numericWidth + numericGap)
    )

    return {
      gridTemplateColumns: `repeat(${Math.max(1, columns)}, ${parsedWidth})`,
      columnsCount: columns,
      calculatedGap: parsedGap,
    }
  }, [props.containerWidth, props.columnWidth, props.gap])

  return useMemo(() => {
    switch (true) {
    case isLineVariant(props):
      return calculateLineVariant()

    case isColumnPattern(props):
      return calculateColumnPattern()

    case isFixedColumns(props):
      return calculateFixedColumns()

    case isAutoCalculatedGrid(props):
      return calculateAutoGrid()

    default:
      return {
        gridTemplateColumns: `repeat(${GRID.DEFAULTS.COLUMNS}, 1fr)`,
        columnsCount: GRID.DEFAULTS.COLUMNS,
        calculatedGap: `${GRID.DEFAULTS.GAP}px`,
      }
    }
  }, [
    props,
    calculateLineVariant,
    calculateColumnPattern,
    calculateFixedColumns,
    calculateAutoGrid,
  ])
}
