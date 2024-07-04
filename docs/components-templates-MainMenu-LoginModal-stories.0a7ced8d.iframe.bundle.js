"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3683],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./src/components/templates/MainMenu/LoginModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoginWithGoogleComponent:()=>LoginWithGoogleComponent,LoginWithoutGoogle:()=>LoginWithoutGoogle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/index.ts"),_LoginModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/templates/MainMenu/LoginModal.tsx"),_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/MainMenu/LoginModalTemplate/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_5__.n,argTypes:{highlightForgotPassword:{control:{type:"boolean"}}}},WrapLogin=props=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_3__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_2__.zxk,{onClick:()=>setOpen(!open),children:"Click"}),open&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_LoginModal__WEBPACK_IMPORTED_MODULE_4__._,{...props,onClose:()=>setOpen(!1)})]})})},LoginWithGoogleComponent={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapLogin,{...args,isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("onClose"),onSignUpButton:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("onSignUpButton")})},LoginWithoutGoogle={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapLogin,{...args,isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("onClose"),onSignUpButton:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("onSignUpButton")})};LoginWithGoogleComponent.parameters={...LoginWithGoogleComponent.parameters,docs:{...LoginWithGoogleComponent.parameters?.docs,source:{originalSource:"{\n  render: args => <WrapLogin {...args}\n  // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => {\n  //   action('onSubmit')({ data, setStatus });\n  // }}\n  // loginWithGoogle={() => () => {\n  //   action('loginWithGoogle')();\n  // }}\n  // reactAppGoogleClientId=\"test\"\n  isOpen onClose={() => action('onClose')} onSignUpButton={() => action('onSignUpButton')}\n  // onForgotPassword={() => action('onForgotPasswordButton')}\n  />\n}",...LoginWithGoogleComponent.parameters?.docs?.source}}},LoginWithoutGoogle.parameters={...LoginWithoutGoogle.parameters,docs:{...LoginWithoutGoogle.parameters?.docs,source:{originalSource:"{\n  render: args => <WrapLogin {...args}\n  // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}\n  isOpen onClose={() => action('onClose')} onSignUpButton={() => action('onSignUpButton')}\n  // onForgotPassword={() => action('onForgotPasswordButton')}\n  />\n}",...LoginWithoutGoogle.parameters?.docs?.source}}};const __namedExportsOrder=["LoginWithGoogleComponent","LoginWithoutGoogle"]},"./src/components/templates/MainMenu/LoginModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>LoginModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_hooks_useJukiUser__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useJukiUser.tsx"),_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/templates/MainMenu/LoginModalTemplate/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const LoginModal=_ref=>{let{isOpen,onClose,onSignUpButton,multiCompanies}=_ref;const{signIn,device:{osLabel,label}}=(0,_hooks_useJukiUser__WEBPACK_IMPORTED_MODULE_1__.M)(),[highlightForgotPassword,setHighlightForgotPassword]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),onError=()=>setHighlightForgotPassword(!0);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_2__.n,{isOpen,onClose,onSignUpButton,onSubmit:(_ref2,setLoader)=>{let{companyKey,...data}=_ref2;return signIn({params:companyKey?{companyKey}:void 0,body:{...data,osName:osLabel,deviceName:label},setLoader,onError})},highlightForgotPassword,multiCompanies})};try{LoginModal.displayName="LoginModal",LoginModal.__docgenInfo={description:"",displayName:"LoginModal",props:{onSignUpButton:{defaultValue:null,description:"",name:"onSignUpButton",required:!0,type:{name:"() => void"}},multiCompanies:{defaultValue:null,description:"",name:"multiCompanies",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/LoginModal.tsx#LoginModal"]={docgenInfo:LoginModal.__docgenInfo,name:"LoginModal",path:"src/components/templates/MainMenu/LoginModal.tsx#LoginModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/templates/MainMenu/LoginModalTemplate/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>ForgotPasswordModal,n:()=>LoginModalTemplate});var esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react=__webpack_require__("./node_modules/react/index.js"),config=__webpack_require__("./src/config/index.tsx"),helpers=__webpack_require__("./src/helpers/index.ts"),useNotification=__webpack_require__("./src/hooks/useNotification.tsx"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ForgotPasswordModalComponent=_ref=>{let{isOpen,onClose,onForgotPassword}=_ref;const[email,setEmail]=(0,react.useState)(""),[touched,setTouched]=(0,react.useState)(!1);(0,react.useEffect)((()=>{!touched&&email&&setTouched(!0)}),[email,touched]);const disabled=!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);return(0,jsx_runtime.jsx)(molecules.T_,{isOpen,onClose,className:"modal-login",title:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{className:"cr-g1",children:"recover your account"})})}),graphic:(0,jsx_runtime.jsx)(atoms.w6M,{}),children:(0,jsx_runtime.jsxs)("div",{className:"jk-col gap stretch extend",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row left",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"enter your email, if the user exists, you will shortly receive an email with reset instructions"})}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"email"}),name:"email",value:email,onChange:value=>setEmail(value),type:"email",extend:!0,className:(0,helpers.AK)({error:touched&&disabled,success:touched&&!disabled}),onBlur:()=>setTouched(!0),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:touched&&disabled?"must be a valid email":""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-row-col gap block",children:[(0,jsx_runtime.jsx)(molecules.l_,{type:"light",onClick:onClose,children:(0,jsx_runtime.jsx)(atoms.T,{children:"cancel"})}),(0,jsx_runtime.jsx)(molecules.l_,{type:"primary",onClick:setLoading=>onForgotPassword(email,setLoading),disabled,submit:!0,children:(0,jsx_runtime.jsx)(atoms.T,{className:"ws-np",children:"send me"})})]})]})})};try{ForgotPasswordModalComponent.displayName="ForgotPasswordModalComponent",ForgotPasswordModalComponent.__docgenInfo={description:"",displayName:"ForgotPasswordModalComponent",props:{onForgotPassword:{defaultValue:null,description:"",name:"onForgotPassword",required:!0,type:{name:"OnForgotPasswordType"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/LoginModalTemplate/ForgotPassword/ForgoPasswordModal.tsx#ForgotPasswordModalComponent"]={docgenInfo:ForgotPasswordModalComponent.__docgenInfo,name:"ForgotPasswordModalComponent",path:"src/components/templates/MainMenu/LoginModalTemplate/ForgotPassword/ForgoPasswordModal.tsx#ForgotPasswordModalComponent"})}catch(__react_docgen_typescript_loader_error){}const ForgotPasswordModal=_ref=>{let{isOpen,onClose}=_ref;const{notifyResponse}=(0,useNotification.lm)();return(0,jsx_runtime.jsx)(ForgotPasswordModalComponent,{isOpen,onForgotPassword:async(email,setStatus)=>{null==setStatus||setStatus(esm.qb.LOADING);const{url,...options}=config.A.API.auth.initiateResetPassword({body:{email}}),response=(0,helpers.XG)(await(0,helpers.Bb)(url,options));notifyResponse(response,setStatus)},onClose})};try{ForgotPasswordModal.displayName="ForgotPasswordModal",ForgotPasswordModal.__docgenInfo={description:"",displayName:"ForgotPasswordModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/LoginModalTemplate/ForgotPassword/index.tsx#ForgotPasswordModal"]={docgenInfo:ForgotPasswordModal.__docgenInfo,name:"ForgotPasswordModal",path:"src/components/templates/MainMenu/LoginModalTemplate/ForgotPassword/index.tsx#ForgotPasswordModal"})}catch(__react_docgen_typescript_loader_error){}var yup=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),yup_index_esm=__webpack_require__("./node_modules/yup/index.esm.js");const loginSchema=yup_index_esm.Ry().shape({nickname:yup_index_esm.Z_().required("cannot be empty"),password:yup_index_esm.Z_().required("cannot be empty")}),loginMultiCompaniesSchema=yup_index_esm.Ry().shape({nickname:yup_index_esm.Z_().required("cannot be empty"),password:yup_index_esm.Z_().required("cannot be empty"),companyKey:yup_index_esm.Z_().required("cannot be empty")}),LoginModalTemplate=props=>{var _errors$companyKey,_errors$companyKey2,_errors$companyKey3,_errors$nickname,_errors$nickname2,_errors$nickname3,_errors$password,_errors$password2,_errors$password3;const{isOpen,onClose,onSignUpButton,onSubmit,loginWithGoogle,reactAppGoogleClientId,highlightForgotPassword,multiCompanies}=props,{handleSubmit,formState:{isValid,errors,touchedFields},register,reset}=(0,index_esm.cI)({resolver:(0,yup.X)(multiCompanies?loginMultiCompaniesSchema:loginSchema),mode:"all",reValidateMode:"onBlur"});(0,react.useEffect)((()=>{reset()}),[isOpen]);const[openForgotPasswordModal,setOpenForgotPasswordModal]=(0,react.useState)(!1),setLoaderRef=(0,react.useRef)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(ForgotPasswordModal,{isOpen:openForgotPasswordModal,onClose:()=>setOpenForgotPasswordModal(!1)}),(0,jsx_runtime.jsx)(molecules.T_,{isOpen:isOpen&&!openForgotPasswordModal,onClose,className:"modal-login",title:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se cr-g1",children:"login"})}),(0,jsx_runtime.jsx)("p",{className:"tx-h",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"Nice see you again!"})})]}),graphic:(0,jsx_runtime.jsx)(atoms.w6M,{}),closeWhenKeyEscape:!0,children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch",children:[loginWithGoogle&&reactAppGoogleClientId&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("div",{className:"jk-divider",children:(0,jsx_runtime.jsx)(atoms.T,{children:"or"})})}),(0,jsx_runtime.jsx)("form",{onSubmit:handleSubmit((data=>onSubmit(data,setLoaderRef.current))),children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch",children:[multiCompanies&&(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"company key"}),register:register("companyKey"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$companyKey=errors.companyKey)||void 0===_errors$companyKey||!_errors$companyKey.message),success:!(!touchedFields.companyKey||null!=errors&&null!==(_errors$companyKey2=errors.companyKey)&&void 0!==_errors$companyKey2&&_errors$companyKey2.message)}),extend:!0,required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$companyKey3=errors.companyKey)||void 0===_errors$companyKey3?void 0:_errors$companyKey3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"nickname"}),register:register("nickname"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$nickname=errors.nickname)||void 0===_errors$nickname||!_errors$nickname.message),success:!(!touchedFields.nickname||null!=errors&&null!==(_errors$nickname2=errors.nickname)&&void 0!==_errors$nickname2&&_errors$nickname2.message)}),extend:!0,required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$nickname3=errors.nickname)||void 0===_errors$nickname3?void 0:_errors$nickname3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.CMk,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"password"}),register:register("password"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$password=errors.password)||void 0===_errors$password||!_errors$password.message),success:!(!touchedFields.password||null!=errors&&null!==(_errors$password2=errors.password)&&void 0!==_errors$password2&&_errors$password2.message)}),extend:!0,required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:(null==errors||null===(_errors$password3=errors.password)||void 0===_errors$password3?void 0:_errors$password3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-col gap stretch",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row left",children:(0,jsx_runtime.jsx)("div",{className:"link",onClick:()=>setOpenForgotPasswordModal(!0),children:(0,jsx_runtime.jsx)(atoms.T,{className:(0,helpers.AK)("forgot-password-label tt-se",{"fw-br":!!highlightForgotPassword}),children:"Forgot password?"})})}),!multiCompanies&&(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)("p",{className:"label",children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"not a member?"}),", ",(0,jsx_runtime.jsx)("span",{className:"link",onClick:onSignUpButton,children:(0,jsx_runtime.jsx)(atoms.T,{children:"sign up now"})})]})}),(0,jsx_runtime.jsxs)("div",{className:"jk-row-col gap block",children:[(0,jsx_runtime.jsx)(molecules.l_,{type:"light",onClick:onClose,children:(0,jsx_runtime.jsx)(atoms.T,{children:"cancel"})}),(0,jsx_runtime.jsx)(molecules.l_,{type:"primary",disabled:!isValid,setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,submit:!0,children:(0,jsx_runtime.jsx)(atoms.T,{children:"login"})})]})]})]})})]})})]})};try{LoginModalTemplate.displayName="LoginModalTemplate",LoginModalTemplate.__docgenInfo={description:"",displayName:"LoginModalTemplate",props:{onSignUpButton:{defaultValue:null,description:"",name:"onSignUpButton",required:!0,type:{name:"() => void"}},onForgotPassword:{defaultValue:null,description:"",name:"onForgotPassword",required:!1,type:{name:"((email: string, setStatus: SetLoaderStatusOnClickType) => void)"}},onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"(data: LoginFormType, setStatus: SetLoaderStatusOnClickType) => void"}},loginWithGoogle:{defaultValue:null,description:"",name:"loginWithGoogle",required:!1,type:{name:"((setStatus?: SetLoaderStatusOnClickType) => (response: any) => void)"}},reactAppGoogleClientId:{defaultValue:null,description:"",name:"reactAppGoogleClientId",required:!1,type:{name:"string"}},highlightForgotPassword:{defaultValue:null,description:"",name:"highlightForgotPassword",required:!1,type:{name:"boolean"}},multiCompanies:{defaultValue:null,description:"",name:"multiCompanies",required:!1,type:{name:"boolean"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/LoginModalTemplate/LoginModalTemplate.tsx#LoginModalTemplate"]={docgenInfo:LoginModalTemplate.__docgenInfo,name:"LoginModalTemplate",path:"src/components/templates/MainMenu/LoginModalTemplate/LoginModalTemplate.tsx#LoginModalTemplate"})}catch(__react_docgen_typescript_loader_error){}}}]);