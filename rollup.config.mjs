import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import terser from "@rollup/plugin-terser";
// import postcss from "rollup-plugin-postcss";
// import scss from "rollup-plugin-scss";
// import path from "path";
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
// import { visualizer } from 'rollup-plugin-visualizer';

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json', exclude: [ '**/*.stories.tsx' ]}),
  // sizeSnapshot(),
  // postcss({
  //   modules: true, // 🔥 Usa CSS Modules
  //   autoModules: true, // Detecta archivos `.module.scss`
  //   minimize: true,
  //   sourceMap: true,
  // }),
  // scss({
  //   output: (styles, styleNodes) => {
  //     // 🔥 Genera un archivo CSS separado para cada .scss importado
  //     Object.entries(styleNodes).forEach(([ file, content ]) => {
  //       const fileName = path.basename(file, path.extname(file)) + ".css";
  //       require("fs").writeFileSync(`dist/${fileName}`, content);
  //     });
  //   },
  //   include: [ 'src/styles/**/*.scss' ],
  // }),
  // scss({output: false}), // 🔥 No genera un styles.css global
  terser(),
  copy({
    targets: [
      {src: './src/styles', dest: 'dist'},
    ],
  }),
  // visualizer(),
];

export default [
  {
    input: {
      'main': 'src/index.ts',
      'helpers': 'src/helpers/index.ts',
      'types': 'src/types/index.ts',
      'constants': 'src/constants/index.ts',
      'settings': 'src/settings/index.ts',
    },
    output: [
      {
        // file: 'dist/index.js',
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: false,
        preserveModules: true,
      },
      {
        // file: 'build/index.es.js',
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: false,
        preserveModules: true,
      },
    ],
    // external: [ ...Object.keys(pkg.peerDependencies || {}) ],
    plugins,
    preserveEntrySignatures: 'strict',
    preserveDirectives: true,
  },
  // {
  //   input: 'src/utils/index.ts',
  //   output: [
  //     {
  //       file: 'dist/cjs/utils.js',
  //       // dir: 'dist/cjs',
  //       format: 'cjs',
  //       sourcemap: true,
  //     },
  //     {
  //       file: 'dist/esm/utils.es.js',
  //       // dir: 'dist/esm',
  //       format: 'esm',
  //       sourcemap: true,
  //     },
  //   ],
  //   plugins,
  // },
];
