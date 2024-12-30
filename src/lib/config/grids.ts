import { COMPONENTS } from '@/config/components'

export const X_GRID = {
  align: COMPONENTS.align,
  color: COMPONENTS.colors.xGrid,
  columns: 9,
  columnWidth: '1fr',
  gap: COMPONENTS.baseUnit,
  variant: COMPONENTS.variants.xGrid,
  maxWidth: '100%',
  padding: 0,
  visibility: COMPONENTS.visibility.xGrid,
  zIndex: COMPONENTS.zIndex,
} as const

export const Y_GRID = {
  baseUnit: COMPONENTS.baseUnit,
  color: COMPONENTS.colors.yGrid,
  height: '100%',
  variant: COMPONENTS.variants.yGrid,
  visibility: COMPONENTS.visibility.yGrid,
  zIndex: COMPONENTS.zIndex,
}