import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  inlineDynamicImports: true,
  output: [
    {
      file: './dist/cjs/index.js',
      format: 'cjs',
    },
    {
      file: './dist/esm/index.js',
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    copy({
      targets: [
        // { src: './src/components/styles', dest: './dist' },
        { src: './src/components', dest: './dist'}
      ],
    }),
  ],
};