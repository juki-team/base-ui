"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9606],{"./src/components/templates/UserProfile/UserProfile.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserProfile:()=>UserProfile});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/helpers/index.ts")),_hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/hooks/useJukiUI.tsx"),_server__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/server/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserProfile(_ref){var _user$city,_user$country,_user$institution;let{user}=_ref;const{components:{Image}}=(0,_hooks_useJukiUI__WEBPACK_IMPORTED_MODULE_3__.p)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-col gap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"user-profile jk-row stretch center gap pn-re",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-col top jk-pg-md",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Image,{src:null==user?void 0:user.imageUrl,className:"jk-user-profile-img elevation-1 bc-we",alt:null==user?void 0:user.nickname,width:104,height:104,style:{width:104,height:104}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)("jk-col top stretch left jk-pg-md bc-we jk-br-ie"),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col gap stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"fw-br",children:null==user?void 0:user.nickname}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"cr-g3",children:[null==user?void 0:user.givenName," ",null==user?void 0:user.familyName]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"cr-g1",children:null==user?void 0:user.aboutMe})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-divider tiny"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col gap left stretch",children:[((null==user||null===(_user$city=user.city)||void 0===_user$city?void 0:_user$city.trim())||(null==user||null===(_user$country=user.country)||void 0===_user$country?void 0:_user$country.trim()))&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_4__.Sfg,{}),null==user?void 0:user.city,(null==user?void 0:user.city)&&","," ",null==user?void 0:user.country]}),(null==user||null===(_user$institution=user.institution)||void 0===_user$institution?void 0:_user$institution.trim())&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_4__.wPO,{}),null==user?void 0:user.institution]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_server__WEBPACK_IMPORTED_MODULE_4__.r4D,{}),null==user?void 0:user.email]}),Object.entries((null==user?void 0:user.handles)||{}).filter((_ref2=>{let[judge,nickname]=_ref2;return!!nickname&&!!_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.aQp[judge]})).map((_ref3=>{var _JUDGE,_JUDGE2,_JUDGE3;let[judge,nickname]=_ref3;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-col left gap block stretch",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Image,{src:null===(_JUDGE=_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.aQp[judge])||void 0===_JUDGE?void 0:_JUDGE.logo,alt:judge,height:64/(null===(_JUDGE2=_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.aQp[judge])||void 0===_JUDGE2?void 0:_JUDGE2.logoSize[0])*(null===(_JUDGE3=_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.aQp[judge])||void 0===_JUDGE3?void 0:_JUDGE3.logoSize[1]),width:64}),nickname]})})},judge)}))]})]})]})})}try{UserProfile.displayName="UserProfile",UserProfile.__docgenInfo={description:"",displayName:"UserProfile",props:{user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"UserProfileResponseDTO"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/UserProfile/UserProfile.tsx#UserProfile"]={docgenInfo:UserProfile.__docgenInfo,name:"UserProfile",path:"src/components/templates/UserProfile/UserProfile.tsx#UserProfile"})}catch(__react_docgen_typescript_loader_error){}}}]);