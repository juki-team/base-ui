"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8540],{"./src/components/SimpleSortableRows/SimpleSortableRows.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Row:function(){return Row},Test:function(){return Test}});var _home_oscargauss_Documents_JUKI_v1_base_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),immutability_helper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/immutability-helper/index.js"),immutability_helper__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(immutability_helper__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.tsx"),_graphics__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/graphics/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),DndProvider=(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)((function(){return Promise.resolve().then(__webpack_require__.bind(__webpack_require__,"./node_modules/react-dnd/dist/index.js")).then((function(module){return{default:module.DndProvider}}))})),Test=function Test(_ref){var id=_ref.id,content=_ref.content,index=_ref.index,moveRow=_ref.moveRow,useDrop=_ref.useDrop,useDrag=_ref.useDrag,ref=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),_useDrop=useDrop({accept:"row",collect:function collect(monitor){return{handlerId:monitor.getHandlerId()}},hover:function hover(item,monitor){var _ref$current;if(ref.current){var dragIndex=item.index,hoverIndex=index;if(dragIndex!==hoverIndex){var hoverBoundingRect=null===(_ref$current=ref.current)||void 0===_ref$current?void 0:_ref$current.getBoundingClientRect(),hoverMiddleY=(hoverBoundingRect.bottom-hoverBoundingRect.top)/2,hoverClientY=monitor.getClientOffset().y-hoverBoundingRect.top;dragIndex<hoverIndex&&hoverClientY<hoverMiddleY||dragIndex>hoverIndex&&hoverClientY>hoverMiddleY||(moveRow(dragIndex,hoverIndex),item.index=hoverIndex)}}}}),_useDrop2=(0,_home_oscargauss_Documents_JUKI_v1_base_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useDrop,2),handlerId=_useDrop2[0].handlerId,drop=_useDrop2[1],_useDrag=useDrag({type:"row",item:function item(){return{id:id,index:index}},collect:function collect(monitor){return{isDragging:monitor.isDragging()}}}),_useDrag2=(0,_home_oscargauss_Documents_JUKI_v1_base_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useDrag,3),isDragging=_useDrag2[0].isDragging,drag=_useDrag2[1],preview=_useDrag2[2];return drag(drop(ref)),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.c_)(content,{dragComponentRef:ref,dragComponent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{ref:ref,style:{cursor:"move"},className:"jk-sortable-row-drag-icon jk-row",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_graphics__WEBPACK_IMPORTED_MODULE_3__.Vn,{})}),previewRef:preview,dataHandlerId:handlerId,isDragging:isDragging})})},Row=function Row(_ref2){var id=_ref2.id,content=_ref2.content,index=_ref2.index,moveRow=_ref2.moveRow,useDragRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),useDropRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),_useState=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),_useState2=(0,_home_oscargauss_Documents_JUKI_v1_base_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useState,2),render=_useState2[0],setRender=_useState2[1];return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){useDragRef.current=__webpack_require__("./node_modules/react-dnd/dist/index.js").useDrag,useDropRef.current=__webpack_require__("./node_modules/react-dnd/dist/index.js").useDrop,setRender(1)}),[]),render?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Test,{id:id,content:content,index:index,moveRow:moveRow,useDrop:useDropRef.current,useDrag:useDragRef.current}):null},SimpleSortableRows=function SimpleSortableRows(_ref3){var rows=_ref3.rows,setRows=_ref3.setRows,className=_ref3.className,moveRow=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((function(dragIndex,hoverIndex){setRows((function(prevCards){return immutability_helper__WEBPACK_IMPORTED_MODULE_0___default()(prevCards,{$splice:[[dragIndex,1],[hoverIndex,0,prevCards[dragIndex]]]})}))}),[setRows]),renderRow=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((function(row,index){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Row,{index:index,id:row.id,content:row.content,moveRow:moveRow},row.id)}),[moveRow]),HTML5BackendRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),_useState3=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),_useState4=(0,_home_oscargauss_Documents_JUKI_v1_base_ui_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_useState3,2),render=_useState4[0],setRender=_useState4[1];return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){HTML5BackendRef.current=__webpack_require__("./node_modules/react-dnd-html5-backend/dist/index.js").PD,setRender(1)}),[]),!!render&&HTML5BackendRef.current&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DndProvider,{backend:HTML5BackendRef.current,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.AK)("jk-sortable-rows-container",className),children:rows.map((function(row,i){return renderRow(row,i)}))})})};__webpack_exports__.default=SimpleSortableRows;try{Test.displayName="Test",Test.__docgenInfo={description:"",displayName:"Test",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"RowSortableItemContentType"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},moveRow:{defaultValue:null,description:"",name:"moveRow",required:!0,type:{name:"(i: number, j: number) => void"}},useDrop:{defaultValue:null,description:"",name:"useDrop",required:!0,type:{name:"any"}},useDrag:{defaultValue:null,description:"",name:"useDrag",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SimpleSortableRows/SimpleSortableRows.tsx#Test"]={docgenInfo:Test.__docgenInfo,name:"Test",path:"src/components/SimpleSortableRows/SimpleSortableRows.tsx#Test"})}catch(__react_docgen_typescript_loader_error){}try{Row.displayName="Row",Row.__docgenInfo={description:"",displayName:"Row",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"RowSortableItemContentType"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},moveRow:{defaultValue:null,description:"",name:"moveRow",required:!0,type:{name:"(i: number, j: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SimpleSortableRows/SimpleSortableRows.tsx#Row"]={docgenInfo:Row.__docgenInfo,name:"Row",path:"src/components/SimpleSortableRows/SimpleSortableRows.tsx#Row"})}catch(__react_docgen_typescript_loader_error){}try{SimpleSortableRows.displayName="SimpleSortableRows",SimpleSortableRows.__docgenInfo={description:"",displayName:"SimpleSortableRows",props:{rows:{defaultValue:null,description:"",name:"rows",required:!0,type:{name:"RowSortableItem[]"}},setRows:{defaultValue:null,description:"",name:"setRows",required:!0,type:{name:"Dispatch<SetStateAction<RowSortableItem[]>>"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/SimpleSortableRows/SimpleSortableRows.tsx#SimpleSortableRows"]={docgenInfo:SimpleSortableRows.__docgenInfo,name:"SimpleSortableRows",path:"src/components/SimpleSortableRows/SimpleSortableRows.tsx#SimpleSortableRows"})}catch(__react_docgen_typescript_loader_error){}}}]);