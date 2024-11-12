import type { CSSProperties } from 'react'
import type {
  BaseComponentProps,
  GridAlignment,
  CSSValue,
  ResponsiveValue,
  GridVariant,
  BaseGridStyles,
  GridLineStyles,
} from '@types'

export interface XGStyles extends BaseGridStyles {
  '--grid-template-columns': CSSProperties['gridTemplateColumns']
  '--grid-gap': string | number
  '--grid-padding': CSSProperties['padding']
  '--grid-columns': number
  '--column-color': CSSProperties['color'] | CSSProperties['backgroundColor']
  '--column-width': GridVariant extends GridVariant.Line
    ? GridLineStyles['--column-width']
    : CSSValue
}

export interface XGBaseProps extends BaseComponentProps {
  align?: GridAlignment
  color?: CSSProperties['color'] | CSSProperties['backgroundColor']
  maxWidth?: ResponsiveValue<CSSValue>
  padding?: CSSProperties['padding']
  show?: boolean
  style?: CSSProperties & Partial<XGStyles>
}

export type XGColumnPattern = XGBaseProps & {
  variant?: never
  columns: Array<CSSValue | ResponsiveValue<CSSValue>>
  gap: ResponsiveValue<CSSValue | 'auto'>
  columnWidth?: never
}

export type XGAutoCalculated = XGBaseProps & {
  variant?: never
  columnWidth: ResponsiveValue<CSSValue | 'auto'>
  columns?: never
  gap: ResponsiveValue<CSSValue | 'auto'>
}

export type XGFixedColumns = XGBaseProps & {
  variant?: never
  columns: number
  columnWidth?: ResponsiveValue<CSSValue | 'auto'>
  gap?: ResponsiveValue<CSSValue | 'auto'>
}

export type XGLine = XGBaseProps & {
  variant: GridVariant
  columns?: never
  columnWidth?: never
  gap?: ResponsiveValue<CSSValue>
}

export type XGProps =
  | XGColumnPattern
  | XGAutoCalculated
  | XGFixedColumns
  | XGLine
