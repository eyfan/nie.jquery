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
*	<a href="nie.use.html"><font color="red">nie.useģ�飺</font></a>nie.util.bigUrs<br>
*$(function(){
*	nie.use(["nie.util.bigUrs"],function(){		
*		 var bigUrs = nie.util.bigUrs.create();
*		 bigUrs.logStats=true;//�Ƿ���Ҫע��logͳ��
*		 bigUrs.pvStats=true;//�Ƿ���Ҫpvͳ��
*		 
*		 //	���ע��ϵͳ������Ϣ�����ĺ���
*		 //	Ĭ��ΪbigUrs.regComplete=this.showMsg;*		 
*		 bigUrs.regComplete=function(o){

*			 o.result;//ע���Ƿ�ɹ���ֵΪ��true, false
*			 o.msg;//����������ע���ʧ�ܵ�������������"���������Ϣ�����ϱ�׼���磺�û��������벻����ͬ���û���������������ַ����û��������볤��Ӧ����6λ��"
*			 o.url;//ע��ɹ�����Ҫ��תҳ���url�����û����תҳ��ֵΪnull*			 
*			 o.data;//���������ص���������

*			 bigself_urs.getVal("username");//��ȡ�û���д����Ϣ������Ϊinput nameֵ��
*			 bigUrs.getUrl();//��ȡע��ɹ�����Ҫ��תҳ���url�����û����תҳ��ֵΪnull��
*			 bigUrs.clearMsg();//����ѷ�װ�õ���Ϣ���������Ϣ
*			 //��ʾ��װ�õ���Ϣ��
*			 bigUrs.showMsg(o);
*			 //�����Զ���
*			 bigUrs.showMsg({
*				 result:o.result,         //����
*				 msg:o.msg,         	  //����
*				 url:o.url,               //����
*				 data:o.Data,             //����
*				 confirmFn:function(){}, //ѡ����д�������Ϣ��"ȷ��"��ť�����ĺ���
* 				 username:o.username,	  //�û���
*				 is163Mail:o.is163Mail,   //�Ƿ����������
*				 mailUrl:o.mailUrl		  //�����½url
*			 });
*			 this.hideMsg();//���ط�װ�õ���Ϣ��		 
*		 }
*		 
*		 this.init();
*	});		
*});
* monitor:
* 1:������������Ϣ����ִ��js���غ���regComplete
* 
* log:
* 0:����session id
* 1:�û���.û����д(Ϊ��)
* 2:�û���.�ѱ�ע��
* 3:�û���.������ĸ��ͷ
* 4:�û���.������ĸ�����ֽ�β
* 5:�û���.��������ĸ�����֡��»���
* 6:�û���.����6��18���ַ�
* 7:�û���.��ѡ���Ƽ��û���
* 8:�û���.�û�����������ͬ
* 9:�û���.���������ַ
* 10:�û���.�ʺŴ��ڴ�����״̬
* 11:�û���.�ʺ��������⣬������ע��
* 12:�ʺŴ��ڣ�������ע��
* 20:����.�ַ����Ϸ�Ҫ���û���.�ʺŴ��ڴ�����״̬��
* 21:����.�û�����������ͬ
* 30:�ظ�����.�ַ����Ϸ�Ҫ���ظ����벻һ�£�
* 40:��ʵ����.�ַ����Ϸ�Ҫ��
* 50:֤������.�ַ����Ϸ�Ҫ��
* 60:��ϵ�绰.�ַ����Ϸ�Ҫ��
* 70:��֤��.��ƥ��
* 71:��֤��.û����д(Ϊ�գ�
* 72:��֤��.����4λ�ַ�
* 73:��֤��.ʧ�ܴ����࣬���Ժ�����
* 74:��֤��.�����һ����֤��.�����֤��ͼƬ
* 75:��֤��.�����һ����֤��.�������
* 90:�ύע��(���ע�ᰴť��س�)
* 100:ǰ��ҳ����֤ȫͨ��
* 101:���������ؽ��,ע��ɹ�
* 102:���������ؽ��,ע��ʧ��
* 200:��Ҫ������֤���
* 201:��Ҫ������֤�룬�ύע���
**/
(function($){
	nie.util.bigUrs=nie.util.bigUrs||{ 
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
		  var self_urs=this;
		  this.aHref="javascript:void(0);";
		  this.aData={href:self_urs.aHref,target:"_self"};
		  this.tips={
			  username:{
				  txt:"�� name@example.com",
				  "class":"inp-tips"
			  }
		  };
		  /*
		   * ���
		   * 1��ר��ҳ�棺�̰�
		   * 2��reg����
		   */
		  this.type=1;
		  /*
		   * �û������
		   * 0�������û���
		   * 1�����������˻�
		   */
		  //�Ƿ�Ĭ����ʾ��֤��ͼƬ
		  this.isShowCap=false;	 
		  this.userNameType=0;
		  /*
		   * ���� 
		   * 0����
		   * 1:������
		   */
		  self_urs.progress={
			      loadID:0,
				  loadCap:0,
				  chkUser:0,
				  verCap:0,
				  "submit":0
		  };
		  this.domainReg=new RegExp("^([\\w-\\.]+)@([\\w-]+(?:\\.[\\w-]+){1,3})$");	 
		  this.regData={
				  username:String,
				  mailUrl:String,
				  is163Mail:false
		  };	  
		  /*
		  this.total163mail=6;
		  this.domain=["163.com","126.com","yeah.net","vip.163.com","vip.126.com","188.com",
		              "qq.com","gmail.com","sina.com","sohu.com","sogou.com","139.com","wo.com.cn",
		              "21cn.com","hotmail.com","foxmail.com","yahoo.cn","yahoo.com.cn"];
		  this.mailUrl=["mail.163.com","mail.126.com","mail.yeah.net","vip.163.com","vip.126.com","mail.188.com",
		               "mail.qq.com","gmail.com","mail.sina.com.cn","mail.sohu.com","mail.sogou.com","139.com","mail.wo.com.cn",
		               "mail.21cn.com","hotmail.com","foxmail.com","mail.yahoo.cn","mail.yahoo.cn"];
		  */
		  /*
		  this.domain=["163.com","qq.com","gmail.com","hotmail.com","sina.com","sohu.com","yahoo.com.cn"];
		  this.mailUrl=["mail.163.com","mail.qq.com","gmail.com","hotmail.com","mail.sina.com.cn","mail.sohu.com","mail.yahoo.com.cn"];
		  this.total163mail=1;
		  */	    
	  	  
		  /* ����[a,b,c,d]
		   * a:mail url�ַ���
		   * 	1:self
		   * 	2:"mail."+self
		   * b:�Ƿ����ײ�Ʒ
		   * 	0:��
		   * 	1:�� 
		   * c:�Ƿ���ʾ������
		   * 	0:��
		   * 	1����	  
		   * d:ע�Ὠ���ʼ���ʾ������
		   */
		  this.mail={
				  /*������Ĭ����ʾ*/
				  "163.com":[2,1,1,1],
				  "qq.com":[2,0,1],
				  "sina.com":[2,0,1],
				  "126.com":[2,1,1,1],
				  "vip.qq.com":[2,0,1],   
				  /*��������չ��ʾ*/		
				  "yahoo.com.cn":[2,0,0],
				  "sohu.com":[2,0,0],
	  			  "gmail.com":[1,0,0],			 
				  "hotmail.com":[1,0,0],
				  "yeah.net":[2,1,0,1],
				  "sina.cn":[2,0,0],
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
		  this.sendMail=function(){
			  var data=self_urs.regData;
			  if(!data.is163Mail){		  	  
			  	  self_urs.get("sendActiveMail","userName="+data.username,function(){
			  		var resultData=nie.util.bigUrs.data[self_urs.dataID].sendMailResult;
			  		if(resultData && resultData.status && resultData.info){
			  			alert(resultData.info);
			  		}
			  	  });
			  }		  
		  };
		  this.r = function(){return new Date().getMilliseconds();};	 
		  this.server="http://weburs.ku.163.com/";
		  this.serverPath=this.server+"quickReg/";
		  this.get=function(file,pamas,callBack){
			  $.include(self_urs.serverPath+file+"?output=js&ver=3&dataID="+self_urs.dataID+"&id="+self_urs.id+"&promark="+self_urs.promark+"&"+pamas+"&"+self_urs.r()+"&.js",callBack);
		  };
		  this.id=null;//session id
		  this.dataID=nie.util.bigUrs.data.length;
		  nie.util.bigUrs.data.push({});
		  this.form=$(".NIE-quickReg");
		  this.showCaptcha=false;
		  this.hasTouch=false;
		  this.result={};//�ύע�ᣬ���ط��������
	      
		  this.stats={
			  regTime:false,    //�Ƿ��¼ע����̺�ʱʱ��
			  monitor:false,   //�Ƿ��أ�������ע���Ƿ���������
			  log:true,		//�Ƿ���Ҫ��¼ע��log
			  pv:false,			//�Ƿ�ͳ�Ƽ�¼
			  clickSugRegBtn:false,	//�Ƿ�ͳ�� --> û�����䣿����ע��İ�ť
			  //for uv
			  uvID:(function(){
					  var cn="nie.util.bigUrs.uvID",
				  	  	  cv=$.cookie(cn);
					  if(cv) return cv;
					  else {
						  var val = self_urs.r();
						  $.cookie(cn,val,{ expires: 1, path: '/', domain:nie.config.site+".163.com"});
						  return val;
					  }
			  })()		  
		  };	
		  this.$img=function(){
			  var img = $(new Image());
			  img.bind('readystatechange',function(){					
				  // ���ͼƬ�Ѿ����������������
				  if(this.readyState=="complete"){						  
					  return;// ֱ�ӷ��أ������ٴ���onload�¼�
				  }
			  }).bind("abort",function(){			  
				   return;					  
			  });
			  return img;
		  }	 
		  //ͳ�ƺ���
		  this.runStats=function(type,code){
			  if(self_urs.stats[type]) {
				  var run=function(_type,_code){				  
					  //this.$img().attr("src",this.serverPath+"stats?3|"+this.stats.uvID+"|"+this.promark+"|"+_type+"|"+(typeof _code!="undefined"?_code:0)+"|"+this.r());				  
					  self_urs.$img().attr("src","http://click.ku.163.com/urs_stats?"+[
																					"promark="+self_urs.promark,
																					"type="+_type,
																					"code="+_code,
																					"r="+self_urs.r()
																					].join("&"));				  
				  };
				  switch(type){
				  	case "clickSugRegBtn":
				  		self_urs.form.find(".sugRegBtn").click(function(){run("clickSugRegBtn");});
				  		break;			  	
				  	default:
				  		run(type,code);
				  		break;
				  }
			  }
		  };
		  this.promark="";//promarkֵ	  
		  this.capSize={
			  //width:100,
			  height:32
		  };
		  this.msgID={		  
			  msg:"NIE-quickReg-msg",//msg id			 
			  title:"NIE-quickReg-msg-title",//msg����
			  closeBtn:"NIE-quickReg-closeBtn",//�رհ�ť
			  bg:"NIE-quickReg-msg-bg",//msg����id			 
			  con:"NIE-quickReg-msg-con",//��Ϣ����ID
			  reVerCap:"NIE-reVerImg",//����������֤������
			  reVerInp:"NIE-reVerInp"//����������֤��������
		  };
		  //msg layer
		  this.msgSize={
			"large":{
				w:490,
				h:270
			},
			"small":{
				w:320,
				h:160
			},
			//�ٴ���֤��

			"reVer":{
				w:240,
				h:230
			},
			current:{}
		  };	  
		  this.msgO={		  
			  msg:function(){return $("#"+self_urs.msgID.msg);},
			  title:function(){return $("#"+self_urs.msgID.title);},
			  closeBtn:function(){return $("#"+self_urs.msgID.closeBtn);},
			  bg:function(){return $("#"+self_urs.msgID.bg);},
			  con:function(){return $("#"+self_urs.msgID.con);},
			  reVerCap:function(){return $("#"+self_urs.msgID.reVerCap);},
			  reVerInp:function(){return $("#"+self_urs.msgID.reVerInp);}
		  };
		  //�л��û������0���������䣻1���������䣩����initǰִ��
		  this.setUserType=function(type){
			  var type0Class=".qr-username",
			  	  type1Class=".qr-createEmail",
			  	  hideClass="qrHide";
			  self_urs.userNameType=type;
			  self_urs.$(type?type0Class:type1Class).addClass(hideClass);
			  self_urs.$(type?type1Class:type0Class).removeClass(hideClass);
		  };
		  /*
			  ����������Դ����
			  �����Ƿ�����������·
		  */	  
		  this.fromSearch=false;	  
		  this.engineInit=function(refer){		 
			var	allow=false,//��������������
				pages=0,//;��ҳ����
				type=1,			
				engineReg=[
					//1:gbk,2:utf-8
	              //1:baidu
	              ["^http://[^/]+.baidu.com\/s\?","wd",1,1],
	            //1:baidu֪��������
	              ["^http://(?:news|zhidao).baidu.com\/q\?","word",1,1],
	              //2:google
	              ["^http[s]?://[^/]+.google.com(.hk)?/search","q",2,2],
	              //3:soso
	              ["^http://[^/]+.soso.com/q","w",1,3],
	              //4:sogou
	              ["^http://[^/]+.(sogou|sogo).com/web","query",1,4],
	              //5:youdao
	              ["^http://[^/]+.youdao.com/search","q",2,5],
	              //6:yahoo
	              ["^http://[^/]+.yahoo.com/(s\?|search)","p",2,6],
					//7:bing
					["^http://[^/]+.bing.com/search\?","q",2,7]
	              ],
	              se = nie.util.sEngine,
	              info=se.cookie.info;	
				if(se.isEngineRefer){
					allow=true;
				}
				else if(info.length>3 && info[0]>1){
					allow=true;
					//����������·��� 1��ֱ����·��2�������·
					type=2;				
					refer = info[2];
					pages = info[0];
				}
				if(allow){	
			        for(var i=0,l=engineReg.length;i<l;i++){
				      var engine = engineReg[i];
			          if(new RegExp(engine[0],"i").test(refer)){
			              var a = document.createElement("a");
			              a.href=refer;
			              var r=a.search.match(new RegExp("[&\?]"+engine[1]+"=([^&]+)","i"));						  				  
			              if(r&&r.length==2){
							  var encode=engine[2];
							  switch(i){
								  //baidu 
								  case 0:
									  if(/[&\?]ie=utf-8/i.test(refer)) encode=2;
									  break;
									//baidu 
								  case 1:
									  if(/[&\?]ie=utf-8/i.test(refer)) encode=2;
									  break;
								  //google 
								  case 2:
									  if(/[&\?]ie=(gbk|gb2312)/i.test(refer)) encode=1;
									  break;
								  //soso
								  case 3:
									  if(/[&\?]ie=utf-8/i.test(refer)) encode=2;
									  break;
								  //youdao
								  case 5:
									  if(/[&\?]ue=(gbk|gb2312)/i.test(refer)) encode=1;								  
									  break;
								  //yahoo
								  case 6:
									  //�й��Ż�
									  if(/^http:\/\/one.cn.yahoo.com\//i.test(refer)){
										  
									  }
									  //�����Ż�
									  else{								 
										  if(/[&\?]ei=(gbk|gb2312)/i.test(refer)) encode=1;									  
									  }							  						      
									  break;
								  //bing
								  /*
								  case 7:							  	  
			             		  	  break;
			             		  	  */
							  }
			                  nie.util.bigUrs.data[self_urs.dataID].engine={					  
								   keyWord:encodeURIComponent(r[1]),//�ؼ���
								   "encode":encode,//�ؼ��ֱ���
						 		   engineID:engineReg[i][3],//��������ID		  
								   "refer":encodeURIComponent(refer),//��·
								   "type":type,//����������·��� 1��ֱ����·��2�������·
								   "pages":pages//;��ҳ����
								   //"chkTCN":chkTCN//�Ƿ��鷱���ֱ��� 1:true 0:false���磺%EFw��
							  };
							  return true;
			              }
			          }
				    }
				}
		        //return false;
	      };
		  //��ȡע��ɹ������תurl��ַ
		  this.getUrl=function(){
			  var url = nie.util.bigUrs.data[self_urs.dataID].result.reDirectUrl;
			  if(url!=null){								 
				  url+=((url.indexOf("?")>0)?"&":"?")+"username="+self_urs.getVal("username");
			  }
			  return url;
		  };
		  this.getMsgHTML=function(){		  
			  var data = self_urs.regData,
			  	  html ="<div class='not163MailBox'>"
			  		  	+"<h1>��лע�ᣡ�����������ʺš�</h1>"
			  			+"<h3>������¼���� <b>"+data.username+"</b> ����ȷ���ʼ��������ɡ�</h3>"
			  			+((data.mailUrl)?"<h2><a class='btn' href='"+data.mailUrl+"' target='_blank'>�����鿴�ʼ�</a></h2>":"<h2>������������֤�ʼ�</h2>")
			  			+"<ul class='tips'><li>��û���յ���֤�ʼ���"
			  			+"<ol>"
			  			+"<li>���Ե�����ʼ��������ʼ�Ŀ¼�����ҿ���</li>"
			  			+"<li>�ٴ�<a href='"+self_urs.aHref+"' target='_self' class='sendMailBtn'>����ע����֤�ʼ�</a>��</li>"
			  			+"<li>����ط�ע����֤�ʼ���Ȼû���յ�����<a class='reReg' target='_self' href='"+self_urs.aHref+"'>����ע��</a>��</li>"
			  			+"</ol></li></ul>"
			  			+"</div>";	
			  $(".not163MailBox a.sendMailBtn").live("click",self_urs.sendMail);
			  $(".not163MailBox a.reReg").live("click",function(){
				  window.location.reload();
			  });
			  return html;		  			
		  };
		  //���ý����
		  this.clearMsg=function(){
			  this.msgO.con().empty();
		  };
		  this.showMsg=function(args){
			if(typeof args=="object"){
			  var chk=function(name){return (typeof args[name]!="undefined")?args[name]:null;},
			      regResult=chk("result"),		      			  
				  url=chk("url"),
				  confirmFn=chk("confirmFn"),
				  closeBtnFn=chk("closeBtnFn"),
				  username=chk("username"),
				  is163Mail=chk("is163Mail"),
				  mailUrl=chk("mailUrl"),
				  msg=chk("msg"),
				  status=chk("status"),
				  reVer=chk("reVer"),
	     		  //��������Ƿ����
			 	  win=$(window),
				  wWidth=win.width(),
				  wHeight=win.height(),
				  target="_self",
				  msgCss={
							top:(wHeight-self_urs.msgSize.current.h)/2+win.scrollTop(),
							left:(wWidth-self_urs.msgSize.current.w)/2+win.scrollLeft(),
							width:self_urs.msgSize.current.w
				  };
			  //����
			  if(self_urs.msgO.bg().length==0){
				$("<div>",{
					id:self_urs.msgID.bg,
					css:{					
						top:0,
						left:0,
						width:wWidth,
						height:$(document).height()
					}
				}).appendTo($(document.body));
			  }
			  else self_urs.msgO.bg().show();
			  //��Ϣ��
			  if(self_urs.msgO.msg().length==0){
				$("<div>",{
					id:self_urs.msgID.msg,
					css:msgCss,
					html:'<div id="'+self_urs.msgID.title+'">ע����Ϸ�ʺ�</div><a id="'+self_urs.msgID.closeBtn+'" href="'+self_urs.aHref+'">X</a><div id="'+self_urs.msgID.con+'"></div>'
				}).appendTo($(document.body));			
				this.msgO.closeBtn().live("click",function(){
					self_urs.runStats("log", 111);
					self_urs.hideMsg();
					if($.isFunction(closeBtnFn)) closeBtnFn();		
				});
			  }
			  //���ý����
			  else {
				  self_urs.msgO.msg().css(msgCss);
				  self_urs.clearMsg();
			  }
			  self_urs.msgO.msg().show();
			  //ע��ɹ�
			  if(regResult&&url!=null){					
				  target="_blank";
				  url+=((url.indexOf("?")>0)?"&":"?")+"username="+username;
			  }
			  else{ 	
				  url=self_urs.aHref;
			  }
			  self_urs.showCaptcha=false;		  
			  if(regResult!=null){
				var tmpCon=self_urs.msgO.con();
				tmpCon.removeClass("right error reVer");
				if(regResult && !is163Mail && status==202){
					tmpCon.html(self_urs.getMsgHTML());
					$(".not163MailBox").attr("id","not163Mail");
				}
				else{
					var addBtn=function(){
						$("<a>",{					
							href:url,
							"target":target,
							text:"ȷ ��",
							"class":"btn",
							click:function(){
								self_urs.runStats("log",110);
								//if(regResult) self_urs.runStats("log",102);
								//else self_urs.runStats("log",105);
								self_urs.hideMsg();
								if($.isFunction(confirmFn)) confirmFn();				
							}
						}).appendTo(tmpCon);
					};
					if(regResult){
						tmpCon.addClass("right").html("<p class='info'>ע��ɹ���</p>");
						addBtn();
					}		
					//��Ҫ����������֤��
					else if(reVer){		
						var submitID="NIE-reVerSubmit",
							btnID="NIE-reVerBtn";
						tmpCon.addClass("reVer").html("<p class='reVer-l1'>ֻ��һ��������ˣ�<br>����������һ����֤�������ע�᣺<br><input id='"+self_urs.msgID.reVerInp+"' /><br><span id='NIE-reVerImg'></span></p><p class='reVer-l2'>������� <a href='"+self_urs.aHref+"' id='"+btnID+"'>��һ��</a></p><p class='reVer-l3'><a id='"+submitID+"' href='"+self_urs.aHref+"' class='btn'>���ע��</a></p>");
						this.load_reVerCap();
						$("#"+btnID).click(self_urs.load_reVerCap);
						$("#"+submitID).click(function(){
							self_urs.send(true);
							self_urs.runStats("log",201);
						});
						self_urs.runStats("log",200);
					}
					else{						
						tmpCon.addClass("error").html("<p class='info'>�����ˣ�</p><p class='reason'>"+msg+"</p>");
						addBtn();
					}					
				}
			  }
			}
		  };
		  //��ȡ����������֤��ͼƬ
		  this.load_reVerCap=function(){
			  self_urs.msgO.reVerCap().empty();
			  self_urs.$img().css({"width":205,"height":30})
			  .click(self_urs.load_reVerCap)
			  .load(function(){		
				  self_urs.msgO.reVerCap().append($(this));
			  })
			  .error(function(){
				  
			  })						  
			  .attr("src",self_urs.serverPath+"Img?pAnti=1&id="+self_urs.id+"&"+self_urs.r());
		  };
		  /*
		   * ��Ϸ��¼�����ڼ���û������ڵ�ʱ����ã�����web��Ϸ
		   */
		  this.loginFn=function(){		  
		  };
		  this.reBindEvt=function(o,fn){
			  o.unbind("blur").blur(fn);
		  };
		  this.hideMsg=function(){
			//idTypeSel.show();
			self_urs.msgO.bg().hide();
			self_urs.msgO.msg().hide();
		  };
		  this.regComplete=this.showMsg;
		  this.$=function(o){return self_urs.form.find(o);};
		  //��ȡ�û���д��object
		  self_urs.getO=function(name,mustGet){
			  var result = null;
			  if(mustGet||!/^(password|repassword)$/.test(name)){
				var tag = (name=="idtype")?"select":"input";
				result=self_urs.$(tag+"[name="+name+"]");
			  }
			  return result;
		  };
		  //this.hkhc=false;
		  //this.u="khc?r=";
		  //��ȡ�û���д��Ϣ
		  self_urs.getVal=function(name,mustGet){	  	  	  	  
			  var o = self_urs.getO(name,mustGet);
			  return o?$.trim(o.val()):null;
		  };  
		  
		  //��ˢ����
		  /*
		  this.khc=function(){
			  //clearTimeout(this.khcT);		  
			  //this.khcT=setTimeout(function(){
			  setTimeout(function(){
				  if(this.id){
					  new Image().src=this.serverPath+this.u+new Date().getMilliseconds()+"C8"+this.id;				  
				  }
			  },3000);  
		  };
		  */
		  this.expVer={};
		  this.init=function(){
		  	var inpData={username:{},createEmail:{},password:{},repassword:{},promark:{},captcha:{}/*,realname:{},idno:{},phone:{}*/},
		  		/*idTypeSel,*/hideObj = self_urs.$(".hideItem"),capBox=self_urs.$(".captcha-wrap"),list=self_urs.$(".suggestEmail"),listCon=list.find("ul"),
				//ע�Ὺʼʱ�䣨��ȡsession id��ʼ)
				startTime=0,
				//��ʾ��Ϣ��ʧʱ��			
				//time=2000,					 
				//��Ҫ��֤��input {val,pass,timer}
				//����ʾ�Ƽ��û����б�
				hasSuggestEmail=false,
				itemHoverClass="qrHover",
				sInps=[],sDD=[],		 
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
				getInfoObj,
				showResult,			
				domainSel,			
				getUserNameVal,
				changeUserNameType,			
				chk163UserName=function(val){
					var info,result=false,
						tmp=(self_urs.type==1)?null:'��ĸ��ͷ��6��18���ַ���������ĸ�����֡��»��ߡ�';
					if (!/^[a-z]/i.test(val)) {
						info = tmp?tmp:"��������ĸ��ͷ��";
						self_urs.runStats("log", 3);
					}
					else if (/[^a-z\d]$/i.test(val)) {
						info =tmp?tmp: "��������ĸ�����ֽ�β��";
						self_urs.runStats("log", 4);
					}
					else if (/[^a-z\d_]/i.test(val)) {
						info = tmp?tmp:"��������ĸ�����֡��»��ߡ�";
						self_urs.runStats("log", 5);
					}
					else if (!/^[a-z\d_]{6,18}$/i.test(val)) {
						info =tmp?tmp: "������6��18���ַ���";
						self_urs.runStats("log", 6);
					}
					else result=true;
					return [result,info];
				};
				for(var i in self_urs.expVer){
					inpData[i]={};
				};
				/*
				 * mustAsy:�Ƿ�ǿ��ִ���첽������������ִ����self_urs.progress����ʱ���ڱ���ύ��������ִ�У�
				 */
				inpFn=function(e,asy_onComplete,mustAsy){				
					var self = (typeof e=="string")?self_urs.getO(e,true):$(this),
					    name=self.attr("name"),
						val=(name=="password"||name=="repassword")?self.val():$.trim(self.val()),					
						pass=false,
						asy=false,
						info,
						//�첽ʱ�����ִ�к���
						asy_func = function(){					
							showResult(name,self,pass,info,infoObj);
							if ($.isFunction(asy_onComplete))asy_onComplete();						
						},	
						infoObj=getInfoObj(name);					
						//debug.pass(e.type+":"+name+" inpFn");
						//show loading		
						infoObj.removeClass("error right").addClass("loading");									
					switch(name){
						case "activityid1":
							if($.isFunction(self_urs.expVer[name])){
								var expResult=self_urs.expVer[name](self_urs.getVal(name));
								pass=expResult["pass"];
								info=expResult["info"];
							}
							break;
						case "createEmail":
							if(hasSuggestEmail) list.hide();
							var pwV=self_urs.getVal("password",true);						
							if (val == "") {
								info = "�������ʼ���ַ��";
								self_urs.runStats("log",1);
							}
							else if(val==pwV){
								info="������������ͬ��";	
								self_urs.runStats("log",8);
						  	}
							else{
								var chk163Result=chk163UserName(val);
								if(chk163Result[0]){
									if (mustAsy || self_urs.progress.chkUser == 0) {
										asy=true;//�첽
										self_urs.get("checkCreateEmail", "userName=" + val, function(){
											self_urs.progress.chkUser = 0;
											var data=nie.util.bigUrs.data[self_urs.dataID].suggestEmail;
											switch(data.statusCode){
												case 200:
													listCon.html("<li class='title'><i></i>���ʼ���ַ�ѱ�ע��,��ѡ�����������...</li>");
													var domainData={"@163.com":163,"@126.com":126,"@yeah.net":"yeah"},
														currentDomain = domainData[domainSel.val()],
														exitsTotal=0,
														exitsMax=3,
														addChooseTotal=0,
														addChoose=function(userName,domainVal){
															addChooseTotal++;
															$("<li>",{
																Class:"choose",
																href:self_urs.aHref,
																target:"_self",
																html:"<span><input type='radio' />"+userName+"</span><em>"+domainVal+"</em><i>(����ע��)</i>",
																click:function(){
																	self_urs.runStats("log",7);
																	hasSuggestEmail=false;
																	list.hide();
																	setTimeout(function(){
																		domainSel.val(domainVal);
																		self.val(userName).trigger("blur");
																	},0);
																}
															}).hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");})
															.appendTo(listCon);
														};
													if(data[currentDomain].exist){
														self_urs.runStats("log",2);
														info="���ʼ���ַ��������ͨ��֤�ʻ�����ֱ�ӵ�¼��";											
														$.each(domainData,function(i){														
															if(data[ this.toString()].exist) exitsTotal++;														
														});													
														//ȫ������
														if(exitsTotal<exitsMax){
															$.each(domainData,function(i){
																var _domain = this.toString();
																if(data[_domain].exist) exitsTotal++;
																if(currentDomain!=_domain&&data[_domain]){																
																	var userName = (data[_domain]&& !data[_domain].exist)?val:data[_domain].name[0];																	
																	addChoose(userName,i);																
																}
															});
														}
														else{
															$.each(domainData,function(i){
																var _domain = this.toString();															
																if(data[_domain].name){
																	for(var j=0,l=data[_domain].name.length;j<l;j++){																
																		addChoose(data[_domain].name[j],i);
																	}
																}
															});
														}
														if(addChooseTotal!=0) {														
															var li=$("<li>").addClass("other");
															$("<a>",self_urs.aData)
																.text("ʹ���������õ�������>>")
																.click(function(){
																	changeUserNameType(0);
																}).appendTo(li);
															li.appendTo(listCon);
															list.slideDown("fast");
															hasSuggestEmail=true;
														}
													}
													else pass=true;
													break;
												default:
													info=data.info;
													self_urs.runStats("log", 13);
													break;
											}
											asy_func();
										});
									}
								}
								else info=chk163Result[1];
							}
							break;	
						case "username":
						  //debug.pass("���username");
						  var hasChk=true,
						  	  pwV=self_urs.getVal("password",true),
					  	  	  uR=val.match(self_urs.domainReg),
					  	  	  is163Email=false;
						  if(val==""||val==self_urs.tips.username.txt){					  
							info="�������ʼ���ַ��";
							self_urs.runStats("log",1);
						  }
						  else if(!self_urs.domainReg.test(val)){
							  info="��������ȷ���ʼ���ַ��";
							  self_urs.runStats("log",9);
						  }
						  else if(val==pwV||(uR&&uR[1]&&uR[1]==pwV)){
							  info="������������ͬ";
							  self_urs.runStats("log",8);
						  }
						  //����Ƿ�����ͨ��֤
						  else{
						  	  if(pwV!="") self_urs.getO("password",true).triggerHandler("blur");		  
							  var r=val.match(self_urs.domainReg);
							  if(r && r.length==3 && self_urs.mail[r[2]] && self_urs.mail[r[2]][1]==1){							  
								  var tmpVal = val.replace("@"+r[2],""),
								  	  chk163Result=chk163UserName(tmpVal); 
								  if(chk163Result[0]) {
									  hasChk=false;
									  is163Email=true;
								  }
								  else info = chk163Result[1];
							  }				 
							  else hasChk=false;
							  /*
							  var r=val.match(this.domainReg);
							  if(r && r.length==3 && this.mail[r[2]] && this.mail[r[2]][1]==1){	
								  info="��������ֱ�ӵ�¼��Ϸ";
							  }
							  else hasChk=false;
							  */
						  }
						  if(!hasChk&&(mustAsy||self_urs.progress.chkUser==0)){
							  	  self_urs.progress.chkUser=1;
								  asy=true;//�첽
								  self_urs.get("checkUserName", "userName=" + val, function(){
								  	self_urs.progress.chkUser = 0;
								  	////debug.warn("username�첽��ȡ���");
									var result = nie.util.bigUrs.data[self_urs.dataID].checkUserName;
									switch (result.status) {
										case 104:
											/*
											if (result.subStatus == 0) pass = true;
											else {
												info = "�������ѱ�ע�ᣬ�������С�";
												self_urs.runStats("log", 10);
											}
											*/
											pass = true;
											if (result.subStatus== 1){
												self_urs.runStats("log", 10);
											}
											break;
										case 200:
											if(is163Email){
												switch(self_urs.type){
												  	case 1:
												  		info="���ʺſ�ֱ�ӵ�¼��Ϸ��";
												  		self_urs.loginFn();
												  		break;
												  	case 2:
												  		info="���ʼ���ַ��������ͨ��֤�ʻ�����ֱ�ӵ�¼��";
												  		break;
												}											
												self_urs.runStats("log",14);
											}
											else{
												info = "���ʼ���ַ�ѱ�ע�ᡣ";//result.info;
												self_urs.runStats("log", 12);
											}
											break;
										default:
											info = result.info;
											self_urs.runStats("log", 11);
											break;
									}
									asy_func();
								});							
						  }
						  break;
					  case "password":
						  var userV=getUserNameVal(),//self_urs.getVal("username"),
						  	  uR=userV.match(self_urs.domainReg);
						  if(val==""){
							  info="���������ͨ��֤��¼���롣";
							  self_urs.runStats("log",22);
						  }
						  else if(val==userV||(uR&&uR[1]&&val==uR[1])){
							  self_urs.runStats("log",21);
							  info="���ܺ��û�����ͬ��";						  
						  }
						  else if(/^[\S]{6,16}$/i.test(val)){						  				  	
							  pass=true;
							  var o=self_urs.getO("repassword",true);
							  if(o.val()!="") o.triggerHandler("blur");
						  }
						  else{
							  self_urs.runStats("log",20);
							  info="������6��16���ַ������롣";				
						  }
						  break;
					  case "repassword":				
						  if(val==""){
							  self_urs.runStats("log",31);
							  info="���ٴ���������������롣";
						  }
						  else if(val==self_urs.getO("password",true).val()) pass=true;
						  else{	
							  self_urs.runStats("log",30);
							  info="������������벻һ�¡�";
						  }
						  break;				
					  case "captcha":	
						  var txt=["��������֤�롣","��������ȷ����֤�롣"];
						  if(self_urs.type==1){
							  txt=["����","����ȷ"];
						  }
						  if(val==""){
							  info=txt[0];
							  self_urs.runStats("log",71);
						  }
						  else if(val.length<4||val.length>6){
							  info=txt[1];
							  self_urs.runStats("log",72);
						  }
						  else if(mustAsy||self_urs.progress.verCap==0){
								asy=true;//�첽	 	
								self_urs.progress.verCap=1;
								self_urs.get("Verifier","val="+val,function(){
										self_urs.progress.verCap=0;
										//debug.warn("captcha�첽��ȡ���");								
										switch(nie.util.bigUrs.data[self_urs.dataID].verCapResult){
											case 0:
											  pass = true;							
											  break;
											case 1:
											  info=txt[1];
											  loadCapImg();
											  self_urs.runStats("log",70);
											  break;
											case 2:
											  info="ʧ�ܴ����࣬���Ժ����롣";
											  self_urs.runStats("log",73);
											  break;
										}
										/*
										inpData[name].pass=pass;					  
										Class=pass?"right":"error";					  
										var o = this.$("input[rel="+name+"]");
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
										*/
										asy_func();		
										//alert(name+",asy_func")					
								});
						  }					  
						  break;
					  /*
					  case "realname":
						  if(/^[^\|\+\)\(\*&\^%\$#@!~=\\\}\{\]\[:;\?\>\<\/]{1,26}$/.test(val)) pass=true;
						  else{
							  self_urs.runStats("log",30);						
							  info="�����������ַ�";
						  }
						  break;				
					  case "idno":
						  switch(self_urs.getVal("idtype")){
						  	case "0":
							  if(verifyIdCard(val)) pass = true;
							  else{
								  self_urs.runStats("log",40);
								  info="����ȷ";
							  }
							  break;
						  	default:
							  if(val.length>=6&&val.length<=18) pass=true;						
							  else{
								  self_urs.runStats("log",40);
								  info="6-18λ�ַ�";
							  }
							  break;
						  }
						  break;
					  case "phone":
						  if(/^[\d-]{5,20}$/.test(val)) pass=true;						
						  else{
							  self_urs.runStats("log",50);
							  info='5-20λ,���ֻ�"-"';
						  }
						  break;
					  */
					}			
					if(!asy) showResult(name,self,pass,info,infoObj);
				},			
				loadCapImg=function(){
				  if(self_urs.progress.loadCap==0){				  
					  self_urs.progress.loadCap=1;
					  //if(this.hkhc) this.khc();
					  var ClassVal ="error right loading";
					  self_urs.getO("captcha").removeClass(ClassVal);
					  self_urs.$(".qr-captcha .qrChk").removeClass(ClassVal);
					  capBox.empty();
					  self_urs.$img().css(self_urs.capSize)
								  .click(function(){
									  loadCapImg();
									  self_urs.runStats("log",74);
								  })
								  .load(function(){			
									  self_urs.progress.loadCap=0;
									  self_urs.showCaptcha=true;								  
									  abc=self_urs
									  $(this).hide().appendTo(capBox).fadeIn("fast");					  
								  })
								  .error(function(){
									  capBox.removeClass("loading").text("ˢ�¹��࣬���Ժ�");
								  })
								  /*
								  .bind('readystatechange',function(){					
									  // ���ͼƬ�Ѿ����������������
									  if(this.readyState=="complete"){
										  $(this).trigger("load").unbind("load");
										  return;// ֱ�ӷ��أ������ٴ���onload�¼�
									  }
								  })*/
								  .attr("src",self_urs.serverPath+"Img?id="+self_urs.id+"&"+self_urs.r());
				  }
				},
				loadCaptcha=function(obj){
				  if(self_urs.progress.loadID==0){
					self_urs.progress.loadID=1;
					startTime=self_urs.r();			  
					self_urs.get("IdCreator","",function(){				  
					  self_urs.progress.loadID=0;				  
					  self_urs.id=nie.util.bigUrs.data[self_urs.dataID].id;
					  //this.khc();
					  self_urs.$(".qrChangeCapBtn").attr(self_urs.aData).click(function(){
						  loadCapImg();
						  self_urs.runStats("log", 75);
					  });
					  if(!self_urs.showCaptcha)loadCapImg();
					  if(obj&&$.isFunction(obj.onComplete)) obj.onComplete();				  
					});
				  }
				},
				allInpFocus=function(e){
				  //debug.pass("allInpFocus");				
				  if(!self_urs.showCaptcha) {
						hideObj.show();
						loadCaptcha({onComplete:function(){				
							self_urs.showCaptcha=true;
							//self_urs.runStats("log",0);
						}});
				  }			  
				  if(typeof e!="undefined"){
					  var self =$(this),
					  //debug.error(typeof e);
					  	   tips=self_urs.tips[self.attr("name")];
					  //debug.pass("allInpFocus:"+e.type+self.attr("name"));
					  if(tips&&self.val()==tips.txt) self.val("").removeClass(tips["class"]);
					  //debug.pass(e.type+":"+self.attr("name"));
				  }
				  if(!self_urs.hasTouch){
					  self_urs.hasTouch=true;
					  self_urs.runStats("log",0);
				  }
				};
				var key=self_urs.promark=self_urs.getVal("promark"),
					get_keyIndex=function(num){
						return Math.floor(Math.random()*num);
					},
					makeKey=$.md5;
				switch(self_urs.type){
					case 1:	
						 self_urs.capSize.height=30;
						var hideClass="qrHide",
							//ע����ɷ��ص�ҳ��
							finishPage={
								xyq:"http://xyq.163.com/download/index.html",
								tx2:'http://tx2.163.com/reg/finish.html',
								//pet:'http://pet.163.com/download/',
								csxy:'http://csxy.163.com/reg/client/',
								//dt:"http://dt.163.com/download/",			
								//dt2:"http://dt2.163.com/download/",
								dtw:'http://dtw.163.com/download.html',
								//xy2:"http://xy2.163.com/download/",
								xy3:"http://xy3.163.com/download/download.html",
								//pk:"http://pk.163.com/download/",
								//ff:"http://ff.163.com/download/",
								//qn:"http://qn.163.com/reg/client/",
								//mc:"http://mc.163.com/download/",
								fj:'http://fj.163.com/download.html',
								st:'http://st.163.com/yxxz/yxxz01.html',
								ball:'http://ball.163.com/',
								xyc:'http://xyc.netease.com/viewthread.php?tid=7666',
								rich:'http://rich.163.com/',
								//ysg:"http://ysg.163.com/download/",
								zg:'http://server.zg.163.com/serverlist.php?from=niebar',
								sg:'http://client.sg.163.com/server_list.html',
								xjc:"http://game.xjc.163.com/"
							},
							//������product��Ӧֵ,���û���򷵻�����
							regProduct={
								pet:"cwwg",
								mc:"jlmc",
								dt2:"dtws",
								sg:"sgtx_web",
								zg:"ch",
								ff:"newff",
								pk:"xyw",
								tx3:"tx2"
							},
							regLink={
								//qn:"http://qn.163.com/reg/"
							},
							isDefined = function(){
								var args =arguments;
								for(var i=0,l=args.length;i<l;i++){
									if(typeof args[i]=="undefined") return false;
								}
								return true;
							},
							productName = self_urs.product?self_urs.product:(nie.config.site?nie.config.site:window.location.href.replace(/^http:\/\/(.*)\.163\.com.*$/,'$1')),
							regProductID = isDefined(regProduct[productName])?regProduct[productName]:productName,
							regUrl = encodeURIComponent(isDefined(finishPage[productName])?finishPage[productName]:"http://"+productName+".163.com/download/"),
							regPage=regLink[regProductID]? regLink[regProductID]:"http://reg.163.com/reg/reg2.jsp?product="+regProductID+"&url="+regUrl+"&loginurl="+regUrl;
						self_urs.$(".createEmailBtn").attr("href",regPage);
						self_urs.$("input.qrError").focus(function(e){		
							var self=$(this),
								name=self.attr("rel");
							//debug.pass("������ʾ��:"+name+e.type+"�¼�");
							self.addClass(hideClass);//.hide();
							self_urs.getO(name,true).removeClass(hideClass).trigger("focus");//.triggerHandler("select");
						});		
						getInfoObj=function(name){return self_urs.$(".qr-"+name+" .qrChk");};			
						getUserNameVal = function(){
							return self_urs.getVal("username");
						};
						showResult=function(name,self,pass,info,infoObj){						
							inpData[name].pass=pass;						
							var o = self_urs.$("input[rel="+name+"]"),
								Class1="right",
								Class2=Class1;						
							if(!pass){
								Class2="error";	
								self.addClass(hideClass);	
								o.removeClass(hideClass).val(info);
							}
							else{
								Class1="error";
								self.removeClass(hideClass);
								o.addClass(hideClass);				
							}
							infoObj.removeClass("loading "+Class1).addClass(Class2);
							//o.addClass(Class);
						};
						if(self_urs.isShowCap){
							hideObj.show();
							loadCaptcha();		
						}
						break;
					case 2:
						changeUserNameType = function(type){
								self_urs.userNameType=type;							
								var createUserNameClass=".qr-createEmail",
									userNameClass=".qr-username",
									hideClass="qrHide",
									show_className=type?createUserNameClass:userNameClass,
									hide_className=type?userNameClass:createUserNameClass;								
								self_urs.$(show_className).removeClass(hideClass);
								self_urs.$(hide_className).addClass(hideClass);
							};
						domainSel = self_urs.$("select[name=domain]");
						domainSel.change(function(){
							inpFn("createEmail");
						})
						for(var i in this.mail){						
							if ( self_urs.mail[i][3]) {							
								var tmpV = "@" + i;
								$("<option>").val(tmpV).text(tmpV).appendTo(domainSel);
							}
						}					
						this.$(".qrReg163Btn").attr(self_urs.aData).click(function(){
							changeUserNameType(1);
						}).focus(function(){this.blur();})
						this.$(".qrRegOtherBtn").attr(self_urs.aData).click(function(){
							changeUserNameType(0);
						}).focus(function(){this.blur();})					
						getCurrentName=function(){
							return self_urs.userNameType?"createEmail":"username";
						}
						getInfoObj=function(name){						
							if(name=="username"||name=="createEmail") name=getCurrentName();
							return self_urs.$(".qr-"+name+" .qrChk");
						}
						getUserNameVal = function(){
							return self_urs.getVal(getCurrentName());
						}
						showResult=function(name,self,pass,info,infoObj){						
							inpData[(name=="username"&&self_urs.userNameType)?"createEmail":name].pass=pass;
							var Class1=Class2="right";
							if (pass) Class1 = "error";
							else {
								if(info){
									var span =infoObj.find("em span"),
										txtLen=info.length;
									span.text(info);	
									if(txtLen*12>130) span.css("width",txtLen+"em");
								}
								Class2 = "error";
							}
							self.removeClass(Class1).addClass(Class2);
							infoObj.removeClass("loading "+Class1).addClass(Class2);
						}
						hideObj.show();
						loadCaptcha();					
						break;					
				}
				//Ԥ����loadingͼƬ
				/*
				(function(){
					var v=arguments;
					for(var i=0,l=v.length;i<l;i++){
						//new Image().src="http://res.nie.netease.com/comm/js/nie/util/urs/"+v[i];
						this.$img().attr("src","http://res.nie.netease.com/comm/js/nie/util/urs/"+v[i]);
					}
				})("loading.gif","loading2.gif","icon."+($.browser.msie?"gif":"png"));
				*/
				//ͳ��pv
				self_urs.runStats("pv");
				//ͳ��pv
				self_urs.runStats("clickSugRegBtn");
				//ͳ������������Դ
				var refer=document.referrer;
				this.engineInit(refer);
				if(typeof nie.util.bigUrs.data[self_urs.dataID].engine!="undefined") {
					var engine =nie.util.bigUrs.data[self_urs.dataID].engine;
					this.get("fromSearch","type="+engine.type+"&pages="+engine.pages+"&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID+"&refer="+engine.refer,
							function(){
								self_urs.fromSearch=true;
					});
				}			
				$(".NIE-quickReg-loading").hide();
				self_urs.form.show();
				//idTypeSel=self_urs.getO("idtype");			
				suggestDomain=this.$(".suggestDomain");
				suggestDomainCon=suggestDomain.find("ul");
	
				//input��ɫtips
				for(var i in self_urs.tips){
					self_urs.getO(i,true).addClass(self_urs.tips[i]["class"]).val(self_urs.tips[i].txt);
				}
				//
				$.each(inpData,function(i){
					self_urs.val =null;
					self_urs.pass = null;
					sInps.push("input[name="+i+"]");
					sDD.push(".qr-"+i);				
					self_urs.$(".qr-"+i+" .qrChk").html('<i class="right"></i><i class="error"></i><i class="loading"></i><em><b></b><span></span></em>');
				});			
				//idtype bind		  		  
				/*
				$.each(["���֤","ѧ��֤","����֤","����"],function(i){			 
					idTypeSel.append("<option value='"+i+"'>"+this+"</option>");
				});		    
				*/			
				this.send=function(isReVer){
					//��֤�ɹ�						
					self_urs.runStats("log",100);						
					var gotResult=hasWating=false;
					//var hasShowLoading=false;						
					setTimeout(function(){							
						if(!gotResult){								
							//hasShowLoading=true;
							hasWating=true;
							self_urs.showMsg({									
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
									o =((isReVer&&name=="captcha")?self_urs.msgO.reVerInp():self_urs.getO(name,true)),
									v=(o.length==0)?"":o.val();							  
								if(/^(password|realname|idno|activityid1|activityid2)$/.test(name)){
									v=encodeURIComponent(encodeURIComponent(v));
								}
								result +="&"+name+"="+v;
							};
							return result;
						},
						username=self_urs.userNameType?self_urs.getVal("createEmail")+domainSel.val():self_urs.getVal("username"),
						str="username="+username+params(["captcha","password","mobile"/*,"realname","idno","phone","idtype"*/,"activityid1","activityid2"]);

					if(self_urs.fromSearch){
						var engine =nie.util.bigUrs.data[self_urs.dataID].engine;								
						str += "&type="+engine.type+"&pages="+engine.pages+"&keyWord="+engine.keyWord+"&encode="+engine.encode+"&engineID="+engine.engineID;//+"&refer="+engine.refer;
					}		
					//��Ӷ���������֤
					if(isReVer){
						str+="&pAnti=1";
					}
					if(self_urs.progress.submit==0){
						self_urs.progress.submit=1;												
						nie.util.bigUrs.data[self_urs.dataID].result={};
						self_urs.msgSize.current={};
						self_urs.get("submit",str,function(){
								self_urs.progress.submit=0;
								if(startTime!=0) self_urs.runStats("regTime", self_urs.r()-startTime);//this.logImg("regTime?time="+(this.r()-startTime)+"&promark="+this.promark);
								startTime=0;								
								gotResult=true;					  		
								self_urs.hideMsg();															
								var Data=nie.util.bigUrs.data[self_urs.dataID].result,
									 num=Data.num,
								 	 result=(num==200||num==201||num==202);
								self_urs.runStats("log",result?101:102);
								if(num==2) loadCapImg();
								
								if(hasWating){
									self_urs.clearMsg();		
									self_urs.hideMsg();
								}										
								self_urs.regData={
										"username":username,
										is163Mail:Data.is163Mail,
										mailUrl:Data.mailUrl
								};
								var reVer=(Data.num==107);//�Ƿ���Ҫ���������֤��
								self_urs.msgSize.current=self_urs.msgSize[(!Data.is163Mail&&result)?"large":(reVer?"reVer":"small")];
								if($.isFunction(self_urs.regComplete)){
									self_urs.regComplete({
											"result":result,
											"reVer":reVer,
											status:num,
											msg:(Data.msg.indexOf("��")==0)?Data.msg.substring(1,Data.msg.length):Data.msg,
											url:Data.reDirectUrl,
											data:Data,
											"username":username,
											is163Mail:Data.is163Mail,
											mailUrl:Data.mailUrl
									});
									self_urs.runStats("monitor",1);
								}
							}
						);
				  }
				};
				//bind this.form event
				self_urs.form.attr("action","#").submit(function(){
					//debug.pass("form�ύ��"+((allowSubmit)?"����":"������"));
					if(!allowSubmit) return false;				
					else self_urs.reBindEvt(self_urs.getO("username"),inpFn);
					self_urs.runStats("log",90);
					var asy_done=0,//�첽�������
						asy_total = 2;//��Ҫ����첽������ ��ʱ�첽����У��û�������֤�롣						
					inpData["promark"].pass=(self_urs.promark!="");//�ж�promark�Ƿ���ϱ�׼
					if(!inpData["promark"].pass){
	
						alert("ע��ʧ�ܣ�promark������");
						return;
					}			  
					else if(!self_urs.getO("agree").is(':checked')){
						alert('������ܷ����������ע�ᡣ');
						return;
					}				
					var asy_onComplete=function(){
						asy_done++;					
						if(asy_done==asy_total){							
							var noChkName=self_urs.userNameType?"username":"createEmail";
							//alert("noChkName:"+noChkName)									 
							for(var i in inpData){		
								if(i!=noChkName&&!inpData[i].pass){
									//alert(i)
									self_urs.getO(i,true).triggerHandler("focus");							  
									return;
								}
							}
							self_urs.send(false);							
						}
					};
					var chkAll=function(){
					  //debug.pass("chkAll");
					  allInpFocus();
					  $.each(inpData,function(i){
						  //debug.pass("chkAll:"+i);
						  if(i!="promark"&&i!=(self_urs.userNameType?"username":"createEmail")){
						  	//alert(i)
							//debug.pass(i+":blur");
							self_urs.getO(i, true).triggerHandler("blur", [asy_onComplete, true]);						
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
	                  	  suggestDomainCon.find("li.hover").triggerHandler("click");
	                	  suggestDomain.hide();
	                	  allowSubmit=true;               	  
	                	  //debug.pass("ֱ��ִ��inpFn���username");           		  
	            		  inpFn("username");
						},
						keyUp:function(e){
							  var num=e.which;						  
							  if(num!=40&&num!=38&&num!=13){
								  userNameData.total=0;
						          suggestDomain.show();
								  suggestDomainCon.empty().html("<li class='title'>��ѡ����������...</li>");
				                  var self=$(this),
				                  	  selfVal=self.val(),
				                      reg = selfVal.match(new RegExp("^([\\w-\\.]+)@?")),
				                      domains={},
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
				                          .appendTo(suggestDomainCon);						
				                      };
				                  if(reg){
				                	  userNameData.currentIndex=1;
				                	  userNameData.total=0;
				                	  for(var i in self_urs.mail){
				                		  if(self_urs.mail[i][2]==1) domains[reg[1]+"@"+i]=true;
				                		  //domains.push(reg[1]+"@"+i);
				                		  //else break;
				                      }
				                	  for(var i in domains){			                		  
				                		  if(i.toLowerCase().indexOf(selfVal.toLowerCase())==0){			                			  
				                			addSuggest(i,userNameData.total);
				                		  	userNameData.total++;
				                		  }
			                		  }
				                  }
				                  if(userNameData.total<5){			                	  
				                	  reg = selfVal.match(new RegExp("^([\\w-\\.]+)@([\\S]+)"));			                	  
				                	  if(reg){			                		  
				                		  for(var i in self_urs.mail){
				                			  var vv = i.toLowerCase();			                			  
					                		  if(vv.indexOf(reg[2].toLowerCase())==0 && !domains[reg[1]+"@"+vv]){				                			  
					                			addSuggest(reg[1]+"@"+i,userNameData.total);
					                		  	userNameData.total++;
					                		  }
				                		  }
				                	  }			                	  
				                  }
				                  if(userNameData.total==0) {
				                	  allowSubmit=true;
				                	  ////debug.pass("��Ϊ���Ƽ�����������form�ύ������");
				                	  userNameData.exist=false;
				                	  self_urs.reBindEvt(self,userNameData.blur);
				                      suggestDomain.hide();
				                  }
				                  else{			
				                	  allowSubmit=false;
				                	  ////debug.pass("��Ϊû���Ƽ�����������form�ύ��������");
				                	  userNameData.exist=true;
				                      //self.unbind("blur");
				                      self.triggerHandler("focus");
				                      self_urs.reBindEvt(self,userNameData.blur);
				                      suggestDomainCon.find("li:eq(1)").addClass("hover");
				                  }	  
							  }
				        }, 
			            keyDown:function(e){	
			            	////debug.pass("keyDown�¼�,exist:"+userNameData.exist+",total:"+userNameData.total);
			            	if(userNameData.exist){
				            	 var num=e.which,
					            	 selSuggest=function(){	        
					         		 	suggestDomainCon.find("li").removeClass("hover");
					         	 	 	suggestDomainCon.find("li:eq("+userNameData.currentIndex+")").addClass("hover");			         	 	 	
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
		                            	 //debug.pass("enter�¼�");
		                            	 //debug.pass("suggestDomain display��"+suggestDomain.css("display"));
		                            	 if(suggestDomain.css("display")=="block"){
		                            		 var self=$(this);
				                             //self.unbind("blur");
				                             //debug.pass("ȡ��username blur�¼�");
				                             suggestDomainCon.find("li.hover").triggerHandler("click");
				                             suggestDomain.hide();      
				                             allowSubmit=false;		                             
				                             //debug.pass("����form�ύ��������");
		                            	 }
		                            	 else{
		                            		 allowSubmit=true;		                             
				                             //debug.pass("����form�ύ������"); 
		                            	 }
		                            	 break;	                             
		                         }	                         
			            	}
			            }
				};
	
				//bind each input event		 
				self_urs.$(sInps.join(",")).focus(allInpFocus).blur(inpFn);
				//bind each dd event
				self_urs.$(sDD.join(",")).focusin(function(){
					$(this).addClass(itemHoverClass);
				}).focusout(function(){
					$(this).removeClass(itemHoverClass);
				});
				self_urs.getO("username").keyup(userNameData.keyUp).keydown(userNameData.keyDown);
		};

	  }
	};
})(jQuery);