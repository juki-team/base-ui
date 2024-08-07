import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
// import { visualizer } from 'rollup-plugin-visualizer';

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json', exclude: [ '**/*.stories.tsx' ] }),
  copy({
    targets: [
      { src: './src/styles', dest: 'dist' },
    ],
  }),
  // visualizer(),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        // file: 'dist/index.js',
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        // file: 'build/index.es.js',
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
      },
    ],
    // external: [ ...Object.keys(pkg.peerDependencies || {}) ],
    plugins,
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
