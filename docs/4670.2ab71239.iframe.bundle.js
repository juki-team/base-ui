(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[4670],{"./node_modules/codemirror/mode/jinja2/jinja2.js":function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){!function(CodeMirror){"use strict";CodeMirror.defineMode("jinja2",(function(){var keywords=["and","as","block","endblock","by","cycle","debug","else","elif","extends","filter","endfilter","firstof","for","endfor","if","endif","ifchanged","endifchanged","ifequal","endifequal","ifnotequal","endifnotequal","in","include","load","not","now","or","parsed","regroup","reversed","spaceless","endspaceless","ssi","templatetag","openblock","closeblock","openvariable","closevariable","openbrace","closebrace","opencomment","closecomment","widthratio","url","with","endwith","get_current_language","trans","endtrans","noop","blocktrans","endblocktrans","get_available_languages","get_current_language_bidi","plural"],operator=/^[+\-*&%=<>!?|~^]/,sign=/^[:\[\(\{]/,atom=["true","false"],number=/^(\d[+\-\*\/])?\d+(\.\d+)?/;function tokenBase(stream,state){var ch=stream.peek();if(state.incomment)return stream.skipTo("#}")?(stream.eatWhile(/\#|}/),state.incomment=!1):stream.skipToEnd(),"comment";if(state.intag){if(state.operator){if(state.operator=!1,stream.match(atom))return"atom";if(stream.match(number))return"number"}if(state.sign){if(state.sign=!1,stream.match(atom))return"atom";if(stream.match(number))return"number"}if(state.instring)return ch==state.instring&&(state.instring=!1),stream.next(),"string";if("'"==ch||'"'==ch)return state.instring=ch,stream.next(),"string";if(stream.match(state.intag+"}")||stream.eat("-")&&stream.match(state.intag+"}"))return state.intag=!1,"tag";if(stream.match(operator))return state.operator=!0,"operator";if(stream.match(sign))state.sign=!0;else if(stream.eat(" ")||stream.sol()){if(stream.match(keywords))return"keyword";if(stream.match(atom))return"atom";if(stream.match(number))return"number";stream.sol()&&stream.next()}else stream.next();return"variable"}if(stream.eat("{")){if(stream.eat("#"))return state.incomment=!0,stream.skipTo("#}")?(stream.eatWhile(/\#|}/),state.incomment=!1):stream.skipToEnd(),"comment";if(ch=stream.eat(/\{|%/))return state.intag=ch,"{"==ch&&(state.intag="}"),stream.eat("-"),"tag"}stream.next()}return keywords=new RegExp("(("+keywords.join(")|(")+"))\\b"),atom=new RegExp("(("+atom.join(")|(")+"))\\b"),{startState:function(){return{tokenize:tokenBase}},token:function(stream,state){return state.tokenize(stream,state)},blockCommentStart:"{#",blockCommentEnd:"#}"}})),CodeMirror.defineMIME("text/jinja2","jinja2")}(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"))}}]);