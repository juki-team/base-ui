"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[1504,9503],{"./src/components/molecules/Drawer/Drawer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Drawer:()=>Drawer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_DrawerView__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/molecules/Drawer/DrawerView.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Drawer=props=>{const{content,children,triggerOn="click",position,closeIcon,closeOnEscape,closeOnOutside}=props,[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),close=()=>setIsOpen(!1),open=()=>setIsOpen(!0),toggle=isOpen?close:open,childProps=_ref=>{let{props:{ref,onMouseEnter,onMouseLeave,onClick}={}}=_ref;return{ref:e=>{null==ref||ref(e)},onMouseEnter:e=>{(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.fo)(triggerOn,"hover")&&setIsOpen(!0),null==onMouseEnter||onMouseEnter(e)},onClick:e=>{(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.fo)(triggerOn,"click")&&setIsOpen((prevState=>!prevState)),null==onClick||onClick(e)}}};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_DrawerView__WEBPACK_IMPORTED_MODULE_2__.DrawerView,{isOpen,position,closeWhenKeyEscape:closeOnEscape,closeWhenClickOutside:closeOnOutside,onClose:close,closeIcon,children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(content,{isOpen,onOpen:open,onClose:close,toggle})}),"function"==typeof children?(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._O)(children({isOpen,onOpen:open,onClose:close,toggle}),childProps(children({isOpen,onOpen:open,onClose:close,toggle}))):(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._O)(children,childProps(children))]})};try{Drawer.displayName="Drawer",Drawer.__docgenInfo={description:"",displayName:"Drawer",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"ReactNodeOrFunctionP1Type<DrawerActionsType>"}},position:{defaultValue:null,description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'}]}},triggerOn:{defaultValue:null,description:"",name:"triggerOn",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"hover"'},{value:'"click"'}]}},closeOnEscape:{defaultValue:null,description:"",name:"closeOnEscape",required:!1,type:{name:"boolean"}},closeOnOutside:{defaultValue:null,description:"",name:"closeOnOutside",required:!1,type:{name:"boolean"}},closeIcon:{defaultValue:null,description:"",name:"closeIcon",required:!1,type:{name:"ReactNodeOrFunctionType"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/Drawer/Drawer.tsx#Drawer"]={docgenInfo:Drawer.__docgenInfo,name:"Drawer",path:"src/components/molecules/Drawer/Drawer.tsx#Drawer"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/Drawer/DrawerView.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DrawerView:()=>DrawerView});var motion_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs"),motion_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_hooks_custom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/custom.ts"),_atoms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const DrawerView=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)((props=>{const{children,position="right",isOpen,onClose,closeWhenKeyEscape,closeWhenClickOutside,closeIcon}=props,drawerLayoutRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),close=()=>{isOpen&&(null==onClose||onClose(!1))};return(0,_hooks_custom__WEBPACK_IMPORTED_MODULE_2__._N)((event=>{closeWhenKeyEscape&&isOpen&&"Escape"===event.code&&close()})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_atoms__WEBPACK_IMPORTED_MODULE_3__.ZLI,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_5__.N,{children:isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"jk-drawer-overlay",onClick:closeWhenClickOutside?close:void 0},"jk-drawer-overlay")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_5__.N,{children:isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(motion_react__WEBPACK_IMPORTED_MODULE_6__.P.div,{initial:{x:"100vw"},animate:{x:0,transition:{stiffness:0}},exit:{x:"100vw"},ref:drawerLayoutRef,className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-drawer-layout",position,{open:isOpen}),children:[void 0===closeIcon?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-drawer-close-button",onClick:close,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.$nd,{icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_atoms__WEBPACK_IMPORTED_MODULE_3__.USm,{}),type:"light"})}):(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(closeIcon,{isOpen,close}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-drawer-body",children})]},"jk-drawer-layout")})]})}),((_ref,_ref2)=>{let{isOpen}=_ref,{isOpen:isOpenNext}=_ref2;return isOpen===isOpenNext&&!isOpen}));try{DrawerView.displayName="DrawerView",DrawerView.__docgenInfo={description:"",displayName:"DrawerView",props:{position:{defaultValue:null,description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'}]}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"((isOpen: boolean) => void)"}},closeWhenKeyEscape:{defaultValue:null,description:"",name:"closeWhenKeyEscape",required:!1,type:{name:"boolean"}},closeWhenClickOutside:{defaultValue:null,description:"",name:"closeWhenClickOutside",required:!1,type:{name:"boolean"}},closeIcon:{defaultValue:null,description:"",name:"closeIcon",required:!1,type:{name:"ReactNodeOrFunctionP1Type<{ isOpen: boolean; close: () => void; }>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/Drawer/DrawerView.tsx#DrawerView"]={docgenInfo:DrawerView.__docgenInfo,name:"DrawerView",path:"src/components/molecules/Drawer/DrawerView.tsx#DrawerView"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/custom.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$$:()=>useInterval,ZC:()=>usePrevious,_N:()=>useKeyPress,c7:()=>useOutsideAlerter});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useInterval(callback,delay){const savedCallback=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{savedCallback.current=callback}),[callback]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(delay){let id=setInterval((function tick(){savedCallback.current&&savedCallback.current()}),delay);return()=>clearInterval(id)}return()=>null}),[delay])}function useOutsideAlerter(clickOutside,ref){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{function handleClickOutside(event){ref.current&&!ref.current.contains(event.target)&&clickOutside(event)}return document.addEventListener("mousedown",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside)}}),[clickOutside,ref])}function usePrevious(value,initialValue){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialValue);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ref.current=value}),[value]),ref.current}function useKeyPress(handleKeyPress){(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>(document.addEventListener("keydown",handleKeyPress),()=>{document.removeEventListener("keydown",handleKeyPress)})),[handleKeyPress])}},"./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>AnimatePresence});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),PresenceContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/PresenceContext.mjs"),use_constant=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-constant.mjs"),MotionConfigContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/MotionConfigContext.mjs");class PopChildMeasure extends react.Component{getSnapshotBeforeUpdate(prevProps){const element=this.props.childRef.current;if(element&&prevProps.isPresent&&!this.props.isPresent){const size=this.props.sizeRef.current;size.height=element.offsetHeight||0,size.width=element.offsetWidth||0,size.top=element.offsetTop,size.left=element.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function PopChild({children,isPresent}){const id=(0,react.useId)(),ref=(0,react.useRef)(null),size=(0,react.useRef)({width:0,height:0,top:0,left:0}),{nonce}=(0,react.useContext)(MotionConfigContext.Q);return(0,react.useInsertionEffect)((()=>{const{width,height,top,left}=size.current;if(isPresent||!ref.current||!width||!height)return;ref.current.dataset.motionPopId=id;const style=document.createElement("style");return nonce&&(style.nonce=nonce),document.head.appendChild(style),style.sheet&&style.sheet.insertRule(`\n          [data-motion-pop-id="${id}"] {\n            position: absolute !important;\n            width: ${width}px !important;\n            height: ${height}px !important;\n            top: ${top}px !important;\n            left: ${left}px !important;\n          }\n        `),()=>{document.head.removeChild(style)}}),[isPresent]),(0,jsx_runtime.jsx)(PopChildMeasure,{isPresent,childRef:ref,sizeRef:size,children:react.cloneElement(children,{ref})})}const PresenceChild=({children,initial,isPresent,onExitComplete,custom,presenceAffectsLayout,mode})=>{const presenceChildren=(0,use_constant.M)(newChildrenMap),id=(0,react.useId)(),memoizedOnExitComplete=(0,react.useCallback)((childId=>{presenceChildren.set(childId,!0);for(const isComplete of presenceChildren.values())if(!isComplete)return;onExitComplete&&onExitComplete()}),[presenceChildren,onExitComplete]),context=(0,react.useMemo)((()=>({id,initial,isPresent,custom,onExitComplete:memoizedOnExitComplete,register:childId=>(presenceChildren.set(childId,!1),()=>presenceChildren.delete(childId))})),presenceAffectsLayout?[Math.random(),memoizedOnExitComplete]:[isPresent,memoizedOnExitComplete]);return(0,react.useMemo)((()=>{presenceChildren.forEach(((_,key)=>presenceChildren.set(key,!1)))}),[isPresent]),react.useEffect((()=>{!isPresent&&!presenceChildren.size&&onExitComplete&&onExitComplete()}),[isPresent]),"popLayout"===mode&&(children=(0,jsx_runtime.jsx)(PopChild,{isPresent,children})),(0,jsx_runtime.jsx)(PresenceContext.t.Provider,{value:context,children})};function newChildrenMap(){return new Map}var LayoutGroupContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/LayoutGroupContext.mjs"),errors=__webpack_require__("./node_modules/motion/dist/es/motion-utils/dist/es/errors.mjs");const getChildKey=child=>child.key||"";function onlyElements(children){const filtered=[];return react.Children.forEach(children,(child=>{(0,react.isValidElement)(child)&&filtered.push(child)})),filtered}var use_isomorphic_effect=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");const AnimatePresence=({children,exitBeforeEnter,custom,initial=!0,onExitComplete,presenceAffectsLayout=!0,mode="sync"})=>{(0,errors.V)(!exitBeforeEnter,"Replace exitBeforeEnter with mode='wait'");const presentChildren=(0,react.useMemo)((()=>onlyElements(children)),[children]),presentKeys=presentChildren.map(getChildKey),isInitialRender=(0,react.useRef)(!0),pendingPresentChildren=(0,react.useRef)(presentChildren),exitComplete=(0,use_constant.M)((()=>new Map)),[diffedChildren,setDiffedChildren]=(0,react.useState)(presentChildren),[renderedChildren,setRenderedChildren]=(0,react.useState)(presentChildren);(0,use_isomorphic_effect.E)((()=>{isInitialRender.current=!1,pendingPresentChildren.current=presentChildren;for(let i=0;i<renderedChildren.length;i++){const key=getChildKey(renderedChildren[i]);presentKeys.includes(key)?exitComplete.delete(key):!0!==exitComplete.get(key)&&exitComplete.set(key,!1)}}),[renderedChildren,presentKeys.length,presentKeys.join("-")]);const exitingChildren=[];if(presentChildren!==diffedChildren){let nextChildren=[...presentChildren];for(let i=0;i<renderedChildren.length;i++){const child=renderedChildren[i],key=getChildKey(child);presentKeys.includes(key)||(nextChildren.splice(i,0,child),exitingChildren.push(child))}return"wait"===mode&&exitingChildren.length&&(nextChildren=exitingChildren),setRenderedChildren(onlyElements(nextChildren)),void setDiffedChildren(presentChildren)}const{forceRender}=(0,react.useContext)(LayoutGroupContext.L);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:renderedChildren.map((child=>{const key=getChildKey(child),isPresent=presentChildren===renderedChildren||presentKeys.includes(key);return(0,jsx_runtime.jsx)(PresenceChild,{isPresent,initial:!(isInitialRender.current&&!initial)&&void 0,custom:isPresent?void 0:custom,presenceAffectsLayout,mode,onExitComplete:isPresent?void 0:()=>{if(!exitComplete.has(key))return;exitComplete.set(key,!0);let isEveryExitComplete=!0;exitComplete.forEach((isExitComplete=>{isExitComplete||(isEveryExitComplete=!1)})),isEveryExitComplete&&(null==forceRender||forceRender(),setRenderedChildren(pendingPresentChildren.current),onExitComplete&&onExitComplete())},children:child},key)}))})}}}]);