"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3938,7413],{"./src/components/atoms/CopyToClipboard/CopyToClipboard.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _mockup__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/mockup/index.ts"),_CopyToClipboard__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/CopyToClipboard/CopyToClipboard.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_1__]);_mockup__WEBPACK_IMPORTED_MODULE_1__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const __WEBPACK_DEFAULT_EXPORT__={component:_CopyToClipboard__WEBPACK_IMPORTED_MODULE_2__.CopyToClipboard},text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacus turpis, facilisis vitae magna at, feugiat tincidunt eros. Nam tempus ex ut odio vulputate aliquet. Vestibulum id ligula finibus, vehicula tellus non, auctor magna. Mauris convallis purus et felis euismod consectetur. Nunc nec porttitor felis, non dapibus sem. In imperdiet, neque scelerisque aliquam mollis, purus massa efficitur nulla, eu efficitur lorem eros in leo. Nam eros ligula, tincidunt ut finibus sed, semper eget lacus. Sed nunc ante, suscipit eget erat ac, ullamcorper efficitur urna. Vivamus neque ante, vehicula eget sollicitudin facilisis, aliquam sed dolor. Vivamus imperdiet vel libero vel suscipit. Donec ut lectus ac purus placerat vehicula. Ut tincidunt laoreet justo id rutrum. Proin tristique nisi non elementum efficitur. Phasellus sit amet nisl sit amet ex vulputate ultricies. Ut nec nulla vitae lectus sodales condimentum nec id metus.",Regular={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_1__.Ag,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_CopyToClipboard__WEBPACK_IMPORTED_MODULE_2__.CopyToClipboard,{...args,text})})};Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: args => <MockupJukiProvider>\n      <CopyToClipboard {...args} text={text} />\n    </MockupJukiProvider>\n}",...Regular.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))},"./src/components/atoms/CopyToClipboard/CopyToClipboard.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CopyToClipboard:()=>CopyToClipboard});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_server__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/server/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CopyToClipboard=_ref=>{let{text,size="regular",tooltip}=_ref;const[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{"data-tooltip-id":"jk-tooltip","data-tooltip-content":isOpen?"copied":null!=tooltip?tooltip:"copy",className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-button-light-only-icon jk-row bc-hl link jk-br-ie",size),style:{width:"min-content",height:"min-content",padding:"calc(var(--gap) / 3)"},onClick:async event=>{await(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.C)(text),setIsOpen(!0),setTimeout((()=>setIsOpen(!1)),800)},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_server__WEBPACK_IMPORTED_MODULE_2__.c8I,{size})})};try{CopyToClipboard.displayName="CopyToClipboard",CopyToClipboard.__docgenInfo={description:"",displayName:"CopyToClipboard",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},size:{defaultValue:{value:"regular"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"tiny"'},{value:'"small"'},{value:'"regular"'},{value:'"large"'},{value:'"huge"'},{value:'"very-huge"'}]}},tooltip:{defaultValue:null,description:"",name:"tooltip",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/CopyToClipboard/CopyToClipboard.tsx#CopyToClipboard"]={docgenInfo:CopyToClipboard.__docgenInfo,name:"CopyToClipboard",path:"src/components/atoms/CopyToClipboard/CopyToClipboard.tsx#CopyToClipboard"})}catch(__react_docgen_typescript_loader_error){}}}]);