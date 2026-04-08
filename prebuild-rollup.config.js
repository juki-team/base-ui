import copy from 'rollup-plugin-copy';

// Removes all top-level `@layer base { ... }` blocks from fumadocs CSS.
// These are Tailwind v4 global resets that bleed into the rest of the app.
// All fumadocs component styles use `.fd-*` classes and are unaffected.
function stripLayerBase(css) {
  let result = '';
  let i = 0;
  while (i < css.length) {
    const match = css.indexOf('@layer base {', i);
    if (match === -1) {
      result += css.slice(i);
      break;
    }
    result += css.slice(i, match);
    // skip past the entire block by counting braces
    let depth = 0;
    let j = match;
    while (j < css.length) {
      if (css[j] === '{') depth++;
      if (css[j] === '}') { depth--; if (depth === 0) { j++; break; } }
      j++;
    }
    i = j;
  }
  return result;
}

const plugins = [
  copy({
    targets: [
      { src: 'node_modules/handsontable/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/@excalidraw/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/react-image-crop/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/@milkdown/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/reveal.js/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/diff2html/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/highlight.js/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      { src: 'node_modules/katex/**/*.{css,scss,sass,ttf,woff,woff2}', dest: 'src/vendor' },
      {
        src: 'node_modules/fumadocs-ui/**/*.{css,scss,sass,ttf,woff,woff2}',
        dest: 'src/vendor',
        transform: (contents, filename) => {
          if (filename.endsWith('.css')) {
            return stripLayerBase(contents.toString());
          }
          return contents;
        },
      },
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
