"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2398],{"./src/components/atoms/Collapse/Collapse.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_mockup__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/mockup/index.ts")),_icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/icons/index.tsx"),_index__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/Collapse/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_3__.S},Regular={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_mockup__WEBPACK_IMPORTED_MODULE_1__.A,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.S,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.A)({},args),{},{header:_ref=>{let{isOpen,toggle}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row center gap bc-ss",children:["Collapse Header",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{onClick:toggle,className:"bc-er jk-row",children:["Click me",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.Hd_,{rotate:isOpen?0:180,className:"link"})]})]})},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{background:"blue"},children:["Texto Collapsable",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"})]})}))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-row left",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.S,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.A)({},args),{},{header:_ref2=>{let{isOpen,toggle}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-row center gap bc-ss",children:["Collapse ROW Header",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{onClick:toggle,className:"bc-er jk-row",children:["Click me",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.Hd_,{rotate:isOpen?0:180,className:"link"})]})]})},direction:"row",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{style:{background:"blue"},children:["Texto Collapsable",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"Texto Collapsable"})]})}))})]})},__namedExportsOrder=["Regular"];Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:"{\n  render: args => <MockupJukiProvider>\n      <div>\n        <Collapse {...args} header={({\n        isOpen,\n        toggle /* isFullyOpened, isFullyClosed*/\n      }) => <div className=\"jk-row center gap bc-ss\">\n              Collapse Header\n              <div>\n                {/*{!isFullyClosed && !isFullyOpened ? 'transition' : null}*/}\n                {/*{isFullyClosed ? 'fully-closed' : null}*/}\n                {/*{isFullyOpened ? 'fully-opened' : null}*/}\n              </div>\n              <div onClick={toggle} className=\"bc-er jk-row\">\n                Click me\n                <UpIcon rotate={isOpen ? 0 : 180} className=\"link\" />\n              </div>\n            </div>}>\n          <div style={{\n          background: 'blue'\n        }}>\n            Texto Collapsable\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n          </div>\n        </Collapse>\n      </div>\n      <div className=\"jk-row left\">\n        <Collapse {...args} header={({\n        isOpen,\n        toggle /* isFullyOpened, isFullyClosed*/\n      }) => <div className=\"jk-row center gap bc-ss\">\n              Collapse ROW Header\n              <div>\n                {/*{!isFullyClosed && !isFullyOpened ? 'transition' : null}*/}\n                {/*{isFullyClosed ? 'fully-closed' : null}*/}\n                {/*{isFullyOpened ? 'fully-opened' : null}*/}\n              </div>\n              <div onClick={toggle} className=\"bc-er jk-row\">\n                Click me\n                <UpIcon rotate={isOpen ? 0 : 180} className=\"link\" />\n              </div>\n            </div>} direction=\"row\">\n          <div style={{\n          background: 'blue'\n        }}>\n            Texto Collapsable\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n            <div>Texto Collapsable</div>\n          </div>\n        </Collapse>\n      </div>\n    </MockupJukiProvider>\n}",...Regular.parameters?.docs?.source}}}}}]);