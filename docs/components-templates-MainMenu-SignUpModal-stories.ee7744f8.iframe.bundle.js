"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2753],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./src/components/templates/MainMenu/SignUpModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SignUPWithoutGoogle:()=>SignUPWithoutGoogle,SignUpWithGoogle:()=>SignUpWithGoogle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/mockup/index.ts"),_SignUpModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/MainMenu/SignUpModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_SignUpModal__WEBPACK_IMPORTED_MODULE_5__.X,argTypes:{highlightForgotPassword:{control:{type:"boolean"}}}},WrapSignUp=props=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_4__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.zxk,{onClick:()=>setOpen(!open),children:"Click"}),open&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SignUpModal__WEBPACK_IMPORTED_MODULE_5__.X,{...props,onClose:async setLoaderStatus=>{setLoaderStatus(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.LOADING),await new Promise((r=>setTimeout(r,2e3))),setLoaderStatus(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),setOpen(!1)}})]})})},SignUpWithGoogle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapSignUp,{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.aD)("onClose")}),SignUPWithoutGoogle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapSignUp,{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.aD)("onClose")});SignUpWithGoogle.parameters={...SignUpWithGoogle.parameters,docs:{...SignUpWithGoogle.parameters?.docs,source:{originalSource:"() => <WrapSignUp\n// imageSource=\"https://judge.juki.app/images/juki-sign-person.svg\"\n// onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}\n// signUpWithGoogle={() => () => {\n//   action('signUpWithGoogle')();\n// }}\n// reactAppGoogleClientId=\"test\"\nisOpen onClose={() => action('onClose')} />",...SignUpWithGoogle.parameters?.docs?.source}}},SignUPWithoutGoogle.parameters={...SignUPWithoutGoogle.parameters,docs:{...SignUPWithoutGoogle.parameters?.docs,source:{originalSource:"() => <WrapSignUp\n// imageSource=\"https://judge.juki.app/images/juki-sign-person.svg\"\n// onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}\nisOpen onClose={() => action('onClose')} />",...SignUPWithoutGoogle.parameters?.docs?.source}}};const __namedExportsOrder=["SignUpWithGoogle","SignUPWithoutGoogle"]},"./src/components/templates/MainMenu/SignUpModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>SignUpModal});var react=__webpack_require__("./node_modules/react/index.js"),hooks=__webpack_require__("./src/hooks/index.ts"),yup=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),yup_index_esm=__webpack_require__("./node_modules/yup/index.esm.js"),constants=__webpack_require__("./src/constants/index.ts"),helpers=__webpack_require__("./src/helpers/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const signUpSchema=yup_index_esm.Ry().shape({givenName:yup_index_esm.Z_().required("cannot be empty").min(3,"must be at least 3 characters"),familyName:yup_index_esm.Z_().required("cannot be empty").min(3,"must be at least 3 characters"),email:yup_index_esm.Z_().required("cannot be empty").email("must be a valid email"),checkbox:yup_index_esm.O7().required("you must accept the terms of service").oneOf([!0],"you must accept the terms of service"),nickname:yup_index_esm.Z_().required("cannot be empty").matches(constants.nm,"only alphanumeric characters or dash or underscore is valid").min(3,"must be at least 3 characters"),password:yup_index_esm.Z_().required("cannot be empty").min(8,"must be at least 8 characters").matches(constants.eV,"must have at least one uppercase, one lowercase letter and one number"),passwordConfirmation:yup_index_esm.Z_().required("cannot be empty").oneOf([yup_index_esm.iH("password"),""],"both passwords must match")}),SignUpModalTemplate=props=>{var _errors$givenName,_errors$givenName2,_errors$givenName3,_errors$familyName,_errors$familyName2,_errors$familyName3,_errors$nickname,_errors$nickname2,_errors$nickname3,_errors$email,_errors$email2,_errors$email3,_errors$password,_errors$password2,_errors$password3,_errors$passwordConfi,_errors$passwordConfi2,_errors$passwordConfi3,_errors$checkbox;const{isOpen,onClose,onSubmit,signUpWithGoogle,reactAppGoogleClientId}=props,{register,handleSubmit,formState:{errors,isValid,touchedFields},control,reset}=(0,index_esm.cI)({resolver:(0,yup.X)(signUpSchema),mode:"all",reValidateMode:"onBlur"});(0,react.useEffect)((()=>{reset()}),[isOpen]);const setLoaderRef=(0,react.useRef)();return(0,jsx_runtime.jsx)(molecules.T_,{isOpen,onClose,className:"modal-sign-up",title:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se cr-g1",children:"sign up"})}),(0,jsx_runtime.jsx)("p",{className:"tx-h",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"happy you join us"})})]}),graphic:(0,jsx_runtime.jsx)(atoms.w6M,{}),closeWhenKeyEscape:!0,closeIcon:!1,children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch",children:[signUpWithGoogle&&reactAppGoogleClientId&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)("div",{className:"jk-divider",children:(0,jsx_runtime.jsx)(atoms.T,{children:"or"})})}),(0,jsx_runtime.jsx)("form",{onSubmit:handleSubmit((data=>onSubmit(data,setLoaderRef.current))),children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row-col gap block",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"first name"}),register:{...register("givenName")},className:(0,helpers.AK)({error:!(null==errors||null===(_errors$givenName=errors.givenName)||void 0===_errors$givenName||!_errors$givenName.message),success:!(!touchedFields.givenName||null!=errors&&null!==(_errors$givenName2=errors.givenName)&&void 0!==_errors$givenName2&&_errors$givenName2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:(null==errors||null===(_errors$givenName3=errors.givenName)||void 0===_errors$givenName3?void 0:_errors$givenName3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"last name"}),register:register("familyName"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$familyName=errors.familyName)||void 0===_errors$familyName||!_errors$familyName.message),success:!(!touchedFields.familyName||null!=errors&&null!==(_errors$familyName2=errors.familyName)&&void 0!==_errors$familyName2&&_errors$familyName2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:(null===(_errors$familyName3=errors.familyName)||void 0===_errors$familyName3?void 0:_errors$familyName3.message)||""})})]})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"nickname"}),register:register("nickname"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$nickname=errors.nickname)||void 0===_errors$nickname||!_errors$nickname.message),success:!(!touchedFields.nickname||null!=errors&&null!==(_errors$nickname2=errors.nickname)&&void 0!==_errors$nickname2&&_errors$nickname2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$nickname3=errors.nickname)||void 0===_errors$nickname3?void 0:_errors$nickname3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.IIB,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"e-mail address"}),register:register("email"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$email=errors.email)||void 0===_errors$email||!_errors$email.message),success:!(!touchedFields.email||null!=errors&&null!==(_errors$email2=errors.email)&&void 0!==_errors$email2&&_errors$email2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$email3=errors.email)||void 0===_errors$email3?void 0:_errors$email3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.CMk,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"password"}),register:register("password"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$password=errors.password)||void 0===_errors$password||!_errors$password.message),success:!(!touchedFields.password||null!=errors&&null!==(_errors$password2=errors.password)&&void 0!==_errors$password2&&_errors$password2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$password3=errors.password)||void 0===_errors$password3?void 0:_errors$password3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.CMk,{labelPlacement:"top",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"confirm password"}),register:register("passwordConfirmation"),className:(0,helpers.AK)({error:!(null==errors||null===(_errors$passwordConfi=errors.passwordConfirmation)||void 0===_errors$passwordConfi||!_errors$passwordConfi.message),success:!(!touchedFields.passwordConfirmation||null!=errors&&null!==(_errors$passwordConfi2=errors.passwordConfirmation)&&void 0!==_errors$passwordConfi2&&_errors$passwordConfi2.message)}),required:!0}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$passwordConfi3=errors.passwordConfirmation)||void 0===_errors$passwordConfi3?void 0:_errors$passwordConfi3.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-form-item required",children:[(0,jsx_runtime.jsx)(index_esm.Qr,{control,name:"checkbox",defaultValue:!1,render:_ref=>{let{field:{value,...field}}=_ref;return(0,jsx_runtime.jsx)(atoms.o2J,{...field,checked:value,label:(0,jsx_runtime.jsx)(atoms.T,{children:"I accept the Terms of Service and Privacy Policy"})})}}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{children:!isValid&&(null==errors||null===(_errors$checkbox=errors.checkbox)||void 0===_errors$checkbox?void 0:_errors$checkbox.message)||""})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-row-col gap block",children:[(0,jsx_runtime.jsx)(molecules.l_,{type:"light",onClick:onClose,children:(0,jsx_runtime.jsx)(atoms.T,{children:"cancel"})}),(0,jsx_runtime.jsx)(molecules.l_,{type:"primary",setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,disabled:!isValid,submit:!0,children:(0,jsx_runtime.jsx)(atoms.T,{className:"ws-np",children:"sign up"})})]})]})})]})})};try{SignUpModalTemplate.displayName="SignUpModalTemplate",SignUpModalTemplate.__docgenInfo={description:"",displayName:"SignUpModalTemplate",props:{onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"(data: SignUpFormType, setStatus: SetLoaderStatusOnClickType) => void"}},signUpWithGoogle:{defaultValue:null,description:"",name:"signUpWithGoogle",required:!1,type:{name:"((setStatus?: SetLoaderStatusOnClickType) => (response: any) => void)"}},reactAppGoogleClientId:{defaultValue:null,description:"",name:"reactAppGoogleClientId",required:!1,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/SignUpModalTemplate/SignUpModalTemplate.tsx#SignUpModalTemplate"]={docgenInfo:SignUpModalTemplate.__docgenInfo,name:"SignUpModalTemplate",path:"src/components/templates/MainMenu/SignUpModalTemplate/SignUpModalTemplate.tsx#SignUpModalTemplate"})}catch(__react_docgen_typescript_loader_error){}const SignUpModal=_ref=>{let{isOpen,onClose,onSuccess}=_ref;const{signUp,device:{osLabel,label}}=(0,hooks.MQ)();return(0,jsx_runtime.jsx)(SignUpModalTemplate,{isOpen,onClose,onSubmit:(data,setLoader)=>signUp({body:{...data,osName:osLabel,deviceName:label},setLoader,onSuccess})})};try{SignUpModal.displayName="SignUpModal",SignUpModal.__docgenInfo={description:"",displayName:"SignUpModal",props:{onSuccess:{defaultValue:null,description:"",name:"onSuccess",required:!1,type:{name:"((response?: ContentResponseType<PingResponseDTO>) => void)"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ButtonLoaderOnClickType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/SignUpModal.tsx#SignUpModal"]={docgenInfo:SignUpModal.__docgenInfo,name:"SignUpModal",path:"src/components/templates/MainMenu/SignUpModal.tsx#SignUpModal"})}catch(__react_docgen_typescript_loader_error){}}}]);