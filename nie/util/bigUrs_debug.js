/**
* nie
* @module nie
**/
/**
*	����ע��<br>
*	@class urs
*	@static
*	@namespace nie.util
*	@author	Lam
*	<a href="nie.use.html"><font color="red">nie.useģ�飺</font></a>nie.util.urs<br>
*$(function(){
*	nie.use(["nie.util.urs"],function(){		
*		 var urs = nie.util.urs.create();
*		 urs.logStats=true;//�Ƿ���Ҫע��logͳ��
*		 urs.pvStats=true;//�Ƿ���Ҫpvͳ��
*		 
*		 //	���ע��ϵͳ������Ϣ�����ĺ���
*		 //	Ĭ��Ϊurs.regComplete=urs.showMsg;*		 
*		 urs.regComplete=function(o){

*			 o.result;//ע���Ƿ�ɹ���ֵΪ��true, false
*			 o.msg;//����������ע���ʧ�ܵ�������������"���������Ϣ�����ϱ�׼���磺�û��������벻����ͬ���û���������������ַ����û��������볤��Ӧ����6λ��"
*			 o.url;//ע��ɹ�����Ҫ��תҳ���url�����û����תҳ��ֵΪnull*			 
*			 o.data;//���������ص���������

*			 urs.getVal("username");//��ȡ�û���д����Ϣ������Ϊinput nameֵ��
*			 urs.getUrl();//��ȡע��ɹ�����Ҫ��תҳ���url�����û����תҳ��ֵΪnull��
*			 urs.clearMsg();//����ѷ�װ�õ���Ϣ���������Ϣ
*			 //��ʾ��װ�õ���Ϣ��
*			 urs.showMsg(o);
*			 //�����Զ���
*			 urs.showMsg({
*				 result:o.result,         //����
*				 msg:o.msg,         	  //����
*				 url:o.url,               //����
*				 data:o.Data,             //����
*				 confirmFn:function(){}, //ѡ����д�������Ϣ��"ȷ��"��ť�����ĺ���
* 				 username:o.username,	  //�û���
*				 is163Mail:o.is163Mail,   //�Ƿ����������
*				 mailUrl:o.mailUrl		  //�����½url
*			 });
*			 urs.hideMsg();//���ط�װ�õ���Ϣ��		 
*		 }
*		 
*		 urs.init();
*	});		
*});
* type:
* 0:����session id
* 1:�û���.û����д(Ϊ��)
* 2:�û���.�ѱ�ע��
* 3:�û���.������ĸ��ͷ
* 4:�û���.������ĸ�����ֽ�β
* 5:�û���.��������ĸ�����֡��»���
* 6:�û���.����6��18���ַ�
* 7:�û���.��ѡ���Ƽ��û���
* 8:�û���.�û�����������ͬ
* 10:����.�ַ����Ϸ�Ҫ��
* 11:����.�û�����������ͬ
* 20:�ظ�����.�ַ����Ϸ�Ҫ��
* 30:��ʵ����.�ַ����Ϸ�Ҫ��
* 40:֤������.�ַ����Ϸ�Ҫ��
* 50:��ϵ�绰.�ַ����Ϸ�Ҫ��
* 60:��֤��.��ƥ��
* 61:��֤��.û����д(Ϊ�գ�
* 62:��֤��.����4λ�ַ�
* 90:�ύע��(���ע�ᰴť��س�)
* 100:ǰ��ҳ����֤ȫͨ��
* 101:����������ע��.ע��ɹ�(state==200&&state==201)
* 102:ע��ɹ����ѵ��"ȷ��"��ť
* 103:����������ע��.ע�᲻�ɹ�(state!=200&&state!=201)
* 104:����������ע��.ע�᲻�ɹ�(state<=10)
* 105:ע�᲻�ɹ����ѵ��"ȷ��"��ť
* 106:�������ˣ���֤�����
* 107:�������ˣ����sid������
* 108:�������ˣ����get�������ϸ�
**/
nie.util.urs={ 
  /*
	  ��������������
	  data:[{
		  id:String,//session id
		  engine:{			
			  keyWord:Sring,//�ؼ���
			  encode:int,//�ؼ��ֱ���
			  engineID:int,//��������ID
			  refer:String//��·
		  },
		  reComUserName:{
		  },
		  verCapResult:String,
		  result:{
			  reDirectUrl:String			  
		  }
	  }]
  */
  data:[],
  create:function(){
	  var urs={};
	  urs.aHref="javascript:void(0);";
	  urs.tips={
		  username:{
			  txt:"����д���ĳ�������",
			  "class":"inp-tips"
		  }
	  };
	  /*
	   * ���� 
	   * 0����
	   * 1:������
	   */
	  urs.progress={
		      loadID:0,
			  loadCap:0,
			  chkUser:0,
			  verCap:0,
			  "submit":0
	  };
	  urs.domainReg=new RegExp("^([\\w-\\.]+)@([\\w-]+(?:\\.[\\w-]+){1,3})$");	 
	  urs.regData={
			  username:String,
			  mailUrl:String,
			  is163Mail:false
	  };	  
	  /*
	  urs.total163mail=6;
	  urs.domain=["163.com","126.com","yeah.net","vip.163.com","vip.126.com","188.com",
	              "qq.com","gmail.com","sina.com","sohu.com","sogou.com","139.com","wo.com.cn",
	              "21cn.com","hotmail.com","foxmail.com","yahoo.cn","yahoo.com.cn"];
	  urs.mailUrl=["mail.163.com","mail.126.com","mail.yeah.net","vip.163.com","vip.126.com","mail.188.com",
	               "mail.qq.com","gmail.com","mail.sina.com.cn","mail.sohu.com","mail.sogou.com","139.com","mail.wo.com.cn",
	               "mail.21cn.com","hotmail.com","foxmail.com","mail.yahoo.cn","mail.yahoo.cn"];
	  */
	  /*
	  urs.domain=["163.com","qq.com","gmail.com","hotmail.com","sina.com","sohu.com","yahoo.com.cn"];
	  urs.mailUrl=["mail.163.com","mail.qq.com","gmail.com","hotmail.com","mail.sina.com.cn","mail.sohu.com","mail.yahoo.com.cn"];
	  urs.total163mail=1;
	  */	    
  	  
	  /* ����[a,b,c]
	   * a:mail url�ַ���
	   * 	1:self
	   * 	2:"mail."+self
	   * b:�Ƿ����ײ�Ʒ
	   * 	0:��
	   * 	1:�� 
	   * c:�Ƿ���ʾ������
	   * 	0:��
	   * 	1����	  
	   */
	  urs.mail={
			  /*��������ʾ*/
			  "163.com":[2,1,1],
			  "qq.com":[2,0,1],
			  "gmail.com":[1,0,1],
			  "hotmail.com":[1,0,1],
			  "sina.com":[2,0,1],
			  "sohu.com":[2,0,1],
			  "yahoo.com.cn":[2,0,1],
			  /*��������ʾ*/			  
			  "126.com":[2,1,0],
			  "yeah.net":[2,1,0],
			  "live.com":[2,0,0],
			  "yahoo.cn":[2,0,0],
			  "sogou.com":[2,0,0],
			  "139.com":[1,0,0],
			  "wo.com.cn":[2,0,0],
			  "21cn.com":[2,0,0],
			  "vip.163.com":[1,1,0],
			  "vip.126.com":[1,1,0],
			  "188.com":[2,1,0],			  
			  "foxmail.com":[1,0,0]			  
	  };
	  urs.sendMail=function(){
		  var data=urs.regData;
		  if(!data.is163Mail){		  	  
		  	  urs.get("sendActiveMail","userName="+data.username+"&promark="+urs.promark,function(){
		  		var resultData=nie.util.urs.data[urs.dataID].sendMailResult;
		  		if(resultData && resultData.status && resultData.info){
		  			alert(resultData.info);
		  		}
		  	  });
		  }		  
	  };
	  urs.r = function(){return new Date().getTime();};	 
	  urs.server="http://weburs.ku.163.com/";
	  urs.serverPath=urs.server+"quickReg/";
	  urs.get=function(file,pamas,callBack){
		  $.include(urs.serverPath+file+"?charset=gb2312&output=js&ver=3&dataID="+urs.dataID+"&promark="+urs.promark+"&"+pamas+"&logStats="+urs.logStats+"&"+urs.r()+"&.js",callBack);
	  };
	  //ע���ټ���¼����
	  urs.log=function(type){
		  if(urs.stats.log) new Image().src=urs.serverPath+"log?type="+type+"&promark="+urs.promark+"&logStats="+urs.logStats;
	  };
	  //��¼����
	  urs.logImg=function(src){
		new Image().src = urs.serverPath+src+"&"+urs.r();
	  };
	  urs.id="";//session id
	  urs.dataID=nie.util.urs.data.length;
	  nie.util.urs.data.push({});
	  urs.form=$(".NIE-quickReg");	
	  urs.reComUserName={};//�Ƽ��û���
	  urs.showCaptcha=false;
	  urs.result={};//�ύע�ᣬ���ط��������	  
	  urs.stats={
		  log:false,		//�Ƿ���Ҫ��¼ע��log
		  pv:false,			//�Ƿ�ͳ�Ƽ�¼
		  clickSugRegBtn:false	//�Ƿ�ͳ�� --> û�����䣿����ע��İ�ť
	  };	  
	  urs.promark="";//promarkֵ	  
	  urs.capWidth=100;
	  urs.capHeight=32;
	  urs.msgID={		  
		  msg:"NIE-quickReg-msg",//msg id			 
		  title:"NIE-quickReg-msg-title",//msg����
		  closeBtn:"NIE-quickReg-closeBtn",//�رհ�ť
		  bg:"NIE-quickReg-msg-bg",//msg����id			 
		  con:"NIE-quickReg-msg-con"//��Ϣ����ID			 	   
	  };
	  //msg layer
	  urs.msgSize={
		"large":{
			w:490,
			h:270
		},
		"small":{
			w:320,
			h:160
		},
		current:{}
	  };	  
	  urs.msgO={		  
		  msg:function(){return $("#"+urs.msgID.msg);},
		  title:function(){return $("#"+urs.msgID.title);},
		  closeBtn:function(){return $("#"+urs.msgID.closeBtn);},
		  bg:function(){return $("#"+urs.msgID.bg);},
		  con:function(){return $("#"+urs.msgID.con);}		  
	  };
	  /*
		  ����������Դ����
		  �����Ƿ�����������·
	  */	  
	  urs.fromSearch=false;	  
	  urs.engineInit=function(refer){
		var se = nie.util.sEngine;	
		if(se.isEngineRefer){
			var info = se.cookie.info,
				pages=0,//;��ҳ����
				type=1,
				engineReg=[
					//1:gbk,2:utf-8
	                //1:baidu
	                ["^http://[^/]+.baidu.com\/s\?","wd",1],
	                //2:google
	                ["^http[s]?://[^/]+.google.com(.hk)?/search","q",2],
	                //3:soso
	                ["^http://[^/]+.soso.com/q","w",1],
	                //4:sogou
	                ["^http://[^/]+.(sogou|sogo).com/web","query",1],
	                //5:youdao
	                ["^http://[^/]+.youdao.com/search","q",2],
	                //6:yahoo
	                ["^http://[^/]+.yahoo.com/(s\?|search)","p",2],
					//7:bing
					["^http://[^/]+.bing.com/search\?","q",2]
	            ];
			if(info.length>3 && info[0]>1){
				//����������·��� 1��ֱ����·��2�������·
				type=2;
				refer = info[2];
				pages = info[0];
			}
	        for(var i=0,l=engineReg.length;i<l;i++){
		      var engine = engineReg[i];
	          if(new RegExp(engine[0],"i").test(refer)){
	              var a = document.createElement("a");
	              a.href=refer;
	              var r=a.search.match(new RegExp("[&\?]"+engine[1]+"=([^&]+)","i")),
					  chkTCN=1;				  
	              if(r.length==2){
					  var encode=engine[2];
					  switch(i){
						  //baidu 
						  case 0:
							  if(/[&\?]ie=utf-8/i.test(refer)) encode=2;
							  break;
						  //google 
						  case 1:
							  if(/[&\?]ie=(gbk|gb2312)/i.test(refer)) encode=1;
							  break;
						  //soso
						  case 2:
							  if(/[&\?]ie=utf-8/i.test(refer)) encode=2;
							  break;
						  //youdao
						  case 4:
							  if(/[&\?]ue=(gbk|gb2312)/i.test(refer)) encode=1;
							  chkTCN=0;
							  break;
						  //yahoo
						  case 5:
							  //�й��Ż�
							  if(/^http:\/\/one.cn.yahoo.com\//i.test(refer)){
								  
							  }
							  //�����Ż�
							  else{								 
								  if(/[&\?]ei=(gbk|gb2312)/i.test(refer)) encode=1;
								  chkTCN=0;
							  }							  						      
							  break;
						  //bing
						  case 6:
						  	  chkTCN=0;
	             		  	  break;
					  }
	                  nie.util.urs.data[urs.dataID].engine={					  
						   keyWord:encodeURIComponent(r[1]),//�ؼ���
						   "encode":encode,//�ؼ��ֱ���
				 		   engineID:i+1,//��������ID		  
						   "refer":encodeURIComponent(refer),//��·
						   "type":type,//����������·��� 1��ֱ����·��2�������·
						   "pages":pages//;��ҳ����
						   //"chkTCN":chkTCN//�Ƿ��鷱���ֱ��� 1:true 0:false���磺%EFw��
					  };
					  //return true;
	              }
	          }
		    }
		}
        //return false;
      };
	  //��ȡע��ɹ������תurl��ַ
	  urs.getUrl=function(){
		  var url = nie.util.urs.data[urs.dataID].result.reDirectUrl;
		  if(url!=null){								 
			  url+=((url.indexOf("?")>0)?"&":"?")+"username="+urs.getVal("username");
		  }
		  return url;
	  };
	  urs.getMsgHTML=function(){		  
		  var data = urs.regData,
		  	  html ="<div class='not163MailBox'>"
		  		  	+"<h1>��лע�ᣡ�����������ʺš�</h1>"
		  			+"<h3>������¼���� <b>"+data.username+"</b> ����ȷ���ʼ��������ɡ�</h3>"
		  			+((data.mailUrl)?"<h2><a class='btn' href='"+data.mailUrl+"' target='_blank'>�����鿴�ʼ�</a></h2>":"<h2>����������ȷ���ʼ�</h2>")
		  			+"<ul class='tips'><li>��û���յ�ȷ���ʼ���"
		  			+"<ol>"
		  			+"<li>���Ե�����ʼ��������ʼ�Ŀ¼�����ҿ���</li>"
		  			+"<li>�ٴ�<a href='#' target='_self' class='sendMailBtn'>����ע��ȷ���ʼ�</a>��</li>"
		  			+"<li>����ط�ע��ȷ���ʼ���Ȼû���յ�����<a class='reReg' target='_self' href='#'>����ע��</a>��</li>"
		  			+"</ol></li></ul>"
		  			+"</div>";	
		  $(".not163MailBox a.sendMailBtn").live("click",urs.sendMail);
		  $(".not163MailBox a.reReg").live("click",function(){
			  window.location.reload();
		  });
		  return html;		  			
	  };
	  //���ý����
	  urs.clearMsg=function(){
		  urs.msgO.con().empty();
	  };
	  urs.showMsg=function(args){
		if(typeof args=="object"){
		  var chk=function(name){return (typeof args[name]!="undefined")?args[name]:null;},
		      regResult=chk("result"),		      			  
			  url=chk("url"),
			  confirmFn=chk("confirmFn"),
			  username=chk("username"),
			  is163Mail=chk("is163Mail"),
			  mailUrl=chk("mailUrl"),
			  msg=chk("msg"),
			  status=chk("status"),
     		  //��������Ƿ����
		 	  win=$(window),
			  w=win.width(),
			  h=win.height(),
			  target="_self";			
		  urs.msgSize.current=(!is163Mail&&regResult)?urs.msgSize["large"]:urs.msgSize["small"];
		  //����
		  if(urs.msgO.bg().length==0){
			$("<div>",{
				id:urs.msgID.bg,
				css:{					
					top:win.scrollTop()+"px",
					left:win.scrollLeft()+"px",
					width:w+"px",
					height:h+"px"
				}
			}).appendTo($(document.body));
		  }
		  else urs.msgO.bg().show();
		  //��Ϣ��
		  if(urs.msgO.msg().length==0){
			$("<div>",{
				id:urs.msgID.msg,
				css:{
					top:(h-urs.msgSize.current.h)/2+win.scrollTop()+"px",
					left:(w-urs.msgSize.current.w)/2+win.scrollLeft()+"px",
					width:urs.msgSize.current.w+"px"
				},
				html:'<div id="'+urs.msgID.title+'">ע����Ϸ�ʺ�</div><a id="'+urs.msgID.closeBtn+'" href="'+urs.aHref+'">X</a><div id="'+urs.msgID.con+'"></div>'
			}).appendTo($(document.body));			
			urs.msgO.closeBtn().live("click",urs.hideMsg);
		  }
		  //���ý����
		  else urs.clearMsg();

		  //ע��ɹ�
		  if(regResult&&url!=null){					
			  target="_blank";
			  url+=((url.indexOf("?")>0)?"&":"?")+"username="+username;
		  }
		  else{ 	
			  url=urs.aHref;
		  }
		  urs.showCaptcha=false;		  
		  if(regResult!=null){
			if(regResult && !is163Mail && status==202){
				urs.msgO.con().html(urs.getMsgHTML());
				$(".not163MailBox").attr("id","not163Mail");
			}
			else{				
				if(regResult){
					urs.msgO.con().addClass("right").html("<p class='info'>ע��ɹ���</p>");
				}				
				else{
					urs.msgO.con().addClass("error").html("<p class='info'>�����ˣ�</p><p class='reason'>"+msg+"</p>");
				}
				$("<a>",{					
					href:url,
					"target":target,
					text:"ȷ ��",
					"class":"btn",
					click:function(){
						if(regResult) urs.log(102);
						else urs.log(105);
						urs.hideMsg();
						if($.isFunction(confirmFn)) confirmFn();				
					}
				}).appendTo(urs.msgO.con());
			}
		  }
		}
	  };
	  urs.reBindEvt=function(o,fn){
		  o.unbind("blur").blur(fn);
	  };
	  urs.hideMsg=function(){
		//idTypeSel.show();
		urs.msgO.bg().hide();
		urs.msgO.msg().hide();
	  };
	  urs.regComplete=urs.showMsg;
	  urs.$=function(o){return urs.form.find(o);};
	  //��ȡ�û���д��object
	  urs.getO=function(name,mustGet){
		  var result = null,name=name.toLowerCase();
		  if(mustGet||!/^(password|repassword)$/.test(name)){
			var tag = (name=="idtype")?"select":"input";
			result=urs.$(tag+"[name="+name+"]");
		  }
		  return result;
	  };
	  //��ȡ�û���д��Ϣ
	  urs.getVal=function(name,mustGet){
		  var o =urs.getO(name,mustGet);
		  return (o!=null)?$.trim(o.val()):null;
	  };	
	  urs.init=function(){	
	    //alert(urs.regComplete);			
		var idTypeSel,hideObj,capBox=urs.$(".captcha-wrap"),list,	  
			//ͳ�ƺ���
		  	runStats=function(type){			  
			  if(urs.stats[type]) {
				  var _run=function(type){new Image().src = urs.server+"stats/urs.v3."+type+"?promark="+urs.promark+"&"+urs.r();}
				  switch(type){
				  	case "clickSugRegBtn":
				  		urs.form.find(".sugRegBtn").click(function(){_run("clickSugRegBtn");});
				  		break;
				  	default:
				  		_run(type);
				  		break;
				  }
			  }
		  	},
			//ע�Ὺʼʱ�䣨��ȡsession id��ʼ)
			startTime=0,
			//��ʾ��Ϣ��ʧʱ��			
			//time=2000,					 
			//��Ҫ��֤��input {val,pass,timer}
			inpData={username:{},password:{},repassword:{},promark:{},captcha:{}/*,realname:{},idno:{},phone:{}*/},  		 
			sInps="",sInps2="",		 
			//�û�������ʱ��ʾ
			//userNameTips,userNameTipsTimer,
			//�û��������Ƽ�
			suggestDomain,
			//�û�������ʱ��ʾ��ʧʱ��
			//time2=2000,
			//mouseover�û���ʱ��ʾ��ʧʱ��
			//time3=3000,
			//���"ע��"����ʱ������ʾ����ʾ"�ύ�����У����Ժ�..."
			time4=3000,	
			allowSubmit=true,//�Ƿ������ύ ��Э��username enter��
			inpFn=function(e,asy_onComplete){				
				var self = (typeof e=="string")?urs.getO(e,true):$(this),
				    name=self.attr("name"),
					val=$.trim(self.val()),
					infoObj=urs.$("label[for="+name+"]"),
					pass=false,
					asy=false,
					Class="",
					info="",
				//�첽ʱ�����ִ�к���
				asy_func = function(){
					if($.isFunction(asy_onComplete)){			
						asy_onComplete();
					}	
					showResult();			
				},	
				showResult=function(){
					Class=pass?"right":"error";
					inpData[name].pass=pass;
					var o = urs.$("input[rel="+name+"]");
					if(!pass){					
						self.hide();
						o.show().val(info);
					}
					else{
						self.show();
						o.hide();					
					}
					showInfo(infoObj,Class,name);
					o.addClass(Class);
				};
				debug.pass(e.type+":"+name+" inpFn");
				//show loading		
				infoObj.removeClass("error right").addClass("loading");
				switch(name){			
					case "username":
					  debug.pass("���username");
					  var hasChk=true;
					  if(val==""){					  
						info="����";
						urs.log(1);
					  }
					  else if(!urs.domainReg.test(val)){
						  info="�����������ַ";
						  urs.log(9);
					  }
					  else if(val==urs.getVal("password",true)){
						  info="������������ͬ";
						  urs.log(8);
					  }
					  //����Ƿ�����ͨ��֤
					  else{						  
						  var r=val.match(urs.domainReg);
						  if(r && r.length==3 && urs.mail[r[2]] && urs.mail[r[2]][1]==1){
							  var tmpVal = val.replace("@"+r[2],"");
						  	  if(!/^[a-z]/i.test(tmpVal)){
								info="������ĸ��ͷ";	
								urs.log(3);
							  }
							  else if(/[^a-z\d]$/i.test(tmpVal)){					
								info="��ĸ�����ֽ�β";	
								urs.log(4);
							  }
							  else if(/[^a-z\d_]/i.test(tmpVal)){
								info="��ĸ�����֡��»���";
								urs.log(5);
							  }
							  else if(!/^[a-z\d_]{6,18}$/i.test(tmpVal)){					
								info="6��18���ַ�";	
								urs.log(6);
							  }
							  else hasChk=false;
						  }						 
						  else hasChk=false;
					  }
					  if(!hasChk&&urs.progress.chkUser==0){
						  	  urs.progress.chkUser==1;
							  asy=true;//�첽 				
	                          urs.get("checkUserName","userName="+val+"&promark="+urs.promark+"&id="+urs.id+"&val="+val,function(){
	                        	  urs.progress.chkUser==0;
	                        	  //debug.warn("username�첽��ȡ���");
	                        	  var result=nie.util.urs.data[urs.dataID].checkUserName;
	                              switch(result.status){
	                                  case 104:
	                                	if(result.subStatus==0) pass = true;
	                                	else info="�ʺŴ��ڴ�����״̬";
	                                    break;                                 
	                                  default:
	                                	info=result.info;
	                                    break;
	                              }
	                              inpData[name].pass=pass;					  
	                              Class=pass?"right":"error";					  
	                              var o = urs.$("input[rel="+name+"]");
	                              if(!pass){					
	                                  self.hide();
	                                  o.show().val(info);
	                              }
	                              else{
	                                  self.show();
	                                  o.hide();					
	                              }
	                              showInfo(infoObj,Class,name);
	                              o.addClass(Class);
	                              asy_func();
	                          });						  					  
					  }
					  break;
				  case "password":
					  if(val==urs.getVal("username",true)){
						  urs.log(11);
						  info="�������û�����ͬ";						  
					  }
					  else if(/^\S{6,16}$/.test(val)){						  				  	
						  pass=true;
						  var o=urs.getO("repassword",true);
						  if(o.val()!="") o.triggerHandler("blur");
					  }
					  else{
						  urs.log(10);
						  info="����6��16���ַ�";				
					  }
					  break;
				  case "repassword":				
					  if(val==urs.getVal("password",true)&&val!="") pass=true;
					  else{	
						  urs.log(20);
						  info="�ظ����벻һ��";
					  }
					  break;				
				  case "captcha":
					  if(val==""){
						  info="����";
						  urs.log(61);
					  }
					  else if(val.length!=4){
						  info="��֤�벻ƥ��";
						  urs.log(62);
					  }
					  else if(urs.progress.verCap==0){
							asy=true;//�첽	 	
							urs.progress.verCap=1;
							urs.get("Verifier","promark="+urs.promark+"&id="+urs.id+"&val="+val,function(){
									urs.progress.verCap=0;
									debug.warn("captcha�첽��ȡ���");								
									switch(nie.util.urs.data[urs.dataID].verCapResult){
										case 0:
										  pass = true;							
										  break;
										case 1:
										  info="��֤�벻ƥ��";
										  loadCapImg();
										  break;
										case 2:
										  info="ʧ�ܴ����࣬���Ժ�����";
										  break;
									}
									inpData[name].pass=pass;					  
									Class=pass?"right":"error";					  
									var o = urs.$("input[rel="+name+"]");
									if(!pass){					
										self.hide();
										o.show().val(info);
									}
									else{
										self.show();
										o.hide();					
									}
									showInfo(infoObj,Class,name);
									o.addClass(Class);
									asy_func();							
							});
					  }					  
					  break;
				  /*
				  case "realname":
					  if(/^[^\|\+\)\(\*&\^%\$#@!~=\\\}\{\]\[:;\?\>\<\/]{1,26}$/.test(val)) pass=true;
					  else{
						  urs.log(30);						
						  info="�����������ַ�";
					  }
					  break;				
				  case "idno":
					  switch(urs.getVal("idtype")){
					  	case "0":
						  if(verifyIdCard(val)) pass = true;
						  else{
							  urs.log(40);
							  info="����ȷ";
						  }
						  break;
					  	default:
						  if(val.length>=6&&val.length<=18) pass=true;						
						  else{
							  urs.log(40);
							  info="6-18λ�ַ�";
						  }
						  break;
					  }
					  break;
				  case "phone":
					  if(/^[\d-]{5,20}$/.test(val)) pass=true;						
					  else{
						  urs.log(50);
						  info='5-20λ,���ֻ�"-"';
					  }
					  break;
				  */
				}			
				if(!asy) showResult();
			},			
			loadCapImg=function(){
			  if(urs.progress.loadCap==0){
				  urs.progress.loadCap=1;
				  capBox.empty();				  
				  $(new Image()).css({width:urs.capWidth,height:urs.capHeight})
				  .click(loadCapImg)
				  .load(function(){			
					  urs.progress.loadCap=0;
					  urs.showCaptcha=true;					  
					  capBox.append($(this));					  
				  })
				  .error(function(){
					  capBox.removeClass("loading").text("ͬһ��IPˢ�¹���");
				  })
				  .bind('readystatechange',function(){					
					  // ���ͼƬ�Ѿ����������������
					  if(this.readyState=="complete"){
						  $(this).trigger("load").unbind("load");
						  return;// ֱ�ӷ��أ������ٴ���onload�¼�
					  }
				  })
				  .bind("abort",function(){
					  // $(this).attr("src",urs.serverPath+"Img?id="+urs.id+"&");
					   return;					  
				  })
				  .attr("src",urs.serverPath+"Img?id="+urs.id+"&"+urs.r());
			  }
			},
			loadCaptcha=function(obj){
			  if(urs.progress.loadID==0){
				urs.progress.loadID=1;
				startTime=urs.r();			  
				urs.get("IdCreator","promark="+urs.promark,function(){				  
				  urs.progress.loadID=0;
				  urs.id=nie.util.urs.data[urs.dataID].id;
				  urs.$("#captchaBtn").attr({href:urs.aHref,target:"_self"}).click(loadCapImg);
				  if(!urs.showCaptcha){			
					  loadCapImg();
				  }
				  if(obj&&$.isFunction(obj.onComplete)) {				
					  obj.onComplete();
				  }
				});
			  }
			},
			allInpFocus=function(e){	
			  debug.pass("allInpFocus");			  			  
			  if(!urs.showCaptcha) {
					hideObj.fadeIn("fast");
					loadCaptcha({onComplete:function(){				
						urs.showCaptcha=true;				  
					}});
			  }			  
			  if(typeof e!="undefined"){
				  var self =$(this);
				  debug.error(typeof e);
				  var tips=urs.tips[self.attr("name")];
				  debug.pass("allInpFocus:"+e.type+self.attr("name"));
				  if(tips&&self.val()==tips.txt){
					 self.val("").removeClass(tips["class"]);
				  }	
				  debug.pass(e.type+":"+self.attr("name"));
			  }			  
			},
			showInfo=function(o,Class,name){			 
				var Class2=((Class=="right")?"error":"right");
				o.removeClass("loading "+Class2).addClass(Class);
				//$(".loading,."+Class2,o).hide();
				//$("."+Class,o).show();
				//o.show();			 
			};			
			urs.promark=urs.getVal("promark");
			//Ԥ����loadingͼƬ
			(function(){
				var v=arguments;
				for(var i=0,l=v.length;i<l;i++){
					new Image().src="http://res.nie.netease.com/comm/js/nie/util/urs/"+v[i];
				}
			})("loading.gif","loading2.gif","icon."+($.browser.msie?"gif":"png"));
			//ͳ��pv
			runStats("pv");
			//ͳ��pv
			runStats("clickSugRegBtn");
			//����Ƿ���ͨ��֤
			/*
			$.cookie("test","fuck",{expires:7, path:'/', domain:'.163.com', secure:true });
			var getcookie=function(name)//ȡcookies����        
			{
			    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			     if(arr != null) return unescape(arr[2]);return null;

			}
			debug.pass("cookie test:"+getcookie("test"));
			debug.pass("cookie NTES_SESS:"+getcookie("NTES_SESS"));
			debug.pass("cookie NTES_PASSPORT:"+getcookie("NTES_PASSPORT"));
			if($.cookie("NTES_SESS")||$.cookie("NTES_PASSPORT")){
				urs.$(".hasUser").show();
			}*/
			//ͳ������������Դ
			var refer=document.referrer;
			urs.engineInit(refer);
			if(typeof nie.util.urs.data[urs.dataID].engine!="undefined") {
				var engine =nie.util.urs.data[urs.dataID].engine;				
				//urs.logImg("fromSearch?promark="+urs.promark+"&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID+"&chkTCN="+engine.chkTCN+"&refer="+encodeURIComponent(refer));
				urs.get("fromSearch","type="+engine.type+"&pages="+engine.pages+"&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID+"&refer="+engine.refer,
						function(){
							urs.fromSearch=true;
				});
			}			
			$(".NIE-quickReg-loading").hide();
			urs.form.show();
			//idTypeSel=urs.getO("idtype");
			hideObj = urs.$(".hideItem");						
			list=urs.$(".recomUserName");
			suggestDomain=urs.$(".suggestDomain");

			//input��ɫtips
			for(var i in urs.tips){
				urs.getO(i,true).addClass(urs.tips[i]["class"]).val(urs.tips[i].txt);
			}
			//
			$.each(inpData,function(i){
				this.val =null;
				this.pass = null;
				sInps+="input[name="+i+"],";
				sInps2+="input[rel="+i+"],";
				//add label for input
				urs.$("label[for="+i+"]").html("<i class='loading'></i><i class='error'></i><i class='right'></i>");
			});
			sInps=sInps.substring(0,sInps.length-1);
			sInps2=sInps2.substring(0,sInps2.length-1);
	
			//idtype bind		  		  
			/*
			$.each(["���֤","ѧ��֤","����֤","����"],function(i){			 
				idTypeSel.append("<option value='"+i+"'>"+this+"</option>");
			});		    
			*/			
			//bind urs.form event
			urs.form.attr("action","#").submit(function(){
				debug.pass("form�ύ��"+((allowSubmit)?"����":"������"));
				if(!allowSubmit){
					return false;
				}
				else{
					urs.reBindEvt(urs.getO("username",true),inpFn);
				}
				urs.log(90);
				var asy_done=0,//�첽�������
					asy_total = 2;//��Ҫ����첽������ ��ʱ�첽����У��û�������֤�롣						
				inpData["promark"].pass=(urs.promark!="");//�ж�promark�Ƿ���ϱ�׼
				if(!inpData["promark"].pass){
					alert("ע��ʧ�ܣ�promark������");
					return;
				}			  
				else if(!urs.getO("agree").attr("checked")){
					alert("��ͬ�⡶���׷�������͡���˽Ȩ�����͸�����Ϣ�������ߡ�");
					return;
				}				
				var asy_onComplete=function(){
					asy_done++;
					debug.warn("�첽�����:"+asy_done+",��Ҫ�������"+asy_total);
					if(asy_done==asy_total){				 
						for(var i in inpData){							
							if(!inpData[i].pass){
								urs.getO(i,true).triggerHandler("focus");							  
								return;
							}
						}
						//��֤�ɹ�
						urs.log(100);
						
						var gotResult=hasWating=false;
						//var hasShowLoading=false;						
						setTimeout(function(){							
							if(!gotResult){								
								//hasShowLoading=true;
								hasWating=true;
								urs.showMsg({									
									msg:"�ύ�����У����Ժ�...",
									url:null
								});
								//msgO.txt().text("�ύ�����У����Ժ�...");							 
							}
						},time4);						
						var params=function(arr){
								var result="";
								for(var i=0,l=arr.length;i<l;i++){
									var name=arr[i],
										o =urs.getO(name,true),
										v=(o.length==0)?"":o.val();							  
									if(/^(realname|idno|activityid1|activityid2)$/.test(name)){
										v=encodeURIComponent(encodeURIComponent(v));
									}
									result +="&"+name+"="+v;
								};
								return result;
							},
							username=urs.getVal("username",true),
							str="id="+urs.id+"&username="+username+params(["captcha","password","mobile"/*,"realname","idno","phone","idtype"*/,"promark","activityid1","activityid2"]);
						//if(typeof nie.util.urs.data[urs.dataID].engine!="undefined"){
						if(urs.fromSearch){
							var engine =nie.util.urs.data[urs.dataID].engine;
							//str += "&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID+"&chkTCN="+engine.chkTCN+"&refer="+engine.refer;
							str += "type="+engine.type+"&pages="+engine.pages+"&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID+"&refer="+engine.refer;
						}			
						if(urs.progress.submit==0){
							urs.progress.submit=1;
							urs.get("submit",str,function(){
									urs.progress.submit=0;
									if(startTime!=0) urs.logImg("regTime?time="+(urs.r()-startTime)+"&promark="+urs.promark);
									startTime=0;								
									gotResult=true;					  		
									urs.hideMsg();
									urs.regData={
											"username":username,
											is163Mail:false,
											mailUrl:null
									};
									urs.msgSize.current={};
									var Data=nie.util.urs.data[urs.dataID].result,
										 num=Data.num;
									if(num==2) loadCapImg();
									
									if(hasWating){
										urs.clearMsg();		
										urs.hideMsg();
									}
									/*
									for(var i=0,l=urs.domain.length;i<l;i++){
										var reg = new RegExp("^(?:[\\w-\\.]+)@"+urs.domain[i]+"$");
										if(reg.test(username)){										
											if(i<urs.total163mail) {
												urs.msgSize.current=urs.msgSize.is163;
												urs.regData.is163Mail=true;											
											}
											else urs.msgSize.current=urs.msgSize.not163;
											urs.regData.mailUrl="http://"+urs.mailUrl[i];										
											break;
										}
									}
									*/
									var r=username.match(urs.domainReg);
									if(r && r.length==3 && urs.mail[r[2]]){
										var userName_mail=urs.mail[r[2]];
										//�Ƿ����ײ�Ʒ
										if(userName_mail[1]==1){
											urs.msgSize.current=urs.msgSize.is163;
											urs.regData.is163Mail=true;		
										}
										else urs.msgSize.current=urs.msgSize.not163;									
										urs.regData.mailUrl="http://"+((userName_mail[0]==1)?"":"mail.")+r[2].toLowerCase();
									}
									if($.isFunction(urs.regComplete)) urs.regComplete({									
																		   result:(num==200||num==201||num==202),
																		   status:num,
																		   msg:Data.msg,
																		   url:Data.reDirectUrl,
																		   data:Data,
																		   username:username,
																		   is163Mail:urs.regData.is163Mail,
																		   mailUrl:urs.regData.mailUrl
																	   });
								}
							);
					  }
					}
				};
				var chkAll=function(){
				  debug.pass("chkAll");
				  allInpFocus();
				  $.each(inpData,function(i){
					  debug.pass("chkAll:"+i);
					  if(i!="promark"){
						  debug.pass(i+":blur");
						  urs.getO(i,true).triggerHandler("blur",[asy_onComplete]);	
					  }
				  });
				};
				chkAll();	
			});
			//bind username event
			var userNameData={
					exist:false,//�Ƿ����û���������ʾ
					currentIndex:1,//��ǰѡ���
					total:0,//�Ƽ�����		
					blur:function(e){		                    	  
                  	  $("li.hover",suggestDomain).triggerHandler("click");
                	  suggestDomain.hide();
                	  allowSubmit=true;               	  
                	  debug.pass("ֱ��ִ��inpFn���username");           		  
            		  inpFn("username");
					},
					keyUp:function(e){
						  var num=e.which;					  
						  if(num!=40&&num!=38&&num!=13){
							  userNameData.total=0;
					          suggestDomain.show().empty().html("<li class='title'>��ѡ���������</li>");
			                  var self=$(this),
			                  	  selfVal=self.val(),
			                      reg = selfVal.match(new RegExp("^([\\w-\\.]+)[@]?")),
			                      domains=[],
			                      addSuggest=function(text,index){
			                          $("<li>",{
			                              click:function(){	                            	 	 
			                            	  self.val($(this).text());	                                  
			                                  suggestDomain.hide();	                               
			                              },
			                              "text":text
			                          }).hover(function(){	                        	  
			                        	  var self=$(this);
			                        	  userNameData.currentIndex=index;
			                        	  $("li",self.parent()).removeClass("hover");
			                        	  self.addClass("hover");	                        	  
			                            })
			                          .appendTo(suggestDomain);						
			                      };
			                  if(reg){
			                	  userNameData.currentIndex=1;
			                	  userNameData.total=0;
			                	  for(var i in urs.mail){
			                		  if(urs.mail[i][2]==1) domains.push(reg[1]+"@"+i);
			                		  else break;
			                      }
			                	  for(var i=0,l=domains.length;i<l;i++){
			                		  var v=domains[i];
			                		  if(v.toLowerCase().indexOf(selfVal.toLowerCase())==0){
			                			addSuggest(v,userNameData.total);
			                		  	userNameData.total++;
			                		  }
		                		  }
			                	  /*
			                	  if(reg[2]){
			                		  for(var i in urs.mail){		
			                			  var v = reg[1]+"@"+i;
			                			  if(urs.mail[i][2]==1&& v.indexOf(selfVal)==0){
			                				  addSuggest(v,userNameData.total);
				                              userNameData.total++;
			                			  }
			                			  else break;
			                		  }
			                	  }
			                	  else{
			                		  for(var i in urs.mail){		                			  
			                			  if(urs.mail[i][2]==1){
			                				  addSuggest(reg[1]+"@"+i,userNameData.total);
				                              userNameData.total++;
			                			  }
			                			  else break;
			                		  }
			                	  }
			                	  */
			                	  /*
			                	  if(reg[1]){
			                		  for(var i=0;i<l;i++){						
				                          domains.push(reg[1]+"@"+urs.domain[i]);				
				                      }
				                      for(var i=0;i<l;i++){	
				                          var r = new RegExp("^"+selfVal,"i");
				                          if(r.test(domains[i])){	                        	  
				                              addSuggest(domains[i],userNameData.total);
				                              userNameData.total++;
				                          }
				                      }			  
			                	  }
			                	  else{
				                	  for(var i=0;i<l;i++){
				                    	  userNameData.total++;
				                          addSuggest(selfVal+"@"+urs.domain[i],i);						
				                      }
			                	  }
			                	  */
			                  }
			                  if(userNameData.total==0) {
			                	  allowSubmit=true;
			                	  //debug.pass("��Ϊ���Ƽ�����������form�ύ������");
			                	  userNameData.exist=false;
			                	  urs.reBindEvt(self,userNameData.blur);
			                      suggestDomain.hide();
			                  }
			                  else{			
			                	  allowSubmit=false;
			                	  //debug.pass("��Ϊû���Ƽ�����������form�ύ��������");
			                	  userNameData.exist=true;
			                      //self.unbind("blur");
			                      self.triggerHandler("focus");
			                      urs.reBindEvt(self,userNameData.blur);
			                      $("li:eq(1)",suggestDomain).addClass("hover");
			                  }	  
						  }
			        }, 
		            keyDown:function(e){	
		            	//debug.pass("keyDown�¼�,exist:"+userNameData.exist+",total:"+userNameData.total);
		            	if(userNameData.exist){
			            	 var num=e.which,
				            	 selSuggest=function(){	        
				         		 	$("li",suggestDomain).removeClass("hover");
				         	 	 	$("li:eq("+userNameData.currentIndex+")",suggestDomain).addClass("hover");			         	 	 	
				                 };
		                     switch(num){
	                             case 40:	                            	 
	                                 if(userNameData.currentIndex+1<=userNameData.total)userNameData.currentIndex++;
	                                 selSuggest();
	                                 break;
	                             case 38:
	                                 if(userNameData.currentIndex!=1) userNameData.currentIndex--;
	                                 selSuggest();
	                                 break;
	                             //enter
	                             case 13:
	                            	 debug.pass("enter�¼�");
	                            	 debug.pass("suggestDomain display��"+suggestDomain.css("display"));
	                            	 if(suggestDomain.css("display")=="block"){
	                            		 var self=$(this);
			                             //self.unbind("blur");
			                             debug.pass("ȡ��username blur�¼�");
			                             $("li.hover",suggestDomain).triggerHandler("click");
			                             suggestDomain.hide();      
			                             allowSubmit=false;		                             
			                             debug.pass("����form�ύ��������");
	                            	 }
	                            	 else{
	                            		 allowSubmit=true;		                             
			                             debug.pass("����form�ύ������"); 
	                            	 }
	                            	 break;	                             
	                         }	                         
		            	}
		            }
			};
			//bind input info event
			urs.$(sInps2).focus(function(e){				
				var self=$(this),
					name=self.attr("rel");
				debug.pass("������ʾ��:"+name+e.type+"�¼�");
				self.hide();
				urs.getO(name,true).show().trigger("focus");//.triggerHandler("select");
			});
			//bind each input event		 
			urs.$(sInps).focus(allInpFocus).blur(inpFn);
			urs.getO("username").keyup(userNameData.keyUp).keydown(userNameData.keyDown);
	};
	return urs;
  }
};