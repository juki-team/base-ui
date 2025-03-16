"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6251],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action,qp:()=>configureActions});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),__defProp=Object.defineProperty,ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var preview_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(preview_exports,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions:actions2}}=context;return actions2?.disable||!argTypes?{}:Object.entries(argTypes).filter((([name,argType])=>!!argType.action)).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc)),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions:actions2}}=context;if(!actions2||actions2.disable||!actions2.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions2.argTypesRegex);return Object.entries(argTypes).filter((([name])=>!!argTypesRegex.test(name))).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc)),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions:actions2}}=context;if(!actions2?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)(((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some((prefix=>name.startsWith(prefix))))&&action(name)(args)})),subscribed=!0}}]},"./src/components/templates/MainMenu/LoginModal.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoginWithGoogleComponent:()=>LoginWithGoogleComponent,LoginWithoutGoogle:()=>LoginWithoutGoogle,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/index.ts"),_LoginModal__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/templates/MainMenu/LoginModal.tsx"),_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/MainMenu/LoginModalTemplate/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_3__]);_mockup__WEBPACK_IMPORTED_MODULE_3__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const __WEBPACK_DEFAULT_EXPORT__={component:_LoginModalTemplate__WEBPACK_IMPORTED_MODULE_5__.L,argTypes:{highlightForgotPassword:{control:{type:"boolean"}}}},WrapLogin=props=>{const[open,setOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_3__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_2__.$nd,{onClick:()=>setOpen(!open),children:"Click"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_LoginModal__WEBPACK_IMPORTED_MODULE_4__.z,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)({},props),{},{isOpen:open,onClose:()=>setOpen(!1)}))]})})},LoginWithGoogleComponent={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapLogin,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)({},args),{},{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onClose"),onSignUpButton:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onSignUpButton")}))},LoginWithoutGoogle={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(WrapLogin,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.A)({},args),{},{isOpen:!0,onClose:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onClose"),onSignUpButton:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onSignUpButton")}))},__namedExportsOrder=["LoginWithGoogleComponent","LoginWithoutGoogle"];LoginWithGoogleComponent.parameters={...LoginWithGoogleComponent.parameters,docs:{...LoginWithGoogleComponent.parameters?.docs,source:{originalSource:"{\n  render: args => <WrapLogin {...args}\n  // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => {\n  //   action('onSubmit')({ data, setStatus });\n  // }}\n  // loginWithGoogle={() => () => {\n  //   action('loginWithGoogle')();\n  // }}\n  // reactAppGoogleClientId=\"test\"\n  isOpen onClose={() => action('onClose')} onSignUpButton={() => action('onSignUpButton')}\n  // onForgotPassword={() => action('onForgotPasswordButton')}\n  />\n}",...LoginWithGoogleComponent.parameters?.docs?.source}}},LoginWithoutGoogle.parameters={...LoginWithoutGoogle.parameters,docs:{...LoginWithoutGoogle.parameters?.docs,source:{originalSource:"{\n  render: args => <WrapLogin {...args}\n  // onSubmit={(data: LoginInputType, setStatus: SetLoaderStatusOnClickType) => action('onSubmit')({ data, setStatus })}\n  isOpen onClose={() => action('onClose')} onSignUpButton={() => action('onSignUpButton')}\n  // onForgotPassword={() => action('onForgotPasswordButton')}\n  />\n}",...LoginWithoutGoogle.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))}}]);