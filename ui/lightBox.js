$.include("http://res.nie.netease.com/comm/js/ui/lightBox/base.css");
(function(b){b.fn.lightBox=function(a){function n(){var c=a.controlBar==="bottom"?'<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"></a></div></div></div></div>':'<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"></a></div></div></div><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"></a></div></div></div></div>';
b("body").append(c);c=g();b("#jquery-overlay").css({backgroundColor:a.overlayBgColor,opacity:a.overlayOpacity,width:c[0],height:c[1]}).fadeIn();var f=i();b("#jquery-lightbox").css({top:f[1]+c[3]/10,left:f[0]}).show();b("#jquery-overlay,#jquery-lightbox").click(function(){j()});b("#lightbox-loading-link,#lightbox-secNav-btnClose").click(function(){j();return!1});b(window).resize(function(){var a=g();b("#jquery-overlay").css({width:a[0],height:a[1]});var c=i();b("#jquery-lightbox").css({top:c[1]+a[3]/
10,left:c[0]})})}function k(){b("#lightbox-loading").show();a.fixedNavigation?b("#lightbox-image,#lightbox-image-details-currentNumber").hide():b("#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-image-details-currentNumber").hide();b("#lightbox-container-image-data-box").css("opacity",0);var c=new Image;c.onload=function(){b("#lightbox-image").attr("src",a.imageArray[a.activeImage][0]);o(c.width,c.height);c.onload=function(){};var f=g(),d=i(),e=Math.max(b("#lightbox-image").height(),
c.height),h=f[3]-e>0?(f[3]-e)/2:0;b("#jquery-lightbox").css({top:d[1]+h,left:d[0]});b(window).resize(function(){var a=g();b("#jquery-overlay").css({width:a[0],height:a[1]});a=i();b("#jquery-lightbox").css({top:a[1]+h,left:a[0]})})};c.src=a.imageArray[a.activeImage][0]}function o(c,f){var d=b("#lightbox-container-image-box").width(),e=b("#lightbox-container-image-box").height(),h=c+a.containerBorderSize*2,g=f+a.containerBorderSize*2;d-=h;e-=g;b("#lightbox-container-image-box").animate({width:h,height:g},
a.containerResizeSpeed,function(){p()});d==0&&e==0&&(b.browser.msie?m(250):m(100));b("#lightbox-container-image-data-box").css({width:c});b("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css({height:f+a.containerBorderSize*2})}function p(){b("#lightbox-loading").hide();b("#lightbox-image").fadeIn(function(){b("#lightbox-container-image-data-box").animate({opacity:1},"slow");b("#lightbox-image-details-caption").hide();a.imageArray[a.activeImage][1]&&b("#lightbox-image-details-caption").html(a.imageArray[a.activeImage][1]).show();
a.imageArray.length>1&&b("#lightbox-image-details-currentNumber").html(a.txtImage+" "+(a.activeImage+1)+" "+a.txtOf+" "+a.imageArray.length).show();q()});if(a.imageArray.length-1>a.activeImage)objNext=new Image,objNext.src=a.imageArray[a.activeImage+1][0];if(a.activeImage>0)objPrev=new Image,objPrev.src=a.imageArray[a.activeImage-1][0]}function q(){b("#lightbox-nav").show();var c=function(c){b("#lightbox-nav-btn"+c).show().unbind().removeClass("lightbox-nav-close").attr("title",a["txt"+c]).bind("click",
function(){c=="Prev"?a.activeImage--:a.activeImage++;k();return!1})},f=function(c){b("#lightbox-nav-btn"+c).show().unbind().addClass("lightbox-nav-close").attr("title",a["txt"+(c=="Prev"?"First":"Last")]).bind("click",function(){j();return!1})};a.imageArray.length>1&&(a.activeImage!=0?c("Prev"):f("Prev"),a.activeImage!=a.imageArray.length-1?c("Next"):f("Next"));r()}function r(){b(document).keydown(function(c){c==null?(keycode=event.keyCode,escapeKey=27):(keycode=c.keyCode,escapeKey=c.DOM_VK_ESCAPE);
key=String.fromCharCode(keycode).toLowerCase();(key==a.keyToClose||key=="x"||keycode==escapeKey)&&j();if((key==a.keyToPrev||keycode==37)&&a.activeImage!=0)a.activeImage-=1,k(),b(document).unbind();if((key==a.keyToNext||keycode==39)&&a.activeImage!=a.imageArray.length-1)a.activeImage+=1,k(),b(document).unbind()})}function j(){b("#jquery-lightbox").remove();b("#jquery-overlay").fadeOut(function(){b("#jquery-overlay").remove()});b("select").css({visibility:"visible"})}function g(){var a,b;window.innerHeight&&
window.scrollMaxY?(a=window.innerWidth+window.scrollMaxX,b=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(a=document.body.scrollWidth,b=document.body.scrollHeight):(a=document.body.offsetWidth,b=document.body.offsetHeight);var d,e;if(self.innerHeight)d=document.documentElement.clientWidth?document.documentElement.clientWidth:self.innerWidth,e=self.innerHeight;else if(document.documentElement&&document.documentElement.clientHeight)d=document.documentElement.clientWidth,
e=document.documentElement.clientHeight;else if(document.body)d=document.body.clientWidth,e=document.body.clientHeight;pageHeight=b<e?e:b;pageWidth=a<d?a:d;return arrayPageSize=[pageWidth,pageHeight,d,e]}function i(){var a,b;if(self.pageYOffset)b=self.pageYOffset,a=self.pageXOffset;else if(document.documentElement&&document.documentElement.scrollTop)b=document.documentElement.scrollTop,a=document.documentElement.scrollLeft;else if(document.body)b=document.body.scrollTop,a=document.body.scrollLeft;
return arrayPageScroll=[a,b]}function m(a){var b=new Date;do var d=new Date;while(d-b<a)}var a=jQuery.extend({overlayBgColor:"#000",overlayOpacity:0.8,fixedNavigation:!1,containerBorderSize:10,containerResizeSpeed:400,txtImage:"\u56fe\u7247",txtOf:"\u5171",txtFirst:"\u8fd9\u662f\u7b2c\u4e00\u5f20",txtLast:"\u5df2\u662f\u6700\u540e\u4e00\u5f20",txtNext:"\u70b9\u51fb\u67e5\u770b\u4e0b\u4e00\u5f20",txtPrev:"\u70b9\u51fb\u67e5\u770b\u4e0a\u4e00\u5f20",keyToClose:"c",keyToPrev:"p",keyToNext:"n",imageArray:[],
activeImage:0,controlBar:"bottom"},a),l=this;return this.unbind("click").click(function(){b("select").css({visibility:"hidden"});n();a.imageArray.length=0;a.activeImage=0;if(l.length==1)a.imageArray.push([this.getAttribute("href"),this.getAttribute("title")]);else for(var c=0;c<l.length;c++)a.imageArray.push([l[c].getAttribute("href"),l[c].getAttribute("title")]);for(;a.imageArray[a.activeImage][0]!=this.getAttribute("href");)a.activeImage++;k();return!1})}})(jQuery);