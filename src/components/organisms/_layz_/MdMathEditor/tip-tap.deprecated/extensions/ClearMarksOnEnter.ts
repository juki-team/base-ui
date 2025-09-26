// import { Extension } from '@tiptap/core';
//
// export const ClearMarksOnEnter = Extension.create({
//   name: 'clearMarksOnEnter',
//
//   addKeyboardShortcuts() {
//     return {
//       Enter: ({ editor }) => {
//         const { state, commands } = editor;
//         const { selection } = state;
//         if (selection.empty && !editor.isActive('codeBlock')) {
//           commands.splitBlock();
//
//           editor.chain().focus()
//             .unsetBold()
//             .unsetItalic()
//             .unsetStrike()
//             .unsetHighlight()
//             .unsetCode()
//             .unsetLink()
//             .run();
//           return true;
//         }
//
//         return false;
//       },
//     };
//   },
// });
