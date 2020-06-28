import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

import pkg from './package.json'

const terser = require('rollup-plugin-terser').terser
const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/presenta.js',
    format: 'umd',
    name: 'Presenta',
    banner: copyright,
    sourcemap: false
  },
  watch: {
    exclude: 'dist/*',
    include: 'src/**'
  },
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss({
      modules: {
        globalModulePaths: [
          /global/, /themes/
        ]
      },
      plugins: [
      ]
    })
  ]
}
// , {
//   input: 'src/index.js',
//   output: {
//     extend: true,
//     file: 'dist/presenta.min.js',
//     format: 'umd',
//     indent: false,
//     name: 'Presenta'
//   },
//   plugins: [
//     resolve(),
//     babel({
//       exclude: 'node_modules/**'
//     }),
//     commonjs(),
//     terser(),
//     postcss({
//       modules: {
//         globalModulePaths: [
//           'src/css/global.css',
//           'src/blocks/text/global.css'
//         ]
//       },
//       plugins: [
//         autoprefixer({ grid: true }),
//         cssnano({ preset: 'default' })
//       ]
//     })
//   ]
// }
]