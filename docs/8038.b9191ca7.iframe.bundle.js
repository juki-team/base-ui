"use strict";(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[8038],{"./node_modules/react-image-crop/dist/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$P:()=>D,Ay:()=>S,Et:()=>v,dS:()=>B,ge:()=>L});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_=Object.defineProperty,m=(a,h,e)=>((a,h,e)=>h in a?_(a,h,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[h]=e)(a,"symbol"!=typeof h?h+"":h,e);const E={x:0,y:0,width:0,height:0,unit:"px"},b=(a,h,e)=>Math.min(Math.max(a,h),e),X=(a,h)=>a===h||a.width===h.width&&a.height===h.height&&a.x===h.x&&a.y===h.y&&a.unit===h.unit;function B(a,h,e,n){const t=D(a,e,n);return a.width&&(t.height=t.width/h),a.height&&(t.width=t.height*h),t.y+t.height>n&&(t.height=n-t.y,t.width=t.height*h),t.x+t.width>e&&(t.width=e-t.x,t.height=t.width/h),"%"===a.unit?v(t,e,n):t}function L(a,h,e){const n=D(a,h,e);return n.x=(h-n.width)/2,n.y=(e-n.height)/2,"%"===a.unit?v(n,h,e):n}function v(a,h,e){return"%"===a.unit?{...E,...a,unit:"%"}:{unit:"%",x:a.x?a.x/h*100:0,y:a.y?a.y/e*100:0,width:a.width?a.width/h*100:0,height:a.height?a.height/e*100:0}}function D(a,h,e){return a.unit?"px"===a.unit?{...E,...a,unit:"px"}:{unit:"px",x:a.x?a.x*h/100:0,y:a.y?a.y*e/100:0,width:a.width?a.width*h/100:0,height:a.height?a.height*e/100:0}:{...E,...a,unit:"px"}}function k(a,h,e,n,t,d=0,r=0,o=n,w=t){const i={...a};let s=Math.min(d,n),c=Math.min(r,t),g=Math.min(o,n),p=Math.min(w,t);h&&(h>1?(s=r?r*h:s,c=s/h,g=o*h):(c=d?d/h:c,s=c*h,p=w/h)),i.y<0&&(i.height=Math.max(i.height+i.y,c),i.y=0),i.x<0&&(i.width=Math.max(i.width+i.x,s),i.x=0);const l=n-(i.x+i.width);l<0&&(i.x=Math.min(i.x,n-s),i.width+=l);const C=t-(i.y+i.height);if(C<0&&(i.y=Math.min(i.y,t-c),i.height+=C),i.width<s&&(("sw"===e||"nw"==e)&&(i.x-=s-i.width),i.width=s),i.height<c&&(("nw"===e||"ne"==e)&&(i.y-=c-i.height),i.height=c),i.width>g&&(("sw"===e||"nw"==e)&&(i.x-=g-i.width),i.width=g),i.height>p&&(("nw"===e||"ne"==e)&&(i.y-=p-i.height),i.height=p),h){const y=i.width/i.height;if(y<h){const f=Math.max(i.width/h,c);("nw"===e||"ne"==e)&&(i.y-=f-i.height),i.height=f}else if(y>h){const f=Math.max(i.height*h,s);("sw"===e||"nw"==e)&&(i.x-=f-i.width),i.width=f}}return i}const M={capture:!0,passive:!1};let N=0;const x=class x extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent{constructor(){super(...arguments),m(this,"docMoveBound",!1),m(this,"mouseDownOnCrop",!1),m(this,"dragStarted",!1),m(this,"evData",{startClientX:0,startClientY:0,startCropX:0,startCropY:0,clientX:0,clientY:0,isResize:!0}),m(this,"componentRef",(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)()),m(this,"mediaRef",(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)()),m(this,"resizeObserver"),m(this,"initChangeCalled",!1),m(this,"instanceId","rc-"+N++),m(this,"state",{cropIsActive:!1,newCropIsBeingDrawn:!1}),m(this,"onCropPointerDown",(e=>{const{crop:n,disabled:t}=this.props,d=this.getBox();if(!n)return;const r=D(n,d.width,d.height);if(t)return;e.cancelable&&e.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const o=e.target.dataset.ord,w=!!o;let i=e.clientX,s=e.clientY,c=r.x,g=r.y;if(o){const p=e.clientX-d.x,l=e.clientY-d.y;let C=0,y=0;"ne"===o||"e"==o?(C=p-(r.x+r.width),y=l-r.y,c=r.x,g=r.y+r.height):"se"===o||"s"===o?(C=p-(r.x+r.width),y=l-(r.y+r.height),c=r.x,g=r.y):"sw"===o||"w"==o?(C=p-r.x,y=l-(r.y+r.height),c=r.x+r.width,g=r.y):("nw"===o||"n"==o)&&(C=p-r.x,y=l-r.y,c=r.x+r.width,g=r.y+r.height),i=c+d.x+C,s=g+d.y+y}this.evData={startClientX:i,startClientY:s,startCropX:c,startCropY:g,clientX:e.clientX,clientY:e.clientY,isResize:w,ord:o},this.mouseDownOnCrop=!0,this.setState({cropIsActive:!0})})),m(this,"onComponentPointerDown",(e=>{const{crop:n,disabled:t,locked:d,keepSelection:r,onChange:o}=this.props,w=this.getBox();if(t||d||r&&n)return;e.cancelable&&e.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const i=e.clientX-w.x,s=e.clientY-w.y,c={unit:"px",x:i,y:s,width:0,height:0};this.evData={startClientX:e.clientX,startClientY:e.clientY,startCropX:i,startCropY:s,clientX:e.clientX,clientY:e.clientY,isResize:!0},this.mouseDownOnCrop=!0,o(D(c,w.width,w.height),v(c,w.width,w.height)),this.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})})),m(this,"onDocPointerMove",(e=>{const{crop:n,disabled:t,onChange:d,onDragStart:r}=this.props,o=this.getBox();if(t||!n||!this.mouseDownOnCrop)return;e.cancelable&&e.preventDefault(),this.dragStarted||(this.dragStarted=!0,r&&r(e));const{evData:w}=this;let i;w.clientX=e.clientX,w.clientY=e.clientY,i=w.isResize?this.resizeCrop():this.dragCrop(),X(n,i)||d(D(i,o.width,o.height),v(i,o.width,o.height))})),m(this,"onComponentKeyDown",(e=>{const{crop:n,disabled:t,onChange:d,onComplete:r}=this.props;if(t)return;const o=e.key;let w=!1;if(!n)return;const i=this.getBox(),s=this.makePixelCrop(i),g=(navigator.platform.match("Mac")?e.metaKey:e.ctrlKey)?x.nudgeStepLarge:e.shiftKey?x.nudgeStepMedium:x.nudgeStep;if("ArrowLeft"===o?(s.x-=g,w=!0):"ArrowRight"===o?(s.x+=g,w=!0):"ArrowUp"===o?(s.y-=g,w=!0):"ArrowDown"===o&&(s.y+=g,w=!0),w){e.cancelable&&e.preventDefault(),s.x=b(s.x,0,i.width-s.width),s.y=b(s.y,0,i.height-s.height);const p=D(s,i.width,i.height),l=v(s,i.width,i.height);d(p,l),r&&r(p,l)}})),m(this,"onHandlerKeyDown",((e,n)=>{const{aspect:t=0,crop:d,disabled:r,minWidth:o=0,minHeight:w=0,maxWidth:i,maxHeight:s,onChange:c,onComplete:g}=this.props,p=this.getBox();if(r||!d)return;if("ArrowUp"!==e.key&&"ArrowDown"!==e.key&&"ArrowLeft"!==e.key&&"ArrowRight"!==e.key)return;e.stopPropagation(),e.preventDefault();const C=(navigator.platform.match("Mac")?e.metaKey:e.ctrlKey)?x.nudgeStepLarge:e.shiftKey?x.nudgeStepMedium:x.nudgeStep,f=function I(a,h,e,n){const t={...a};return"ArrowLeft"===h?"nw"===n?(t.x-=e,t.y-=e,t.width+=e,t.height+=e):"w"===n?(t.x-=e,t.width+=e):"sw"===n?(t.x-=e,t.width+=e,t.height+=e):"ne"===n?(t.y+=e,t.width-=e,t.height-=e):"e"===n?t.width-=e:"se"===n&&(t.width-=e,t.height-=e):"ArrowRight"===h&&("nw"===n?(t.x+=e,t.y+=e,t.width-=e,t.height-=e):"w"===n?(t.x+=e,t.width-=e):"sw"===n?(t.x+=e,t.width-=e,t.height-=e):"ne"===n?(t.y-=e,t.width+=e,t.height+=e):"e"===n?t.width+=e:"se"===n&&(t.width+=e,t.height+=e)),"ArrowUp"===h?"nw"===n?(t.x-=e,t.y-=e,t.width+=e,t.height+=e):"n"===n?(t.y-=e,t.height+=e):"ne"===n?(t.y-=e,t.width+=e,t.height+=e):"sw"===n?(t.x+=e,t.width-=e,t.height-=e):"s"===n?t.height-=e:"se"===n&&(t.width-=e,t.height-=e):"ArrowDown"===h&&("nw"===n?(t.x+=e,t.y+=e,t.width-=e,t.height-=e):"n"===n?(t.y+=e,t.height-=e):"ne"===n?(t.y+=e,t.width-=e,t.height-=e):"sw"===n?(t.x-=e,t.width+=e,t.height+=e):"s"===n?t.height+=e:"se"===n&&(t.width+=e,t.height+=e)),t}(D(d,p.width,p.height),e.key,C,n),R=k(f,t,n,p.width,p.height,o,w,i,s);if(!X(d,R)){const Y=v(R,p.width,p.height);c(R,Y),g&&g(R,Y)}})),m(this,"onDocPointerDone",(e=>{const{crop:n,disabled:t,onComplete:d,onDragEnd:r}=this.props,o=this.getBox();this.unbindDocMove(),!t&&n&&this.mouseDownOnCrop&&(this.mouseDownOnCrop=!1,this.dragStarted=!1,r&&r(e),d&&d(D(n,o.width,o.height),v(n,o.width,o.height)),this.setState({cropIsActive:!1,newCropIsBeingDrawn:!1}))})),m(this,"onDragFocus",(()=>{var e;null==(e=this.componentRef.current)||e.scrollTo(0,0)}))}get document(){return document}getBox(){const e=this.mediaRef.current;if(!e)return{x:0,y:0,width:0,height:0};const{x:n,y:t,width:d,height:r}=e.getBoundingClientRect();return{x:n,y:t,width:d,height:r}}componentDidUpdate(e){const{crop:n,onComplete:t}=this.props;if(t&&!e.crop&&n){const{width:d,height:r}=this.getBox();d&&r&&t(D(n,d,r),v(n,d,r))}}componentWillUnmount(){this.resizeObserver&&this.resizeObserver.disconnect(),this.unbindDocMove()}bindDocMove(){this.docMoveBound||(this.document.addEventListener("pointermove",this.onDocPointerMove,M),this.document.addEventListener("pointerup",this.onDocPointerDone,M),this.document.addEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!0)}unbindDocMove(){this.docMoveBound&&(this.document.removeEventListener("pointermove",this.onDocPointerMove,M),this.document.removeEventListener("pointerup",this.onDocPointerDone,M),this.document.removeEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!1)}getCropStyle(){const{crop:e}=this.props;if(e)return{top:`${e.y}${e.unit}`,left:`${e.x}${e.unit}`,width:`${e.width}${e.unit}`,height:`${e.height}${e.unit}`}}dragCrop(){const{evData:e}=this,n=this.getBox(),t=this.makePixelCrop(n),d=e.clientX-e.startClientX,r=e.clientY-e.startClientY;return t.x=b(e.startCropX+d,0,n.width-t.width),t.y=b(e.startCropY+r,0,n.height-t.height),t}getPointRegion(e,n,t,d){const{evData:r}=this,o=r.clientX-e.x,w=r.clientY-e.y;let i,s;return i=d&&n?"nw"===n||"n"===n||"ne"===n:w<r.startCropY,s=t&&n?"nw"===n||"w"===n||"sw"===n:o<r.startCropX,s?i?"nw":"sw":i?"ne":"se"}resolveMinDimensions(e,n,t=0,d=0){const r=Math.min(t,e.width),o=Math.min(d,e.height);return n&&(r||o)?n>1?r?[r,r/n]:[o*n,o]:o?[o*n,o]:[r,r/n]:[r,o]}resizeCrop(){const{evData:e}=this,{aspect:n=0,maxWidth:t,maxHeight:d}=this.props,r=this.getBox(),[o,w]=this.resolveMinDimensions(r,n,this.props.minWidth,this.props.minHeight);let i=this.makePixelCrop(r);const s=this.getPointRegion(r,e.ord,o,w),c=e.ord||s;let g=e.clientX-e.startClientX,p=e.clientY-e.startClientY;(o&&"nw"===c||"w"===c||"sw"===c)&&(g=Math.min(g,-o)),(w&&"nw"===c||"n"===c||"ne"===c)&&(p=Math.min(p,-w));const l={unit:"px",x:0,y:0,width:0,height:0};"ne"===s?(l.x=e.startCropX,l.width=g,n?(l.height=l.width/n,l.y=e.startCropY-l.height):(l.height=Math.abs(p),l.y=e.startCropY-l.height)):"se"===s?(l.x=e.startCropX,l.y=e.startCropY,l.width=g,l.height=n?l.width/n:p):"sw"===s?(l.x=e.startCropX+g,l.y=e.startCropY,l.width=Math.abs(g),l.height=n?l.width/n:p):"nw"===s&&(l.x=e.startCropX+g,l.width=Math.abs(g),n?(l.height=l.width/n,l.y=e.startCropY-l.height):(l.height=Math.abs(p),l.y=e.startCropY+p));const C=k(l,n,s,r.width,r.height,o,w,t,d);return n||x.xyOrds.indexOf(c)>-1?i=C:x.xOrds.indexOf(c)>-1?(i.x=C.x,i.width=C.width):x.yOrds.indexOf(c)>-1&&(i.y=C.y,i.height=C.height),i.x=b(i.x,0,r.width-i.width),i.y=b(i.y,0,r.height-i.height),i}renderCropSelection(){const{ariaLabels:e=x.defaultProps.ariaLabels,disabled:n,locked:t,renderSelectionAddon:d,ruleOfThirds:r,crop:o}=this.props,w=this.getCropStyle();if(o)return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:w,className:"ReactCrop__crop-selection",onPointerDown:this.onCropPointerDown,"aria-label":e.cropArea,tabIndex:0,onKeyDown:this.onComponentKeyDown,role:"group"},!n&&!t&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-elements",onFocus:this.onDragFocus},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw",tabIndex:0,"aria-label":e.nwDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"nw"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n",tabIndex:0,"aria-label":e.nDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"n"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne",tabIndex:0,"aria-label":e.neDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"ne"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e",tabIndex:0,"aria-label":e.eDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"e"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se",tabIndex:0,"aria-label":e.seDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"se"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s",tabIndex:0,"aria-label":e.sDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"s"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw",tabIndex:0,"aria-label":e.swDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"sw"),role:"button"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w",tabIndex:0,"aria-label":e.wDragHandle,onKeyDown:i=>this.onHandlerKeyDown(i,"w"),role:"button"})),d&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__selection-addon",onPointerDown:i=>i.stopPropagation()},d(this.state)),r&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}makePixelCrop(e){return D({...E,...this.props.crop||{}},e.width,e.height)}render(){const{aspect:e,children:n,circularCrop:t,className:d,crop:r,disabled:o,locked:w,style:i,ruleOfThirds:s}=this.props,{cropIsActive:c,newCropIsBeingDrawn:g}=this.state,p=r?this.renderCropSelection():null,l=((...a)=>a.filter((h=>h&&"string"==typeof h)).join(" "))("ReactCrop",d,c&&"ReactCrop--active",o&&"ReactCrop--disabled",w&&"ReactCrop--locked",g&&"ReactCrop--new-crop",r&&e&&"ReactCrop--fixed-aspect",r&&t&&"ReactCrop--circular-crop",r&&s&&"ReactCrop--rule-of-thirds",!this.dragStarted&&r&&!r.width&&!r.height&&"ReactCrop--invisible-crop",t&&"ReactCrop--no-animate");return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:this.componentRef,className:l,style:i},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:this.mediaRef,className:"ReactCrop__child-wrapper",onPointerDown:this.onComponentPointerDown},n),r?react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{className:"ReactCrop__crop-mask",width:"100%",height:"100%"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs",null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask",{id:`hole-${this.instanceId}`},react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect",{width:"100%",height:"100%",fill:"white"}),t?react__WEBPACK_IMPORTED_MODULE_0__.createElement("ellipse",{cx:`${r.x+r.width/2}${r.unit}`,cy:`${r.y+r.height/2}${r.unit}`,rx:`${r.width/2}${r.unit}`,ry:`${r.height/2}${r.unit}`,fill:"black"}):react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect",{x:`${r.x}${r.unit}`,y:`${r.y}${r.unit}`,width:`${r.width}${r.unit}`,height:`${r.height}${r.unit}`,fill:"black"}))),react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect",{fill:"black",fillOpacity:.5,width:"100%",height:"100%",mask:`url(#hole-${this.instanceId})`})):void 0,p)}};m(x,"xOrds",["e","w"]),m(x,"yOrds",["n","s"]),m(x,"xyOrds",["nw","ne","se","sw"]),m(x,"nudgeStep",1),m(x,"nudgeStepMedium",10),m(x,"nudgeStepLarge",100),m(x,"defaultProps",{ariaLabels:{cropArea:"Use the arrow keys to move the crop selection area",nwDragHandle:"Use the arrow keys to move the north west drag handle to change the crop selection area",nDragHandle:"Use the up and down arrow keys to move the north drag handle to change the crop selection area",neDragHandle:"Use the arrow keys to move the north east drag handle to change the crop selection area",eDragHandle:"Use the up and down arrow keys to move the east drag handle to change the crop selection area",seDragHandle:"Use the arrow keys to move the south east drag handle to change the crop selection area",sDragHandle:"Use the up and down arrow keys to move the south drag handle to change the crop selection area",swDragHandle:"Use the arrow keys to move the south west drag handle to change the crop selection area",wDragHandle:"Use the up and down arrow keys to move the west drag handle to change the crop selection area"}});let S=x}}]);