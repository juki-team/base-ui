"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[7865],{"./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>AnimatePresence});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),LayoutGroupContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/LayoutGroupContext.mjs"),use_constant=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-constant.mjs"),PresenceContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/PresenceContext.mjs"),MotionConfigContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/MotionConfigContext.mjs");class PopChildMeasure extends react.Component{getSnapshotBeforeUpdate(prevProps){const element=this.props.childRef.current;if(element&&prevProps.isPresent&&!this.props.isPresent){const parent=element.offsetParent,parentWidth=parent instanceof HTMLElement&&parent.offsetWidth||0,size=this.props.sizeRef.current;size.height=element.offsetHeight||0,size.width=element.offsetWidth||0,size.top=element.offsetTop,size.left=element.offsetLeft,size.right=parentWidth-size.width-size.left}return null}componentDidUpdate(){}render(){return this.props.children}}function PopChild({children,isPresent,anchorX}){const id=(0,react.useId)(),ref=(0,react.useRef)(null),size=(0,react.useRef)({width:0,height:0,top:0,left:0,right:0}),{nonce}=(0,react.useContext)(MotionConfigContext.Q);return(0,react.useInsertionEffect)((()=>{const{width,height,top,left,right}=size.current;if(isPresent||!ref.current||!width||!height)return;const x="left"===anchorX?`left: ${left}`:`right: ${right}`;ref.current.dataset.motionPopId=id;const style=document.createElement("style");return nonce&&(style.nonce=nonce),document.head.appendChild(style),style.sheet&&style.sheet.insertRule(`\n          [data-motion-pop-id="${id}"] {\n            position: absolute !important;\n            width: ${width}px !important;\n            height: ${height}px !important;\n            ${x}px !important;\n            top: ${top}px !important;\n          }\n        `),()=>{document.head.removeChild(style)}}),[isPresent]),(0,jsx_runtime.jsx)(PopChildMeasure,{isPresent,childRef:ref,sizeRef:size,children:react.cloneElement(children,{ref})})}const PresenceChild=({children,initial,isPresent,onExitComplete,custom,presenceAffectsLayout,mode,anchorX})=>{const presenceChildren=(0,use_constant.M)(newChildrenMap),id=(0,react.useId)(),memoizedOnExitComplete=(0,react.useCallback)((childId=>{presenceChildren.set(childId,!0);for(const isComplete of presenceChildren.values())if(!isComplete)return;onExitComplete&&onExitComplete()}),[presenceChildren,onExitComplete]),context=(0,react.useMemo)((()=>({id,initial,isPresent,custom,onExitComplete:memoizedOnExitComplete,register:childId=>(presenceChildren.set(childId,!1),()=>presenceChildren.delete(childId))})),presenceAffectsLayout?[Math.random(),memoizedOnExitComplete]:[isPresent,memoizedOnExitComplete]);return(0,react.useMemo)((()=>{presenceChildren.forEach(((_,key)=>presenceChildren.set(key,!1)))}),[isPresent]),react.useEffect((()=>{!isPresent&&!presenceChildren.size&&onExitComplete&&onExitComplete()}),[isPresent]),"popLayout"===mode&&(children=(0,jsx_runtime.jsx)(PopChild,{isPresent,anchorX,children})),(0,jsx_runtime.jsx)(PresenceContext.t.Provider,{value:context,children})};function newChildrenMap(){return new Map}var use_presence=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs");const getChildKey=child=>child.key||"";function onlyElements(children){const filtered=[];return react.Children.forEach(children,(child=>{(0,react.isValidElement)(child)&&filtered.push(child)})),filtered}var use_isomorphic_effect=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");const AnimatePresence=({children,custom,initial=!0,onExitComplete,presenceAffectsLayout=!0,mode="sync",propagate=!1,anchorX="left"})=>{const[isParentPresent,safeToRemove]=(0,use_presence.xQ)(propagate),presentChildren=(0,react.useMemo)((()=>onlyElements(children)),[children]),presentKeys=propagate&&!isParentPresent?[]:presentChildren.map(getChildKey),isInitialRender=(0,react.useRef)(!0),pendingPresentChildren=(0,react.useRef)(presentChildren),exitComplete=(0,use_constant.M)((()=>new Map)),[diffedChildren,setDiffedChildren]=(0,react.useState)(presentChildren),[renderedChildren,setRenderedChildren]=(0,react.useState)(presentChildren);(0,use_isomorphic_effect.E)((()=>{isInitialRender.current=!1,pendingPresentChildren.current=presentChildren;for(let i=0;i<renderedChildren.length;i++){const key=getChildKey(renderedChildren[i]);presentKeys.includes(key)?exitComplete.delete(key):!0!==exitComplete.get(key)&&exitComplete.set(key,!1)}}),[renderedChildren,presentKeys.length,presentKeys.join("-")]);const exitingChildren=[];if(presentChildren!==diffedChildren){let nextChildren=[...presentChildren];for(let i=0;i<renderedChildren.length;i++){const child=renderedChildren[i],key=getChildKey(child);presentKeys.includes(key)||(nextChildren.splice(i,0,child),exitingChildren.push(child))}return"wait"===mode&&exitingChildren.length&&(nextChildren=exitingChildren),setRenderedChildren(onlyElements(nextChildren)),setDiffedChildren(presentChildren),null}const{forceRender}=(0,react.useContext)(LayoutGroupContext.L);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:renderedChildren.map((child=>{const key=getChildKey(child),isPresent=!(propagate&&!isParentPresent)&&(presentChildren===renderedChildren||presentKeys.includes(key));return(0,jsx_runtime.jsx)(PresenceChild,{isPresent,initial:!(isInitialRender.current&&!initial)&&void 0,custom,presenceAffectsLayout,mode,onExitComplete:isPresent?void 0:()=>{if(!exitComplete.has(key))return;exitComplete.set(key,!0);let isEveryExitComplete=!0;exitComplete.forEach((isExitComplete=>{isExitComplete||(isEveryExitComplete=!1)})),isEveryExitComplete&&(null==forceRender||forceRender(),setRenderedChildren(pendingPresentChildren.current),propagate&&(null==safeToRemove||safeToRemove()),onExitComplete&&onExitComplete())},anchorX,children:child},key)}))})}},"./src/components/molecules/Tabs/TabsInline.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TabsInline:()=>TabsInline,TabsInlineBody:()=>TabsInlineBody});var motion_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs"),motion_react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/index.ts"),_hooks_useWidthResizer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/hooks/useWidthResizer.ts"),_atoms__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const TabsInline=props=>{var _tabsArray$,_tabs;const{tabs,selectedTabKey:_selectedTabKey,onChange,extraNodes,extraNodesPlacement="right",className,tickStyle="line"}=props,tabsArray=Object.values(tabs),[selectedTabKey,setSelectedTabKey]=(0,_hooks__WEBPACK_IMPORTED_MODULE_2__.Xk)((null===(_tabsArray$=tabsArray[0])||void 0===_tabsArray$?void 0:_tabsArray$.key)||"",_selectedTabKey,onChange),tabsLength=tabsArray.length,[oneTabView,setOneTabView]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),selectedTabIndex=tabsArray.findIndex((_ref=>{let{key}=_ref;return key===selectedTabKey})),tabKeys=(0,_hooks__WEBPACK_IMPORTED_MODULE_2__.FA)(Object.keys(tabs)),[hover,setHover]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),refB=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),maxWidthWithArrows=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0),onOverflow=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{var _refB$current;null!==(_refB$current=refB.current)&&void 0!==_refB$current&&_refB$current.offsetWidth&&!oneTabView&&(setOneTabView(!0),maxWidthWithArrows.current=Math.max(maxWidthWithArrows.current,refB.current.offsetWidth))}),[refB,oneTabView]),unOverflow=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((async()=>{var _refB$current2;null!==(_refB$current2=refB.current)&&void 0!==_refB$current2&&_refB$current2.offsetWidth&&refB.current.offsetWidth>maxWidthWithArrows.current&&setOneTabView(!1)}),[refB]);(0,_hooks_useWidthResizer__WEBPACK_IMPORTED_MODULE_3__.W)({onOverflow,unOverflow,targetRef:refB,trigger:tabKeys});const displayedTabs=oneTabView?tabsArray[selectedTabIndex]?[tabsArray[selectedTabIndex]]:[]:tabsArray,layoutId=(0,react__WEBPACK_IMPORTED_MODULE_0__.useId)(),layoutHoverId=(0,react__WEBPACK_IMPORTED_MODULE_0__.useId)(),renderHeaderTab=_ref2=>{let{key,header}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{onClick:key===selectedTabKey?void 0:()=>setSelectedTabKey(key),className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-tabs-inline-tab jk-row nowrap",{selected:key===selectedTabKey,"one-tab-view":oneTabView,"cr-pt":key===selectedTabKey&&"background"===tickStyle}),onMouseEnter:()=>setHover(key),children:["line"===tickStyle&&key===selectedTabKey&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{className:"selected-tab-tick",layoutId}),"background"===tickStyle&&key===selectedTabKey&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{className:"selected-tab-tick-back jk-br-ie",layoutId,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"selected-tab-tick-back-content",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(header,{selectedTabKey})})}),"background"===tickStyle&&key===hover&&key!==selectedTabKey&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{className:"selected-tab-tick-back-hover jk-br-ie",layoutId:layoutHoverId,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"selected-tab-tick-back-content",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(header,{selectedTabKey})})}),"background"===tickStyle?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"tab-tick-back-hover jk-br-ie",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"selected-tab-tick-back-content",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(header,{selectedTabKey})})}):(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(header,{selectedTabKey})]},key)};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-row gap space-between nowrap jk-tabs-inline extend tick-style-".concat(tickStyle),className),children:["left"===extraNodesPlacement&&!(null==extraNodes||!extraNodes.length)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap nowrap",children:react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(null==extraNodes?void 0:extraNodes.map(((action,index)=>(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(action,{selectedTabKey},index))))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"jk-row left gap extend",style:{overflow:"auto"},ref:refB,children:[oneTabView&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.EjP,{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("br-50-pc",{"appearance-secondary clickable elevation":selectedTabIndex-1>=0,"appearance-gray-5":!(selectedTabIndex-1>=0)}),style:{padding:2},onClick:selectedTabIndex-1>=0?()=>setSelectedTabKey(tabsArray[selectedTabIndex-1].key):void 0}),oneTabView?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.l6P,{options:tabsArray.map((_ref3=>{let{key,header}=_ref3;return{value:key,label:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(header,{selectedTabKey}),inputLabel:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-row left stretch jk-tabs-headers-inline nowrap",{"block flex-1":oneTabView}),style:{position:"relative",overflow:"visible"},children:renderHeaderTab(tabsArray[selectedTabIndex])})}})),className:"jk-select-void flex-1",selectedOption:tabsArray[selectedTabIndex]?{value:tabsArray[selectedTabIndex].key}:{value:void 0},onChange:_ref4=>{let{value}=_ref4;setSelectedTabKey(value)}}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-row gap left stretch jk-tabs-headers-inline nowrap",{"block flex-1":oneTabView}),style:{position:"relative",overflow:"visible"},children:displayedTabs.map(renderHeaderTab)}),oneTabView&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_4__.afL,{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("br-50-pc",{"appearance-secondary clickable elevation":selectedTabIndex+1<tabsLength,"appearance-gray-5":!(selectedTabIndex+1<tabsLength)}),style:{padding:2},onClick:tabsArray[selectedTabIndex+1]?()=>setSelectedTabKey(tabsArray[selectedTabIndex+1].key):void 0})]}),"right"===extraNodesPlacement&&!(null==extraNodes||!extraNodes.length)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-row gap nowrap",children:react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(null==extraNodes?void 0:extraNodes.map(((action,index)=>(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(action,{selectedTabKey},index))))}),("bottomRight"===extraNodesPlacement||"bottomLeft"===extraNodesPlacement||"bottomCenter"===extraNodesPlacement)&&!(null==extraNodes||!extraNodes.length)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"jk-col gap nowrap",style:{position:"absolute",bottom:"calc(var(--bottom-horizontal-menu-height, 0) + var(--pad-t))",right:"bottomRight"===extraNodesPlacement||"bottomCenter"===extraNodesPlacement?"var(--pad-t)":"",left:"bottomLeft"===extraNodesPlacement||"bottomCenter"===extraNodesPlacement?"var(--pad-t)":""},children:react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(null==extraNodes?void 0:extraNodes.map(((action,index)=>(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(action,{selectedTabKey},index))))})]}),!onChange&&(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(null===(_tabs=tabs[selectedTabKey])||void 0===_tabs?void 0:_tabs.body,{selectedTabKey})]})},variants={center:{zIndex:1,x:0},exit:direction=>({zIndex:0,x:direction<0?"100%":"-100%"})},TabsInlineBody=_ref5=>{let{tabs,selectedTabKey}=_ref5;const prevSelectedTabKey=(0,_hooks__WEBPACK_IMPORTED_MODULE_2__.ZC)(selectedTabKey),currentIndex=Object.keys(tabs).indexOf(selectedTabKey),fromLeft=Object.keys(tabs).indexOf(prevSelectedTabKey)<currentIndex,direction=fromLeft?1:-1;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_7__.N,{custom:direction,children:Object.values(tabs).map((tab=>tab.key===selectedTabKey&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{layout:!0,initial:{x:fromLeft?"100%":"-100%"},variants,animate:"center",exit:"exit",style:{position:"absolute",width:"100%",height:"100%",overflow:"auto"},className:"jk-tabs-inline-body-motion-layout",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(null==tab?void 0:tab.body,{selectedTabKey})},tab.key)))})};try{TabsInline.displayName="TabsInline",TabsInline.__docgenInfo={description:"",displayName:"TabsInline",props:{tabs:{defaultValue:null,description:"",name:"tabs",required:!0,type:{name:"TabsType<T>"}},selectedTabKey:{defaultValue:null,description:"",name:"selectedTabKey",required:!1,type:{name:"T"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((tabKey: T) => void)"}},extraNodes:{defaultValue:null,description:"",name:"extraNodes",required:!1,type:{name:"ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }>[]"}},extraNodesPlacement:{defaultValue:null,description:"",name:"extraNodesPlacement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottomLeft"'},{value:'"bottomCenter"'},{value:'"bottomRight"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},tickStyle:{defaultValue:null,description:"",name:"tickStyle",required:!1,type:{name:"enum",value:[{value:'"line"'},{value:'"background"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/Tabs/TabsInline.tsx#TabsInline"]={docgenInfo:TabsInline.__docgenInfo,name:"TabsInline",path:"src/components/molecules/Tabs/TabsInline.tsx#TabsInline"})}catch(__react_docgen_typescript_loader_error){}try{TabsInlineBody.displayName="TabsInlineBody",TabsInlineBody.__docgenInfo={description:"",displayName:"TabsInlineBody",props:{tabs:{defaultValue:null,description:"",name:"tabs",required:!0,type:{name:"TabsType<T>"}},selectedTabKey:{defaultValue:null,description:"",name:"selectedTabKey",required:!0,type:{name:"T"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/Tabs/TabsInline.tsx#TabsInlineBody"]={docgenInfo:TabsInlineBody.__docgenInfo,name:"TabsInlineBody",path:"src/components/molecules/Tabs/TabsInline.tsx#TabsInlineBody"})}catch(__react_docgen_typescript_loader_error){}}}]);