"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2580],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action,qp:()=>configureActions});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./src/components/atoms/images/Images.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_mockup__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/mockup/index.ts")),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/images/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_3__.rf},Regular={render:args=>{const images={FlagEnImage:___WEBPACK_IMPORTED_MODULE_3__.rf,FlagEsImage:___WEBPACK_IMPORTED_MODULE_3__.e0,JukiCouchLogoHorImage:___WEBPACK_IMPORTED_MODULE_3__.h5,JukiCouchLogoVerImage:___WEBPACK_IMPORTED_MODULE_3__.tv,JukiCompleteLaptopImage:___WEBPACK_IMPORTED_MODULE_3__.mU,JukiHeadImage:___WEBPACK_IMPORTED_MODULE_3__.Tm,JukiCourtImage:___WEBPACK_IMPORTED_MODULE_3__.eE,JukiJudgeLogoHorImage:___WEBPACK_IMPORTED_MODULE_3__.On,JukiJudgeLogoVerImage:___WEBPACK_IMPORTED_MODULE_3__.S$,JukiLaptopImage:___WEBPACK_IMPORTED_MODULE_3__.VU,JukiUtilsLogoHorImage:___WEBPACK_IMPORTED_MODULE_3__.u2,JukiSurprisedImage:___WEBPACK_IMPORTED_MODULE_3__.CZ};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_2__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{color:"#164066",backgroundColor:"#F0F2F5"},className:"jk-col",children:Object.entries(images).sort(((_ref,_ref2)=>{let[iconName1]=_ref,[iconName2]=_ref2;return iconName1.localeCompare(iconName2)})).map((_ref3=>{let[iconName,Component]=_ref3;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row nowrap center block",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"200px",height:"200px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Component,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.A)({},args))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"tx-t cr-g1",style:{width:140},children:iconName})]})}))})})}};Regular.args={onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onClick")};const __namedExportsOrder=["Regular"];Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:'{\n  render: args => {\n    const images = {\n      FlagEnImage,\n      FlagEsImage,\n      JukiCouchLogoHorImage,\n      JukiCouchLogoVerImage,\n      JukiCompleteLaptopImage,\n      JukiHeadImage,\n      JukiCourtImage,\n      JukiJudgeLogoHorImage,\n      JukiJudgeLogoVerImage,\n      JukiLaptopImage,\n      JukiUtilsLogoHorImage,\n      JukiSurprisedImage\n    };\n    return <MockupJukiProvider>\n        <div style={{\n        color: "#164066",\n        backgroundColor: "#F0F2F5"\n      }} className="jk-col">\n          {Object.entries(images).sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2)).map(([iconName, Component]) => <div className="jk-row nowrap center block">\n                <div style={{\n            width: "200px",\n            height: "200px"\n          }}>\n                  <Component {...args} />\n                </div>\n                <div className="tx-t cr-g1" style={{\n            width: 140\n          }}>\n                  {iconName}\n                </div>\n              </div>)}\n        </div>\n      </MockupJukiProvider>;\n  }\n}',...Regular.parameters?.docs?.source}}}}}]);