"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[7017],{"./src/components/atoms/T/T.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{T:()=>T});__webpack_require__("./node_modules/react/index.js");var _helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/helpers/index.ts"),_stores_i18n_useI18nStore__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stores/i18n/useI18nStore.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const T=_ref=>{let{className="",children,style}=_ref;const t=(0,_stores_i18n_useI18nStore__WEBPACK_IMPORTED_MODULE_2__.T)((state=>state.i18n.t));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{className:(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.xW)(className),style,children:t(children)})};try{T.displayName="T",T.__docgenInfo={description:"",displayName:"T",props:{className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/T/T.tsx#T"]={docgenInfo:T.__docgenInfo,name:"T",path:"src/components/atoms/T/T.tsx#T"})}catch(__react_docgen_typescript_loader_error){}},"./src/stores/i18n/useI18nStore.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>useI18nStore});var esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),i18next=__webpack_require__("./node_modules/i18next/dist/esm/i18next.js"),react=__webpack_require__("./node_modules/zustand/esm/react.mjs"),settings=__webpack_require__("./src/settings/index.ts");const i18n_i18nConfig={lang:esm.TMK.ES,locales:[esm.TMK.ES,esm.TMK.EN],defaultLocale:esm.TMK.ES,namespaces:["translation"]};const i18nInstance=(0,i18next.Q_)();!async function initTranslations(i18nInstance){await i18nInstance.init({supportedLngs:i18n_i18nConfig.locales,defaultNS:i18n_i18nConfig.namespaces[0],fallbackNS:i18n_i18nConfig.namespaces[0],ns:i18n_i18nConfig.namespaces,preload:i18n_i18nConfig.locales,keySeparator:!1,interpolation:{escapeValue:!1}},(err=>{if(err)return console.error("error on initI18next",err)}))}(i18nInstance);const useI18nStore=(0,react.v)((set=>({i18n:i18nInstance,changeLanguage:async lng=>{i18nInstance.language!==lng&&(await i18nInstance.changeLanguage(lng),set({i18n:{...i18nInstance,t:function(){return i18nInstance.t(...arguments)}}}))},loadResources:async function(){let namespace=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"translation";const[dataEN,dataES]=await Promise.all([fetch(settings.u.API_V1.locale.get({params:{locale:esm.TMK.EN,namespace}}).url).then((res=>res.json())),fetch(settings.u.API_V1.locale.get({params:{locale:esm.TMK.ES,namespace}}).url).then((res=>res.json()))]);i18nInstance.addResourceBundle(esm.TMK.EN,namespace,dataEN),i18nInstance.addResourceBundle(esm.TMK.ES,namespace,dataES),set({i18n:{...i18nInstance,t:function(){return i18nInstance.t(...arguments)}}})}})))}}]);