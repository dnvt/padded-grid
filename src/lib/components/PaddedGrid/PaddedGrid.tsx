import { memo, useReducer, useEffect, type CSSProperties, useRef } from 'react'

import type { PGProps, PGStates, PGActions } from '@components'
import { useGridControls, useGridProps } from '@hooks'
import type { CSSValue, ResponsiveValue } from '@types'
import {
  combineClassNames,
  isResponsiveValue,
  isValidConfig,
  parseResponsiveGridValue,
  GRID,
} from '@utils'

import styles from '@styles/PaddedGrid.module.css'

const initialState: Readonly<PGStates> = {
  base: GRID.DEFAULTS.BASE,
  maxWidth: GRID.DEFAULTS.MAX_WIDTH,
  align: GRID.DEFAULTS.ALIGN,
  zIndex: GRID.DEFAULTS.Z_INDEX,
  styles: {},
}

function defaultGridReducer(state: PGStates, action: PGActions): PGStates {
  switch (action.type) {
  case 'UPDATE_CONFIG':
    return {
      ...state,
      base: action.payload.base ?? state.base,
      maxWidth: action.payload.maxWidth ?? state.maxWidth,
      align: action.payload.align ?? state.align,
      zIndex: action.payload?.zIndex ?? state.zIndex,
    }
  case 'UPDATE_STYLES':
    return {
      ...state,
      styles: {
        ...state.styles,
        ...action.payload,
      },
    }
  default:
    return state
  }
}

export const PaddedGrid = memo(function PaddedGrid({
  children,
  className = '',
  config,
  reducer = defaultGridReducer,
  style = {},
}: PGProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Get stable callbacks from controls
  const controls = useGridControls(state, dispatch)
  const { getValidatedConfig, updateConfig } = controls
  const { getGridProps } = useGridProps(state)

  const getMaxWidthValue = (
    maxWidth: CSSValue | ResponsiveValue<CSSValue>,
  ): CSSProperties['maxWidth'] => {
    if (typeof maxWidth === 'number') {
      return `${maxWidth}px`
    }
    if (typeof maxWidth === 'string') {
      return maxWidth
    }
    if (isResponsiveValue(maxWidth)) {
      return parseResponsiveGridValue(maxWidth) || 'none'
    }
    return 'none'
  }

  const prevConfigRef = useRef(state)

  useEffect(() => {
    if (config && isValidConfig(config)) {
      const validConfig = getValidatedConfig(config)

      if (
        validConfig.base !== prevConfigRef.current.base ||
        validConfig.maxWidth !== prevConfigRef.current.maxWidth ||
        validConfig.align !== prevConfigRef.current.align ||
        validConfig.zIndex !== prevConfigRef.current.zIndex
      ) {
        updateConfig(validConfig)
        prevConfigRef.current = { ...prevConfigRef.current, ...validConfig }
      }
    }
    // Dependencies are now just config, getValidatedConfig, and updateConfig
  }, [config, getValidatedConfig, updateConfig])

  const containerProps = getGridProps({
    className: combineClassNames(
      styles.container,
      styles[state.align],
      className,
    ),
    style: {
      ...style,
      maxWidth: getMaxWidthValue(state.maxWidth),
      width: '100%',
      margin: '0 auto',
    } as CSSProperties,
    'data-grid-align': state.align,
  })

  return <div {...containerProps}>{children}</div>
})

PaddedGrid.displayName = 'PaddedGrid'
