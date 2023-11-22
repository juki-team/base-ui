import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

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
  external: [ 'react', 'react-dom' ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    // nodePolyfills(),
    // nodeResolve({ preferBuiltins: false }),
    // nodeResolve(),
    commonjs({
      ignore: [ 'bufferutil', 'utf-8-validate' ], // Ignore optional peer dependencies of ws
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        { src: './src/styles', dest: 'dist' },
      ],
    }),
  ],
};