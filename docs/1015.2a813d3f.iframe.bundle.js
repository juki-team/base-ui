(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[1015],{"./node_modules/codemirror/mode/webidl/webidl.js":function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){!function(CodeMirror){"use strict";function wordRegexp(words){return new RegExp("^(("+words.join(")|(")+"))\\b")}var builtinArray=["Clamp","Constructor","EnforceRange","Exposed","ImplicitThis","Global","PrimaryGlobal","LegacyArrayClass","LegacyUnenumerableNamedProperties","LenientThis","NamedConstructor","NewObject","NoInterfaceObject","OverrideBuiltins","PutForwards","Replaceable","SameObject","TreatNonObjectAsNull","TreatNullAs","EmptyString","Unforgeable","Unscopeable"],builtins=wordRegexp(builtinArray),typeArray=["unsigned","short","long","unrestricted","float","double","boolean","byte","octet","Promise","ArrayBuffer","DataView","Int8Array","Int16Array","Int32Array","Uint8Array","Uint16Array","Uint32Array","Uint8ClampedArray","Float32Array","Float64Array","ByteString","DOMString","USVString","sequence","object","RegExp","Error","DOMException","FrozenArray","any","void"],types=wordRegexp(typeArray),keywordArray=["attribute","callback","const","deleter","dictionary","enum","getter","implements","inherit","interface","iterable","legacycaller","maplike","partial","required","serializer","setlike","setter","static","stringifier","typedef","optional","readonly","or"],keywords=wordRegexp(keywordArray),atomArray=["true","false","Infinity","NaN","null"],atoms=wordRegexp(atomArray);CodeMirror.registerHelper("hintWords","webidl",builtinArray.concat(typeArray).concat(keywordArray).concat(atomArray));var startDefs=wordRegexp(["callback","dictionary","enum","interface"]),endDefs=wordRegexp(["typedef"]),singleOperators=/^[:<=>?]/,integers=/^-?([1-9][0-9]*|0[Xx][0-9A-Fa-f]+|0[0-7]*)/,floats=/^-?(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)/,identifiers=/^_?[A-Za-z][0-9A-Z_a-z-]*/,identifiersEnd=/^_?[A-Za-z][0-9A-Z_a-z-]*(?=\s*;)/,strings=/^"[^"]*"/,multilineComments=/^\/\*.*?\*\//,multilineCommentsStart=/^\/\*.*/,multilineCommentsEnd=/^.*?\*\//;function readToken(stream,state){if(stream.eatSpace())return null;if(state.inComment)return stream.match(multilineCommentsEnd)?(state.inComment=!1,"comment"):(stream.skipToEnd(),"comment");if(stream.match("//"))return stream.skipToEnd(),"comment";if(stream.match(multilineComments))return"comment";if(stream.match(multilineCommentsStart))return state.inComment=!0,"comment";if(stream.match(/^-?[0-9\.]/,!1)&&(stream.match(integers)||stream.match(floats)))return"number";if(stream.match(strings))return"string";if(state.startDef&&stream.match(identifiers))return"def";if(state.endDef&&stream.match(identifiersEnd))return state.endDef=!1,"def";if(stream.match(keywords))return"keyword";if(stream.match(types)){var lastToken=state.lastToken,nextToken=(stream.match(/^\s*(.+?)\b/,!1)||[])[1];return":"===lastToken||"implements"===lastToken||"implements"===nextToken||"="===nextToken?"builtin":"variable-3"}return stream.match(builtins)?"builtin":stream.match(atoms)?"atom":stream.match(identifiers)?"variable":stream.match(singleOperators)?"operator":(stream.next(),null)}CodeMirror.defineMode("webidl",(function(){return{startState:function(){return{inComment:!1,lastToken:"",startDef:!1,endDef:!1}},token:function(stream,state){var style=readToken(stream,state);if(style){var cur=stream.current();state.lastToken=cur,"keyword"===style?(state.startDef=startDefs.test(cur),state.endDef=state.endDef||endDefs.test(cur)):state.startDef=!1}return style}}})),CodeMirror.defineMIME("text/x-webidl","webidl")}(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"))}}]);