"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2060],{"./src/components/templates/UserProfileSettings/UserProfileSettings.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserProfileSettings:()=>UserProfileSettings});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/helpers/index.ts")),_hooks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/hooks/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UserProfileSettings(_ref){let{user,onClickUpdatePassword}=_ref;const{loading,setSettings,[_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.LANGUAGE]:preferredLanguage,[_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.THEME]:preferredTheme,[_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.DATA_VIEW_MODE]:preferredDataViewMode,[_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.MENU_VIEW_MODE]:preferredMenuViewMode,[_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.NEWSLETTER_SUBSCRIPTION]:newsletterSubscription}=(0,_hooks__WEBPACK_IMPORTED_MODULE_3__.wg)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row gap top stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col top extend",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"preferences"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col stretch gap bc-we jk-border-radius-inline jk-pad-md br-g6 pn-re",style:{width:300},children:[loading&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.fhB,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col gap left stretch",children:[[{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.LANGUAGE,title:"language",value:preferredLanguage,valueFirst:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.SQ.EN,labelFirst:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row",style:{width:24,height:24},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.XIP,{})})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"english"})]}),valueSecond:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.SQ.ES,labelSecond:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row",style:{width:24,height:24},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.xWZ,{})})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"español"})]})},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.THEME,title:"theme",value:preferredTheme,valueFirst:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.Q2.LIGHT,labelFirst:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.xpC,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"light"})]}),valueSecond:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.Q2.DARK,labelSecond:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.ce2,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"dark"})]})},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.DATA_VIEW_MODE,title:"data view",value:preferredDataViewMode,valueFirst:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__._J.ROWS,labelFirst:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.VjU,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"rows"})]}),valueSecond:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__._J.CARDS,labelSecond:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.pC2,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"cards"})]})},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.MENU_VIEW_MODE,title:"menu view",value:preferredMenuViewMode,valueFirst:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.zk.VERTICAL,labelFirst:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.EpB,{rotate:180}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"vertical"})]}),valueSecond:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.zk.HORIZONTAL,labelSecond:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.EpB,{rotate:-90}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"horizontal"})]})}].map((_ref2=>{let{title,key,value,valueFirst,labelFirst,valueSecond,labelSecond}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col stretch left gap",style:{width:"100%"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left extend",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"tt-se tx-l fw-bd ta-ed ws-np",children:title}),": "]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row stretch gap space-between block extend",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap left nowrap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.rWV,{disabled:loading,checked:value===valueFirst,onChange:()=>setSettings([{key,value:valueFirst}]),label:labelFirst})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap left nowrap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.rWV,{disabled:loading,checked:value===valueSecond,onChange:()=>setSettings([{key,value:valueSecond}]),label:labelSecond})})]})]},key)})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-col left gap nowrap jk-pad-sm",style:{width:"100%"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.zxk,{size:"small",type:"light",onClick:()=>setSettings([{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.LANGUAGE,value:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.SQ.EN},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.THEME,value:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.Q2.LIGHT},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.DATA_VIEW_MODE,value:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__._J.ROWS},{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.MENU_VIEW_MODE,value:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.zk.VERTICAL}]),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"restore default preferences"})})})]})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col top extend",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"actions"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col stretch gap bc-we jk-border-radius-inline jk-pad-md br-g6",style:{width:300},children:[(null==user?void 0:user.canUpdatePassword)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.zxk,{size:"small",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.mBM,{}),onClick:onClickUpdatePassword,extend:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np",children:"update password"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col left gap nowrap",style:{width:"100%"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left extend",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"tt-se tx-l fw-bd ta-ed ws-np",children:"newsletter subscription"}),": "]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row stretch gap space-between block extend",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap left nowrap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.DsQ,{disabled:loading,checked:newsletterSubscription,onChange:newValue=>setSettings([{key:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.w4.NEWSLETTER_SUBSCRIPTION,value:newValue}]),leftLabel:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.AK)("jk-row nowrap",{"fw-bd":!newsletterSubscription}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"no subscribed"})}),rightLabel:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.AK)("jk-row nowrap",{"fw-bd":newsletterSubscription}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"ws-np tt-se",children:"subscribed"})})})})})]})]})]})]})}try{UserProfileSettings.displayName="UserProfileSettings",UserProfileSettings.__docgenInfo={description:"",displayName:"UserProfileSettings",props:{user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"UserProfileResponseDTO"}},onClickUpdatePassword:{defaultValue:null,description:"",name:"onClickUpdatePassword",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/UserProfileSettings/UserProfileSettings.tsx#UserProfileSettings"]={docgenInfo:UserProfileSettings.__docgenInfo,name:"UserProfileSettings",path:"src/components/templates/UserProfileSettings/UserProfileSettings.tsx#UserProfileSettings"})}catch(__react_docgen_typescript_loader_error){}}}]);