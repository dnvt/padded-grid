# Examples & Use Cases

## Basic Layout Patterns

### Page Layout with Sidebar

```tsx
import { PaddedGrid, XGrid } from 'padded-grid';

function PageLayout() {
  return (
    <PaddedGrid config={{ maxWidth: "1400px" }}>
      <XGrid columns={['240px', '1fr']} gap={24}>
        <aside>Sidebar content</aside>
        <main>Main content</main>
      </XGrid>
    </PaddedGrid>
  );
}
```

### Card Grid

```tsx
function CardGrid() {
  return (
    <PaddedGrid config={{ base: 8 }}>
      <XGrid
        columns={{
          base: 1,    // 1 column on mobile
          sm: 2,      // 2 columns on tablet
          md: 3,      // 3 columns on laptop
          lg: 4       // 4 columns on desktop
        }}
        gap={{
          base: 16,
          md: 24
        }}
      >
        {cards.map(card => (
          <div key={card.id} className="card">
            {card.content}
          </div>
        ))}
      </XGrid>
    </PaddedGrid>
  );
}
```

### Typography with Baseline Grid

```tsx
function Article() {
  return (
    <PaddedGrid config={{ base: 8 }}>
      {/* Show baseline grid for development */}
      <YGrid base={8} show={process.env.NODE_ENV === 'development'} />

      <article className="content">
        <h1 style={{ marginBottom: 32 }}>Article Title</h1>
        <p style={{ marginBottom: 24 }}>Article content...</p>
      </article>
    </PaddedGrid>
  );
}
```

## Advanced Patterns

### Complex Layout with Mixed Columns

```tsx
function ComplexLayout() {
  return (
    <PaddedGrid config={{ maxWidth: "1600px" }}>
      <XGrid columns={['64px', '1fr', '2fr', '1fr', '64px']} gap={16}>
        <div>Left</div>
        <div>Content 1</div>
        <div>Main Content</div>
        <div>Content 2</div>
        <div>Right</div>
      </XGrid>
    </PaddedGrid>
  );
}
```

### Nested Grids

```tsx
function NestedLayout() {
  return (
    <PaddedGrid config={{ base: 8 }}>
      <XGrid columns={2} gap={32}>
        <div>
          <h2>Section 1</h2>
          <XGrid columns={2} gap={16}>
            <div>Nested content 1</div>
            <div>Nested content 2</div>
          </XGrid>
        </div>
        <div>
          <h2>Section 2</h2>
          <XGrid columns={3} gap={16}>
            <div>Nested content 3</div>
            <div>Nested content 4</div>
            <div>Nested content 5</div>
          </XGrid>
        </div>
      </XGrid>
    </PaddedGrid>
  );
}
```

### Development Grid Guide

```tsx
function DevelopmentLayout() {
  return (
    <PaddedGrid config={{ base: 8, maxWidth: "1200px" }}>
      {/* Column guides */}
      <XGrid columns={12} gap={16} show color="rgba(0,0,255,0.1)" />

      {/* Baseline guide */}
      <YGrid base={8} show color="rgba(255,0,0,0.1)" />

      {/* Layout pattern guide */}
      <XGrid
        columns={['auto', '1fr', 'auto']}
        gap={24}
        show
        color="rgba(0,255,0,0.1)"
      />

      {/* Actual content */}
      <main>
        Your content here...
      </main>
    </PaddedGrid>
  );
}
```

## Responsive Design Patterns

### Responsive Image Gallery

```tsx
function ImageGallery() {
  return (
    <PaddedGrid config={{ base: 8 }}>
      <XGrid
        columnWidth={{
          base: 150,  // Minimum 150px columns
          md: 200,    // Minimum 200px on medium
          lg: 250     // Minimum 250px on large
        }}
        gap={{
          base: 8,
          md: 16,
          lg: 24
        }}
      >
        {images.map(image => (
          <img key={image.id} src={image.url} alt={image.alt} />
        ))}
      </XGrid>
    </PaddedGrid>
  );
}
```

See [Grid System Documentation](./GRID_SYSTEM.md) for more details on the underlying concepts and calculations.