import { Image } from '@tiptap/extension-image';

export const BlockImage = Image.extend({
  group: 'block',
  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: node => ({ src: (node as HTMLImageElement).getAttribute('src') }),
      },
    ];
  },
});
