import { memo, useMemo, Fragment, CSSProperties } from 'react'
import { SPACER } from '@config'
import { useSpacerDimensions } from '@hooks'
import { cs, cx } from '@utils'

import { SpacerProps } from './types'
import styles from './styles.module.css'

/**
 * Spacer Component
 * A flexible spacer element that adjusts its dimensions based on provided height and width.
 * Optionally displays measurement indicators.
 *
 * @param height - The height of the spacer.
 * @param width - The width of the spacer.
 * @param config - Configuration object for the spacer.
 * @param indicatorNode - A function to render measurement indicators.
 * @param visibility - Visibility of the spacer ('visible' or 'hidden').
 * @param className - Additional class names for the container.
 * @param style - Additional inline styles for the container.
 */
export const Spacer = memo(function Spacer({
  height,
  width,
  config = { variant: 'line' },
  indicatorNode,
  visibility = SPACER.visibility,
  className = '',
  style = {},
}: SpacerProps) {
  const {
    baseUnit = SPACER.baseUnit,
    variant = SPACER.variant,
    zIndex = SPACER.zIndex,
    color: customColor,
  } = config

  const isShown = visibility === 'visible'

  // Calculate dimensions and normalize height/width
  const { dimensions, normalizedHeight, normalizedWidth } = useSpacerDimensions({
    height,
    width,
    baseUnit,
  })

  const measurements = useMemo(() => {
    if (!isShown || !indicatorNode) return null

    const result = []

    if (normalizedHeight !== null) {
      result.push(
        <Fragment key="height">
          {indicatorNode(normalizedHeight, 'height')}
        </Fragment>,
      )
    }

    if (normalizedWidth !== null) {
      result.push(
        <Fragment key="width">
          {indicatorNode(normalizedWidth, 'width')}
        </Fragment>,
      )
    }

    return result
  }, [isShown, indicatorNode, normalizedHeight, normalizedWidth])

  const combinedStyles = useMemo(() => {
    const baseStyles = {
      '--padd-spacer-height': dimensions.height,
      '--padd-spacer-width': dimensions.width,
      '--padd-base-unit': baseUnit,
      '--padd-z-index': zIndex,
    } as CSSProperties

    if (customColor) {
      return cs({
        ...baseStyles,
        '--padd-spacer-color': customColor,
      } as CSSProperties, style)
    }

    return cs(baseStyles, style)
  }, [dimensions, baseUnit, zIndex, customColor, style])

  return (
    <div
      className={cx(
        styles.spacer,
        className,
        isShown ? styles.visible : styles.hidden,
      )}
      data-testid="spacer-container"
      data-variant={variant}
      style={combinedStyles}
    >
      {measurements}
    </div>
  )
})
