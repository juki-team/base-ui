// import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
// https://medium.com/@martin_hotell/typescript-library-tips-rollup-your-types-995153cc81c7
// import { dts } from 'rollup-plugin-dts';
// import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const minifiedOutputs = [
  {
    // dir: 'dist',
    file: pkg.main,
    format: 'cjs',
    // sourcemap: true,
  },
  {
    // dir: 'dist',
    file: pkg.module,
    format: 'esm',
    //sourcemap: true,
    // preserveModules: true,
  },
  /* {
    file: 'dist/bundle.min.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  } */
];

// const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
//   ...rest,
//   file: file.replace('.min.', '.'),
// }));

export default [
  {
    input: 'src/index.ts',
    // inlineDynamicImports: true,
    // output: [ ...unminifiedOutputs, ...minifiedOutputs ],
    output: minifiedOutputs,
    external: [ ...Object.keys(pkg.dependencies || {}) ],
    // external: [ ...Object.keys(pkg.peerDependencies || {}) ],
    // external: [ 'react', 'react-dom' ],
    plugins: [
      peerDepsExternal(),
      external(),
      resolve(),
      nodeResolve({
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      }),
      babel({
        babelHelpers: 'bundled',
        presets: [ '@babel/preset-react' ],
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      // typescript(),
      commonjs({ extensions: [ '.js', '.ts' ] }),
      copy({
        targets: [
          { src: './src/styles', dest: './dist' },
        ],
      }),
      // terser(),
    ],
  },
  // {
  //   input: 'dist/esm/index.d.ts',
  //   output: [ { file: 'dist/index.d.ts', format: 'esm' } ],
  //   plugins: [ dts() ],
  //   external: [ /\.(css|less|scss)$/ ],
  // },
];
