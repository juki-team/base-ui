import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
// import copy from 'rollup-plugin-copy';
import terser from "@rollup/plugin-terser";
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
// import scss from "rollup-plugin-scss";
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
// import { visualizer } from 'rollup-plugin-visualizer';
// import pkg from './package.json' with { type: 'json' };
import path from 'path';

const plugins = [
  // nodePolyfills(),
  // replace({
  //   preventAssignment: true,
  //   values: {
  //     '"use client";': '',
  //   },
  // }),
  peerDepsExternal(),
  alias({
    entries: [
      // { find: 'node:crypto', replacement: path.resolve('./src/shims/crypto.js') },
      // { find: 'crypto', replacement: path.resolve('./src/shims/crypto.js') },
      { find: '@excalidraw/mermaid-to-excalidraw', replacement: path.resolve('./src/shims/emptyModule.js') },
    ]
  }),
  resolve({
    preferBuiltins: false,
    browser: true,
  }),
  commonjs({
    dynamicRequireTargets: [
      'node_modules/i18n-iso-countries/langs/*.json'
    ]
  }),
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfig: './tsconfig.json',
    exclude: [ '**/*.stories.tsx' ],
    tsconfigOverride: {
      compilerOptions: {
        rootDir: '.',
      },
    },
    // check: false,
  }),
  // postcss({
  //   extensions: [ ".css", ".scss" ],
  //   // modules: {
  //   //   generateScopedName: "[local]"
  //   // },
  //   // autoModules: true, // Detecta archivos `.module.scss` y los trata como CSS Modules
  //   use: [
  //     [
  //       "sass",
  //       {
  //         includePaths: [
  //           "./src/styles",
  //         ],
  //         implementation: sass,
  //       },
  //     ],
  //   ],
  //   minimize: true,
  //   sourceMap: false,
  //   inject: true,
  //   extract: false, // FALSE: el CSS se inyecta vía JS; cada componente carga sus estilos cuando se usa
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
  json(),
  terser(),
  // copy({
  //   targets: [
  //     // { src: './src/styles', dest: 'dist' },
  //   ],
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats-treemap.html`,
  //   template: 'treemap',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats-sunburst.html`,
  //   template: 'sunburst',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats-network.html`,
  //   template: 'network',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats-list.txt`,
  //   template: 'list',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats-flamegraph.html`,
  //   template: 'flamegraph',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
  // visualizer({
  //   filename: `./stats/${pkg.version}/stats.json`,
  //   template: 'raw-data',
  //   gzipSize: true,
  //   brotliSize: true,
  // }),
];

export default [
  {
    input: {
      'main': 'src/index.ts',
      'helpers': 'src/helpers/index.ts',
      'types': 'src/types/index.ts',
      'enums': 'src/enums/index.ts',
      'constants': 'src/constants/index.ts',
      'settings': 'src/settings/index.ts',
      'server': 'src/components/server/index.ts',
    },
    output: [
      // {
      //   // file: 'dist/index.js',
      //   dir: 'dist/cjs',
      //   format: 'cjs',
      //   sourcemap: false,
      //   // preserveModules: true,
      // },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    // external: [ ...Object.keys(pkg.peerDependencies || {}) ],
    plugins,
    preserveEntrySignatures: 'strict',
    // preserveDirectives: true, // Unknown input options
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        console.info(warning.message);
        return;
      }
      warn(warning);
    },
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
