"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2848],{"./src/components/molecules/InputColor/InputColor.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InputColor:()=>InputColor});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),react_color__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-color/es/index.js"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const InputColor=_ref=>{let{color,children,onChange,label}=_ref;const[newColor,setNewColor]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(color||{hex:"#000000",rgb:{a:1,b:0,g:0,r:0},hsl:{a:1,h:240,l:0,s:0}});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.AMh,{content:_ref2=>{let{onClose}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"color-picker-layout jk-pg-sm",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_color__WEBPACK_IMPORTED_MODULE_2__.Xq,{color:null==newColor?void 0:newColor.hex,onChangeComplete:colorResult=>setNewColor(colorResult),presetColors:[..._juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.CJv.CLAROS,..._juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.CJv.VIVOS,..._juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.CJv.AGRISADOS,..._juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.CJv.OSCUROS]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{onClick:()=>{newColor&&(null==onChange||onChange(newColor)),onClose()},extend:!0,size:"small",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.T,{children:"pick"})})]})},triggerOn:"click",placement:"bottom",showPopperArrow:!0,children:children||(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.pde,{onChange:()=>null,value:(null==color?void 0:color.hex)||"",label})})})};try{InputColor.displayName="InputColor",InputColor.__docgenInfo={description:"",displayName:"InputColor",props:{color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"ColorResult"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((newColor: ColorResult) => void)"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | ReactElement<({ className, children }: TProps) => Element, string | JSXElementConstructor<any>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/InputColor/InputColor.tsx#InputColor"]={docgenInfo:InputColor.__docgenInfo,name:"InputColor",path:"src/components/molecules/InputColor/InputColor.tsx#InputColor"})}catch(__react_docgen_typescript_loader_error){}}}]);