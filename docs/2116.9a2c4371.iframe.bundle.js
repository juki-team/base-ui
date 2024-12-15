"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2116],{"./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>AnimatePresence});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/react/index.js"),PresenceContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/PresenceContext.mjs"),use_constant=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-constant.mjs"),MotionConfigContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/MotionConfigContext.mjs");class PopChildMeasure extends react.Component{getSnapshotBeforeUpdate(prevProps){const element=this.props.childRef.current;if(element&&prevProps.isPresent&&!this.props.isPresent){const size=this.props.sizeRef.current;size.height=element.offsetHeight||0,size.width=element.offsetWidth||0,size.top=element.offsetTop,size.left=element.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function PopChild({children,isPresent}){const id=(0,react.useId)(),ref=(0,react.useRef)(null),size=(0,react.useRef)({width:0,height:0,top:0,left:0}),{nonce}=(0,react.useContext)(MotionConfigContext.Q);return(0,react.useInsertionEffect)((()=>{const{width,height,top,left}=size.current;if(isPresent||!ref.current||!width||!height)return;ref.current.dataset.motionPopId=id;const style=document.createElement("style");return nonce&&(style.nonce=nonce),document.head.appendChild(style),style.sheet&&style.sheet.insertRule(`\n          [data-motion-pop-id="${id}"] {\n            position: absolute !important;\n            width: ${width}px !important;\n            height: ${height}px !important;\n            top: ${top}px !important;\n            left: ${left}px !important;\n          }\n        `),()=>{document.head.removeChild(style)}}),[isPresent]),(0,jsx_runtime.jsx)(PopChildMeasure,{isPresent,childRef:ref,sizeRef:size,children:react.cloneElement(children,{ref})})}const PresenceChild=({children,initial,isPresent,onExitComplete,custom,presenceAffectsLayout,mode})=>{const presenceChildren=(0,use_constant.M)(newChildrenMap),id=(0,react.useId)(),memoizedOnExitComplete=(0,react.useCallback)((childId=>{presenceChildren.set(childId,!0);for(const isComplete of presenceChildren.values())if(!isComplete)return;onExitComplete&&onExitComplete()}),[presenceChildren,onExitComplete]),context=(0,react.useMemo)((()=>({id,initial,isPresent,custom,onExitComplete:memoizedOnExitComplete,register:childId=>(presenceChildren.set(childId,!1),()=>presenceChildren.delete(childId))})),presenceAffectsLayout?[Math.random(),memoizedOnExitComplete]:[isPresent,memoizedOnExitComplete]);return(0,react.useMemo)((()=>{presenceChildren.forEach(((_,key)=>presenceChildren.set(key,!1)))}),[isPresent]),react.useEffect((()=>{!isPresent&&!presenceChildren.size&&onExitComplete&&onExitComplete()}),[isPresent]),"popLayout"===mode&&(children=(0,jsx_runtime.jsx)(PopChild,{isPresent,children})),(0,jsx_runtime.jsx)(PresenceContext.t.Provider,{value:context,children})};function newChildrenMap(){return new Map}var LayoutGroupContext=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/context/LayoutGroupContext.mjs"),errors=__webpack_require__("./node_modules/motion/dist/es/motion-utils/dist/es/errors.mjs");const getChildKey=child=>child.key||"";function onlyElements(children){const filtered=[];return react.Children.forEach(children,(child=>{(0,react.isValidElement)(child)&&filtered.push(child)})),filtered}var use_isomorphic_effect=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");const AnimatePresence=({children,exitBeforeEnter,custom,initial=!0,onExitComplete,presenceAffectsLayout=!0,mode="sync"})=>{(0,errors.V)(!exitBeforeEnter,"Replace exitBeforeEnter with mode='wait'");const presentChildren=(0,react.useMemo)((()=>onlyElements(children)),[children]),presentKeys=presentChildren.map(getChildKey),isInitialRender=(0,react.useRef)(!0),pendingPresentChildren=(0,react.useRef)(presentChildren),exitComplete=(0,use_constant.M)((()=>new Map)),[diffedChildren,setDiffedChildren]=(0,react.useState)(presentChildren),[renderedChildren,setRenderedChildren]=(0,react.useState)(presentChildren);(0,use_isomorphic_effect.E)((()=>{isInitialRender.current=!1,pendingPresentChildren.current=presentChildren;for(let i=0;i<renderedChildren.length;i++){const key=getChildKey(renderedChildren[i]);presentKeys.includes(key)?exitComplete.delete(key):!0!==exitComplete.get(key)&&exitComplete.set(key,!1)}}),[renderedChildren,presentKeys.length,presentKeys.join("-")]);const exitingChildren=[];if(presentChildren!==diffedChildren){let nextChildren=[...presentChildren];for(let i=0;i<renderedChildren.length;i++){const child=renderedChildren[i],key=getChildKey(child);presentKeys.includes(key)||(nextChildren.splice(i,0,child),exitingChildren.push(child))}return"wait"===mode&&exitingChildren.length&&(nextChildren=exitingChildren),setRenderedChildren(onlyElements(nextChildren)),void setDiffedChildren(presentChildren)}const{forceRender}=(0,react.useContext)(LayoutGroupContext.L);return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:renderedChildren.map((child=>{const key=getChildKey(child),isPresent=presentChildren===renderedChildren||presentKeys.includes(key);return(0,jsx_runtime.jsx)(PresenceChild,{isPresent,initial:!(isInitialRender.current&&!initial)&&void 0,custom:isPresent?void 0:custom,presenceAffectsLayout,mode,onExitComplete:isPresent?void 0:()=>{if(!exitComplete.has(key))return;exitComplete.set(key,!0);let isEveryExitComplete=!0;exitComplete.forEach((isExitComplete=>{isExitComplete||(isEveryExitComplete=!1)})),isEveryExitComplete&&(null==forceRender||forceRender(),setRenderedChildren(pendingPresentChildren.current),onExitComplete&&onExitComplete())},children:child},key)}))})}},"./node_modules/react-tiny-popover/dist/ArrowContainer.js":function(__unused_webpack_module,exports,__webpack_require__){var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ArrowContainer=void 0;var jsx_runtime_1=__webpack_require__("./node_modules/react/jsx-runtime.js"),react_1=__webpack_require__("./node_modules/react/index.js"),useArrowContainer_1=__webpack_require__("./node_modules/react-tiny-popover/dist/useArrowContainer.js");exports.ArrowContainer=function(_a){var childRect=_a.childRect,popoverRect=_a.popoverRect,position=_a.position,arrowColor=_a.arrowColor,arrowSize=_a.arrowSize,arrowClassName=_a.arrowClassName,externalArrowStyle=_a.arrowStyle,className=_a.className,children=_a.children,externalArrowContainerStyle=_a.style,_b=(0,useArrowContainer_1.useArrowContainer)({childRect,popoverRect,position,arrowColor,arrowSize}),arrowContainerStyle=_b.arrowContainerStyle,arrowStyle=_b.arrowStyle,mergedContainerStyle=(0,react_1.useMemo)((function(){return __assign(__assign({},arrowContainerStyle),externalArrowContainerStyle)}),[arrowContainerStyle,externalArrowContainerStyle]),mergedArrowStyle=(0,react_1.useMemo)((function(){return __assign(__assign({},arrowStyle),externalArrowStyle)}),[arrowStyle,externalArrowStyle]);return(0,jsx_runtime_1.jsxs)("div",{className,style:mergedContainerStyle,children:[(0,jsx_runtime_1.jsx)("div",{style:mergedArrowStyle,className:arrowClassName}),children]})}},"./node_modules/react-tiny-popover/dist/Popover.js":function(__unused_webpack_module,exports,__webpack_require__){var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Popover=exports.usePopover=exports.ArrowContainer=exports.useArrowContainer=void 0;var jsx_runtime_1=__webpack_require__("./node_modules/react/jsx-runtime.js"),react_1=__webpack_require__("./node_modules/react/index.js"),PopoverPortal_1=__webpack_require__("./node_modules/react-tiny-popover/dist/PopoverPortal.js"),util_1=__webpack_require__("./node_modules/react-tiny-popover/dist/util.js"),usePopover_1=__webpack_require__("./node_modules/react-tiny-popover/dist/usePopover.js");Object.defineProperty(exports,"usePopover",{enumerable:!0,get:function(){return usePopover_1.usePopover}});var useMemoizedArray_1=__webpack_require__("./node_modules/react-tiny-popover/dist/useMemoizedArray.js"),useHandlePrevValues_1=__webpack_require__("./node_modules/react-tiny-popover/dist/useHandlePrevValues.js"),useArrowContainer_1=__webpack_require__("./node_modules/react-tiny-popover/dist/useArrowContainer.js");Object.defineProperty(exports,"useArrowContainer",{enumerable:!0,get:function(){return useArrowContainer_1.useArrowContainer}});var ArrowContainer_1=__webpack_require__("./node_modules/react-tiny-popover/dist/ArrowContainer.js");Object.defineProperty(exports,"ArrowContainer",{enumerable:!0,get:function(){return ArrowContainer_1.ArrowContainer}});var DEFAULT_POSITIONS=["top","left","right","bottom"],PopoverInternal=(0,react_1.forwardRef)((function(_a,externalRef){var isOpen=_a.isOpen,children=_a.children,content=_a.content,_b=_a.positions,externalPositions=void 0===_b?DEFAULT_POSITIONS:_b,_c=_a.align,align=void 0===_c?"center":_c,_d=_a.padding,padding=void 0===_d?0:_d,_e=_a.reposition,reposition=void 0===_e||_e,_f=_a.parentElement,parentElement=void 0===_f?window.document.body:_f,_g=_a.boundaryElement,boundaryElement=void 0===_g?parentElement:_g,containerClassName=_a.containerClassName,containerStyle=_a.containerStyle,transform=_a.transform,_h=_a.transformMode,transformMode=void 0===_h?"absolute":_h,_j=_a.boundaryInset,boundaryInset=void 0===_j?0:_j,onClickOutside=_a.onClickOutside,_k=_a.clickOutsideCapture,clickOutsideCapture=void 0!==_k&&_k,positions=(0,useMemoizedArray_1.useMemoizedArray)(Array.isArray(externalPositions)?externalPositions:[externalPositions]),_l=(0,useHandlePrevValues_1.useHandlePrevValues)({positions,reposition,transformMode,transform,boundaryElement,boundaryInset}),prev=_l.prev,updatePrevValues=_l.updatePrevValues,childRef=(0,react_1.useRef)(),_m=(0,react_1.useState)({align,nudgedLeft:0,nudgedTop:0,position:positions[0],padding,childRect:util_1.EMPTY_RECT,popoverRect:util_1.EMPTY_RECT,parentRect:util_1.EMPTY_RECT,boundaryRect:util_1.EMPTY_RECT,boundaryInset,violations:util_1.EMPTY_RECT,hasViolations:!1}),popoverState=_m[0],setPopoverState=_m[1],onPositionPopover=(0,react_1.useCallback)((function(popoverState){return setPopoverState(popoverState)}),[]),_o=(0,usePopover_1.usePopover)({isOpen,childRef,containerClassName,parentElement,boundaryElement,transform,transformMode,positions,align,padding,boundaryInset,reposition,onPositionPopover}),positionPopover=_o.positionPopover,popoverRef=_o.popoverRef,scoutRef=_o.scoutRef;(0,react_1.useLayoutEffect)((function(){var shouldUpdate=!0,updatePopover=function(){var _a,_b;if(isOpen&&shouldUpdate){var childRect=null===(_a=null==childRef?void 0:childRef.current)||void 0===_a?void 0:_a.getBoundingClientRect(),popoverRect=null===(_b=null==popoverRef?void 0:popoverRef.current)||void 0===_b?void 0:_b.getBoundingClientRect();null==childRect||null==popoverRect||(0,util_1.rectsAreEqual)(childRect,popoverState.childRect)&&popoverRect.width===popoverState.popoverRect.width&&popoverRect.height===popoverState.popoverRect.height&&popoverState.padding===padding&&popoverState.align===align&&positions===prev.positions&&reposition===prev.reposition&&transformMode===prev.transformMode&&transform===prev.transform&&boundaryElement===prev.boundaryElement&&boundaryInset===prev.boundaryInset||positionPopover(),updatePrevValues(),shouldUpdate&&window.requestAnimationFrame(updatePopover)}};return updatePopover(),function(){shouldUpdate=!1}}),[align,boundaryElement,boundaryInset,isOpen,padding,popoverRef,popoverState.align,popoverState.childRect,popoverState.padding,popoverState.popoverRect.height,popoverState.popoverRect.width,positionPopover,positions,prev.boundaryElement,prev.boundaryInset,prev.positions,prev.reposition,prev.transform,prev.transformMode,reposition,transform,transformMode,updatePrevValues]),(0,react_1.useEffect)((function(){var popoverElement=popoverRef.current;return Object.assign(popoverElement.style,containerStyle),function(){Object.keys(null!=containerStyle?containerStyle:{}).forEach((function(key){return delete popoverElement.style[key]}))}}),[containerStyle,isOpen,popoverRef]);var handleOnClickOutside=(0,react_1.useCallback)((function(e){var _a,_b;!isOpen||(null===(_a=popoverRef.current)||void 0===_a?void 0:_a.contains(e.target))||(null===(_b=childRef.current)||void 0===_b?void 0:_b.contains(e.target))||null==onClickOutside||onClickOutside(e)}),[isOpen,onClickOutside,popoverRef]),handleWindowResize=(0,react_1.useCallback)((function(){childRef.current&&window.requestAnimationFrame((function(){return positionPopover()}))}),[positionPopover]);(0,react_1.useEffect)((function(){var body=parentElement.ownerDocument.body;return body.addEventListener("click",handleOnClickOutside,clickOutsideCapture),body.addEventListener("contextmenu",handleOnClickOutside,clickOutsideCapture),body.addEventListener("resize",handleWindowResize),function(){body.removeEventListener("click",handleOnClickOutside,clickOutsideCapture),body.removeEventListener("contextmenu",handleOnClickOutside,clickOutsideCapture),body.removeEventListener("resize",handleWindowResize)}}),[clickOutsideCapture,handleOnClickOutside,handleWindowResize,parentElement]);var handleRef=(0,react_1.useCallback)((function(node){childRef.current=node,null!=externalRef&&("object"==typeof externalRef?externalRef.current=node:"function"==typeof externalRef&&externalRef(node))}),[externalRef]);return(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,react_1.cloneElement)(children,{ref:handleRef}),isOpen?(0,jsx_runtime_1.jsx)(PopoverPortal_1.PopoverPortal,{element:popoverRef.current,scoutElement:scoutRef.current,container:parentElement,children:"function"==typeof content?content(popoverState):content}):null]})}));exports.Popover=(0,react_1.forwardRef)((function(props,ref){return"undefined"==typeof window?props.children:(0,jsx_runtime_1.jsx)(PopoverInternal,__assign({},props,{ref}))}))},"./node_modules/react-tiny-popover/dist/PopoverPortal.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.PopoverPortal=void 0;var react_1=__webpack_require__("./node_modules/react/index.js"),react_dom_1=__webpack_require__("./node_modules/react-dom/index.js");exports.PopoverPortal=function(_a){var container=_a.container,element=_a.element,scoutElement=_a.scoutElement,children=_a.children;return(0,react_1.useLayoutEffect)((function(){return container.appendChild(element),container.appendChild(scoutElement),function(){container.removeChild(element),container.removeChild(scoutElement)}}),[container,element,scoutElement]),(0,react_dom_1.createPortal)(children,element)}},"./node_modules/react-tiny-popover/dist/useArrowContainer.js":function(__unused_webpack_module,exports,__webpack_require__){var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.useArrowContainer=void 0;var react_1=__webpack_require__("./node_modules/react/index.js");exports.useArrowContainer=function(_a){var childRect=_a.childRect,popoverRect=_a.popoverRect,position=_a.position,arrowSize=_a.arrowSize,arrowColor=_a.arrowColor;return{arrowContainerStyle:(0,react_1.useMemo)((function(){return{padding:arrowSize}}),[arrowSize]),arrowStyle:(0,react_1.useMemo)((function(){return __assign({position:"absolute"},function(){var arrowWidth=2*arrowSize,top=childRect.top-popoverRect.top+childRect.height/2-arrowWidth/2,left=childRect.left-popoverRect.left+childRect.width/2-arrowWidth/2,lowerBound=arrowSize,leftUpperBound=popoverRect.width-arrowSize,topUpperBound=popoverRect.height-arrowSize;switch(left=(left=left<lowerBound?lowerBound:left)+arrowWidth>leftUpperBound?leftUpperBound-arrowWidth:left,top=(top=top<lowerBound?lowerBound:top)+arrowWidth>topUpperBound?topUpperBound-arrowWidth:top,top=Number.isNaN(top)?0:top,left=Number.isNaN(left)?0:left,position){case"right":return{borderTop:"".concat(arrowSize,"px solid transparent"),borderBottom:"".concat(arrowSize,"px solid transparent"),borderRight:"".concat(arrowSize,"px solid ").concat(arrowColor),left:0,top};case"left":return{borderTop:"".concat(arrowSize,"px solid transparent"),borderBottom:"".concat(arrowSize,"px solid transparent"),borderLeft:"".concat(arrowSize,"px solid ").concat(arrowColor),right:0,top};case"bottom":return{borderLeft:"".concat(arrowSize,"px solid transparent"),borderRight:"".concat(arrowSize,"px solid transparent"),borderBottom:"".concat(arrowSize,"px solid ").concat(arrowColor),top:0,left};case"top":return{borderLeft:"".concat(arrowSize,"px solid transparent"),borderRight:"".concat(arrowSize,"px solid transparent"),borderTop:"".concat(arrowSize,"px solid ").concat(arrowColor),bottom:0,left};default:return{display:"hidden"}}}())}),[arrowColor,arrowSize,childRect.height,childRect.left,childRect.top,childRect.width,popoverRect.height,popoverRect.left,popoverRect.top,popoverRect.width,position])}}},"./node_modules/react-tiny-popover/dist/useElementRef.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.useElementRef=void 0;var react_1=__webpack_require__("./node_modules/react/index.js"),util_1=__webpack_require__("./node_modules/react-tiny-popover/dist/util.js");exports.useElementRef=function(_a){var containerClassName=_a.containerClassName,containerStyle=_a.containerStyle,ref=(0,react_1.useRef)(),element=(0,react_1.useState)((function(){return(0,util_1.createContainer)({containerStyle,containerClassName})}))[0];return(0,react_1.useLayoutEffect)((function(){element.className=containerClassName}),[containerClassName,element]),(0,react_1.useLayoutEffect)((function(){Object.assign(element.style,containerStyle)}),[containerStyle,element]),ref.current=element,ref}},"./node_modules/react-tiny-popover/dist/useHandlePrevValues.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.useHandlePrevValues=void 0;var react_1=__webpack_require__("./node_modules/react/index.js");exports.useHandlePrevValues=function(props){var prevPositions=(0,react_1.useRef)(props.positions),prevReposition=(0,react_1.useRef)(props.reposition),prevTransformMode=(0,react_1.useRef)(props.transformMode),prevTransform=(0,react_1.useRef)(props.transform),prevBoundaryElement=(0,react_1.useRef)(props.boundaryElement),prevBoundaryInset=(0,react_1.useRef)(props.boundaryInset),updatePrevValues=(0,react_1.useCallback)((function(){prevPositions.current=props.positions,prevReposition.current=props.reposition,prevTransformMode.current=props.transformMode,prevTransform.current=props.transform,prevBoundaryElement.current=props.boundaryElement,prevBoundaryInset.current=props.boundaryInset}),[props.boundaryElement,props.boundaryInset,props.positions,props.reposition,props.transform,props.transformMode]);return{prev:{positions:prevPositions.current,reposition:prevReposition.current,transformMode:prevTransformMode.current,transform:prevTransform.current,boundaryElement:prevBoundaryElement.current,boundaryInset:prevBoundaryInset.current},updatePrevValues}}},"./node_modules/react-tiny-popover/dist/useMemoizedArray.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.useMemoizedArray=void 0;var react_1=__webpack_require__("./node_modules/react/index.js");exports.useMemoizedArray=function(externalArray){var prevArrayRef=(0,react_1.useRef)(externalArray);return(0,react_1.useMemo)((function(){if(prevArrayRef.current===externalArray)return prevArrayRef.current;if(prevArrayRef.current.length!==externalArray.length)return prevArrayRef.current=externalArray,externalArray;for(var i=0;i<externalArray.length;i+=1)if(externalArray[i]!==prevArrayRef.current[i])return prevArrayRef.current=externalArray,externalArray;return prevArrayRef.current}),[externalArray])}},"./node_modules/react-tiny-popover/dist/usePopover.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.usePopover=void 0;var react_1=__webpack_require__("./node_modules/react/index.js"),util_1=__webpack_require__("./node_modules/react-tiny-popover/dist/util.js"),useElementRef_1=__webpack_require__("./node_modules/react-tiny-popover/dist/useElementRef.js"),POPOVER_STYLE={position:"fixed",overflow:"visible",top:"0px",left:"0px"},SCOUT_STYLE={position:"fixed",top:"0px",left:"0px",width:"0px",height:"0px",visibility:"hidden"};exports.usePopover=function(_a){var isOpen=_a.isOpen,childRef=_a.childRef,positions=_a.positions,containerClassName=_a.containerClassName,parentElement=_a.parentElement,transform=_a.transform,transformMode=_a.transformMode,align=_a.align,padding=_a.padding,reposition=_a.reposition,boundaryInset=_a.boundaryInset,boundaryElement=_a.boundaryElement,onPositionPopover=_a.onPositionPopover,scoutRef=(0,useElementRef_1.useElementRef)({containerClassName:"react-tiny-popover-scout",containerStyle:SCOUT_STYLE}),popoverRef=(0,useElementRef_1.useElementRef)({containerClassName:null!=containerClassName&&containerClassName.length>0&&"react-tiny-popover-container"!==containerClassName?"react-tiny-popover-container ".concat(containerClassName):"react-tiny-popover-container",containerStyle:POPOVER_STYLE}),positionPopover=(0,react_1.useCallback)((function(_a){var _b,_c,_d=void 0===_a?{}:_a,_e=_d.positionIndex,positionIndex=void 0===_e?0:_e,_f=_d.parentRect,parentRect=void 0===_f?parentElement.getBoundingClientRect():_f,_g=_d.childRect,childRect=void 0===_g?null===(_b=null==childRef?void 0:childRef.current)||void 0===_b?void 0:_b.getBoundingClientRect():_g,_h=_d.scoutRect,scoutRect=void 0===_h?null===(_c=null==scoutRef?void 0:scoutRef.current)||void 0===_c?void 0:_c.getBoundingClientRect():_h,_j=_d.popoverRect,popoverRect=void 0===_j?popoverRef.current.getBoundingClientRect():_j,_k=_d.boundaryRect,boundaryRect=void 0===_k?boundaryElement===parentElement?parentRect:boundaryElement.getBoundingClientRect():_k;if(childRect&&parentRect&&isOpen){if(transform&&"absolute"===transformMode){var _l="function"==typeof transform?transform({childRect,popoverRect,parentRect,boundaryRect,padding,align,nudgedTop:0,nudgedLeft:0,boundaryInset,violations:util_1.EMPTY_RECT,hasViolations:!1}):transform,inputTop=_l.top,inputLeft=_l.left,finalLeft_1=Math.round(parentRect.left+inputLeft-scoutRect.left),finalTop_1=Math.round(parentRect.top+inputTop-scoutRect.top);return popoverRef.current.style.transform="translate(".concat(finalLeft_1,"px, ").concat(finalTop_1,"px)"),void onPositionPopover({childRect,popoverRect:(0,util_1.createRect)({left:finalLeft_1,top:finalTop_1,width:popoverRect.width,height:popoverRect.height}),parentRect,boundaryRect,padding,align,transform:{top:inputTop,left:inputLeft},nudgedTop:0,nudgedLeft:0,boundaryInset,violations:util_1.EMPTY_RECT,hasViolations:!1})}var isExhausted=positionIndex===positions.length,position=isExhausted?positions[0]:positions[positionIndex],_m=(0,util_1.getNewPopoverRect)({childRect,popoverRect,boundaryRect,position,align,padding,reposition},boundaryInset),rect=_m.rect;if(_m.boundaryViolation&&reposition&&!isExhausted)positionPopover({positionIndex:positionIndex+1,childRect,popoverRect,parentRect,boundaryRect});else{var top=rect.top,left=rect.left,width=rect.width,height=rect.height,shouldNudge=reposition&&!isExhausted,_o=(0,util_1.getNudgedPopoverRect)(rect,boundaryRect,boundaryInset),nudgedLeft=_o.left,nudgedTop=_o.top,finalTop=top,finalLeft=left;shouldNudge&&(finalTop=nudgedTop,finalLeft=nudgedLeft),finalTop=Math.round(finalTop-scoutRect.top),finalLeft=Math.round(finalLeft-scoutRect.left),popoverRef.current.style.transform="translate(".concat(finalLeft,"px, ").concat(finalTop,"px)");var potentialViolations={top:boundaryRect.top+boundaryInset-finalTop,left:boundaryRect.left+boundaryInset-finalLeft,right:finalLeft+width-boundaryRect.right+boundaryInset,bottom:finalTop+height-boundaryRect.bottom+boundaryInset},popoverState={childRect,popoverRect:(0,util_1.createRect)({left:finalLeft,top:finalTop,width,height}),parentRect,boundaryRect,position,align,padding,nudgedTop:nudgedTop-top,nudgedLeft:nudgedLeft-left,boundaryInset,violations:{top:potentialViolations.top<=0?0:potentialViolations.top,left:potentialViolations.left<=0?0:potentialViolations.left,right:potentialViolations.right<=0?0:potentialViolations.right,bottom:potentialViolations.bottom<=0?0:potentialViolations.bottom},hasViolations:potentialViolations.top>0||potentialViolations.left>0||potentialViolations.right>0||potentialViolations.bottom>0};if(transform){onPositionPopover(popoverState);var _p="function"==typeof transform?transform(popoverState):transform,transformTop=_p.top,transformLeft=_p.left;popoverRef.current.style.transform="translate(".concat(Math.round(finalLeft+(null!=transformLeft?transformLeft:0)),"px, ").concat(Math.round(finalTop+(null!=transformTop?transformTop:0)),"px)"),popoverState.nudgedLeft+=null!=transformLeft?transformLeft:0,popoverState.nudgedTop+=null!=transformTop?transformTop:0,popoverState.transform={top:transformTop,left:transformLeft}}onPositionPopover(popoverState)}}}),[parentElement,childRef,scoutRef,popoverRef,boundaryElement,isOpen,transform,transformMode,positions,align,padding,reposition,boundaryInset,onPositionPopover]);return{positionPopover,popoverRef,scoutRef}}},"./node_modules/react-tiny-popover/dist/util.js":function(__unused_webpack_module,exports){var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNudgedPopoverRect=exports.getNewPopoverRect=exports.popoverRectForPosition=exports.createContainer=exports.rectsAreEqual=exports.createRect=exports.EMPTY_RECT=void 0,exports.EMPTY_RECT={top:0,left:0,right:0,bottom:0,width:0,height:0};exports.createRect=function(_a){var top=_a.top,left=_a.left,width=_a.width,height=_a.height;return{top,left,width,height,right:left+width,bottom:top+height}};exports.rectsAreEqual=function(rectA,rectB){return rectA===rectB||(null==rectA?void 0:rectA.bottom)===(null==rectB?void 0:rectB.bottom)&&(null==rectA?void 0:rectA.height)===(null==rectB?void 0:rectB.height)&&(null==rectA?void 0:rectA.left)===(null==rectB?void 0:rectB.left)&&(null==rectA?void 0:rectA.right)===(null==rectB?void 0:rectB.right)&&(null==rectA?void 0:rectA.top)===(null==rectB?void 0:rectB.top)&&(null==rectA?void 0:rectA.width)===(null==rectB?void 0:rectB.width)};exports.createContainer=function(_a){var containerStyle=_a.containerStyle,containerClassName=_a.containerClassName,container=window.document.createElement("div");return containerClassName&&(container.className=containerClassName),Object.assign(container.style,containerStyle),container};exports.popoverRectForPosition=function(position,childRect,popoverRect,padding,align){var top,left,targetMidX=childRect.left+childRect.width/2,targetMidY=childRect.top+childRect.height/2,width=popoverRect.width,height=popoverRect.height;switch(position){case"left":top=targetMidY-height/2,left=childRect.left-padding-width,"start"===align&&(top=childRect.top),"end"===align&&(top=childRect.bottom-height);break;case"bottom":top=childRect.bottom+padding,left=targetMidX-width/2,"start"===align&&(left=childRect.left),"end"===align&&(left=childRect.right-width);break;case"right":top=targetMidY-height/2,left=childRect.right+padding,"start"===align&&(top=childRect.top),"end"===align&&(top=childRect.bottom-height);break;default:top=childRect.top-height-padding,left=targetMidX-width/2,"start"===align&&(left=childRect.left),"end"===align&&(left=childRect.right-width)}return(0,exports.createRect)({left,top,width,height})};exports.getNewPopoverRect=function(_a,boundaryInset){var position=_a.position,align=_a.align,childRect=_a.childRect,popoverRect=_a.popoverRect,boundaryRect=_a.boundaryRect,padding=_a.padding,reposition=_a.reposition,rect=(0,exports.popoverRectForPosition)(position,childRect,popoverRect,padding,align);return{rect,boundaryViolation:reposition&&("top"===position&&rect.top<boundaryRect.top+boundaryInset||"left"===position&&rect.left<boundaryRect.left+boundaryInset||"right"===position&&rect.right>boundaryRect.right-boundaryInset||"bottom"===position&&rect.bottom>boundaryRect.bottom-boundaryInset)}};exports.getNudgedPopoverRect=function(popoverRect,boundaryRect,boundaryInset){var topBoundary=boundaryRect.top+boundaryInset,leftBoundary=boundaryRect.left+boundaryInset,rightBoundary=boundaryRect.right-boundaryInset,bottomBoundary=boundaryRect.bottom-boundaryInset,top=popoverRect.top<topBoundary?topBoundary:popoverRect.top;top=top+popoverRect.height>bottomBoundary?bottomBoundary-popoverRect.height:top;var left=popoverRect.left<leftBoundary?leftBoundary:popoverRect.left;return left=left+popoverRect.width>rightBoundary?rightBoundary-popoverRect.width:left,(0,exports.createRect)(__assign(__assign({},popoverRect),{top,left}))}}}]);