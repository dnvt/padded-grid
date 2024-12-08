# Development Usage Guide

## Overview

Padded Grid is designed to help developers visualize and maintain consistent grid systems during development, similar to
design tools like Figma. This guide explains how to effectively use the grid system for development purposes.

## Basic Setup

```tsx
import { PaddedGrid, XGrid, YGrid } from '@dnvt/padded-grid';
import '@dnvt/padded-grid/styles.css';

function App() {
  const showGrid = process.env.NODE_ENV === 'development';

  return (
    <PaddedGrid>
      <XGrid columns={12} gap={16} show={showGrid} />
      <YGrid base={8} show={showGrid} />
      <main>Content</main>
    </PaddedGrid>
  );
}
```

## Grid Types

### Column Grid (XGrid)

Helps visualize and maintain consistent horizontal spacing and column alignment.

```tsx
// Standard 12-column grid
<XGrid
  columns={12}
  gap={16}
  show={showColumns}
  color="#ff00001a"
/>

// Custom column pattern
<XGrid
  columns={['1fr', '2fr', '1fr']}
  gap={24}
  show={showCustomGrid}
  color="#0000ff1a"
/>

// Auto-calculated columns
<XGrid
  columnWidth={240}
  gap={16}
  show={showAutoGrid}
/>
```

### Baseline Grid (YGrid)

Helps maintain consistent vertical rhythm and typography alignment.

```tsx
<YGrid
  base={8}
  show={showBaseline}
  color="#00ff001a"
  variant="line"
/>
```

## Development Controls

### Toggle Implementation

```tsx
function DevelopmentGrid() {
  const [showColumns, setShowColumns] = useState(true);
  const [showBaseline, setShowBaseline] = useState(true);

  return (
    <PaddedGrid>
      <XGrid show={showColumns} columns={12} gap={16} />
      <YGrid show={showBaseline} base={8} />

      <div className="grid-controls">
        <label>
          <input
            type="checkbox"
            checked={showColumns}
            onChange={(e) => setShowColumns(e.target.checked)}
          />
          Show Columns
        </label>
        <label>
          <input
            type="checkbox"
            checked={showBaseline}
            onChange={(e) => setShowBaseline(e.target.checked)}
          />
          Show Baseline
        </label>
      </div>

      <main>Content</main>
    </PaddedGrid>
  );
}
```

### Environment-Based Toggling

```tsx
// In your component
const showGrid = process.env.NODE_ENV === 'development';

// Or using a feature flag
const showGrid = process.env.NEXT_PUBLIC_SHOW_GRID === 'true';
```

## Common Use Cases

### Design Implementation

1. Set up grids to match your design tool specifications:

```tsx
<PaddedGrid config={{ maxWidth: "1440px" }}>
  <XGrid
    columns={['64px', '1fr', '1fr', '1fr', '64px']}
    gap={24}
    show={showGrid}
  />
</PaddedGrid>
```

### Typography Alignment

1. Use the baseline grid to maintain consistent vertical rhythm:

```tsx
<PaddedGrid>
  <YGrid base={8} show={showGrid} />
  <h1 style={{ marginBottom: '24px' }}>Heading</h1>
  <p style={{ marginBottom: '16px' }}>Content</p>
</PaddedGrid>
```

### Responsive Layout Verification

```tsx
<PaddedGrid>
  <XGrid
    columns={{
      base: 4,    // Mobile
      sm: 8,      // Tablet
      md: 12      // Desktop
    }}
    gap={{
      base: 16,
      md: 24
    }}
    show={showGrid}
  />
</PaddedGrid>
```

## Tips & Best Practices

1. **Color Customization**

- Use low-opacity colors for grids (e.g., `rgba(255,0,0,0.1)`)
- Use different colors for different grid types
  
2. **Performance**

- Grids are automatically hidden in production
- Use the `show` prop to conditionally render grids

3. **Multiple Grids**

- Layer different grids for different purposes
- Use different colors to distinguish between grids

4. **Debugging**

- Toggle grids individually to debug specific alignment issues
- Use with browser dev tools for precise measurements

## Related Documentation

- [Grid System Documentation](./GRID_SYSTEM.md) - Core concepts and formulas
- [Component API Reference](./COMPONENTS.md) - Detailed component docs
- [Examples & Use Cases](./EXAMPLES.md) - Common patterns