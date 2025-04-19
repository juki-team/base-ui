"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9895],{"./src/components/atoms/hooks/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>useSetLoaderStatus});var react=__webpack_require__("./node_modules/react/index.js");const useSetLoaderStatus=(loader,setLoader,setLoaderStatusRef,onLoaderStatusChange)=>{const _refLoader=(0,react.useRef)(loader);return _refLoader.current=loader,(0,react.useEffect)((()=>{null==setLoaderStatusRef||setLoaderStatusRef((status=>{setLoader("function"==typeof status?status(_refLoader.current):status)}))}),[setLoaderStatusRef,setLoader]),(0,react.useEffect)((()=>{null==onLoaderStatusChange||onLoaderStatusChange(loader)}),[onLoaderStatusChange,loader]),_refLoader}},"./src/components/molecules/ButtonLoader/ButtonLoader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonLoader:()=>ButtonLoader});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.tsx"),_atoms_hooks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/hooks/index.ts"),_server__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/server/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ButtonLoader=props=>{const{className="",onClick,children,setLoaderStatusRef,disabled,icon,...restProps}=props,[loader,setLoader]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE);(0,_atoms_hooks__WEBPACK_IMPORTED_MODULE_4__.P)(loader,setLoader,setLoaderStatusRef);const refTimeOut=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>(loader!==_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS&&loader!==_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR||(refTimeOut.current=setTimeout((()=>setLoader(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE)),1200)),()=>{refTimeOut.current&&clearTimeout(refTimeOut.current)})),[loader]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$n,{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)(className,"jk-button-loader",{"with-loader-icon":loader!==_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE,success:loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS,error:loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR,loading:loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.LOADING,"only-icon":(void 0===children||!1===children)&&!!icon}),onClick:event=>null==onClick?void 0:onClick((status=>{setLoader("function"==typeof status?status(loader):status)}),loader,event),disabled:disabled||loader!==_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE,icon:children||loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE?icon:null,...restProps,children:[children,loader!==_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.NONE&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-row button-loader-icon",children:loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.IJR,{}):loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.Srz,{}):loader===_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.LOADING&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.Gcs,{})})]})};try{ButtonLoader.displayName="ButtonLoader",ButtonLoader.__docgenInfo={description:"",displayName:"ButtonLoader",props:{setLoaderStatusRef:{defaultValue:null,description:"",name:"setLoaderStatusRef",required:!1,type:{name:"((setLoader: SetLoaderStatusOnClickType) => void)"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"ButtonLoaderOnClickType<OnClickButtonEventType>"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"light"'},{value:'"text"'},{value:'"void"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},expand:{defaultValue:null,description:"",name:"expand",required:!1,type:{name:"boolean"}},submit:{defaultValue:null,description:"",name:"submit",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"tiny"'},{value:'"small"'},{value:'"regular"'},{value:'"large"'},{value:'"huge"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},responsiveMobile:{defaultValue:null,description:"",name:"responsiveMobile",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/ButtonLoader/ButtonLoader.tsx#ButtonLoader"]={docgenInfo:ButtonLoader.__docgenInfo,name:"ButtonLoader",path:"src/components/molecules/ButtonLoader/ButtonLoader.tsx#ButtonLoader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/FloatToolbar/ButtonAction.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonAction:()=>ButtonAction});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_resize_detector__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react-resize-detector/build/useResizeDetector.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/hooks/index.ts"),_ButtonLoader_ButtonLoader__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/ButtonLoader/ButtonLoader.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ButtonAction=_ref=>{let{icon,buttons,disabled}=_ref;const{viewPortSize}=(0,_hooks__WEBPACK_IMPORTED_MODULE_3__.p1)(),setLoaderRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),ref=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);(0,_hooks__WEBPACK_IMPORTED_MODULE_3__.c7)((()=>setOpen(!1)),ref);const{ref:refButtonsContent,width=0}=(0,react_resize_detector__WEBPACK_IMPORTED_MODULE_6__.A)(),lastWidthRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(width);return width&&(lastWidthRef.current=width),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)("button-action",{open}),onClick:"sm"===viewPortSize?()=>setOpen(!0):void 0,ref,style:{"--buttons-content-width":`${width||lastWidthRef.current}px`},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"button-trigger",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ButtonLoader_ButtonLoader__WEBPACK_IMPORTED_MODULE_4__.ButtonLoader,{icon,type:"primary",size:"small",setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,disabled})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"buttons-content",ref:refButtonsContent,children:buttons.map(((_ref2,index)=>{let{icon,onClick,label,disabled}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ButtonLoader_ButtonLoader__WEBPACK_IMPORTED_MODULE_4__.ButtonLoader,{icon,size:"small",disabled,onClick:async setLoader=>{const result=onClick();var _result$then,_setLoaderRef$current3;result instanceof Promise&&(null===(_result$then=result.then)||void 0===_result$then||_result$then.call(result,(()=>{var _setLoaderRef$current;setLoader(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS),null===(_setLoaderRef$current=setLoaderRef.current)||void 0===_setLoaderRef$current||_setLoaderRef$current.call(setLoaderRef,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS)})).catch((()=>{var _setLoaderRef$current2;setLoader(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR),null===(_setLoaderRef$current2=setLoaderRef.current)||void 0===_setLoaderRef$current2||_setLoaderRef$current2.call(setLoaderRef,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR)})),setLoader(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.LOADING),null===(_setLoaderRef$current3=setLoaderRef.current)||void 0===_setLoaderRef$current3||_setLoaderRef$current3.call(setLoaderRef,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.LOADING))},children:label},index)}))})]})};try{ButtonAction.displayName="ButtonAction",ButtonAction.__docgenInfo={description:"",displayName:"ButtonAction",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactNode"}},buttons:{defaultValue:null,description:"",name:"buttons",required:!0,type:{name:"ActionButtonsType"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/FloatToolbar/ButtonAction.tsx#ButtonAction"]={docgenInfo:ButtonAction.__docgenInfo,name:"ButtonAction",path:"src/components/molecules/FloatToolbar/ButtonAction.tsx#ButtonAction"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/FloatToolbar/FloatToolbar.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.tsx"),_mockup__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/mockup/index.ts"),_server__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/server/index.ts"),_FloatToolbar__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/FloatToolbar/FloatToolbar.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_2__]);_mockup__WEBPACK_IMPORTED_MODULE_2__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const __WEBPACK_DEFAULT_EXPORT__={component:_FloatToolbar__WEBPACK_IMPORTED_MODULE_4__.FloatToolbar},Regular={render:()=>{const actionButtons=[{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.s3U,{}),buttons:[{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.s3U,{}),label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.T,{children:"pdf"}),onClick:()=>null},{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.PHA,{}),label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.T,{children:"md"}),onClick:()=>null}]},{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.s3U,{}),buttons:[{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.s3U,{}),label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.T,{children:"pdf"}),onClick:()=>null},{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.PHA,{}),label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.T,{children:"md"}),onClick:()=>null}]}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_2__.Ag,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{background:"red",width:300,height:300,position:"relative"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_FloatToolbar__WEBPACK_IMPORTED_MODULE_4__.FloatToolbar,{actionButtons,placement:"top"})})})}},__namedExportsOrder=["Regular"];Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    const actionButtons = [{\n      icon: <DownloadIcon />,\n      buttons: [{\n        icon: <DownloadIcon />,\n        label: <T>pdf</T>,\n        onClick: () => null\n      }, {\n        icon: <OpenInNewIcon />,\n        label: <T>md</T>,\n        onClick: () => null\n      }]\n    }, {\n      icon: <DownloadIcon />,\n      buttons: [{\n        icon: <DownloadIcon />,\n        label: <T>pdf</T>,\n        onClick: () => null\n      }, {\n        icon: <OpenInNewIcon />,\n        label: <T>md</T>,\n        onClick: () => null\n      }]\n    }];\n    return <MockupJukiProvider>\n        <div style={{\n        background: 'red',\n        width: 300,\n        height: 300,\n        position: 'relative'\n      }}>\n          <FloatToolbar actionButtons={actionButtons} placement=\"top\" />\n        </div>\n      </MockupJukiProvider>;\n  }\n}",...Regular.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))},"./src/components/molecules/FloatToolbar/FloatToolbar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FloatToolbar:()=>FloatToolbar});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_resize_detector__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-resize-detector/build/useResizeDetector.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_ButtonAction__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/molecules/FloatToolbar/ButtonAction.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const FloatToolbar=_ref=>{let{actionButtons,placement="rightBottom"}=_ref;const{ref,width=0}=(0,react_resize_detector__WEBPACK_IMPORTED_MODULE_4__.A)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-float-toolbar-layout",placement),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:"jk-float-toolbar-container",ref,style:{"--container-width":`${width}px`},children:actionButtons.map(((props,index)=>(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ButtonAction__WEBPACK_IMPORTED_MODULE_2__.ButtonAction,{...props,key:index})))})})};try{FloatToolbar.displayName="FloatToolbar",FloatToolbar.__docgenInfo={description:"",displayName:"FloatToolbar",props:{actionButtons:{defaultValue:null,description:"",name:"actionButtons",required:!0,type:{name:"ButtonActionProps[]"}},placement:{defaultValue:{value:"rightBottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"leftBottom"'},{value:'"rightBottom"'},{value:'"rightTop"'},{value:'"leftTop"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/FloatToolbar/FloatToolbar.tsx#FloatToolbar"]={docgenInfo:FloatToolbar.__docgenInfo,name:"FloatToolbar",path:"src/components/molecules/FloatToolbar/FloatToolbar.tsx#FloatToolbar"})}catch(__react_docgen_typescript_loader_error){}}}]);