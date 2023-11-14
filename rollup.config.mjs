// import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const minifiedOutputs = [
  // https://github.com/rollup/rollup/issues/5236
  // {
  //   file: pkg.main,
  //   format: 'cjs',
  //   // sourcemap: true,
  // },
  {
    file: pkg.module,
    format: 'esm',
    // sourcemap: true,
  },
];

export default [
  {
    input: 'src/index.ts',
    // inlineDynamicImports: true,
    output: minifiedOutputs,
    external: [ ...Object.keys(pkg.dependencies || {}) ],
    plugins: [
      peerDepsExternal(),
      external(),
      resolve(),
      typescript({ tsconfig: './tsconfig.json' }),
      commonjs({ extensions: [ '.js', '.ts' ] }),
      nodeResolve({
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [ '@babel/preset-react' ],
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      }),
      copy({
        targets: [
          { src: './src/styles', dest: './dist' },
        ],
      }),
      // terser(),
    ],
  },
];
