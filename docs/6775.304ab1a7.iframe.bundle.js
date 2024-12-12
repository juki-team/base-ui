"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6775],{"./src/components/templates/MainMenu/LoginModalTemplate/LoginModalTemplate.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoginModalTemplate:()=>LoginModalTemplate});var _hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_hook_form__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),yup__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/yup/index.esm.js"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/index.ts"),_ForgotPassword__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/MainMenu/LoginModalTemplate/ForgotPassword/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const loginSchema=yup__WEBPACK_IMPORTED_MODULE_1__.Ik().shape({nickname:yup__WEBPACK_IMPORTED_MODULE_1__.Yj().required("cannot be empty"),password:yup__WEBPACK_IMPORTED_MODULE_1__.Yj().required("cannot be empty")}),loginMultiCompaniesSchema=yup__WEBPACK_IMPORTED_MODULE_1__.Ik().shape({nickname:yup__WEBPACK_IMPORTED_MODULE_1__.Yj().required("cannot be empty"),password:yup__WEBPACK_IMPORTED_MODULE_1__.Yj().required("cannot be empty"),companyKey:yup__WEBPACK_IMPORTED_MODULE_1__.Yj().required("cannot be empty")}),LoginModalTemplate=props=>{var _errors$companyKey,_errors$companyKey2,_errors$companyKey3,_errors$nickname,_errors$nickname2,_errors$nickname3,_errors$password,_errors$password2,_errors$password3;const{isOpen,onClose,onSignUpButton,onSubmit,loginWithGoogle,reactAppGoogleClientId,highlightForgotPassword,multiCompanies}=props,{handleSubmit,formState:{isValid,errors,touchedFields},register,reset}=(0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.mN)({resolver:(0,_hookform_resolvers_yup__WEBPACK_IMPORTED_MODULE_8__.t)(multiCompanies?loginMultiCompaniesSchema:loginSchema),mode:"all",reValidateMode:"onBlur"});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{reset()}),[isOpen]);const[openForgotPasswordModal,setOpenForgotPasswordModal]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),setLoaderRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ForgotPassword__WEBPACK_IMPORTED_MODULE_5__.Q,{isOpen:openForgotPasswordModal,onClose:()=>setOpenForgotPasswordModal(!1)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__._m,{isOpen:isOpen&&!openForgotPasswordModal,onClose,className:"modal-login",title:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se cr-g1",children:"login"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p",{className:"tx-h",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"Nice see you again!"})})]}),graphic:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.VU1,{}),closeWhenKeyEscape:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[loginWithGoogle&&reactAppGoogleClientId&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-divider",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"or"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("form",{onSubmit:handleSubmit((data=>onSubmit(data,setLoaderRef.current))),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col stretch",children:[multiCompanies&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.pde,{labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"company key"}),register:register("companyKey"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)({error:!(null==errors||null===(_errors$companyKey=errors.companyKey)||void 0===_errors$companyKey||!_errors$companyKey.message),success:!(!touchedFields.companyKey||null!=errors&&null!==(_errors$companyKey2=errors.companyKey)&&void 0!==_errors$companyKey2&&_errors$companyKey2.message)}),extend:!0,required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:!isValid&&(null==errors||null===(_errors$companyKey3=errors.companyKey)||void 0===_errors$companyKey3?void 0:_errors$companyKey3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.pde,{labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"nickname"}),register:register("nickname"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)({error:!(null==errors||null===(_errors$nickname=errors.nickname)||void 0===_errors$nickname||!_errors$nickname.message),success:!(!touchedFields.nickname||null!=errors&&null!==(_errors$nickname2=errors.nickname)&&void 0!==_errors$nickname2&&_errors$nickname2.message)}),extend:!0,required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:!isValid&&(null==errors||null===(_errors$nickname3=errors.nickname)||void 0===_errors$nickname3?void 0:_errors$nickname3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-form-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.cAv,{labelPlacement:"top",label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"password"}),register:register("password"),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)({error:!(null==errors||null===(_errors$password=errors.password)||void 0===_errors$password||!_errors$password.message),success:!(!touchedFields.password||null!=errors&&null!==(_errors$password2=errors.password)&&void 0!==_errors$password2&&_errors$password2.message)}),extend:!0,required:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:(null==errors||null===(_errors$password3=errors.password)||void 0===_errors$password3?void 0:_errors$password3.message)||""})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col gap stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-row left",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"link",onClick:()=>setOpenForgotPasswordModal(!0),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.xW)("forgot-password-label tt-se",{"fw-br":!!highlightForgotPassword}),children:"Forgot password?"})})}),!multiCompanies&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p",{className:"label",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{className:"tt-se",children:"not a member?"}),", ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{className:"link",onClick:onSignUpButton,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"sign up now"})})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-row-col gap block",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__.mT,{type:"light",onClick:onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"cancel"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_4__.mT,{type:"primary",disabled:!isValid,setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,submit:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"login"})})]})]})]})})]})})]})};try{LoginModalTemplate.displayName="LoginModalTemplate",LoginModalTemplate.__docgenInfo={description:"",displayName:"LoginModalTemplate",props:{onSignUpButton:{defaultValue:null,description:"",name:"onSignUpButton",required:!0,type:{name:"() => void"}},onForgotPassword:{defaultValue:null,description:"",name:"onForgotPassword",required:!1,type:{name:"((email: string, setStatus: SetLoaderStatusOnClickType) => void)"}},onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"(data: LoginFormType, setStatus: SetLoaderStatusOnClickType) => void"}},loginWithGoogle:{defaultValue:null,description:"",name:"loginWithGoogle",required:!1,type:{name:"((setStatus?: SetLoaderStatusOnClickType) => (response: any) => void)"}},reactAppGoogleClientId:{defaultValue:null,description:"",name:"reactAppGoogleClientId",required:!1,type:{name:"string"}},highlightForgotPassword:{defaultValue:null,description:"",name:"highlightForgotPassword",required:!1,type:{name:"boolean"}},multiCompanies:{defaultValue:null,description:"",name:"multiCompanies",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/LoginModalTemplate/LoginModalTemplate.tsx#LoginModalTemplate"]={docgenInfo:LoginModalTemplate.__docgenInfo,name:"LoginModalTemplate",path:"src/components/templates/MainMenu/LoginModalTemplate/LoginModalTemplate.tsx#LoginModalTemplate"})}catch(__react_docgen_typescript_loader_error){}}}]);