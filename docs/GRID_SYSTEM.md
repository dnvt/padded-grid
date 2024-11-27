# Grid System Documentation

## Grid Calculation Formulas

### Column Width Calculations

1. **Fixed Columns**

```typescript
// For n columns of equal width
columnWidth = (containerWidth - (gap * (numberOfColumns - 1))) / numberOfColumns

// Example: 1200px container, 12 columns, 16px gap
// (1200px - (16px * 11)) / 12 = 84px per column
```

2. **Flexible Columns (fr units)**

```typescript
// For mixed units (e.g., '1fr 2fr 1fr')
totalFractions = sum of all fr units // e.g., 4fr total
fractionUnit = (containerWidth - fixedWidths - (gaps * (columns - 1))) / totalFractions

// Example: [1fr, 2fr, 1fr] in 1200px container with 16px gaps
// fractionUnit = (1200 - (16 * 2)) / 4 = 292px
// Column widths: 292px, 584px, 292px
```

3. **Auto-calculated Columns**

```typescript
// For a given minimum column width
numberOfColumns = Math.floor((containerWidth + gap) / (minimumColumnWidth + gap))

// Example: 1200px container, 200px min column, 16px gap
// Math.floor((1200 + 16) / (200 + 16)) = 5 columns
```

## Responsive Breakpoints

The grid system uses a mobile-first approach with these breakpoints:

```typescript
const BREAKPOINTS = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large (desktop)
  xxl: '1536px'  // Ultra wide
}
```

### Usage Example

```tsx
<XGrid
  columns={{
    base: 1,     // Mobile: single column
    sm: 2,       // Tablet: two columns
    md: 3,       // Small desktop: three columns
    lg: 4,       // Desktop: four columns
    xl: 6        // Wide screens: six columns
  }}
  gap={{
    base: 16,
    md: 24,
    lg: 32
  }}
/>
```

## Grid Variants

### 1. PaddedGrid

Main container component that provides consistent spacing and alignment.

**Use Cases:**

- Page layouts
- Content sections
- Component containers

```tsx
<PaddedGrid
  config={{
    base: 8,              // 8px base unit
    maxWidth: "1200px",   // Maximum width constraint
    align: "center"       // Center alignment
  }}
/>
```

### 2. XGrid (Horizontal Grid)

**Variants:**

- Fixed Columns: Equal width columns
- Custom Pattern: Mixed width columns
- Line Variant: Guide lines for layout
- Auto-calculated: Responsive column count

**Use Cases:**

- Card layouts
- Image galleries
- Form layouts
- Content grids

### 3. YGrid (Baseline Grid)

**Variants:**

- Line: Single pixel lines
- Flat: Block-based spacing

**Use Cases:**

- Typography alignment
- Vertical rhythm
- Content spacing guides

## Limitations & Edge Cases

1. **Column Width Limits**
  - Minimum column width: 16px
  - Maximum columns: 24
  - Avoid fractional pixel values

2. **Performance Considerations**
  - Large number of grid lines may impact performance
  - Consider virtualizing YGrid for long pages
  - Use responsive breakpoints efficiently

3. **Browser Support**
  - CSS Grid: IE11 not supported
  - CSS Custom Properties: IE11 not supported
  - CSS Container Queries: Check browser support

4. **Known Edge Cases**
  - Nested grids may need special handling
  - Complex patterns might need manual breakpoint adjustments
  - Animation limitations with CSS Grid

## RTL Support

The grid system supports Right-to-Left (RTL) layouts through:

1. **Logical Properties**

```css
.container {
  margin-inline-start: auto;
  margin-inline-end: auto;
}
```

2. **Directional Flipping**

- Grid alignment automatically flips in RTL
- Column orders respect reading direction
- Margins and paddings use logical properties

3. **RTL Usage Example**

```tsx
<PaddedGrid
  config={{
    align: "start" // Will align right in RTL, left in LTR
  }}
>
  <XGrid columns={3} /> {/* Order flips automatically in RTL */}
</PaddedGrid>
```

4. **RTL Considerations**

- Always use logical properties (start/end) instead of physical ones (left/right)
- Test layouts in both directions
- Consider content reflow in flexible layouts
