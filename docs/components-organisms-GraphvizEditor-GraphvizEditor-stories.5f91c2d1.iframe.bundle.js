"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[7106,8749,9039],{"./src/components/organisms/GraphvizEditor/GraphvizEditor.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_mockup__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/mockup/index.ts"),_GraphvizEditor__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/organisms/GraphvizEditor/GraphvizEditor.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_1__]);_mockup__WEBPACK_IMPORTED_MODULE_1__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const __WEBPACK_DEFAULT_EXPORT__={component:_GraphvizEditor__WEBPACK_IMPORTED_MODULE_2__.GraphvizEditor},Cmp=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("digraph {\n    rankdir=LR\n    a -> b\n    b -> c\n    b -> d*&()\n    c -> e\n    d -> e\n    e -> a\n}");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:"jk-col gap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_GraphvizEditor__WEBPACK_IMPORTED_MODULE_2__.GraphvizEditor,{value,onChange:setValue})})},Regular={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_1__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Cmp,{})})},__namedExportsOrder=["Regular"];Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: args => <MockupJukiProvider>\n      <Cmp />\n    </MockupJukiProvider>\n}",...Regular.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))},"./src/components/organisms/GraphvizEditor/GraphvizEditor.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GraphvizEditor:()=>GraphvizEditor});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_resize_detector__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/react-resize-detector/build/useResizeDetector.js"),_constants__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/index.ts"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/index.ts"),_GraphvizViewer__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/organisms/GraphvizEditor/GraphvizViewer.tsx"),_useDotValue__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/organisms/GraphvizEditor/useDotValue.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["value","onSave"],Graphviz=(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)((()=>Promise.all([__webpack_require__.e(256),__webpack_require__.e(6485)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/organisms/GraphvizEditor/Graphviz.tsx")).then((module=>({default:module.Graphviz}))))),GraphvizEditorModal=_ref=>{let{value,onSave}=_ref,props=(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_8__.A)(_ref,_excluded);const[input,setInput]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value),{ref,width=0}=(0,react_resize_detector__WEBPACK_IMPORTED_MODULE_9__.A)(_constants__WEBPACK_IMPORTED_MODULE_1__.fV);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>setInput(value)),[value]);const{dot,error}=(0,_useDotValue__WEBPACK_IMPORTED_MODULE_6__.A)(input);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.aFV,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__.A)({},props),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-graph-editor-modal jk-pg-sm jk-col gap stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_molecules__WEBPACK_IMPORTED_MODULE_4__.vh,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"bc-eras jk-tag error",children:error}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.fs1,{value:input,onChange:setInput})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"jk-row",style:{overflow:"auto"},ref,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense,{fallback:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__.QA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"loading component"})}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Graphviz,{dot,className:"jk-graph",options:{width:width-20}})})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-row gap right",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{type:"light",onClick:props.onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"cancel"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{disabled:!!error,onClick:()=>{onSave(dot),props.onClose()},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"save"})})]})]})}))},GraphvizEditor=_ref2=>{let{value,onChange,className,width,height}=_ref2;const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)("jk-row nowrap center jk-graphviz-editor-container",className),style:{position:"relative"},children:[onChange&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{onClick:()=>setOpen(!0),style:{},icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.qUP,{}),className:"float-top-right pad-t"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_GraphvizViewer__WEBPACK_IMPORTED_MODULE_5__.GraphvizViewer,{value,width,height}),onChange&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(GraphvizEditorModal,{value,onSave:onChange,isOpen:open,onClose:()=>setOpen(!1)})]})};try{GraphvizEditor.displayName="GraphvizEditor",GraphvizEditor.__docgenInfo={description:"",displayName:"GraphvizEditor",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((newValue: string) => void)"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/GraphvizEditor/GraphvizEditor.tsx#GraphvizEditor"]={docgenInfo:GraphvizEditor.__docgenInfo,name:"GraphvizEditor",path:"src/components/organisms/GraphvizEditor/GraphvizEditor.tsx#GraphvizEditor"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/organisms/GraphvizEditor/GraphvizViewer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GraphvizViewer:()=>GraphvizViewer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/molecules/index.ts"),_useDotValue__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/organisms/GraphvizEditor/useDotValue.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Graphviz=(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)((()=>Promise.all([__webpack_require__.e(256),__webpack_require__.e(6485)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/organisms/GraphvizEditor/Graphviz.tsx")).then((module=>({default:module.Graphviz}))))),GraphvizViewer=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)((_ref=>{let{value,className,width,height}=_ref;const{dot,error}=(0,_useDotValue__WEBPACK_IMPORTED_MODULE_4__.A)(value);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-graphviz-viewer-container",className),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense,{fallback:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_3__.QA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"loading component"})}),children:error?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"bc-eras jk-tag error",children:error}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Graphviz,{dot,className:"jk-graphviz-viewer",options:{width,height}})})})}));try{GraphvizViewer.displayName="GraphvizViewer",GraphvizViewer.__docgenInfo={description:"",displayName:"GraphvizViewer",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/GraphvizEditor/GraphvizViewer.tsx#GraphvizViewer"]={docgenInfo:GraphvizViewer.__docgenInfo,name:"GraphvizViewer",path:"src/components/organisms/GraphvizEditor/GraphvizViewer.tsx#GraphvizViewer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/organisms/GraphvizEditor/useDotValue.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useDotValue});var graphlib_dot__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/graphlib-dot/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");const useDotValue=value=>{const[error,setError]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""),[dot,setDot]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("graph {}");return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{try{(0,graphlib_dot__WEBPACK_IMPORTED_MODULE_0__.read)(value),setDot(value),setError("")}catch(err){setError("Parse Error: ".concat(err.message))}}),[value]),{dot,error}}}}]);