import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

// import pkg from './package.json';

export default {
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
  // external: [...Object.keys(pkg.peerDependencies || {})],
  // plugins: [
  //   typescript({
  //     typescript: require('typescript'),
  //   }),
  external: [ 'react', 'react-dom', 'swr' ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    nodeResolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        { src: './src/styles', dest: 'dist' },
      ],
    }),
  ],
};
