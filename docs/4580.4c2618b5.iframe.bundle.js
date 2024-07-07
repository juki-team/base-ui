"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[4580],{"./src/components/templates/ChangePasswordModal/ChangePasswordModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ChangePasswordModal:()=>ChangePasswordModal});var _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_hook_form__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),yup__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/yup/index.esm.js"),_helpers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/helpers/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/hooks/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/molecules/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react/jsx-runtime.js");const profileSettingsChangePasswordSchema=yup__WEBPACK_IMPORTED_MODULE_2__.Ry().shape({oldPassword:yup__WEBPACK_IMPORTED_MODULE_2__.Z_().required("required in order to update the password"),newPassword:yup__WEBPACK_IMPORTED_MODULE_2__.Z_().required("cannot be empty").min(8,"password must be at least 8 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()-_]{8,}$/,"must have at least one uppercase, one lowercase letter and one number"),newPasswordConfirmation:yup__WEBPACK_IMPORTED_MODULE_2__.Z_().required("cannot be empty").oneOf([yup__WEBPACK_IMPORTED_MODULE_2__.iH("newPassword"),""],"both passwords must match")}),ChangePasswordModal=_ref=>{var _errors$oldPassword,_errors$oldPassword2,_errors$oldPassword3,_errors$newPassword,_errors$newPassword2,_errors$newPassword3,_errors$newPasswordCo,_errors$newPasswordCo2,_errors$newPasswordCo3;let{isOpen,onClose}=_ref;const{register,handleSubmit,formState:{errors,isValid,touchedFields}}=(0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.cI)({resolver:(0,_hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_9__.X)(profileSettingsChangePasswordSchema),mode:"all",reValidateMode:"onBlur"}),{updatePassword}=(0,_hooks__WEBPACK_IMPORTED_MODULE_4__.MQ)(),{viewPortSize}=(0,_hooks__WEBPACK_IMPORTED_MODULE_4__.Tv)(),setLoaderRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.u_l,{isOpen,className:"wh-ao",onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-pg-md jk-col gap stretch change-password-modal",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{className:"jk-row",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2",{children:"update password"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("form",{onSubmit:handleSubmit((data=>updatePassword({body:{newPassword:data.newPassword,oldPassword:data.oldPassword},setLoader:setLoaderRef.current,onSuccess:()=>onClose((()=>()=>_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS,{})}))),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.CMk,{extend:!0,labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{className:"tt-se",children:"password"}),register:register("oldPassword"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.AK)({error:!(null==errors||null===(_errors$oldPassword=errors.oldPassword)||void 0===_errors$oldPassword||!_errors$oldPassword.message),success:!(!touchedFields.oldPassword||null!=errors&&null!==(_errors$oldPassword2=errors.oldPassword)&&void 0!==_errors$oldPassword2&&_errors$oldPassword2.message)}),required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{children:(null===(_errors$oldPassword3=errors.oldPassword)||void 0===_errors$oldPassword3?void 0:_errors$oldPassword3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.CMk,{extend:!0,labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{className:"tt-se",children:"new password"}),register:register("newPassword"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.AK)({error:!(null==errors||null===(_errors$newPassword=errors.newPassword)||void 0===_errors$newPassword||!_errors$newPassword.message),success:!(!touchedFields.newPassword||null!=errors&&null!==(_errors$newPassword2=errors.newPassword)&&void 0!==_errors$newPassword2&&_errors$newPassword2.message)}),required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{children:(null===(_errors$newPassword3=errors.newPassword)||void 0===_errors$newPassword3?void 0:_errors$newPassword3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.CMk,{extend:!0,labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{className:"tt-se",children:"confirm new password"}),register:register("newPasswordConfirmation"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.AK)({error:!(null==errors||null===(_errors$newPasswordCo=errors.newPasswordConfirmation)||void 0===_errors$newPasswordCo||!_errors$newPasswordCo.message),success:!(!touchedFields.newPasswordConfirmation||null!=errors&&null!==(_errors$newPasswordCo2=errors.newPasswordConfirmation)&&void 0!==_errors$newPasswordCo2&&_errors$newPasswordCo2.message)}),required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{children:(null===(_errors$newPasswordCo3=errors.newPasswordConfirmation)||void 0===_errors$newPasswordCo3?void 0:_errors$newPasswordCo3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.AK)("gap block",{"jk-row":"sm"!==viewPortSize,"jk-col":"sm"===viewPortSize}),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_6__.l_,{type:"light",onClick:onClose,extend:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{children:"cancel"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_6__.l_,{type:"primary",setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,disabled:!isValid,submit:!0,extend:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_5__.T,{className:"ws-np",children:"update"})})]})]})]})})};try{ChangePasswordModal.displayName="ChangePasswordModal",ChangePasswordModal.__docgenInfo={description:"",displayName:"ChangePasswordModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ChangePasswordModal/ChangePasswordModal.tsx#ChangePasswordModal"]={docgenInfo:ChangePasswordModal.__docgenInfo,name:"ChangePasswordModal",path:"src/components/templates/ChangePasswordModal/ChangePasswordModal.tsx#ChangePasswordModal"})}catch(__react_docgen_typescript_loader_error){}}}]);