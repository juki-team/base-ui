"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8103],{"./src/components/molecules/ImageLoaderCropper/ImageLoaderCroper.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ImageLoaderCropper:()=>ImageLoaderCropper,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/index.ts"),_helpers__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/helpers/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/mockup/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_3__]);_mockup__WEBPACK_IMPORTED_MODULE_3__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const _excluded=["onCropChange"],__WEBPACK_DEFAULT_EXPORT__={component:_components__WEBPACK_IMPORTED_MODULE_1__.MI_},ImageLoaderCropperComponent=_ref=>{let{onCropChange}=_ref,props=(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_5__.A)(_ref,_excluded);const[cropImage,setCropImage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_3__.A,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.$nd,{onClick:async()=>{if(null!=cropImage&&cropImage.previewCanvasRef.current){const blob=await(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.ZR)(cropImage.previewCanvasRef.current);blob&&await(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.IZ)(blob,"image")}},children:"download"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.MI_,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)({onCropChange:setCropImage},props)),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:!(null==cropImage||!cropImage.pixelCrop)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("canvas",{ref:cropImage.previewCanvasRef,style:{border:"1px solid black",objectFit:"contain",width:cropImage.pixelCrop.width,height:cropImage.pixelCrop.height}})})]})})},ImageLoaderCropper={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ImageLoaderCropperComponent,(0,_Users_oscargauss_Documents_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__.A)({},args))},__namedExportsOrder=["ImageLoaderCropper"];ImageLoaderCropper.parameters={...ImageLoaderCropper.parameters,docs:{...ImageLoaderCropper.parameters?.docs,source:{originalSource:"{\n  render: (args: ImageLoaderCropperProps) => <ImageLoaderCropperComponent {...args} />\n}",...ImageLoaderCropper.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))}}]);