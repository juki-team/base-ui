"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6387],{"./src/components/organisms/UserChip/UserChip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{UserChip:()=>UserChip});__webpack_require__("./node_modules/react/index.js");var _helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/index.ts"),_UserNicknameLink__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/organisms/UserChip/UserNicknameLink.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserChip=props=>{const{imageUrl,email,familyName,nickname,givenName,className,companyKey,withoutLink}=props,{components:{Image}}=(0,_hooks__WEBPACK_IMPORTED_MODULE_2__.p1)(),onlyNickname=!givenName&&!familyName&&!email;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-row nowrap center",className),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Image,{src:imageUrl,className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-user-profile-img ",{huge:!onlyNickname}),alt:nickname,height:onlyNickname?24:50,width:onlyNickname?24:50})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col flex-1",style:{lineHeight:1.2},children:[withoutLink?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-bd ",children:nickname}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_UserNicknameLink__WEBPACK_IMPORTED_MODULE_3__.UserNicknameLink,{nickname,companyKey,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"link fw-bd ",children:nickname})}),(!!givenName||!!familyName)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"fw-lr ta-cr",children:[givenName," ",familyName]}),!!email&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-lr",children:email})]})]})};try{UserChip.displayName="UserChip",UserChip.__docgenInfo={description:"",displayName:"UserChip",props:{imageUrl:{defaultValue:null,description:"",name:"imageUrl",required:!0,type:{name:"string"}},nickname:{defaultValue:null,description:"",name:"nickname",required:!0,type:{name:"string"}},givenName:{defaultValue:null,description:"",name:"givenName",required:!1,type:{name:"string"}},familyName:{defaultValue:null,description:"",name:"familyName",required:!1,type:{name:"string"}},email:{defaultValue:null,description:"",name:"email",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},companyKey:{defaultValue:null,description:"",name:"companyKey",required:!1,type:{name:"string"}},withoutLink:{defaultValue:null,description:"",name:"withoutLink",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/UserChip/UserChip.tsx#UserChip"]={docgenInfo:UserChip.__docgenInfo,name:"UserChip",path:"src/components/organisms/UserChip/UserChip.tsx#UserChip"})}catch(__react_docgen_typescript_loader_error){}}}]);