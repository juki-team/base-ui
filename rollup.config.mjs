// import typescript from 'rollup-plugin-typescript2';
import typescript from "@rollup/plugin-typescript";
import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts',
  inlineDynamicImports: true,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    /* {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    } */
  ],
  external: [ ...Object.keys(pkg.dependencies || {}) ],
  // external: ["react", "react-dom"],
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [ '@babel/preset-react' ],
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    }),
    commonjs(),
    // typescript({ typescript: require('typescript') }),
    typescript({ tsconfig: './tsconfig.json' }),
    copy({
      targets: [
        // { src: './src/components/styles', dest: './dist' },
        { src: './src/styles', dest: './dist' },
      ],
    }),
  ],
};
