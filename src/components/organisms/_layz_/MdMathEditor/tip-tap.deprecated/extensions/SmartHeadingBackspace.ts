// import { Extension } from '@tiptap/core';
//
// export const SmartHeadingBackspace = Extension.create({
//   name: 'smartHeadingBackspace',
//   addKeyboardShortcuts() {
//     return {
//       Backspace: ({ editor }) => {
//         const { state, commands } = editor;
//         const { selection } = state;
//         const { $from } = selection;
//
//         const node = $from.node();
//
//         // Verifica si el nodo es un heading
//         if (node.type.name === 'heading') {
//           const isAtStart = $from.parentOffset === 0;
//
//           if (isAtStart) {
//             const currentLevel = node.attrs.level;
//
//             if (currentLevel > 1) {
//               // Baja un nivel al heading (h4 ➔ h3, etc.)
//               commands.setNode('heading', { level: currentLevel - 1 });
//               return true; // Evita el comportamiento por defecto (borrar)
//             } else {
//               commands.setNode('paragraph');
//               return true;
//             }
//           }
//         }
//
//         return false;
//       },
//       '#': ({ editor }) => {
//         const { state, commands } = editor;
//         const { selection } = state;
//         const { $from } = selection;
//
//         const node = $from.node();
//         const isAtStart = $from.parentOffset === 0;
//
//         if (node.type.name === 'heading' && isAtStart) {
//           const currentLevel = node.attrs.level;
//           if (currentLevel < 6) {
//             commands.setNode('heading', { level: currentLevel + 1 });
//             return true; // Interrumpe el comportamiento estándar
//           }
//         }
//         return false;
//       },
//     };
//   },
// });
