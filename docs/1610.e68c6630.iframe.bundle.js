"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[1610],{"./src/contexts/JukiProviders.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{JukiProviders:()=>JukiProviders});var react=__webpack_require__("./node_modules/react/index.js"),DndProvider=__webpack_require__("./node_modules/react-dnd/dist/core/DndProvider.js"),dist=__webpack_require__("./node_modules/react-dnd-html5-backend/dist/index.js"),JukiLastPathProvider=__webpack_require__("./src/contexts/JukiLastPathProvider/index.ts"),JukiPageProvider=__webpack_require__("./src/contexts/JukiPageProvider/index.ts"),JukiRouterProvider=__webpack_require__("./src/contexts/JukiRouterProvider/index.ts"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),config=__webpack_require__("./src/config/index.tsx"),context=__webpack_require__("./src/contexts/JukiTProvider/context.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const JukiTProvider=_ref=>{let{i18n,children}=_ref;const[trigger,setTrigger]=(0,react.useState)(Date.now());(0,react.useEffect)((()=>{i18n.on("languageChanged",(()=>setTrigger(Date.now)))}),[i18n]),(0,react.useEffect)((()=>{(async()=>{try{const namespace="translation",[dataEN,dataES]=await Promise.all([fetch(config.A.API.locale.get({params:{locale:esm.SQ.EN,namespace}}).url).then((res=>res.json())),fetch(config.A.API.locale.get({params:{locale:esm.SQ.ES,namespace}}).url).then((res=>res.json()))]);i18n.addResourceBundle(esm.SQ.EN,namespace,dataEN),i18n.addResourceBundle(esm.SQ.ES,namespace,dataES),setTimeout((()=>setTrigger(Date.now())),200)}catch(error){(0,esm.N6)(error)}})()}),[i18n]);const value=(0,react.useMemo)((()=>({i18n})),[i18n,trigger]);return(0,jsx_runtime.jsx)(context.a.Provider,{value,children})};try{JukiTProvider.displayName="JukiTProvider",JukiTProvider.__docgenInfo={description:"",displayName:"JukiTProvider",props:{i18n:{defaultValue:null,description:"",name:"i18n",required:!0,type:{name:"i18n"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/JukiTProvider/JukiTProvider.tsx#JukiTProvider"]={docgenInfo:JukiTProvider.__docgenInfo,name:"JukiTProvider",path:"src/contexts/JukiTProvider/JukiTProvider.tsx#JukiTProvider"})}catch(__react_docgen_typescript_loader_error){}var JukiUIProvider=__webpack_require__("./src/contexts/JukiUIProvider/index.ts"),JukiUserProvider=__webpack_require__("./src/contexts/JukiUserProvider/index.ts");const JukiProviders=props=>{const{children,serviceApiUrl,socketServiceUrl,utilsUiUrl,tokenName,components,router,i18n,initialLastPath}=props,providers=(0,jsx_runtime.jsx)(JukiRouterProvider.X,{searchParams:router.searchParams,appendSearchParams:router.appendSearchParams,setSearchParams:router.setSearchParams,deleteSearchParams:router.deleteSearchParams,routeParams:router.routeParams,pushRoute:router.pushRoute,replaceRoute:router.replaceRoute,reloadRoute:router.reloadRoute,isLoadingRoute:router.isLoadingRoute,pathname:router.pathname,children:(0,jsx_runtime.jsx)(JukiPageProvider.F,{children:(0,jsx_runtime.jsx)(JukiUserProvider.m,{socketServiceUrl,serviceApiUrl,utilsUiUrl,tokenName,children:(0,jsx_runtime.jsx)(JukiUIProvider.I,{components,children:(0,jsx_runtime.jsx)(JukiLastPathProvider.w,{initialLastPath,children:(0,jsx_runtime.jsx)(DndProvider.W,{backend:dist.PD,children})})})})})});return i18n?(0,jsx_runtime.jsx)(JukiTProvider,{i18n,children:providers}):providers};try{JukiProviders.displayName="JukiProviders",JukiProviders.__docgenInfo={description:"",displayName:"JukiProviders",props:{components:{defaultValue:null,description:"",name:"components",required:!1,type:{name:"Partial<UIComponentsContextInterface>"}},serviceApiUrl:{defaultValue:null,description:"",name:"serviceApiUrl",required:!0,type:{name:"string"}},socketServiceUrl:{defaultValue:null,description:"",name:"socketServiceUrl",required:!0,type:{name:"string"}},utilsUiUrl:{defaultValue:null,description:"",name:"utilsUiUrl",required:!0,type:{name:"string"}},tokenName:{defaultValue:null,description:"",name:"tokenName",required:!0,type:{name:"string"}},i18n:{defaultValue:null,description:"",name:"i18n",required:!1,type:{name:"i18n"}},initialLastPath:{defaultValue:null,description:"",name:"initialLastPath",required:!0,type:{name:"LastPathType<T>"}},router:{defaultValue:null,description:"",name:"router",required:!0,type:{name:"{ searchParams: URLSearchParams; appendSearchParams: AppendSearchParamsType; setSearchParams: SetSearchParamsType; ... 6 more ...; isLoadingRoute?: boolean | undefined; } | { ...; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/contexts/JukiProviders.tsx#JukiProviders"]={docgenInfo:JukiProviders.__docgenInfo,name:"JukiProviders",path:"src/contexts/JukiProviders.tsx#JukiProviders"})}catch(__react_docgen_typescript_loader_error){}}}]);