"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[4786],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./src/components/organisms/Menu/HorizontalMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HorizontalMenu:()=>HorizontalMenu,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_index__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/index.ts")),_mockup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_2__.nRN};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.Ip)({depth:100,limit:20});const rightSection=_ref=>{let{open}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap",style:{width:"240px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.J2e,{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-g1",children:" Settings "}),triggerOn:"click",placement:"bottom",visible:open,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.ewm,{}),type:"text"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.J2e,{visible:open,content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap more-apps-popover cr-g1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-bd tt-se",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"more apps coming soon"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap cr-py",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.D_J,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Kk2,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z3Q,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Kk2,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]})]})]}),triggerOn:"click",placement:"bottom",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.jje,{}),type:"text"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:"User"})]})},rightMobile={children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.VjU,{})}),content:_ref2=>{let{onClose}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap more-apps-popover",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-bd tt-se",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"more apps coming soon"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap cr-py",style:{width:"100px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.D_J,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Kk2,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z3Q,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Kk2,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{onClick:onClose,children:"close right!"})]})]})}},centerMobile={children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.z1y,{})}),content:_ref3=>{let{onClose}=_ref3;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:["TOP MENU ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{onClick:onClose,children:"close top!"})]})}},drawerMenuMobile=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Rest of Menu"}),menuHorizontal=[{label:"contests",selected:!1,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/contests"),menuItemWrapper:_ref4=>{let{children}=_ref4;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"test-children",children},"test-contest")}},{label:"problems",selected:!0,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/problems")},{label:"admin",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.hQu,{}),selected:!0,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/admin")}],ButtonN=()=>{const{addInfoNotification,addQuietNotification}=(0,_index__WEBPACK_IMPORTED_MODULE_2__.lmA)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.zxk,{onClick:()=>{addInfoNotification("Lorem ipsum dolor sit amet, consectetur adipiscing elit"),addInfoNotification("Lorem ipsum"),addQuietNotification("Lorem ipsum dolor sit amet, consectetur adipiscing elit"),addQuietNotification("Lorem ipsum ")},children:"notification"})},HorizontalMenu=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_3__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{height:"400px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.AGT,{menu:menuHorizontal,leftSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row",style:{width:"240px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.z1y,{})}),rightSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"",children:rightSection({})}),rightMobile,centerMobile,drawerMenuMobile,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.cNY,{source:_index__WEBPACK_IMPORTED_MODULE_2__.hvX,uploadImageButton:!0,informationButton:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ButtonN,{})]})})})});HorizontalMenu.parameters={...HorizontalMenu.parameters,docs:{...HorizontalMenu.parameters?.docs,source:{originalSource:"() => <MockupJukiProvider>\n    <div style={{\n    height: '400px'\n  }}>\n      <HorizontalMenuCmp menu={menuHorizontal} leftSection={<div className=\"jk-row\" style={{\n      width: '240px'\n    }}><JukiJudgeLogoHorImage /></div>} rightSection={<div className=\"\">{rightSection({})}</div>} rightMobile={rightMobile} centerMobile={centerMobile} drawerMenuMobile={drawerMenuMobile}>\n        <div>\n          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />\n          <ButtonN />\n        </div>\n      </HorizontalMenuCmp>\n    </div>\n  </MockupJukiProvider>",...HorizontalMenu.parameters?.docs?.source}}};const __namedExportsOrder=["HorizontalMenu"]},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AGT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.AGT,BNd:()=>_components__WEBPACK_IMPORTED_MODULE_0__.BNd,D2S:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D2S,D_J:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D_J,FjN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.FjN,HNe:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HNe,HoD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HoD,J2e:()=>_components__WEBPACK_IMPORTED_MODULE_0__.J2e,Kk2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Kk2,MlT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.MlT,NA2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.NA2,RrP:()=>_components__WEBPACK_IMPORTED_MODULE_0__.RrP,SI8:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SI8,SVk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SVk,Sd5:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sd5,T:()=>_components__WEBPACK_IMPORTED_MODULE_0__.T,VRu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VRu,V_R:()=>_components__WEBPACK_IMPORTED_MODULE_0__.V_R,VjU:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VjU,VqK:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VqK,WB6:()=>_components__WEBPACK_IMPORTED_MODULE_0__.WB6,Xmx:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Xmx,YAN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.YAN,Z3Q:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Z3Q,Zi2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Zi2,_nC:()=>_components__WEBPACK_IMPORTED_MODULE_0__._nC,aPz:()=>_components__WEBPACK_IMPORTED_MODULE_0__.aPz,cNY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.cNY,dPH:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dPH,dys:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dys,e0j:()=>_components__WEBPACK_IMPORTED_MODULE_0__.e0j,ewm:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ewm,hQu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hQu,hvX:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hvX,jje:()=>_components__WEBPACK_IMPORTED_MODULE_0__.jje,kDs:()=>_components__WEBPACK_IMPORTED_MODULE_0__.kDs,lbA:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lbA,lmA:()=>_hooks__WEBPACK_IMPORTED_MODULE_5__.lm,mQc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mQc,nRN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.nRN,pOD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pOD,qQW:()=>_components__WEBPACK_IMPORTED_MODULE_0__.qQW,rG2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.rG2,t8m:()=>_components__WEBPACK_IMPORTED_MODULE_0__.t8m,xIZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xIZ,xLV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xLV,xNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xNc,z1y:()=>_components__WEBPACK_IMPORTED_MODULE_0__.z1y,zxk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.zxk});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./src/config/index.tsx"),__webpack_require__("./src/constants/index.ts"),__webpack_require__("./src/contexts/index.ts"),__webpack_require__("./src/helpers/index.ts"),__webpack_require__("./src/hooks/index.ts"));__webpack_require__("./src/modules/index.ts"),__webpack_require__("./src/types/index.ts")}}]);