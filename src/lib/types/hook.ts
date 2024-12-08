import type { CSSProperties, HTMLAttributes, RefObject } from 'react'

import type { PGActions, PGConfig, PGStates, PGStyles } from '@components'
import type {
  GridAlignment,
  CSSValue,
  ResponsiveValue,
  GridVariant,
} from './common'

// Grid Calculations Types -----------------------------------------------------

export interface GridCalculationProps {
  containerWidth: number
  color?: string
  maxWidth?: ResponsiveValue<CSSValue>
  align?: string
  gap?: 'auto' | ResponsiveValue<CSSValue>
  columns?: number | Array<CSSValue | ResponsiveValue<CSSValue>>
  variant?: GridVariant
  columnWidth?: ResponsiveValue<CSSValue | 'auto'>
  baseFromConfig?: number
}

export interface GridCalculationResult {
  gridTemplateColumns: string
  columnsCount: number
  calculatedGap: string
}

// Visible Grid Lines Types ----------------------------------------------------

export interface VisibleLinesConfig {
  totalLines: number
  lineHeight: number
  containerRef: RefObject<HTMLDivElement | null>
  buffer?: number
}

export interface VisibleRange {
  start: number
  end: number
}

// Grid Controls Types ---------------------------------------------------------

export interface GridControlState {
  base: number
  maxWidth: CSSValue | ResponsiveValue<CSSValue>
  align: GridAlignment
  zIndex: number
  styles: CSSProperties
}

export type GridControlAction = PGActions;

export interface GridControlState extends PGStates {
}

export interface GridControlsResult {
  updateConfig: (config: Partial<PGConfig>) => void;
  updateStyles: (styles: Partial<PGStyles>) => void;
  getValidatedConfig: (config: Partial<PGConfig>) => Partial<PGConfig>;
  currentState: GridControlState;
}

export interface GridPropsResult {
  getGridProps: (
    props?: HTMLAttributes<HTMLDivElement>,
  ) => HTMLAttributes<HTMLDivElement>
}
