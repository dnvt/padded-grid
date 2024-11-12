import type { Dispatch } from 'react'

import type { CSSValue, GridAlignment } from '@types'
import { usePerformanceMonitor } from '../utils'
import type { GridAction, GridState } from './GridSetups'

export function GridControls({
  state,
  dispatch,
}: {
  state: GridState
  dispatch: Dispatch<GridAction>
}) {
  const metrics = usePerformanceMonitor()
  return (
    <div className="grid-controls">
      <div className="controls-spacing">
        <div>
          <h3>Performance</h3>
          <div>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
          </div>
        </div>

        <div>
          <h3>Grid Guides</h3>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={state.showGuides.columns}
                onChange={(e) =>
                  dispatch({
                    type: 'TOGGLE_GUIDE',
                    payload: { type: 'columns', value: e.target.checked },
                  })
                }
              />
              Columns
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={state.showGuides.baseline}
                onChange={(e) =>
                  dispatch({
                    type: 'TOGGLE_GUIDE',
                    payload: { type: 'baseline', value: e.target.checked },
                  })
                }
              />
              Baseline
            </label>
          </div>
        </div>

        <div>
          <h3>Grid Configuration</h3>

          <label className="base-unit-label">
            <span className="base-unit-text">Base Unit</span>
            <input
              type="range"
              className="base-unit-range"
              min="4"
              max="16"
              value={state.config.base}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CONFIG',
                  payload: { base: Number(e.target.value) },
                })
              }
            />
            <span className="base-unit-value">{state.config.base}px</span>
          </label>

          <label className="base-unit-label">
            <span className="base-unit-text">Max Width</span>
            <select
              value={state.config.maxWidth as string}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CONFIG',
                  payload: { maxWidth: e.target.value as CSSValue },
                })
              }
            >
              <option value="100%">100%</option>
              <option value="1200px">1200px</option>
              <option value="1400px">1400px</option>
              <option value="1600px">1600px</option>
            </select>
          </label>

          <label className="base-unit-label">
            <span className="base-unit-text">Alignment</span>
            <select
              value={state.config.align}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_CONFIG',
                  payload: { align: e.target.value as GridAlignment },
                })
              }
            >
              <option value="start">Start</option>
              <option value="center">Center</option>
              <option value="end">End</option>
            </select>
          </label>
        </div>

        <div>
          <h3>Column Configuration</h3>

          <label className="base-unit-label">
            <span className="base-unit-text">Column Count</span>
            <input
              type="range"
              className="base-unit-range"
              min="2"
              max="24"
              value={state.columnConfig.count}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_COLUMN_CONFIG',
                  payload: { count: Number(e.target.value) },
                })
              }
            />
            <span className="base-unit-value">
              {state.columnConfig.count} columns
            </span>
          </label>

          <label className="base-unit-label">
            <span className="base-unit-text">Column Gap</span>
            <input
              type="range"
              className="base-unit-range"
              min="0"
              max="48"
              value={state.columnConfig.gap}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_COLUMN_CONFIG',
                  payload: { gap: Number(e.target.value) },
                })
              }
            />
            <span className="base-unit-value">{state.columnConfig.gap}px</span>
          </label>
        </div>
      </div>
    </div>
  )
}
