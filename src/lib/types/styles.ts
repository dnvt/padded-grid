import type { CSSProperties } from 'react'

import type { CSSValue } from './common'

export interface BaseGridStyles extends CSSProperties {
  '--grid-base': `${number}px`
  '--grid-max-width': CSSValue
  '--grid-z-index': number
  '--grid-justify': string
}

export interface GridLineStyles {
  '--column-width': '1px'
  '--row-height': '1px'
}

export interface GridFlatStyles {
  '--column-width': CSSValue
  '--row-height': CSSValue
  '--row-opacity': '0' | '1'
}

export interface GridCustomProperties extends CSSProperties {
  '--grid-template-columns'?: string
  '--grid-gap'?: string | number
  '--grid-max-width'?: string
  '--grid-columns'?: number
  '--grid-justify'?: string
  '--grid-padding'?: CSSProperties['padding']
  '--column-color'?: string
  '--column-width'?: string
  '--grid-height'?: string
  '--row-top'?: string
  '--row-color'?: string
  '--row-height'?: string
  '--row-opacity'?: string
}
