"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[4819,7080],{"./src/components/templates/Submission/SubmissionModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SubmissionModal:()=>SubmissionModal});var react=__webpack_require__("./node_modules/react/index.js"),hooks=__webpack_require__("./src/hooks/index.ts"),types=__webpack_require__("./src/types/index.ts"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),settings=__webpack_require__("./src/settings/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),SubmitView=__webpack_require__("./src/components/templates/Submission/SubmitView.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const SubmissionContentModal=_ref=>{let{submitId,isOpen,onClose}=_ref;const{components:{Link}}=(0,hooks.p1)(),[triggerFetch,setTriggerFetch]=(0,react.useState)(0);return(0,jsx_runtime.jsx)(atoms.aFV,{isOpen,onClose,closeIcon:!0,children:(0,jsx_runtime.jsxs)("section",{className:"jk-pg-md",children:[(0,jsx_runtime.jsxs)("div",{className:"fw-bd tx-l jk-row-col left gap",children:[(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{children:"submission"})}),(0,jsx_runtime.jsxs)("div",{className:"jk-row gap",children:[(0,jsx_runtime.jsx)(Link,{href:settings.LL.JUDGE().submissions.view({id:submitId}),target:"_blank",children:(0,jsx_runtime.jsx)("div",{"data-tooltip-id":"jk-tooltip","data-tooltip-content":"open submission in new tab",className:"jk-button light only-icon small link",children:(0,jsx_runtime.jsx)(atoms.PHA,{})})}),(0,jsx_runtime.jsx)(atoms.$rC,{text:submitId,children:(0,jsx_runtime.jsx)("div",{"data-tooltip-id":"jk-tooltip","data-tooltip-content":"copy id",className:"jk-button light only-icon small",children:(0,jsx_runtime.jsx)(atoms.c8I,{})})}),(0,jsx_runtime.jsx)(molecules.mT,{"data-tooltip-id":"jk-tooltip","data-tooltip-content":"reload",size:"small",icon:(0,jsx_runtime.jsx)(atoms.fNY,{}),onClick:async setLoaderStatus=>{setLoaderStatus(esm.nW6.LOADING),setTriggerFetch(Date.now()),setLoaderStatus(esm.nW6.SUCCESS)}})]})]}),(0,jsx_runtime.jsx)(SubmitView.SubmitView,{submitId,triggerFetch})]})})};try{SubmissionContentModal.displayName="SubmissionContentModal",SubmissionContentModal.__docgenInfo={description:"",displayName:"SubmissionContentModal",props:{submitId:{defaultValue:null,description:"",name:"submitId",required:!0,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/Submission/SubmissionContentModal.tsx#SubmissionContentModal"]={docgenInfo:SubmissionContentModal.__docgenInfo,name:"SubmissionContentModal",path:"src/components/templates/Submission/SubmissionContentModal.tsx#SubmissionContentModal"})}catch(__react_docgen_typescript_loader_error){}const SubmissionModal=()=>{const{searchParams,deleteSearchParams}=(0,hooks.uY)();return(0,jsx_runtime.jsx)(SubmissionContentModal,{submitId:searchParams.get(types.rs.SUBMISSION),isOpen:!!searchParams.get(types.rs.SUBMISSION),onClose:()=>deleteSearchParams({name:types.rs.SUBMISSION})})}},"./src/components/templates/Submission/SubmitView.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SubmitView:()=>SubmitView});var react=__webpack_require__("./node_modules/react/index.js"),settings=__webpack_require__("./src/settings/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),submission=__webpack_require__("./src/helpers/submission.ts"),organisms=__webpack_require__("./src/components/organisms/index.ts"),diff2html=__webpack_require__("./node_modules/diff2html/lib-esm/diff2html.js"),types=__webpack_require__("./node_modules/diff2html/lib/types.js"),helpers=__webpack_require__("./src/helpers/index.ts"),hooks=__webpack_require__("./src/hooks/index.ts"),Collapse=__webpack_require__("./src/components/atoms/Collapse/index.tsx"),SubmissionMemory=__webpack_require__("./src/components/templates/Submission/SubmissionMemory.tsx"),SubmissionTime=__webpack_require__("./src/components/templates/Submission/SubmissionTime.tsx"),SubmissionVerdict=__webpack_require__("./src/components/templates/Submission/SubmissionVerdict.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DiffViewButton=_ref=>{let{diffInput,croppedDiff}=_ref;const[isOpen,setIsOpen]=(0,react.useState)(!1),[diff,setDiff]=(0,react.useState)(""),{user:{settings:{[esm.mZ_.THEME]:userTheme}}}=(0,hooks.Mg)();(0,react.useEffect)((()=>{if(isOpen)if(/\$\/.*\.out/.test(diffInput)||/\$\/.*\.judge.out/.test(diffInput)){const diffHtml=diff2html.qy(diffInput,{drawFileList:!1,matching:"words",renderNothingWhenEmpty:!1,colorScheme:userTheme===esm.Sxu.DARK?types.d7.DARK:types.d7.LIGHT,outputFormat:"side-by-side"});setDiff(diffHtml)}else setDiff(diffInput)}),[diffInput,userTheme,isOpen]);const left=diffInput.length-diffInput.indexOf("No newline at end of file")>26;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.$nd,{"data-tooltip-id":"jk-tooltip","data-tooltip-content":"view diff",icon:(0,jsx_runtime.jsx)(atoms.ITR,{}),size:"tiny",type:"light",onClick:()=>setIsOpen(!0)}),(0,jsx_runtime.jsx)(atoms.aFV,{isOpen,onClose:()=>setIsOpen(!1),closeIcon:!0,children:(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch gap jk-pg-lg diff-body-modal",children:[(0,jsx_runtime.jsx)("div",{children:croppedDiff&&(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se cr-er fw-bd",children:"only the first 1000 characters of the difference are being displayed"})}),(0,jsx_runtime.jsx)("div",{dangerouslySetInnerHTML:{__html:diff}}),diffInput.includes("No newline at end of file")&&(0,jsx_runtime.jsxs)("div",{className:"jk-row block center",children:[(0,jsx_runtime.jsx)("div",{className:"appearance-error",children:left&&(0,jsx_runtime.jsx)(atoms.T,{children:"no newline at end of file"})}),(0,jsx_runtime.jsx)("div",{className:"appearance-error",children:!left&&(0,jsx_runtime.jsx)(atoms.T,{children:"no newline at end of file"})})]})]})})]})},SubmissionGroupInfo=props=>{const{groupKey,problemScoringMode,timeUsed,memoryUsed,verdict,points,testCases,submitId,isProblemEditor}=props,{viewPortSize}=(0,hooks.p1)(),rowHeight="sm"===viewPortSize?70:40,testCasesString=JSON.stringify(testCases),renderRow=(0,react.useCallback)((index=>{var _testCase$points;const testCase=JSON.parse(testCasesString)[index];return(0,jsx_runtime.jsxs)("div",{className:"jk-row extend block gap jk-table-inline-row",style:{borderBottom:"1px solid var(--t-color-gray-5)"},children:[isProblemEditor?(0,jsx_runtime.jsx)("div",{"data-tooltip-id":"jk-tooltip","data-tooltip-content":testCase.testCaseKey,"data-tooltip-t-class-name":"ws-np",className:"jk-row",style:{flex:.4},children:index+1}):(0,jsx_runtime.jsx)("div",{className:"jk-row",style:{flex:.4},children:index+1}),(0,jsx_runtime.jsxs)("div",{className:"jk-row gap center nowrap",style:{flex:2},children:[(0,jsx_runtime.jsx)(SubmissionVerdict.y,{verdict:testCase.verdict,submitId}),testCase.diff&&(0,jsx_runtime.jsx)(DiffViewButton,{croppedDiff:testCase.croppedDiff,diffInput:testCase.diff.replaceAll(testCase.testCaseKey+".judge.out","A").replaceAll(testCase.testCaseKey+".out","B")})]}),problemScoringMode===esm.MEM.PARTIAL&&(0,jsx_runtime.jsx)("div",{className:"jk-row",children:null===(_testCase$points=testCase.points)||void 0===_testCase$points?void 0:_testCase$points.toFixed(3)}),(0,jsx_runtime.jsx)("div",{className:"jk-row center ws-np nowrap",children:(0,jsx_runtime.jsx)(SubmissionTime.u,{verdict:testCase.verdict,timeUsed:testCase.timeUsed})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center ws-np nowrap",children:(0,jsx_runtime.jsx)(SubmissionMemory.m,{verdict:testCase.verdict,memoryUsed:testCase.memoryUsed})}),(0,jsx_runtime.jsx)("div",{className:(0,helpers.xW)("jk-row center gap",{"cr-er fw-bd":0!==(null==testCase?void 0:testCase.exitCode)}),children:testCase.exitCode})]},index)}),[isProblemEditor,problemScoringMode,submitId,testCasesString]);return(0,jsx_runtime.jsx)(Collapse.S,{header:_ref2=>{let{isOpen,toggle}=_ref2;return(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-row extend block gap jk-table-inline-row jk-pg-md group-info",{"fw-br":isOpen}),children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row left nowrap",children:[!!testCases.length&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.Hd_,{onClick:toggle,rotate:isOpen?0:180,className:"link"})," "]}),+groupKey?problemScoringMode===esm.MEM.SUBTASK?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se ws-np",children:"subtask"})," ",groupKey]}):problemScoringMode===esm.MEM.PARTIAL?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se ws-np",children:"group"})," ",groupKey]}):(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"test cases"}):(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"sample cases"})]}),(0,jsx_runtime.jsx)("div",{className:"jk-row center gap nowrap",style:{flex:3},children:(0,jsx_runtime.jsx)(SubmissionVerdict.y,{verdict,points,submitId})}),(problemScoringMode===esm.MEM.SUBTASK||problemScoringMode===esm.MEM.PARTIAL)&&(0,jsx_runtime.jsx)("div",{className:"jk-row center",children:+points.toFixed(4)}),(0,jsx_runtime.jsx)("div",{className:"jk-row center",children:(0,jsx_runtime.jsx)(SubmissionTime.u,{timeUsed,verdict})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center",children:(0,jsx_runtime.jsx)(SubmissionMemory.m,{verdict,memoryUsed})})]})},className:"wh-100 tx-s",children:(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-row extend group-info-details"),children:[(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-row extend block gap jk-table-inline-row fw-bd"),children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",style:{flex:.4},children:(0,jsx_runtime.jsx)(atoms.T,{children:"#"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center gap",style:{flex:2},children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"verdict"})}),problemScoringMode===esm.MEM.PARTIAL&&(0,jsx_runtime.jsx)("div",{className:"jk-row center gap",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"points"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center gap",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"time"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center gap",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"memory"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row center gap",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"exit code"})})]}),(0,jsx_runtime.jsx)("div",{style:{width:"100%",height:rowHeight*Math.min(testCases.length,3)+1},className:(0,helpers.xW)({"top-bottom-inset-shadow":testCases.length>3}),children:(0,jsx_runtime.jsx)(atoms.$0g,{size:testCases.length,rowHeight,renderRow})})]})})};try{SubmissionGroupInfo.displayName="SubmissionGroupInfo",SubmissionGroupInfo.__docgenInfo={description:"",displayName:"SubmissionGroupInfo",props:{isProblemEditor:{defaultValue:null,description:"",name:"isProblemEditor",required:!0,type:{name:"boolean"}},groupKey:{defaultValue:null,description:"",name:"groupKey",required:!0,type:{name:"number"}},problemScoringMode:{defaultValue:null,description:"",name:"problemScoringMode",required:!0,type:{name:"enum",value:[{value:'"SUBTASK"'},{value:'"TOTAL"'},{value:'"PARTIAL"'}]}},timeUsed:{defaultValue:null,description:"",name:"timeUsed",required:!0,type:{name:"number"}},memoryUsed:{defaultValue:null,description:"",name:"memoryUsed",required:!0,type:{name:"number"}},verdict:{defaultValue:null,description:"",name:"verdict",required:!0,type:{name:"enum",value:[{value:'"NONE"'},{value:'"PENDING"'},{value:'"HIDDEN"'},{value:'"CE"'},{value:'"RE"'},{value:'"TLE"'},{value:'"MLE"'},{value:'"WA"'},{value:'"PE"'},{value:'"PA"'},{value:'"AC"'}]}},points:{defaultValue:null,description:"",name:"points",required:!0,type:{name:"number"}},testCases:{defaultValue:null,description:"",name:"testCases",required:!0,type:{name:"TestCaseResultType[]"}},submitId:{defaultValue:null,description:"",name:"submitId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/Submission/SubmissionGroupInfo.tsx#SubmissionGroupInfo"]={docgenInfo:SubmissionGroupInfo.__docgenInfo,name:"SubmissionGroupInfo",path:"src/components/templates/Submission/SubmissionGroupInfo.tsx#SubmissionGroupInfo"})}catch(__react_docgen_typescript_loader_error){}var SubmissionListenerVerdict=__webpack_require__("./src/components/templates/Submission/SubmissionListenerVerdict.tsx");const SubmitViewContent=_ref=>{let{submit}=_ref;const{submitId,problem:{isEditor:isProblemEditor,scoringMode:problemScoringMode},user:{canViewSourceCode},language,sourceCode,memoryUsed,timeUsed,verdict,points,status,timestamp,testCaseResults,verdictByGroups,compilationResult,judgmentTime}=submit,date=new Date(timestamp),testCasesByGroup={};(testCaseResults||[]).forEach((testCase=>{const group=testCase.group?problemScoringMode===esm.MEM.SUBTASK?testCase.group:1:0;testCasesByGroup[group]?testCasesByGroup[group].push(testCase):testCasesByGroup[group]=[testCase]}));const compilationFailed=verdict!==esm.npq.NONE&&verdict!==esm.npq.PENDING&&!1===(null==compilationResult?void 0:compilationResult.success);return(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch gap",children:[(0,jsx_runtime.jsx)(atoms.SDm,{header:_ref2=>{var _PROGRAMMING_LANGUAGE;let{isOpen,toggle}=_ref2;return(0,jsx_runtime.jsxs)("div",{className:"jk-row-col gap tx-s bottom",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(organisms.A1,{imageUrl:submit.user.imageUrl,nickname:submit.user.nickname})}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"nickname"})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(null===(_PROGRAMMING_LANGUAGE=esm.tcq[language])||void 0===_PROGRAMMING_LANGUAGE?void 0:_PROGRAMMING_LANGUAGE.label)||language}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"language"})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row gap center",children:[(0,jsx_runtime.jsx)(SubmissionListenerVerdict.g,{verdict,points,status,submitId}),compilationFailed&&(0,jsx_runtime.jsx)(atoms.Hd_,{onClick:toggle,rotate:isOpen?0:180,className:"link"})]}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"verdict"})]}),(0,submission.J)(verdict)&&(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(SubmissionTime.u,{timeUsed,verdict})}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"time used"})]}),(0,submission.J)(verdict)&&(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(SubmissionMemory.m,{memoryUsed,verdict})}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"memory used"})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)(atoms.cLw,{date,twoLines:!0}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"date"})]}),isProblemEditor&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row",children:["~ ",judgmentTime>0?(0,jsx_runtime.jsx)(molecules.M4,{currentTimestamp:judgmentTime,interval:0,literal:!0,laps:1}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(molecules.M4,{currentTimestamp:Date.now()- -judgmentTime,interval:1e3,literal:!0,laps:1})})]}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:judgmentTime>0?"judgment time":"judging"})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-col",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(organisms.n6,{submissionId:submit.submitId})}),(0,jsx_runtime.jsx)(atoms.T,{className:"fw-bd tt-se",children:"actions"})]})]})]})},startsShowing:compilationFailed,className:"wh-100",children:(0,jsx_runtime.jsx)("div",{className:"submission-stderr-content jk-text-stderr",children:null==compilationResult?void 0:compilationResult.err})}),(verdictByGroups&&!!Object.keys(verdictByGroups).length||testCasesByGroup&&!!Object.keys(testCasesByGroup).length)&&(0,jsx_runtime.jsxs)("div",{className:"wh-100",children:[(0,jsx_runtime.jsx)("div",{className:"tx-l fw-bd cr-pd",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:problemScoringMode===esm.MEM.SUBTASK?"information by subtasks":problemScoringMode===esm.MEM.PARTIAL?"information by groups":"sample and test case information"})}),(0,jsx_runtime.jsx)("div",{className:"jk-col gap",children:(0,jsx_runtime.jsxs)("div",{className:"jk-row extend block gap jk-table-inline-header",children:[(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:problemScoringMode===esm.MEM.SUBTASK?"groups":""})}),(0,jsx_runtime.jsx)("div",{className:"jk-row",style:{flex:3},children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"verdict"})}),(problemScoringMode===esm.MEM.SUBTASK||problemScoringMode===esm.MEM.PARTIAL)&&(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"points"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"time"})}),(0,jsx_runtime.jsx)("div",{className:"jk-row",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"memory"})})]})}),verdictByGroups&&Object.keys(verdictByGroups).length?(0,jsx_runtime.jsx)("div",{className:"jk-col jk-border-radius-inline",children:Object.entries(verdictByGroups).map((_ref3=>{let[groupKey,result]=_ref3;return(0,jsx_runtime.jsx)(SubmissionGroupInfo,{groupKey:+groupKey,isProblemEditor,problemScoringMode,memoryUsed:result.memoryUsed,verdict:result.verdict,timeUsed:result.timeUsed,points:result.points,testCases:testCasesByGroup[result.group]||[],submitId},groupKey)}))}):(0,jsx_runtime.jsx)("div",{className:"jk-col jk-border-radius-inline",children:Object.entries(testCasesByGroup).map((_ref4=>{let[groupKey,result]=_ref4;return(0,jsx_runtime.jsx)(SubmissionGroupInfo,{groupKey:+groupKey,isProblemEditor,problemScoringMode,memoryUsed:0,verdict,timeUsed:0,points:problemScoringMode===esm.MEM.PARTIAL?+result.reduce(((sum,testCase)=>sum+testCase.points),0).toFixed(3):0,testCases:result,submitId},groupKey)}))})]}),!!canViewSourceCode&&(0,jsx_runtime.jsxs)("div",{className:"jk-col stretch wh-100",children:[(0,jsx_runtime.jsx)("div",{className:"tx-l fw-bd cr-pd",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"source code"})}),(0,jsx_runtime.jsx)("div",{className:"submission-info-code-source",children:(0,jsx_runtime.jsx)(molecules.Cv,{code:sourceCode,language,lineNumbers:!0,withCopyButton:!0,withLanguageLabel:!0})})]})]})};try{SubmitViewContent.displayName="SubmitViewContent",SubmitViewContent.__docgenInfo={description:"",displayName:"SubmitViewContent",props:{submit:{defaultValue:null,description:"",name:"submit",required:!0,type:{name:"SubmissionDataResponseDTO"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/Submission/SubmitViewContent.tsx#SubmitViewContent"]={docgenInfo:SubmitViewContent.__docgenInfo,name:"SubmitViewContent",path:"src/components/templates/Submission/SubmitViewContent.tsx#SubmitViewContent"})}catch(__react_docgen_typescript_loader_error){}const SubmitView=_ref=>{let{submitId,triggerFetch}=_ref;return(0,jsx_runtime.jsx)(molecules.pW,{url:settings.ug.API_V1.submission.getData({params:{id:submitId}}).url,errorView:()=>(0,jsx_runtime.jsx)("div",{className:"jk-col extend jk-pg-md",children:(0,jsx_runtime.jsxs)("div",{className:"jk-col gap center",children:[(0,jsx_runtime.jsx)("div",{className:"image-404",children:(0,jsx_runtime.jsx)(atoms.CZe,{})}),(0,jsx_runtime.jsx)("h3",{children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-ue",children:"submission not found"})}),(0,jsx_runtime.jsx)("p",{children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"the submission does not exist or you do not have permissions to view it"})})]})}),triggerFetch,children:_ref2=>{let{data,mutate}=_ref2;return(0,jsx_runtime.jsx)(SubmitViewContent,{submit:data.content})}})};try{SubmitView.displayName="SubmitView",SubmitView.__docgenInfo={description:"",displayName:"SubmitView",props:{submitId:{defaultValue:null,description:"",name:"submitId",required:!0,type:{name:"string"}},triggerFetch:{defaultValue:null,description:"",name:"triggerFetch",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/Submission/SubmitView.tsx#SubmitView"]={docgenInfo:SubmitView.__docgenInfo,name:"SubmitView",path:"src/components/templates/Submission/SubmitView.tsx#SubmitView"})}catch(__react_docgen_typescript_loader_error){}}}]);