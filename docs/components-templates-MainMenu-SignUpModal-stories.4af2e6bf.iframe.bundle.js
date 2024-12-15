"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8472],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action,qp:()=>configureActions});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./src/components/templates/MainMenu/SignUpModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SignUPWithoutGoogle:()=>SignUPWithoutGoogle,SignUpWithGoogle:()=>SignUpWithGoogle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/mockup/index.ts"),_SignUpModal__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/MainMenu/SignUpModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_SignUpModal__WEBPACK_IMPORTED_MODULE_5__.g,argTypes:{highlightForgotPassword:{control:{type:"boolean"}}}},WrapSignUp=props=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_4__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{onClick:()=>setOpen(!open),children:"Click"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SignUpModal__WEBPACK_IMPORTED_MODULE_5__.g,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)({},props),{},{isOpen:open,onClose:async setLoaderStatus=>{setLoaderStatus(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.LOADING),await new Promise((r=>setTimeout(r,2e3))),setLoaderStatus(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.nW6.SUCCESS),setOpen(!1)}}))]})})},SignUpWithGoogle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapSignUp,{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onClose")}),SignUPWithoutGoogle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapSignUp,{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onClose")}),__namedExportsOrder=["SignUpWithGoogle","SignUPWithoutGoogle"];SignUpWithGoogle.parameters={...SignUpWithGoogle.parameters,docs:{...SignUpWithGoogle.parameters?.docs,source:{originalSource:"() => <WrapSignUp\n// imageSource=\"https://judge.juki.app/images/juki-sign-person.svg\"\n// onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}\n// signUpWithGoogle={() => () => {\n//   action('signUpWithGoogle')();\n// }}\n// reactAppGoogleClientId=\"test\"\nisOpen onClose={() => action('onClose')} />",...SignUpWithGoogle.parameters?.docs?.source}}},SignUPWithoutGoogle.parameters={...SignUPWithoutGoogle.parameters,docs:{...SignUPWithoutGoogle.parameters?.docs,source:{originalSource:"() => <WrapSignUp\n// imageSource=\"https://judge.juki.app/images/juki-sign-person.svg\"\n// onSubmit={(data: SignUpFormType, setLoading: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setLoading })}\nisOpen onClose={() => action('onClose')} />",...SignUPWithoutGoogle.parameters?.docs?.source}}}},"./src/components/templates/MainMenu/SignUpModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{g:()=>SignUpModal});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react=__webpack_require__("./node_modules/react/index.js"),hooks=__webpack_require__("./src/hooks/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const LazySignUpModalTemplate=(0,react.lazy)((()=>Promise.all([__webpack_require__.e(6510),__webpack_require__.e(3889)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/templates/MainMenu/SignUpModalTemplate/SignUpModalTemplate.tsx")).then((module=>({default:module.SignUpModalTemplate}))))),SignUpModalTemplate=props=>(0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsxs)(molecules.QA,{children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"loading component"}),"..."]}),children:(0,jsx_runtime.jsx)(LazySignUpModalTemplate,(0,objectSpread2.A)({},props))});try{SignUpModalTemplate.displayName="SignUpModalTemplate",SignUpModalTemplate.__docgenInfo={description:"",displayName:"SignUpModalTemplate",props:{onSubmit:{defaultValue:null,description:"",name:"onSubmit",required:!0,type:{name:"(data: SignUpFormType, setStatus?: SetLoaderStatusOnClickType | undefined) => void"}},signUpWithGoogle:{defaultValue:null,description:"",name:"signUpWithGoogle",required:!1,type:{name:"((setStatus?: SetLoaderStatusOnClickType) => (response: any) => void)"}},reactAppGoogleClientId:{defaultValue:null,description:"",name:"reactAppGoogleClientId",required:!1,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ModalButtonLoaderEventType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/SignUpModalTemplate/index.tsx#SignUpModalTemplate"]={docgenInfo:SignUpModalTemplate.__docgenInfo,name:"SignUpModalTemplate",path:"src/components/templates/MainMenu/SignUpModalTemplate/index.tsx#SignUpModalTemplate"})}catch(__react_docgen_typescript_loader_error){}const SignUpModal=_ref=>{let{isOpen,onClose,onSuccess}=_ref;const{signUp,device:{osLabel,label}}=(0,hooks.Mg)();return(0,jsx_runtime.jsx)(SignUpModalTemplate,{isOpen,onClose,onSubmit:(data,setLoader)=>signUp({body:(0,objectSpread2.A)((0,objectSpread2.A)({},data),{},{osName:osLabel,deviceName:label}),setLoader,onSuccess})})};try{SignUpModal.displayName="SignUpModal",SignUpModal.__docgenInfo={description:"",displayName:"SignUpModal",props:{onSuccess:{defaultValue:null,description:"",name:"onSuccess",required:!1,type:{name:"((response?: ContentResponseType<PingResponseDTO>) => void)"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"ModalButtonLoaderEventType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/MainMenu/SignUpModal.tsx#SignUpModal"]={docgenInfo:SignUpModal.__docgenInfo,name:"SignUpModal",path:"src/components/templates/MainMenu/SignUpModal.tsx#SignUpModal"})}catch(__react_docgen_typescript_loader_error){}}}]);