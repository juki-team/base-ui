"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[795,1265],{"./src/components/atoms/Popover/Popover.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Popover:()=>Popover,usePopover:()=>usePopover});var _floating_ui_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@floating-ui/react/dist/floating-ui.react.mjs"),_floating_ui_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),_floating_ui_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs"),motion_react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/index.mjs"),motion_react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/types/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function usePopover(_ref){let{initialOpen=!1,placement="bottom",modal,open:controlledOpen,onOpenChange:setControlledOpen,triggerOn="click",offset:_offset,padding=4}=_ref;const[uncontrolledOpen,setUncontrolledOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOpen),isOpen=null!=controlledOpen?controlledOpen:uncontrolledOpen,setIsOpen=null!=setControlledOpen?setControlledOpen:setUncontrolledOpen,data=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.we)({placement,open:isOpen,onOpenChange:setIsOpen,whileElementsMounted:_floating_ui_react__WEBPACK_IMPORTED_MODULE_5__.ll,middleware:[(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_6__.cY)(_offset),(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_6__.UU)({crossAxis:placement.includes("-"),fallbackAxisSideDirection:"end",padding}),(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_6__.BN)({padding})]}),context=data.context,click=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.kp)(context,{enabled:void 0===controlledOpen&&(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.fo)(triggerOn,"click")}),hover=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.Mk)(context,{enabled:void 0===controlledOpen&&(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.fo)(triggerOn,"hover"),handleClose:(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.iB)()}),dismiss=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.s9)(context),role=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.It)(context),interactions=(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.bv)([click,dismiss,hover,role]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({isOpen,setIsOpen,...interactions,...data,modal})),[isOpen,setIsOpen,interactions,data,modal])}const getPlacementVariants=placement=>{const common={hidden:{opacity:0},visible:{opacity:1,transition:{duration:_types__WEBPACK_IMPORTED_MODULE_2__.Duration.FAST,ease:[.25,.1,.25,1]}},exit:{opacity:0,transition:{duration:_types__WEBPACK_IMPORTED_MODULE_2__.Duration.NORMAL,ease:"easeInOut"}}};switch(placement){case"top-start":return{...common,hidden:{...common.hidden,scaleY:0,scaleX:0,transformOrigin:"bottom left"},visible:{...common.visible,scaleY:1,scaleX:1,transformOrigin:"bottom left"},exit:{...common.exit,scaleY:0,scaleX:0,transformOrigin:"bottom left"}};case"top-end":return{...common,hidden:{...common.hidden,scaleY:0,scaleX:0,transformOrigin:"bottom right"},visible:{...common.visible,scaleY:1,scaleX:1,transformOrigin:"bottom right"},exit:{...common.exit,scaleY:0,scaleX:0,transformOrigin:"bottom right"}};case"top":return{...common,hidden:{...common.hidden,scaleY:0,transformOrigin:"bottom"},visible:{...common.visible,scaleY:1,transformOrigin:"bottom"},exit:{...common.exit,scaleY:0,transformOrigin:"bottom"}};case"bottom-start":return{...common,hidden:{...common.hidden,scaleY:0,scaleX:0,transformOrigin:"top left"},visible:{...common.visible,scaleY:1,scaleX:1,transformOrigin:"top left"},exit:{...common.exit,scaleY:0,scaleX:0,transformOrigin:"top left"}};case"bottom-end":return{...common,hidden:{...common.hidden,scaleY:0,scaleX:0,transformOrigin:"top right"},visible:{...common.visible,scaleY:1,scaleX:1,transformOrigin:"top right"},exit:{...common.exit,scaleY:0,scaleX:0,transformOrigin:"top right"}};case"bottom":return{...common,hidden:{...common.hidden,scaleY:0,transformOrigin:"top"},visible:{...common.visible,scaleY:1,transformOrigin:"top"},exit:{...common.exit,scaleY:0,transformOrigin:"top"}};case"left-start":return{...common,hidden:{...common.hidden,scaleX:0,scaleY:0,transformOrigin:"right top"},visible:{...common.visible,scaleX:1,scaleY:1,transformOrigin:"right top"},exit:{...common.exit,scaleX:0,scaleY:0,transformOrigin:"right top"}};case"left-end":return{...common,hidden:{...common.hidden,scaleX:0,scaleY:0,transformOrigin:"right bottom"},visible:{...common.visible,scaleX:1,scaleY:1,transformOrigin:"right bottom"},exit:{...common.exit,scaleX:0,scaleY:0,transformOrigin:"right bottom"}};case"left":return{...common,hidden:{...common.hidden,scaleX:0,transformOrigin:"right"},visible:{...common.visible,scaleX:1,transformOrigin:"right"},exit:{...common.exit,scaleX:0,transformOrigin:"right"}};case"right-start":return{...common,hidden:{...common.hidden,scaleX:0,scaleY:0,transformOrigin:"left top"},visible:{...common.visible,scaleX:1,scaleY:1,transformOrigin:"left top"},exit:{...common.exit,scaleX:0,scaleY:0,transformOrigin:"left top"}};case"right-end":return{...common,hidden:{...common.hidden,scaleX:0,scaleY:0,transformOrigin:"left bottom"},visible:{...common.visible,scaleX:1,scaleY:1,transformOrigin:"left bottom"},exit:{...common.exit,scaleX:0,scaleY:0,transformOrigin:"left bottom"}};case"right":return{...common,hidden:{...common.hidden,scaleX:0,transformOrigin:"left"},visible:{...common.visible,scaleX:1,transformOrigin:"left"},exit:{...common.exit,scaleX:0,transformOrigin:"left"}};default:return common}};function Popover(_ref2){let{children,triggerOn="hover",open,onOpenChange,placement="top",content,popoverClassName,offset}=_ref2;const{context:floatingContext,refs,floatingStyles,modal,getFloatingProps,isOpen,setIsOpen,getReferenceProps}=usePopover({open,onOpenChange:void 0===open?void 0:onOpenChange,modal:!1,placement,initialOpen:!1,triggerOn,offset}),onOpenChangeRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onOpenChange);return onOpenChangeRef.current=onOpenChange,(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var _onOpenChangeRef$curr;void 0===open&&(null===(_onOpenChangeRef$curr=onOpenChangeRef.current)||void 0===_onOpenChangeRef$curr||_onOpenChangeRef$curr.call(onOpenChangeRef,isOpen))}),[open,isOpen]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(children)&&(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children,{ref:refs.setReference,...getReferenceProps()}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_7__.N,{children:isOpen&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.XF,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.s3,{context:floatingContext,modal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{ref:refs.setFloating,style:{...floatingStyles,zIndex:"var(--z-index-popover)"},...getFloatingProps(),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(motion_react__WEBPACK_IMPORTED_MODULE_8__.P.div,{initial:"hidden",animate:"visible",exit:"exit",variants:getPlacementVariants(placement),className:popoverClassName,style:{maxHeight:"calc(var(--vh, 1vh) * 90)",overflowY:"auto"},children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(content,{isOpen,onClose:()=>setIsOpen(!1)})})})})})})]})}try{usePopover.displayName="usePopover",usePopover.__docgenInfo={description:"",displayName:"usePopover",props:{initialOpen:{defaultValue:{value:"false"},description:"",name:"initialOpen",required:!1,type:{name:"boolean"}},placement:{defaultValue:{value:"bottom"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"top"'},{value:'"bottom"'},{value:'"left-start"'},{value:'"left-end"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"bottom-start"'},{value:'"bottom-end"'}]}},modal:{defaultValue:null,description:"",name:"modal",required:!1,type:{name:"boolean"}},open:{defaultValue:null,description:"",name:"open",required:!1,type:{name:"boolean"}},onOpenChange:{defaultValue:null,description:"",name:"onOpenChange",required:!1,type:{name:"((open: boolean) => void)"}},triggerOn:{defaultValue:{value:"click"},description:"",name:"triggerOn",required:!1,type:{name:"TriggerOnActionsType | TriggerOnActionsType[]"}},offset:{defaultValue:null,description:"",name:"offset",required:!1,type:{name:"number"}},padding:{defaultValue:{value:"4"},description:"",name:"padding",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/Popover/Popover.tsx#usePopover"]={docgenInfo:usePopover.__docgenInfo,name:"usePopover",path:"src/components/atoms/Popover/Popover.tsx#usePopover"})}catch(__react_docgen_typescript_loader_error){}try{Popover.displayName="Popover",Popover.__docgenInfo={description:"",displayName:"Popover",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"ReactNodeOrFunctionP1Type<{ isOpen: boolean; onClose: () => void; }>"}},placement:{defaultValue:{value:"top"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"top"'},{value:'"bottom"'},{value:'"left-start"'},{value:'"left-end"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"bottom-start"'},{value:'"bottom-end"'}]}},open:{defaultValue:null,description:"",name:"open",required:!1,type:{name:"boolean"}},onOpenChange:{defaultValue:null,description:"",name:"onOpenChange",required:!1,type:{name:"((visible: boolean) => void)"}},triggerOn:{defaultValue:{value:"hover"},description:"",name:"triggerOn",required:!1,type:{name:"TriggerOnActionsType | TriggerOnActionsType[]"}},popoverClassName:{defaultValue:null,description:"",name:"popoverClassName",required:!1,type:{name:"string"}},offset:{defaultValue:null,description:"",name:"offset",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/Popover/Popover.tsx#Popover"]={docgenInfo:Popover.__docgenInfo,name:"Popover",path:"src/components/atoms/Popover/Popover.tsx#Popover"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/atoms/Select/Select.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Select:()=>Select});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_resize_detector__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-resize-detector/build/useResizeDetector.js"),_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_Popover_Popover__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/atoms/Popover/Popover.tsx"),_server__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/atoms/server/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Select=props=>{const{className,popoverClassName,options,selectedOption:initialOptionSelected,onChange,disabled=!1,optionsPlacement="bottom",extend=!1,containerWidth:_containerWidth,children,onBlur}=props,[widthSelect,setWidthSelect]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),selectLayoutRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);(0,react_resize_detector__WEBPACK_IMPORTED_MODULE_5__.A)({onResize:()=>{var _selectLayoutRef$curr;selectLayoutRef.current&&setWidthSelect(null===(_selectLayoutRef$curr=selectLayoutRef.current)||void 0===_selectLayoutRef$curr?void 0:_selectLayoutRef$curr.getBoundingClientRect().width)},targetRef:selectLayoutRef});const{width:_widthFakeOptions=0,ref:fakeOptionsRef}=(0,react_resize_detector__WEBPACK_IMPORTED_MODULE_5__.A)(),widthFakeOptions=_widthFakeOptions+8,[isOpen,setIsOpen]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),selectedOptionRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onBlur).current=onBlur,(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const timeout=setTimeout((()=>{var _optionRef$current,_optionRef$current2,_selectedOptionRef$cu;isOpen&&((null===(_optionRef$current=optionRef.current)||void 0===_optionRef$current?void 0:_optionRef$current.scrollHeight)||0)>((null===(_optionRef$current2=optionRef.current)||void 0===_optionRef$current2?void 0:_optionRef$current2.clientHeight)||0)&&(null===(_selectedOptionRef$cu=selectedOptionRef.current)||void 0===_selectedOptionRef$cu||_selectedOptionRef$cu.scrollIntoView({behavior:"smooth",block:"center"}))}),100);return()=>{clearTimeout(timeout)}}),[isOpen]);const optionRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),option=options.find((option=>JSON.stringify(option.value)===JSON.stringify(initialOptionSelected.value))),optionSelected={value:initialOptionSelected.value,label:initialOptionSelected.label||(null==option?void 0:option.label),inputLabel:initialOptionSelected.inputLabel||(null==option?void 0:option.inputLabel)},isDisabled=disabled||!onChange,expandIcon={"top-start":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.$s4,{className:"input-icon"}),top:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.$s4,{className:"input-icon"}),"top-end":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.$s4,{className:"input-icon"}),"right-start":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.flY,{className:"input-icon"}),right:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.flY,{className:"input-icon"}),"right-end":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.flY,{className:"input-icon"}),"bottom-end":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.iVT,{className:"input-icon"}),bottom:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.iVT,{className:"input-icon"}),"bottom-start":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.iVT,{className:"input-icon"}),"left-start":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.A60,{className:"input-icon"}),left:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.A60,{className:"input-icon"}),"left-end":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server__WEBPACK_IMPORTED_MODULE_3__.A60,{className:"input-icon"})}[optionsPlacement];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Popover_Popover__WEBPACK_IMPORTED_MODULE_2__.Popover,{triggerOn:"click",placement:optionsPlacement,popoverClassName:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-select-options-content bc-we jk-br-ie elevation-1",popoverClassName),offset:4,open:isOpen,onOpenChange:setIsOpen,content:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{ref:optionRef,className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-select-options",{disabled:isDisabled}),style:{width:null!=_containerWidth?_containerWidth:Math.max(widthSelect,widthFakeOptions)},children:options.map((option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-select-option ws-np",{selected:JSON.stringify(option.value)===JSON.stringify(optionSelected.value),disabled:!!option.disabled||isDisabled}),onClick:isDisabled||option.disabled?void 0:event=>{null==onChange||onChange(option),setIsOpen(!1),event.stopPropagation()},ref:e=>{JSON.stringify(option.value)===JSON.stringify(optionSelected.value)&&(selectedOptionRef.current=e)},children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.lm)(option.label)},JSON.stringify(option.value))))}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)("jk-select-layout",className,optionsPlacement,{open:isOpen,disabled:isDisabled}),style:{width:extend?"100%":void 0},onClick:()=>setIsOpen(!isOpen),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{ref:fakeOptionsRef,className:"jk-select-options jk-border-radius-inline",style:{position:"fixed",width:"auto",pointerEvents:"none",opacity:0,top:0,left:0},children:[options.map((option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-select-option",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.lm)(option.label)},JSON.stringify(option.value)))),options.map((option=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-select-option",children:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.lm)(option.inputLabel)},JSON.stringify(option.value))))]}),children?(0,_helpers__WEBPACK_IMPORTED_MODULE_1__._v)(children,{options,isOpen,disabled:isDisabled,optionSelected,expandIcon}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)({open:isOpen},"jk-select space-between jk-border-radius-inline jk-row gap nowrap"),style:{width:null!=_containerWidth?_containerWidth:extend?"100%":void 0,minWidth:null!=_containerWidth?_containerWidth:extend?void 0:widthFakeOptions},ref:selectLayoutRef,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"jk-pg-x-sm-l",children:optionSelected.inputLabel?(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.lm)(optionSelected.inputLabel):(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.lm)(optionSelected.label)}),expandIcon]})]})})};try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},popoverClassName:{defaultValue:null,description:"",name:"popoverClassName",required:!1,type:{name:"string"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"SelectOptionType<T, U, V>[]"}},selectedOption:{defaultValue:null,description:"",name:"selectedOption",required:!0,type:{name:"SelectOption2Type<T, U, V>"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((option: SelectOptionType<T, U, V>) => void)"}},onBlur:{defaultValue:null,description:"",name:"onBlur",required:!1,type:{name:"((event: { target: LegacyRef<HTMLDivElement>; }) => void)"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},optionsPlacement:{defaultValue:null,description:"",name:"optionsPlacement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"top"'},{value:'"bottom"'},{value:'"left-start"'},{value:'"left-end"'},{value:'"right-start"'},{value:'"right-end"'},{value:'"top-start"'},{value:'"top-end"'},{value:'"bottom-start"'},{value:'"bottom-end"'}]}},extend:{defaultValue:null,description:"",name:"extend",required:!1,type:{name:"boolean"}},containerWidth:{defaultValue:null,description:"",name:"containerWidth",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/Select/Select.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/components/atoms/Select/Select.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}}}]);