"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3888],{"./src/components/organisms/CodeRunnerEditor/CodeRunnerEditor.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CodeRunnerEditor:()=>CodeRunnerEditor});var esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react=__webpack_require__("./node_modules/react/index.js"),helpers=__webpack_require__("./src/helpers/index.ts"),hooks=__webpack_require__("./src/hooks/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),index_esm=__webpack_require__("./node_modules/react-resize-detector/build/index.esm.js"),config=__webpack_require__("./src/config/index.tsx"),constants=__webpack_require__("./src/constants/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Header=props=>{var _languages$find;const{languages,sourceCode,language,onChange,testCases,setShowSettings,centerOptions,setRunId,timeLimit,memoryLimit,expanded,setExpanded,isRunning}=props,{addErrorNotification}=(0,hooks.lm)(),{width:widthContainer=0,ref}=(0,index_esm.N)(constants.wx),{width:widthLeftSection=0,ref:refLeftSection}=(0,index_esm.N)(constants.wx),{width:widthRightSection=0,ref:refRightSection}=(0,index_esm.N)(constants.wx),setLoaderRef=(0,react.useRef)();(0,react.useEffect)((()=>{var _setLoaderRef$current,_setLoaderRef$current2;isRunning?null===(_setLoaderRef$current=setLoaderRef.current)||void 0===_setLoaderRef$current||_setLoaderRef$current.call(setLoaderRef,esm.qb.LOADING):null===(_setLoaderRef$current2=setLoaderRef.current)||void 0===_setLoaderRef$current2||_setLoaderRef$current2.call(setLoaderRef,esm.qb.NONE)}),[isRunning]);const withRunCodeButton=!!Object.keys(testCases).length,withLabels=widthContainer>(withRunCodeButton?620:570),twoRows=widthContainer<420,widthCenterContainer=widthContainer-widthLeftSection-widthRightSection;return(0,jsx_runtime.jsxs)("div",{className:(0,helpers.AK)("options-header-content jk-row",{"two-rows":twoRows}),style:twoRows?{"--options-header-height":"80px"}:{},ref,children:[(0,jsx_runtime.jsxs)("div",{className:(0,helpers.AK)("left-options cr-pd jk-row gap",{"jk-col left gap flex-1":twoRows}),ref:refLeftSection,children:[(0,jsx_runtime.jsx)(atoms.PhF,{className:"languages-selector",options:languages.map((language=>({value:language.value,label:(language.label||language.value)+""}))),selectedOption:{value:language,label:((null===(_languages$find=languages.find((lang=>lang.value===language)))||void 0===_languages$find?void 0:_languages$find.label)||language)+""},onChange:_ref=>{let{value}=_ref;return null==onChange?void 0:onChange({language:value})},extend:twoRows}),withRunCodeButton&&(0,jsx_runtime.jsx)(molecules.l_,{size:"tiny",type:"primary",extend:twoRows,icon:(0,jsx_runtime.jsx)(atoms.rK7,{}),onClick:async setStatus=>{setStatus(esm.qb.LOADING);const newTestCases={};for(const testKey in testCases)newTestCases[testKey]={...testCases[testKey]},newTestCases[testKey].out="",newTestCases[testKey].err="",newTestCases[testKey].status=esm.$M.NONE;null==onChange||onChange({testCases:newTestCases});try{var _request$content;const{url,...options}=config.A.API.code.run({body:{language,source:sourceCode,inputs:Object.values(testCases).map((testCase=>({key:testCase.key,source:testCase.in}))),timeLimit,memoryLimit}}),request=(0,helpers.XG)(await(0,helpers.Bb)(url,options));null!=request&&request.success&&null!=request&&null!==(_request$content=request.content)&&void 0!==_request$content&&_request$content.runId?(setRunId(request.content.runId),setStatus(esm.qb.SUCCESS)):(addErrorNotification(null==request?void 0:request.message),setRunId(""),(0,esm.Kd)("run code request failed",{request}),setStatus(esm.qb.ERROR))}catch(error){(0,esm.Kd)("error on run code",{error}),setStatus(esm.qb.ERROR)}},setLoaderStatusRef:setLoader=>setLoaderRef.current=setLoader,children:(0,jsx_runtime.jsx)(atoms.T,{children:"run"})})]}),(0,jsx_runtime.jsx)("div",{className:"center-options",style:{width:widthCenterContainer},children:centerOptions({widthContainer:widthCenterContainer})}),(0,jsx_runtime.jsxs)("div",{className:(0,helpers.AK)("jk-row gap right-options cr-pd",{"jk-col gap":twoRows}),ref:refRightSection,children:[(0,jsx_runtime.jsx)(atoms.zxk,{size:"tiny",type:"light",onClick:()=>setShowSettings(!0),icon:(0,jsx_runtime.jsx)(atoms.ewm,{}),children:withLabels&&(0,jsx_runtime.jsx)(atoms.T,{children:"settings"})}),null!==expanded&&(0,jsx_runtime.jsx)(atoms.zxk,{size:"tiny",type:"light",onClick:()=>setExpanded((prevState=>!prevState)),icon:expanded?(0,jsx_runtime.jsx)(atoms.wvt,{}):(0,jsx_runtime.jsx)(atoms.$_3,{}),children:withLabels&&(0,jsx_runtime.jsx)(atoms.T,{children:expanded?"back":"expand"})})]})]})};try{Header.displayName="Header",Header.__docgenInfo={description:"",displayName:"Header",props:{sourceCode:{defaultValue:null,description:"",name:"sourceCode",required:!0,type:{name:"string"}},languages:{defaultValue:null,description:"",name:"languages",required:!0,type:{name:"{ value: T; label: string; }[]"}},language:{defaultValue:null,description:"",name:"language",required:!0,type:{name:"T"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"CodeRunnerEditorOnChangeType<T>"}},testCases:{defaultValue:null,description:"",name:"testCases",required:!0,type:{name:"CodeEditorTestCasesType"}},setShowSettings:{defaultValue:null,description:"",name:"setShowSettings",required:!0,type:{name:"Dispatch<SetStateAction<boolean>>"}},setRunId:{defaultValue:null,description:"",name:"setRunId",required:!0,type:{name:"Dispatch<SetStateAction<string>>"}},centerOptions:{defaultValue:null,description:"",name:"centerOptions",required:!0,type:{name:"(props: { widthContainer: number; }) => ReactNode"}},timeLimit:{defaultValue:null,description:"",name:"timeLimit",required:!0,type:{name:"number"}},memoryLimit:{defaultValue:null,description:"",name:"memoryLimit",required:!0,type:{name:"number"}},expanded:{defaultValue:null,description:"",name:"expanded",required:!0,type:{name:"boolean | null"}},setExpanded:{defaultValue:null,description:"",name:"setExpanded",required:!0,type:{name:"Dispatch<SetStateAction<boolean>>"}},isRunning:{defaultValue:null,description:"",name:"isRunning",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/CodeRunnerEditor/Header/index.tsx#Header"]={docgenInfo:Header.__docgenInfo,name:"Header",path:"src/components/organisms/CodeRunnerEditor/Header/index.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}const SettingsModal=_ref=>{let{onClose,isOpen,onChange,tabSize,fontSize}=_ref;return(0,jsx_runtime.jsx)(atoms.u_l,{className:"editor-settings-modal jk-pad-lg",isOpen,onClose,closeWhenClickOutside:!0,children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch gap",children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"code editor settings"})}),(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsxs)("label",{className:"fw-bd tt-se",children:[(0,jsx_runtime.jsx)(atoms.T,{children:"choose your tab size"}),": "]}),(0,jsx_runtime.jsx)(atoms.PhF,{options:molecules.Xg.map((keyMap=>({value:keyMap,label:keyMap+""}))),selectedOption:{value:tabSize},onChange:_ref2=>{let{value}=_ref2;return null==onChange?void 0:onChange({tabSize:value})}})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsxs)("label",{className:"fw-bd tt-se",children:[(0,jsx_runtime.jsx)(atoms.T,{children:"choose your font size"}),": "]}),(0,jsx_runtime.jsx)(atoms.PhF,{options:molecules.NJ.map((keyMap=>({value:keyMap,label:keyMap+""}))),selectedOption:{value:fontSize},onChange:_ref3=>{let{value}=_ref3;return null==onChange?void 0:onChange({fontSize:value})}})]})]})})};try{SettingsModal.displayName="SettingsModal",SettingsModal.__docgenInfo={description:"",displayName:"SettingsModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"CodeRunnerEditorOnChangeType<T>"}},tabSize:{defaultValue:null,description:"",name:"tabSize",required:!0,type:{name:"number"}},fontSize:{defaultValue:null,description:"",name:"fontSize",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/CodeRunnerEditor/SettingsModal/index.tsx#SettingsModal"]={docgenInfo:SettingsModal.__docgenInfo,name:"SettingsModal",path:"src/components/organisms/CodeRunnerEditor/SettingsModal/index.tsx#SettingsModal"})}catch(__react_docgen_typescript_loader_error){}var v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),Notifications=__webpack_require__("./src/components/organisms/Notifications/index.ts"),ProblemVerdictTag=__webpack_require__("./src/components/organisms/ProblemVerdictTag/index.ts");const LogInfo=_ref=>{let{testCase,timeLimit,memoryLimit}=_ref;const{timeUsed,timeLimitExceeded,memoryUsed,memoryLimitExceeded,exitCode,runtimeError}=(0,esm.fI)(testCase,timeLimit,memoryLimit);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)("div",{className:"content-log",children:[(0,jsx_runtime.jsxs)("span",{className:(0,helpers.AK)("text-log tx-t tt-se",{"cr-er":timeLimitExceeded}),children:[timeLimitExceeded?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"time limit exceeded"})," (",timeUsed," ",(0,jsx_runtime.jsx)(atoms.T,{children:"ms"}),")"]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"used time"}),": ",timeUsed," ",(0,jsx_runtime.jsx)(atoms.T,{children:"ms"})]}),","]}),(0,jsx_runtime.jsxs)("span",{className:(0,helpers.AK)("text-log tx-t tt-se",{"cr-er":memoryLimitExceeded}),children:[memoryLimitExceeded?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"memory limit exceeded"})," (",memoryUsed," ",(0,jsx_runtime.jsx)(atoms.T,{children:"KB"}),")"]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"used memory"}),": ",memoryUsed," ",(0,jsx_runtime.jsx)(atoms.T,{children:"KB"})]}),","]}),(0,jsx_runtime.jsx)("span",{className:(0,helpers.AK)("text-log tx-t tt-se",{"cr-er":runtimeError}),children:!runtimeError||timeLimit||memoryLimit?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"exit code"}),": ",exitCode]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{children:"runtime error"})," (",(0,jsx_runtime.jsx)(atoms.T,{children:"exit code"}),": ",exitCode,")"]})})]})})};try{LogInfo.displayName="LogInfo",LogInfo.__docgenInfo={description:"",displayName:"LogInfo",props:{testCase:{defaultValue:null,description:"",name:"testCase",required:!0,type:{name:"SubmissionTestCaseType"}},timeLimit:{defaultValue:null,description:"",name:"timeLimit",required:!0,type:{name:"number"}},memoryLimit:{defaultValue:null,description:"",name:"memoryLimit",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/CodeRunnerEditor/TestCases/LogInfo.tsx#LogInfo"]={docgenInfo:LogInfo.__docgenInfo,name:"LogInfo",path:"src/components/organisms/CodeRunnerEditor/TestCases/LogInfo.tsx#LogInfo"})}catch(__react_docgen_typescript_loader_error){}const AddCaseButton=_ref=>{let{onChange,testCasesValues,testCases,sample=!1}=_ref;const{addNotification}=(0,hooks.lm)();return(0,jsx_runtime.jsx)(atoms.ua7,{content:(0,jsx_runtime.jsx)(atoms.T,{className:"ws-np tt-se tx-s",children:"add ".concat(sample?"sample":"custom sample"," case")}),placement:"bottom-end",children:(0,jsx_runtime.jsx)("div",{className:"jk-button light small only-icon",style:{margin:"6px"},children:(0,jsx_runtime.jsx)(atoms.dtP,{size:"small",onClick:()=>{const customCases=testCasesValues.filter((testCaseValue=>!testCaseValue.sample)),noCustomCases=testCasesValues.filter((testCaseValue=>testCaseValue.sample)),cases=sample?noCustomCases:customCases;if(cases.length<(sample?30:15)){var _noCustomCases$0$with,_noCustomCases$;const key=(0,v4.Z)(),index=(0,esm.Hs)(cases.map((testCaseValue=>testCaseValue.index)));null==onChange||onChange({testCases:{...testCases,[key]:{key,index,in:"",out:"",testOut:"",withPE:null===(_noCustomCases$0$with=null==noCustomCases||null===(_noCustomCases$=noCustomCases[0])||void 0===_noCustomCases$?void 0:_noCustomCases$.withPE)||void 0===_noCustomCases$0$with||_noCustomCases$0$with,err:"",log:"",hidden:!1,sample,status:esm.$M.NONE}}})}else addNotification({type:Notifications.k$.QUIET,message:(0,jsx_runtime.jsx)(atoms.T,{children:"maximum test cases achieved"})})}})})})},TestCases=props=>{var _testCasesValues$,_testCases$testCaseKe,_testCases$testCaseKe2,_testCases$testCaseKe3,_testCases$testCaseKe4,_testCases$testCaseKe5,_testCases$testCaseKe6,_testCases$testCaseKe7,_testCases$testCaseKe8,_testCases$testCaseKe12,_testCases$testCaseKe13,_inputTabs$testCaseKe;const{testCases={},onChange,timeLimit,memoryLimit,direction,enableAddSampleCases,enableAddCustomSampleCases}=props,testCasesValues=Object.values(testCases).sort(((a,b)=>a.sample!==b.sample?+b.sample-+a.sample:a.index-b.index)),[testCaseKey,setTestCaseKey]=(0,react.useState)((null===(_testCasesValues$=testCasesValues[0])||void 0===_testCasesValues$?void 0:_testCasesValues$.key)||"");(0,react.useEffect)((()=>{const testCasesValues=Object.values(testCases);testCasesValues.length&&(testCasesValues.some((testCase=>testCase.key===testCaseKey))||setTestCaseKey(testCasesValues[0].key))}),[testCaseKey,testCases]);const inputTabs={};testCasesValues.filter((testCaseValue=>!testCaseValue.hidden)).forEach((testCaseValue=>{const headerLabel=testCaseValue.key===testCaseKey?(0,jsx_runtime.jsxs)("div",{className:"jk-row ws-np nowrap tx-s",children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:testCaseValue.sample?"sample":"custom"})," ",testCaseValue.index+1,(testCaseValue.sample?enableAddSampleCases:enableAddCustomSampleCases)&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[" ",(0,jsx_runtime.jsx)(atoms.pJl,{size:"small",className:"clickable br-50-pc",onClick:()=>{const newTestCases={...testCases};delete newTestCases[testCaseValue.key],null==onChange||onChange({testCases:newTestCases})}})]})]}):(0,jsx_runtime.jsxs)("div",{className:"jk-row ws-np nowrap tx-s",children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:testCaseValue.sample?"s.":"c."})," ",testCaseValue.index+1]}),{verdict}=(0,esm._8)(testCaseValue,timeLimit,memoryLimit);inputTabs[testCaseValue.key]={key:testCaseValue.key,header:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[headerLabel,testCaseValue.testOut&&(testCaseValue.status===esm.$M.EXECUTED_TEST_CASE||testCaseValue.status===esm.$M.FAILED_TEST_CASE)&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[" ",(0,jsx_runtime.jsx)(ProblemVerdictTag.i,{verdict})]})]}),body:(0,jsx_runtime.jsx)(atoms.Kx8,{style:{height:"100%",boxShadow:"none",borderRadius:0,overflow:"auto"},className:"tx-s",value:testCaseValue.in,onChange:(testCaseValue.sample?enableAddSampleCases:enableAddCustomSampleCases)?value=>null==onChange?void 0:onChange({testCases:{...testCases,[testCaseValue.key]:{...testCaseValue,in:value}}}):void 0},testCaseValue.key)}}));const[outputTab,setOutputTab]=(0,react.useState)("output"),status=null===(_testCases$testCaseKe=testCases[testCaseKey])||void 0===_testCases$testCaseKe?void 0:_testCases$testCaseKe.status;(0,react.useEffect)((()=>{setOutputTab(status===esm.$M.FAILED||status===esm.$M.COMPILATION_ERROR?"error":"output")}),[status]);const loaderAndInfo=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[((null===(_testCases$testCaseKe2=testCases[testCaseKey])||void 0===_testCases$testCaseKe2?void 0:_testCases$testCaseKe2.status)===esm.$M.RECEIVED||(null===(_testCases$testCaseKe3=testCases[testCaseKey])||void 0===_testCases$testCaseKe3?void 0:_testCases$testCaseKe3.status)===esm.$M.COMPILING||(null===(_testCases$testCaseKe4=testCases[testCaseKey])||void 0===_testCases$testCaseKe4?void 0:_testCases$testCaseKe4.status)===esm.$M.RUNNING_TEST_CASES||(null===(_testCases$testCaseKe5=testCases[testCaseKey])||void 0===_testCases$testCaseKe5?void 0:_testCases$testCaseKe5.status)===esm.$M.RUNNING_TEST_CASE)&&(0,jsx_runtime.jsx)("div",{className:"jk-overlay",children:(0,jsx_runtime.jsxs)("div",{className:"jk-row",style:{alignItems:"baseline"},children:[(0,jsx_runtime.jsx)(atoms.T,{children:esm.mq[null===(_testCases$testCaseKe6=testCases[testCaseKey])||void 0===_testCases$testCaseKe6?void 0:_testCases$testCaseKe6.status].label})," ",(0,jsx_runtime.jsx)("div",{className:"dot-flashing"})]})}),(null===(_testCases$testCaseKe7=testCases[testCaseKey])||void 0===_testCases$testCaseKe7?void 0:_testCases$testCaseKe7.log)&&(0,jsx_runtime.jsx)(LogInfo,{testCase:testCases[testCaseKey],timeLimit,memoryLimit})]}),outputTabs=[];var _testCases$testCaseKe9,_testCases$testCaseKe10,_testCases$testCaseKe11,_testCases$testCaseKe14;null!==(_testCases$testCaseKe8=testCases[testCaseKey])&&void 0!==_testCases$testCaseKe8&&_testCases$testCaseKe8.testOut&&outputTabs.push({key:"test-output",header:(0,jsx_runtime.jsxs)("div",{className:"jk-row gap",children:[(0,jsx_runtime.jsx)(atoms.T,{className:(0,helpers.AK)("tt-se tx-s"),children:"sample output"}),(0,jsx_runtime.jsx)(atoms.ua7,{content:(0,jsx_runtime.jsx)(atoms.T,{children:"".concat((null===(_testCases$testCaseKe9=testCases[testCaseKey])||void 0===_testCases$testCaseKe9?void 0:_testCases$testCaseKe9.testOut.lastIndexOf("\n"))===(null===(_testCases$testCaseKe10=testCases[testCaseKey])||void 0===_testCases$testCaseKe10?void 0:_testCases$testCaseKe10.testOut.length)-1?"":"no ","newline at end of file")}),placement:"top",children:(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.szr,{size:"small"})})})]}),body:(0,jsx_runtime.jsxs)("div",{children:[loaderAndInfo,(0,jsx_runtime.jsx)("div",{className:"content-log",children:(0,jsx_runtime.jsx)("span",{className:"jk-text-stdout",children:null===(_testCases$testCaseKe11=testCases[testCaseKey])||void 0===_testCases$testCaseKe11?void 0:_testCases$testCaseKe11.testOut})})]})});(outputTabs.push({key:"output",header:(0,jsx_runtime.jsx)(atoms.T,{className:(0,helpers.AK)("tt-se tx-s",{"cr-er":(0,esm.fI)(testCases[testCaseKey],timeLimit,memoryLimit).failed}),children:"output"}),body:(0,jsx_runtime.jsxs)("div",{children:[loaderAndInfo,(0,jsx_runtime.jsx)("div",{className:"content-log",children:(0,jsx_runtime.jsx)("span",{className:"jk-text-stdout",children:null===(_testCases$testCaseKe12=testCases[testCaseKey])||void 0===_testCases$testCaseKe12?void 0:_testCases$testCaseKe12.out})})]})}),null!==(_testCases$testCaseKe13=testCases[testCaseKey])&&void 0!==_testCases$testCaseKe13&&_testCases$testCaseKe13.err)&&outputTabs.push({key:"error",header:(0,jsx_runtime.jsx)(atoms.T,{className:(0,helpers.AK)("tt-se tx-s",{"cr-er":(0,esm.fI)(testCases[testCaseKey],timeLimit,memoryLimit).failed}),children:"error"}),body:(0,jsx_runtime.jsxs)("div",{children:[loaderAndInfo,(0,jsx_runtime.jsx)("div",{className:"content-log",children:(0,jsx_runtime.jsx)("span",{className:"jk-text-stderr",children:null===(_testCases$testCaseKe14=testCases[testCaseKey])||void 0===_testCases$testCaseKe14?void 0:_testCases$testCaseKe14.err})})]})});return(0,jsx_runtime.jsx)("div",{className:"jk-code-mirror-editor-test-cases",children:(0,jsx_runtime.jsxs)(molecules.ov,{direction:"row"===direction?"column":"row",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-col extend stretch nowrap",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row nowrap border-bottom-highlight-light",children:[(0,jsx_runtime.jsx)("div",{className:"flex-1",style:{overflow:"auto"},children:(0,jsx_runtime.jsx)(molecules.Rr,{tabs:inputTabs,selectedTabKey:testCaseKey,onChange:tabKey=>setTestCaseKey(tabKey)})}),enableAddSampleCases&&onChange&&(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(AddCaseButton,{onChange,testCasesValues,testCases,sample:!0})}),enableAddCustomSampleCases&&onChange&&(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(AddCaseButton,{onChange,testCasesValues,testCases})})]}),(0,jsx_runtime.jsx)("div",{className:"flex-1",style:{overflow:"hidden"},children:(0,helpers.c_)(null===(_inputTabs$testCaseKe=inputTabs[testCaseKey])||void 0===_inputTabs$testCaseKe?void 0:_inputTabs$testCaseKe.body,{selectedTabKey:testCaseKey})})]}),(0,jsx_runtime.jsx)("div",{className:"test-cases-output-stderr",children:(0,jsx_runtime.jsx)(molecules.mQ,{tabs:outputTabs,selectedTabKey:outputTab,onChange:value=>setOutputTab(value),extend:!0})})]})})};try{TestCases.displayName="TestCases",TestCases.__docgenInfo={description:"",displayName:"TestCases",props:{testCases:{defaultValue:null,description:"",name:"testCases",required:!1,type:{name:"CodeEditorTestCasesType"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"CodeRunnerEditorOnChangeType<T>"}},timeLimit:{defaultValue:null,description:"",name:"timeLimit",required:!0,type:{name:"number"}},memoryLimit:{defaultValue:null,description:"",name:"memoryLimit",required:!0,type:{name:"number"}},direction:{defaultValue:null,description:"",name:"direction",required:!0,type:{name:"enum",value:[{value:'"column"'},{value:'"row"'}]}},enableAddSampleCases:{defaultValue:null,description:"",name:"enableAddSampleCases",required:!0,type:{name:"boolean"}},enableAddCustomSampleCases:{defaultValue:null,description:"",name:"enableAddCustomSampleCases",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/CodeRunnerEditor/TestCases/index.tsx#TestCases"]={docgenInfo:TestCases.__docgenInfo,name:"TestCases",path:"src/components/organisms/CodeRunnerEditor/TestCases/index.tsx#TestCases"})}catch(__react_docgen_typescript_loader_error){}const CodeRunnerEditor=props=>{const{readOnly,sourceCode,languages=molecules.Yf.map((lang=>{var _PROGRAMMING_LANGUAGE;return{value:lang,label:(null===(_PROGRAMMING_LANGUAGE=esm.GK[lang])||void 0===_PROGRAMMING_LANGUAGE?void 0:_PROGRAMMING_LANGUAGE.label)||lang}})),language,onChange:_onChange,middleButtons,testCases,tabSize=4,fontSize=14,timeLimit=1e3,memoryLimit=512e3,expandPosition,className,enableAddCustomSampleCases,enableAddSampleCases}=props,onChangeRef=(0,react.useRef)(_onChange);onChangeRef.current=_onChange;const[isRunning,setIsRunning]=(0,react.useState)(!1),[runId,setRunId]=(0,react.useState)(""),{user:{settings:{[esm.w4.THEME]:preferredTheme}}}=(0,hooks.MQ)(),{pop}=(0,hooks.$H)(esm.VG.RUN),[showSettings,setShowSettings]=(0,react.useState)(!1),[direction,setDirection]=(0,react.useState)("row"),[expanded,setExpanded]=(0,react.useState)(!1),{viewPortSize}=(0,hooks.Tv)(),[runStatus,setRunStatus]=(0,react.useState)({});(0,react.useEffect)((()=>{const data=pop();null!=data&&data.success&&setRunStatus((prevState=>{var _data$content,_data$content2,_data$content3;return{...prevState,[null==data||null===(_data$content=data.content)||void 0===_data$content?void 0:_data$content.runId]:{...prevState[null==data||null===(_data$content2=data.content)||void 0===_data$content2?void 0:_data$content2.runId],[null==data||null===(_data$content3=data.content)||void 0===_data$content3?void 0:_data$content3.messageTimestamp]:data.content}}}))}),[pop]);const currentRunStatus=runStatus[runId],lastRunStatus=(0,react.useMemo)((()=>Object.values(currentRunStatus||{}).sort(((a,b)=>a.messageTimestamp-b.messageTimestamp)).at(-1)||{status:esm.$M.NONE,runId:"",messageTimestamp:0,log:{log:"",err:"",out:"",inputKey:""}}),[currentRunStatus]);(0,react.useEffect)((()=>{var _lastRunStatus$log,_onChangeRef$current2,_lastRunStatus$log2,_lastRunStatus$log3,_lastRunStatus$log4,_onChangeRef$current4;const status=lastRunStatus.status||esm.$M.NONE,inputKey=null==lastRunStatus||null===(_lastRunStatus$log=lastRunStatus.log)||void 0===_lastRunStatus$log?void 0:_lastRunStatus$log.inputKey,newTestCases={...testCases};switch(status){case esm.$M.RECEIVED:setIsRunning(!0),null===(_onChangeRef$current2=onChangeRef.current)||void 0===_onChangeRef$current2||_onChangeRef$current2.call(onChangeRef,{isRunning:!0});break;case esm.$M.COMPILING:case esm.$M.RUNNING_TEST_CASES:case esm.$M.FAILED:case esm.$M.COMPILED:case esm.$M.COMPILATION_ERROR:((newTestCases,status,err,out,log)=>{for(const testKey in newTestCases)newTestCases[testKey]={...newTestCases[testKey],status,err,out,log};var _onChangeRef$current;JSON.stringify(testCases)!==JSON.stringify(newTestCases)&&(null===(_onChangeRef$current=onChangeRef.current)||void 0===_onChangeRef$current||_onChangeRef$current.call(onChangeRef,{testCases:newTestCases}))})(newTestCases,status,(null===(_lastRunStatus$log2=lastRunStatus.log)||void 0===_lastRunStatus$log2?void 0:_lastRunStatus$log2.err)||"",(null===(_lastRunStatus$log3=lastRunStatus.log)||void 0===_lastRunStatus$log3?void 0:_lastRunStatus$log3.out)||"",(null===(_lastRunStatus$log4=lastRunStatus.log)||void 0===_lastRunStatus$log4?void 0:_lastRunStatus$log4.log)||"");break;case esm.$M.RUNNING_TEST_CASE:case esm.$M.EXECUTED_TEST_CASE:case esm.$M.FAILED_TEST_CASE:var _lastRunStatus$log5,_lastRunStatus$log6,_lastRunStatus$log7,_onChangeRef$current3;if(inputKey&&newTestCases[inputKey])if(newTestCases[inputKey]={...newTestCases[inputKey],status,out:(null===(_lastRunStatus$log5=lastRunStatus.log)||void 0===_lastRunStatus$log5?void 0:_lastRunStatus$log5.out)||"",log:(null===(_lastRunStatus$log6=lastRunStatus.log)||void 0===_lastRunStatus$log6?void 0:_lastRunStatus$log6.log)||"",err:(null===(_lastRunStatus$log7=lastRunStatus.log)||void 0===_lastRunStatus$log7?void 0:_lastRunStatus$log7.err)||""},JSON.stringify(testCases)!==JSON.stringify(newTestCases))null===(_onChangeRef$current3=onChangeRef.current)||void 0===_onChangeRef$current3||_onChangeRef$current3.call(onChangeRef,{testCases:newTestCases});break;case esm.$M.COMPLETED:setIsRunning(!1),null===(_onChangeRef$current4=onChangeRef.current)||void 0===_onChangeRef$current4||_onChangeRef$current4.call(onChangeRef,{isRunning:!1})}}),[lastRunStatus,testCases]);const codeEditorOnChange=(0,react.useCallback)((props=>{var _onChangeRef$current5;null===(_onChangeRef$current5=onChangeRef.current)||void 0===_onChangeRef$current5||_onChangeRef$current5.call(onChangeRef,props)}),[]),isMobileViewPort="sm"===viewPortSize,firstChild=(0,react.useMemo)((()=>(0,jsx_runtime.jsx)("div",{className:"editor-layout",children:(0,jsx_runtime.jsx)(molecules.pq,{theme:preferredTheme,onChange:codeEditorOnChange,language,readOnly:!1,sourceCode,tabSize,fontSize})})),[preferredTheme,codeEditorOnChange,language,sourceCode,tabSize,fontSize]),withTestCases=!!testCases,closableSecondPane=(0,react.useMemo)((()=>withTestCases?{align:"right",expandLabel:(0,jsx_runtime.jsx)(atoms.T,{className:"label tx-t",children:"test cases"})}:void 0),[withTestCases]),closableFirstPane=(0,react.useMemo)((()=>withTestCases&&isMobileViewPort?{align:"right",expandLabel:(0,jsx_runtime.jsx)(atoms.T,{className:"label tx-t",children:"code editor"})}:void 0),[withTestCases,isMobileViewPort]),secondChild=(0,react.useMemo)((()=>(0,jsx_runtime.jsx)(TestCases,{testCases,onChange:onChangeRef.current,timeLimit,memoryLimit,direction,enableAddSampleCases:!!enableAddSampleCases,enableAddCustomSampleCases:!!enableAddCustomSampleCases})),[testCases,timeLimit,memoryLimit,direction,enableAddSampleCases,enableAddCustomSampleCases]),body=(0,jsx_runtime.jsxs)("div",{className:(0,helpers.AK)("jk-code-mirror-editor-layout jk-border-radius-inline",{"elevation-3":expanded},className),children:[(0,jsx_runtime.jsx)(SettingsModal,{isOpen:showSettings,onClose:()=>setShowSettings(!1),onChange:onChangeRef.current,tabSize,fontSize}),(0,jsx_runtime.jsx)(Header,{language,languages,sourceCode,testCases:testCases||{},centerOptions:_ref=>{let{widthContainer}=_ref;return null==middleButtons?void 0:middleButtons({isRunning,readOnly,sourceCode,languages,language,testCases:testCases||{},widthContainer})},setShowSettings,setRunId,onChange:onChangeRef.current,timeLimit,memoryLimit,expanded:expandPosition?expanded:null,setExpanded,isRunning}),(0,jsx_runtime.jsx)("div",{className:"editor-stdio-content",children:(0,jsx_runtime.jsxs)(molecules.ov,{direction,minSize:80,onlyFirstPane:!testCases,closableSecondPane,closableFirstPane,toggleable:!0,onChangeDirection:setDirection,onePanelAtATime:isMobileViewPort,children:[firstChild,secondChild]})})]});return expanded?(0,jsx_runtime.jsx)(atoms.h_i,{children:(0,jsx_runtime.jsx)("div",{style:{position:"absolute",...expandPosition},className:"jk-code-mirror-editor-expanded-layout",children:body})}):body};try{CodeRunnerEditor.displayName="CodeRunnerEditor",CodeRunnerEditor.__docgenInfo={description:"",displayName:"CodeRunnerEditor",props:{sourceCode:{defaultValue:null,description:"",name:"sourceCode",required:!0,type:{name:"string"}},language:{defaultValue:null,description:"",name:"language",required:!0,type:{name:"T"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"CodeRunnerEditorOnChangeType<T>"}},languages:{defaultValue:null,description:"",name:"languages",required:!1,type:{name:"{ value: T; label: string; }[]"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},middleButtons:{defaultValue:null,description:"",name:"middleButtons",required:!1,type:{name:"CodeEditorMiddleButtonsType<T>"}},testCases:{defaultValue:null,description:"",name:"testCases",required:!1,type:{name:"CodeEditorTestCasesType"}},timeLimit:{defaultValue:null,description:"",name:"timeLimit",required:!1,type:{name:"number"}},memoryLimit:{defaultValue:null,description:"",name:"memoryLimit",required:!1,type:{name:"number"}},expandPosition:{defaultValue:null,description:"",name:"expandPosition",required:!1,type:{name:"CodeEditorExpandPositionType"}},enableAddSampleCases:{defaultValue:null,description:"",name:"enableAddSampleCases",required:!1,type:{name:"boolean"}},enableAddCustomSampleCases:{defaultValue:null,description:"",name:"enableAddCustomSampleCases",required:!1,type:{name:"boolean"}},isRunning:{defaultValue:null,description:"",name:"isRunning",required:!1,type:{name:"boolean"}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"enum",value:[{value:'"LIGHT"'},{value:'"DARK"'}]}},tabSize:{defaultValue:null,description:"",name:"tabSize",required:!1,type:{name:"number"}},fontSize:{defaultValue:null,description:"",name:"fontSize",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/CodeRunnerEditor/CodeRunnerEditor.tsx#CodeRunnerEditor"]={docgenInfo:CodeRunnerEditor.__docgenInfo,name:"CodeRunnerEditor",path:"src/components/organisms/CodeRunnerEditor/CodeRunnerEditor.tsx#CodeRunnerEditor"})}catch(__react_docgen_typescript_loader_error){}}}]);