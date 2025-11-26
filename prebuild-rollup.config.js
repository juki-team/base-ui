import copy from 'rollup-plugin-copy';

const plugins = [
  copy({
    targets: [
      { src: 'node_modules/handsontable/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/@excalidraw/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/react-image-crop/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/@milkdown/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
    ],
    flatten: false,
  }),
];

export default [
  {
    input: 'src/prebuild-dummy.js',
    output: {
      dir: 'tmp-prebuild',
      format: 'esm',
    },
    plugins,
  },
];
