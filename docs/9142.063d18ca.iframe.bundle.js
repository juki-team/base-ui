"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9142],{"./src/components/molecules/ImageLoaderCropper/ImageLoaderCropper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ImageLoaderCropper:()=>ImageLoaderCropper});var react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-image-crop/dist/index.js"),hooks=__webpack_require__("./src/hooks/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts");const TO_RADIANS=Math.PI/180;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function centerAspectCrop(mediaWidth,mediaHeight,aspect){return(0,dist.ge)((0,dist.dS)({unit:"%",width:90},aspect,mediaWidth,mediaHeight),mediaWidth,mediaHeight)}const ImageLoaderCropper=props=>{const{defaultCrop,onCropChange,aspect:initialAspect,scale:initialScale,rotate:initialRotate,circularCrop,withAspect,withRotate,withScale}=props,[imgSrc,setImgSrc]=(0,react.useState)(""),previewCanvasRef=(0,react.useRef)(null),imgRef=(0,react.useRef)(null),[crop,setCrop]=(0,react.useState)(defaultCrop),[completedCrop,setCompletedCrop]=(0,react.useState)(),[scale,setScale]=(0,hooks.Xk)(1,initialScale),[rotate,setRotate]=(0,hooks.Xk)(0,initialRotate),[aspect,setAspect]=(0,react.useState)(initialAspect||void 0),[aspectText,setAspectText]=(0,react.useState)((aspect||"")+""),updateAspect=aspect=>{if(aspect){if(imgRef.current){const{width,height}=imgRef.current;setAspect(aspect);const crop=centerAspectCrop(width,height,aspect);setCrop(crop),setCompletedCrop((0,dist.$P)(crop,width,height))}}else setAspect(void 0)};return(0,react.useEffect)((()=>{updateAspect(initialAspect),setAspectText((initialAspect||"")+"")}),[initialAspect]),(0,react.useEffect)((()=>updateAspect(aspect)),[aspect]),(0,hooks.Wj)((async()=>{null!=completedCrop&&completedCrop.width&&null!=completedCrop&&completedCrop.height&&imgRef.current&&previewCanvasRef.current&&await async function canvasPreview(image,canvas,crop){let scale=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,rotate=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("No 2d context");const scaleX=image.naturalWidth/image.width,scaleY=image.naturalHeight/image.height,pixelRatio=window.devicePixelRatio;canvas.width=Math.floor(crop.width*scaleX*pixelRatio),canvas.height=Math.floor(crop.height*scaleY*pixelRatio),ctx.scale(pixelRatio,pixelRatio),ctx.imageSmoothingQuality="high";const cropX=crop.x*scaleX,cropY=crop.y*scaleY,rotateRads=rotate*TO_RADIANS,centerX=image.naturalWidth/2,centerY=image.naturalHeight/2;ctx.save(),ctx.translate(-cropX,-cropY),ctx.translate(centerX,centerY),ctx.rotate(rotateRads),ctx.scale(scale,scale),ctx.translate(-centerX,-centerY),ctx.drawImage(image,0,0,image.naturalWidth,image.naturalHeight,0,0,image.naturalWidth,image.naturalHeight),ctx.globalCompositeOperation="destination-in",ctx.beginPath(),ctx.restore()}(imgRef.current,previewCanvasRef.current,completedCrop,scale,rotate)}),100,[completedCrop,scale,rotate]),(0,react.useEffect)((()=>{if(previewCanvasRef.current&&completedCrop&&imgRef.current){const{width,height}=imgRef.current;null==onCropChange||onCropChange({percentCrop:(0,dist.Et)(completedCrop,width,height),pixelCrop:completedCrop,previewCanvasRef,scale,rotate,circularCrop:!!circularCrop,aspect})}}),[completedCrop,scale,rotate,onCropChange,circularCrop,aspect]),(0,jsx_runtime.jsxs)("div",{className:"image-loader-cropper-layout jk-col gap",children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row space-between gap nowrap",children:[(0,jsx_runtime.jsx)(atoms.pde,{type:"file",accept:"image/*",onChange:function onSelectFile(files){if((null==files?void 0:files.length)>0){setCrop(void 0);const reader=new FileReader;reader.addEventListener("load",(()=>{var _reader$result;return setImgSrc((null===(_reader$result=reader.result)||void 0===_reader$result?void 0:_reader$result.toString())||"")})),reader.readAsDataURL(files[0])}}}),withScale&&(0,jsx_runtime.jsx)(atoms.pde,{labelPlacement:"left",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"scale"}),type:"number",step:.1,value:scale,disabled:!imgSrc,size:"auto",onChange:setScale}),withRotate&&(0,jsx_runtime.jsx)(atoms.pde,{labelPlacement:"left",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"rotate"}),type:"number",value:rotate,disabled:!imgSrc,size:"auto",onChange:value=>setRotate(Math.min(180,Math.max(-180,value)))}),withAspect&&(0,jsx_runtime.jsx)(atoms.pde,{labelPlacement:"left",label:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"aspect"}),type:"text",value:aspectText,disabled:!imgSrc,size:"auto",onChange:value=>{setAspectText(value);const values=null==value?void 0:value.split("/"),aspect=+values[0]/+(values[1]||1);Number.isNaN(aspect)||setAspect(aspect)}})]}),Boolean(imgSrc)&&(0,jsx_runtime.jsx)(dist.Ay,{crop,onChange:(_,percentCrop)=>setCrop(percentCrop),onComplete:c=>setCompletedCrop(c),aspect,circularCrop,children:(0,jsx_runtime.jsx)("img",{ref:imgRef,alt:"Crop me",src:imgSrc,style:{transform:"scale(".concat(scale,") rotate(").concat(rotate,"deg)")},onLoad:function onImageLoad(e){const{width,height}=e.currentTarget;setCrop(aspect?centerAspectCrop(width,height,aspect):{width:100,height:100,y:0,x:0,unit:"%"})}})}),(0,jsx_runtime.jsx)("div",{style:{display:"none"},children:!!completedCrop&&(0,jsx_runtime.jsx)("canvas",{ref:previewCanvasRef})})]})};try{ImageLoaderCropper.displayName="ImageLoaderCropper",ImageLoaderCropper.__docgenInfo={description:"",displayName:"ImageLoaderCropper",props:{onCropChange:{defaultValue:null,description:"",name:"onCropChange",required:!1,type:{name:"((props: CropImageType) => void)"}},defaultCrop:{defaultValue:null,description:"",name:"defaultCrop",required:!1,type:{name:"Crop"}},scale:{defaultValue:null,description:"",name:"scale",required:!1,type:{name:"number"}},rotate:{defaultValue:null,description:"",name:"rotate",required:!1,type:{name:"number"}},aspect:{defaultValue:null,description:"",name:"aspect",required:!1,type:{name:"number"}},circularCrop:{defaultValue:null,description:"",name:"circularCrop",required:!1,type:{name:"boolean"}},withScale:{defaultValue:null,description:"",name:"withScale",required:!1,type:{name:"boolean"}},withRotate:{defaultValue:null,description:"",name:"withRotate",required:!1,type:{name:"boolean"}},withAspect:{defaultValue:null,description:"",name:"withAspect",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/ImageLoaderCropper/ImageLoaderCropper.tsx#ImageLoaderCropper"]={docgenInfo:ImageLoaderCropper.__docgenInfo,name:"ImageLoaderCropper",path:"src/components/molecules/ImageLoaderCropper/ImageLoaderCropper.tsx#ImageLoaderCropper"})}catch(__react_docgen_typescript_loader_error){}}}]);