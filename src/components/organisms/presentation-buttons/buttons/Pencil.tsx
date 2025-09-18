// import * as fabric from 'fabric';
// import React, { useEffect, useRef, useState } from 'react';
// import { T } from '../../../atoms';
// import { Button } from '../../../atoms/Button/Button';
// import { Input } from '../../../atoms/inputs/Input';
// import { DeleteIcon, EditIcon, InkEraserIcon, StylusNoteIcon } from '../../../atoms/server';
// import { PanToolIcon } from '../../../atoms/server/icons/google/PanToolIcon';
// import { ButtonAction } from '../../../molecules/FloatToolbar/ButtonAction';
// import { InputColor } from '../../../molecules/InputColor/InputColor';
//
// const eraseBrushWidth = 10;
// const eraseBrushColor = '#FFFFFF';
//
// export const DrawingCanvasPencil = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const fabricCanvas = useRef<fabric.Canvas | null>(null);
//   const [ color, setColor ] = useState('#000000');
//   const [ width, setWidth ] = useState(2);
//   const [ mode, setMode ] = useState<'draw' | 'erase' | 'select'>('draw');
//   const stateRef = useRef({ erase: { isMouseDown: false }, history: { isStoring: false } });
//   const [ isActive, setIsActive ] = useState(false);
//   const [ history, setHistory ] = useState<string[]>([]);
//   const [ redoStack, setRedoStack ] = useState<string[]>([]);
//
//   useEffect(() => {
//     if (!canvasRef.current) return;
//
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       isDrawingMode: true,
//       selection: false,
//     });
//
//     canvas.setHeight(window.innerHeight);
//     canvas.setWidth(window.innerWidth);
//     canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
//     canvas.freeDrawingBrush.color = color;
//     canvas.freeDrawingBrush.width = width;
//     fabricCanvas.current = canvas;
//
//     return () => {
//       canvas.dispose();
//     };
//   }, []);
//
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' || e.key === 'Backspace') {
//         const activeObject = fabricCanvas.current?.getActiveObject();
//         const activeGroup = fabricCanvas.current?.getActiveObjects();
//
//         if (fabricCanvas.current && activeObject) {
//           if (activeGroup && activeGroup.length > 1) {
//             activeGroup.forEach(obj => fabricCanvas.current?.remove(obj));
//           } else {
//             fabricCanvas.current.remove(activeObject);
//           }
//           fabricCanvas.current.discardActiveObject();
//           fabricCanvas.current.requestRenderAll();
//         }
//       }
//     };
//
//     document.addEventListener('keydown', handleKeyDown);
//
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
//
//   useEffect(() => {
//     if (fabricCanvas.current) {
//       fabricCanvas.current.isDrawingMode = false;
//     }
//
//     if (fabricCanvas.current && mode === 'draw') {
//       const brush = fabricCanvas.current.freeDrawingBrush;
//
//       if (brush) {
//         brush.color = color;
//         brush.width = width;
//         fabricCanvas.current.isDrawingMode = true;
//       }
//     }
//     if (fabricCanvas.current && mode === 'erase') {
//       const brush = fabricCanvas.current.freeDrawingBrush;
//
//       if (brush) {
//         brush.color = eraseBrushColor;
//         brush.width = eraseBrushWidth;
//         fabricCanvas.current.isDrawingMode = true;
//       }
//     }
//     if (fabricCanvas.current && mode === 'select') {
//       fabricCanvas.current.isDrawingMode = false;
//       fabricCanvas.current.selection = true;
//     }
//   }, [ color, width, mode ]);
//   const isErasing = mode === 'erase';
//   const isDrawing = mode === 'draw';
//   const isSelecting = mode === 'select';
//
//   const saveHistory = () => {
//     if (!fabricCanvas.current || stateRef.current.history.isStoring) return;
//     const json = fabricCanvas.current.toJSON();
//     setHistory(prev => [ ...prev, JSON.stringify(json) ]);
//     setRedoStack([]); // reset redo on new action
//   };
//
//   useEffect(() => {
//     const onMouseDown = () => {
//       if (isErasing) {
//         stateRef.current.erase.isMouseDown = true;
//       }
//     };
//
//     const onMouseUp = () => {
//       stateRef.current.erase.isMouseDown = false;
//       if (isErasing) {
//         const objects = fabricCanvas.current?.getObjects();
//         const last = objects ? objects.at(-1) : null;
//         if (last instanceof fabric.Path) {
//           fabricCanvas.current?.remove(last);
//           fabricCanvas.current?.requestRenderAll();
//         }
//       }
//     };
//
//     const onMouseMove = (event: any) => {
//       if (!isErasing || !stateRef.current.erase.isMouseDown || !fabricCanvas.current) return;
//
//       const pointer = fabricCanvas.current.getPointer(event.e);
//
//       const toRemove: fabric.Object[] = [];
//       const ctx = fabricCanvas.current?.getContext();
//
//       fabricCanvas.current.forEachObject((obj) => {
//         if (obj instanceof fabric.Path) {
//           const path = new Path2D(obj.path.map(cmd => cmd.join(' ')).join(' '));
//           if (ctx.isPointInStroke(path, pointer.x, pointer.y)) {
//             toRemove.push(obj);
//           }
//         }
//       });
//
//       if (toRemove.length > 0) {
//         toRemove.forEach(obj => fabricCanvas.current?.remove(obj));
//         fabricCanvas.current.requestRenderAll();
//       }
//     };
//
//     if (fabricCanvas.current) {
//       fabricCanvas.current.on('mouse:down', onMouseDown);
//       fabricCanvas.current.on('mouse:up', onMouseUp);
//       fabricCanvas.current.on('mouse:move', onMouseMove);
//       fabricCanvas.current.on('object:modified', saveHistory);
//       fabricCanvas.current.on('object:added', saveHistory);
//     }
//
//     return () => {
//       fabricCanvas.current?.off('mouse:down', onMouseDown);
//       fabricCanvas.current?.off('mouse:up', onMouseUp);
//       fabricCanvas.current?.off('mouse:move', onMouseMove);
//       fabricCanvas.current?.off('object:modified', saveHistory);
//       fabricCanvas.current?.off('object:added', saveHistory);
//     };
//   }, [ isErasing ]);
//
//   useEffect(() => {
//     const undo = () => {
//       if (!fabricCanvas.current || history.length === 0) return;
//       const last = history[history.length - 1];
//       setHistory(prev => prev.slice(0, -1));
//       setRedoStack(prev => [ ...prev, JSON.stringify(fabricCanvas.current!.toJSON()) ]);
//       stateRef.current.history.isStoring = true;
//       fabricCanvas.current.loadFromJSON(last, () => {
//         // fabricCanvas.current?.renderAll();
//       }).then(() => {
//         fabricCanvas.current?.renderAll();
//         stateRef.current.history.isStoring = false;
//       });
//     };
//
//     const redo = () => {
//       if (!fabricCanvas.current || redoStack.length === 0) return;
//       const last = redoStack[redoStack.length - 1];
//       setRedoStack(prev => prev.slice(0, -1));
//       setHistory(prev => [ ...prev, JSON.stringify(fabricCanvas.current!.toJSON()) ]);
//       stateRef.current.history.isStoring = true;
//       fabricCanvas.current.loadFromJSON(last, () => {
//         // fabricCanvas.current?.renderAll();
//       }).then(() => {
//         fabricCanvas.current?.renderAll();
//         stateRef.current.history.isStoring = false;
//       });
//     };
//
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
//         e.preventDefault();
//         if (e.shiftKey) {
//           redo();
//         } else {
//           undo();
//         }
//       }
//     };
//
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [ history, redoStack ]);
//
//   const deleteAll = () => {
//     if (fabricCanvas.current) {
//       fabricCanvas.current.getObjects().forEach(obj => fabricCanvas.current?.remove(obj));
//       fabricCanvas.current.requestRenderAll();
//     }
//   };
//
//   return (
//     <>
//       {isActive ? (
//         <ButtonAction
//           placement="rightTop"
//           icon={<EditIcon />}
//           type={isActive ? 'secondary' : 'light'}
//           size="tiny"
//           buttons={[
//             { icon: <EditIcon />, type: 'secondary', label: <T>exit</T>, onClick: () => setIsActive(false) },
//             {
//               children: (
//                 <div className="jk-col gap bc-we elevation-1 jk-pg-xsm jk-br-ie">
//                   <div className="jk-row gap">
//                     <Button
//                       size="tiny"
//                       type={isDrawing ? undefined : 'light'}
//                       icon={<StylusNoteIcon />}
//                       onClick={() => setMode('draw')}
//                     />
//                     <Button
//                       size="tiny"
//                       type={isSelecting ? undefined : 'light'}
//                       icon={<PanToolIcon />}
//                       onClick={() => setMode('select')}
//                     />
//                     <Button
//                       size="tiny"
//                       type={isErasing ? undefined : 'light'}
//                       icon={<InkEraserIcon />}
//                       onClick={() => setMode('erase')}
//                     />
//                     <Button size="tiny" type="light" icon={<DeleteIcon />} onClick={deleteAll} />
//                   </div>
//                   <InputColor
//                     labelPlacement="left"
//                     label={<T className="tt-se">color</T>}
//                     color={{ hex: color, hsl: { h: 0, l: 0, s: 0 }, rgb: { b: 0, g: 0, r: 0 } }}
//                     onChange={({ hex }) => setColor(hex)}
//                   />
//                   <Input<number>
//                     labelPlacement="left"
//                     label={<T className="tt-se">thickness</T>}
//                     type="range"
//                     min={1}
//                     max={21}
//                     step={2}
//                     value={width}
//                     onChange={(value) => setWidth(Number(value))}
//                   />
//                 </div>
//               ),
//             },
//           ]}
//         />
//       ) : (
//         <Button type="light" size="tiny" icon={<EditIcon />} onClick={() => setIsActive(true)} />
//       )}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           pointerEvents: isActive ? undefined : 'none',
//         }}
//       >
//         <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />
//       </div>
//     </>
//   );
// };
