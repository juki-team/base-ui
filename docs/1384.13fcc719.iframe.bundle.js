"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[1384,1385],{"./src/components/molecules/timers/Timer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Timer:()=>Timer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_hooks_custom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/custom.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/timers/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Timer=react__WEBPACK_IMPORTED_MODULE_0__.memo((props=>{const{currentTimestamp,laps=3,interval=1,literal,ignoreLeadingZeros=!1,ignoreTrailingZeros=!1}=props,[counter,setCounter]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({remaining:currentTimestamp,startTimestamp:0});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const slack=currentTimestamp%Math.abs(interval),startCounting=setTimeout((()=>{setCounter({remaining:currentTimestamp,startTimestamp:Date.now()})}),slack);return()=>{clearTimeout(startCounting)}}),[interval,currentTimestamp]),(0,_hooks_custom__WEBPACK_IMPORTED_MODULE_2__.$$)((()=>{const startTimestamp=Date.now();setCounter((prevState=>({startTimestamp,remaining:prevState.remaining-(interval<0?startTimestamp-prevState.startTimestamp:prevState.startTimestamp-startTimestamp)})))}),Math.abs(interval));const timeSplit=(0,_utils__WEBPACK_IMPORTED_MODULE_4__.E)(counter.remaining,laps,ignoreLeadingZeros,ignoreTrailingZeros);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-timer-layout jk-row nowrap",{literal:!!literal}),children:literal?timeSplit.map(((remaining,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[index>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"and"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{children:remaining.remaining}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:remaining.label})]},remaining.label))):timeSplit.map(((remaining,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"content-stamp",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"content-number tx-s fw-bd jk-row",children:remaining.remaining}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"content-label tx-t fw-bd tt-ue jk-row",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:remaining.label})})]}),index!==timeSplit.length-1&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span",{className:"content-dots tx-l fw-bd",children:":"})]},remaining.label)))})}));try{Timer.displayName="Timer",Timer.__docgenInfo={description:"",displayName:"Timer",props:{currentTimestamp:{defaultValue:null,description:"",name:"currentTimestamp",required:!0,type:{name:"number"}},laps:{defaultValue:null,description:"",name:"laps",required:!1,type:{name:"number"}},interval:{defaultValue:null,description:"",name:"interval",required:!1,type:{name:"number"}},literal:{defaultValue:null,description:"",name:"literal",required:!1,type:{name:"boolean"}},ignoreLeadingZeros:{defaultValue:null,description:"",name:"ignoreLeadingZeros",required:!1,type:{name:"boolean"}},ignoreTrailingZeros:{defaultValue:null,description:"",name:"ignoreTrailingZeros",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/timers/Timer.tsx#Timer"]={docgenInfo:Timer.__docgenInfo,name:"Timer",path:"src/components/molecules/timers/Timer.tsx#Timer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/timers/TimerLabeled.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TimerLabeled:()=>TimerLabeled});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),_Timer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/molecules/timers/Timer.tsx"),_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/molecules/timers/types.ts"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/molecules/timers/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DEFAULT_LABELS={[_types__WEBPACK_IMPORTED_MODULE_3__.a.FUTURE]:"stars in",[_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_START]:"starts ago",[_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_END]:"ends in",[_types__WEBPACK_IMPORTED_MODULE_3__.a.PAST]:"ended ago",[_types__WEBPACK_IMPORTED_MODULE_3__.a.TIME_OUT]:"time out",[_types__WEBPACK_IMPORTED_MODULE_3__.a.CALC]:"..."},TimerLabeled=_ref=>{let{startDate,endDate,currentDate,labels,laps:_laps=3}=_ref;const[time,setTime]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({period:_types__WEBPACK_IMPORTED_MODULE_3__.a.CALC,remaining:0,interval:0});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const current=currentDate||new Date;let period=_types__WEBPACK_IMPORTED_MODULE_3__.a.CALC,remaining=0,interval=0;startDate<current&&current<endDate?(period=_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_END,remaining=endDate.getTime()-current.getTime(),interval=-1):endDate<current&&current<startDate?(period=_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_START,remaining=current.getTime()-endDate.getTime(),interval=1):current<startDate?(period=_types__WEBPACK_IMPORTED_MODULE_3__.a.FUTURE,remaining=startDate.getTime()-current.getTime(),interval=-1):current>endDate&&(period=_types__WEBPACK_IMPORTED_MODULE_3__.a.PAST,remaining=current.getTime()-endDate.getTime(),interval=1),setTime({period,remaining,interval});const timeout=setTimeout((()=>{period!==_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_START&&period!==_types__WEBPACK_IMPORTED_MODULE_3__.a.LIVE_END&&period!==_types__WEBPACK_IMPORTED_MODULE_3__.a.FUTURE||setTime({period:_types__WEBPACK_IMPORTED_MODULE_3__.a.TIME_OUT,remaining:0,interval:0})}),remaining);return()=>{clearTimeout(timeout)}}),[currentDate,endDate,startDate]);const laps=Math.min(Math.max(0,_laps),6),myLabels=(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)((0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)({},DEFAULT_LABELS),labels),timeSplit=(0,_utils__WEBPACK_IMPORTED_MODULE_4__.E)(Math.max(time.remaining,0),laps,!1,!1),timeInterval=Math.max(timeSplit[timeSplit.length-1].milliseconds,1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"layout-timer-clock",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"label-period tx-s fw-bd",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.T,{children:myLabels[time.period]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Timer__WEBPACK_IMPORTED_MODULE_2__.Timer,{laps,currentTimestamp:time.remaining,interval:time.interval*timeInterval})]})};try{TimerLabeled.displayName="TimerLabeled",TimerLabeled.__docgenInfo={description:"",displayName:"TimerLabeled",props:{startDate:{defaultValue:null,description:"",name:"startDate",required:!0,type:{name:"Date"}},endDate:{defaultValue:null,description:"",name:"endDate",required:!0,type:{name:"Date"}},currentDate:{defaultValue:null,description:"",name:"currentDate",required:!1,type:{name:"Date"}},labels:{defaultValue:null,description:"",name:"labels",required:!1,type:{name:"{ FUTURE: string; LIVE_START: string; LIVE_END: string; PAST: string; CALC: string; TIME_OUT: string; }"}},laps:{defaultValue:null,description:"",name:"laps",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/timers/TimerLabeled.tsx#TimerLabeled"]={docgenInfo:TimerLabeled.__docgenInfo,name:"TimerLabeled",path:"src/components/molecules/timers/TimerLabeled.tsx#TimerLabeled"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/timers/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>cutTimeSplit});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js");const cutTimeSplit=(remaining,laps,ignoreLeadingZeros,ignoreTrailingZeros)=>{let timeSplit=(0,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.SBk)(Math.max(remaining,0));for(;timeSplit[0].remaining<=0&&timeSplit.length>laps;)timeSplit.shift();for(;ignoreLeadingZeros&&timeSplit.length&&0===timeSplit[0].remaining;)timeSplit.shift();for(;ignoreTrailingZeros&&timeSplit.length&&0===timeSplit[timeSplit.length-1].remaining;)timeSplit.pop();return timeSplit.splice(0,laps)}},"./src/hooks/custom.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$$:()=>useInterval,ZC:()=>usePrevious,_N:()=>useKeyPress,c7:()=>useOutsideAlerter});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useInterval(callback,delay){const savedCallback=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{savedCallback.current=callback}),[callback]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(delay){let id=setInterval((function tick(){savedCallback.current&&savedCallback.current()}),delay);return()=>clearInterval(id)}return()=>null}),[delay])}function useOutsideAlerter(clickOutside,ref){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{function handleClickOutside(event){ref.current&&!ref.current.contains(event.target)&&clickOutside(event)}return document.addEventListener("mousedown",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside)}}),[clickOutside,ref])}function usePrevious(value,initialValue){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialValue);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ref.current=value}),[value]),ref.current}function useKeyPress(handleKeyPress){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>(document.addEventListener("keydown",handleKeyPress),()=>{document.removeEventListener("keydown",handleKeyPress)})),[handleKeyPress])}}}]);