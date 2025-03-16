"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9039],{"./src/components/organisms/GraphvizEditor/GraphvizViewer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{GraphvizViewer:()=>GraphvizViewer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/molecules/index.ts"),_useDotValue__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/organisms/GraphvizEditor/useDotValue.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Graphviz=(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)((()=>Promise.all([__webpack_require__.e(256),__webpack_require__.e(6485)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/organisms/GraphvizEditor/Graphviz.tsx")).then((module=>({default:module.Graphviz}))))),GraphvizViewer=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)((_ref=>{let{value,className,width,height}=_ref;const{dot,error}=(0,_useDotValue__WEBPACK_IMPORTED_MODULE_4__.A)(value);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-graphviz-viewer-container",className),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense,{fallback:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_3__.QA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"loading component"})}),children:error?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"bc-eras jk-tag error",children:error}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Graphviz,{dot,className:"jk-graphviz-viewer",options:{width,height}})})})}));try{GraphvizViewer.displayName="GraphvizViewer",GraphvizViewer.__docgenInfo={description:"",displayName:"GraphvizViewer",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/GraphvizEditor/GraphvizViewer.tsx#GraphvizViewer"]={docgenInfo:GraphvizViewer.__docgenInfo,name:"GraphvizViewer",path:"src/components/organisms/GraphvizEditor/GraphvizViewer.tsx#GraphvizViewer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/organisms/GraphvizEditor/useDotValue.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useDotValue});var graphlib_dot__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/graphlib-dot/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");const useDotValue=value=>{const[error,setError]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""),[dot,setDot]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("graph {}");return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{try{(0,graphlib_dot__WEBPACK_IMPORTED_MODULE_0__.read)(value),setDot(value),setError("")}catch(err){setError("Parse Error: ".concat(err.message))}}),[value]),{dot,error}}}}]);