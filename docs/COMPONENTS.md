# Component API Reference

## PaddedGrid

Main container component that provides the grid structure and spacing control.

### Props

```typescript
interface PGProps {
  // Core configuration
  config: {
    base?: number;              // Base unit for spacing (default: 8)
    maxWidth?: string | number; // Container max width (default: '100%')
    align?: 'start' | 'center' | 'end'; // Alignment (default: 'center')
  };
  // Optional styling
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
```

### Usage

```tsx
<PaddedGrid
  config={{
    base: 8,
    maxWidth: "1200px",
    align: "center"
  }}
  className="custom-grid"
>
  {/* Grid content */}
</PaddedGrid>
```

## XGrid

Horizontal grid component for column-based layouts.

### Props

```typescript
interface XGProps {
  // Column configuration (one of these required)
  columns?: number;                    // Fixed number of columns
  columns?: Array<string | number>;    // Custom pattern
  columnWidth?: string | number;       // Auto-calculated columns

  // Spacing and styling
  gap?: number;                        // Gap between columns
  variant?: 'default' | 'line';        // Grid style variant
  show?: boolean;                      // Toggle visibility
  color?: string;                      // Guide color

  // Optional
  className?: string;
  style?: CSSProperties;
}
```

### Usage Examples

```tsx
// Fixed columns
<XGrid columns={12} gap={16} />

// Custom pattern
<XGrid columns={['24px', '1fr', '2fr']} gap={16} />

// Auto-calculated
<XGrid columnWidth={240} gap={24} />

// Line variant
<XGrid variant="line" gap={8} show color="#0000ff25" />
```

## YGrid

Vertical grid component for baseline alignment.

### Props

```typescript
interface YGProps {
  // Core configuration
  base?: number;                // Base unit for spacing
  height?: string | number;     // Grid height

  // Display options
  show?: boolean;              // Toggle visibility
  variant?: 'line' | 'flat';   // Grid style variant
  color?: string;              // Guide color

  // Optional
  className?: string;
  style?: CSSProperties;
}
```

### Usage Examples

```tsx
// Basic baseline grid
<YGrid base={8} show />

// Full-height guide
<YGrid base={8} height="100vh" variant="line" />

// Custom colored guides
<YGrid base={4} color="rgba(255,0,0,0.1)" />
```

## Common Patterns

### Responsive Grid

```tsx
<PaddedGrid config={{ base: 8 }}>
  <XGrid
    columns={{
      base: 1,  // Mobile
      sm: 2,    // Tablet
      md: 3,    // Laptop
      lg: 4     // Desktop
    }}
    gap={{
      base: 16,
      md: 24,
      lg: 32
    }}
  />
</PaddedGrid>
```

### Grid with Guides

```tsx
<PaddedGrid config={{ base: 8 }}>
  {/* Column guides */}
  <XGrid columns={12} gap={16} show color="#0000ff15" />

  {/* Baseline guides */}
  <YGrid base={8} show color="#ff000015" />

  {/* Content */}
  <main>Your content here</main>
</PaddedGrid>
```

### Mixed Column Patterns

```tsx
<XGrid
  columns={[
    '64px',     // Fixed sidebar
    '1fr',      // Flexible content
    '300px'     // Fixed sidebar
  ]}
  gap={24}
/>
```