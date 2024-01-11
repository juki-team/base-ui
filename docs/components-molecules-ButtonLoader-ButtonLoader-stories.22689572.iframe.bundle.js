"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8807],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"./src/components/molecules/ButtonLoader/ButtonLoader.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_index__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/index.ts")),_mockup__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/mockup/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_3__.l_w},Regular={render:args=>{const{size,...restArgs}=args,onClick=status=>(setLoader,loader)=>{(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.aD)("onClick")({setLoader,loader}),setLoader(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.LOADING),setTimeout((()=>setLoader(status)),5e3)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_4__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-col",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"24px tiny"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{children:["30px ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{style:{textDecoration:"line-through"},children:"32px"})," small"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{children:["36px ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{style:{textDecoration:"line-through"},children:"36px"})," regular"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{children:["48px ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{style:{textDecoration:"line-through"},children:"56px"})," large"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:"60px huge"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row gap block",style:{width:500},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),children:"click me"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.ERROR),children:"click me"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.wqo,{})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),children:"click me"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.NONE),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.uLp,{}),children:"click me"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.SUCCESS),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.uLp,{}),children:"click me"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.ERROR),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.uLp,{}),children:"click me"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{width:200},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...args,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.ERROR),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.uLp,{}),children:"large text text text"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.l_w,{...restArgs,onClick:onClick(_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.qb.ERROR),icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.uLp,{}),responsive:!0,children:"responsive"})]})]})})}};Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: args => {\n    const {\n      size,\n      ...restArgs\n    } = args;\n    const onClick: (status: Status) => ButtonLoaderProps['onClick'] = status => (setLoader, loader) => {\n      action('onClick')({\n        setLoader,\n        loader\n      });\n      setLoader(Status.LOADING);\n      setTimeout(() => setLoader(status), 5000);\n    };\n    return <MockupJukiProvider>\n        <div className=\"jk-col gap\">\n          <div className=\"jk-col\">\n            <div>24px tiny</div>\n            <div>30px <span style={{\n              textDecoration: 'line-through'\n            }}>32px</span> small</div>\n            <div>36px <span style={{\n              textDecoration: 'line-through'\n            }}>36px</span> regular</div>\n            <div>48px <span style={{\n              textDecoration: 'line-through'\n            }}>56px</span> large</div>\n            <div>60px huge</div>\n          </div>\n          <div className=\"jk-row gap block\" style={{\n          width: 500\n        }}>\n            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)}>\n              click me\n            </ButtonLoader>\n            <ButtonLoader {...args} onClick={onClick(Status.ERROR)}>\n              click me\n            </ButtonLoader>\n          </div>\n          <div className=\"jk-row gap\">\n            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)} icon={<EventIcon />} />\n          </div>\n          <div className=\"jk-row gap\">\n            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)}>\n              click me\n            </ButtonLoader>\n            <ButtonLoader {...args} onClick={onClick(Status.NONE)} icon={<EyeInvisibleIcon />}>\n              click me\n            </ButtonLoader>\n            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)} icon={<EyeInvisibleIcon />}>\n              click me\n            </ButtonLoader>\n            <ButtonLoader {...args} onClick={onClick(Status.ERROR)} icon={<EyeInvisibleIcon />}>\n              click me\n            </ButtonLoader>\n            <div style={{\n            width: 200\n          }}>\n              <ButtonLoader {...args} onClick={onClick(Status.ERROR)} icon={<EyeInvisibleIcon />}>\n                large text text text\n              </ButtonLoader>\n            </div>\n            <ButtonLoader {...restArgs} onClick={onClick(Status.ERROR)} icon={<EyeInvisibleIcon />} responsive>\n              responsive\n            </ButtonLoader>\n          </div>\n        </div>\n      </MockupJukiProvider>;\n  }\n}",...Regular.parameters?.docs?.source}}};const __namedExportsOrder=["Regular"]}}]);