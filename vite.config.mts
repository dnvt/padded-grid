import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const resolvePath = (...paths: string[]) => resolve(__dirname, ...paths)

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolvePath('README.md'), // Use an absolute path
          dest: '.', // Copy to root of `dist`
        },
        {
          src: resolvePath('docs/**/*'), // Use an absolute path
          dest: 'docs', // Copy to `dist/docs`
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolvePath('src/lib'),
      '@components': resolvePath('src/lib/components'),
      '@hooks': resolvePath('src/lib/hooks'),
      '@types': resolvePath('src/lib/types'),
      '@utils': resolvePath('src/lib/utils'),
      '@styles': resolvePath('src/lib/styles/modules'),
    },
  },
  build: {
    lib: {
      entry: resolvePath('src/lib/index.ts'),
      name: 'PaddedGrid',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
  },
  ...(command === 'serve' && {
    root: 'demo', // Set the root to the `demo/` directory for development
    base: '/',
  }),
}))