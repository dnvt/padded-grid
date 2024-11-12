import { useCallback, useMemo } from 'react'
import type { CSSProperties, Dispatch } from 'react'

import type { PGConfig } from '@components'
import type {
  GridControlState,
  GridControlAction,
  GridControlsResult,
  GridPropsResult,
} from '@types'
import { clamp, GRID } from '@utils'

// Control Props ---------------------------------------------------------------

export function useGridControls(
  state: GridControlState,
  dispatch: Dispatch<GridControlAction>
): GridControlsResult {
  const updateConfig = useCallback(
    (config: Partial<PGConfig>) => {
      dispatch({ type: 'UPDATE_CONFIG', payload: config })
    },
    [dispatch]
  )

  const updateStyles = useCallback(
    (styles: CSSProperties) => {
      dispatch({ type: 'UPDATE_STYLES', payload: styles })
    },
    [dispatch]
  )

  const getValidatedConfig = useCallback(
    (config: Partial<PGConfig>): Partial<PGConfig> => ({
      ...config,
      base: clamp(
        config.base ?? GRID.DEFAULTS.BASE,
        GRID.LIMITS.BASE.MIN,
        GRID.LIMITS.BASE.MAX
      ),
      align: Object.values(GRID.DEFAULTS.ALIGN).includes(config.align ?? '')
        ? config.align
        : GRID.DEFAULTS.ALIGN,
    }),
    []
  )

  return {
    updateConfig,
    updateStyles,
    getValidatedConfig,
    currentState: state,
  }
}

// Props Getter ----------------------------------------------------------------

export function useGridProps(state: GridControlState): GridPropsResult {
  return useMemo(
    () => ({
      getGridProps: (props = {}) => ({
        ...props,
        style: {
          ...props.style,
          '--grid-base': `${state.base}px`,
          '--grid-max-width':
            typeof state.maxWidth === 'number'
              ? `${state.maxWidth}px`
              : state.maxWidth,
          '--grid-z-index': state.zIndex,
        } as CSSProperties,
      }),
    }),
    [state]
  )
}
