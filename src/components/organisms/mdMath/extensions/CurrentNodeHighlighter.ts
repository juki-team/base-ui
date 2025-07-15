import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const CurrentNodeHighlighter = Extension.create({
  name: 'currentNodeHighlighter',
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('currentNodeHighlighter'),
        state: {
          init: () => DecorationSet.empty,
          apply: (tr) => {
            if (!tr.selection.empty) return DecorationSet.empty;
            const { $from } = tr.selection;
            const node = $from.node();
            if (!node) return DecorationSet.empty;
            
            const deco = Decoration.node(
              $from.before(), // inicio del nodo
              $from.after(),  // fin del nodo
              { class: 'current-node-highlight jk-br-ie' },
            );
            return DecorationSet.create(tr.doc, [ deco ]);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
