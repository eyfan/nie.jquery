nie.util.qUrs=nie.util.qUrs||function(options){
	/*
	 * ��ʾ��Ϣ��ֻ���ṩ��ﷵ�ؽ����ʾ
	 * data={
	 * 		regType:ע������(1:����ע��;2:�ֻ�����ע��) 		 
			 reVer:�Ƿ���Ҫ������֤(regType=1�ų���)			 
			 is163Mail:�Ƿ���������(regType=1�ų���)
			 mailUrl:�����ʺŵ�������ַ(regType=1�ų���)			 
			 username:�û���(regType=2ʱΪ���ʺ�)
			 m_username:�ֻ��ʺ�(regType=2ʱ����,�ֻ����벻����@163.com)
			 status:״̬��			 
			 success:�Ƿ�ע��ɹ�
			 msg:������ʾ
			 url:ע��ɹ�����ת��ַ	 
			 }
	 */
	this.showMsg=function(data){		
		if(typeof data=="object"){
			var _holderName="";
			if(data.reVer) _holderName="reVer";
			else if(data.success) _holderName=(data.regType==1)?(data.is163Mail?"is163":"not163"):"mobile";
			else _holderName="error";
			layer.create(_holderName);			
			layer[_holderName].show(data);			
		}
	};	
	var self=this,
		defaults={
			"holder":"div.NIE-quickReg",
			"type":1,//��� 1:��Ҫ��֤��;2:����Ҫ��֤��;3:�ֻ�ע��
			"loginFn":null,//��Ϸ��¼�����ڼ���û������ڵ�ʱ����ã�����web��Ϸ
			"regComplete":self.showMsg,//ע�᷵����Ϣ���,
			"msgType":1//��Ϣ��� 1:����(Ĭ��);2:�л���(iframeר��)
		},		
		settings = $.extend({}, defaults, options);
	this.holder=$(settings.holder).find("p.NIE-quickReg-loading").hide();//����loading	
	var serverPath="http://weburs.ku.163.com/quickReg/",
		promark=self.holder.find("input[name=promark]").val(),
		id=null,
		ot=new function(){//ע���ʱ
			var _self=this,
				_hasGot=false,
				_val=0,
				_now=function(){return new Date().getTime();};
			this.firstStart=function(){//ִֻ��һ��
				if(!_hasGot) _self.start();
			};
			this.start=function(){
				_hasGot=true;
				_val=_now();
			};
			this.end_and_get=function(){
				var result=parseInt((_now()-_val)/1000);
				_self.start();
				return result;
			};
		},
		/*
		 * ��Ⱦ�ṹ
		 * namesData:[{cn:"�����ʺ�",name:"username",...}]
		 */
		render_and_getForm=function(namesData){			
			var _getItemHTML=function(index,nameData){
					var _plusCode="";
					if(nameData.name=="captcha") _plusCode='<span class="captcha-wrap hideItem loading"></span>';
					else if(nameData.name=="username") _plusCode='<div class=suggestDomain><ul></ul></div>';
					else if(nameData.name=="smscode") {
						_gotSmsCode=true;
						_plusCode='<input type="button" class="qr-smscode-btn" value="��ȡ��֤��"/>';						
					}
					return ('<dt class="qr-$name">$cn��</dt>\
							<dd class="qr-$name">\
							<ul>\
								<li class="qrCon">\
									<input class="qr-$name-inp qrInpTxt" type="'+(/password/.test(nameData.name)?"password":"text")+'" name="$name" autocomplete="off" tabindex="$index$rand" />\
									<input rel="$name" class="qr-$name-inp qrError qrHide" readonly="readonly" tabindex="$index$rand" />'
									+_plusCode+									
								'</li>\
								<li class="qrChk"><i class=right></i><i class=error></i><i class=loading></i></li>\
							</ul>\
							</dd>').replace(/\$index/g,index).replace(/\$name/g,nameData.name).replace(/\$cn/g,nameData.cn);
				},
				_plusTemp='<dt class="qr-agree"><input id="qr-agree$rand" name="agree" type="checkbox" checked="checked" /></dt>\
						<dd class="qr-agree">\
						<label for="qr-agree$rand">��ͬ��"<a href="http://reg.163.com/agreement.shtml" target="_blank">��������</a>"��<br />"<a href="http://reg.163.com/agreement_game.shtml" target="_blank">��˽�����͸�����Ϣ��������</a>"</label>\
						</dd>\
						<dt class="qr-submit"></dt>\
						<dd class="qr-submit"><input class="arSubmitInp" type="submit" tabindex="$index$rand"  onmouseover="this.className=\'arSubmitInp arSubmitInp2\'" onmouseout="this.className=\'arSubmitInp\'" value=""/></dd>',
				_html="",
				_index=0,
				_gotSmsCode=false,
				_form=$('<form onsubmit="return false;">');
			for(var i=0,l=namesData.length;i<l;i++){		
				_html+=_getItemHTML(++_index,namesData[i]);
			}
			_form.html(("<dl>"+_html+_plusTemp.replace("$index",_index+1)+"</dl>").replace(/\$rand/g,new Date().getTime()));			
			if(_gotSmsCode) {//��ȡ�ֻ���֤��
				_form.find("input.qr-smscode-btn").click(function(){
					allItems.currentItems.get("smscode").none();
					var __self=$(this).attr("disabled","disabled"),
						__total=61,
						__org_val=__self.val();
					allItems.currentItems.get("m_username").chk(function(pass){						
						if(pass) remote("sendMobileCaptcha",{"m_username":allItems.currentItems.getVal("m_username")},function(json){										
										if(json.success){																		
											var __timer=setInterval(function(){
												if(--__total>0) __self.val(__total+"�������·���");
												else {
													clearInterval(__timer);
													__self.val(__org_val).attr("disabled",false);
												}
											},1000);
										}
										else{
											__self.val(__org_val).attr("disabled",false);
											layer.create("error");
											layer.error.show(json);
										}
								});
						else __self.attr("disabled",false);
					});
				});				
			}			
			_gotSmsCode=_getItemHTML=_plusTemp=_html=_index=null;
			return _form;
		},
		allItemRule={//ȫ���������
				"username":{
					"asy":true,
					"rule":function(val,asy_callback){
						var result=true,
							email_m=val.match(emailReg),
							pwVal=allItems.currentItems.getVal("password"),
							is163Email=false;
						if(val==""||val==tips.username.txt) result="�������ʼ���ַ";
						else if(!email_m) result="��������ȷ���ʼ���ַ";
						else if(val==pwVal||email_m[1]==pwVal) result="������������ͬ";
						else{
							var domain=email_m[2].toLowerCase();
							if(mailDomain[domain]&&mailDomain[domain][1]){
								is163Email=true;
								result=chk163UserName(email_m[1]);
							}
						}
						if(result!=true) asy_callback(result);
						else{
							remote("checkUserName",{"userName":val},function(json){
								var result=0;
								switch(json.status) {
									case 104:										
										result = true;										
										break;
									case 200:
										if(is163Email){											
											result="���ʺſ�ֱ�ӵ�¼��Ϸ";
											if($.isFunction(settings.loginFn)) settings.loginFn();															
										}
										else{
											result = "���ʼ���ַ�ѱ�ע��";
											unionStats(false);
										}
										break;
									default:
										result = json.info;
										break;
								}
								asy_callback(result);
							});
						}
					}
				},
				"password":{
					"rule":function(val){
						var result=true,
							userV=allItems.currentItems.getVal("username"),
							userR=userV.match(emailReg);
						if(val=="") result="���������ͨ��֤��¼����";
						else if(val==userV||(userR&&userR[1]==val)) result="���ܺ��û�����ͬ";
						else if(!/^[\S]{6,16}$/i.test(val)) result="������6��16���ַ�������";
						else if(allItems.currentItems.getVal("repassword")) allItems.currentItems.blur("repassword");
						return result;
					}						
				},
				"repassword":{
					"rule":function(val){
						var result=true;
						if(val=="") result="���ٴ����������������";
						else if(val==allItems.currentItems.getVal("password")) result=true;
						else result="������������벻һ��";
						return result;						  
					}
				},
				"captcha":{
					"asy":true,
					"rule":function(val,asy_callback){
						var result=true,txt=(settings.type==1)?["����","����ȷ"]:["��������֤��","��������ȷ����֤��"];
						if(val=="") result=txt[0];
					 	else if(val.length<4||val.length>6) result=txt[1];
						if(result!=true)asy_callback(result);
						else remote("Verifier",{"val":val},function(json){										
								  var result=0;
								  switch(json.verCapResult){
									case 0:
									  result = true;							
									  break;
									case 1:
									  result=txt[1];
									  loadCaptcha();					  
									  break;
									case 2:
									  result="ʧ�ܴ����࣬���Ժ�����";											  
									  break;
								  }
								  asy_callback(result);
							  });		
					}
				},
				"m_username":{
					"rule":function(val){
						return (/^(13|14|15|18)\d{9}$/.test(val))?true:"����ȷ�����ֻ�����";
					}
				},
				"m_password":{
					"rule":function(val){
						var result=true;
						if(val=="") result="���������ͨ��֤��¼����";
						else if(val==allItems.currentItems.getVal("m_username")) result="���ܺ��û�����ͬ";
						else if(!/^[\S]{6,16}$/i.test(val)) result="������6��16���ַ�������";
						else if(allItems.currentItems.getVal("m_repassword")) allItems.currentItems.blur("m_repassword");
						return result;
					}						
				},
				"m_repassword":{
					"rule":function(val){
						var result=true;
						if(val=="") result="���ٴ����������������";
						else if(val==allItems.currentItems.getVal("m_password")) result=true;
						else result="������������벻һ��";
						return result;
					}
				},
				"smscode":{
					"rule":function(val){
						return val==""?"����":true;
					}
				}
		},
		/*
		 * ����
		 */
		layer={
			size:{//��ߴ�
				"not163":{w:460,h:250},//�����
				"is163":{w:250,h:150},//163�����
				"reVer":{w:240,h:230},//������֤
				"error":{w:280,h:160},//����
				"mobile":{w:350,h:190}//�ֻ��ʺ�ע��ɹ�
			},
			is163:null,//163���������
			not163:null,//��������
			error:null,//��������
			reVer:null,//������֤����
			mobile:null,//�ֻ��ʺ�ע��ɹ�
			bg:null,//��������			
			create:function(holderName){//holderName: not163|is163|reVer|error
				var body =$(document.body);
				if(!layer[holderName]){
					layer[holderName]=new function(){
						var _self=this,
							_getCloseBtn=function(txt,className){
								return $("<a>",{
									text:txt,
									"class":className,
									href:"javascript:void(0);",
									click:function(){_self.hide();}
								});
							},							
							_selfConHolder=$("<div>",{"class":"NIE-quickReg-msg-con "+{"error":holderName,"is163":"right","reVer":holderName,"not163":"not163Mail","mobile":"mobileMail"}[holderName]}),//��������
							_size=layer.size[holderName];
						if(settings.msgType==1){
							var _selfHolder=$("<div>",{
									"class":"NIE-quickReg-msg",
									html:"<div class=NIE-quickReg-msg-title>ע����Ϸ�ʺ�</div>"								
								}).append(_getCloseBtn("X","NIE-quickReg-closeBtn")),
								_display=function(selfConHolderHTML,appendToSelfConHolder){//��ʾ
									_selfConHolder.empty().html(selfConHolderHTML);
									if(appendToSelfConHolder) _selfConHolder.append(appendToSelfConHolder);
									layer.bg.show();//show bg layer
									var win=$(window);			
									_selfHolder
									.css({
										width:_size.w,
										height:_size.h,
										top:(win.height()-_size.h)/2,
										left:(win.width()-_size.w)/2
									})
									.append(_selfConHolder)								
									.show();								
									win=null;									
								};								
							this.hide=function(){				
								_selfHolder.hide();
								layer.bg.hide();
							};							
						}
						else{//iframeר��
							var _selfHolder=$("<div>",{
									"class":"NIE-quickReg-msg-iframe"								
								}),
								_display=function(selfConHolderHTML,appendToSelfConHolder){//��ʾ
									holder.hide();
									_selfConHolder.empty().html(selfConHolderHTML);
									if(appendToSelfConHolder) _selfConHolder.append(appendToSelfConHolder);									
									var win=$(window);			
									_selfHolder
									.append(_selfConHolder)								
									.show();								
									win=null;
								};
							this.hide=function(){				
								_selfHolder.hide();
								holder.show();
							};
						}
						switch(holderName){							
							case "is163":								
								this.show=function(json){									
									_display('<p class="info">ע��ɹ���</p><a href="'+json.url+'" target="_blank" class="btn">ȷ ��</a>');
								};
								break;							
							case "not163":
								this.show=function(json){																		
									_display('<h1>��лע�ᣡ�����������ʺš�</h1>\
											<h3>������¼���� <b>'+json.username+'</b> ����ȷ���ʼ��������ɡ�</h3>\
											<h2><a class="btn" href="'+json.mailUrl+'" target="_blank">�����鿴�ʼ�</a></h2>\
											<ul class="tips">\
											<li>��û���յ���֤�ʼ���\
											<ol>\
											<li>���Ե�����ʼ��������ʼ������ҿ���</li>\
											<li>�ٴ�<a href="javascript:void(0);" target="_self" class="sendMailBtn">����ע����֤�ʼ�</a>��</li>\
											<li>����ط�ע����֤�ʼ���Ȼû���յ�����<a class="reReg" target="_self" href="javascript:void(0);">����ע��</a>��</li>\
											</ol>\
											</li>\
											</ul>');								
									_selfConHolder.find("a.sendMailBtn").click(function(){										
										remote("sendActiveMail",{userName:json.username},function(json){											
											if(json.status&&json.info) alert(json.info);
										});												
									});
									_selfConHolder.find("a.reReg").click(function(){
										_self.hide();
									});
								};
								break;
							case "mobile":
								this.show=function(json){
									_display('<h1>ע��ɹ���</h1>\
											<h2>��������ͨ��֤Ϊ<b>'+json.m_username+'</b><h2>\
											<h3>�Զ�Ϊ��������һ�������ʺţ�<br>'+json.username+'</h3>\
											<p><a href="'+json.url+'" target="_blank" class="btn">ȷ ��</a></p>');
								};
								break;
							case "error":
								this.show=function(json){
									var resultHTML=(allItems.getCurrentRegType()==2&&json.status==421)?'�����ѱ�ע�����ԭ���˺Ź�������ֱ�ӵ�¼��<a rel="emailReg" href="javascript:void(0);">����ע��</a>��':json.msg;									
									_display('<p class=info>�����ˣ�</p><p class=reason>'+resultHTML+"</p>",_getCloseBtn("ȷ��","btn"));
									resultHTML=null;
									_selfConHolder.find("a[rel=emailReg]").click(function(){
										allItems.active("����ע��");
										_self.hide();
									});									
								};
								break;
							case "reVer":
								this.show=function(json){									
									_display('<p class="reVer-l1">ֻ��һ��������ˣ�<br>\
											����������һ����֤�������ע�᣺<br>\
											<input class="NIE-reVerInp"><br>\
											<span class="NIE-reVerImg">\
											</span>\
											</p>\
											<p class="reVer-l2">������� \
											<a href="javascript:void(0);" class="NIE-reVerBtn">��һ��</a>\
											</p>\
											<p class="reVer-l3">\
											<a href="javascript:void(0);" class="btn">���ע��</a>\
											</p>');
									var __loadCaptcha=function(){
										captcha.load(true,function(img){
											img.click(__loadCaptcha);											
											_selfConHolder.find("span.NIE-reVerImg").empty().append(img);												
										});
									};
									__loadCaptcha();
									_selfConHolder.find("a.NIE-reVerBtn").click(__loadCaptcha);
									_selfConHolder.find("a.btn").click(function(){
										var _itemVals=allItems.currentItems.getItemVals();
										_itemVals["captcha"]=$.trim(_selfConHolder.find("input.NIE-reVerInp").val());
										_itemVals["pAnti"]=1;
										submitFn(_itemVals,function(){
											_self.hide();
										});
										_itemVals=null;
									});
								};
								break;
						}						
						_selfHolder.appendTo(body);
					};
					if(settings.msgType==1&&!layer.bg) layer.bg=new function(){
						var _selfHolder=$("<div>",{"class":"NIE-quickReg-msg-bg"}).appendTo(body);
						this.show=function(){
							var doc=$(document);
							_selfHolder.css({width:doc.width(),height:doc.height()}).show();
							doc=null;
						};
						this.hide=function(){
							_selfHolder.hide();
						};
					};
					body=null;
				}		
			}
		},
		submit_doing=false,//�Ƿ�����ύ���
		emailReg=/^([\w-\.]+)@([\w-]+(?:\.[\w-]+){1,3})$/,//��������
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
		mailDomain={
		  /*������Ĭ����ʾ*/
		  "163.com":[2,1,1,1],
		  "qq.com":[2,0,1],
		  "sina.com":[2,0,1],
		  "126.com":[2,1,1,1],
		  "vip.qq.com":[2,0,1],   
		  /*��������չ��ʾ*/		
		  "yahoo.com.cn":[2,0,0],
		  "yahoo.com":[2,0,0],
		  "yahoo.cn":[2,0,0],
		  "sohu.com":[2,0,0],
		  "gmail.com":[1,0,0],			 
		  "hotmail.com":[1,0,0],
		  "yeah.net":[2,1,0,1],
		  "sina.cn":[2,0,0],
		  "live.com":[2,0,0],
		  "sogou.com":[2,0,0],
		  "139.com":[1,0,0],
		  "wo.com.cn":[2,0,0],
		  "21cn.com":[2,0,0],
		  "vip.163.com":[1,1,0],
		  "vip.126.com":[1,1,0],
		  "188.com":[2,1,0],			  
		  "foxmail.com":[1,0,0]			  
	    },
	    maxDomain=5,
		tips={
			username:{
				"txt":"�� name@example.com",
				"class":"inp-tips"
			},
			m_username:{
				"txt":"������11λ�ֻ���",
				"class":"inp-tips"
			}
		},
		/*
		 * �ύ��
		 * itemVals:����ѡ��ֵ����
		 * callback:���������ػص�
		 */
		submitFn=function(itemVals,callback){
			var _regType=allItems.getCurrentRegType();
			itemVals["ot"]=ot.end_and_get();
			if(_regType==1){//����ע��
				remote("submit",itemVals,function(json){
					ot.start();
					//json={num:200,is163Mail:true,mailUrl:"http://mail.qq.com",msg:"fuck.",redirecturl:"http://nie.163.com"}
					var _success=(json.num>=200&&json.num<=202),//ע��ɹ�
						_reVer=false,//����regComplete�Ĳ���
						_UA=itemVals[allItems.getCurrentUA()];//
					if(_success) {		
						unionStats(json.is163Mail);//����ͳ��
						allItems.currentItems.reset();											
					}
					else{
						switch(json.num){
							case 2://��֤�����
								if(allItems.currentItems.get("captcha")){
									loadCaptcha();//request captcha again
									allItems.currentItems.get("captcha").none();//clear tips icon
								}
								break;
							case 107://��Ҫ������֤��
								_reVer=true;
								break;
						}			
					}				
					if($.isFunction(callback)) callback();					
					if($.isFunction(settings.regComplete)) settings.regComplete({
						regType:_regType,
						success:_success,
						reVer:_reVer,
						status:json.num,
						msg:(json.msg.indexOf("��")==0)?json.msg.replace("��",""):json.msg,
						url:json.reDirectUrl?((json.reDirectUrl.indexOf("?")==-1?json.reDirectUrl+"?":json.reDirectUrl+"&")+"username="+itemVals.username):"",							
						username:_UA,
						is163Mail:json.is163Mail,
						mailUrl:json.mailUrl
					});
					submit_doing=false;
				});
			}
			else{//�ֻ�ע��
				remote("regMobile",itemVals,function(json){
					if($.isFunction(callback)) callback();					
					if($.isFunction(settings.regComplete)) settings.regComplete({
						regType:_regType,
						success:json.success,
						msg:json.msg,
						status:json.status,
						url:json.reDirectUrl?((json.reDirectUrl.indexOf("?")==-1?json.reDirectUrl+"?":json.reDirectUrl+"&")+"username="+json.UA):"",							
						username:json.UA,//���ʺ�
						m_username:json.mUA//�ֻ��ʺ�
					});
					submit_doing=false;
				},true);
			}
		},
		/*
		* ���163�ʺ�
		* ���ؽ��:true|error msg
		*/
		chk163UserName=function(val){
		  var result=true,
			  tmp=(settings.type==2)?null:'��ĸ��ͷ��6��18���ַ���������ĸ�����֡��»���';
		  if (!/^[a-z]/i.test(val)) result = tmp?tmp:"��������ĸ��ͷ";			
		  else if (/[^a-z\d]$/i.test(val)) result =tmp?tmp: "��������ĸ�����ֽ�β";
		  else if (/[^a-z\d_]/i.test(val)) result = tmp?tmp:"��������ĸ�����֡��»���";
		  else if (!/^[a-z\d_]{6,18}$/i.test(val)) result =tmp?tmp: "������6��18���ַ�";
		  return result;
		},
		getBindParams=function(params){
			var arr=[];
			for(var k in params){
				arr.push(k+"="+params[k]);
			}
			return arr.join("&");
		},
		remote=function(file,params,callBack){			
			$.ajax({
				type : "get", //jquey�ǲ�֧��post��ʽ�����
				async:false,
				url : (file=="submit"?"https://reg.nie.163.com/web/quick/":serverPath)+file+"?"+getBindParams($.extend({"promark":promark,"id":id,"output":"json"},params)), //���������URL
				//url : "urs.php?file="+file+"&"+getBindParams($.extend({"promark":promark,"id":id,"output":"json"},params)), //���������URL
				dataType : "jsonp",
				//���ݸ�������������Ի��jsonp�ص��������Ĳ�����(Ĭ��Ϊ:callback)
				//jsonp: "jsoncallback",
				//�Զ����jsonp�ص��������ƣ�Ĭ��ΪjQuery�Զ����ɵ����������
				//jsonpCallback:"success_jsonpCallback",
				//�ɹ���ȡ����������ϵ�json���ݺ�,�ᶯִ̬�����callback����
				success : function(json){
					callBack(json);
				}
			});
		},
		//����ͳ�ƣ�ͳ���Ѿ����ڵ��ʺ�
		unionStats=function(is163){
		  (function(){
			  var _is163=is163,
			  	  _username=allItems.currentItems.getVal(allItems.getCurrentUA());			  
			  setTimeout(function(){
				  $.include("http://union.netease.com/sys_js/pre_related.js",function(){					  
					  _is163?netease_union_pre_related(_username):netease_union_pre_related(_username,2);
				  });
			  },0);
		  })();
		},
		Img=function(){
		  var o = $(new Image());
		  o.bind('readystatechange',function(){					
			  // ���ͼƬ�Ѿ����������������
			  if(this.readyState=="complete"){						  
				  return;// ֱ�ӷ��أ������ٴ���onload�¼�
			  }
		  }).bind("abort",function(){			  
			   return;					  
		  });
		  return o;
		},
		ID=new function(){
			var _self=this;
			this.got=false;
			this.load=function(callback){
				if(!_self.got)
					remote("IdCreator",{},function(json){
						id=json.id;
						_self.got=true;
						if($.isFunction(callback)) callback();
					});
			};
		},
		Captcha=function(){
			var _self=this;				
			this.doing=false;
			this.has=false;
			/*
			* ������֤��
			* isReVer:�Ƿ������֤
			* callback:����ΪͼƬ
			*/
			this.load=function(isReVer,callback){
				_self.has=true;
				if(!_self.doing){
					_self.doing=true;
					_size=isReVer?{w:205,h:30}:{w:100,h:30};
					var getImg=function(){						
						return Img().attr({
							height:_size.h,
							width:_size.w,
							src:serverPath+"Img?"+
								getBindParams({"id":id,
											"pAnti":isReVer?1:0,
											"promark":promark,
											"_r":new Date().getTime()
								})
						});
					};
					if(ID.got) {
						_self.doing=false;
						callback(getImg());
					}
					else ID.load(function(){
							_self.doing=false;
							callback(getImg());
						});
				}
			};
		},
		/*
		* ������ѡ�����
		* options����_defaults
		*/
		Item=function(options){			
			var _self=this,
				_doing=false,
				_defaults={
					name:null,//ѡ������
					asy:false,//��Ҫ�첽���ô���			
					rule:null,//����
					focusCallBack:null,//�����ص�����
					form:null//��
				},
				_settings=$.extend({},_defaults, options),				
				_holder=_settings.form.find("dd.qr-"+_settings.name),//����
				_hiddenClass="qrHide",//����class name
				_chkHolder=_holder.find("li.qrChk"),//���icon����
				_resetBlur=function(plusFn){				
					_unbindBlur();
					_bindBlur(plusFn);
				},
				_bindBlur=function(plusFn){
					_inp.blur({f:plusFn},function(e){
						if($.isFunction(e.data.f)) e.data.f();						
						_self.none();
						_self.chk();			
					});
				},
				_unbindBlur=function(){
					_inp.unbind("blur");
				},
				_inp=_holder.find("input[name="+_settings.name+"]"),							
				_info=_holder.find("input[rel="+_settings.name+"]");
			switch(_settings.name){//special
				case "username"://�û���ר��
					var _suggestDomain=new function(){
							var __self=this,
								__defaultHTML='<li class="title">��ѡ����������...</li>',								
								__selfHolder=_holder.find("div>ul").html(__defaultHTML),//�����ʺ�����								
								__currentIndex=0,//��ǰѡ���������λ��
								__total=0,//��������
								__getCurrent=function(){
									return __selfHolder.children(":eq("+(__currentIndex+1)+")");
								},
								__hoverCurrent=function(){//������ǰ									
									__getCurrent().triggerHandler("mouseover");
								},
								__hideOnly=function(){
									__selfHolder.parent().hide();
								},
								__resetInpBlur=function(){//����blur�¼����ѽ����ѡ��ǰѡ�����أ����ϱ���inp���¼���֤
									_resetBlur(function(){										
										if(__total>0) _inp.val(__getCurrent().text());
										__hideOnly();
									});
								};							
							this.show=function(){								
								__selfHolder.parent().show();
								__resetInpBlur();
							};							
							this.hide=function(){
								_bindBlur();
								__hideOnly();
							};
							this.clear=function(){
								__total=0;
								__currentIndex=0;
								__selfHolder.empty().html(__defaultHTML);
							};
							this.add=function(v){								
								++__total;
								var hoverClass="hover";
								$("<li>",{
									text:v,
									"class":(__total-1==__currentIndex)?hoverClass:"",
									index:__total-1,
									click:function(e){
										_inp.val($(this).text());
										__self.hide();
										_self.blur();									
									}
								}).hover(function(){									
									__currentIndex=parseInt($(this).attr("index"));
									__selfHolder.children().removeClass(hoverClass);
									$(this).addClass(hoverClass);
								}).appendTo(__selfHolder);
							};
							this.down=function(){
								if(__total>1){
									__currentIndex=(__currentIndex==__total-1)?0:__currentIndex+1;
									__hoverCurrent();									
								}
								__resetInpBlur();
							};
							this.up=function(){
								if(__total>1){
									__currentIndex=(__currentIndex==0)?__total-1:__currentIndex-1;
									__hoverCurrent();									
								}
								__resetInpBlur();
							};
						};
					_inp.keyup(function(e){//��������
						switch(e.which){
							case 38://��
								_suggestDomain.up();	
								break;
							case 40://��
								_suggestDomain.down();
								break;
							default://other word
								_self.passStatus=false;
								_suggestDomain.clear();
								var _v=$(this).val(),									
									_matchTotal=0;
								if(_v!=""){
									var _m=_v.match(/^([\w-\.]+)@([^$]*)/);
									if(_m){
										var _typeDomain=_m[2].toLowerCase();
										for(var domain in mailDomain){
											if(domain.indexOf(_typeDomain)==0&&++_matchTotal<maxDomain){
												_suggestDomain.add(_m[1]+"@"+domain);
											}
										}
									}
									else{
										for(var domain in mailDomain){
											if(++_matchTotal<maxDomain){
												_suggestDomain.add(_v+"@"+domain);
											}								
										}
									}
								}
								if(_matchTotal==0) _suggestDomain.hide();
								else _suggestDomain.show();								
								break;
						}
					})
					.val(tips.username.txt)
					.addClass(tips.username["class"])
					.focus(function(){//��һ��focusȡ��Ĭ��tips���ݺ�tips class
						if(_inp.val()==tips.username.txt) _inp.val("").removeClass(tips.username["class"]);
						_inp.unbind("focus");
					});
					break;
				case "captcha"://��֤��ר��
					var _captchaHolder=_holder.find("span");//��֤������
					this.showCaptchaLoading=function(){
						_captchaHolder.empty().show();
					};
					this.showCaptcha=function(img){
						_captchaHolder.append(img);
					};
					break;
				case "m_username"://�ֻ��ʺ�
					_inp.val(tips.m_username.txt)
					.addClass(tips.m_username["class"])
					.focus(function(){//��һ��focusȡ��Ĭ��tips���ݺ�tips class
						if(_inp.val()==tips.m_username.txt) _inp.val("").removeClass(tips.m_username["class"]);
						_inp.unbind("focus");
					});
					break;
			}
			//��ѡ��ֵ
			this.val= /password/.test(_settings.name) ? function(){return _inp.val();} : function(){return $.trim(_inp.val());};
			this.passStatus=false;//�Ƿ�ͨ����֤
			this.reset=function(){
				_self.none();
				_self.passStatus=false;
				_self.val("");
			};
			//��ʾ������Ϣ
			this.error=function(errorMsg){
				_self.passStatus=false;
				_inp.addClass(_hiddenClass);
				_info.val(errorMsg).removeClass(_hiddenClass);				
				_self.none();
				_chkHolder.addClass("error");
			};
			//��ʾ��ȷ
			this.right=function(){
				_self.passStatus=true;
				_info.addClass(_hiddenClass);			
				_inp.removeClass(_hiddenClass);
				_self.none();
				if(_settings.name!="smscode")_chkHolder.addClass("right");
			};
			//��ʾ������
			this.loading=function(){
				_self.none();
				_chkHolder.addClass("loading");	
			};
			//����ʾicon
			this.none=function(){
				_chkHolder.removeClass("loading error right");
			};			
			/*
			* ���
			* callback:���ؽ���Ļص�����callback�Ĳ���Ϊ�Ƿ�ͨ����֤
			*/
			this.chk=function(callback){
				if($.isFunction(_settings.focusCallBack)) _settings.focusCallBack();	
				_doing=true;
				_self.loading();
				var _dealResult=function(result){
					if(result!=true) _self.error(result);
					else _self.right();
					_doing=false;
					if($.isFunction(callback)) callback(_self.passStatus);
				};
				if(_settings.asy&&_self.passStatus) _dealResult(true);//�첽��Ŀ�ı�������֤�ɹ���������֤,�����������������
				else if($.isFunction(_settings.rule)){
					//�첽����
					if(_settings.asy) _settings.rule(_self.val(),_dealResult);
					//û���첽����
					else _dealResult(_settings.rule(_self.val()));
				}
			};			
			this.blur=function(){
				_inp.triggerHandler("blur");
			};
			/*
			*bind event
			*/
			//(function(){
				_bindBlur();				
				if($.isFunction(_settings.focusCallBack)) _inp.focus(_settings.focusCallBack);				
				_info.focus(function(e){
					_self.none();
					_inp.removeClass(_hiddenClass).trigger("focus");
					_info.addClass(_hiddenClass);			
				});
			//})();
		},
		/*
		* ������ѡ�����
		*/
		Items=function(names,form,focusCallBack){
			var _self=this,				
				_data={},				
				_chkDoing=false,
				_total=names.length,//total item
				_focusCallBack=focusCallBack,
				_form=form;			
			this.get=function(name){				
				return _data[name];
			};
			this.blur=function(name){
				_self.get(name).blur();
			};
			this.getVal=function(name){				
				return _self.get(name).val();
			};
			//���
			this.clear=function(){
				_total=0;
				_data={};
			};
			/*
			*���ȫ����ѡ��
			*����callback
			*/
			this.chkAll=function(allPassCallback,notPassCallBack){
				if(!_chkDoing){
					_chkDoing=true;
					var passTotal=0,//ͨ����Ŀ����
						chkTotal=0;//������
					for(var name in _data){						
						_self.get(name).chk(function(pass){
							if(++chkTotal==_total) _chkDoing=false;
							if(++passTotal==_total) pass?allPassCallback():notPassCallBack();
						});
					}
				}
			};
			/*
			 * ��ȡȫ����Ŀ��ֵ����
			 */
			this.getItemVals=function(){
				var result={};
				for(var name in _data){
					if(!/repassword/.test(name))//dont send repassword
						result[name]=/^(password|activityid1|activityid2)$/.test(name)?encodeURIComponent(encodeURIComponent(_self.getVal(name))):_self.getVal(name);
				}				
				return result;
			};
			this.reset=function(){
				_form[0].reset();
				for(var name in _data){					
					_data[name].reset();
				}
			};
			for(var i=0,l=names.length;i<l;i++){				
				var _name=names[i].name,
					data=allItemRule[_name];				
				data["name"]=_name;
				data["form"]=_form;
				if($.isFunction(_focusCallBack)) data["focusCallBack"]=_focusCallBack;
				_data[_name]=new Item(data);
			}
		},
		/*
		 * ȫ��ѡ�����,��Ҫ���tab�л�
		 * data:{holderName:items}
		 */
		ALLITEMS=function(qUrs,data){
			var _self=this,
				_data=[],
				_UA=[],//�û��ʺ�����:username|m_username
				_activeIndex=0,//Ĭ����ʾ��form			
				_tab=$("<ul class=qr-tab>").appendTo(qUrs.holder),//tab��ǩ
				_tabs=[],//��ǩ���鼯��
				_regType=[],//ע�����ͼ���1:����ע��;2:�ֻ�����ע��
				_tabCurrentClass="qr-tab-current",
				_time=180,
				_timer=null,//tab�л���ʱ��
				_display=function(_index){
					_activeIndex=_index;
					_self.currentItems=_data[_activeIndex].items;
					for(var i=0,l=_data.length;i<l;i++){
						if(i!=_activeIndex){
							_data[i].form.hide();
							_tabs[i].removeClass(_tabCurrentClass);
						}
					}
					_data[_activeIndex].form.show();
					_tabs[_activeIndex].addClass(_tabCurrentClass);
				};
			this.getCurrentRegType=function(){//��ȡ��ǰע������ 1:����ע��;2:�ֻ�����ע��
				return _regType[_activeIndex];
			};
			this.currentItems=null;//��ǰѡ�
			this.getCurrentUA=function(){//��ȡ��ǰ�û������ֻ����������
				return _UA[_activeIndex].name;
			};
			this.getForm=function(){
				return _data[_activeIndex].form;
			};
			this.getItems=function(){
				return _data[_activeIndex].items;
			};	
			this.active=function(tabTxt){//����
				for(var i=0,l=_tabs.length;i<l;i++){
					if(_tabs[i].text()==tabTxt){
						_display(i);
						break;
					}						
				}
			};
			for(var i=0,l=data.length;i<l;i++){
				_UA.push(data[i].names[0]);
				_regType.push(data[i].regType);
				(function(){
					var __index=i,
						__over=false;
					_tabs[i]=$("<li>",{						
								text:data[i].tabName,
								"class":_activeIndex==i?_tabCurrentClass:""
							}).appendTo(_tab)
							.hover(function(){
								__over=true;
								clearTimeout(_timer);						
								_timer=setTimeout(function(){
									if(__over) _display(__index);
								},_time);						
							},function(){
								__over=false;
								clearTimeout(_timer);
							}).appendTo(_tab);
				})();
				var _form=render_and_getForm(data[i].names),
					_items=$.isFunction(data[i].focusCallBack)?new Items(data[i].names,_form,data[i].focusCallBack):new Items(data[i].names,_form);				
				if(i==_activeIndex) _self.currentItems=_items;
				else _form.hide();
				//����ύ
				_form.submit(function(e){					
					if(!promark){					
						alert("ע��ʧ�ܣ�����ϵ�ͷ���[1]");
						return;
					}
					else if(!$(e.target).find("input[name=agree]").is(":checked")){
						alert("������ܷ����������ע�ᡣ");
						return;
					}
					if(submit_doing) return;
					submit_doing=true;
					allItems.currentItems.chkAll(function(){
						submitFn(allItems.currentItems.getItemVals());
					},function(){
						submit_doing=false;
					});					
				});
				qUrs.holder.append(_form);
				_data.push({"items":_items,"form":_form});
			}			
		},
		allItems=null;//ȫ������	
	/*
	* ����
	* type: 1:��Ҫ��֤��;2:����Ҫ��֤��
	*/
	switch(settings.type){
	  case 1://��Ҫ��֤��		  
		  	var captcha=new Captcha(),
		  		loadCaptcha=function(){			
				  var _o=allItems.currentItems.get("captcha"),
					  _clickFn=arguments.callee;				  
				  _o.showCaptchaLoading();
				  captcha.load(false,function(img){
					  img.click(_clickFn);
					  _o.showCaptcha(img);		
				  });
			  };
			allItems=new ALLITEMS(self,[{
				tabName:"����ע��",
				names:[{cn:"�ʼ���ַ",name:"username"},{cn:"��������",name:"password"},{cn:"ȷ������",name:"repassword"},{cn:"��֤��",name:"captcha"}],
				focusCallBack:function(){
					ot.firstStart();
					if(!captcha.has&&!captcha.doing) loadCaptcha();
				},
				regType:1
			},
			{
				tabName:"�ֻ�ע��",
				names:[{cn:"�ֻ�����",name:"m_username"},{cn:"��֤��",name:"smscode"},{cn:"��������",name:"m_password"},{cn:"ȷ������",name:"m_repassword"}],				
				regType:2
			}
			]);			  
		  break;	 
	  case 2://����Ҫ��֤��
		  allItems=new ALLITEMS(self,[{
				  tabName:"����ע��",
				  names:[{cn:"�ʼ���ַ",name:"username"},{cn:"��������",name:"password"},{cn:"ȷ������",name:"repassword"}],
				  focusCallBack:function(){
					ot.firstStart();
				  	ID.load();
				  },
				  regType:1
			  },			              
	          {
				  tabName:"�ֻ�ע��",
				  names:[{cn:"�ֻ�����",name:"m_username"},{cn:"��֤��",name:"smscode"},{cn:"��������",name:"m_password"},{cn:"ȷ������",name:"m_repassword"}],
			  	  regType:2
			  }
			]);
		  break;
	}
};

