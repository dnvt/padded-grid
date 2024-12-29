import { combineClassNames, combineStyles, parseGridValue } from '@utils'
import { CSSProperties } from 'react'
import { CSSCustomProperties } from '@types'

describe('Style Utils', () => {
  describe('combineClassNames', () => {
    it('combines class names correctly', () => {
      expect(combineClassNames('a', 'b', 'c')).toBe('a b c')
      expect(combineClassNames('a', false, 'b', null, undefined)).toBe('a b')
      expect(combineClassNames()).toBe('')
    })
  })

  describe('combineStyles', () => {
    it('combines style objects', () => {
      type TestStyle = Partial<CSSProperties & CSSCustomProperties>

      const style1: TestStyle = { color: 'red', '--grid-custom-prop': '10px' }
      const style2: TestStyle = { background: 'blue' }

      expect(combineStyles(style1, style2)).toEqual({
        color: 'red',
        '--grid-custom-prop': '10px',
        background: 'blue',
      })
    })

    it('handles undefined styles', () => {
      expect(combineStyles({ color: 'red' }, undefined)).toEqual({ color: 'red' })
    })
  })

  describe('parseGridValue', () => {
    it('parses grid values correctly', () => {
      expect(parseGridValue(100)).toBe('100px')
      expect(parseGridValue('100px')).toBe('100px')
      expect(parseGridValue('auto')).toBe('auto')
    })
  })
})