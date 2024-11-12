import type { GridAlignment } from '@types'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-grid-align'?: GridAlignment;
  }
}