// import { Status } from '@juki-team/commons';
// import { Extension } from '@tiptap/core';
// import MarkdownIt from 'markdown-it';
// // @ts-ignore
// import markdownItMark from 'markdown-it-mark';
// import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
// import { Plugin } from 'prosemirror-state';
// import { handleUploadImage } from '../../../../helpers';
// import { NotificationType } from '../../../../types';
//
// export const markdownIt = new MarkdownIt();
// markdownIt.use(markdownItMark);
//
// export const SmartPasteMarkdown = Extension.create({
//   name: 'smartPasteMarkdown',
//   addOptions() {
//     return {
//       addNotification: (_: { type: NotificationType; message: string }) => {
//       },
//       setLoader: (_: Status) => {
//       },
//     };
//   },
//   addProseMirrorPlugins() {
//     const { addNotification, setLoader } = this.options;
//     return [
//       new Plugin({
//         props: {
//           handlePaste(view, event) {
//             const items = event.clipboardData?.items ?? [];
//             const imageFiles: File[] = [];
//             for (const item of items) {
//               if (item.kind === 'file') {
//                 const file = item.getAsFile();
//                 if (file && file.type.startsWith('image/')) {
//                   imageFiles.push(file);
//                 }
//               }
//             }
//
//             if (imageFiles.length > 0) {
//               setTimeout(async () => {
//                 let extraText = '';
//                 setLoader(Status.LOADING);
//                 for (const imageFile of imageFiles) {
//                   const { status, message, content } = await handleUploadImage(imageFile, false);
//                   if (status === Status.SUCCESS) {
//                     addNotification({ type: NotificationType.SUCCESS, message });
//                     extraText += (extraText ? '\n\n' : '') + `![image alt](${content!.imageUrl})`;
//                     view.dispatch(
//                       view.state.tr.replaceSelectionWith(
//                         view.state.schema.nodes.image.create({ src: content.imageUrl }),
//                       ),
//                     );
//                   } else {
//                     addNotification({ type: NotificationType.ERROR, message });
//                   }
//                 }
//                 setLoader(Status.NONE);
//               }, 0);
//               return true;
//             } else {
//               const clipboardData = event.clipboardData;
//               if (!clipboardData) return false;
//
//               const text = clipboardData.getData('text/plain');
//               if (!text) return false;
//
//               const { $from } = view.state.selection;
//               const node = $from.node();
//
//               const isEmptyParagraph =
//                 node.type.name === 'paragraph' && node.content.size === 0;
//
//               if (!isEmptyParagraph) {
//                 return false; // pegado normal sin procesar
//               }
//
//               const html = markdownIt.render(text);
//
//               const parser = ProseMirrorDOMParser.fromSchema(view.state.schema); // ✅ crea el parser
//               const docFragment = parser.parse(
//                 new DOMParser().parseFromString(html, 'text/html').body,
//               );
//
//               const transaction = view.state.tr.replaceSelectionWith(docFragment);
//               view.dispatch(transaction);
//
//               return true;
//             }
//           },
//         },
//       }),
//     ];
//   },
// });
