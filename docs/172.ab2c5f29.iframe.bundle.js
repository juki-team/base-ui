"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[172],{"./src/components/templates/ErrorBoundary/ErrorBoundary.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ErrorBoundary:()=>ErrorBoundary});var _juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_config__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/config/index.tsx"),_helpers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/helpers/index.ts"),_atoms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/index.ts"),_HelpSection__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/templates/HelpSection/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component{constructor(props){super(props),this.state={hasError:!1,errorPersist:!1}}static getDerivedStateFromError(error){return(0,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.N6)("getDerivedStateFromError",{error}),{hasError:!0}}async componentDidCatch(error,errorInfo){var _window;const token=(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.u0)(),location=null===(_window=window)||void 0===_window?void 0:_window.location;try{const{url,...options}=_config__WEBPACK_IMPORTED_MODULE_2__.A.API.log({body:{location,token,errorName:null==error?void 0:error.name,errorMessage:null==error?void 0:error.message,errorStack:null==error?void 0:error.stack,errorInfo}}),response=(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.XG)(await(0,_helpers__WEBPACK_IMPORTED_MODULE_3__.Bb)(url,options));response.success?(0,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.Bu)("Error reported"):(0,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.N6)("error reported failed",{error,errorInfo,location,token,response})}catch(errorOnLog){(0,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.N6)("error on log error",{error,errorInfo,location,token,errorOnLog})}}render(){return this.state.hasError?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-col extend stretch jk-pad-lg",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"bc-we jk-br-ie jk-pad-md",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-col",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{style:{width:"50vw",height:"20vh"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.eYG,{})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h2",{children:"Oops, there is an error!"}),this.state.errorPersist?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.zxk,{onClick:this.props.reload,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"reload page"})}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.zxk,{onClick:()=>this.setState({hasError:!1,errorPersist:!0}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{children:"try again"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-divider"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"jk-col gap",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div",{className:"fw-bd",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"tt-se",children:"supported browsers"}),":"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("ul",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li",{children:"Chrome 64+"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li",{children:"Edge 79+"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li",{children:"Firefox 67+"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li",{children:"Opera 51+"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li",{children:"Safari 12+"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.T,{className:"tt-se",children:"if your browser is not supported, update it or contact us"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-divider"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"jk-col",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HelpSection__WEBPACK_IMPORTED_MODULE_5__.L,{})})]})}):this.props.children}}try{ErrorBoundary.displayName="ErrorBoundary",ErrorBoundary.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{reload:{defaultValue:null,description:"",name:"reload",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ErrorBoundary/ErrorBoundary.tsx#ErrorBoundary"]={docgenInfo:ErrorBoundary.__docgenInfo,name:"ErrorBoundary",path:"src/components/templates/ErrorBoundary/ErrorBoundary.tsx#ErrorBoundary"})}catch(__react_docgen_typescript_loader_error){}}}]);