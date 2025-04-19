"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[2240,5856],{"./src/components/organisms/Notifications/CardNotification.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CardNotification:()=>CardNotification});var react=__webpack_require__("./node_modules/react/index.js"),helpers=__webpack_require__("./src/helpers/index.ts"),hooks=__webpack_require__("./src/hooks/index.ts"),types=__webpack_require__("./src/types/index.ts"),server=__webpack_require__("./src/components/server/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");types.NotificationType.ERROR,types.NotificationType.SUCCESS,types.NotificationType.WARNING,types.NotificationType.INFO,types.NotificationType.QUIET;const NOTIFICATION_ICON={[types.NotificationType.ERROR]:(0,jsx_runtime.jsx)(server.IJR,{}),[types.NotificationType.SUCCESS]:(0,jsx_runtime.jsx)(server.Srz,{circle:!0}),[types.NotificationType.WARNING]:(0,jsx_runtime.jsx)(server.id,{}),[types.NotificationType.INFO]:(0,jsx_runtime.jsx)(server.mo0,{}),[types.NotificationType.QUIET]:null},CardNotification=_ref=>{let{id,type,message}=_ref;const[exit,setExit]=(0,react.useState)(!1),[width,setWidth]=(0,react.useState)(0),intervalIDRef=(0,react.useRef)(void 0),{removeNotification}=(0,hooks.Eq)(),{viewPortSize}=(0,hooks.p1)(),messageString=(0,helpers.rf)(message),handleStartTimer=(0,react.useCallback)((()=>{const newIntervalId=setInterval((()=>{setWidth((prev=>prev<100?prev+1e4/(messageString.length/5*1e3+3e3):(clearInterval(newIntervalId),setExit(!0),prev)))}),50);intervalIDRef.current&&clearInterval(intervalIDRef.current),intervalIDRef.current=newIntervalId}),[messageString.length]),handleStopTimer=()=>{intervalIDRef.current&&clearInterval(intervalIDRef.current)},isPageFocus=(0,hooks.sr)((state=>state.isFocus)),isPageVisible=(0,hooks.sr)((state=>state.isVisible));return(0,react.useEffect)((()=>(isPageVisible&&isPageFocus?handleStartTimer():handleStopTimer(),()=>{intervalIDRef.current&&clearInterval(intervalIDRef.current)})),[handleStartTimer,isPageVisible,isPageFocus]),(0,react.useEffect)((()=>{exit&&setTimeout((()=>removeNotification(id)),400)}),[exit,id,removeNotification]),(0,jsx_runtime.jsx)("div",{onMouseEnter:handleStopTimer,onMouseLeave:handleStartTimer,className:(0,helpers.xW)("jk-notification-item-container",type,{exit}),style:type===types.NotificationType.QUIET&&"sm"!==viewPortSize?{"--width-notification":8*(0,helpers.rf)(message).length+26+"px"}:{},children:(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-notification-item elevation-2 jk-br-ie"),children:[NOTIFICATION_ICON[type],(0,jsx_runtime.jsxs)("div",{className:"jk-row stretch space-between nowrap flex-1",children:[(0,jsx_runtime.jsx)("div",{className:(0,helpers.xW)("jk-notification-message-content jk-row flex-1",{"text-message":"string"==typeof message,"wb-bw":!0}),children:"string"==typeof message?(0,jsx_runtime.jsx)("span",{className:"tt-se",children:message}):message}),(0,jsx_runtime.jsx)("div",{className:"jk-col",children:(0,jsx_runtime.jsx)("div",{className:(0,helpers.xW)("jk-button light only-icon",{tiny:"quiet"===type}),children:(0,jsx_runtime.jsx)(server.USm,{onClick:()=>setExit(!0)})})})]}),(0,jsx_runtime.jsx)("div",{className:"bar",style:{width:`${width}%`}})]})})};try{CardNotification.displayName="CardNotification",CardNotification.__docgenInfo={description:"",displayName:"CardNotification",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"success"'},{value:'"info"'},{value:'"warning"'},{value:'"error"'},{value:'"quiet"'}]}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/Notifications/CardNotification.tsx#CardNotification"]={docgenInfo:CardNotification.__docgenInfo,name:"CardNotification",path:"src/components/organisms/Notifications/CardNotification.tsx#CardNotification"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/organisms/Notifications/NotificationProvider.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NotificationProvider:()=>NotificationProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_hooks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/index.ts"),_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/types/index.ts"),_CardNotification__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/organisms/Notifications/CardNotification.tsx"),_context__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/organisms/Notifications/context.tsx"),_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/organisms/Notifications/types.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");function NotificationProvider(_ref){let{children}=_ref;const sound=(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.io)(),[state,dispatch]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(((state,action)=>{switch(action.type){case _types__WEBPACK_IMPORTED_MODULE_5__.K.ADD_NOTIFICATION:return action.payload.type===_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.SUCCESS&&sound.playSuccess(),action.payload.type===_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.INFO&&sound.playNotification(),action.payload.type===_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.ERROR&&sound.playError(),action.payload.type===_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.WARNING&&sound.playWarning(),[...state,{...action.payload}];case _types__WEBPACK_IMPORTED_MODULE_5__.K.REMOVE_NOTIFICATION:return state.filter((notification=>notification.id!==action.notificationId));default:return state}}),[]),{viewPortSize}=(0,_hooks__WEBPACK_IMPORTED_MODULE_1__.p1)(),notificationsFiltered=state.filter((note=>note.type!==_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.QUIET)),notifications="sm"===viewPortSize?[...notificationsFiltered].reverse():notificationsFiltered;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_context__WEBPACK_IMPORTED_MODULE_4__.V.Provider,{value:{dispatch},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"notification-wrapper",children:notifications.map((note=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CardNotification__WEBPACK_IMPORTED_MODULE_3__.CardNotification,{...note},note.id)))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"notification-wrapper-quiet",children:state.filter((note=>note.type===_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.QUIET)).map((note=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CardNotification__WEBPACK_IMPORTED_MODULE_3__.CardNotification,{...note,type:_types__WEBPACK_IMPORTED_MODULE_2__.NotificationType.QUIET},note.id)))}),children]})}try{NotificationProvider.displayName="NotificationProvider",NotificationProvider.__docgenInfo={description:"",displayName:"NotificationProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/Notifications/NotificationProvider.tsx#NotificationProvider"]={docgenInfo:NotificationProvider.__docgenInfo,name:"NotificationProvider",path:"src/components/organisms/Notifications/NotificationProvider.tsx#NotificationProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);