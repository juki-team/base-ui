/*! For license information please see 9818.2eee8e1b.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9818],{"./node_modules/react-router-dom/dist/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{VK:function(){return BrowserRouter}});var router_Action,react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}!function(Action){Action.Pop="POP",Action.Push="PUSH",Action.Replace="REPLACE"}(router_Action||(router_Action={}));const PopStateEventType="popstate";function invariant(value,message){if(!1===value||null==value)throw new Error(message)}function getHistoryState(location,index){return{usr:location.state,key:location.key,idx:index}}function createLocation(current,to,state,key){return void 0===state&&(state=null),_extends({pathname:"string"==typeof current?current:current.pathname,search:"",hash:""},"string"==typeof to?router_parsePath(to):to,{state:state,key:to&&to.key||key||Math.random().toString(36).substr(2,8)})}function router_createPath(_ref){let{pathname:pathname="/",search:search="",hash:hash=""}=_ref;return search&&"?"!==search&&(pathname+="?"===search.charAt(0)?search:"?"+search),hash&&"#"!==hash&&(pathname+="#"===hash.charAt(0)?hash:"#"+hash),pathname}function router_parsePath(path){let parsedPath={};if(path){let hashIndex=path.indexOf("#");hashIndex>=0&&(parsedPath.hash=path.substr(hashIndex),path=path.substr(0,hashIndex));let searchIndex=path.indexOf("?");searchIndex>=0&&(parsedPath.search=path.substr(searchIndex),path=path.substr(0,searchIndex)),path&&(parsedPath.pathname=path)}return parsedPath}function getUrlBasedHistory(getLocation,createHref,validateLocation,options){void 0===options&&(options={});let{window:window=document.defaultView,v5Compat:v5Compat=!1}=options,globalHistory=window.history,action=router_Action.Pop,listener=null,index=getIndex();function getIndex(){return(globalHistory.state||{idx:null}).idx}function handlePop(){action=router_Action.Pop;let nextIndex=getIndex(),delta=null==nextIndex?null:nextIndex-index;index=nextIndex,listener&&listener({action:action,location:history.location,delta:delta})}function createURL(to){let base="null"!==window.location.origin?window.location.origin:window.location.href,href="string"==typeof to?to:router_createPath(to);return invariant(base,"No window.location.(origin|href) available to create URL for href: "+href),new URL(href,base)}null==index&&(index=0,globalHistory.replaceState(_extends({},globalHistory.state,{idx:index}),""));let history={get action(){return action},get location(){return getLocation(window,globalHistory)},listen(fn){if(listener)throw new Error("A history only accepts one active listener");return window.addEventListener(PopStateEventType,handlePop),listener=fn,()=>{window.removeEventListener(PopStateEventType,handlePop),listener=null}},createHref(to){return createHref(window,to)},createURL:createURL,encodeLocation(to){let url=createURL(to);return{pathname:url.pathname,search:url.search,hash:url.hash}},push:function push(to,state){action=router_Action.Push;let location=createLocation(history.location,to,state);validateLocation&&validateLocation(location,to),index=getIndex()+1;let historyState=getHistoryState(location,index),url=history.createHref(location);try{globalHistory.pushState(historyState,"",url)}catch(error){if(error instanceof DOMException&&"DataCloneError"===error.name)throw error;window.location.assign(url)}v5Compat&&listener&&listener({action:action,location:history.location,delta:1})},replace:function replace(to,state){action=router_Action.Replace;let location=createLocation(history.location,to,state);validateLocation&&validateLocation(location,to),index=getIndex();let historyState=getHistoryState(location,index),url=history.createHref(location);globalHistory.replaceState(historyState,"",url),v5Compat&&listener&&listener({action:action,location:history.location,delta:0})},go(n){return globalHistory.go(n)}};return history}var ResultType;!function(ResultType){ResultType.data="data",ResultType.deferred="deferred",ResultType.redirect="redirect",ResultType.error="error"}(ResultType||(ResultType={}));new Set(["lazy","caseSensitive","path","id","index","children"]);function router_stripBasename(pathname,basename){if("/"===basename)return pathname;if(!pathname.toLowerCase().startsWith(basename.toLowerCase()))return null;let startIndex=basename.endsWith("/")?basename.length-1:basename.length,nextChar=pathname.charAt(startIndex);return nextChar&&"/"!==nextChar?null:pathname.slice(startIndex)||"/"}Error;const validMutationMethodsArr=["post","put","patch","delete"],validRequestMethodsArr=(new Set(validMutationMethodsArr),["get",...validMutationMethodsArr]);new Set(validRequestMethodsArr),new Set([301,302,303,307,308]),new Set([307,308]);Symbol("deferred");const NavigationContext=react.createContext(null);const LocationContext=react.createContext(null);function useInRouterContext(){return null!=react.useContext(LocationContext)}react.Component;react_namespaceObject.startTransition;function dist_Router(_ref5){let{basename:basenameProp="/",children:children=null,location:locationProp,navigationType:navigationType=router_Action.Pop,navigator:navigator,static:staticProp=!1}=_ref5;useInRouterContext()&&invariant(!1);let basename=basenameProp.replace(/^\/*/,"/"),navigationContext=react.useMemo((()=>({basename:basename,navigator:navigator,static:staticProp})),[basename,navigator,staticProp]);"string"==typeof locationProp&&(locationProp=router_parsePath(locationProp));let{pathname:pathname="/",search:search="",hash:hash="",state:state=null,key:key="default"}=locationProp,locationContext=react.useMemo((()=>{let trailingPathname=router_stripBasename(pathname,basename);return null==trailingPathname?null:{location:{pathname:trailingPathname,search:search,hash:hash,state:state,key:key},navigationType:navigationType}}),[basename,pathname,search,hash,state,key,navigationType]);return null==locationContext?null:react.createElement(NavigationContext.Provider,{value:navigationContext},react.createElement(LocationContext.Provider,{children:children,value:locationContext}))}new Promise((()=>{}));react.Component;new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const dist_startTransitionImpl=react_namespaceObject.startTransition;function BrowserRouter(_ref){let{basename:basename,children:children,future:future,window:window}=_ref,historyRef=react.useRef();null==historyRef.current&&(historyRef.current=function router_createBrowserHistory(options){return void 0===options&&(options={}),getUrlBasedHistory((function createBrowserLocation(window,globalHistory){let{pathname:pathname,search:search,hash:hash}=window.location;return createLocation("",{pathname:pathname,search:search,hash:hash},globalHistory.state&&globalHistory.state.usr||null,globalHistory.state&&globalHistory.state.key||"default")}),(function createBrowserHref(window,to){return"string"==typeof to?to:router_createPath(to)}),null,options)}({window:window,v5Compat:!0}));let history=historyRef.current,[state,setStateImpl]=react.useState({action:history.action,location:history.location}),{v7_startTransition:v7_startTransition}=future||{},setState=react.useCallback((newState=>{v7_startTransition&&dist_startTransitionImpl?dist_startTransitionImpl((()=>setStateImpl(newState))):setStateImpl(newState)}),[setStateImpl,v7_startTransition]);return react.useLayoutEffect((()=>history.listen(setState)),[history,setState]),react.createElement(dist_Router,{basename:basename,children:children,location:state.location,navigationType:state.action,navigator:history})}"undefined"!=typeof window&&void 0!==window.document&&window.document.createElement;var dist_DataRouterHook,dist_DataRouterStateHook;(function(DataRouterHook){DataRouterHook.UseScrollRestoration="useScrollRestoration",DataRouterHook.UseSubmit="useSubmit",DataRouterHook.UseSubmitFetcher="useSubmitFetcher",DataRouterHook.UseFetcher="useFetcher"})(dist_DataRouterHook||(dist_DataRouterHook={})),function(DataRouterStateHook){DataRouterStateHook.UseFetchers="useFetchers",DataRouterStateHook.UseScrollRestoration="useScrollRestoration"}(dist_DataRouterStateHook||(dist_DataRouterStateHook={}))}}]);