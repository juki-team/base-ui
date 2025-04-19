"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8596],{"./src/components/templates/UserPreviewModal/UserPreviewContentModal/UserPreviewContentModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>UserPreviewContentModal});__webpack_require__("./node_modules/react/index.js");var _hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useJukiUI.tsx"),_settings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/settings/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.tsx"),_molecules__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/index.tsx"),_server__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/server/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserPreviewContentModal=_ref=>{let{isOpen,nickname,companyKey,onClose,userHref}=_ref;const{components:{Image}}=(0,_hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_1__.p)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.aF,{isOpen,onClose,className:"modal-user-preview",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__.pW,{url:_settings__WEBPACK_IMPORTED_MODULE_2__.u.API_V1.user.getSummary({params:{nickname,companyKey}}).url,onError:onClose,children:_ref2=>{var _data$content,_data$content2,_data$content3,_data$content4,_data$content5,_data$content6,_data$content6$city,_data$content7,_data$content7$countr,_data$content8,_data$content9,_data$content10,_data$content11,_data$content11$insti,_data$content12,_data$content13;let{data}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-pg-md jk-col stretch gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row center gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Image,{src:null==data||null===(_data$content=data.content)||void 0===_data$content?void 0:_data$content.imageUrl,className:"jk-user-profile-img elevation-1",alt:nickname,height:100,width:100}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3",{className:"fl-tt-il",children:null==data||null===(_data$content2=data.content)||void 0===_data$content2?void 0:_data$content2.nickname}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$r,{text:null==data||null===(_data$content3=data.content)||void 0===_data$content3?void 0:_data$content3.nickname,size:"small"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"cr-g3",children:[null==data||null===(_data$content4=data.content)||void 0===_data$content4?void 0:_data$content4.givenName," ",null==data||null===(_data$content5=data.content)||void 0===_data$content5?void 0:_data$content5.familyName]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col gap stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-divider tiny"}),((null==data||null===(_data$content6=data.content)||void 0===_data$content6||null===(_data$content6$city=_data$content6.city)||void 0===_data$content6$city?void 0:_data$content6$city.trim())||(null==data||null===(_data$content7=data.content)||void 0===_data$content7||null===(_data$content7$countr=_data$content7.country)||void 0===_data$content7$countr?void 0:_data$content7$countr.trim()))&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.Sfg,{}),null==data||null===(_data$content8=data.content)||void 0===_data$content8?void 0:_data$content8.city,(null==data||null===(_data$content9=data.content)||void 0===_data$content9?void 0:_data$content9.city)&&","," ",null==data||null===(_data$content10=data.content)||void 0===_data$content10?void 0:_data$content10.country]}),(null==data||null===(_data$content11=data.content)||void 0===_data$content11||null===(_data$content11$insti=_data$content11.institution)||void 0===_data$content11$insti?void 0:_data$content11$insti.trim())&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap wb-ba",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.wPO,{}),null==data||null===(_data$content12=data.content)||void 0===_data$content12?void 0:_data$content12.institution]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row left gap nowrap wb-ba",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.r4D,{}),null==data||null===(_data$content13=data.content)||void 0===_data$content13?void 0:_data$content13.email]})]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row-col gap block stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__.mT,{size:"small",type:"light",onClick:onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"close"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a",{href:userHref,target:"_blank",rel:"noreferrer",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$n,{size:"small",expand:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row nowrap gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"ws-np",children:"see profile"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_server__WEBPACK_IMPORTED_MODULE_5__.PHA,{})]})})})]})]})}})})};try{UserPreviewContentModal.displayName="UserPreviewContentModal",UserPreviewContentModal.__docgenInfo={description:"",displayName:"UserPreviewContentModal",props:{nickname:{defaultValue:null,description:"",name:"nickname",required:!0,type:{name:"string"}},companyKey:{defaultValue:null,description:"",name:"companyKey",required:!1,type:{name:"string"}},userHref:{defaultValue:null,description:"",name:"userHref",required:!0,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/UserPreviewModal/UserPreviewContentModal/UserPreviewContentModal.tsx#UserPreviewContentModal"]={docgenInfo:UserPreviewContentModal.__docgenInfo,name:"UserPreviewContentModal",path:"src/components/templates/UserPreviewModal/UserPreviewContentModal/UserPreviewContentModal.tsx#UserPreviewContentModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/templates/UserPreviewModal/UserPreviewModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserPreviewModal:()=>UserPreviewModal});__webpack_require__("./node_modules/react/index.js");var _hooks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/index.ts"),_settings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/settings/index.ts"),_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/types/index.ts"),_UserPreviewContentModal_UserPreviewContentModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/templates/UserPreviewModal/UserPreviewContentModal/UserPreviewContentModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserPreviewModal=()=>{const searchParams=(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.Ic)((state=>state.searchParams)),deleteSearchParams=(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.Ic)((state=>state.deleteSearchParams)),userPreviewQuery=searchParams.getAll(_types__WEBPACK_IMPORTED_MODULE_3__.QueryParamKey.USER_PREVIEW),[userPreviewNickname,userPreviewCompanyKey]=Array.isArray(userPreviewQuery)?userPreviewQuery:[userPreviewQuery];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_UserPreviewContentModal_UserPreviewContentModal__WEBPACK_IMPORTED_MODULE_4__.S,{isOpen:!!searchParams.get(_types__WEBPACK_IMPORTED_MODULE_3__.QueryParamKey.USER_PREVIEW),nickname:userPreviewNickname,companyKey:userPreviewCompanyKey,onClose:()=>deleteSearchParams({name:_types__WEBPACK_IMPORTED_MODULE_3__.QueryParamKey.USER_PREVIEW}),userHref:_settings__WEBPACK_IMPORTED_MODULE_2__.L.JUDGE().profiles.view({nickname:userPreviewNickname})})}}}]);