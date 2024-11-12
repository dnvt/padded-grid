import { defineConfig } from 'tsup'
import { resolve } from 'path'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import fs from 'fs/promises'

const resolvePath = (...paths: string[]) => resolve(__dirname, ...paths)

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom'],
  alias: {
    '@': resolvePath('src/lib'),
    '@components': resolvePath('src/lib/components'),
    '@hooks': resolvePath('src/lib/hooks'),
    '@types': resolvePath('src/lib/types'),
    '@utils': resolvePath('src/lib/utils'),
    '@styles': resolvePath('src/lib/styles/modules'),
  },
  esbuildOptions(options) {
    options.bundle = true
    options.platform = 'browser'
    options.target = ['es2018']
    options.minify = true
    options.treeShaking = true
  },
  treeshake: {
    preset: 'smallest',
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
  async onSuccess() {
    // Process CSS
    const css = await postcss([
      autoprefixer(),
      cssnano({ preset: 'default' }),
    ]).process(
      // Read your CSS file
      await fs.readFile(resolvePath('src/lib/styles/index.css'), 'utf-8'),
      { from: undefined }
    )

    // Write processed CSS to dist
    await fs.writeFile(resolvePath('dist/styles.css'), css.css)
  },
})
