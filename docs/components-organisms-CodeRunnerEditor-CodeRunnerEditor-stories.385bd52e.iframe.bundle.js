"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3453],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>chunk_AY7I2SME.aD,Ip:()=>chunk_AY7I2SME.Ip});var chunk_AY7I2SME=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs")},"./src/components/organisms/CodeRunnerEditor/CodeRunnerEditor.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CodeRunnerEditorNormal:()=>CodeRunnerEditorNormal,CodeRunnerEditorWithCustomLanguages:()=>CodeRunnerEditorWithCustomLanguages,CodeRunnerEditorWithIo:()=>CodeRunnerEditorWithIo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _CodeRunnerEditorNorm,_CodeRunnerEditorNorm2,_CodeRunnerEditorNorm3,_CodeRunnerEditorWith,_CodeRunnerEditorWith2,_CodeRunnerEditorWith3,_CodeRunnerEditorWith4,_CodeRunnerEditorWith5,_CodeRunnerEditorWith6,_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),_index__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/index.ts"),_mockup__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/mockup/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_index__WEBPACK_IMPORTED_MODULE_3__.kDs,argTypes:{type:{control:{type:"radio",options:["default","primary","text","ghost"],disable:!0},disable:!0}}};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.Ip)({depth:100,limit:20});const Template=args=>{const[props,setProps]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({language:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.Xn.JAVASCRIPT,sourceCode:'console.info("Juki!")'});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_4__.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{style:{height:"500px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_3__.kDs,{...args,...props,onChange:props=>{setProps((prevState=>({...prevState,...props})))},middleButtons:_ref=>{let{widthContainer}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{children:["width:",widthContainer]})},expandPosition:{width:"800px",height:"800px",top:"50px",left:"50px"}})})})},CodeRunnerEditorNormal=Template.bind({});CodeRunnerEditorNormal.args={readOnly:!1};const CodeRunnerEditorWithIo=Template.bind({});CodeRunnerEditorWithIo.args={readOnly:!1,testCases:{"test-empty":{key:"test-empty",index:0,in:"",out:"",err:"",log:"",sample:!1,status:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.$M.NONE}}};const CodeRunnerEditorWithCustomLanguages=Template.bind({});CodeRunnerEditorWithCustomLanguages.args={readOnly:!1,testCases:{"test-empty":{key:"test-empty",index:0,in:"",out:"",err:"",log:"",sample:!1,status:_juki_team_commons__WEBPACK_IMPORTED_MODULE_0__.$M.NONE}},languages:[{value:"43",label:"GNU GCC C11 5.1.0"},{value:"65",label:"C# 8, .NET Core 3.1"}]},CodeRunnerEditorNormal.parameters={...CodeRunnerEditorNormal.parameters,docs:{...null===(_CodeRunnerEditorNorm=CodeRunnerEditorNormal.parameters)||void 0===_CodeRunnerEditorNorm?void 0:_CodeRunnerEditorNorm.docs,source:{originalSource:"args => {\n  const [props, setProps] = useState<CodeRunnerEditorPropertiesType<ProgrammingLanguage> & {\n    language: string;\n    sourceCode: string;\n  }>({\n    language: ProgrammingLanguage.JAVASCRIPT,\n    sourceCode: 'console.info(\"Juki!\")'\n  });\n  return <MockupJukiProvider>\n      <div style={{\n      height: '500px'\n    }}>\n        <CodeRunnerEditor {...args} {...props} onChange={(props: any) => {\n        setProps(prevState => ({\n          ...prevState,\n          ...props\n        }));\n      }} middleButtons={({\n        widthContainer\n      }) => <div>width:{widthContainer}</div>} expandPosition={{\n        width: '800px',\n        height: '800px',\n        top: '50px',\n        left: '50px'\n      }} />\n      </div>\n    </MockupJukiProvider>;\n}",...null===(_CodeRunnerEditorNorm2=CodeRunnerEditorNormal.parameters)||void 0===_CodeRunnerEditorNorm2||null===(_CodeRunnerEditorNorm3=_CodeRunnerEditorNorm2.docs)||void 0===_CodeRunnerEditorNorm3?void 0:_CodeRunnerEditorNorm3.source}}},CodeRunnerEditorWithIo.parameters={...CodeRunnerEditorWithIo.parameters,docs:{...null===(_CodeRunnerEditorWith=CodeRunnerEditorWithIo.parameters)||void 0===_CodeRunnerEditorWith?void 0:_CodeRunnerEditorWith.docs,source:{originalSource:"args => {\n  const [props, setProps] = useState<CodeRunnerEditorPropertiesType<ProgrammingLanguage> & {\n    language: string;\n    sourceCode: string;\n  }>({\n    language: ProgrammingLanguage.JAVASCRIPT,\n    sourceCode: 'console.info(\"Juki!\")'\n  });\n  return <MockupJukiProvider>\n      <div style={{\n      height: '500px'\n    }}>\n        <CodeRunnerEditor {...args} {...props} onChange={(props: any) => {\n        setProps(prevState => ({\n          ...prevState,\n          ...props\n        }));\n      }} middleButtons={({\n        widthContainer\n      }) => <div>width:{widthContainer}</div>} expandPosition={{\n        width: '800px',\n        height: '800px',\n        top: '50px',\n        left: '50px'\n      }} />\n      </div>\n    </MockupJukiProvider>;\n}",...null===(_CodeRunnerEditorWith2=CodeRunnerEditorWithIo.parameters)||void 0===_CodeRunnerEditorWith2||null===(_CodeRunnerEditorWith3=_CodeRunnerEditorWith2.docs)||void 0===_CodeRunnerEditorWith3?void 0:_CodeRunnerEditorWith3.source}}},CodeRunnerEditorWithCustomLanguages.parameters={...CodeRunnerEditorWithCustomLanguages.parameters,docs:{...null===(_CodeRunnerEditorWith4=CodeRunnerEditorWithCustomLanguages.parameters)||void 0===_CodeRunnerEditorWith4?void 0:_CodeRunnerEditorWith4.docs,source:{originalSource:"args => {\n  const [props, setProps] = useState<CodeRunnerEditorPropertiesType<ProgrammingLanguage> & {\n    language: string;\n    sourceCode: string;\n  }>({\n    language: ProgrammingLanguage.JAVASCRIPT,\n    sourceCode: 'console.info(\"Juki!\")'\n  });\n  return <MockupJukiProvider>\n      <div style={{\n      height: '500px'\n    }}>\n        <CodeRunnerEditor {...args} {...props} onChange={(props: any) => {\n        setProps(prevState => ({\n          ...prevState,\n          ...props\n        }));\n      }} middleButtons={({\n        widthContainer\n      }) => <div>width:{widthContainer}</div>} expandPosition={{\n        width: '800px',\n        height: '800px',\n        top: '50px',\n        left: '50px'\n      }} />\n      </div>\n    </MockupJukiProvider>;\n}",...null===(_CodeRunnerEditorWith5=CodeRunnerEditorWithCustomLanguages.parameters)||void 0===_CodeRunnerEditorWith5||null===(_CodeRunnerEditorWith6=_CodeRunnerEditorWith5.docs)||void 0===_CodeRunnerEditorWith6?void 0:_CodeRunnerEditorWith6.source}}};const __namedExportsOrder=["CodeRunnerEditorNormal","CodeRunnerEditorWithIo","CodeRunnerEditorWithCustomLanguages"]},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{AGT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.AGT,BNd:()=>_components__WEBPACK_IMPORTED_MODULE_0__.BNd,D2S:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D2S,D_J:()=>_components__WEBPACK_IMPORTED_MODULE_0__.D_J,FjN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.FjN,HNe:()=>_components__WEBPACK_IMPORTED_MODULE_0__.HNe,J2e:()=>_components__WEBPACK_IMPORTED_MODULE_0__.J2e,Kk2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Kk2,MlT:()=>_components__WEBPACK_IMPORTED_MODULE_0__.MlT,NA2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.NA2,RrP:()=>_components__WEBPACK_IMPORTED_MODULE_0__.RrP,SEE:()=>_helpers__WEBPACK_IMPORTED_MODULE_4__.SE,SI8:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SI8,SVk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.SVk,Sd5:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sd5,T:()=>_components__WEBPACK_IMPORTED_MODULE_0__.T,VRu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VRu,V_R:()=>_components__WEBPACK_IMPORTED_MODULE_0__.V_R,VjU:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VjU,VqK:()=>_components__WEBPACK_IMPORTED_MODULE_0__.VqK,WB6:()=>_components__WEBPACK_IMPORTED_MODULE_0__.WB6,Xmx:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Xmx,YAN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.YAN,Z3Q:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Z3Q,Zi2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Zi2,_nC:()=>_components__WEBPACK_IMPORTED_MODULE_0__._nC,aPz:()=>_components__WEBPACK_IMPORTED_MODULE_0__.aPz,cNY:()=>_components__WEBPACK_IMPORTED_MODULE_0__.cNY,dPH:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dPH,dys:()=>_components__WEBPACK_IMPORTED_MODULE_0__.dys,e0j:()=>_components__WEBPACK_IMPORTED_MODULE_0__.e0j,ewm:()=>_components__WEBPACK_IMPORTED_MODULE_0__.ewm,hQu:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hQu,hvX:()=>_components__WEBPACK_IMPORTED_MODULE_0__.hvX,ioC:()=>_helpers__WEBPACK_IMPORTED_MODULE_4__.io,jje:()=>_components__WEBPACK_IMPORTED_MODULE_0__.jje,kDs:()=>_components__WEBPACK_IMPORTED_MODULE_0__.kDs,lbA:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lbA,lmA:()=>_hooks__WEBPACK_IMPORTED_MODULE_5__.lm,mQc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.mQc,nRN:()=>_components__WEBPACK_IMPORTED_MODULE_0__.nRN,pOD:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pOD,qQW:()=>_components__WEBPACK_IMPORTED_MODULE_0__.qQW,rG2:()=>_components__WEBPACK_IMPORTED_MODULE_0__.rG2,t8m:()=>_components__WEBPACK_IMPORTED_MODULE_0__.t8m,wQo:()=>_components__WEBPACK_IMPORTED_MODULE_0__.wQo,xIZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xIZ,xLV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xLV,xNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.xNc,z1y:()=>_components__WEBPACK_IMPORTED_MODULE_0__.z1y,zxk:()=>_components__WEBPACK_IMPORTED_MODULE_0__.zxk});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_helpers__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./src/config/index.tsx"),__webpack_require__("./src/constants/index.ts"),__webpack_require__("./src/contexts/index.ts"),__webpack_require__("./src/helpers/index.ts")),_hooks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/hooks/index.ts");__webpack_require__("./src/services/index.tsx"),__webpack_require__("./src/types/index.ts")}}]);