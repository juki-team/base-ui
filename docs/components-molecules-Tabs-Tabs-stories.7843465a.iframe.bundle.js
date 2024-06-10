"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6038],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./src/components/molecules/Tabs/Tabs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Tabs:()=>Tabs,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_index__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/index.ts")),_mockup_MockupJukiProvider__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/MockupJukiProvider.tsx"),_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_2__.mQc,argTypes:{}};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.Ip)({depth:100,limit:20});const Tabs=()=>{const tabs={1:{key:"1",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"1"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap",children:"1"})},2:{key:"2",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"2"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap",children:"2"})},3:{key:"3",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"ws-np",children:"content 3 content 3 content 3 content 3"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:" CONTENT 3 CONTENT 3"})},4:{key:"4",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"ws-np",children:"tab 4 4 4 4 4 "})},5:{key:"5",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"ws-np",children:"tabtabtabtab"})}};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_mockup_MockupJukiProvider__WEBPACK_IMPORTED_MODULE_3__.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"200px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.mQc,{tabs:Object.values(tabs),extraNodes:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{children:"button 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{children:"button button 2"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"200px",position:"relative"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.RrP,{tabs,extraNodes:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{className:"ws-np",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"button 1"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{className:"ws-np",children:"button button 2"})],onChange:()=>null,selectedTabKey:"1"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"200px",position:"relative",border:"1px solid red"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.RrP,{tabs,extraNodes:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{className:"ws-np",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"button 1"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{className:"ws-np",children:"button button 2"})],onChange:()=>null,selectedTabKey:"2",extraNodesPlacement:"bottomLeft"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"200px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.mQc,{tabs:Object.values(tabs),extraNodes:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{children:"button 1"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{style:{height:"200px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.mQc,{tabs:[{key:"1",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"tab 1 "}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"1"})},{key:"2",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"tab 2"})}],extraNodes:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{children:"button 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{children:"button 2"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_4__.O,{})]})]})};Tabs.parameters={...Tabs.parameters,docs:{...Tabs.parameters?.docs,source:{originalSource:"() => {\n  const tabs = {\n    1: {\n      key: '1',\n      header: <div>1</div>,\n      body: <div className=\"jk-row gap\">\n          1\n        </div>\n    },\n    2: {\n      key: '2',\n      header: <div>2</div>,\n      body: <div className=\"jk-row gap\">\n          2\n        </div>\n    },\n    3: {\n      key: '3',\n      header: <div className=\"ws-np\">content 3 content 3 content 3 content 3</div>,\n      body: <div> CONTENT 3 CONTENT 3</div>\n    },\n    4: {\n      key: '4',\n      header: <div className=\"ws-np\">tab 4 4 4 4 4 </div>\n    },\n    5: {\n      key: '5',\n      header: <div className=\"ws-np\">tabtabtabtab</div>\n    }\n  };\n  return <MockupJukiProvider>\n      <div style={{\n      height: '200px'\n    }}>\n        <TabsComponent tabs={Object.values(tabs)} extraNodes={[<Button>button 1</Button>, <Button>button button 2</Button>]} />\n      </div>\n      <div style={{\n      height: '200px',\n      position: 'relative'\n    }}>\n        <TabsInline tabs={tabs} extraNodes={[<Button className=\"ws-np\"><T>button 1</T></Button>, <Button className=\"ws-np\">button button 2</Button>]} onChange={() => null} selectedTabKey={'1'} />\n      \n      </div>\n      <div style={{\n      height: '200px',\n      position: 'relative',\n      border: '1px solid red'\n    }}>\n        <TabsInline tabs={tabs} extraNodes={[<Button className=\"ws-np\"><T>button 1</T></Button>, <Button className=\"ws-np\">button button 2</Button>]} onChange={() => null} selectedTabKey={'2'} extraNodesPlacement=\"bottomLeft\" />\n      </div>\n      <div style={{\n      height: '200px'\n    }}>\n        <TabsComponent tabs={Object.values(tabs)} extraNodes={[<Button>button 1</Button>]} />\n      </div>\n      <div style={{\n      height: '200px'\n    }}>\n        <TabsComponent tabs={[{\n        key: '1',\n        header: <div>tab 1 </div>,\n        body: <div>1</div>\n      }, {\n        key: '2',\n        header: <div>tab 2</div>\n      }]} extraNodes={[<Button>button 1</Button>, <Button>button 2</Button>]} />\n        <MockupToggleThemeButton />\n      </div>\n    </MockupJukiProvider>;\n}",...Tabs.parameters?.docs?.source}}};const __namedExportsOrder=["Tabs"]},"./src/components/mockup/MockupJukiProvider.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>MockupJukiProvider});__webpack_require__("./node_modules/react/index.js");var _contexts__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/index.tsx"),_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),TestPath=function(TestPath){return TestPath.USER="USER",TestPath.ADMIN="ADMIN",TestPath}(TestPath||{});const MockupJukiProvider=_ref=>{let{children}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_contexts__WEBPACK_IMPORTED_MODULE_1__.ME,{serviceApiUrl:"https://service.juki.app/api/v1",utilsUiUrl:"https://utils.juki.app",tokenName:"juki-token",socketServiceUrl:"https://service.juki.app",router:{pathname:"",routeParams:{},pushRoute:()=>null,replaceRoute:()=>null,reloadRoute:()=>null},initialLastPath:{[TestPath.USER]:{pathname:"",searchParams:new URLSearchParams},[TestPath.ADMIN]:{pathname:"",searchParams:new URLSearchParams}},children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__.O,{})]})};try{MockupJukiProvider.displayName="MockupJukiProvider",MockupJukiProvider.__docgenInfo={description:"",displayName:"MockupJukiProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/mockup/MockupJukiProvider.tsx#MockupJukiProvider"]={docgenInfo:MockupJukiProvider.__docgenInfo,name:"MockupJukiProvider",path:"src/components/mockup/MockupJukiProvider.tsx#MockupJukiProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/mockup/MockupToggleThemeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>MockupToggleThemeButton});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MockupToggleThemeButton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{position:"absolute",right:0,bottom:10,zIndex:1e7},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.zxk,{onClick:()=>{document.documentElement.classList.contains("jk-theme-dark")?(document.documentElement.classList.remove("jk-theme-dark"),document.documentElement.classList.add("jk-theme-light")):(document.documentElement.classList.remove("jk-theme-light"),document.documentElement.classList.add("jk-theme-dark"))},icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.uQp,{})})})},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AGT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.AGT,BNd:()=>_components__WEBPACK_IMPORTED_MODULE_0__.BNd,D2S:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D2S,D_J:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D_J,FjN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.FjN,HNe:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HNe,HoD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HoD,J2e:()=>_components__WEBPACK_IMPORTED_MODULE_0__.J2e,Kk2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Kk2,MlT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.MlT,NA2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.NA2,RrP:()=>_components__WEBPACK_IMPORTED_MODULE_0__.RrP,SI8:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SI8,SVk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SVk,Sd5:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sd5,T:()=>_components__WEBPACK_IMPORTED_MODULE_0__.T,VRu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VRu,V_R:()=>_components__WEBPACK_IMPORTED_MODULE_0__.V_R,VjU:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VjU,VqK:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VqK,WB6:()=>_components__WEBPACK_IMPORTED_MODULE_0__.WB6,Xmx:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Xmx,YAN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.YAN,Z3Q:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Z3Q,Zi2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Zi2,_nC:()=>_components__WEBPACK_IMPORTED_MODULE_0__._nC,aPz:()=>_components__WEBPACK_IMPORTED_MODULE_0__.aPz,cNY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.cNY,dPH:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dPH,dys:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dys,e0j:()=>_components__WEBPACK_IMPORTED_MODULE_0__.e0j,ewm:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ewm,hQu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hQu,hvX:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hvX,jje:()=>_components__WEBPACK_IMPORTED_MODULE_0__.jje,kDs:()=>_components__WEBPACK_IMPORTED_MODULE_0__.kDs,lbA:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lbA,lmA:()=>_hooks__WEBPACK_IMPORTED_MODULE_5__.lm,mQc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mQc,nRN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.nRN,pOD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pOD,qQW:()=>_components__WEBPACK_IMPORTED_MODULE_0__.qQW,rG2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.rG2,t8m:()=>_components__WEBPACK_IMPORTED_MODULE_0__.t8m,xIZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xIZ,xLV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xLV,xNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xNc,z1y:()=>_components__WEBPACK_IMPORTED_MODULE_0__.z1y,zxk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.zxk});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./src/config/index.tsx"),__webpack_require__("./src/constants/index.ts"),__webpack_require__("./src/contexts/index.tsx"),__webpack_require__("./src/helpers/index.ts"),__webpack_require__("./src/hooks/index.ts"));__webpack_require__("./src/modules/index.ts"),__webpack_require__("./src/types/index.ts")}}]);