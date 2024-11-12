import type { CSSProperties, ReactNode } from 'react'

// Plain css units
export type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'fr' | 'vh' | 'vw'
export type CSSCompound<T extends number | string> = T | `${number}${CSSUnit}`
export type CSSValue = CSSCompound<number | string>

// Breapoints
export enum BreakpointKey {
  Base = 'base',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
  Xxl = 'xxl',
}

export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>

// Main grid primitives
export enum GridAlignment {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum GridVariant {
  Line = 'line',
  Flat = 'flat',
}

export type GridColumnsPattern = Array<CSSValue | ResponsiveValue<CSSValue>>

// Base component props type
export interface BaseComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
