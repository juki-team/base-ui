"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3013],{"./src/components/atoms/icons/specials/Specials.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Regular:()=>Regular,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_mockup__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/mockup/index.ts"),_molecules__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/molecules/index.ts"),_inputs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/inputs/index.ts"),_Select__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/Select/index.ts"),_specials__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/atoms/icons/specials/index.ts"),_SortIcon__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/atoms/icons/specials/SortIcon.tsx"),_Spin__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/atoms/icons/specials/Spin/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_specials__WEBPACK_IMPORTED_MODULE_5__.a4},Regular=args=>{const icons={TelegramIcon:_specials__WEBPACK_IMPORTED_MODULE_5__.hZ,GmailIcon:_specials__WEBPACK_IMPORTED_MODULE_5__.a4},[color,setColor]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({hex:"",hsl:{h:0,s:0,l:0},rgb:{r:0,g:0,b:0}}),[percent,setPercent]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[speed,setSpeed]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("regular");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_mockup__WEBPACK_IMPORTED_MODULE_1__.A,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3",{children:"BalloonIcon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"jk-row block gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"jk-row gap extend nowrap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_molecules__WEBPACK_IMPORTED_MODULE_2__.uF,{color,onChange:setColor,label:"color"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_inputs__WEBPACK_IMPORTED_MODULE_3__.pd,{type:"number",onChange:setPercent,value:percent,label:"percent"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_specials__WEBPACK_IMPORTED_MODULE_5__.bj,{percent,...args})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-divider"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row block gap",children:Object.entries(icons).sort(((_ref,_ref2)=>{let[iconName1]=_ref,[iconName2]=_ref2;return iconName1.localeCompare(iconName2)})).map((_ref3=>{let[iconName,Component]=_ref3;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"jk-row gap nowrap center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Component,{...args}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"tx-t cr-g1",style:{width:140},children:iconName})]})}))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-divider"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3",{children:"SpinIcon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"jk-row block gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row extend nowrap",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Select__WEBPACK_IMPORTED_MODULE_4__.l,{options:["none","slow","regular","fast"].map((speed=>({label:speed,value:speed}))),selectedOption:{value:speed},onChange:_ref4=>{let{value}=_ref4;return setSpeed(value)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Spin__WEBPACK_IMPORTED_MODULE_7__.G,{speed,...args})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3",{children:"SpinIcon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div",{className:"jk-row block gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SortIcon__WEBPACK_IMPORTED_MODULE_6__.y,{...args})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SortIcon__WEBPACK_IMPORTED_MODULE_6__.y,{...args,up:!0})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SortIcon__WEBPACK_IMPORTED_MODULE_6__.y,{...args,down:!0})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div",{className:"jk-row",style:{color:color.hex},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_SortIcon__WEBPACK_IMPORTED_MODULE_6__.y,{...args,up:!0,down:!0})})]})]})},__namedExportsOrder=["Regular"];Regular.parameters={...Regular.parameters,docs:{...Regular.parameters?.docs,source:{originalSource:'args => {\n  const icons = {\n    TelegramIcon,\n    GmailIcon\n  };\n  const [color, setColor] = useState<ColorResult>({\n    hex: \'\',\n    hsl: {\n      h: 0,\n      s: 0,\n      l: 0\n    },\n    rgb: {\n      r: 0,\n      g: 0,\n      b: 0\n    }\n  });\n  const [percent, setPercent] = useState<number | undefined>();\n  const [speed, setSpeed] = useState<SpinIconProps[\'speed\']>(\'regular\');\n  return <MockupJukiProvider>\n      <h3>BalloonIcon</h3>\n      <div className="jk-row block gap">\n        <div className="jk-row gap extend nowrap">\n          <InputColor color={color} onChange={setColor} label="color" />\n          <Input type="number" onChange={setPercent} value={percent} label="percent" />\n        </div>\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <BalloonIcon percent={percent} {...args} />\n        </div>\n      </div>\n      <div className="jk-divider" />\n      <div className="jk-row block gap">\n        {Object.entries(icons).sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2)).map(([iconName, Component]) => <div className="jk-row gap nowrap center">\n              <Component {...args} />\n              <div className="tx-t cr-g1" style={{\n          width: 140\n        }}>\n                {iconName}\n              </div>\n            </div>)}\n      </div>\n      <div className="jk-divider" />\n      <h3>SpinIcon</h3>\n      <div className="jk-row block gap">\n        <div className="jk-row extend nowrap">\n          <Select options={[\'none\', \'slow\', \'regular\', \'fast\'].map(speed => ({\n          label: speed,\n          value: speed\n        }))} selectedOption={{\n          value: speed\n        }} onChange={({\n          value\n        }) => setSpeed(value as SpinIconProps[\'speed\'])} />\n        </div>\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <SpinIcon speed={speed} {...args} />\n        </div>\n      </div>\n      <h3>SpinIcon</h3>\n      <div className="jk-row block gap">\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <SortIcon {...args} />\n        </div>\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <SortIcon {...args} up />\n        </div>\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <SortIcon {...args} down />\n        </div>\n        <div className="jk-row" style={{\n        color: color.hex\n      }}>\n          <SortIcon {...args} up down />\n        </div>\n      </div>\n    </MockupJukiProvider>;\n}',...Regular.parameters?.docs?.source}}};try{Regular.displayName="Regular",Regular.__docgenInfo={description:"",displayName:"Regular",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLSpanElement>"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"huge"'},{value:'"large"'},{value:'"regular"'},{value:'"small"'},{value:'"tiny"'},{value:'"very-huge"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},viewBox:{defaultValue:null,description:"",name:"viewBox",required:!1,type:{name:"string"}},letter:{defaultValue:null,description:"",name:"letter",required:!1,type:{name:"string"}},rotate:{defaultValue:null,description:"",name:"rotate",required:!1,type:{name:"number"}},circle:{defaultValue:null,description:"",name:"circle",required:!1,type:{name:"true | locked"}},square:{defaultValue:null,description:"",name:"square",required:!1,type:{name:"true | locked"}},filledCircle:{defaultValue:null,description:"",name:"filledCircle",required:!1,type:{name:"string | true | locked"}},filledSquare:{defaultValue:null,description:"",name:"filledSquare",required:!1,type:{name:"string | true | locked"}},strikethrough:{defaultValue:null,description:"",name:"strikethrough",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/icons/specials/Specials.stories.tsx#Regular"]={docgenInfo:Regular.__docgenInfo,name:"Regular",path:"src/components/atoms/icons/specials/Specials.stories.tsx#Regular"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/atoms/icons/specials/SortIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>SortIcon});__webpack_require__("./node_modules/react/index.js");var _utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/icons/utils/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const SortIcon=_ref3=>{let{up,down,...props}=_ref3;return(0,_utils__WEBPACK_IMPORTED_MODULE_1__.C2)({...props,viewBox:"0 -960 960 960"},(_ref=>{let{up,down}=_ref;return _ref2=>{let{color}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{fill:up?color:"var(--t-color-highlight-light)",d:"M305.87-438.87v-257.61l-90 90-75.09-74.09 218.09-218.65 218.09 218.65-75.09 74.09-90-90v257.61h-106Z"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{fill:down?color:"var(--t-color-highlight-light)",d:"M601.13-60.78 383.04-279.43l75.09-74.09 90 90v-257.61h106v257.61l90-90 75.09 74.09L601.13-60.78Z"})]})}})({up,down}),"pending")};try{SortIcon.displayName="SortIcon",SortIcon.__docgenInfo={description:"",displayName:"SortIcon",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLSpanElement>"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"huge"'},{value:'"large"'},{value:'"regular"'},{value:'"small"'},{value:'"tiny"'},{value:'"very-huge"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},viewBox:{defaultValue:null,description:"",name:"viewBox",required:!1,type:{name:"string"}},letter:{defaultValue:null,description:"",name:"letter",required:!1,type:{name:"string"}},rotate:{defaultValue:null,description:"",name:"rotate",required:!1,type:{name:"number"}},circle:{defaultValue:null,description:"",name:"circle",required:!1,type:{name:"true | locked"}},square:{defaultValue:null,description:"",name:"square",required:!1,type:{name:"true | locked"}},filledCircle:{defaultValue:null,description:"",name:"filledCircle",required:!1,type:{name:"string | true | locked"}},filledSquare:{defaultValue:null,description:"",name:"filledSquare",required:!1,type:{name:"string | true | locked"}},strikethrough:{defaultValue:null,description:"",name:"strikethrough",required:!1,type:{name:"boolean"}},up:{defaultValue:null,description:"",name:"up",required:!1,type:{name:"boolean"}},down:{defaultValue:null,description:"",name:"down",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/icons/specials/SortIcon.tsx#SortIcon"]={docgenInfo:SortIcon.__docgenInfo,name:"SortIcon",path:"src/components/atoms/icons/specials/SortIcon.tsx#SortIcon"})}catch(__react_docgen_typescript_loader_error){}}}]);