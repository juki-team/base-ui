(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[6690],{"./node_modules/codemirror/mode/smalltalk/smalltalk.js":function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){!function(CodeMirror){"use strict";CodeMirror.defineMode("smalltalk",(function(config){var specialChars=/[+\-\/\\*~<>=@%|&?!.,:;^]/,keywords=/true|false|nil|self|super|thisContext/,Context=function(tokenizer,parent){this.next=tokenizer,this.parent=parent},Token=function(name,context,eos){this.name=name,this.context=context,this.eos=eos},State=function(){this.context=new Context(next,null),this.expectVariable=!0,this.indentation=0,this.userIndentationDelta=0};State.prototype.userIndent=function(indentation){this.userIndentationDelta=indentation>0?indentation/config.indentUnit-this.indentation:0};var next=function(stream,context,state){var token=new Token(null,context,!1),aChar=stream.next();return'"'===aChar?token=nextComment(stream,new Context(nextComment,context)):"'"===aChar?token=nextString(stream,new Context(nextString,context)):"#"===aChar?"'"===stream.peek()?(stream.next(),token=nextSymbol(stream,new Context(nextSymbol,context))):stream.eatWhile(/[^\s.{}\[\]()]/)?token.name="string-2":token.name="meta":"$"===aChar?("<"===stream.next()&&(stream.eatWhile(/[^\s>]/),stream.next()),token.name="string-2"):"|"===aChar&&state.expectVariable?token.context=new Context(nextTemporaries,context):/[\[\]{}()]/.test(aChar)?(token.name="bracket",token.eos=/[\[{(]/.test(aChar),"["===aChar?state.indentation++:"]"===aChar&&(state.indentation=Math.max(0,state.indentation-1))):specialChars.test(aChar)?(stream.eatWhile(specialChars),token.name="operator",token.eos=";"!==aChar):/\d/.test(aChar)?(stream.eatWhile(/[\w\d]/),token.name="number"):/[\w_]/.test(aChar)?(stream.eatWhile(/[\w\d_]/),token.name=state.expectVariable?keywords.test(stream.current())?"keyword":"variable":null):token.eos=state.expectVariable,token},nextComment=function(stream,context){return stream.eatWhile(/[^"]/),new Token("comment",stream.eat('"')?context.parent:context,!0)},nextString=function(stream,context){return stream.eatWhile(/[^']/),new Token("string",stream.eat("'")?context.parent:context,!1)},nextSymbol=function(stream,context){return stream.eatWhile(/[^']/),new Token("string-2",stream.eat("'")?context.parent:context,!1)},nextTemporaries=function(stream,context){var token=new Token(null,context,!1);return"|"===stream.next()?(token.context=context.parent,token.eos=!0):(stream.eatWhile(/[^|]/),token.name="variable"),token};return{startState:function(){return new State},token:function(stream,state){if(state.userIndent(stream.indentation()),stream.eatSpace())return null;var token=state.context.next(stream,state.context,state);return state.context=token.context,state.expectVariable=token.eos,token.name},blankLine:function(state){state.userIndent(0)},indent:function(state,textAfter){var i=state.context.next===next&&textAfter&&"]"===textAfter.charAt(0)?-1:state.userIndentationDelta;return(state.indentation+i)*config.indentUnit},electricChars:"]"}})),CodeMirror.defineMIME("text/x-stsrc",{name:"smalltalk"})}(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"))}}]);