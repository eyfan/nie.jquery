/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 */
 (function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
(function(f){var c=function(a,e){var c,d,f,j,b;f=a&2147483648;j=e&2147483648;c=a&1073741824;d=e&1073741824;b=(a&1073741823)+(e&1073741823);return c&d?b^2147483648^f^j:c|d?b&1073741824?b^3221225472^f^j:b^1073741824^f^j:b^f^j},d=function(a,e,d,f,j,k,b){a=c(a,c(c(e&d|~e&f,j),b));return c(a<<k|a>>>32-k,e)},j=function(a,e,d,f,j,k,b){a=c(a,c(c(e&f|d&~f,j),b));return c(a<<k|a>>>32-k,e)},k=function(a,e,d,f,j,k,b){a=c(a,c(c(e^d^f,j),b));return c(a<<k|a>>>32-k,e)},l=function(a,e,d,f,j,k,b){a=c(a,c(c(d^(e|~f),
j),b));return c(a<<k|a>>>32-k,e)},m=function(a){var d="",c="",f;for(f=0;f<=3;f++)c=a>>>f*8&255,c="0"+c.toString(16),d+=c.substr(c.length-2,2);return d};f.extend({md5:function(a){var e=[],f,n,o,p,b,g,h,i,e=a.replace(/\x0d\x0a/g,"\n"),a="";for(f=0;f<e.length;f++)n=e.charCodeAt(f),n<128?a+=String.fromCharCode(n):(n>127&&n<2048?a+=String.fromCharCode(n>>6|192):(a+=String.fromCharCode(n>>12|224),a+=String.fromCharCode(n>>6&63|128)),a+=String.fromCharCode(n&63|128));e=a;a=e.length;f=a+8;n=((f-f%64)/64+
1)*16;o=Array(n-1);for(b=p=0;b<a;)f=(b-b%4)/4,p=b%4*8,o[f]|=e.charCodeAt(b)<<p,b++;o[(b-b%4)/4]|=128<<b%4*8;o[n-2]=a<<3;o[n-1]=a>>>29;e=o;b=1732584193;g=4023233417;h=2562383102;i=271733878;for(a=0;a<e.length;a+=16)f=b,n=g,o=h,p=i,b=d(b,g,h,i,e[a+0],7,3614090360),i=d(i,b,g,h,e[a+1],12,3905402710),h=d(h,i,b,g,e[a+2],17,606105819),g=d(g,h,i,b,e[a+3],22,3250441966),b=d(b,g,h,i,e[a+4],7,4118548399),i=d(i,b,g,h,e[a+5],12,1200080426),h=d(h,i,b,g,e[a+6],17,2821735955),g=d(g,h,i,b,e[a+7],22,4249261313),b=
d(b,g,h,i,e[a+8],7,1770035416),i=d(i,b,g,h,e[a+9],12,2336552879),h=d(h,i,b,g,e[a+10],17,4294925233),g=d(g,h,i,b,e[a+11],22,2304563134),b=d(b,g,h,i,e[a+12],7,1804603682),i=d(i,b,g,h,e[a+13],12,4254626195),h=d(h,i,b,g,e[a+14],17,2792965006),g=d(g,h,i,b,e[a+15],22,1236535329),b=j(b,g,h,i,e[a+1],5,4129170786),i=j(i,b,g,h,e[a+6],9,3225465664),h=j(h,i,b,g,e[a+11],14,643717713),g=j(g,h,i,b,e[a+0],20,3921069994),b=j(b,g,h,i,e[a+5],5,3593408605),i=j(i,b,g,h,e[a+10],9,38016083),h=j(h,i,b,g,e[a+15],14,3634488961),
g=j(g,h,i,b,e[a+4],20,3889429448),b=j(b,g,h,i,e[a+9],5,568446438),i=j(i,b,g,h,e[a+14],9,3275163606),h=j(h,i,b,g,e[a+3],14,4107603335),g=j(g,h,i,b,e[a+8],20,1163531501),b=j(b,g,h,i,e[a+13],5,2850285829),i=j(i,b,g,h,e[a+2],9,4243563512),h=j(h,i,b,g,e[a+7],14,1735328473),g=j(g,h,i,b,e[a+12],20,2368359562),b=k(b,g,h,i,e[a+5],4,4294588738),i=k(i,b,g,h,e[a+8],11,2272392833),h=k(h,i,b,g,e[a+11],16,1839030562),g=k(g,h,i,b,e[a+14],23,4259657740),b=k(b,g,h,i,e[a+1],4,2763975236),i=k(i,b,g,h,e[a+4],11,1272893353),
h=k(h,i,b,g,e[a+7],16,4139469664),g=k(g,h,i,b,e[a+10],23,3200236656),b=k(b,g,h,i,e[a+13],4,681279174),i=k(i,b,g,h,e[a+0],11,3936430074),h=k(h,i,b,g,e[a+3],16,3572445317),g=k(g,h,i,b,e[a+6],23,76029189),b=k(b,g,h,i,e[a+9],4,3654602809),i=k(i,b,g,h,e[a+12],11,3873151461),h=k(h,i,b,g,e[a+15],16,530742520),g=k(g,h,i,b,e[a+2],23,3299628645),b=l(b,g,h,i,e[a+0],6,4096336452),i=l(i,b,g,h,e[a+7],10,1126891415),h=l(h,i,b,g,e[a+14],15,2878612391),g=l(g,h,i,b,e[a+5],21,4237533241),b=l(b,g,h,i,e[a+12],6,1700485571),
i=l(i,b,g,h,e[a+3],10,2399980690),h=l(h,i,b,g,e[a+10],15,4293915773),g=l(g,h,i,b,e[a+1],21,2240044497),b=l(b,g,h,i,e[a+8],6,1873313359),i=l(i,b,g,h,e[a+15],10,4264355552),h=l(h,i,b,g,e[a+6],15,2734768916),g=l(g,h,i,b,e[a+13],21,1309151649),b=l(b,g,h,i,e[a+4],6,4149444226),i=l(i,b,g,h,e[a+11],10,3174756917),h=l(h,i,b,g,e[a+2],15,718787259),g=l(g,h,i,b,e[a+9],21,3951481745),b=c(b,f),g=c(g,n),h=c(h,o),i=c(i,p);return(m(b)+m(g)+m(h)+m(i)).toLowerCase()}})})(jQuery);
(function(f){f.chainclude=function(c,d){var j=function(k,l){if(typeof c.length!="undefined"){if(c.length==0)return f.isFunction(d)?d(l):null;c.shift();return f.chainclude.load(c,j)}for(var m in c){c[m](l);delete c[m];m=0;for(var a in c)m++;return m==0?f.isFunction(d)?d(l):null:f.chainclude.load(c,j)}};f.chainclude.load(c,j)};f.chainclude.load=function(c,d){if(typeof c=="object"&&typeof c.length=="undefined")for(var j in c)return f.include.load(j,d,c[j].callback);c=f.makeArray(c);f.include.load(c[0],
d,null)};f.include=function(c,d){var j=f.include.luid++,k=function(c,a){f.isFunction(c)&&c(a);--f.include.counter[j]==0&&f.isFunction(d)&&d()};if(typeof c=="object"&&typeof c.length=="undefined"){f.include.counter[j]=0;for(var l in c)f.include.counter[j]++;return f.each(c,function(c,a){f.include.load(c,k,a)})}c=f.makeArray(c);f.include.counter[j]=c.length;f.each(c,function(){f.include.load(this,k,null)})};f.extend(f.include,{luid:0,counter:[],load:function(c,d,j){if(f.include.exist(c))return d(j);
var k=c.match(/\.([^\.]+)$/);if(k)switch(k[1]){case "css":f.include.loadCSS(c,d,j);break;case "js":k=/charset=([^&]+)/i.exec(c);f.ajax({url:c,scriptCharset:k?k[1]:"gbk",dataType:"script",cache:!0,success:function(c){d(j,c)}});break;default:f.get(c,function(c){d(j,c)})}},loadCSS:function(c,d,j){var k=document.createElement("link");k.setAttribute("type","text/css");k.setAttribute("rel","stylesheet");k.setAttribute("href",c.toString());f("head").get(0).appendChild(k);f.browser.msie?f.include.IEonload(k,
d,j):d(j)},IEonload:function(c,d,f){c.onreadystatechange=function(){(this.readyState=="loaded"||this.readyState=="complete")&&d(f)}},exist:function(c){var d=!1;f("head script").each(function(){if(/.css$/.test(c)&&this.href==c)return d=!0;else if(/.js$/.test(c)&&this.src==c)return d=!0});return d}})})(jQuery);
jQuery.cookie=function(f,c,d){if(typeof c!="undefined"){d=d||{};if(c===null)c="",d.expires=-1;var j="";if(d.expires&&(typeof d.expires=="number"||d.expires.toUTCString))typeof d.expires=="number"?(j=new Date,j.setTime(j.getTime()+d.expires*864E5)):j=d.expires,j="; expires="+j.toUTCString();var k=d.path?"; path="+d.path:"",l=d.domain?"; domain="+d.domain:"",d=d.secure?"; secure":"";document.cookie=[f,"=",encodeURIComponent(c),j,k,l,d].join("")}else{c=null;if(document.cookie&&document.cookie!=""){d=
document.cookie.split(";");for(j=0;j<d.length;j++)if(k=jQuery.trim(d[j]),k.substring(0,f.length+1)==f+"="){c=decodeURIComponent(k.substring(f.length+1));break}}return c}};if(typeof nie=="undefined"||!nie)var nie={};nie.useJsURL="";nie.use=function(f,c){var d=f.sort().toString(),d="http://res.nie.netease.com/comm/js/"+(window.location.href.indexOf("http")!=0?"use.php?p="+d+"&":"cache/"+$.md5(d))+".js";nie.useJsURL=d;$.include(d,c)};
nie.config=nie.config||function(){var f={};f.site=function(){var c=/^((?:[^\.]+\.){1,3})(?:163|netease)\.com$/i.exec(window.location.hostname);return c!=null&&c.length==2?c[1].substring(0,c[1].length-1).toLowerCase():null}();f.stats={defaultRun:!0,name:"Devilfish",clickStats:!1,id:null};f.topBar={hasRun:!1,time:15E3};return f}();
nie.util={stats:function(){var f={gamebase:1,gift:1,nb:"vipnb",esales:1,gs:"gssumr",ekey:1,nie:1,xy3:1,"wy.xy3":"xy3",xy2:1,pk:"xyw",dt:1,dt2:1,dtw:1,tx2:1,popogame:1,xyq:1,itown:1,itownsdk:1,mc:1,jl:"mc",ysg:1,pet:"petkingdom",sg:"sgtx",zg:"zgfy",qn:"qnyh",csxy:1,xyc:1,st:1,fj:1,ball:1,ff:1,nieyx:1,ql:1,xjc:1,cc:1,yx:"ipush",gameclient:1,t3:1,tx3:1,"game.campus":"gamecampus",soul:"ql"},c=null;nie.config.stats.id==null?nie.config.site!=null&&typeof f[nie.config.site]!="undefined"&&(c=f[nie.config.site]==
1?nie.config.site:f[nie.config.site]):typeof f[nie.config.stats.id]!="undefined"&&(c=f[nie.config.stats.id]==1?nie.config.stats.id:f[nie.config.stats.id]);c!=null&&$.include("//analytics.163.com/ntes.js",function(){_ntes_nacc=c;neteaseTracker();nie.config.stats.clickStats&&neteaseClickStat()})},topBar:function(){if(!nie.config.topBar.hasRun&&document.getElementById("NIE-topBar"))nie.config.topBar.hasRun=!0,$.include(["http://res.nie.netease.com/comm/nie.topBar/css/base.last.css","http://res.nie.netease.com/comm/nie.topBar/js/topBar.last.js?charset=utf-8&.js"])},
copyRight:function(){var f=$("#NIE-copyRight");if(f.length!=0){var c="",d="",j="\u6587\u7f51\u6587\u300e2008\u300f080\u53f7",k="",l=!0,m=16,a="\u672c\u6e38\u620f\u9002\u5408$age\u5c81\u4ee5\u4e0a\u7684\u73a9\u5bb6\u8fdb\u5165<br />",e="\u79ef\u6781\u5065\u5eb7\u7684\u6e38\u620f\u5fc3\u6001\u662f\u5065\u5eb7\u6e38\u620f\u7684\u5f00\u7aef\uff0c\u672c\u6e38\u620f\u6545\u4e8b\u60c5\u8282\u8bbe\u7f6e\u7d27\u51d1\uff0c\u8bf7\u60a8\u5408\u7406\u63a7\u5236\u6e38\u620f\u65f6\u95f4\uff0c\u907f\u514d\u6c89\u6eba\u6e38\u620f\u5f71\u54cd\u751f\u6d3b\uff0c\u6ce8\u610f\u81ea\u6211\u4fdd\u62a4\uff0c\u9632\u8303\u7f51\u7edc\u9677\u9631\u3002<br />";
switch(nie.config.site){case "xyq":d="\u6587\u7f51\u6e38\u5907\u5b57\u30102005\u3011017\u53f7\uff082011\uff09C-RPG042\u53f7";break;case "xy2":d="\u6587\u7f51\u6e38\u5907\u5b57\u30102005\u3011016\u53f7";break;case "xy3":d="\u6587\u7f51\u6e38\u5907\u5b57(2011)C-RPG089\u53f7";break;case "xyw":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-RPG026\u53f7";break;case "pk":d="\u6587\u7f51\u6e38\u5907\u5b57(2011)C-RPG090\u53f7";break;case "dt":d="\u6587\u7f51\u6e38\u5907\u5b57(2011)C-RPG096\u53f7";break;case "gamebase":e=
a="";break;case "nie":e=a="";break;case "tx2":m=18;break;case "dt2":m=18;break;case "jl":m=14;break;case "ball":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-CSG005\u53f7";m=12;break;case "pet":m=12;break;case "zg":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]W-SLG012\u53f7";k='<img id="thunderlogo" src="http://res.nie.netease.com/zg/gw/09v3/images/thunderfire_logo_small.png" />';break;case "sg":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]W-SLG013\u53f7";break;case "ff":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-RPG001\u53f7";
m=14;k='<a href="http://www.aeonsoft.co.kr" target="_blank"><img src="http://res.nie.netease.com/comm/NIE_copyRight/images/AEONSOFT-logo.gif" /></a>';break;case "popogame":d="\u6587\u7f51\u5907\u5b57[2008]011\u53f7";break;case "gs":e=a="";break;case "fj":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-CSG002\u53f7";break;case "rich":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-CSG002\u53f7";break;case "st":d="\u6587\u7f51\u6e38\u5907\u5b57[2010]C-CSG004\u53f7";break;case "qn":k='<img src="http://res.nie.netease.com/comm/NIE_copyRight/images/blank.gif" width=49 height=35 style="'+
($.browser.msie&&parseInt($.browser.version)<=6?"_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://res.nie.netease.com/zg/gw/09v3/images/thunderfire_logo_small.png')":"background:url(http://res.nie.netease.com/zg/gw/09v3/images/thunderfire_logo_small.png) no-repeat")+'" />';break;case "csxy":d="\u6587\u7f51\u6e38\u5907\u5b57(2011)C-RPG051\u53f7";break;case "gift":l=!1;break;case "game.campus":l=!1}l&&/^\/($|index.html|boot.html)/.test(window.location.pathname)&&(c+='<p id="NIE-copyRight-info" style="width:960px;margin:0 auto 10px auto;text-align:center;line-height:20px;padding-bottom:10px;border-bottom:1px #666 solid;overflow:hidden;display:block;">\t\t\t  \t\t\t'+
a.replace("$age",m)+"\t\t\t\t  \t\t"+e+'\t\t\t\t  \t\t\u5168\u56fd\u6587\u5316\u5e02\u573a\u7edf\u4e00\u4e3e\u62a5\u7535\u8bdd\uff1a12318\u3000\u6587\u5316\u90e8\u7f51\u7edc\u6e38\u620f\u4e3e\u62a5\u548c\u8054\u7cfb\u7535\u5b50\u90ae\u7bb1\uff1a<a href="mailto:wlwh@vip.sina.com">wlwh@vip.sina.com</a><br />\t\t\t\t  \t\t<a target="_blank" href="http://nie.163.com/news/2010/6/9/442_216957.html">\u300a\u7f51\u7edc\u6e38\u620f\u7ba1\u7406\u6682\u884c\u529e\u6cd5\u300b</a>'+d+"\u3000\u300a\u7f51\u7edc\u6587\u5316\u7ecf\u8425\u8bb8\u53ef\u8bc1\u300b"+
j+"<br />\t\t\t\t     </p>",d=j="");c+='<p id="NIE-copyRight-corp" style="width:100%;line-height:20px;text-align:center;display:inline-block;">\t\t\t\t\t\t<span style="position:relative;top:3px;">\t\t\t\t        \t<a href="http://www.163.com" target="_blank"><img src="http://res.nie.netease.com/comm/NIE_copyRight/images/NetEase.png" width="95" height="35"></a>\t\t\t\t            <a href="http://nie.163.com" target="_blank"><img src="http://res.nie.netease.com/comm/NIE_copyRight/images/NIE.png" width="106" height="35"></a>\t\t\t\t\t\t\t'+
k+'\t\t\t\t        </span>\t\t\t\t        <span style="text-align:left;display:inline-block;">\t\t\t\t\t        <a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">\u516c\u53f8\u7b80\u4ecb</a> - <a href="http://help.163.com/" target="_blank">\u5ba2\u6237\u670d\u52a1</a> - <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">\u76f8\u5173\u6cd5\u5f8b</a> - <a href="http://nie.163.com/about/about.html" target="_blank">\u7f51\u6613\u6e38\u620f</a> - <a href="http://nie.163.com/about/contactus.html" target="_blank">\u8054\u7cfb\u6211\u4eec</a> - <a href="http://nie.163.com/bs/business.html" target="_blank">\u5546\u52a1\u5408\u4f5c</a> - <a href="http://nie.163.com/job/" target="_blank">\u52a0\u5165\u6211\u4eec</a><br />\t\t                     \u7f51\u6613\u516c\u53f8\u7248\u6743\u6240\u6709 &copy;1997-2011\u3000'+
d+"\u3000"+j+"\t\t\t\t        </span>\t\t\t\t  </p>";f.html(c)}},sEngine:{refer:document.referrer,cookie:{name:"nie.sEngine",val:null,domain:nie.config.site+".163.com",space:"^_*",url:window.location.href,refer:document.referrer,info:[],currentTime:(new Date).getTime(),expiresTime:36E5,getInfo:function(){this.info=this.val.split(this.space)},allowRefer:function(){return this.refer==this.info[3]&&RegExp("^http://"+this.domain+"\\b[$/]","i").test(this.refer)},set:function(){var f=(parseInt(this.info[1])-
this.currentTime)/864E5;$.cookie(this.name,this.info.join(this.space),{expires:f,path:"/",domain:this.domain})},create:function(){this.info=[1,this.currentTime+this.expiresTime,this.refer,this.url];this.set()},stats:function(){this.info[0]=1+parseInt(this.info[0]);this.info[3]=this.url;this.set()}},isEngineRefer:!1,init:function(){this.isEngineRefer=/^http[s]?:\/\/[^\/]+.(baidu.com|google.com.hk|google.com|soso.com|sogou.com|youdao.com|yahoo.com|bing.com)\//i.test(this.refer);if(window==top)this.cookie.val=
$.cookie(this.cookie.name),this.cookie.val?(this.cookie.getInfo(),this.isEngineRefer?this.cookie.create():this.cookie.allowRefer()&&this.cookie.stats()):this.isEngineRefer&&this.cookie.create()}}};nie.config.stats.defaultRun&&$(function(){setTimeout(nie.util.stats,0)});$(window).load(function(){nie.util.topBar()});$(function(){setTimeout(nie.util.copyRight,0)});setTimeout(function(){nie.config.topBar.hasRun||nie.util.topBar()},nie.config.topBar.time);nie.util.sEngine.init();