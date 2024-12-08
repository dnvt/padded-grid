import { GridAlignment, GridVariant } from '@types'

export const CSS_UNITS = ['px', 'rem', 'em', 'vh', 'vw', '%', 'fr'] as const

export const GRID = {
  DEFAULTS: {
    ALIGN: 'center' as GridAlignment,
    Z_INDEX: -1,
    BASE: 8,
    MAX_WIDTH: '1216px',
    COLUMN_WIDTH: '1fr',
    COLORS: {
      X_GRID: '#00baff26',
      Y_GRID: '#e1e4ff',
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
  BREAKPOINTS: {
    base: '1280px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
} as const
