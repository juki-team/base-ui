"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[488],{"./src/components/templates/EditProfileModal/EditProfileModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EditProfileModal:()=>EditProfileModal});var esm=__webpack_require__("./node_modules/@juki-team/commons/dist/esm/index.js"),react=__webpack_require__("./node_modules/react/index.js"),constants=__webpack_require__("./src/constants/index.ts"),helpers=__webpack_require__("./src/helpers/index.ts"),hooks=__webpack_require__("./src/hooks/index.ts"),atoms=__webpack_require__("./src/components/atoms/index.ts"),molecules=__webpack_require__("./src/components/molecules/index.ts"),config=__webpack_require__("./src/config/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageProfileModal=_ref=>{let{isOpen,onClose,nickname}=_ref;const{updateUserProfileImage,mutatePing}=(0,hooks.Mg)(),{mutate}=(0,hooks.Cu)(),[cropImage,setCropImage]=(0,react.useState)();return(0,jsx_runtime.jsx)(atoms.aFV,{onClose,isOpen,children:(0,jsx_runtime.jsxs)("div",{className:"jk-pg-lg jk-col gap",children:[(0,jsx_runtime.jsx)(molecules.MI,{aspect:1,onCropChange:setCropImage,rotate:0,scale:1,withRotate:!0,withScale:!0,circularCrop:!0}),(0,jsx_runtime.jsxs)("div",{className:"jk-row right gap extend",children:[(0,jsx_runtime.jsx)(atoms.$nd,{type:"light",onClick:onClose,children:(0,jsx_runtime.jsx)(atoms.T,{children:"cancel"})}),(0,jsx_runtime.jsx)(molecules.mT,{onClick:async setLoader=>{if(null!=cropImage&&cropImage.previewCanvasRef.current){const blob=await(0,helpers.ZR)(cropImage.previewCanvasRef.current);if(blob){const formData=new FormData;formData.append("image",blob),await updateUserProfileImage({params:{nickname},body:formData,onSuccess:async()=>{null==setLoader||setLoader(esm.nW.LOADING),await mutatePing(),await mutate(config.J.API.user.getProfile({params:{nickname}}).url),null==setLoader||setLoader(esm.nW.SUCCESS),onClose()}})}}},disabled:!cropImage||!(null!=cropImage&&cropImage.previewCanvasRef.current),children:(0,jsx_runtime.jsx)(atoms.T,{children:"save image"})})]})]})})};try{ImageProfileModal.displayName="ImageProfileModal",ImageProfileModal.__docgenInfo={description:"",displayName:"ImageProfileModal",props:{nickname:{defaultValue:null,description:"",name:"nickname",required:!0,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/EditProfileModal/ImageProfileModal.tsx#ImageProfileModal"]={docgenInfo:ImageProfileModal.__docgenInfo,name:"ImageProfileModal",path:"src/components/templates/EditProfileModal/ImageProfileModal.tsx#ImageProfileModal"})}catch(__react_docgen_typescript_loader_error){}const JudgeInput=_ref=>{var _user$handles;let{judge:{value,label,logo,url,logoSize},user,setUser}=_ref;const{components:{Image}}=(0,hooks.p1)(),height1=32/logoSize[0]*logoSize[1],height2=24/logoSize[1]*logoSize[0];let height,width;return Math.max(height1,32)>Math.max(height2,24)?(height=height2,width=24):(height=height1,width=32),(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(Image,{src:logo,alt:label,height,width}),(0,jsx_runtime.jsx)("span",{children:label})]}),labelPlacement:"top",onChange:nickname=>setUser({...user,handles:{...user.handles||{},[value]:nickname}}),value:null==user||null===(_user$handles=user.handles)||void 0===_user$handles?void 0:_user$handles[value]})},value)};function EditProfileModal(_ref2){let{user,isOpen,onClose,onSuccess}=_ref2;const[userState,setUserState]=(0,react.useState)(user),{updateUserProfileData}=(0,hooks.Mg)(),{components:{Image}}=(0,hooks.p1)(),loadingRef=(0,react.useRef)(!1);(0,hooks.sp)(user,isOpen&&!loadingRef.current);const[modalImageProfile,setModalImageProfile]=(0,react.useState)(!1),validLengthNickname=userState.nickname.length>=3&&userState.nickname.length<=32,validCharNickname=constants.cl.test(userState.nickname);return(0,jsx_runtime.jsx)(atoms.aFV,{isOpen,onClose,children:(0,jsx_runtime.jsxs)("div",{className:"user-profile jk-row stretch center gap jk-pg-md pn-re",children:[(0,jsx_runtime.jsx)(ImageProfileModal,{onClose:()=>setModalImageProfile(!1),nickname:user.nickname,isOpen:modalImageProfile}),(0,jsx_runtime.jsxs)("div",{className:"jk-col top jk-pg-md",children:[(0,jsx_runtime.jsx)(Image,{width:48,height:48,src:null==user?void 0:user.imageUrl,className:"jk-user-profile-img huge elevation-1",alt:null==user?void 0:user.nickname}),(0,jsx_runtime.jsx)(atoms.qUP,{onClick:()=>setModalImageProfile(!0)})]}),(0,jsx_runtime.jsxs)("div",{className:(0,helpers.xW)("jk-col top stretch left jk-pg-md gap"),children:[(0,jsx_runtime.jsxs)("div",{className:"jk-form-item",children:[(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.nXn,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"nickname"})]}),labelPlacement:"top",onChange:nickname=>setUserState({...userState,nickname}),value:userState.nickname}),(0,jsx_runtime.jsx)("p",{children:validLengthNickname?!validCharNickname&&(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"only alphanumeric characters or dash or underscore is valid"}):(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"must be at least 3 characters and must be less than 32 characters"})})]}),(0,jsx_runtime.jsxs)("div",{className:"jk-row gap",children:[(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.nXn,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"given name"})]}),labelPlacement:"top",onChange:givenName=>setUserState({...userState,givenName}),value:userState.givenName})}),(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.nXn,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"family name"})]}),labelPlacement:"top",onChange:familyName=>setUserState({...userState,familyName}),value:userState.familyName})})]}),(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.nXn,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"about me"})]}),(0,jsx_runtime.jsx)(atoms.fs1,{onChange:aboutMe=>setUserState({...userState,aboutMe}),value:userState.aboutMe})]})}),(0,jsx_runtime.jsxs)("div",{className:"jk-row gap",children:[(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.PMR,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"country"})]}),labelPlacement:"top",onChange:country=>setUserState({...userState,country}),value:userState.country})}),(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.Sfg,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"city"})]}),labelPlacement:"top",onChange:city=>setUserState({...userState,city}),value:userState.city})})]}),(0,jsx_runtime.jsx)("div",{className:"jk-form-item",children:(0,jsx_runtime.jsx)(atoms.pde,{label:(0,jsx_runtime.jsxs)("div",{className:"jk-row left gap",children:[(0,jsx_runtime.jsx)(atoms.wPO,{size:"small"}),(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"institution"})]}),labelPlacement:"top",onChange:institution=>setUserState({...userState,institution}),value:userState.institution})}),(0,jsx_runtime.jsx)("div",{className:"fw-bd",children:(0,jsx_runtime.jsx)(atoms.T,{className:"tt-se",children:"nicknames from other judges"})}),[[esm.Ih.CODEFORCES,esm.Ih.CODEFORCES_GYM],[esm.Ih.UVA_ONLINE_JUDGE,esm.Ih.CODECHEF],[esm.Ih.AT_CODER,esm.Ih.TOPCODER],[esm.Ih.JV_UMSA,esm.Ih.JUKI_JUDGE]].map((_ref3=>{let[judge1,judge2]=_ref3;return(0,jsx_runtime.jsxs)("div",{className:"jk-row gap block",children:[(0,jsx_runtime.jsx)(JudgeInput,{judge:esm.aQ[judge1],user:userState,setUser:setUserState}),esm.aQ[judge2]?(0,jsx_runtime.jsx)(JudgeInput,{judge:esm.aQ[judge2],user:userState,setUser:setUserState}):(0,jsx_runtime.jsx)("div",{className:"jk-form-item"})]},`${judge1}-${judge2}`)}))]}),(0,jsx_runtime.jsxs)("div",{className:"jk-row gap extend right",children:[(0,jsx_runtime.jsx)(atoms.$nd,{type:"light",onClick:onClose,children:(0,jsx_runtime.jsx)(atoms.T,{children:"cancel"})}),(0,jsx_runtime.jsx)(molecules.mT,{disabled:!validLengthNickname||!validCharNickname,onClick:setLoader=>{const body={nickname:userState.nickname,givenName:userState.givenName,familyName:userState.familyName,aboutMe:userState.aboutMe,country:userState.country,city:userState.city,institution:userState.institution,handles:userState.handles};updateUserProfileData({params:{nickname:user.nickname},body,setLoader,onSuccess:async response=>{loadingRef.current=!0,null==setLoader||setLoader(esm.nW.LOADING),await(null==onSuccess?void 0:onSuccess({body,response})),null==setLoader||setLoader(esm.nW.SUCCESS),loadingRef.current=!1,onClose()}})},children:(0,jsx_runtime.jsx)(atoms.T,{children:"update"})})]})]})})}try{EditProfileModal.displayName="EditProfileModal",EditProfileModal.__docgenInfo={description:"",displayName:"EditProfileModal",props:{user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:"UserProfileResponseDTO"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},onSuccess:{defaultValue:null,description:"",name:"onSuccess",required:!1,type:{name:"((props: { body: UpdateUserProfileDataPayloadDTO; response: ContentResponseType<string>; }) => Promise<void> | (() => void))"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/templates/EditProfileModal/EditProfileModal.tsx#EditProfileModal"]={docgenInfo:EditProfileModal.__docgenInfo,name:"EditProfileModal",path:"src/components/templates/EditProfileModal/EditProfileModal.tsx#EditProfileModal"})}catch(__react_docgen_typescript_loader_error){}}}]);