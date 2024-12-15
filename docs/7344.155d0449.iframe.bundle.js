"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[7344],{"./src/components/organisms/mdMath/MdMathViewer/MdMathViewer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MdMathViewer:()=>MdMathViewer});var react=__webpack_require__("./node_modules/react/index.js"),helpers=__webpack_require__("./src/helpers/index.ts"),MdFloatToolbar=__webpack_require__("./src/components/organisms/mdMath/MdFloatToolbar.tsx"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),lib=__webpack_require__("./node_modules/react-markdown/lib/index.js"),rehype_katex_lib=__webpack_require__("./node_modules/rehype-katex/lib/index.js"),remark_gfm_lib=__webpack_require__("./node_modules/remark-gfm/lib/index.js"),remark_math_lib=__webpack_require__("./node_modules/remark-math/lib/index.js"),hooks=__webpack_require__("./src/hooks/index.ts"),settings=__webpack_require__("./src/settings/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),GraphvizEditor=__webpack_require__("./src/components/organisms/GraphvizEditor/index.tsx"),UserChip=__webpack_require__("./src/components/organisms/UserChip/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const keys={textAlign:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:""},imgAlign:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:""},size:function(){let value=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const[width,height]=value.trim().split("x");return{width:+width||"auto",height:+height||"auto"}},height:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:""},theme:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")===esm.Sxu.DARK?esm.Sxu.DARK:esm.Sxu.LIGHT},lang:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:""},preview:function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:""}},getCommands=text=>{const X=text.split("\n"),Y=X[0].split(" "),commands=Y[0].split("\\"),commandsObject={};let i=0;if(""===commands[0])for(i++;i<commands.length;i++){const command=commands[i],[key="",value=""]=command.trim().split("=");"textAlign"===key||"imgAlign"===key||"size"===key||"height"===key||"theme"===key||"lang"===key?commandsObject[key]=keys[key](value):"lineNumbers"===key?commandsObject[key]=!0:"preview"===key?commandsObject[key]=keys[key](value):"asImage"===key?commandsObject[key]=!0:"jkUserNickname"===key?commandsObject[key]=value:commandsObject.rest=(commandsObject.rest||"")+key+"="+value}return Y[0]=commands.slice(i).join("\\"),X[0]=Y.join(" "),[commandsObject,X.join("\n")]},textAlignStyle={center:{textAlign:"center"},left:{textAlign:"left"},right:{textAlign:"right"},justify:{textAlign:"justify"}},imgAlignStyle={center:{display:"block",margin:"0 auto"},left:{display:"block",margin:"0 auto 0 0"},right:{display:"block",margin:"0 0 0 auto"}},hxRender=(tagName,children,style)=>{switch(tagName){case"h1":return(0,jsx_runtime.jsx)("h1",{style,children});case"h2":return(0,jsx_runtime.jsx)("h2",{style,children});case"h3":return(0,jsx_runtime.jsx)("h3",{style,children});case"h4":return(0,jsx_runtime.jsx)("h4",{style,children});case"h5":return(0,jsx_runtime.jsx)("h5",{style,children});default:return(0,jsx_runtime.jsx)("h6",{style,children})}};try{getCommands.displayName="getCommands",getCommands.__docgenInfo={description:"",displayName:"getCommands",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/mdMath/MdMathViewer/utils.tsx#getCommands"]={docgenInfo:getCommands.__docgenInfo,name:"getCommands",path:"src/components/organisms/mdMath/MdMathViewer/utils.tsx#getCommands"})}catch(__react_docgen_typescript_loader_error){}const _excluded=["children","className"],hx=_ref=>{let{children,node:{tagName}}=_ref;const newChildren=Array.isArray(children)?[...children]:[children];if("string"==typeof newChildren[0]){const[commands,newText]=getCommands(newChildren[0]);if(newChildren[0]=newText,commands.textAlign)return hxRender(tagName,newText,textAlignStyle[commands.textAlign])}return hxRender(tagName,children,{})},UserInlineChip=_ref2=>{let{nickname}=_ref2;const{isLoading,data}=(0,hooks.Ls)(settings.ug.API_V1.user.getSummary({params:{nickname}}).url);return isLoading?(0,jsx_runtime.jsx)(atoms.Gcs,{size:"tiny"}):null!=data&&data.success?(0,jsx_runtime.jsx)(UserChip.A,{nickname,imageUrl:data.content.imageUrl,className:"jk-tag bc-hl dy-if- va-tp nowrap"}):(0,jsx_runtime.jsx)(atoms.IJR,{})},CustomField=_ref3=>{let{commands,restText}=_ref3;return commands.jkUserNickname?(0,jsx_runtime.jsx)(UserInlineChip,{nickname:commands.jkUserNickname}):(0,jsx_runtime.jsx)("span",{children:"--"})},MdMath=(0,react.memo)((_ref4=>{let{source}=_ref4;const{components:{Link}}=(0,hooks.p1)(),props=(0,react.useMemo)((()=>({remarkPlugins:[remark_math_lib.A,remark_gfm_lib.A],rehypePlugins:[rehype_katex_lib.A],components:{img(_ref5){let{alt="",src}=_ref5,style={maxWidth:"100%",display:"block",margin:"0 auto"};const[commands,newAlt]=getCommands(alt);return commands.imgAlign&&(style=(0,objectSpread2.A)((0,objectSpread2.A)({},style),imgAlignStyle[commands.imgAlign])),commands.size&&(style.width=commands.size.width+"px",style.height=commands.size.height+"px"),(0,jsx_runtime.jsx)("img",{alt:newAlt,src,style})},h1:hx,h2:hx,h3:hx,h4:hx,h5:hx,h6:hx,p(_ref6){let{children=null}=_ref6;const newChildren=Array.isArray(children)?[...children]:[children];if("string"==typeof newChildren[0]){const[commands,newText]=getCommands(newChildren[0]);let style={textAlign:"justify"};return commands.textAlign&&(style=(0,objectSpread2.A)((0,objectSpread2.A)({},style),textAlignStyle[commands.textAlign])),newChildren[0]=newText,(0,jsx_runtime.jsx)("p",{style,children:newChildren})}return(0,jsx_runtime.jsx)("p",{children})},a(_ref7){let{children,href=""}=_ref7;const firstChildrenString="string"==typeof children?children:Array.isArray(children)&&"string"==typeof children[0]?children[0]:null;if("string"==typeof firstChildrenString){const[commands,restText]=getCommands(firstChildrenString);if("@"===href)return(0,jsx_runtime.jsx)(CustomField,{commands,restText});const style={outline:"2px solid var(--t-color-gray-6)",border:"none",height:"100%"};if(commands.height&&(style.height=Number.isNaN(+commands.height)?commands.height:commands.height+"px"),"pdf"===commands.preview)return(0,jsx_runtime.jsx)("object",{data:href,type:"application/pdf",width:"100%",height:"100%",style,children:(0,jsx_runtime.jsxs)(Link,{href,target:"_blank",rel:"noreferrer",className:"jk-md-math-link",children:[restText," ",(0,jsx_runtime.jsx)(atoms.PHA,{})]})});if("html"===commands.preview)return(0,jsx_runtime.jsx)("iframe",{src:href,style:(0,objectSpread2.A)({width:"100%"},style),title:"preview-html-document"});if(null!=href&&href.startsWith("#")){var _window,_window$location;return new URL((null===(_window=window)||void 0===_window||null===(_window$location=_window.location)||void 0===_window$location?void 0:_window$location.href)||"").hash=href,(0,jsx_runtime.jsx)("div",{className:"jk-md-math-link-container jk-row left",id:href.replace("#",""),children:(0,jsx_runtime.jsx)("a",{href,className:"jk-md-math-link",children})})}return(0,jsx_runtime.jsx)(Link,{href,target:"_blank",rel:"noreferrer",className:"jk-md-math-link with-icon",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[children," ",(0,jsx_runtime.jsx)(atoms.PHA,{})]})})}return(0,jsx_runtime.jsx)(Link,{href,target:"_blank",rel:"noreferrer",className:"jk-md-math-link",children})},code:_ref8=>{let{children,className=""}=_ref8;if(!(null!=children&&children.toString().includes("\n")))return(0,jsx_runtime.jsx)("code",{className:"inline-code",children});let text=className.replace("language-","");for(const a of Object.keys(esm.A3Q))if(text.startsWith(a)){text="\\lang=".concat(text);break}const[commands,newClassName]=getCommands(text),language=commands.lang||commands.rest||newClassName||esm.A3Q.TEXT;return"string"==typeof children?language===esm.A3Q.DOT&&commands.asImage?(0,jsx_runtime.jsx)(GraphvizEditor.S,{value:children,className:"jk-row ".concat(commands.imgAlign||"")}):(0,jsx_runtime.jsx)(molecules.Cv,{code:children,language,lineNumbers:commands.lineNumbers,height:Number.isNaN(+(commands.height||"_"))?commands.height:commands.height+"px"}):null},table:_ref9=>{let{children,className=""}=_ref9;(0,objectWithoutProperties.A)(_ref9,_excluded);return(0,jsx_runtime.jsx)("div",{style:{overflowX:"auto"},children:(0,jsx_runtime.jsx)("table",{children})})}}})),[Link]);return(0,jsx_runtime.jsx)("div",{className:"jk-md-math",children:(0,jsx_runtime.jsx)(lib.o,(0,objectSpread2.A)((0,objectSpread2.A)({},props),{},{children:source}))})}));try{MdMath.displayName="MdMath",MdMath.__docgenInfo={description:"",displayName:"MdMath",props:{source:{defaultValue:null,description:"",name:"source",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/mdMath/MdMathViewer/MdMath.tsx#MdMath"]={docgenInfo:MdMath.__docgenInfo,name:"MdMath",path:"src/components/organisms/mdMath/MdMathViewer/MdMath.tsx#MdMath"})}catch(__react_docgen_typescript_loader_error){}const MdMathViewer=(0,react.memo)((_ref=>{let{source,downloadButton,className}=_ref;return(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-md-math-viewer-layout",className),children:[(0,jsx_runtime.jsx)(MdFloatToolbar.z,{source,download:downloadButton}),(0,jsx_runtime.jsx)(MdMath,{source})]})}));try{MdMathViewer.displayName="MdMathViewer",MdMathViewer.__docgenInfo={description:"",displayName:"MdMathViewer",props:{source:{defaultValue:null,description:"",name:"source",required:!0,type:{name:"string"}},dark:{defaultValue:null,description:"",name:"dark",required:!1,type:{name:"boolean"}},downloadButton:{defaultValue:null,description:"",name:"downloadButton",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/organisms/mdMath/MdMathViewer/MdMathViewer.tsx#MdMathViewer"]={docgenInfo:MdMathViewer.__docgenInfo,name:"MdMathViewer",path:"src/components/organisms/mdMath/MdMathViewer/MdMathViewer.tsx#MdMathViewer"})}catch(__react_docgen_typescript_loader_error){}}}]);