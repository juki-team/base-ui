"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9860],{"./src/components/molecules/CheckboxList/CheckboxList.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CheckboxList:()=>CheckboxList});__webpack_require__("./node_modules/react/index.js");var _atoms__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CheckboxList=_ref=>{let{selectedOptions,options,onSelectOptions}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"jk-checkbox-list jk-col stretch",children:options.map(((_ref2,index)=>{let{value,label}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_1__.GLC,{onChange:()=>{selectedOptions.find((option=>option.value===value))?onSelectOptions(selectedOptions.filter((option=>JSON.stringify(option.value)!==JSON.stringify(value)))):onSelectOptions([...selectedOptions,{value,label}])},checked:!!selectedOptions.find((option=>option.value===value)),label},"".concat(JSON.stringify(value),"_").concat(index))}))})};try{CheckboxList.displayName="CheckboxList",CheckboxList.__docgenInfo={description:"",displayName:"CheckboxList",props:{selectedOptions:{defaultValue:null,description:"",name:"selectedOptions",required:!0,type:{name:"OptionType<T>[]"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"OptionType<T>[]"}},onSelectOptions:{defaultValue:null,description:"",name:"onSelectOptions",required:!0,type:{name:"(options: OptionType<T>[]) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/CheckboxList/CheckboxList.tsx#CheckboxList"]={docgenInfo:CheckboxList.__docgenInfo,name:"CheckboxList",path:"src/components/molecules/CheckboxList/CheckboxList.tsx#CheckboxList"})}catch(__react_docgen_typescript_loader_error){}}}]);