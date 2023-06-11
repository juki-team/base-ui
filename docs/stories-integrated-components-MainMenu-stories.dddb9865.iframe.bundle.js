"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[239],{"./node_modules/@storybook/addon-actions/dist/index.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{aD:function(){return chunk_OPEUWD42.aD},Ip:function(){return chunk_OPEUWD42.Ip}});var chunk_OPEUWD42=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-OPEUWD42.mjs")},"./src/stories/integrated-components/MainMenu.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MainMenu:function(){return MainMenu},__namedExportsOrder:function(){return __namedExportsOrder}});var _MainMenu$parameters,_MainMenu$parameters2,_MainMenu$parameters3,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_constants_md__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/constants/md.ts")),_index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/index.ts"),_JukiProvider__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/stories/JukiProvider.tsx"),_ToggleThemeButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/stories/ToggleThemeButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Components/Integrated Components",component:_index__WEBPACK_IMPORTED_MODULE_2__.lbA},(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.Ip)({depth:100,limit:20});var menu=[{label:"contests",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.VjU,{}),selected:!1,onClick:function onClick(){return(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/contests")}},{label:"problems",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.pOD,{}),selected:!0,onClick:function onClick(){return(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/problems")}},{label:"admin",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.hQu,{}),selected:!1,onClick:function onClick(){return(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("/admin")}}],MainMenu=function MainMenu(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_JukiProvider__WEBPACK_IMPORTED_MODULE_3__.m,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{style:{height:"400px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.lbA,{menu:menu,onSeeMyProfile:function onSeeMyProfile(){return console.log("onSeeMyProfile")},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.cNY,{source:_constants_md__WEBPACK_IMPORTED_MODULE_6__.h,uploadImageButton:!0,informationButton:!0})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ToggleThemeButton__WEBPACK_IMPORTED_MODULE_4__.M,{})]})})};MainMenu.parameters=(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)((0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({},MainMenu.parameters),{},{docs:(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)((0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({},null===(_MainMenu$parameters=MainMenu.parameters)||void 0===_MainMenu$parameters?void 0:_MainMenu$parameters.docs),{},{source:(0,_home_oscargauss_JUKI_base_ui_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__.Z)({originalSource:"() => <JukiProvider>\n    <div style={{\n    height: '400px'\n  }}>\n      <MainMenuCmp menu={menu} onSeeMyProfile={() => console.log('onSeeMyProfile')}>\n        <div>\n          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />\n        </div>\n      </MainMenuCmp>\n      <ToggleThemeButton />\n    </div>\n  </JukiProvider>"},null===(_MainMenu$parameters2=MainMenu.parameters)||void 0===_MainMenu$parameters2||null===(_MainMenu$parameters3=_MainMenu$parameters2.docs)||void 0===_MainMenu$parameters3?void 0:_MainMenu$parameters3.source)})});var __namedExportsOrder=["MainMenu"]},"./src/stories/JukiProvider.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{m:function(){return JukiProvider}});__webpack_require__("./node_modules/react/index.js");var _components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),JukiProvider=function JukiProvider(_ref){var children=_ref.children;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Iv9,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.m8,{utilsServiceUrl:"http://localhost:3005",utilsServiceApiVersion:"api/v1",utilsUiUrl:"https://utils.juki.app",tokenName:"juki-token",utilsSocketServiceUrl:"http://localhost:3005",children:children})})};try{JukiProvider.displayName="JukiProvider",JukiProvider.__docgenInfo={description:"",displayName:"JukiProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/JukiProvider.tsx#JukiProvider"]={docgenInfo:JukiProvider.__docgenInfo,name:"JukiProvider",path:"src/stories/JukiProvider.tsx#JukiProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);