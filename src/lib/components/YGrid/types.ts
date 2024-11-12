import type { CSSProperties } from 'react'
import type {
  BaseComponentProps,
  GridVariant,
  CSSValue,
  BaseGridStyles,
  GridLineStyles,
  GridFlatStyles,
} from '@types'

export interface YGStyles extends BaseGridStyles {
  '--grid-height': CSSValue
  '--row-top': CSSValue
  '--row-color': string
  '--row-height': GridVariant extends GridVariant.Line
    ? GridLineStyles['--row-height']
    : CSSValue
  '--row-opacity': GridVariant extends GridVariant.Flat
    ? GridFlatStyles['--row-opacity']
    : CSSValue
}

export interface YGProps extends BaseComponentProps {
  base?: number
  color?: CSSProperties['color'] | CSSProperties['backgroundColor']
  height?: CSSProperties['height']
  padding?: CSSProperties['padding']
  show?: boolean
  style?: CSSProperties & Partial<YGStyles>
  variant?: GridVariant
}
