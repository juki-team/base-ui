"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[979],{"./src/components/templates/ProblemView/ProblemView.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ProblemView:()=>ProblemView});var react=__webpack_require__("./node_modules/react/index.js"),helpers=__webpack_require__("./src/helpers/index.ts"),hooks=__webpack_require__("./src/hooks/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),config=__webpack_require__("./src/config/index.tsx"),UserCodeEditor=__webpack_require__("./src/components/organisms/UserCodeEditor/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ProblemCodeEditor=props=>{var _problem$statement$sa;const{problem,codeEditorCenterButtons,codeEditorRightButtons,codeEditorSourceStoreKey}=props,initialTestCases={};null===(_problem$statement$sa=problem.statement.sampleCases)||void 0===_problem$statement$sa||_problem$statement$sa.forEach(((sample,index)=>{const key="sample-"+index;initialTestCases[key]={key,log:"",sample:!0,status:esm.$M.NONE,err:"",out:"",index,in:sample.input,withPE:problem.settings.withPE,testOut:sample.output,hidden:!1}}));const{company:{key:companyKey}}=(0,hooks.MQ)(),{data:virtualJudgeData}=(0,hooks.wh)([esm.jq.CODEFORCES,esm.jq.JV_UMSA,esm.jq.CODEFORCES_GYM].includes(problem.judge)?config.A.API.judge.get({params:{judge:problem.judge,companyKey}}).url:null),languages=(0,react.useMemo)((()=>{let languages=[];var _PROGRAMMING_LANGUAGE2;([esm.jq.CODEFORCES,esm.jq.JV_UMSA,esm.jq.CODEFORCES,esm.jq.CODEFORCES_GYM].includes(problem.judge)?languages=((null==virtualJudgeData?void 0:virtualJudgeData.success)&&virtualJudgeData.content.languages||[]).filter((lang=>lang.enabled)).map((lang=>({value:lang.value,label:lang.label||lang.value}))):problem.judge!==esm.jq.CUSTOMER&&problem.judge!==esm.jq.JUKI_JUDGE||(languages=esm.EQ.map((language=>{var _PROGRAMMING_LANGUAGE;return{value:language,label:(null===(_PROGRAMMING_LANGUAGE=esm.GK[language])||void 0===_PROGRAMMING_LANGUAGE?void 0:_PROGRAMMING_LANGUAGE.label)||language}}))),languages.length)||(languages=[{value:esm.Xn.TEXT,label:null===(_PROGRAMMING_LANGUAGE2=esm.GK[esm.Xn.TEXT])||void 0===_PROGRAMMING_LANGUAGE2?void 0:_PROGRAMMING_LANGUAGE2.label}]);return languages}),[virtualJudgeData,problem.judge]);return(0,jsx_runtime.jsx)(UserCodeEditor.r,{languages,sourceStoreKey:codeEditorSourceStoreKey,centerButtons:codeEditorCenterButtons,rightButtons:codeEditorRightButtons,initialTestCases:problem.judge===esm.jq.JUKI_JUDGE||problem.judge===esm.jq.CUSTOMER?initialTestCases:void 0,enableAddCustomSampleCases:!0})};try{ProblemCodeEditor.displayName="ProblemCodeEditor",ProblemCodeEditor.__docgenInfo={description:"",displayName:"ProblemCodeEditor",props:{problem:{defaultValue:null,description:"",name:"problem",required:!0,type:{name:"ProblemResponseDTO"}},codeEditorCenterButtons:{defaultValue:null,description:"",name:"codeEditorCenterButtons",required:!1,type:{name:"CodeEditorCenterButtonsType<T>"}},codeEditorRightButtons:{defaultValue:null,description:"",name:"codeEditorRightButtons",required:!1,type:{name:'((props: Omit<CodeEditorCenterButtonsPropertiesType<T>, "widthContainer">) => ReactNode)'}},codeEditorSourceStoreKey:{defaultValue:null,description:"",name:"codeEditorSourceStoreKey",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ProblemView/ProblemCodeEditor.tsx#ProblemCodeEditor"]={docgenInfo:ProblemCodeEditor.__docgenInfo,name:"ProblemCodeEditor",path:"src/components/templates/ProblemView/ProblemCodeEditor.tsx#ProblemCodeEditor"})}catch(__react_docgen_typescript_loader_error){}var mdMath=__webpack_require__("./src/components/organisms/mdMath/index.ts"),ProblemInfo=__webpack_require__("./src/components/templates/ProblemInfo/index.ts");const SampleTest=_ref=>{let{index,sampleCases,withPE}=_ref;const sample=(null==sampleCases?void 0:sampleCases[index])||{input:"",output:""};return(0,jsx_runtime.jsx)("div",{className:"jk-row stretch gap",children:(0,jsx_runtime.jsxs)("div",{className:"jk-row block stretch gap flex-1",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row nowrap left stretch gap bc-we jk-border-radius-inline",children:(0,jsx_runtime.jsxs)("div",{className:"sample-text-content jk-border-radius-inline",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row gap sample-text-icons",children:[withPE&&(0,jsx_runtime.jsx)(atoms.ua7,{content:(0,jsx_runtime.jsx)(atoms.T,{children:"".concat(sample.input.lastIndexOf("\n")===sample.input.length-1?"":"no ","newline at end of file")}),placement:"left",children:(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.szr,{size:"small"})})}),(0,jsx_runtime.jsx)(atoms.h9,{text:sample.input,children:(0,jsx_runtime.jsx)(atoms.BoZ,{size:"small",className:"jk-button light only-icon"})})]}),(0,jsx_runtime.jsx)("span",{children:sample.input})]})}),(0,jsx_runtime.jsx)("div",{className:"jk-row nowrap left stretch gap bc-we jk-border-radius-inline",children:(0,jsx_runtime.jsxs)("div",{className:"sample-text-content jk-border-radius-inline",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row gap sample-text-icons",children:[withPE&&(0,jsx_runtime.jsx)(atoms.ua7,{content:(0,jsx_runtime.jsx)(atoms.T,{children:"".concat(sample.output.lastIndexOf("\n")===sample.output.length-1?"":"no ","newline at end of file")}),placement:"left",children:(0,jsx_runtime.jsx)("div",{className:"newline-eof",children:(0,jsx_runtime.jsx)(atoms.szr,{size:"small"})})}),(0,jsx_runtime.jsx)(atoms.h9,{text:sample.output,children:(0,jsx_runtime.jsx)(atoms.BoZ,{size:"small",className:"jk-button light only-icon br-50-pc copy-test-icon"})})]}),(0,jsx_runtime.jsx)("span",{children:sample.output})]})})]})})};try{SampleTest.displayName="SampleTest",SampleTest.__docgenInfo={description:"",displayName:"SampleTest",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},sampleCases:{defaultValue:null,description:"",name:"sampleCases",required:!0,type:{name:"ProblemSampleCasesType"}},withPE:{defaultValue:null,description:"",name:"withPE",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ProblemView/SampleTest.tsx#SampleTest"]={docgenInfo:SampleTest.__docgenInfo,name:"SampleTest",path:"src/components/templates/ProblemView/SampleTest.tsx#SampleTest"})}catch(__react_docgen_typescript_loader_error){}const ProblemStatementView=_ref=>{let{problem,contest,infoPlacement,withoutName}=_ref;const{judge,key:problemKey,name,settings,tags,author,status,statement}=problem,{user:{settings:{[esm.w4.LANGUAGE]:preferredLanguage,[esm.w4.THEME]:preferredTheme}}}=(0,hooks.MQ)(),{t}=(0,hooks.NT)(),problemName=null!=contest&&contest.index?"(".concat(t("problem")," ").concat(null==contest?void 0:contest.index,") ").concat(name):"(".concat(t("id")," ").concat(problemKey,") ").concat(name),{statementDescription,statementInput,statementOutput,statementNote,mdStatement}=(0,helpers.EN)(t,{statement,settings},preferredLanguage,problemName);if([esm.jq.CODEFORCES,esm.jq.JV_UMSA,esm.jq.CODEFORCES_GYM].includes(judge))return(0,jsx_runtime.jsx)("div",{className:"jk-row extend top",style:{overflow:"auto",height:"100%",width:"100%"},children:(0,jsx_runtime.jsx)("div",{className:"jk-row extend top gap nowrap stretch left",style:{position:"relative"},children:(0,jsx_runtime.jsx)("div",{className:"".concat(judge,"-statement"),dangerouslySetInnerHTML:{__html:statement.html[esm.SQ.EN]||statement.html[esm.SQ.ES]}})})});const handleDownloadPdf=()=>(0,helpers.dq)(mdStatement,preferredTheme,"Juki Judge ".concat(problemName,".pdf")),handleDownloadMd=async()=>{(0,helpers.io)(new Blob([mdStatement],{type:"text/plain"}),"Juki Judge ".concat(problemName,".md"))};return(0,jsx_runtime.jsx)("div",{className:"jk-row extend top",children:(0,jsx_runtime.jsxs)("div",{className:"jk-row extend top gap nowrap stretch left",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-col top stretch flex-3",children:["left"!==infoPlacement&&(0,jsx_runtime.jsx)(molecules.oR,{actionButtons:[{icon:(0,jsx_runtime.jsx)(atoms._8t,{}),buttons:[{icon:(0,jsx_runtime.jsx)(atoms._8t,{}),label:(0,jsx_runtime.jsx)(atoms.T,{children:"pdf"}),onClick:handleDownloadPdf},{icon:(0,jsx_runtime.jsx)(atoms._8t,{}),label:(0,jsx_runtime.jsx)(atoms.T,{children:"md"}),onClick:handleDownloadMd}]}]}),!withoutName&&(0,jsx_runtime.jsxs)("div",{className:"jk-row gap center",children:[(0,jsx_runtime.jsx)("h3",{children:problem.name}),"name"===infoPlacement&&(0,jsx_runtime.jsx)(ProblemInfo.h4,{problem})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"description"})}),(0,jsx_runtime.jsx)("div",{className:"bc-we jk-pg-sm jk-br-ie",children:(0,jsx_runtime.jsx)(mdMath.HN,{source:statementDescription})})]}),!!statementInput&&(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"input"})}),(0,jsx_runtime.jsx)("div",{className:"bc-we jk-pg-sm jk-br-ie",children:(0,jsx_runtime.jsx)(mdMath.HN,{source:statementInput})})]}),!!statementOutput&&(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"output"})}),(0,jsx_runtime.jsx)("div",{className:"bc-we jk-pg-sm jk-br-ie",children:(0,jsx_runtime.jsx)(mdMath.HN,{source:statementOutput})})]}),settings.mode===esm.nx.SUBTASK&&(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"subtasks description"})}),(0,jsx_runtime.jsxs)("div",{className:"jk-col left stretch gap",children:[Object.values(settings.pointsByGroups).map((pointsByGroup=>{var _pointsByGroup$descri,_pointsByGroup$descri2,_pointsByGroup$descri3;return(0,jsx_runtime.jsx)("div",{className:"jk-row extend gap",children:(0,jsx_runtime.jsxs)("div",{className:"flex-1 bc-we jk-pg-sm jk-br-ie",children:[(0,jsx_runtime.jsxs)("div",{className:"fw-bd cr-pd",children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"subtask"})," ",pointsByGroup.group," (",pointsByGroup.points," ",1===pointsByGroup.points?(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"point"}):(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"points"}),")"]}),(0,jsx_runtime.jsx)(mdMath.HN,{source:(null===(_pointsByGroup$descri=pointsByGroup.description)||void 0===_pointsByGroup$descri?void 0:_pointsByGroup$descri[preferredLanguage])||(null===(_pointsByGroup$descri2=pointsByGroup.description)||void 0===_pointsByGroup$descri2?void 0:_pointsByGroup$descri2[esm.SQ.EN])||(null===(_pointsByGroup$descri3=pointsByGroup.description)||void 0===_pointsByGroup$descri3?void 0:_pointsByGroup$descri3[esm.SQ.ES])})]})},pointsByGroup.group)})),(0,jsx_runtime.jsx)("div",{})]})]}),(0,jsx_runtime.jsx)("div",{className:"jk-row stretch gap",children:(0,jsx_runtime.jsxs)("div",{className:"jk-row stretch gap nowrap flex-1 jk-pg-sm-tb",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se tx-h cr-pd fw-bd",children:"input sample"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se tx-h cr-pd fw-bd",children:"output sample"})})]})}),(0,jsx_runtime.jsx)("div",{className:"jk-col stretch gap",children:(statement.sampleCases||[{input:"",output:""}]).map(((sample,index)=>(0,jsx_runtime.jsx)(SampleTest,{index,sampleCases:statement.sampleCases,withPE:problem.settings.withPE},index)))}),!!statementNote&&(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"note"})}),(0,jsx_runtime.jsx)("div",{className:"br-g6 bc-we jk-pg-md jk-border-radius-inline",children:(0,jsx_runtime.jsx)(mdMath.HN,{source:statementNote})})]})]}),"left"===infoPlacement&&(0,jsx_runtime.jsx)("div",{className:"screen md lg hg flex-1",children:(0,jsx_runtime.jsxs)(ProblemInfo.YA,{settings,status,tags,author,expand:!0,children:[(0,jsx_runtime.jsx)(molecules.l_,{size:"small",icon:(0,jsx_runtime.jsx)(atoms._8t,{}),onClick:async setLoaderStatus=>{setLoaderStatus(esm.qb.LOADING);try{await handleDownloadPdf(),setLoaderStatus(esm.qb.SUCCESS)}catch(error){setLoaderStatus(esm.qb.ERROR)}},children:(0,jsx_runtime.jsx)(atoms.T,{children:"download as pdf"})}),(0,jsx_runtime.jsx)(molecules.l_,{size:"small",icon:(0,jsx_runtime.jsx)(atoms._8t,{}),onClick:async setLoaderStatus=>{setLoaderStatus(esm.qb.LOADING);try{await handleDownloadMd(),setLoaderStatus(esm.qb.SUCCESS)}catch(error){setLoaderStatus(esm.qb.ERROR)}},children:(0,jsx_runtime.jsx)(atoms.T,{children:"download as md"})})]})})]})})};try{ProblemStatementView.displayName="ProblemStatementView",ProblemStatementView.__docgenInfo={description:"",displayName:"ProblemStatementView",props:{problem:{defaultValue:null,description:"",name:"problem",required:!0,type:{name:"ProblemResponseDTO"}},contest:{defaultValue:null,description:"",name:"contest",required:!1,type:{name:"{ index: string; color: string; }"}},infoPlacement:{defaultValue:null,description:"",name:"infoPlacement",required:!0,type:{name:"enum",value:[{value:'"name"'},{value:'"left"'},{value:'"none"'}]}},withoutName:{defaultValue:null,description:"",name:"withoutName",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ProblemView/ProblemStatementView.tsx#ProblemStatementView"]={docgenInfo:ProblemStatementView.__docgenInfo,name:"ProblemStatementView",path:"src/components/templates/ProblemView/ProblemStatementView.tsx#ProblemStatementView"})}catch(__react_docgen_typescript_loader_error){}const ProblemView=_ref=>{let{problem,codeEditorCenterButtons,codeEditorSourceStoreKey,infoPlacement,withoutName}=_ref;const{viewPortSize}=(0,hooks.Tv)(),[expanded,setExpanded]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(molecules.ov,{minSize:400,className:(0,helpers.AK)("jk-problem-view-layout",{"jk-full-screen-overlay":expanded}),closableSecondPane:{expandLabel:(0,jsx_runtime.jsx)(atoms.T,{className:"label tx-t",children:"code editor"}),align:"center"},closableFirstPane:{expandLabel:(0,jsx_runtime.jsx)(atoms.T,{className:"label tx-t",children:"problem statement"}),align:"center"},onePanelAtATime:"sm"===viewPortSize,children:[(0,jsx_runtime.jsx)("div",{className:"jk-problem-view-statement jk-pg-sm",children:(0,jsx_runtime.jsx)(ProblemStatementView,{problem,withoutName:!expanded&&withoutName,infoPlacement})}),(0,jsx_runtime.jsx)(ProblemCodeEditor,{problem,codeEditorCenterButtons,codeEditorRightButtons:_ref2=>{let{withLabels,twoRows}=_ref2;return twoRows||withLabels?(0,jsx_runtime.jsx)(atoms.zxk,{size:"tiny",type:"light",onClick:()=>setExpanded((prevState=>!prevState)),icon:expanded?(0,jsx_runtime.jsx)(atoms.wvt,{}):(0,jsx_runtime.jsx)(atoms.$_3,{}),extend:twoRows,children:(0,jsx_runtime.jsx)(atoms.T,{children:expanded?"back":"expand"})}):(0,jsx_runtime.jsx)(atoms.ua7,{content:(0,jsx_runtime.jsx)(atoms.T,{children:expanded?"back":"expand"}),placement:"bottom-end",children:(0,jsx_runtime.jsx)(atoms.zxk,{size:"tiny",type:"light",onClick:()=>setExpanded((prevState=>!prevState)),icon:expanded?(0,jsx_runtime.jsx)(atoms.wvt,{}):(0,jsx_runtime.jsx)(atoms.$_3,{}),extend:twoRows})})},codeEditorSourceStoreKey})]})};try{ProblemView.displayName="ProblemView",ProblemView.__docgenInfo={description:"",displayName:"ProblemView",props:{codeEditorCenterButtons:{defaultValue:null,description:"",name:"codeEditorCenterButtons",required:!1,type:{name:"CodeEditorCenterButtonsType<T>"}},codeEditorSourceStoreKey:{defaultValue:null,description:"",name:"codeEditorSourceStoreKey",required:!1,type:{name:"string"}},problem:{defaultValue:null,description:"",name:"problem",required:!0,type:{name:"ProblemResponseDTO"}},contest:{defaultValue:null,description:"",name:"contest",required:!1,type:{name:"{ index: string; color: string; }"}},infoPlacement:{defaultValue:null,description:"",name:"infoPlacement",required:!0,type:{name:"enum",value:[{value:'"name"'},{value:'"left"'},{value:'"none"'}]}},withoutName:{defaultValue:null,description:"",name:"withoutName",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/ProblemView/ProblemView.tsx#ProblemView"]={docgenInfo:ProblemView.__docgenInfo,name:"ProblemView",path:"src/components/templates/ProblemView/ProblemView.tsx#ProblemView"})}catch(__react_docgen_typescript_loader_error){}}}]);