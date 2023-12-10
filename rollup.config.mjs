import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
// import pkg from './package.json' assert { type: 'json' };

const commonProps = {
  // external: [ ...Object.keys(pkg.peerDependencies || {}) ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    resolve({
      // dedupe: [ ...Object.keys(pkg.peerDependencies || {}) ],
      // dedupe: [ 'useTranslation', 'i18n', 'I18nextProvider' ],
    }),
    // nodePolyfills(),
    // nodeResolve({ preferBuiltins: false }),
    // nodeResolve(),
    commonjs(),
    // commonjs({
    // ignore: [ 'bufferutil', 'utf-8-validate' ], // Ignore optional peer dependencies of ws
    // }),
    typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json' }),
    copy({
      targets: [
        { src: './src/styles', dest: 'dist' },
      ],
    }),
  ],
};

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
    ...commonProps,
  },
  {
    input: 'src/utils/index.ts',
    output: [
      {
        file: 'dist/cjs/utils.js',
        // dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/esm/utils.es.js',
        // dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonProps,
  },
];
