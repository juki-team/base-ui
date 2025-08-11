// import { CODE_LANGUAGE, CodeLanguage } from '@juki-team/commons';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
//
// export const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
//   addNodeView() {
//     return ({ node }) => {
//       // Contenedor principal
//       const layoutContainer = document.createElement('div');
//       layoutContainer.className = 'jk-code-viewer jk-border-radius-inline br-g6 line-numbers';
//
//       const container = document.createElement('div');
//       container.className = 'jk-code-viewer-content jk-row nowrap top';
//       layoutContainer.appendChild(container);
//
//       // Line numbers a la izquierda
//       const lineNumbers = document.createElement('div');
//       lineNumbers.className = 'jk-code-viewer-line-numbers';
//       container.appendChild(lineNumbers);
//
//       // <pre><code> para el código
//       const pre = document.createElement('pre');
//       pre.className = 'jk-border-radius-inline';
//       const code = document.createElement('code');
//       code.className = `language-${node.attrs.language || 'plaintext'} hljs`;
//       code.dataset.highlighted = 'yes';
//       pre.appendChild(code);
//       container.appendChild(pre);
//
//       // Header flotante arriba a la derecha con lenguaje + copiar
//       const floatTopRight = document.createElement('div');
//       floatTopRight.className = 'float-top-right pad-xt jk-row gap';
//       floatTopRight.style.cssText = '';
//
//       const langTag = document.createElement('div');
//       langTag.className = 'tx-t jk-tag bc-pl cr-we jk-pg-xsm';
//       langTag.textContent = (node.attrs.language || CODE_LANGUAGE[CodeLanguage.TEXT].highlightJsKey).toUpperCase();
//       floatTopRight.appendChild(langTag);
//       const copyButton = document.createElement('div');
//       copyButton.setAttribute('data-tooltip-id', 'jk-tooltip');
//       copyButton.setAttribute('data-tooltip-content', 'copy');
//       copyButton.className = 'jk-row small bc-hl link jk-br-ie cr-we jk-button light only-icon';
//       // copyButton.style.cssText = 'width: min-content; height: min-content; padding: calc(var(--gap) / 3);';
//       copyButton.innerHTML = `
//         <span class="jk-icon small jk-icon-content-copy" style="transform: rotate(0deg);">
//           <svg viewBox="0 0 24 24" fill="currentColor">
//             <g transform="translate(0,0) scale(1)">
//               <path d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Z" fill="currentColor"></path>
//             </g>
//           </svg>
//         </span>`;
//       copyButton.addEventListener('click', () => {
//         navigator.clipboard.writeText(node.textContent);
//       });
//       floatTopRight.appendChild(copyButton);
//
//       layoutContainer.appendChild(floatTopRight);
//
//       const updateLineNumbers = () => {
//         lineNumbers.innerHTML = '';
//         langTag.textContent = (node.attrs.language || CODE_LANGUAGE[CodeLanguage.TEXT].highlightJsKey).toUpperCase();
//         const lines = node.textContent.split('\n').length;
//         for (let i = 0; i < lines; i++) {
//           const number = document.createElement('div');
//           number.style.cssText = `--line-index: ${i};`;
//           number.textContent = (i + 1) + '';
//           lineNumbers.appendChild(number);
//         }
//       };
//
//       updateLineNumbers();
//
//       return {
//         dom: layoutContainer,
//         contentDOM: code,
//         update(updatedNode) {
//           if (updatedNode.type !== node.type) return false;
//           node = updatedNode;
//           updateLineNumbers();
//           return true;
//         },
//       };
//     };
//   },
// });
