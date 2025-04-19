"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6529,9378],{"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action,qp:()=>configureActions});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),__defProp=Object.defineProperty,ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},configureActions=(options={})=>{Object.assign(config,options)},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var preview_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(preview_exports,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions:actions2}}=context;return actions2?.disable||!argTypes?{}:Object.entries(argTypes).filter((([name,argType])=>!!argType.action)).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc)),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions:actions2}}=context;if(!actions2||actions2.disable||!actions2.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions2.argTypesRegex);return Object.entries(argTypes).filter((([name])=>!!argTypesRegex.test(name))).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc)),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions:actions2}}=context;if(!actions2?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)(((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some((prefix=>name.startsWith(prefix))))&&action(name)(args)})),subscribed=!0}}]},"./src/components/molecules/SimpleSortableRows/SortableItems.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SimpleSortableRows:()=>SimpleSortableRows,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_mockup__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/mockup/index.ts"),_SortableItems__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/molecules/SimpleSortableRows/SortableItems.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_mockup__WEBPACK_IMPORTED_MODULE_2__]);_mockup__WEBPACK_IMPORTED_MODULE_2__=(__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__)[0];const __WEBPACK_DEFAULT_EXPORT__={component:_SortableItems__WEBPACK_IMPORTED_MODULE_3__.SortableItems,argTypes:{}};(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.qp)({depth:100,limit:20});const Component=_ref=>{let{style,attributes,listeners,item,props,isOver,isDragging,setNodeRef}=_ref;const test=new Array(Math.round(5*+item.key)).fill(0).map(((_,i)=>i));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{ref:setNodeRef,style:{...style,border:"1px solid black"},...attributes,children:["hola",item.key,test.map(((_,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:i}))),isOver&&"isOver",isDragging&&"isDragging",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{...listeners,style:{cursor:isDragging?"grabbing":"grab"},children:"gra"}),JSON.stringify(style)]})},SimpleSortableRows=()=>{const[items,setItems]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{key:"1",value:"111"},{key:"2",value:"222"},{key:"3",value:"333"},{key:"3.5",value:"444"},{key:"4",value:"555"},{key:"5",value:"666"},{key:"6",value:"777"},{key:"7",value:"888"}]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mockup__WEBPACK_IMPORTED_MODULE_2__.Ag,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{style:{height:"500px",width:"400px",overflow:"auto"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_SortableItems__WEBPACK_IMPORTED_MODULE_3__.SortableItems,{items,onChange:setItems,Cmp:Component,props:{otherValue:"test"}})})})},__namedExportsOrder=["SimpleSortableRows"];SimpleSortableRows.parameters={...SimpleSortableRows.parameters,docs:{...SimpleSortableRows.parameters?.docs,source:{originalSource:"() => {\n  const [items, setItems] = useState<SortableItem<string>[]>([{\n    key: '1',\n    value: '111'\n  }, {\n    key: '2',\n    value: '222'\n  }, {\n    key: '3',\n    value: '333'\n  }, {\n    key: '3.5',\n    value: '444'\n  }, {\n    key: '4',\n    value: '555'\n  }, {\n    key: '5',\n    value: '666'\n  }, {\n    key: '6',\n    value: '777'\n  }, {\n    key: '7',\n    value: '888'\n  }]);\n  return <MockupJukiProvider>\n      <div style={{\n      height: '500px',\n      width: '400px',\n      overflow: 'auto'\n    }}>\n        <SortableItemsComponent<string, {\n        otherValue: string;\n      }> items={items} onChange={setItems} Cmp={Component}\n      // props={undefined}\n      props={{\n        otherValue: 'test'\n      }}\n      // onDragEnd={(rowKey) => {\n      //   console.info('onDragEnd', { rowKey });\n      // }}\n      // onDragStart={(rowKey) => {\n      //   console.info('onDragStart', { rowKey });\n      // }}\n      />\n      </div>\n    </MockupJukiProvider>;\n}",...SimpleSortableRows.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))},"./src/components/molecules/SimpleSortableRows/SortableItems.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SortableItems:()=>SortableItems});var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@dnd-kit/core/dist/core.esm.js"),_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@dnd-kit/sortable/dist/sortable.esm.js"),_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@dnd-kit/utilities/dist/utilities.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));function SortableItem(_ref){var _transform$x,_transform$y;let{id,Cmp,item,props,index}=_ref;const{attributes,listeners,setNodeRef,transform,transition,isDragging,isOver}=(0,_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__.gl)({id}),style={transform:_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.Ks.Transform.toString({x:null!==(_transform$x=null==transform?void 0:transform.x)&&void 0!==_transform$x?_transform$x:0,y:null!==(_transform$y=null==transform?void 0:transform.y)&&void 0!==_transform$y?_transform$y:0,scaleX:1,scaleY:1}),transition,zIndex:isDragging?1:void 0};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Cmp,{setNodeRef,style,attributes,listeners,item,props,isDragging,isOver,index})}const SortableItems=properties=>{const{items,setItems,onChange,props,Cmp,horizontal}=properties,sensors=(0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.FR)((0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.MS)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.AN));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.Mp,{sensors,collisionDetection:_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.fp,onDragEnd:_ref2=>{let{active,over}=_ref2;if(over&&active.id!==over.id){const oldIndex=items.findIndex((a=>a.key===active.id)),newIndex=items.findIndex((a=>a.key===over.id)),newItems=(0,_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__.be)(items,oldIndex,newIndex);null==setItems||setItems(newItems),null==onChange||onChange(newItems,active.id)}},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__.gB,{items:items.map((_ref3=>{let{key}=_ref3;return key})),strategy:horizontal?_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__.m$:_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_1__._G,children:items.map(((item,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(SortableItem,{id:item.key,Cmp,props,item,index},item.key)))})})};try{SortableItems.displayName="SortableItems",SortableItems.__docgenInfo={description:"",displayName:"SortableItems",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"SortableItem<T>[]"}},setItems:{defaultValue:null,description:"",name:"setItems",required:!1,type:{name:"Dispatch<SetStateAction<SortableItem<T>[]>>"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((items: SortableItem<T>[], activeItemKey: string) => void | Promise<void>)"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},Cmp:{defaultValue:null,description:"",name:"Cmp",required:!0,type:{name:"SortableItemComponent<T, U>"}},props:{defaultValue:null,description:"",name:"props",required:!0,type:{name:"U"}},horizontal:{defaultValue:null,description:"",name:"horizontal",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/SimpleSortableRows/SortableItems.tsx#SortableItems"]={docgenInfo:SortableItems.__docgenInfo,name:"SortableItems",path:"src/components/molecules/SimpleSortableRows/SortableItems.tsx#SortableItems"})}catch(__react_docgen_typescript_loader_error){}}}]);