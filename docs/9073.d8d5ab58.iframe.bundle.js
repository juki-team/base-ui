(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[9073],{"./node_modules/codemirror/mode/commonlisp/commonlisp.js":function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){!function(CodeMirror){"use strict";CodeMirror.defineMode("commonlisp",(function(config){var type,specialForm=/^(block|let*|return-from|catch|load-time-value|setq|eval-when|locally|symbol-macrolet|flet|macrolet|tagbody|function|multiple-value-call|the|go|multiple-value-prog1|throw|if|progn|unwind-protect|labels|progv|let|quote)$/,assumeBody=/^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/,numLiteral=/^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/,symbol=/[^\s'`,@()\[\]";]/;function readSym(stream){for(var ch;ch=stream.next();)if("\\"==ch)stream.next();else if(!symbol.test(ch)){stream.backUp(1);break}return stream.current()}function base(stream,state){if(stream.eatSpace())return type="ws",null;if(stream.match(numLiteral))return"number";var ch;if("\\"==(ch=stream.next())&&(ch=stream.next()),'"'==ch)return(state.tokenize=inString)(stream,state);if("("==ch)return type="open","bracket";if(")"==ch||"]"==ch)return type="close","bracket";if(";"==ch)return stream.skipToEnd(),type="ws","comment";if(/['`,@]/.test(ch))return null;if("|"==ch)return stream.skipTo("|")?(stream.next(),"symbol"):(stream.skipToEnd(),"error");if("#"==ch)return"("==(ch=stream.next())?(type="open","bracket"):/[+\-=\.']/.test(ch)||/\d/.test(ch)&&stream.match(/^\d*#/)?null:"|"==ch?(state.tokenize=inComment)(stream,state):":"==ch?(readSym(stream),"meta"):"\\"==ch?(stream.next(),readSym(stream),"string-2"):"error";var name=readSym(stream);return"."==name?null:(type="symbol","nil"==name||"t"==name||":"==name.charAt(0)?"atom":"open"==state.lastType&&(specialForm.test(name)||assumeBody.test(name))?"keyword":"&"==name.charAt(0)?"variable-2":"variable")}function inString(stream,state){for(var next,escaped=!1;next=stream.next();){if('"'==next&&!escaped){state.tokenize=base;break}escaped=!escaped&&"\\"==next}return"string"}function inComment(stream,state){for(var next,last;next=stream.next();){if("#"==next&&"|"==last){state.tokenize=base;break}last=next}return type="ws","comment"}return{startState:function(){return{ctx:{prev:null,start:0,indentTo:0},lastType:null,tokenize:base}},token:function(stream,state){stream.sol()&&"number"!=typeof state.ctx.indentTo&&(state.ctx.indentTo=state.ctx.start+1),type=null;var style=state.tokenize(stream,state);return"ws"!=type&&(null==state.ctx.indentTo?"symbol"==type&&assumeBody.test(stream.current())?state.ctx.indentTo=state.ctx.start+config.indentUnit:state.ctx.indentTo="next":"next"==state.ctx.indentTo&&(state.ctx.indentTo=stream.column()),state.lastType=type),"open"==type?state.ctx={prev:state.ctx,start:stream.column(),indentTo:null}:"close"==type&&(state.ctx=state.ctx.prev||state.ctx),style},indent:function(state,_textAfter){var i=state.ctx.indentTo;return"number"==typeof i?i:state.ctx.start+1},closeBrackets:{pairs:'()[]{}""'},lineComment:";;",fold:"brace-paren",blockCommentStart:"#|",blockCommentEnd:"|#"}})),CodeMirror.defineMIME("text/x-common-lisp","commonlisp")}(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"))}}]);