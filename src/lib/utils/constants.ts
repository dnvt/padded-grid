import { GridAlignment, GridVariant } from '@types'

export const CSS_UNITS = ['px', 'rem', 'em', 'vh', 'vw', '%', 'fr'] as const

export const GRID = {
  /** Core default properties for grid components */
  DEFAULTS: {
    ALIGN: GridAlignment.Center,
    Z_INDEX: -1,
    BASE: 8,
    MAX_WIDTH: '1216px',
    COLUMN_WIDTH: '1fr',
    COLORS: {
      X_GRID: '#e8133810',
      Y_GRID: '#e8133860',
    },
    GAP: 8,
    COLUMNS: 9,
  },
  LIMITS: {
    BASE: {
      MIN: 1,
      MAX: 16,
    },
  },
  VARIANTS: {
    LINE: GridVariant.Line,
    FLAT: GridVariant.Flat,
  },
  /** Responsive breakpoint definitions */
  BREAKPOINTS: {
    base: '1280px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
} as const
