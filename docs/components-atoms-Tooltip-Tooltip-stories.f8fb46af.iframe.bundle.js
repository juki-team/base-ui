"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2370],{"./src/components/atoms/Tooltip/Tooltip.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:function(){return Regular},__namedExportsOrder:function(){return __namedExportsOrder}});var _Regular$parameters,_Regular$parameters2,_Regular$parameters2$,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_mockup__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/mockup/index.ts")),_Tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/Tooltip/Tooltip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={component:_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u};__webpack_exports__.default=meta;var Regular={render:function render(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_1__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Tooltip__WEBPACK_IMPORTED_MODULE_2__.u,(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},args),{},{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{width:100},children:"hover me"})}))})})},args:{content:"content hover"}};Regular.parameters=(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},Regular.parameters),{},{docs:(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({},null===(_Regular$parameters=Regular.parameters)||void 0===_Regular$parameters?void 0:_Regular$parameters.docs),{},{source:(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__.Z)({originalSource:"{\n  render: args => <MockupJukiProvider>\n      <div>\n        <Tooltip {...args}>\n          <div style={{\n          width: 100\n        }}>hover me</div>\n        </Tooltip>\n      </div>\n    </MockupJukiProvider>\n}"},null===(_Regular$parameters2=Regular.parameters)||void 0===_Regular$parameters2||null===(_Regular$parameters2$=_Regular$parameters2.docs)||void 0===_Regular$parameters2$?void 0:_Regular$parameters2$.source)})});var __namedExportsOrder=["Regular"]},"./src/components/mockup/MockupJukiProvider.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{p:function(){return MockupJukiProvider}});__webpack_require__("./node_modules/react/index.js");var _contexts__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/index.ts"),_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),MockupJukiProvider=function MockupJukiProvider(_ref){var children=_ref.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_contexts__WEBPACK_IMPORTED_MODULE_1__.I,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_contexts__WEBPACK_IMPORTED_MODULE_1__.m,{utilsServiceUrl:"http://localhost:3005",utilsServiceApiVersion:"api/v1",utilsUiUrl:"https://utils.juki.app",tokenName:"juki-token",utilsSocketServiceUrl:"http://localhost:3005",children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__.O,{})]})})};try{MockupJukiProvider.displayName="MockupJukiProvider",MockupJukiProvider.__docgenInfo={description:"",displayName:"MockupJukiProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/mockup/MockupJukiProvider.tsx#MockupJukiProvider"]={docgenInfo:MockupJukiProvider.__docgenInfo,name:"MockupJukiProvider",path:"src/components/mockup/MockupJukiProvider.tsx#MockupJukiProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/mockup/MockupToggleThemeButton.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{O:function(){return MockupToggleThemeButton}});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),MockupToggleThemeButton=function MockupToggleThemeButton(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{position:"absolute",right:0,bottom:10,zIndex:1e7},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.zxk,{onClick:function onClick(){document.documentElement.classList.contains("jk-theme-dark")?(document.documentElement.classList.remove("jk-theme-dark"),document.documentElement.classList.add("jk-theme-light")):(document.documentElement.classList.remove("jk-theme-light"),document.documentElement.classList.add("jk-theme-dark"))},icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.uQp,{})})})}},"./src/components/mockup/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{O:function(){return _MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_1__.O},p:function(){return _MockupJukiProvider__WEBPACK_IMPORTED_MODULE_0__.p}});var _MockupJukiProvider__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/mockup/MockupJukiProvider.tsx"),_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx")},"./src/contexts/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{I:function(){return JukiUIProvider},m:function(){return JukiUserProvider}});var createForOfIteratorHelper=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),hooks=__webpack_require__("./src/hooks/index.tsx"),Notifications=__webpack_require__("./src/components/organisms/Notifications/index.ts"),context=__webpack_require__("./src/contexts/JukiUIProvider/context.ts"),Image=__webpack_require__("./src/contexts/JukiUIProvider/Image.tsx"),Link=__webpack_require__("./src/contexts/JukiUIProvider/Link.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),cloneURLSearchParams=function cloneURLSearchParams(urlSearchParams){return new URLSearchParams(urlSearchParams.toString())},JukiUIProvider=function JukiUIProvider(_ref){var children=_ref.children,components=_ref.components,router=_ref.router,isPageVisible=(0,hooks.d9)(),isPageFocus=(0,hooks.l4)(),isOnline=(0,hooks.sd)(),viewPortSize=(0,hooks.ou)(),_useState=(0,react.useState)(new URLSearchParams("")),_useState2=(0,slicedToArray.Z)(_useState,2),_searchParams=_useState2[0],_setSearchParams=_useState2[1],updateSearchParams=(0,react.useCallback)((function(newSearchParams){var newSearchParamsSorted=cloneURLSearchParams(newSearchParams),searchParamsSorted=cloneURLSearchParams(_searchParams);newSearchParams.sort(),searchParamsSorted.sort(),newSearchParamsSorted.toString()!==searchParamsSorted.toString()&&_setSearchParams(newSearchParams)}),[_searchParams]),_ref2=components||{Image:Image.E,Link:Link.r},_ref2$Image=_ref2.Image,ImageCmp=void 0===_ref2$Image?Image.E:_ref2$Image,_ref2$Link=_ref2.Link,LinkCmp=void 0===_ref2$Link?Link.r:_ref2$Link,appendSearchParams=(0,react.useCallback)((function(){for(var newSearchParams=cloneURLSearchParams(_searchParams),_len=arguments.length,props=new Array(_len),_key=0;_key<_len;_key++)props[_key]=arguments[_key];for(var _i=0,_props=props;_i<_props.length;_i++){var _props$_i=_props[_i],name=_props$_i.name,value=_props$_i.value;newSearchParams.append(name,value)}updateSearchParams(newSearchParams)}),[_searchParams,updateSearchParams]),deleteSearchParams=(0,react.useCallback)((function(){for(var newSearchParams=cloneURLSearchParams(_searchParams),_len2=arguments.length,props=new Array(_len2),_key2=0;_key2<_len2;_key2++)props[_key2]=arguments[_key2];for(var _i2=0,_props2=props;_i2<_props2.length;_i2++){var _props2$_i=_props2[_i2],name=_props2$_i.name,value=_props2$_i.value,values=newSearchParams.getAll(name);if(newSearchParams.delete(name),void 0!==value){var _step,_iterator=(0,createForOfIteratorHelper.Z)(values);try{for(_iterator.s();!(_step=_iterator.n()).done;){var v=_step.value;v!==value&&newSearchParams.append(name,v)}}catch(err){_iterator.e(err)}finally{_iterator.f()}}}updateSearchParams(newSearchParams)}),[_searchParams,updateSearchParams]),setSearchParams=(0,react.useCallback)((function(){for(var newSearchParams=cloneURLSearchParams(_searchParams),_len3=arguments.length,props=new Array(_len3),_key3=0;_key3<_len3;_key3++)props[_key3]=arguments[_key3];for(var _i3=0,_props3=props;_i3<_props3.length;_i3++){var _props3$_i=_props3[_i3],name=_props3$_i.name,value=_props3$_i.value;newSearchParams.delete(name);var values=[];"string"==typeof value?values.push(value):values=value;var _step2,_iterator2=(0,createForOfIteratorHelper.Z)(values);try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var _value=_step2.value;newSearchParams.append(name,_value)}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}}updateSearchParams(newSearchParams)}),[_searchParams,updateSearchParams]),ref=(0,react.useRef)(null);return(0,jsx_runtime.jsx)(context.Q.Provider,{value:{ref:ref,isOnline:isOnline,isPageVisible:isPageVisible,isPageFocus:isPageFocus,viewPortSize:viewPortSize,components:{Image:ImageCmp,Link:LinkCmp},router:router||{searchParams:_searchParams,appendSearchParams:appendSearchParams,deleteSearchParams:deleteSearchParams,setSearchParams:setSearchParams}},children:(0,jsx_runtime.jsx)(Notifications.JB,{children:(0,jsx_runtime.jsx)("div",{className:"jk-app",ref:ref,children:children})})})};try{JukiUIProvider.displayName="JukiUIProvider",JukiUIProvider.__docgenInfo={description:"",displayName:"JukiUIProvider",props:{components:{defaultValue:null,description:"",name:"components",required:!1,type:{name:"Partial<UIComponentsContextInterface>"}},router:{defaultValue:null,description:"",name:"router",required:!1,type:{name:"UIRouterContextInterface"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/JukiUIProvider/JukiUIProvider.tsx#JukiUIProvider"]={docgenInfo:JukiUIProvider.__docgenInfo,name:"JukiUIProvider",path:"src/contexts/JukiUIProvider/JukiUIProvider.tsx#JukiUIProvider"})}catch(__react_docgen_typescript_loader_error){}var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),lib=__webpack_require__("./node_modules/react-device-detect/dist/lib.js"),config=__webpack_require__("./src/config/index.tsx"),helpers=__webpack_require__("./src/helpers/index.ts"),services=__webpack_require__("./src/services/index.tsx"),JukiUserProvider_context=__webpack_require__("./src/contexts/JukiUserProvider/context.ts"),JukiUserProvider=function JukiUserProvider(props){var children=props.children,utilsServiceUrl=props.utilsServiceUrl,utilsServiceApiVersion=props.utilsServiceApiVersion,utilsSocketServiceUrl=props.utilsSocketServiceUrl,utilsUiUrl=props.utilsUiUrl,tokenName=props.tokenName,isPageVisible=(0,hooks.Tv)().isPageVisible,socket=(0,react.useMemo)((function(){return new services.pz}),[]);(0,react.useEffect)((function(){config.X.setSetting(utilsServiceUrl,utilsServiceApiVersion,utilsSocketServiceUrl,utilsUiUrl,tokenName),socket.stop(),socket.start()}),[socket,tokenName,utilsServiceApiVersion,utilsServiceUrl,utilsSocketServiceUrl,utilsUiUrl]);var _useUser=function useUser(){var _useFetcher=(0,hooks.wh)(config.X.getAPI().auth.ping().url,{refreshInterval:3e5}),data=_useFetcher.data,isLoading=_useFetcher.isLoading,mutate=_useFetcher.mutate,_useState=(0,react.useState)(esm.xk),_useState2=(0,slicedToArray.Z)(_useState,2),user=_useState2[0],setUser=_useState2[1],_useState3=(0,react.useState)({emailContact:"",imageUrl:"",name:"",key:""}),_useState4=(0,slicedToArray.Z)(_useState3,2),company=_useState4[0],setCompany=_useState4[1];return(0,react.useEffect)((function(){var preferredLanguage=localStorage.getItem(esm.w4.LANGUAGE);preferredLanguage!==esm.SQ.EN&&preferredLanguage!==esm.SQ.ES&&(preferredLanguage=esm.SQ.EN);var _settings,_settings2,preferredTheme=localStorage.getItem(esm.w4.THEME);(preferredTheme!==esm.Q2.DARK&&preferredTheme!==esm.Q2.LIGHT&&(preferredTheme=esm.Q2.LIGHT),null!=data&&data.success)?(setCompany(data.content.company),data.content.user.isLogged?setUser(null==data?void 0:data.content.user):setUser((0,objectSpread2.Z)((0,objectSpread2.Z)({},null==data?void 0:data.content.user),{},{settings:(_settings={},(0,defineProperty.Z)(_settings,esm.w4.THEME,preferredTheme),(0,defineProperty.Z)(_settings,esm.w4.LANGUAGE,preferredLanguage),(0,defineProperty.Z)(_settings,esm.w4.DATA_VIEW_MODE,esm._J.ROWS),(0,defineProperty.Z)(_settings,esm.w4.MENU_VIEW_MODE,esm.zk.VERTICAL),(0,defineProperty.Z)(_settings,esm.w4.NEWSLETTER_SUBSCRIPTION,!0),_settings)})),helpers.ks.setItem(config.X.TOKEN_NAME,null==data?void 0:data.content.user.sessionId)):setUser((0,objectSpread2.Z)((0,objectSpread2.Z)({},esm.xk),{},{settings:(_settings2={},(0,defineProperty.Z)(_settings2,esm.w4.THEME,preferredTheme),(0,defineProperty.Z)(_settings2,esm.w4.LANGUAGE,preferredLanguage),(0,defineProperty.Z)(_settings2,esm.w4.DATA_VIEW_MODE,esm._J.ROWS),(0,defineProperty.Z)(_settings2,esm.w4.MENU_VIEW_MODE,esm.zk.VERTICAL),(0,defineProperty.Z)(_settings2,esm.w4.NEWSLETTER_SUBSCRIPTION,!0),_settings2)}))}),[data]),{user:user,company:company,setUser:setUser,isLoading:isLoading,mutate:mutate}}(),user=_useUser.user,company=_useUser.company,setUser=_useUser.setUser,isLoading=_useUser.isLoading,mutate=_useUser.mutate;(0,react.useEffect)((function(){isPageVisible&&socket.joinSession().then((function(){return null}))}),[isPageVisible,socket,user.sessionId]);var device={type:lib.vO,isMobile:!1,isBrowser:!1,label:lib.tq?"".concat(lib.N7," ").concat(lib.B3):"".concat(lib.KC," ").concat(lib.x_),osLabel:"".concat(lib.BF," ").concat(lib.MM)};return(0,jsx_runtime.jsx)(JukiUserProvider_context.S.Provider,{value:{user:user,company:company,setUser:setUser,isLoading:isLoading,mutate:mutate,socket:socket,device:device},children:children})};try{JukiUserProvider.displayName="JukiUserProvider",JukiUserProvider.__docgenInfo={description:"",displayName:"JukiUserProvider",props:{utilsServiceUrl:{defaultValue:null,description:"",name:"utilsServiceUrl",required:!0,type:{name:"string"}},utilsServiceApiVersion:{defaultValue:null,description:"",name:"utilsServiceApiVersion",required:!0,type:{name:"string"}},utilsSocketServiceUrl:{defaultValue:null,description:"",name:"utilsSocketServiceUrl",required:!0,type:{name:"string"}},utilsUiUrl:{defaultValue:null,description:"",name:"utilsUiUrl",required:!0,type:{name:"string"}},tokenName:{defaultValue:null,description:"",name:"tokenName",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/JukiUserProvider/JukiUserProvider.tsx#JukiUserProvider"]={docgenInfo:JukiUserProvider.__docgenInfo,name:"JukiUserProvider",path:"src/contexts/JukiUserProvider/JukiUserProvider.tsx#JukiUserProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);