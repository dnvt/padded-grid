import type { CSSProperties } from 'react'
import type {
  BaseComponentProps,
  GridAlignment,
  CSSValue,
  ResponsiveValue,
  BaseGridStyles,
} from '@types'

export interface PGConfig {
  /** Base unit for baseline spacing calculations (in pixels) */
  base: number
  /** Maximum width for containers */
  maxWidth: CSSValue | ResponsiveValue<CSSValue>
  /** Horizontal alignment for grid containers */
  align: GridAlignment
  /** z-index for grid containers and overlays */
  zIndex: number
}

export interface PGStates extends PGConfig {
  styles: CSSProperties & Partial<PGStyles>
}

export interface PGStyles extends BaseGridStyles {
  '--grid-base': `${number}px`
  '--grid-max-width': string
  '--grid-z-index': number
}

export interface PGProps extends BaseComponentProps {
  config?: Partial<PGConfig>
  reducer?: (state: PGStates, action: PGActions) => PGStates
  style?: CSSProperties & Partial<PGStyles>
}

export type PGActions =
  | { type: 'UPDATE_CONFIG'; payload: Partial<PGConfig> }
  | { type: 'UPDATE_STYLES'; payload: Partial<PGStyles> }
