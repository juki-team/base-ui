/*! For license information please see 3249.bdba0496.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_juki_team_base_ui=self.webpackChunk_juki_team_base_ui||[]).push([[3249],{"./node_modules/codemirror/mode/verilog/verilog.js":function(__unused_webpack_module,__unused_webpack_exports,__webpack_require__){!function(CodeMirror){"use strict";CodeMirror.defineMode("verilog",(function(config,parserConfig){var indentUnit=config.indentUnit,statementIndentUnit=parserConfig.statementIndentUnit||indentUnit,dontAlignCalls=parserConfig.dontAlignCalls,compilerDirectivesUseRegularIndentation=parserConfig.compilerDirectivesUseRegularIndentation,noIndentKeywords=parserConfig.noIndentKeywords||[],multiLineStrings=parserConfig.multiLineStrings,hooks=parserConfig.hooks||{};function words(str){for(var obj={},words=str.split(" "),i=0;i<words.length;++i)obj[words[i]]=!0;return obj}var curPunc,curKeyword,keywords=words("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor"),isOperatorChar=/[\+\-\*\/!~&|^%=?:<>]/,isBracketChar=/[\[\]{}()]/,unsignedNumber=/\d[0-9_]*/,decimalLiteral=/\d*\s*'s?d\s*\d[0-9_]*/i,binaryLiteral=/\d*\s*'s?b\s*[xz01][xz01_]*/i,octLiteral=/\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i,hexLiteral=/\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i,realLiteral=/(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i,closingBracketOrWord=/^((`?\w+)|[)}\]])/,closingBracket=/[)}\]]/,compilerDirectiveRegex=new RegExp("^(`(?:ifdef|ifndef|elsif|else|endif|undef|undefineall|define|include|begin_keywords|celldefine|default|nettype|end_keywords|endcelldefine|line|nounconnected_drive|pragma|resetall|timescale|unconnected_drive))\\b"),compilerDirectiveBeginRegex=/^(`(?:ifdef|ifndef|elsif|else))\b/,compilerDirectiveEndRegex=/^(`(?:elsif|else|endif))\b/,blockKeywords=words("case checker class clocking config function generate interface module package primitive program property specify sequence table task"),openClose={};for(var keyword in blockKeywords)openClose[keyword]="end"+keyword;for(var i in openClose.begin="end",openClose.casex="endcase",openClose.casez="endcase",openClose.do="while",openClose.fork="join;join_any;join_none",openClose.covergroup="endgroup",openClose.macro_begin="macro_end",noIndentKeywords)keyword=noIndentKeywords[i],openClose[keyword]&&(openClose[keyword]=void 0);var statementKeywords=words("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while extern typedef");function tokenBase(stream,state){var style,ch=stream.peek();if(hooks[ch]&&0!=(style=hooks[ch](stream,state)))return style;if(hooks.tokenBase&&0!=(style=hooks.tokenBase(stream,state)))return style;if(/[,;:\.]/.test(ch))return curPunc=stream.next(),null;if(isBracketChar.test(ch))return curPunc=stream.next(),"bracket";if("`"==ch){if(stream.next(),stream.eatWhile(/[\w\$_]/)){var cur=stream.current();if(curKeyword=cur,cur.startsWith("`uvm_")&&cur.endsWith("_begin")){var keywordClose=curKeyword.substr(0,curKeyword.length-5)+"end";openClose[cur]=keywordClose,curPunc="newblock"}else{stream.eatSpace(),"("==stream.peek()&&(curPunc="newmacro");var withSpace=stream.current();stream.backUp(withSpace.length-cur.length)}return"def"}return null}if("$"==ch)return stream.next(),stream.eatWhile(/[\w\$_]/)?"meta":null;if("#"==ch)return stream.next(),stream.eatWhile(/[\d_.]/),"def";if("@"==ch)return stream.next(),stream.eatWhile(/[@]/),"def";if('"'==ch)return stream.next(),state.tokenize=tokenString(ch),state.tokenize(stream,state);if("/"==ch){if(stream.next(),stream.eat("*"))return state.tokenize=tokenComment,tokenComment(stream,state);if(stream.eat("/"))return stream.skipToEnd(),"comment";stream.backUp(1)}return stream.match(realLiteral)||stream.match(decimalLiteral)||stream.match(binaryLiteral)||stream.match(octLiteral)||stream.match(hexLiteral)||stream.match(unsignedNumber)||stream.match(realLiteral)?"number":stream.eatWhile(isOperatorChar)?(curPunc=stream.current(),"meta"):stream.eatWhile(/[\w\$_]/)?(cur=stream.current(),keywords[cur]?(openClose[cur]&&(curPunc="newblock","fork"===cur&&(stream.eatSpace(),";"==stream.peek()&&(curPunc="newstatement"),stream.backUp(stream.current().length-cur.length))),statementKeywords[cur]&&(curPunc="newstatement"),curKeyword=cur,"keyword"):"variable"):(stream.next(),null)}function tokenString(quote){return function(stream,state){for(var next,escaped=!1,end=!1;null!=(next=stream.next());){if(next==quote&&!escaped){end=!0;break}escaped=!escaped&&"\\"==next}return(end||!escaped&&!multiLineStrings)&&(state.tokenize=tokenBase),"string"}}function tokenComment(stream,state){for(var ch,maybeEnd=!1;ch=stream.next();){if("/"==ch&&maybeEnd){state.tokenize=tokenBase;break}maybeEnd="*"==ch}return"comment"}function Context(indented,column,type,scopekind,align,prev){this.indented=indented,this.column=column,this.type=type,this.scopekind=scopekind,this.align=align,this.prev=prev}function pushContext(state,col,type,scopekind){var c=new Context(state.indented,col,type,scopekind||"",null,state.context);return state.context=c}function popContext(state){var t=state.context.type;return")"!=t&&"]"!=t&&"}"!=t||(state.indented=state.context.indented),state.context=state.context.prev}function isClosing(text,contextClosing){if(text==contextClosing)return!0;var closingKeywords=contextClosing.split(";");for(var i in closingKeywords)if(text==closingKeywords[i])return!0;return!1}function isInsideScopeKind(ctx,scopekind){return null!=ctx&&(ctx.scopekind===scopekind||isInsideScopeKind(ctx.prev,scopekind))}function buildElectricInputRegEx(){var allClosings=[];for(var i in openClose)if(openClose[i]){var closings=openClose[i].split(";");for(var j in closings)allClosings.push(closings[j])}return new RegExp("[{}()\\[\\]]|("+allClosings.join("|")+")$")}return{electricInput:buildElectricInputRegEx(),startState:function(basecolumn){var state={tokenize:null,context:new Context((basecolumn||0)-indentUnit,0,"top","top",!1),indented:0,compilerDirectiveIndented:0,startOfLine:!0};return hooks.startState&&hooks.startState(state),state},token:function(stream,state){var style,ctx=state.context;if(stream.sol()&&(null==ctx.align&&(ctx.align=!1),state.indented=stream.indentation(),state.startOfLine=!0),hooks.token&&void 0!==(style=hooks.token(stream,state)))return style;if(stream.eatSpace())return null;if(curPunc=null,curKeyword=null,"comment"==(style=(state.tokenize||tokenBase)(stream,state))||"meta"==style||"variable"==style)return"="!==curPunc&&"<="!==curPunc||isInsideScopeKind(ctx,"assignment")||(pushContext(state,stream.column()+curPunc.length,"assignment","assignment"),null==ctx.align&&(ctx.align=!0)),style;null==ctx.align&&(ctx.align=!0);var isClosingAssignment="assignment"==ctx.type&&closingBracket.test(curPunc)&&ctx.prev&&ctx.prev.type===curPunc;if(curPunc==ctx.type||isClosingAssignment){if(isClosingAssignment&&(ctx=popContext(state)),ctx=popContext(state),")"==curPunc){if(ctx&&"macro"===ctx.type)for(ctx=popContext(state);ctx&&("statement"==ctx.type||"assignment"==ctx.type);)ctx=popContext(state)}else if("}"==curPunc&&ctx&&"statement"===ctx.type)for(;ctx&&"statement"==ctx.type;)ctx=popContext(state)}else if((";"==curPunc||","==curPunc)&&("statement"==ctx.type||"assignment"==ctx.type)||ctx.type&&isClosing(curKeyword,ctx.type))for(ctx=popContext(state);ctx&&("statement"==ctx.type||"assignment"==ctx.type);)ctx=popContext(state);else if("{"==curPunc)pushContext(state,stream.column(),"}");else if("["==curPunc)pushContext(state,stream.column(),"]");else if("("==curPunc)pushContext(state,stream.column(),")");else if(ctx&&"endcase"==ctx.type&&":"==curPunc)pushContext(state,stream.column(),"statement","case");else if("newstatement"==curPunc)pushContext(state,stream.column(),"statement",curKeyword);else if("newblock"==curPunc){if("function"!=curKeyword||!ctx||"statement"!=ctx.type&&"endgroup"!=ctx.type)if("task"==curKeyword&&ctx&&"statement"==ctx.type);else if("class"==curKeyword&&ctx&&"statement"==ctx.type);else{var close=openClose[curKeyword];pushContext(state,stream.column(),close,curKeyword)}}else("newmacro"==curPunc||curKeyword&&curKeyword.match(compilerDirectiveRegex))&&("newmacro"==curPunc&&pushContext(state,stream.column(),"macro","macro"),curKeyword.match(compilerDirectiveEndRegex)&&(state.compilerDirectiveIndented-=statementIndentUnit),curKeyword.match(compilerDirectiveBeginRegex)&&(state.compilerDirectiveIndented+=statementIndentUnit));return state.startOfLine=!1,style},indent:function(state,textAfter){if(state.tokenize!=tokenBase&&null!=state.tokenize)return CodeMirror.Pass;if(hooks.indent){var fromHook=hooks.indent(state);if(fromHook>=0)return fromHook}var ctx=state.context,firstChar=textAfter&&textAfter.charAt(0);"statement"==ctx.type&&"}"==firstChar&&(ctx=ctx.prev);var closing=!1,possibleClosing=textAfter.match(closingBracketOrWord);return possibleClosing&&(closing=isClosing(possibleClosing[0],ctx.type)),!compilerDirectivesUseRegularIndentation&&textAfter.match(compilerDirectiveRegex)?textAfter.match(compilerDirectiveEndRegex)?state.compilerDirectiveIndented-statementIndentUnit:state.compilerDirectiveIndented:"statement"==ctx.type?ctx.indented+("{"==firstChar?0:statementIndentUnit):!closingBracket.test(ctx.type)&&"assignment"!=ctx.type||!ctx.align||dontAlignCalls?")"!=ctx.type||closing?ctx.indented+(closing?0:indentUnit):ctx.indented+statementIndentUnit:ctx.column+(closing?0:1)},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"indent"}})),CodeMirror.defineMIME("text/x-verilog",{name:"verilog"}),CodeMirror.defineMIME("text/x-systemverilog",{name:"verilog"});var tlvIdentifierStyle={"|":"link",">":"property",$:"variable",$$:"variable","?$":"qualifier","?*":"qualifier","-":"hr","/":"property","/-":"property","@":"variable-3","@-":"variable-3","@++":"variable-3","@+=":"variable-3","@+=-":"variable-3","@--":"variable-3","@-=":"variable-3","%+":"tag","%-":"tag","%":"tag",">>":"tag","<<":"tag","<>":"tag","#":"tag","^":"attribute","^^":"attribute","^!":"attribute","*":"variable-2","**":"variable-2","\\":"keyword",'"':"comment"},tlvScopePrefixChars={"/":"beh-hier",">":"beh-hier","-":"phys-hier","|":"pipe","?":"when","@":"stage","\\":"keyword"},tlvIndentUnit=3,tlvTrackStatements=!1,tlvIdentMatch=/^([~!@#\$%\^&\*-\+=\?\/\\\|'"<>]+)([\d\w_]*)/,tlvFirstLevelIndentMatch=/^[! ]  /,tlvLineIndentationMatch=/^[! ] */,tlvCommentMatch=/^\/[\/\*]/;function tlvScopeStyle(state,indentation,type){var depth=indentation/tlvIndentUnit;return"tlv-"+state.tlvIndentationStyle[depth]+"-"+type}function tlvIdentNext(stream){var match;return(match=stream.match(tlvIdentMatch,!1))&&match[2].length>0}CodeMirror.defineMIME("text/x-tlv",{name:"verilog",hooks:{electricInput:!1,token:function(stream,state){var style=void 0;if(stream.sol()&&!state.tlvInBlockComment){"\\"==stream.peek()&&(style="def",stream.skipToEnd(),stream.string.match(/\\SV/)?state.tlvCodeActive=!1:stream.string.match(/\\TLV/)&&(state.tlvCodeActive=!0)),state.tlvCodeActive&&0==stream.pos&&0==state.indented&&(match=stream.match(tlvLineIndentationMatch,!1))&&(state.indented=match[0].length);var indented=state.indented,depth=indented/tlvIndentUnit;if(depth<=state.tlvIndentationStyle.length){var blankline=stream.string.length==indented,chPos=depth*tlvIndentUnit;if(chPos<stream.string.length){var bodyString=stream.string.slice(chPos),ch=bodyString[0];tlvScopePrefixChars[ch]&&(match=bodyString.match(tlvIdentMatch))&&tlvIdentifierStyle[match[1]]&&(indented+=tlvIndentUnit,"\\"==ch&&chPos>0||(state.tlvIndentationStyle[depth]=tlvScopePrefixChars[ch],tlvTrackStatements&&(state.statementComment=!1),depth++))}if(!blankline)for(;state.tlvIndentationStyle.length>depth;)state.tlvIndentationStyle.pop()}state.tlvNextIndent=indented}if(state.tlvCodeActive){var match,beginStatement=!1;if(tlvTrackStatements&&(beginStatement=" "!=stream.peek()&&void 0===style&&!state.tlvInBlockComment&&stream.column()==state.tlvIndentationStyle.length*tlvIndentUnit)&&(state.statementComment&&(beginStatement=!1),state.statementComment=stream.match(tlvCommentMatch,!1)),void 0!==style)style+=" "+tlvScopeStyle(state,0,"scope-ident");else if(stream.pos/tlvIndentUnit<state.tlvIndentationStyle.length&&(match=stream.match(stream.sol()?tlvFirstLevelIndentMatch:/^   /)))style="tlv-indent-"+(stream.pos%2==0?"even":"odd")+" "+tlvScopeStyle(state,stream.pos-tlvIndentUnit,"indent"),"!"==match[0].charAt(0)&&(style+=" tlv-alert-line-prefix"),tlvIdentNext(stream)&&(style+=" "+tlvScopeStyle(state,stream.pos,"before-scope-ident"));else if(state.tlvInBlockComment)stream.match(/^.*?\*\//)?(state.tlvInBlockComment=!1,tlvTrackStatements&&!stream.eol()&&(state.statementComment=!1)):stream.skipToEnd(),style="comment";else if((match=stream.match(tlvCommentMatch))&&!state.tlvInBlockComment)"//"==match[0]?stream.skipToEnd():state.tlvInBlockComment=!0,style="comment";else if(match=stream.match(tlvIdentMatch)){var prefix=match[1],mnemonic=match[2];tlvIdentifierStyle.hasOwnProperty(prefix)&&(mnemonic.length>0||stream.eol())?(style=tlvIdentifierStyle[prefix],stream.column()==state.indented&&(style+=" "+tlvScopeStyle(state,stream.column(),"scope-ident"))):(stream.backUp(stream.current().length-1),style="tlv-default")}else stream.match(/^\t+/)?style="tlv-tab":stream.match(/^[\[\]{}\(\);\:]+/)?style="meta":(match=stream.match(/^[mM]4([\+_])?[\w\d_]*/))?style="+"==match[1]?"tlv-m4-plus":"tlv-m4":stream.match(/^ +/)?style=stream.eol()?"error":"tlv-default":stream.match(/^[\w\d_]+/)?style="number":(stream.next(),style="tlv-default");beginStatement&&(style+=" tlv-statement")}else stream.match(/^[mM]4([\w\d_]*)/)&&(style="tlv-m4");return style},indent:function(state){return 1==state.tlvCodeActive?state.tlvNextIndent:-1},startState:function(state){state.tlvIndentationStyle=[],state.tlvCodeActive=!0,state.tlvNextIndent=-1,state.tlvInBlockComment=!1,tlvTrackStatements&&(state.statementComment=!1)}}})}(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"))}}]);