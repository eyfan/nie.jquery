(function(h){var i=function(a,c){switch(a.constructor){case Array:this.parseData(a);break;case String:this.parseURL(a,c);break;default:this.parseXML(a)}};h.extend(i.prototype,{debug:!0,log:function(){this.debug&&console.log.apply("",arguments)},unique:function(a){var c=[],d=0,e=a.length;a:for(;d<e;d++){for(var b=d+1;b<e;b++)if(a[b]==a[d])continue a;c[c.length]=a[d]}return c},dataTemp:[],cycleType:{NONE:"none",DAY:"day",WEEK:"week",MONTH:"month"},dataItemTemplate:{name:"",kind:"",text:"",url:"",type:0,
week:null,day:null,date:null,fullDate:null,weekEntity:[],dayEntity:[],dateEntity:[]},objectMatch:function(a,c,d){return jQuery.grep(a,function(a){if(a[c]==null||a[c]=="")return!1;for(var b=0;b<a[c].length;b++)if(d==a[c][b])return!0;return!1})},fullDateMatch:function(a,c,d){return jQuery.grep(a,function(a){if(a[c]==null)return!1;for(var b=0;b<a[c].length;b++){var f=new Date(d),g=new Date(a[c][b]);if(f.getDate()==g.getDate()&&f.getMonth()==g.getMonth()&&f.getYear()==f.getYear())return!0}return!1})},
searchByCycleType:function(a,c){return jQuery.grep(a,function(a){return a.type==c})},searchCycle:function(a,c,d){return jQuery.grep(a,function(a){return a[c]==null?!1:jQuery.inArray(""+d,a[c])!=-1})},dateStringPaser:function(){for(var a=Array.prototype.slice.call(arguments,0),c=[],d=0;d<a.length;d++){var e=a[d].toString();if(e.indexOf("+")>-1)c=c.concat(this.dateFromToPaser(e));else{var e=e.split(/\/|-/g),b=null;switch(e.length){case 3:b=new Date(e[2],parseInt(e[0])-1,e[1]),c.push(b.getTime())}}}return c},
dateFromToPaser:function(a){var c=/\/|-/g,d=a.split("+"),a=d[1],d=d[0].split(c),c=a.split(c);targetDay=null;tArray=[];frDate=new Date(d[2],parseInt(d[0])-1,d[1]);toDate=new Date(c[2],parseInt(c[0])-1,c[1]);c=Math.round((toDate.getTime()-frDate.getTime())/864E5)+1;curDate=new Date(frDate.getTime());for(a=0;a<c;a++)tArray.push(curDate.getTime()),curDate.setDate(curDate.getDate()+1);return tArray},serializeDateByWeek:function(a){a=new Date(a);a.setDate(1);var c=a.getDay();a.setMonth(a.getMonth()+1);
a.setDate(0);for(var a=a.getDate(),d=[],e=[],b=1;b<=a;b++){e=e.concat([b]);if(c==0||b==a)d=d.concat([e]),e=[];++c==7&&(c=0)}return d},indexWeekOfMonth:function(a){for(var c=this.serializeDateByWeek(a),a=(new Date(a)).getDate(),d=0;d<c.length;d++)for(var e=0;e<c[d].length;e++)if(a==c[d][e])return d;return-1},parseStringToArray:function(a,c){return a.split(c||",")},parseStringToEntity:function(a,c,d,e){var b=a.split(e||","),a=[],d=0,c=c||7;if(jQuery.inArray("odd",b)!=-1)for(d=1;d<=c;d+=2)a=a.concat([d]);
else if(jQuery.inArray("even",b)!=-1)for(d=2;d<=c;d+=2)a=a.concat([d]);else if(jQuery.inArray("all",b)!=-1)for(d=1;d<=c;d++)a=a.concat([d]);b=b.concat(a);b=jQuery.grep(b,function(a){return/\d+/.test(a)?!0:!1});b=this.unique(b);jQuery.each(b,function(a){b[a]=parseInt(this)});return b.sort(function(a,b){return a-b})},_searchByDate:function(){for(var a=Array.prototype.slice.call(arguments,0),c=a[0],d=[],a=a.slice(1),d=d.concat(this.searchByCycleType(c,"day")),e=0,b=a.length;e<b;e++)var f=a[e],d=d.concat(this.fullDateMatch(c,
"fullDate",f)),g=new Date(parseInt(f)),h=this.indexWeekOfMonth(f),f=jQuery.grep(c,function(a){return a.type!="month"?!1:a.week!=null&&jQuery.inArray(h+1,a.weekEntity)!=-1&&jQuery.inArray(g.getDay(),a.dayEntity)!=-1||a.date!=null&&jQuery.inArray(g.getDate(),a.dateEntity)!=-1?!0:!1}),i=jQuery.grep(c,function(a){return a.type!="week"?!1:a.day!=null&&jQuery.inArray(g.getDay(),a.dayEntity)!=-1?!0:!1}),d=d.concat(f,i);return this.unique(d)},searchByDate:function(){return this._searchByDate.apply(this,[this.dataTemp].concat(Array.prototype.slice.call(arguments,
0)))},subByDate:function(a,c,d){c=Math.round((c-a)/864E5);c+=c>0?1:-1;return this.sliceByDate(a,c,d)},sliceByDate:function(a,c,d){var e=Math.abs(c||7),b=[],a=new Date(a);e>365&&alert("max date!");c<0&&a.setDate(a.getDate()-e+1);for(c=0;c<e;c++){var f=null,g=a.getTime();b.push(f=this.searchByDate(g));typeof(d=="function")&&d(c,f,g);a.setDate(a.getDate()+1)}return b},toStringDay:function(a){return unescape("\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt((a.constructor==Date?a:new Date(a)).getDay()))},
toStringDate:function(a){a=a.constructor==Date?a:new Date(a);return a.getFullYear()+"\u5e74"+(a.getMonth()+1)+"\u6708"+a.getDate()+"\u65e5"},parseData:function(a){for(var c=0,d=a.length;c<d;c++){var e=a[c];if(e.actived==="1"){var b={};jQuery.extend(b,this.dataItemTemplate);jQuery.extend(b,e);b._week=b.week;b._day=b.day;b._date=b.date;b._fullDate=b.fullDate;if(b.week!=null)b.weekEntity=this.parseStringToEntity(b.week,5),b.week=this.parseStringToArray(b.week);if(b.day!=null){b.dayEntity=this.parseStringToEntity(b.day,
6);if(b.day.indexOf("all")!=-1)b.dayEntity=b.dayEntity.concat([0]);b.day=this.parseStringToArray(b.day)}if(b.date!=null)b.dateEntity=this.parseStringToEntity(b.date,31),b.date=this.parseStringToArray(b.date);if(b.fullDate!=null)b.fullDate=this.dateStringPaser.apply(this,this.parseStringToArray(b.fullDate));this.dataTemp=this.dataTemp.concat([b])}}return this},parseXML:function(a){for(var a=jQuery(a).find("item"),c=0,d=a.size();c<d;c++){var e=a.eq(c);if(jQuery.trim(e.attr("actived"))=="1"){var e={name:jQuery.trim(e.find("name").text()),
kind:jQuery.trim(e.find("kind").text()),text:jQuery.trim(e.find("text").text()),url:jQuery.trim(e.find("url").text()),type:jQuery.trim(e.attr("type"))||"none",week:jQuery.trim(e.attr("week"))||null,day:jQuery.trim(e.attr("day"))||null,date:jQuery.trim(e.attr("date"))||null,fullDate:jQuery.trim(e.attr("fullDate"))||null},b={};jQuery.extend(b,this.dataItemTemplate);jQuery.extend(b,e);b._week=b.week;b._day=b.day;b._date=b.date;b._fullDate=b.fullDate;if(b.week!=null)b.weekEntity=this.parseStringToEntity(b.week,
5),b.week=this.parseStringToArray(b.week);if(b.day!=null){b.dayEntity=this.parseStringToEntity(b.day,6);if(b.day.indexOf("all")!=-1)b.dayEntity=b.dayEntity.concat([0]);b.day=this.parseStringToArray(b.day)}if(b.date!=null)b.dateEntity=this.parseStringToEntity(b.date,31),b.date=this.parseStringToArray(b.date);if(b.fullDate!=null)b.fullDate=this.dateStringPaser.apply(this,this.parseStringToArray(b.fullDate));this.dataTemp=this.dataTemp.concat([b])}}return this},parseURL:function(a,c){h.ajax({url:a,type:"get",
dataType:"xml",success:function(a){return function(e){a.parseXML(e);typeof c=="function"&&c(a)}}(this)});return this}});h.calendarpicker=function(a,c){return new i(a,c)};h.calendarpicker.uuid=(new Date).getTime();h.calendarpicker.version="1.2"})(jQuery);