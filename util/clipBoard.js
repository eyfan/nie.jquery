(function(a){a.extend({closeClipBoard:function(){a("#NIE-flashcopier").fadeOut()},clipBoard_callBack:function(){},clipBoard:function(b,c){switch(typeof c){case "object":if(typeof c.callBack=="function")a.clipBoard_callBack=c.callBack;break;case "string":a.clipBoard_callBack=function(){alert(c)}}if(window.clipboardData)typeof b!=String&&(b=b.toString()),window.clipboardData.setData("Text",b)&&a.clipBoard_callBack();else{var d=a.flash.create({id:"NIE-flashcopier-flash",swf:"http://res.nie.netease.com/comm/js/util/clipBoard(not4ie).swf",
width:166,height:120,allowScriptAccess:"always",flashvars:{url:encodeURIComponent(b),callBack:"$.clipBoard_callBack"}}),e=a(window);a("#NIE-flashcopier").length==0?a("<div>",{id:"NIE-flashcopier",html:d}).appendTo(a(document.body)):a("#NIE-flashcopier").html(d).fadeIn();a("#NIE-flashcopier").css({position:"absolute",zIndex:99,top:e.height()/2+e.scrollTop(),width:"100%","text-align":"center"})}}})})(jQuery);