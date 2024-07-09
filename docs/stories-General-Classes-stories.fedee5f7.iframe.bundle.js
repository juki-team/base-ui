"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[7046],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>action,Ip:()=>configureActions});var v4=__webpack_require__("./node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("@storybook/core-events/preview-errors"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}},"./src/stories/General/Classes.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_components_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/mockup/MockupToggleThemeButton.tsx")),_index__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_3__.mQc};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.Ip)({depth:100,limit:20});const Regular={render:args=>{const tabs=[{key:"1",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"rows"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"displaying rows"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"works correctly when container has height and width defined"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row gap",children:["jk-row","jk-row extend","jk-row left","jk-row center","jk-row right","jk-row space-between","jk-row block","jk-row stretch","jk-row block stretch","jk-row left top","jk-row left bottom","jk-row center top","jk-row center bottom","jk-row right top","jk-row right bottom"].map((col=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col elevation-1 jk-pg-md jk-border-radius-inline cr-we",style:{width:"420px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{className:"cr-g1",children:['"',col,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:250,height:60},className:"bc-g6 fw-br",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:col,style:{outline:"2px solid red",width:220,height:50},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid red"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"red"},children:"1"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid blue"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"blue"},children:"2"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid green"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"green"},children:"2"})})]})})]},col)))})]})},{key:"2",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"columns"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"displaying columns"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"works correctly when container has height and width defined"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row gap",children:["jk-col","jk-col extend","jk-col top","jk-col center","jk-col bottom","jk-col space-between","jk-col block","jk-col stretch","jk-col block stretch","jk-col top left","jk-col top right","jk-col center left","jk-col center right","jk-col bottom left","jk-col bottom right"].map((col=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap elevation-1 jk-pg-md jk-border-radius-inline cr-we",style:{width:"320px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{className:"cr-g1",children:['"',col,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:80,height:150},className:"bc-g6 fw-br",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:col,style:{outline:"2px solid red",width:70,height:120},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid red"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"red"},children:"1"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid blue"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"blue"},children:"2"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{border:"4px solid green"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{width:"50px",height:"20px",background:"green"},children:"2"})})]})})]},col)))})]})},{key:"3",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"color"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"color"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row gap",children:["cr-g1","cr-g2","cr-g3","cr-g4","cr-g5","cr-g6","cr-we","cr-io","cr-ss","cr-wg","cr-er","cr-pl","cr-py","cr-pd","cr-sy","cr-al","cr-at","cr-ad"].map((color=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",style:{width:"140px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',color,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"fw-br "+color,children:"text"})]},color)))})]})},{key:"4",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"background color"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"background color"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row gap",children:["bc-g1","bc-g2","bc-g3","bc-g4","bc-g5","bc-g6","bc-we","bc-io","bc-ss","bc-wg","bc-er","bc-pl","bc-py","bc-pd","bc-sy","bc-al","bc-at","bc-ad"].map((color=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",style:{width:"140px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',color,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:color,children:" text "})]},color)))})]})},{key:"5",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"font size"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"Heading"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"Heading 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h2",{children:"Heading 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3",{children:"Heading 3"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-divider"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"font size"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row gap nowrap block stretch",children:[["tx-h",20],["tx-l",18],["tx-m",16],["tx-s",14],["tx-t",12]].map((_ref=>{let[className,size]=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("pre",{children:".".concat(className," {\n  font-size: ").concat(size,"px;\n  line-height: 24px;\n}")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]})}))})]})},{key:"6",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"font width"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"font width"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["fw-lr","fw-nl","fw-bd","fw-br"].map((width=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",style:{width:"140px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',width,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:width,children:" text "})]},width)))})]})},{key:"7",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"text transform"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"text transform"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["tt-se","tt-ce","tt-ue","tt-le"].map((tt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",style:{width:350},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"ws-np "+tt,children:" Lorem ipsum dolor sit amet "})]},tt)))})]})},{key:"8",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"text-align"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"text-align"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["ta-cr","ta-st","ta-ed"].map((tt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline",style:{width:420},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"ws-np "+tt,style:{width:400},children:" Lorem ipsum dolor sit amet "})]},tt)))})]})},{key:"10",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"elevation"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"text-align"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["elevation-1","elevation-2","elevation-3"].map((tt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap jk-pg-md jk-border-radius-inline",style:{width:420},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"ws-np "+tt,style:{width:400},children:" Lorem ipsum dolor sit amet "})]},tt)))})]})},{key:"11",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"tags"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"tags"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["accent-dark","accent","accent-light","success-dark","success","success-light","info-dark","info","info-light","warning-dark","warning","warning-light","error-dark","error","error-light","primary-dark","","primary-light","secondary-dark","secondary","secondary-light","gray-1","gray-2","gray-3","gray-4","gray-5","gray-6"].map((tt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap jk-pg-md jk-border-radius-inline",style:{width:420},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"jk-tag ',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-tag "+tt,children:"Lorem ipsum dolor sit amet"})]},tt)))})]})},{key:"12",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"padding"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1",{children:"padding"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-col gap",children:["t","r","l","b","tr","tb","tl","rb","rl","bl","trb","trl","rbl","trbl"].map((tt=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row gap nowrap jk-pg-md jk-border-radius-inline",style:{width:420},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"jk-pg-',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-g4 jk-pg-"+tt,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-io ws-np",children:"Lorem ipsum"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"jk-pg-sm-',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-g4 jk-pg-sm-"+tt,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-io ws-np",children:"Lorem ipsum"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"jk-pg-md-',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-g4 jk-pg-md-"+tt,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-io ws-np",children:"Lorem ipsum"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("pre",{children:['"jk-pg-lg-',tt,'"']}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-g4 jk-pg-lg-"+tt,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"bc-io ws-np",children:"Lorem ipsum"})})]})]},tt)))})]})},{key:"13",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"dot dot-flashing"}),body:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-pg-md",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"dot-flashing"})})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{height:"500px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.mQc,{tabs}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_mockup_MockupToggleThemeButton__WEBPACK_IMPORTED_MODULE_2__.O,{})]})}};Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: args => {\n    const tabs = [{\n      key: '1',\n      header: <div>rows</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>displaying rows</h1>\n            <p>works correctly when container has height and width defined</p>\n            <div className=\"jk-row gap\">\n              {['jk-row', 'jk-row extend', 'jk-row left', 'jk-row center', 'jk-row right', 'jk-row space-between', 'jk-row block', 'jk-row stretch', 'jk-row block stretch', 'jk-row left top', 'jk-row left bottom', 'jk-row center top', 'jk-row center bottom', 'jk-row right top', 'jk-row right bottom'].map(col => <div className=\"jk-col elevation-1 jk-pg-md jk-border-radius-inline cr-we\" style={{\n            width: '420px'\n          }} key={col}>\n                  <pre className=\"cr-g1\">\"{col}\"</pre>\n                  <div style={{\n              width: 250,\n              height: 60\n            }} className=\"bc-g6 fw-br\">\n                    <div className={col} style={{\n                outline: '2px solid red',\n                width: 220,\n                height: 50\n              }}>\n                      <div style={{\n                  border: '4px solid red'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'red'\n                  }}>\n                          1\n                        </div>\n                      </div>\n                      <div style={{\n                  border: '4px solid blue'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'blue'\n                  }}>\n                          2\n                        </div>\n                      </div>\n                      <div style={{\n                  border: '4px solid green'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'green'\n                  }}>\n                          2\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '2',\n      header: <div>columns</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>displaying columns</h1>\n            <p>works correctly when container has height and width defined</p>\n            <div className=\"jk-row gap\">\n              {['jk-col', 'jk-col extend', 'jk-col top', 'jk-col center', 'jk-col bottom', 'jk-col space-between', 'jk-col block', 'jk-col stretch', 'jk-col block stretch', 'jk-col top left', 'jk-col top right', 'jk-col center left', 'jk-col center right', 'jk-col bottom left', 'jk-col bottom right'].map(col => <div className=\"jk-row gap elevation-1 jk-pg-md jk-border-radius-inline cr-we\" style={{\n            width: '320px'\n          }} key={col}>\n                  <pre className=\"cr-g1\">\"{col}\"</pre>\n                  <div style={{\n              width: 80,\n              height: 150\n            }} className=\"bc-g6 fw-br\">\n                    <div className={col} style={{\n                outline: '2px solid red',\n                width: 70,\n                height: 120\n              }}>\n                      <div style={{\n                  border: '4px solid red'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'red'\n                  }}>\n                          1\n                        </div>\n                      </div>\n                      <div style={{\n                  border: '4px solid blue'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'blue'\n                  }}>\n                          2\n                        </div>\n                      </div>\n                      <div style={{\n                  border: '4px solid green'\n                }}>\n                        <div style={{\n                    width: '50px',\n                    height: '20px',\n                    background: 'green'\n                  }}>\n                          2\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '3',\n      header: <div>color</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>color</h1>\n            <div className=\"jk-row gap\">\n              {['cr-g1', 'cr-g2', 'cr-g3', 'cr-g4', 'cr-g5', 'cr-g6', 'cr-we', 'cr-io', 'cr-ss', 'cr-wg', 'cr-er', 'cr-pl', 'cr-py', 'cr-pd', 'cr-sy', 'cr-al', 'cr-at', 'cr-ad'].map(color => <div className=\"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\" style={{\n            width: '140px'\n          }} key={color}>\n                  <pre>\"{color}\"</pre>\n                  <div className={'fw-br ' + color}>text</div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '4',\n      header: <div>background color</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>background color</h1>\n            <div className=\"jk-row gap\">\n              {['bc-g1', 'bc-g2', 'bc-g3', 'bc-g4', 'bc-g5', 'bc-g6', 'bc-we', 'bc-io', 'bc-ss', 'bc-wg', 'bc-er', 'bc-pl', 'bc-py', 'bc-pd', 'bc-sy', 'bc-al', 'bc-at', 'bc-ad'].map(color => <div className=\"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\" style={{\n            width: '140px'\n          }} key={color}>\n                  <pre>\"{color}\"</pre>\n                  <div className={color}>&nbsp;text&nbsp;</div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '5',\n      header: <div>font size</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>Heading</h1>\n            <div className=\"jk-col gap\">\n              <h1>Heading 1</h1>\n              <h2>Heading 2</h2>\n              <h3>Heading 3</h3>\n            </div>\n            <div className=\"jk-divider\" />\n            <h1>font size</h1>\n            <div className=\"jk-row gap nowrap block stretch\">\n              {[['tx-h', 20], ['tx-l', 18], ['tx-m', 16], ['tx-s', 14], ['tx-t', 12]].map(([className, size]) => <div className=\"jk-col gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\">\n                <pre>\n                  {`.${className} {\\n  font-size: ${size}px;\\n  line-height: 24px;\\n}`}\n                </pre>\n                  <div className={(className as string)}>\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\n                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '6',\n      header: <div>font width</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>font width</h1>\n            <div className=\"jk-col gap\">\n              {['fw-lr', 'fw-nl', 'fw-bd', 'fw-br'].map(width => <div className=\"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\" style={{\n            width: '140px'\n          }} key={width}>\n                  <pre>\"{width}\"</pre>\n                  <div className={width}>&nbsp;text&nbsp;</div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '7',\n      header: <div>text transform</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>text transform</h1>\n            <div className=\"jk-col gap\">\n              {['tt-se', 'tt-ce', 'tt-ue', 'tt-le'].map(tt => <div className=\"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\" style={{\n            width: 350\n          }} key={tt}>\n                  <pre>\"{tt}\"</pre>\n                  <div className={'ws-np ' + tt}>\n                    &nbsp;Lorem ipsum dolor sit amet&nbsp;\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '8',\n      header: <div>text-align</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>text-align</h1>\n            <div className=\"jk-col gap\">\n              {['ta-cr', 'ta-st', 'ta-ed'].map(tt => <div className=\"jk-row gap nowrap elevation-1 jk-pg-md jk-border-radius-inline\" style={{\n            width: 420\n          }} key={tt}>\n                  <pre>\"{tt}\"</pre>\n                  <div className={'ws-np ' + tt} style={{\n              width: 400\n            }}>\n                    &nbsp;Lorem ipsum dolor sit amet&nbsp;\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '10',\n      header: <div>elevation</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>text-align</h1>\n            <div className=\"jk-col gap\">\n              {['elevation-1', 'elevation-2', 'elevation-3'].map(tt => <div className=\"jk-row gap nowrap jk-pg-md jk-border-radius-inline\" style={{\n            width: 420\n          }} key={tt}>\n                  <pre>\"{tt}\"</pre>\n                  <div className={'ws-np ' + tt} style={{\n              width: 400\n            }}>\n                    &nbsp;Lorem ipsum dolor sit amet&nbsp;\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '11',\n      header: <div>tags</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>tags</h1>\n            <div className=\"jk-col gap\">\n              {['accent-dark', 'accent', 'accent-light', 'success-dark', 'success', 'success-light', 'info-dark', 'info', 'info-light', 'warning-dark', 'warning', 'warning-light', 'error-dark', 'error', 'error-light', 'primary-dark', '', 'primary-light', 'secondary-dark', 'secondary', 'secondary-light', 'gray-1', 'gray-2', 'gray-3', 'gray-4', 'gray-5', 'gray-6'].map(tt => <div className=\"jk-row gap nowrap jk-pg-md jk-border-radius-inline\" style={{\n            width: 420\n          }} key={tt}>\n                  <pre>\"jk-tag {tt}\"</pre>\n                  <div className={'jk-tag ' + tt}>Lorem ipsum dolor sit amet</div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '12',\n      header: <div>padding</div>,\n      body: <div className=\"jk-col gap\">\n            <h1>padding</h1>\n            <div className=\"jk-col gap\">\n              {['t', 'r', 'l', 'b', 'tr', 'tb', 'tl', 'rb', 'rl', 'bl', 'trb', 'trl', 'rbl', 'trbl'].map(tt => <div className=\"jk-row gap nowrap jk-pg-md jk-border-radius-inline\" style={{\n            width: 420\n          }} key={tt}>\n                  <div>\n                    <pre>\"jk-pg-{tt}\"</pre>\n                    <div className={'bc-g4 jk-pg-' + tt}>\n                      <div className=\"bc-io ws-np\">Lorem ipsum</div>\n                    </div>\n                  </div>\n                  <div>\n                    <pre>\"jk-pg-sm-{tt}\"</pre>\n                    <div className={'bc-g4 jk-pg-sm-' + tt}>\n                      <div className=\"bc-io ws-np\">Lorem ipsum</div>\n                    </div>\n                  </div>\n                  <div>\n                    <pre>\"jk-pg-md-{tt}\"</pre>\n                    <div className={'bc-g4 jk-pg-md-' + tt}>\n                      <div className=\"bc-io ws-np\">Lorem ipsum</div>\n                    </div>\n                  </div>\n                  <div>\n                    <pre>\"jk-pg-lg-{tt}\"</pre>\n                    <div className={'bc-g4 jk-pg-lg-' + tt}>\n                      <div className=\"bc-io ws-np\">Lorem ipsum</div>\n                    </div>\n                  </div>\n                </div>)}\n            </div>\n          </div>\n    }, {\n      key: '13',\n      header: <div>dot dot-flashing</div>,\n      body: <div className=\"jk-pg-md\">\n            <div className=\"dot-flashing\" />\n          </div>\n    }];\n    return <div style={{\n      height: '500px'\n    }}>\n        <TabsComponent tabs={tabs} />\n        <MockupToggleThemeButton />\n      </div>;\n  }\n}",...Regular.parameters?.docs?.source}}};const __namedExportsOrder=["Regular"]},"./src/components/mockup/MockupToggleThemeButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>MockupToggleThemeButton});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const MockupToggleThemeButton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{position:"absolute",right:0,bottom:10,zIndex:1e7},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.zxk,{onClick:()=>{document.documentElement.classList.contains("jk-theme-dark")?(document.documentElement.classList.remove("jk-theme-dark"),document.documentElement.classList.add("jk-theme-light")):(document.documentElement.classList.remove("jk-theme-light"),document.documentElement.classList.add("jk-theme-dark"))},icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.uQp,{})})})},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AGT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.AGT,BNd:()=>_components__WEBPACK_IMPORTED_MODULE_0__.BNd,D2S:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D2S,D_J:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D_J,FjN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.FjN,HNe:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HNe,HoD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HoD,J2e:()=>_components__WEBPACK_IMPORTED_MODULE_0__.J2e,Kk2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Kk2,L_A:()=>_hooks__WEBPACK_IMPORTED_MODULE_5__.Nr,MlT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.MlT,NA2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.NA2,RrP:()=>_components__WEBPACK_IMPORTED_MODULE_0__.RrP,SI8:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SI8,SVk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SVk,Sd5:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sd5,T:()=>_components__WEBPACK_IMPORTED_MODULE_0__.T,VRu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VRu,V_R:()=>_components__WEBPACK_IMPORTED_MODULE_0__.V_R,VjU:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VjU,VqK:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VqK,WB6:()=>_components__WEBPACK_IMPORTED_MODULE_0__.WB6,Xmx:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Xmx,YAN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.YAN,Z3Q:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Z3Q,Zi2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Zi2,_nC:()=>_components__WEBPACK_IMPORTED_MODULE_0__._nC,aPz:()=>_components__WEBPACK_IMPORTED_MODULE_0__.aPz,cNY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.cNY,dPH:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dPH,dys:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dys,e0j:()=>_components__WEBPACK_IMPORTED_MODULE_0__.e0j,ewm:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ewm,hQu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hQu,hvX:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hvX,jje:()=>_components__WEBPACK_IMPORTED_MODULE_0__.jje,kDs:()=>_components__WEBPACK_IMPORTED_MODULE_0__.kDs,lbA:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lbA,mQc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mQc,mbe:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mbe,nRN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.nRN,pOD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pOD,qQW:()=>_components__WEBPACK_IMPORTED_MODULE_0__.qQW,rG2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.rG2,t8m:()=>_components__WEBPACK_IMPORTED_MODULE_0__.t8m,xIZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xIZ,xLV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xLV,xNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xNc,z1y:()=>_components__WEBPACK_IMPORTED_MODULE_0__.z1y,zxk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.zxk});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./src/config/index.tsx"),__webpack_require__("./src/constants/index.ts"),__webpack_require__("./src/contexts/index.tsx"),__webpack_require__("./src/helpers/index.ts"),__webpack_require__("./src/hooks/index.ts"));__webpack_require__("./src/modules/index.ts"),__webpack_require__("./src/types/index.ts")}}]);