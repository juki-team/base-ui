(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[5518],{"./node_modules/react-device-detect/dist/lib.js":function(__unused_webpack_module,exports,__webpack_require__){"use strict";var React=__webpack_require__("./node_modules/react/index.js"),React__default=function _interopDefault(ex){return ex&&"object"==typeof ex&&"default"in ex?ex.default:ex}(React),UAParser=__webpack_require__("./node_modules/ua-parser-js/dist/ua-parser.min.js"),ClientUAInstance=new UAParser,browser=ClientUAInstance.getBrowser(),cpu=ClientUAInstance.getCPU(),device=ClientUAInstance.getDevice(),engine=ClientUAInstance.getEngine(),os=ClientUAInstance.getOS(),ua=ClientUAInstance.getUA(),setUa=function setUa(userAgentString){return ClientUAInstance.setUA(userAgentString)},parseUserAgent=function parseUserAgent(userAgent){if(userAgent){var UserAgentInstance=new UAParser(userAgent);return{UA:UserAgentInstance,browser:UserAgentInstance.getBrowser(),cpu:UserAgentInstance.getCPU(),device:UserAgentInstance.getDevice(),engine:UserAgentInstance.getEngine(),os:UserAgentInstance.getOS(),ua:UserAgentInstance.getUA(),setUserAgent:function setUserAgent(userAgentString){return UserAgentInstance.setUA(userAgentString)}}}console.error("No userAgent string was provided")},UAHelper=Object.freeze({ClientUAInstance:ClientUAInstance,browser:browser,cpu:cpu,device:device,engine:engine,os:os,ua:ua,setUa:setUa,parseUserAgent:parseUserAgent});function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _extends(){return _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var DeviceTypes_Mobile="mobile",DeviceTypes_Tablet="tablet",DeviceTypes_SmartTv="smarttv",DeviceTypes_Console="console",DeviceTypes_Wearable="wearable",DeviceTypes_Embedded="embedded",DeviceTypes_Browser=void 0,BrowserTypes={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},OsTypes={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},InitialDeviceTypes={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},setDefaults=function setDefaults(p){return p||(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none")},getNavigatorInstance=function getNavigatorInstance(){return!("undefined"==typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},isIOS13Check=function isIOS13Check(type){var nav=getNavigatorInstance();return nav&&nav.platform&&(-1!==nav.platform.indexOf(type)||"MacIntel"===nav.platform&&nav.maxTouchPoints>1&&!window.MSStream)},mobilePayload=function mobilePayload(type,device,os,ua){return function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},type,{vendor:setDefaults(device.vendor),model:setDefaults(device.model),os:setDefaults(os.name),osVersion:setDefaults(os.version),ua:setDefaults(ua)})};var isMobileType=function isMobileType(_ref){return _ref.type===DeviceTypes_Mobile},isTabletType=function isTabletType(_ref2){return _ref2.type===DeviceTypes_Tablet},isMobileAndTabletType=function isMobileAndTabletType(_ref3){var type=_ref3.type;return type===DeviceTypes_Mobile||type===DeviceTypes_Tablet},isSmartTVType=function isSmartTVType(_ref4){return _ref4.type===DeviceTypes_SmartTv},isBrowserType=function isBrowserType(_ref5){return _ref5.type===DeviceTypes_Browser},isWearableType=function isWearableType(_ref6){return _ref6.type===DeviceTypes_Wearable},isConsoleType=function isConsoleType(_ref7){return _ref7.type===DeviceTypes_Console},isEmbeddedType=function isEmbeddedType(_ref8){return _ref8.type===DeviceTypes_Embedded},getMobileVendor=function getMobileVendor(_ref9){var vendor=_ref9.vendor;return setDefaults(vendor)},getMobileModel=function getMobileModel(_ref10){var model=_ref10.model;return setDefaults(model)},getDeviceType=function getDeviceType(_ref11){var type=_ref11.type;return setDefaults(type,"browser")},isAndroidType=function isAndroidType(_ref12){return _ref12.name===OsTypes.Android},isWindowsType=function isWindowsType(_ref13){return _ref13.name===OsTypes.Windows},isMacOsType=function isMacOsType(_ref14){return _ref14.name===OsTypes.MAC_OS},isWinPhoneType=function isWinPhoneType(_ref15){return _ref15.name===OsTypes.WindowsPhone},isIOSType=function isIOSType(_ref16){return _ref16.name===OsTypes.IOS},getOsVersion=function getOsVersion(_ref17){var version=_ref17.version;return setDefaults(version)},getOsName=function getOsName(_ref18){var name=_ref18.name;return setDefaults(name)},isChromeType=function isChromeType(_ref19){return _ref19.name===BrowserTypes.Chrome},isFirefoxType=function isFirefoxType(_ref20){return _ref20.name===BrowserTypes.Firefox},isChromiumType=function isChromiumType(_ref21){return _ref21.name===BrowserTypes.Chromium},isEdgeType=function isEdgeType(_ref22){return _ref22.name===BrowserTypes.Edge},isYandexType=function isYandexType(_ref23){return _ref23.name===BrowserTypes.Yandex},isSafariType=function isSafariType(_ref24){var name=_ref24.name;return name===BrowserTypes.Safari||name===BrowserTypes.MobileSafari},isMobileSafariType=function isMobileSafariType(_ref25){return _ref25.name===BrowserTypes.MobileSafari},isOperaType=function isOperaType(_ref26){return _ref26.name===BrowserTypes.Opera},isIEType=function isIEType(_ref27){var name=_ref27.name;return name===BrowserTypes.InternetExplorer||name===BrowserTypes.Ie},isMIUIType=function isMIUIType(_ref28){return _ref28.name===BrowserTypes.MIUI},isSamsungBrowserType=function isSamsungBrowserType(_ref29){return _ref29.name===BrowserTypes.SamsungBrowser},getBrowserFullVersion=function getBrowserFullVersion(_ref30){var version=_ref30.version;return setDefaults(version)},getBrowserVersion=function getBrowserVersion(_ref31){var major=_ref31.major;return setDefaults(major)},getBrowserName=function getBrowserName(_ref32){var name=_ref32.name;return setDefaults(name)},getEngineName=function getEngineName(_ref33){var name=_ref33.name;return setDefaults(name)},getEngineVersion=function getEngineVersion(_ref34){var version=_ref34.version;return setDefaults(version)},isElectronType=function isElectronType(){var nav=getNavigatorInstance(),ua=nav&&nav.userAgent&&nav.userAgent.toLowerCase();return"string"==typeof ua&&/electron/.test(ua)},isEdgeChromiumType=function isEdgeChromiumType(ua){return"string"==typeof ua&&-1!==ua.indexOf("Edg/")},getIOS13=function getIOS13(){var nav=getNavigatorInstance();return nav&&(/iPad|iPhone|iPod/.test(nav.platform)||"MacIntel"===nav.platform&&nav.maxTouchPoints>1)&&!window.MSStream},getIPad13=function getIPad13(){return isIOS13Check("iPad")},getIphone13=function getIphone13(){return isIOS13Check("iPhone")},getIPod13=function getIPod13(){return isIOS13Check("iPod")},getUseragent=function getUseragent(userAg){return setDefaults(userAg)};function buildSelectorsObject(options){var _ref=options||UAHelper,device=_ref.device,browser=_ref.browser,os=_ref.os,engine=_ref.engine,ua=_ref.ua;return{isSmartTV:isSmartTVType(device),isConsole:isConsoleType(device),isWearable:isWearableType(device),isEmbedded:isEmbeddedType(device),isMobileSafari:isMobileSafariType(browser)||getIPad13(),isChromium:isChromiumType(browser),isMobile:isMobileAndTabletType(device)||getIPad13(),isMobileOnly:isMobileType(device),isTablet:isTabletType(device)||getIPad13(),isBrowser:isBrowserType(device),isDesktop:isBrowserType(device),isAndroid:isAndroidType(os),isWinPhone:isWinPhoneType(os),isIOS:isIOSType(os)||getIPad13(),isChrome:isChromeType(browser),isFirefox:isFirefoxType(browser),isSafari:isSafariType(browser),isOpera:isOperaType(browser),isIE:isIEType(browser),osVersion:getOsVersion(os),osName:getOsName(os),fullBrowserVersion:getBrowserFullVersion(browser),browserVersion:getBrowserVersion(browser),browserName:getBrowserName(browser),mobileVendor:getMobileVendor(device),mobileModel:getMobileModel(device),engineName:getEngineName(engine),engineVersion:getEngineVersion(engine),getUA:getUseragent(ua),isEdge:isEdgeType(browser)||isEdgeChromiumType(ua),isYandex:isYandexType(browser),deviceType:getDeviceType(device),isIOS13:getIOS13(),isIPad13:getIPad13(),isIPhone13:getIphone13(),isIPod13:getIPod13(),isElectron:isElectronType(),isEdgeChromium:isEdgeChromiumType(ua),isLegacyEdge:isEdgeType(browser)&&!isEdgeChromiumType(ua),isWindows:isWindowsType(os),isMacOs:isMacOsType(os),isMIUI:isMIUIType(browser),isSamsungBrowser:isSamsungBrowserType(browser)}}var isSmartTV=isSmartTVType(device),isConsole=isConsoleType(device),isWearable=isWearableType(device),isEmbedded=isEmbeddedType(device),isMobileSafari=isMobileSafariType(browser)||getIPad13(),isChromium=isChromiumType(browser),isMobile=isMobileAndTabletType(device)||getIPad13(),isMobileOnly=isMobileType(device),isTablet=isTabletType(device)||getIPad13(),isBrowser=isBrowserType(device),isDesktop=isBrowserType(device),isAndroid=isAndroidType(os),isWinPhone=isWinPhoneType(os),isIOS=isIOSType(os)||getIPad13(),isChrome=isChromeType(browser),isFirefox=isFirefoxType(browser),isSafari=isSafariType(browser),isOpera=isOperaType(browser),isIE=isIEType(browser),osVersion=getOsVersion(os),osName=getOsName(os),fullBrowserVersion=getBrowserFullVersion(browser),browserVersion=getBrowserVersion(browser),browserName=getBrowserName(browser),mobileVendor=getMobileVendor(device),mobileModel=getMobileModel(device),engineName=getEngineName(engine),engineVersion=getEngineVersion(engine),getUA=getUseragent(ua),isEdge=isEdgeType(browser)||isEdgeChromiumType(ua),isYandex=isYandexType(browser),deviceType=getDeviceType(device),isIOS13=getIOS13(),isIPad13=getIPad13(),isIPhone13=getIphone13(),isIPod13=getIPod13(),isElectron=isElectronType(),isEdgeChromium=isEdgeChromiumType(ua),isLegacyEdge=isEdgeType(browser)&&!isEdgeChromiumType(ua),isWindows=isWindowsType(os),isMacOs=isMacOsType(os),isMIUI=isMIUIType(browser),isSamsungBrowser=isSamsungBrowserType(browser);function useDeviceData(userAgent){var hookUserAgent=userAgent||window.navigator.userAgent;return parseUserAgent(hookUserAgent)}exports.KC=browserName,exports.x_=browserVersion,exports.vO=deviceType,exports.tq=isMobile,exports.N7=mobileModel,exports.B3=mobileVendor,exports.BF=osName,exports.MM=osVersion},"./node_modules/ua-parser-js/dist/ua-parser.min.js":function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;!function(window,undefined){"use strict";var MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",enumerize=function(arr){for(var enums={},i=0;i<arr.length;i++)enums[arr[i].toUpperCase()]=arr[i];return enums},has=function(str1,str2){return"string"==typeof str1&&-1!==lowerize(str2).indexOf(lowerize(str1))},lowerize=function(str){return str.toLowerCase()},trim=function(str,len){if("string"==typeof str)return str=str.replace(/^\s\s*/,""),void 0===len?str:str.substring(0,350)},rgxMapper=function(ua,arrays){for(var j,k,p,q,matches,match,i=0;i<arrays.length&&!matches;){var regex=arrays[i],props=arrays[i+1];for(j=k=0;j<regex.length&&!matches&&regex[j];)if(matches=regex[j++].exec(ua))for(p=0;p<props.length;p++)match=matches[++k],"object"==typeof(q=props[p])&&q.length>0?2===q.length?"function"==typeof q[1]?this[q[0]]=q[1].call(this,match):this[q[0]]=q[1]:3===q.length?"function"!=typeof q[1]||q[1].exec&&q[1].test?this[q[0]]=match?match.replace(q[1],q[2]):undefined:this[q[0]]=match?q[1].call(this,match,q[2]):undefined:4===q.length&&(this[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined):this[q]=match||undefined;i+=2}},strMapper=function(str,map){for(var i in map)if("object"==typeof map[i]&&map[i].length>0){for(var j=0;j<map[i].length;j++)if(has(map[i][j],str))return"?"===i?undefined:i}else if(has(map[i],str))return"?"===i?undefined:i;return str},windowsVersionMap={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},regexes={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[VERSION,[NAME,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[VERSION,[NAME,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[NAME,VERSION],[/opios[\/ ]+([\w\.]+)/i],[VERSION,[NAME,"Opera Mini"]],[/\bopr\/([\w\.]+)/i],[VERSION,[NAME,"Opera"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[NAME,VERSION],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[VERSION,[NAME,"UCBrowser"]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[VERSION,[NAME,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[VERSION,[NAME,"WeChat"]],[/konqueror\/([\w\.]+)/i],[VERSION,[NAME,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[VERSION,[NAME,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[VERSION,[NAME,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 Secure Browser"],VERSION],[/\bfocus\/([\w\.]+)/i],[VERSION,[NAME,"Firefox Focus"]],[/\bopt\/([\w\.]+)/i],[VERSION,[NAME,"Opera Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[VERSION,[NAME,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[VERSION,[NAME,"Dolphin"]],[/coast\/([\w\.]+)/i],[VERSION,[NAME,"Opera Coast"]],[/miuibrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI Browser"]],[/fxios\/([-\w\.]+)/i],[VERSION,[NAME,"Firefox"]],[/\bqihu|(qi?ho?o?|360)browser/i],[[NAME,"360 Browser"]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 Browser"],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[NAME,VERSION],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[NAME],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[NAME,"Facebook"],VERSION],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[NAME,VERSION],[/\bgsa\/([\w\.]+) .*safari\//i],[VERSION,[NAME,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[VERSION,[NAME,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[VERSION,[NAME,"Chrome Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[NAME,"Chrome WebView"],VERSION],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[VERSION,[NAME,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[NAME,VERSION],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,strMapper,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[NAME,"Netscape"],VERSION],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[VERSION,[NAME,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[NAME,VERSION],[/(cobalt)\/([\w\.]+)/i],[NAME,[VERSION,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[["architecture","amd64"]],[/(ia32(?=;))/i],[["architecture",lowerize]],[/((?:i[346]|x)86)[;\)]/i],[["architecture","ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[["architecture","arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[["architecture","armhf"]],[/windows (ce|mobile); ppc;/i],[["architecture","arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[["architecture",/ower/,"",lowerize]],[/(sun4\w)[;\)]/i],[["architecture","sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[["architecture",lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[MODEL,[VENDOR,"Samsung"],[TYPE,TABLET]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[MODEL,[VENDOR,"Samsung"],[TYPE,MOBILE]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[MODEL,[VENDOR,"Apple"],[TYPE,MOBILE]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[MODEL,[VENDOR,"Apple"],[TYPE,TABLET]],[/(macintosh);/i],[MODEL,[VENDOR,"Apple"]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,MOBILE]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[MODEL,[VENDOR,"Huawei"],[TYPE,TABLET]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[MODEL,[VENDOR,"Huawei"],[TYPE,MOBILE]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,MOBILE]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,TABLET]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[MODEL,[VENDOR,"OPPO"],[TYPE,MOBILE]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[MODEL,[VENDOR,"Vivo"],[TYPE,MOBILE]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[MODEL,[VENDOR,"Realme"],[TYPE,MOBILE]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[MODEL,[VENDOR,"Motorola"],[TYPE,MOBILE]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[MODEL,[VENDOR,"Motorola"],[TYPE,TABLET]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[MODEL,[VENDOR,"LG"],[TYPE,TABLET]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[MODEL,[VENDOR,"LG"],[TYPE,MOBILE]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[MODEL,/_/g," "],[VENDOR,"Nokia"],[TYPE,MOBILE]],[/(pixel c)\b/i],[MODEL,[VENDOR,"Google"],[TYPE,TABLET]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[MODEL,[VENDOR,"Google"],[TYPE,MOBILE]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[MODEL,[VENDOR,"Sony"],[TYPE,MOBILE]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[MODEL,"Xperia Tablet"],[VENDOR,"Sony"],[TYPE,TABLET]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[MODEL,[VENDOR,"OnePlus"],[TYPE,MOBILE]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[MODEL,/(.+)/g,"Fire Phone $1"],[VENDOR,"Amazon"],[TYPE,MOBILE]],[/(playbook);[-\w\),; ]+(rim)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[MODEL,[VENDOR,"BlackBerry"],[TYPE,MOBILE]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[MODEL,[VENDOR,"ASUS"],[TYPE,TABLET]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[MODEL,[VENDOR,"ASUS"],[TYPE,MOBILE]],[/(nexus 9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[MODEL,[VENDOR,"Meizu"],[TYPE,MOBILE]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(surface duo)/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,TABLET]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[MODEL,[VENDOR,"Fairphone"],[TYPE,MOBILE]],[/(u304aa)/i],[MODEL,[VENDOR,"AT&T"],[TYPE,MOBILE]],[/\bsie-(\w*)/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/\b(rct\w+) b/i],[MODEL,[VENDOR,"RCA"],[TYPE,TABLET]],[/\b(venue[\d ]{2,7}) b/i],[MODEL,[VENDOR,"Dell"],[TYPE,TABLET]],[/\b(q(?:mv|ta)\w+) b/i],[MODEL,[VENDOR,"Verizon"],[TYPE,TABLET]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[MODEL,[VENDOR,"Barnes & Noble"],[TYPE,TABLET]],[/\b(tm\d{3}\w+) b/i],[MODEL,[VENDOR,"NuVision"],[TYPE,TABLET]],[/\b(k88) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,TABLET]],[/\b(nx\d{3}j) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,MOBILE]],[/\b(gen\d{3}) b.+49h/i],[MODEL,[VENDOR,"Swiss"],[TYPE,MOBILE]],[/\b(zur\d{3}) b/i],[MODEL,[VENDOR,"Swiss"],[TYPE,TABLET]],[/\b((zeki)?tb.*\b) b/i],[MODEL,[VENDOR,"Zeki"],[TYPE,TABLET]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[VENDOR,"Dragon Touch"],MODEL,[TYPE,TABLET]],[/\b(ns-?\w{0,9}) b/i],[MODEL,[VENDOR,"Insignia"],[TYPE,TABLET]],[/\b((nxa|next)-?\w{0,9}) b/i],[MODEL,[VENDOR,"NextBook"],[TYPE,TABLET]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[VENDOR,"Voice"],MODEL,[TYPE,MOBILE]],[/\b(lvtel\-)?(v1[12]) b/i],[[VENDOR,"LvTel"],MODEL,[TYPE,MOBILE]],[/\b(ph-1) /i],[MODEL,[VENDOR,"Essential"],[TYPE,MOBILE]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[MODEL,[VENDOR,"Envizen"],[TYPE,TABLET]],[/\b(trio[-\w\. ]+) b/i],[MODEL,[VENDOR,"MachSpeed"],[TYPE,TABLET]],[/\btu_(1491) b/i],[MODEL,[VENDOR,"Rotor"],[TYPE,TABLET]],[/(shield[\w ]+) b/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,TABLET]],[/(sprint) (\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,"Microsoft"],[TYPE,MOBILE]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[MODEL,[VENDOR,"Zebra"],[TYPE,TABLET]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[MODEL,[VENDOR,"Zebra"],[TYPE,MOBILE]],[/smart-tv.+(samsung)/i],[VENDOR,[TYPE,SMARTTV]],[/hbbtv.+maple;(\d+)/i],[[MODEL,/^/,"SmartTV"],[VENDOR,"Samsung"],[TYPE,SMARTTV]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[VENDOR,"LG"],[TYPE,SMARTTV]],[/(apple) ?tv/i],[VENDOR,[MODEL,"Apple TV"],[TYPE,SMARTTV]],[/crkey/i],[[MODEL,"Chromecast"],[VENDOR,"Google"],[TYPE,SMARTTV]],[/droid.+aft(\w+)( bui|\))/i],[MODEL,[VENDOR,"Amazon"],[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/(bravia[\w ]+)( bui|\))/i],[MODEL,[VENDOR,"Sony"],[TYPE,SMARTTV]],[/(mitv-\w{5}) bui/i],[MODEL,[VENDOR,"Xiaomi"],[TYPE,SMARTTV]],[/Hbbtv.*(technisat) (.*);/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[VENDOR,trim],[MODEL,trim],[TYPE,SMARTTV]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[TYPE,SMARTTV]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[VENDOR,MODEL,[TYPE,"console"]],[/droid.+; (shield) bui/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,"console"]],[/(playstation [345portablevi]+)/i],[MODEL,[VENDOR,"Sony"],[TYPE,"console"]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,"console"]],[/((pebble))app/i],[VENDOR,MODEL,[TYPE,"wearable"]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[MODEL,[VENDOR,"Apple"],[TYPE,"wearable"]],[/droid.+; (glass) \d/i],[MODEL,[VENDOR,"Google"],[TYPE,"wearable"]],[/droid.+; (wt63?0{2,3})\)/i],[MODEL,[VENDOR,"Zebra"],[TYPE,"wearable"]],[/(quest( 2| pro)?)/i],[MODEL,[VENDOR,"Facebook"],[TYPE,"wearable"]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[VENDOR,[TYPE,"embedded"]],[/(aeobc)\b/i],[MODEL,[VENDOR,"Amazon"],[TYPE,"embedded"]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[MODEL,[TYPE,MOBILE]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[MODEL,[TYPE,TABLET]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[TYPE,TABLET]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[TYPE,MOBILE]],[/(android[-\w\. ]{0,9});.+buil/i],[MODEL,[VENDOR,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[VERSION,[NAME,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[VERSION,[NAME,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[NAME,VERSION],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[VERSION,NAME]],os:[[/microsoft (windows) (vista|xp)/i],[NAME,VERSION],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[NAME,[VERSION,strMapper,windowsVersionMap]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,strMapper,windowsVersionMap]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[VERSION,/_/g,"."],[NAME,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[VERSION,NAME],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[NAME,VERSION],[/\(bb(10);/i],[VERSION,[NAME,"BlackBerry"]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[VERSION,[NAME,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[VERSION,[NAME,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[VERSION,[NAME,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[VERSION,[NAME,"watchOS"]],[/crkey\/([\d\.]+)/i],[VERSION,[NAME,"Chromecast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[NAME,"Chromium OS"],VERSION],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[NAME,VERSION],[/(sunos) ?([\w\.\d]*)/i],[[NAME,"Solaris"],VERSION],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[NAME,VERSION]]},UAParser=function(ua,extensions){if("object"==typeof ua&&(extensions=ua,ua=undefined),!(this instanceof UAParser))return new UAParser(ua,extensions).getResult();var _navigator=void 0!==window&&window.navigator?window.navigator:undefined,_ua=ua||(_navigator&&_navigator.userAgent?_navigator.userAgent:""),_uach=_navigator&&_navigator.userAgentData?_navigator.userAgentData:undefined,_rgxmap=extensions?function(regexes,extensions){var mergedRegexes={};for(var i in regexes)extensions[i]&&extensions[i].length%2==0?mergedRegexes[i]=extensions[i].concat(regexes[i]):mergedRegexes[i]=regexes[i];return mergedRegexes}(regexes,extensions):regexes,_isSelfNav=_navigator&&_navigator.userAgent==_ua;return this.getBrowser=function(){var version,_browser={};return _browser[NAME]=undefined,_browser[VERSION]=undefined,rgxMapper.call(_browser,_ua,_rgxmap.browser),_browser.major="string"==typeof(version=_browser[VERSION])?version.replace(/[^\d\.]/g,"").split(".")[0]:void 0,_isSelfNav&&_navigator&&_navigator.brave&&"function"==typeof _navigator.brave.isBrave&&(_browser[NAME]="Brave"),_browser},this.getCPU=function(){var _cpu={architecture:undefined};return rgxMapper.call(_cpu,_ua,_rgxmap.cpu),_cpu},this.getDevice=function(){var _device={};return _device[VENDOR]=undefined,_device[MODEL]=undefined,_device[TYPE]=undefined,rgxMapper.call(_device,_ua,_rgxmap.device),_isSelfNav&&!_device[TYPE]&&_uach&&_uach.mobile&&(_device[TYPE]=MOBILE),_isSelfNav&&"Macintosh"==_device[MODEL]&&_navigator&&void 0!==_navigator.standalone&&_navigator.maxTouchPoints&&_navigator.maxTouchPoints>2&&(_device[MODEL]="iPad",_device[TYPE]=TABLET),_device},this.getEngine=function(){var _engine={};return _engine[NAME]=undefined,_engine[VERSION]=undefined,rgxMapper.call(_engine,_ua,_rgxmap.engine),_engine},this.getOS=function(){var _os={};return _os[NAME]=undefined,_os[VERSION]=undefined,rgxMapper.call(_os,_ua,_rgxmap.os),_isSelfNav&&!_os[NAME]&&_uach&&"Unknown"!=_uach.platform&&(_os[NAME]=_uach.platform.replace(/chrome os/i,"Chromium OS").replace(/macos/i,"Mac OS")),_os},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return _ua},this.setUA=function(ua){return _ua="string"==typeof ua&&ua.length>350?trim(ua,350):ua,this},this.setUA(_ua),this};UAParser.VERSION="1.0.36",UAParser.BROWSER=enumerize([NAME,VERSION,"major"]),UAParser.CPU=enumerize(["architecture"]),UAParser.DEVICE=enumerize([MODEL,VENDOR,TYPE,"console",MOBILE,SMARTTV,TABLET,"wearable","embedded"]),UAParser.ENGINE=UAParser.OS=enumerize([NAME,VERSION]),void 0!==exports?(module.exports&&(exports=module.exports=UAParser),exports.UAParser=UAParser):__webpack_require__.amdO?undefined===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return UAParser}.call(exports,__webpack_require__,exports,module))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__):void 0!==window&&(window.UAParser=UAParser);var $=void 0!==window&&(window.jQuery||window.Zepto);if($&&!$.ua){var parser=new UAParser;$.ua=parser.getResult(),$.ua.get=function(){return parser.getUA()},$.ua.set=function(ua){parser.setUA(ua);var result=parser.getResult();for(var prop in result)$.ua[prop]=result[prop]}}}("object"==typeof window?window:this)}}]);