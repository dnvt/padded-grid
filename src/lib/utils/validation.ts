import type { PGConfig } from '@components'
import {
  type BreakpointKey,
  type CSSValue,
  type GridAlignment,
  type GridCalculationProps,
  GridVariant,
} from '@types'
import { CSS_UNITS } from '@utils'

export const isGridValue = (value: unknown): value is CSSValue => {
  if (typeof value === 'number') return true
  return (
    typeof value === 'string' && CSS_UNITS.some((unit) => value.endsWith(unit))
  )
}

export const isResponsiveValue = <T>(
  value: unknown
): value is Partial<Record<BreakpointKey, T>> => {
  if (typeof value !== 'object' || value === null) return false
  return Object.keys(value).every((key) =>
    ['base', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key)
  )
}

export const isGridAlignment = (value: unknown): value is GridAlignment =>
  typeof value === 'string' && ['start', 'center', 'end'].includes(value)

export function isLineVariant(props: GridCalculationProps): props is Extract<
  GridCalculationProps,
  {
    variant: GridVariant.Line
  }
> {
  return props.variant === GridVariant.Line
}

export function isColumnPattern(props: GridCalculationProps): props is Extract<
  GridCalculationProps,
  {
    columns: GridCalculationProps['columns']
  }
> {
  return Array.isArray(props.columns)
}

export function isFixedColumns(props: GridCalculationProps): props is Extract<
  GridCalculationProps,
  {
    columns: number
  }
> {
  return typeof props.columns === 'number'
}

export function isAutoCalculatedGrid(
  props: GridCalculationProps
): props is Extract<
  GridCalculationProps,
  {
    columnWidth: GridCalculationProps['columnWidth']
  }
> {
  return !('columns' in props) && 'columnWidth' in props
}

export const isValidConfig = <T extends PGConfig>(
  config: unknown
): config is Partial<T> => {
  if (!config || typeof config !== 'object') return false
  const { base, maxWidth, align, zIndex } = config as Partial<T>

  return (
    (typeof base === 'number' || base === undefined) &&
    (maxWidth === undefined ||
      isGridValue(maxWidth) ||
      isResponsiveValue(maxWidth)) &&
    (align === undefined || isGridAlignment(align)) &&
    (zIndex === undefined || typeof zIndex === 'number')
  )
}
