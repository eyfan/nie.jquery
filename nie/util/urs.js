nie.util.urs=nie.util.urs||{data:[],create:function(){var a={};a.r=function(){return(new Date).getTime()};a.server="http://weburs.ku.163.com/";a.aHref="javascript:void(0);";a.serverPath=a.server+"quickReg/";a.get=function(b,c,e){$.include(a.serverPath+b+"?output=js&ver=2&4test=1&dataID="+a.dataID+"&promark="+a.promark+"&"+c+"&"+a.r()+"&.js",e)};a.progress={loadID:0,loadCap:0,chkUser:0,verCap:0,submit:0};a.stats={regTime:false,monitor:false,log:false,pv:false,clickSugRegBtn:false,uvID:function(){var b=
$.cookie("nie.util.urs.uvID");if(!b){b=a.r();$.cookie("nie.util.urs.uvID",b,{expires:1,path:"/",domain:nie.config.site+".163.com"})}return b}()};a.$img=function(){var b=$(new Image);b.bind("readystatechange",function(){}).bind("abort",function(){});return b};a.runStats=function(b,c){if(a.stats[b]){var e=function(q,i){a.$img().attr("src",a.serverPath+"stats?3|"+a.stats.uvID+"|"+a.promark+"|"+q+"|"+(typeof i!="undefined"?i:0)+"|"+a.r())};switch(b){case "clickSugRegBtn":a.form.find(".sugRegBtn").click(function(){e("clickSugRegBtn")});
break;default:e(b,c)}}};a.id="";a.dataID=nie.util.urs.data.length;nie.util.urs.data.push({});a.form=$(".NIE-quickReg");a.reComUserName={};a.showCaptcha=false;a.result={};a.pvStats=false;a.promark="";a.inpEvent="focusout";a.capWidth=100;a.capHeight=32;a.msgID={msg:"NIE-quickReg-msg",bg:"NIE-quickReg-msg-bg",txt:"NIE-quickReg-msg-txt",action:"NIE-quickReg-msg-action"};a.msgW=316;a.msgH=136;a.msgO={msg:function(){return $("#"+a.msgID.msg)},bg:function(){return $("#"+a.msgID.bg)},txt:function(){return $("#"+
a.msgID.txt)},action:function(){return $("#"+a.msgID.action)}};a.fromSearch=false;a.engineInit=function(b){var c=false,e=0,q=1,i=[["^http://[^/]+.baidu.com/s?","wd",1],["^http[s]?://[^/]+.google.com(.hk)?/search","q",2],["^http://[^/]+.soso.com/q","w",1],["^http://[^/]+.(sogou|sogo).com/web","query",1],["^http://[^/]+.youdao.com/search","q",2],["^http://[^/]+.yahoo.com/(s?|search)","p",2],["^http://[^/]+.bing.com/search?","q",2]],k=nie.util.sEngine,d=k.cookie.info;if(k.isEngineRefer)c=true;else if(d.length>
3&&d[0]>1){c=true;q=2;b=d[2];e=d[0]}if(c){c=0;for(k=i.length;c<k;c++){d=i[c];if(RegExp(d[0],"i").test(b)){var n=document.createElement("a");n.href=b;n=n.search.match(RegExp("[&?]"+d[1]+"=([^&]+)","i"));if(n.length==2){d=d[2];switch(c){case 0:if(/[&\?]ie=utf-8/i.test(b))d=2;break;case 1:if(/[&\?]ie=(gbk|gb2312)/i.test(b))d=1;break;case 2:if(/[&\?]ie=utf-8/i.test(b))d=2;break;case 4:if(/[&\?]ue=(gbk|gb2312)/i.test(b))d=1;break;case 5:if(!/^http:\/\/one.cn.yahoo.com\//i.test(b))if(/[&\?]ei=(gbk|gb2312)/i.test(b))d=
1}nie.util.urs.data[a.dataID].engine={keyWord:encodeURIComponent(n[1]),encode:d,engineID:c+1,refer:encodeURIComponent(b),type:q,pages:e}}}}}};a.clearMsg=function(){a.msgO.txt().empty();a.msgO.action().empty()};a.getUrl=function(){var b=nie.util.urs.data[a.dataID].result.reDirectUrl;if(b!=null)b+=(b.indexOf("?")>0?"&":"?")+"username="+a.getVal("username");return b};a.showMsg=function(b){if(typeof b=="object"){var c=function(w){return typeof b[w]!="undefined"?b[w]:null},e=c("result"),q=c("msg"),i=c("url"),
k=c("confirmFn");c=$(window);var d=c.width(),n=c.height(),o="_self";a.msgO.msg().length==0?$("<div>",{id:a.msgID.msg,css:{top:(n-a.msgH)/2+c.scrollTop()+"px",left:(d-a.msgW)/2+c.scrollLeft()+"px"},html:'<i class="tl"></i><i class="tm"></i><i class="tr"></i><i class="ml"></i><i class="mm"><span id="'+a.msgID.txt+'"></span><span id="'+a.msgID.action+'"></span></i><i class="mr"></i><i class="bl"></i><i class="bm"></i><i class="br"></i>'}).appendTo($(document.body)):a.clearMsg();a.msgO.bg().length==0?
$("<div/>",{id:a.msgID.bg,css:{top:c.scrollTop()+"px",left:c.scrollLeft()+"px",width:d+"px",height:n+"px"}}).appendTo($(document.body)):a.msgO.bg().fadeIn("fast");a.msgO.msg().fadeIn("fast");if(e&&i!=null){o="_blank";i+=(i.indexOf("?")>0?"&":"?")+"username="+a.getVal("username")}else i=a.aHref;a.showCaptcha=false;a.msgO.txt().text(q);e!=null&&$("<a/>",{href:i,target:o,text:"\u786e\u8ba4",click:function(){a.runStats("log",110);a.hideMsg();$.isFunction(k)&&k()}}).appendTo(a.msgO.action())}};a.hideMsg=
function(){a.msgO.bg().hide();a.msgO.msg().hide()};a.regComplete=a.showMsg;a.$=function(b){return $(b,a.form)};a.getO=function(b,c){var e=null;b=b.toLowerCase();if(c||!/^(password|repassword)$/.test(b))e=a.$((b=="idtype"?"select":"input")+"[name="+b+"]");return e};a.getVal=function(b,c){var e=a.getO(b,c);return e!=null?$.trim(e.val()):null};a.getRegSign=function(){var b=nie.util.urs.data[a.dataID];return b&&b.result&&b.result.sign?b.result.sign:null};a.init=function(){var b,c=a.$(".captcha-wrap"),
e,q=0,i=false,k={username:{},password:{},repassword:{},promark:{},captcha:{}},d="",n="",o,w,y=function(){if(a.progress.loadCap==0){a.progress.loadCap=1;c.empty();a.$img().css({width:a.capWidth,height:a.capHeight}).click(function(){y();a.runStats("log",74)}).load(function(){a.progress.loadCap=0;a.showCaptcha=true;c.append($(this))}).error(function(){c.removeClass("loading").text("\u5237\u65b0\u8fc7\u591a")}).bind("readystatechange",function(){this.readyState=="complete"&&$(this).trigger("load").unbind("load")}).attr("src",
a.serverPath+"Img?id="+a.id+"&"+a.r())}},C=function(f){if(a.progress.loadID==0){a.progress.loadID=1;q=a.r();a.get("IdCreator","promark="+a.promark,function(){a.progress.loadID=0;a.id=nie.util.urs.data[a.dataID].id;a.$("#captchaBtn").attr({href:a.aHref,target:"_self"}).click(function(){y();a.runStats("log",75)});a.showCaptcha||y();if(f&&$.isFunction(f.onComplete))f.onComplete()})}},A=function(){if(!a.showCaptcha){b.fadeIn("fast");C({onComplete:function(){a.showCaptcha=true;a.runStats("log",0)}})}},
z=function(f,r){var m=r=="right"?"error":"right";$(".loading",f).hide();$("."+r,f).show();$("."+m,f).hide();f.show()};a.promark=a.getVal("promark");a.runStats("pv");a.engineInit(document.referrer);if(typeof nie.util.urs.data[a.dataID].engine!="undefined"){var x=nie.util.urs.data[a.dataID].engine;a.get("fromSearch","type="+x.type+"&pages="+x.pages+"&keyWord="+x.keyWord+"&encode="+x.encode+"&engineID="+x.engineID+"&refer="+x.refer,function(){a.fromSearch=true})}$(".NIE-quickReg-loading").hide();a.form.show();
b=a.$(".hideItem");e=a.$(".recomUserName");o=a.$(".userName-tips");$.each(k,function(f){this.pass=this.val=null;d+="input[name="+f+"],";n+="input[rel="+f+"],";a.$("label[for="+f+"]").html("<i class='loading'></i><i class='error'></i><i class='right'></i>")});d=d.substring(0,d.length-1);n=n.substring(0,n.length-1);o.html('<i></i><a class="close" target="_self" href="'+a.aHref+'">X</a>6~18\u4f4d\uff0c\u5305\u62ec\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\uff1b\u4ee5\u5b57\u6bcd\u5f00\u5934\uff0c\u5b57\u6bcd\u6216\u6570\u5b57\u7ed3\u5c3e\u3002');
$(".close",o).click(function(){o.hide()});a.form.attr("action","#").submit(function(){a.runStats("log",90);var f=0;k.promark.pass=a.promark!="";if(k.promark.pass)if(a.getO("agree").attr("checked")){var r=function(){f++;if(f==2){for(var m in k)if(!k[m].pass){a.getO(m,true).trigger("focus");return}a.runStats("log",100);var s=false;setTimeout(function(){s||a.showMsg({msg:"\u63d0\u4ea4\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u540e...",url:null})},2500);m="id="+a.id+function(g){for(var t="",l=0,u=g.length;l<
u;l++){var h=g[l],v=a.getO(h,true);v=v.length==0?"":v.val();if(/^(password|realname|idno|activityid1|activityid2)$/.test(h))v=encodeURIComponent(encodeURIComponent(v));t+="&"+h+"="+v}return t}(["captcha","username","password","mobile","promark","activityid1","activityid2","case"]);if(a.fromSearch){var j=nie.util.urs.data[a.dataID].engine;m+="&type="+j.type+"&pages="+j.pages+"&keyWord="+j.keyWord+"&encode="+j.encode+"&engineID="+j.engineID+"&refer="+j.refer}if(a.progress.submit==0){a.progress.submit=
1;nie.util.urs.data[a.dataID].result={};a.get("submit",m,function(){a.progress.submit=0;q!=0&&a.runStats("regTime",a.r()-q);q=0;s=true;a.hideMsg();var g=nie.util.urs.data[a.dataID].result,t=parseInt(g.num),l=t==200||t==201;a.runStats("log",l?101:102);t==2&&y();if($.isFunction(a.regComplete)){a.regComplete({result:l,msg:g.msg,url:g.reDirectUrl,data:g});a.runStats("monitor",1)}})}}};(function(){A();$.each(k,function(m){m!="promark"&&a.getO(m,true).trigger(a.inpEvent,[r,true])})})()}else alert("\u8bf7\u540c\u610f\u300a\u7f51\u6613\u670d\u52a1\u6761\u6b3e\u300b\u548c\u300a\u9690\u79c1\u6743\u4fdd\u62a4\u548c\u4e2a\u4eba\u4fe1\u606f\u5229\u7528\u653f\u7b56\u300b");
else alert("\u6ce8\u518c\u5931\u8d25\uff0cpromark\u4e0d\u5b58\u5728")});a.getO("username").keypress(function(){clearTimeout(w);o.show();w=setTimeout(function(){o.hide()},2E3);if(i){e.hide();i=false}}).hover(function(){o.show();clearTimeout(w);w=setTimeout(function(){o.hide()},3E3)},function(){o.hide()});a.$(n).bind("focusin",function(){var f=$(this),r=f.attr("rel");f.hide();a.getO(r,true).show().trigger("focus")});a.$(d).focusin(A).bind(a.inpEvent,function(f,r,m){var s=$(this),j=s.attr("name"),g=
/^(password|repassword)$/.test(j)?s.val():$.trim(s.val()),t=a.$("label[for="+j+"]"),l=false;f=false;var u="",h="",v=function(){u=l?"right":"error";k[j].pass=l;var p=a.$("input[rel="+j+"]");if(l){s.show();p.hide()}else{s.hide();p.show().val(h)}z(t,u,j);p.addClass(u)};$(".loading",t).show();switch(j){case "username":o.hide();if(i)i=false;if(g==""){h="\u5fc5\u586b";a.runStats("log",1)}else if(/^[a-z]/i.test(g))if(/[^a-z\d]$/i.test(g)){h="\u5b57\u6bcd\u6216\u6570\u5b57\u7ed3\u5c3e";a.runStats("log",4)}else if(/[^a-z\d_]/i.test(g)){h=
"\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf";a.runStats("log",5)}else if(/^[a-z\d_]{6,18}$/i.test(g))if(g==a.getVal("password",true)){h="\u4e0d\u80fd\u4e0e\u5bc6\u7801\u76f8\u540c";a.runStats("log",8)}else{if(!i&&(m||a.progress.chkUser==0)){a.progress.chkUser=1;f=true;e.html("<i></i><a class='close' target='_self' href='"+a.aHref+"'>X</a>\u7528\u6237\u540d\u5df2\u88ab\u6ce8\u518c\uff0c\u9009\u62e9\u4ee5\u4e0b:").hide();a.$(".recomUserName .close").click(function(){a.$(".recomUserName").hide()});
a.get("checkUserName","userName="+g,function(){a.progress.chkUser=0;var p=nie.util.urs.data[a.dataID].reComUserName;switch(p.statusCode){case 200:if(p["163"].exist){a.runStats("log",2);h="\u5df2\u88ab\u6ce8\u518c";if(typeof p["163"].name=="object"){$.each(p["163"].name,function(){var B=this.toString();$("<a/>",{Class:"choose",href:a.aHref,target:"_self",html:"<input type='radio' />"+B,click:function(){a.runStats("log",7);i=false;e.hide();setTimeout(function(){s.val(B).trigger(a.inpEvent)},0)}}).appendTo(e)});
e.slideDown("fast");i=true}}else l=true;break;default:h=p.info}u=(k[j].pass=l)?"right":"error";z(t,u,j);$.isFunction(r)&&r();v()})}}else{h="6\uff5e18\u4e2a\u5b57\u7b26";a.runStats("log",6)}else{h="\u5fc5\u987b\u5b57\u6bcd\u5f00\u5934";a.runStats("log",3)}break;case "password":if(g==a.getVal("username",true)){a.runStats("log",21);h="\u4e0d\u80fd\u4e0e\u7528\u6237\u540d\u76f8\u540c"}else if(/^[\S]{6,16}$/i.test(g)){l=true;m=a.getO("repassword",true);m.val()!=""&&m.trigger(a.inpEvent)}else{a.runStats("log",
20);h="\u5fc5\u987b6\uff5e16\u4e2a\u5b57\u7b26"}break;case "repassword":if(g==a.getO("password",true).val()&&g!="")l=true;else{a.runStats("log",30);h="\u91cd\u590d\u5bc6\u7801\u4e0d\u4e00\u81f4"}break;case "captcha":if(g==""){h="\u5fc5\u586b";a.runStats("log",71)}else if(g.length!=4){h="\u9a8c\u8bc1\u7801\u4e0d\u5339\u914d";a.runStats("log",72)}else if(m||a.progress.verCap==0){f=true;a.progress.verCap=1;a.get("Verifier","promark="+a.promark+"&id="+a.id+"&val="+g,function(){a.progress.verCap=0;switch(nie.util.urs.data[a.dataID].verCapResult){case 0:l=
true;break;case 1:h="\u9a8c\u8bc1\u7801\u4e0d\u5339\u914d";a.runStats("log",70);y();break;case 2:h="\u5931\u8d25\u6b21\u6570\u591a\uff0c\u8bf7\u7a0d\u5019\u8f93\u5165";a.runStats("log",73)}u=(k[j].pass=l)?"right":"error";var p=a.$("input[rel="+j+"]");if(l){s.show();p.hide()}else{s.hide();p.show().val(h)}z(t,u,j);p.addClass(u);$.isFunction(r)&&r();v()})}}f||v()})};return a}};