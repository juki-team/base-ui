"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9417],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action,qp:()=>configureActions});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./src/components/organisms/Menu/VerticalMenu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{VerticalMenu:()=>VerticalMenu,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_index__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/index.ts")),_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_2__.mCE};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.qp)({depth:100,limit:20});const menu=[{label:"contests",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.jZu,{}),selected:!1,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("/contests")},{label:"problems",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.c11,{}),selected:!0,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("/problems")},{label:"admin",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.O7G,{}),selected:!1,onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("/admin")}],rightSection=_ref=>{let{open}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap",style:{width:"240px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.AMh,{content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-g1",children:" Settings "}),triggerOn:"click",placement:"bottom",visible:open,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.$nd,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Zes,{}),type:"text"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.AMh,{visible:open,content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap more-apps-popover cr-g1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-bd tt-se",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"more apps coming soon"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap cr-py",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.h5Z,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.JoG,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.u2z,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.JoG,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]})]})]}),triggerOn:"click",placement:"bottom",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.$nd,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.k9F,{}),type:"text"})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:"User"})]})},rightMobile={children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.jZu,{})}),content:_ref2=>{let{onClose}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap more-apps-popover",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-bd tt-se",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{children:"more apps coming soon"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap cr-py",style:{width:"100px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.h5Z,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.JoG,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.u2z,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.JoG,{})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.T,{className:"tt-se",children:"developing"}),"..."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{onClick:onClose,children:"close right!"})]})]})}},centerMobile={children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"cr-we",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.On4,{})}),content:_ref3=>{let{onClose}=_ref3;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:["TOP MENU ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{onClick:onClose,children:"close top!"})]})}},drawerMenuMobile=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Rest of Menu"}),VerticalMenu=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{height:"400px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.mCE,{menu,topSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row",style:{width:"60px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.On4,{})}),bottomSection:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"",children:rightSection({})}),rightMobile,centerMobile,drawerMenuMobile,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.DsY,{source:_index__WEBPACK_IMPORTED_MODULE_2__.$w7,uploadImageButton:!0,informationButton:!0})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_3__.x,{})]}),__namedExportsOrder=["VerticalMenu"];VerticalMenu.parameters={...VerticalMenu.parameters,docs:{...VerticalMenu.parameters?.docs,source:{originalSource:"() => <div style={{\n  height: '400px'\n}}>\n    <VerticalMenuCmp menu={menu} topSection={<div className=\"jk-row\" style={{\n    width: '60px'\n  }}>\n          <JukiJudgeLogoHorImage />\n        </div>} bottomSection={<div className=\"\">{rightSection({})}</div>} rightMobile={rightMobile} centerMobile={centerMobile} drawerMenuMobile={drawerMenuMobile}>\n      <div>\n        <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />\n      </div>\n    </VerticalMenuCmp>\n    <MockupToggleThemeButton />\n  </div>",...VerticalMenu.parameters?.docs?.source}}}},"./src/components/mockup/MockupToggleThemeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>MockupToggleThemeButton});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MockupToggleThemeButton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{position:"absolute",right:0,bottom:10,zIndex:1e7},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.$nd,{onClick:()=>{document.body.classList.contains("jk-theme-dark")?(document.body.classList.remove("jk-theme-dark"),document.body.classList.add("jk-theme-light")):(document.body.classList.remove("jk-theme-light"),document.body.classList.add("jk-theme-dark"))},icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.WaA,{})})})},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$nd:()=>_components__WEBPACK_IMPORTED_MODULE_0__.$nd,$w7:()=>_components__WEBPACK_IMPORTED_MODULE_0__.$w7,ADv:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ADv,AMh:()=>_components__WEBPACK_IMPORTED_MODULE_0__.AMh,C_2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.C_2,DsY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.DsY,EY3:()=>_components__WEBPACK_IMPORTED_MODULE_0__.EY3,EhT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.EhT,Eqc:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.Eq,GKY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.GKY,HKb:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HKb,HLh:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HLh,Hd_:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Hd_,I8f:()=>_components__WEBPACK_IMPORTED_MODULE_0__.I8f,JMY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.JMY,JoG:()=>_components__WEBPACK_IMPORTED_MODULE_0__.JoG,Kkg:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Kkg,LoD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.LoD,O7G:()=>_components__WEBPACK_IMPORTED_MODULE_0__.O7G,On4:()=>_components__WEBPACK_IMPORTED_MODULE_0__.On4,QGg:()=>_components__WEBPACK_IMPORTED_MODULE_0__.QGg,Qvf:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Qvf,T:()=>_components__WEBPACK_IMPORTED_MODULE_0__.T,Zes:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Zes,_s:()=>_components__WEBPACK_IMPORTED_MODULE_0__._s,a05:()=>_components__WEBPACK_IMPORTED_MODULE_0__.a05,bUY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.bUY,bjW:()=>_components__WEBPACK_IMPORTED_MODULE_0__.bjW,c11:()=>_components__WEBPACK_IMPORTED_MODULE_0__.c11,eCO:()=>_components__WEBPACK_IMPORTED_MODULE_0__.eCO,ebq:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ebq,gvH:()=>_components__WEBPACK_IMPORTED_MODULE_0__.gvH,gvc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.gvc,h5Z:()=>_components__WEBPACK_IMPORTED_MODULE_0__.h5Z,hZx:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hZx,iki:()=>_components__WEBPACK_IMPORTED_MODULE_0__.iki,j9N:()=>_components__WEBPACK_IMPORTED_MODULE_0__.j9N,jZu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.jZu,k9F:()=>_components__WEBPACK_IMPORTED_MODULE_0__.k9F,lRh:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lRh,mCE:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mCE,mPE:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mPE,pUb:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pUb,pc5:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pc5,pcb:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pcb,rql:()=>_components__WEBPACK_IMPORTED_MODULE_0__.rql,tHk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.tHk,u2z:()=>_components__WEBPACK_IMPORTED_MODULE_0__.u2z,zU0:()=>_components__WEBPACK_IMPORTED_MODULE_0__.zU0});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/contexts/index.tsx"),__webpack_require__("./src/hooks/index.ts"))}}]);