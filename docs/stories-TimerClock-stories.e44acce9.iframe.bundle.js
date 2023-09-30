"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[213],{"./node_modules/@storybook/addon-actions/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{aD:function(){return chunk_OPEUWD42.aD},Ip:function(){return chunk_OPEUWD42.Ip}});var chunk_OPEUWD42=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-OPEUWD42.mjs")},"./src/stories/TimerClock.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{PopoverNormal:function(){return PopoverNormal},__namedExportsOrder:function(){return __namedExportsOrder}});var _PopoverNormal$parame,_PopoverNormal$parame2,_PopoverNormal$parame3,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_index__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/index.ts")),_ToggleThemeButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/ToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Components/TimerClock",component:_index__WEBPACK_IMPORTED_MODULE_2__.Ldu,argTypes:{}},(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.Ip)({depth:100,limit:20});var PopoverNormal=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3",{children:"TimerClock"}),[15e3,0,-3e4].map((function(startTimestamp){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Ldu,{startDate:new Date(Date.now()+startTimestamp),endDate:new Date(Date.now()+startTimestamp+15e3),laps:7})})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Ldu,{endDate:new Date(Date.now()-15e3),startDate:new Date(Date.now()+15e3),laps:7}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3",{children:"laps 4"}),[15e3,0,-3e4].map((function(startTimestamp){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Ldu,{startDate:new Date(Date.now()+startTimestamp),endDate:new Date(Date.now()+startTimestamp+15e3),laps:4})})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Ldu,{endDate:new Date(Date.now()-15e3),startDate:new Date(Date.now()+15e3),laps:4}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3",{children:"Timer"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:-1,currentTimestamp:1e4,laps:7}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:-1,currentTimestamp:6e5}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:-1,currentTimestamp:6e4,laps:1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:-1,currentTimestamp:94608e8,laps:7}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:1,currentTimestamp:94608e8,laps:7}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:1,currentTimestamp:6e5,laps:7}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.B7y,{interval:-1,currentTimestamp:6e5,literal:!0,laps:2}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ToggleThemeButton__WEBPACK_IMPORTED_MODULE_3__.M,{})]})}.bind({});PopoverNormal.args={},PopoverNormal.parameters=(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},PopoverNormal.parameters),{},{docs:(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({},null===(_PopoverNormal$parame=PopoverNormal.parameters)||void 0===_PopoverNormal$parame?void 0:_PopoverNormal$parame.docs),{},{source:(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__.Z)({originalSource:"args => {\n  return <div>\n      <h3>TimerClock</h3>\n      {[15 * 1000, 0, -30 * 1000].map(startTimestamp => <TimerLabeled startDate={new Date(Date.now() + startTimestamp)} endDate={new Date(Date.now() + startTimestamp + 15 * 1000)} laps={7} />)}\n      <TimerLabeled endDate={new Date(Date.now() - 15 * 1000)} startDate={new Date(Date.now() + 15 * 1000)} laps={7} />\n      <h3>laps 4</h3>\n      {[15 * 1000, 0, -30 * 1000].map(startTimestamp => <TimerLabeled startDate={new Date(Date.now() + startTimestamp)} endDate={new Date(Date.now() + startTimestamp + 15 * 1000)} laps={4} />)}\n      <TimerLabeled endDate={new Date(Date.now() - 15 * 1000)} startDate={new Date(Date.now() + 15 * 1000)} laps={4} />\n      <h3>Timer</h3>\n      <Timer interval={-1} currentTimestamp={10 * 1000} laps={7} />\n      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} />\n      <Timer interval={-1} currentTimestamp={60 * 1000} laps={1} />\n      <Timer interval={-1} currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000} laps={7} />\n      <Timer interval={1} currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000} laps={7} />\n      <Timer interval={1} currentTimestamp={10 * 60 * 1000} laps={7} />\n      \n      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} literal laps={2} />\n      <ToggleThemeButton />\n    </div>;\n}"},null===(_PopoverNormal$parame2=PopoverNormal.parameters)||void 0===_PopoverNormal$parame2||null===(_PopoverNormal$parame3=_PopoverNormal$parame2.docs)||void 0===_PopoverNormal$parame3?void 0:_PopoverNormal$parame3.source)})});var __namedExportsOrder=["PopoverNormal"]}}]);