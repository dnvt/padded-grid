# Padded Grid

A lightweight, flexible grid system for React applications with precise control over spacing and layout.

## Quick Start

```bash
npm install padded-grid
```

```tsx
import { PaddedGrid, XGrid, YGrid } from "padded-grid";
import 'padded-grid/styles.css';

function App() {
  return (
    <PaddedGrid config={{ base: 8, maxWidth: "1200px" }}>
      <XGrid columns={12} gap={16} />
      <YGrid base={8} />
      <main>Content</main>
    </PaddedGrid>
  );
}
```

## Features

- 🎯 Precise baseline grid alignment
- 📐 Flexible column layouts (fixed, auto, custom patterns)
- 📱 First-class responsive support
- 🎨 Built-in layout guides and overlays
- 🔧 TypeScript-first with comprehensive types
- ⚡️ Zero dependencies
- 🪶 Tree-shakeable

## Documentation

- [Grid System Documentation](./docs/GRID_SYSTEM.md) - Core concepts and formulas
- [Component API Reference](./docs/COMPONENTS.md) - Detailed component docs
- [Examples & Use Cases](./docs/EXAMPLES.md) - Common patterns

## Roadmap (Post v0.1)

1. Comprehensive test suite
2. RTL support
3. SSR compatibility
4. Additional grid variants
5. Animation support

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT © [François Denavaut]