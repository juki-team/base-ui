"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3531],{"./src/components/templates/UserPreviewModal/UserPreviewModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserPreviewModal:()=>UserPreviewModal,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_hooks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/index.ts"),_UserPreviewContentModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/templates/UserPreviewModal/UserPreviewContentModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_UserPreviewContentModal__WEBPACK_IMPORTED_MODULE_4__.S},UserPreviewModal=()=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.pD)(),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_3__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-pg-lg",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_UserPreviewContentModal__WEBPACK_IMPORTED_MODULE_4__.S,{isOpen:open,userHref:"#",onClose:()=>setOpen(!1),nickname:"OscarGauss",companyKey:"juki-app"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_2__.$nd,{onClick:()=>setOpen(!0),children:"open"})]})})},__namedExportsOrder=["UserPreviewModal"];UserPreviewModal.parameters={...UserPreviewModal.parameters,docs:{...UserPreviewModal.parameters?.docs,source:{originalSource:'() => {\n  const [open, setOpen] = useState(false);\n  useRunnerServicesWakeUp();\n  return <MockupJukiProvider>\n      <div className="jk-pg-lg">\n        <UserPreviewModalCmp isOpen={open} userHref={\'#\'} onClose={() => setOpen(false)} nickname="OscarGauss" companyKey="juki-app" />\n        <Button onClick={() => setOpen(true)}>open</Button>\n      </div>\n    </MockupJukiProvider>;\n}',...UserPreviewModal.parameters?.docs?.source}}}},"./src/components/templates/UserPreviewModal/UserPreviewContentModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>UserPreviewContentModal});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/hooks/useJukiUI.tsx")),_settings__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/settings/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/molecules/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserPreviewContentModal=_ref=>{let{isOpen,nickname,companyKey,onClose,userHref}=_ref;const{components:{Image}}=(0,_hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_2__.p)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.aFV,{isOpen,onClose,className:"modal-user-preview wh-aoa",closeWhenClickOutside:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_5__.pW,{url:_settings__WEBPACK_IMPORTED_MODULE_3__.ug.API_V1.user.getSummary({params:{nickname,companyKey}}).url,onError:error=>onClose((()=>()=>_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR),_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.ERROR,{fetcherLayerErrorEvent:error}),children:_ref2=>{var _data$content,_data$content2,_data$content3,_data$content4,_data$content5,_data$content6,_data$content6$city,_data$content7,_data$content7$countr,_data$content8,_data$content9,_data$content10,_data$content11,_data$content11$insti,_data$content12,_data$content13;let{data}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-pg-md jk-col stretch gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row center gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Image,{src:null==data||null===(_data$content=data.content)||void 0===_data$content?void 0:_data$content.imageUrl,className:"jk-user-profile-img elevation-1",alt:nickname,height:100,width:100}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3",{className:"fl-tt-il",children:null==data||null===(_data$content2=data.content)||void 0===_data$content2?void 0:_data$content2.nickname}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.$rC,{text:null==data||null===(_data$content3=data.content)||void 0===_data$content3?void 0:_data$content3.nickname,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-button light only-icon small",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.c8I,{})})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"cr-g3",children:[null==data||null===(_data$content4=data.content)||void 0===_data$content4?void 0:_data$content4.givenName," ",null==data||null===(_data$content5=data.content)||void 0===_data$content5?void 0:_data$content5.familyName]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col gap stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-divider tiny"}),((null==data||null===(_data$content6=data.content)||void 0===_data$content6||null===(_data$content6$city=_data$content6.city)||void 0===_data$content6$city?void 0:_data$content6$city.trim())||(null==data||null===(_data$content7=data.content)||void 0===_data$content7||null===(_data$content7$countr=_data$content7.country)||void 0===_data$content7$countr?void 0:_data$content7$countr.trim()))&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.Sfg,{}),null==data||null===(_data$content8=data.content)||void 0===_data$content8?void 0:_data$content8.city,(null==data||null===(_data$content9=data.content)||void 0===_data$content9?void 0:_data$content9.city)&&","," ",null==data||null===(_data$content10=data.content)||void 0===_data$content10?void 0:_data$content10.country]}),(null==data||null===(_data$content11=data.content)||void 0===_data$content11||null===(_data$content11$insti=_data$content11.institution)||void 0===_data$content11$insti?void 0:_data$content11$insti.trim())&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap wb-ba",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.wPO,{}),null==data||null===(_data$content12=data.content)||void 0===_data$content12?void 0:_data$content12.institution]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap wb-ba",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.r4D,{}),null==data||null===(_data$content13=data.content)||void 0===_data$content13?void 0:_data$content13.email]})]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row-col gap block stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_5__.mT,{size:"small",type:"light",onClick:onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"close"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a",{href:userHref,target:"_blank",rel:"noreferrer",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.$nd,{size:"small",extend:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row nowrap gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np",children:"see profile"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.PHA,{})]})})})]})]})}})})};try{UserPreviewContentModal.displayName="UserPreviewContentModal",UserPreviewContentModal.__docgenInfo={description:"",displayName:"UserPreviewContentModal",props:{nickname:{defaultValue:null,description:"",name:"nickname",required:!0,type:{name:"string"}},companyKey:{defaultValue:null,description:"",name:"companyKey",required:!1,type:{name:"string"}},userHref:{defaultValue:null,description:"",name:"userHref",required:!0,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/UserPreviewModal/UserPreviewContentModal.tsx#UserPreviewContentModal"]={docgenInfo:UserPreviewContentModal.__docgenInfo,name:"UserPreviewContentModal",path:"src/components/templates/UserPreviewModal/UserPreviewContentModal.tsx#UserPreviewContentModal"})}catch(__react_docgen_typescript_loader_error){}}}]);