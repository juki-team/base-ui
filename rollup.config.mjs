// import typescript from 'rollup-plugin-typescript2';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel';
// https://medium.com/@martin_hotell/typescript-library-tips-rollup-your-types-995153cc81c7
import { dts } from 'rollup-plugin-dts';
// import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const minifiedOutputs = [
  {
    file: pkg.main,
    format: 'cjs',
    // sourcemap: true,
  },
  {
    file: pkg.module,
    format: 'esm',
    // sourcemap: true,
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
    // external: [ 'react', 'react-dom' ],
    plugins: [
      nodeResolve({
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      }),
      // babel({
      //   babelHelpers: 'bundled',
      //   presets: [ '@babel/preset-react' ],
      //   extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      // }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      copy({
        targets: [
          { src: './src/styles', dest: './dist' },
        ],
      }),
      // terser(),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [ { file: 'dist/index.d.ts', format: 'esm' } ],
    plugins: [ dts() ],
    external: [ /\.(css|less|scss)$/ ],
  },
];
