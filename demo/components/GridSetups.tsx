import { useReducer, useLayoutEffect, type PropsWithChildren } from 'react'

import { GRID } from '@utils'
import { PaddedGrid, type PGConfig, XGrid, YGrid } from '@components'
import { GridAlignment, GridVariant, type GridColumnsPattern } from '@types'
import { GridControls } from './GridControls'

export interface GridState {
  config: Partial<PGConfig>
  showGuides: {
    columns: boolean
    baseline: boolean
  }
  columnConfig: {
    count: number
    gap: number
    pattern: GridColumnsPattern
  }
  pageHeight: number
}

const initialState: GridState = {
  config: {
    base: GRID.DEFAULTS.BASE,
    maxWidth: GRID.DEFAULTS.MAX_WIDTH,
    align: GridAlignment.Center,
    zIndex: GRID.DEFAULTS.Z_INDEX,
  },
  showGuides: {
    columns: true,
    baseline: true,
  },
  columnConfig: {
    count: GRID.DEFAULTS.COLUMNS,
    gap: GRID.DEFAULTS.BASE,
    pattern: [
      '24px',
      '24px',
      '64px',
      '1fr',
      '2fr',
      '1fr',
      '64px',
      '24px',
      '24px',
    ] as GridColumnsPattern,
  },
  pageHeight: 0,
}

export type GridAction =
  | { type: 'UPDATE_CONFIG'; payload: Partial<PGConfig> }
  | { type: 'SET_PAGE_HEIGHT'; payload: number }
  | {
  type: 'TOGGLE_GUIDE'
  payload: { type: 'columns' | 'baseline'; value: boolean }
}
  | {
  type: 'UPDATE_COLUMN_CONFIG'
  payload: Partial<GridState['columnConfig']>
}

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
  case 'UPDATE_CONFIG':
    return {
      ...state,
      config: { ...state.config, ...action.payload },
    }
  case 'TOGGLE_GUIDE':
    return {
      ...state,
      showGuides: {
        ...state.showGuides,
        [action.payload.type]: action.payload.value,
      },
    }
  case 'UPDATE_COLUMN_CONFIG':
    return {
      ...state,
      columnConfig: { ...state.columnConfig, ...action.payload },
    }
  case 'SET_PAGE_HEIGHT':
    return {
      ...state,
      pageHeight: action.payload,
    }
  default:
    return state
  }
}

export function GridSetups({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(gridReducer, initialState)

  useLayoutEffect(() => {
    const updatePageHeight = () => {
      const height = document.documentElement.scrollHeight
      if (height !== state.pageHeight) {
        dispatch({ type: 'SET_PAGE_HEIGHT', payload: height })
      }
    }

    updatePageHeight()
    window.addEventListener('resize', updatePageHeight)

    const observer = new MutationObserver(updatePageHeight)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('resize', updatePageHeight)
      observer.disconnect()
    }
  }, [state.pageHeight])

  return (
    <div className="grid-playground">
      <PaddedGrid config={state.config}>
        <YGrid
          base={state.config.base}
          show={state.showGuides.baseline}
          height={state.pageHeight}
        />
        <XGrid
          columns={state.columnConfig.count}
          gap={state.columnConfig.gap}
          show={state.showGuides.columns}
        />
        <XGrid
          columns={state.columnConfig.pattern}
          gap={8}
          show={state.showGuides.columns}
          color="#0000ff25"
        />
        <XGrid
          variant={GridVariant.Line}
          gap={8}
          show={state.showGuides.columns}
          color="#00000020"
        />
        {children}
      </PaddedGrid>
      <GridControls state={state} dispatch={dispatch} />
    </div>
  )
}
