/*
__NIE_copyRight_siteName="��Ʒ��";//�������˫2:dtws2
__NIE_copyRight_whiteStyle=true;//�Ƿ�ʹ�÷���ģʽ,Ĭ��ȫվ����ģʽ��:qnٻŮ��qn2ٻŮ2��zd�صش��桢csxy�������Ρ�zgս����dotaӢ������

*/
(function(){
  var path="http://res.nie.netease.com/comm/NIE_copyRight/images/",
			html="",					
			t1="�����α���",
			t2="��������",
			bcode="",
			wcode="������[2011]0522-079��",
		    wcode_hanyan="������[2009]156��",
			logo="",
			showPart1=true,
			age=16,
			sug='����Ϸ����������ý���',
			agePermision='����Ϸ�ʺ�$age�����ϵ���ҽ��롣<br />',
			suggestion='������������Ϸ��̬�ǽ�����Ϸ�Ŀ��ˣ�����Ϸ����������ý��գ��������������Ϸʱ�䣬���������ϷӰ�����ע�����ұ����������������塣<br />',
			infoStr=' <a href="http://nie.163.com/bs/ca_lianyun.html" target="_blank">�����ƹ�</a> -',
			centerCode='<a href="http://www.cogcpa.org" target="_blank">�й�������Ϸ��Ȩ�������˾ٱ�����</a>',
			addInfo=false,
			plusCode="",
			get_pngImg=function(width,height,imgUrl,linkUrl){
				var bgStyle = lteIE6 ? "_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+imgUrl+"')":"background:url("+imgUrl+") no-repeat",
					style='width:'+width+'px;height:'+height+'px;display:inline-block;'+bgStyle;
				if(!linkUrl) style+=";cursor:default";
				return '<a href='+(linkUrl?linkUrl:"javascript:void(0);")+' target="_blank" style="'+style+'"></a>&nbsp;&nbsp;&nbsp;&nbsp;';
			},						
			ua=navigator.userAgent,			
			copyRight_style=1,
		    site=function(){
				var v = /^((?:[^\.]+\.){1,3})163\.com$/i.exec(window.self.location.hostname);
				return (v!=null&&v.length==2)?(v[1].substring(0,v[1].length-1)).toLowerCase():null;
			}(),
			lteIE6=/msie/i.test(ua)&& 6>=parseInt(ua.match(/.+ie[\/: ]([\d.]+)/i) [1]);//�Ƿ�С�ڵ���ie6
  if(typeof __NIE_copyRight_siteName=="undefined"){
	if(site==null) site="nie";
  }else{
	site=__NIE_copyRight_siteName;
  }
  switch(site){
	  case "xyq":		  		
		bcode=t1+"��2005��017�ţ�2011��C-RPG042��";
		break;
	  case "xy2":
		bcode=t1+'��2005��016��';
		break;
	  case "xy3":
		bcode=t1+'(2011)C-RPG089��';
		break;
	  case "xyw":
		bcode=t1+'[2010]C-RPG026��';
		break;
	  case "pk"://ԭxyw
		bcode=t1+'(2011)C-RPG090��';
		addInfo=true;
		break;
	  case "dt":
		bcode=t1+'(2011)C-RPG096��';
		break;
	  case 'gamebase':
		agePermision='';
		suggestion='';
		break;
	  case 'nie':
		agePermision='';
		suggestion='';
		break;
	  case 'tx2':
		age=18;
		break;
	  case 'tx3':
		age=18;
		bcode=t1+"(2011)C-RPG151��";
		wcode=wcode_hanyan;
		break;
	  case 'dt2':
		age=18;
		bcode=t1+"(2011)C-RPG049��";
		break;	  
	  case "dtws2":
		age=18;
		bcode=t1+"(2011)C-RPG049��";
		wcode=wcode_hanyan;
		break;
	  case 'jl':
		sug='����Ϸ�淨���������ݷḻ';
		//age=12;
		agePermision="����Ϸ�ʺ�����������ҽ���<br />";
		addInfo=true;
		break;
	  case 'ball':
		bcode=t1+'[2010]C-CSG005��';
		age=12;
		break;
	  case 'pet':
		age=12;
		break;
	  case 'zg':
		copyRight_style=2;
		bcode=t1+'[2010]W-SLG012��';				
		logo=get_pngImg(44,31,path+"leihuo.{s}.png");		
		break;
	  case 'sg':
		bcode=t1+'[2010]W-SLG013��';
		sug='����ϷΪȫ��ͼPK������Ϸ';
		break;
	  case "ff":
		bcode=t1+'[2010]C-RPG001��';
		age=14;				
		break;
	  case "popogame":
		  bcode=t2+'[2008]011��';
		  break;
	  case "gs":
		agePermision='';
		suggestion='';
		break;
	  case "fj":
		bcode=t1+'[2010]C-CSG002��';
		break;
	  case "rich":
		bcode=t1+'[2010]C-CSG002��';
		break;
	  case "st":
		bcode= t1+'[2010]C-CSG004��';
		break;
	  case "qn":			
		copyRight_style=2;					
		logo=get_pngImg(44,31,path+"leihuo.{s}.png");
		bcode= t1+'(2011)C-RPG007��';
		wcode=wcode_hanyan;
		break;
	  case "qn2":			
		copyRight_style=2;					
		logo=get_pngImg(44,31,path+"leihuo.{s}.png");
		bcode= t1+'(2011)C-RPG007��';
		wcode=wcode_hanyan;
		break;
	  case "f":
		wcode=wcode_hanyan;
		break;
	  case 'csxy':
		copyRight_style=2;
		bcode=t1+'(2011)C-RPG051��';				
		break;			
	  case "xjc":
		bcode=t1+"(2011)W-RPG149��";
		break;
	  case "zd":
		copyRight_style=2;
	  showPart1=false;
		break;
	  case "wh"://���
		wcode=wcode_hanyan;
		break;
	  case "dota"://Ӣ������
		defaultWhiteLogo=1;
		showPart1=false;
		break;
	  default:
		showPart1=false;
		break;
  }  
  var showMoreInfo=showPart1 && /^\/($|index.html|boot.html)/.test(window.self.location.pathname);
  if(typeof __NIE_copyRight_whiteStyle!="undefined") copyRight_style=(__NIE_copyRight_whiteStyle?2:1);//���÷���ģʽ
  if(showMoreInfo){
	  //plusCode='<br><span id="ncp-l3" style="display:inline-block;padding-top:10px;">'+agePermision.replace("$age",age)+suggestion+'ȫ���Ļ��г�ͳһ�ٱ��绰��12318���Ļ���������Ϸ�ٱ�����ϵ�������䣺<a href="mailto:wlwh@vip.sina.com">wlwh@vip.sina.com</a><br /><a target="_blank" href="http://nie.163.com/news/2010/6/9/442_216957.html">��������Ϸ�������а취��</a>'+bcode+'���������Ļ���Ӫ���֤��'+wcode+'</span>';
	  plusCode='<br><span id="ncp-l3" style="display:inline-block;padding-top:10px;">'+agePermision.replace("$age",age)+suggestion+'ȫ���Ļ��г�ͳһ�ٱ��绰��12318���Ļ���������Ϸ�ٱ�����ϵ�������䣺<a href="mailto:wlwh@vip.sina.com">wlwh@vip.sina.com</a><br /><a target="_blank" href="http://nie.163.com/news/2010/6/9/442_216957.html">��������Ϸ�������а취��</a>'+bcode+'���������Ļ���Ӫ���֤��'+wcode+'</span>';
	  bcode=wcode="";
  }
  else{
	  centerCode='';
  }			  
  //html+='<p id="NIE-copyRight-corp" style="width:100%;line-height:20px;text-align:center;display:inline-block;padding-top:15px;"><span style="position:relative;vertical-align:top;top:3px;display:inline-block;">'+get_pngImg(101,31,path+"netease.{s}.png","http://www.163.com")+''+get_pngImg(111,31,path+"nie.{s}.png","http://nie.163.com")+logo+'</span><span style="text-align:left;display:inline-block;padding-left:10px;"><span id="ncp-l1"><a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">��˾���</a> - <a href="http://help.163.com/" target="_blank">�ͻ�����</a> - <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">��ط���</a> - <a href="http://nie.163.com/about/about.html" target="_blank">������Ϸ</a> - <a href="http://nie.163.com/about/contactus.html" target="_blank">��ϵ����</a> - <a href="http://nie.163.com/bs/business.html" target="_blank">�������</a> -'+(addInfo?infoStr:"")+' <a href="http://nie.163.com/job/" target="_blank">��������</a></span><br /><span id="ncp-l2">���׹�˾��Ȩ���� &copy;1997-2013��'+bcode+'��'+wcode+'  '+centerCode+'</span></span>'+plusCode+'</p>';
  html+='<p id="NIE-copyRight-corp" style="'+(showMoreInfo?'width:'+(suggestion?800:730)+'px;text-align:left;':'width:100%;text-align:center;')+'font-family:simSun,Arial;margin:0 auto;line-height:20px;display:block;padding:15px 0 0 0;"><span style="position:relative;vertical-align:top;top:3px;display:inline-block;">'+get_pngImg(101,31,path+"netease.{s}.png","http://www.163.com")+''+get_pngImg(111,31,path+"nie.{s}.png","http://nie.163.com")+logo+'</span><span style="text-align:left;display:inline-block;padding-left:10px;"><span id="ncp-l1"><a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">��˾���</a> - <a href="http://help.163.com/" target="_blank">�ͻ�����</a> - <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">��ط���</a> - <a href="http://nie.163.com/about/about.html" target="_blank">������Ϸ</a> - <a href="http://nie.163.com/about/contactus.html" target="_blank">��ϵ����</a> - <a href="http://nie.163.com/bs/business.html" target="_blank">�������</a> -'+(addInfo?infoStr:"")+' <a href="http://nie.163.com/job/" target="_blank">��������</a></span><br /><span id="ncp-l2">���׹�˾��Ȩ���� &copy;1997-2013��'+bcode+'��'+wcode+'  '+centerCode+'</span></span>'+plusCode+'</p>';
  document.write(html.replace(/{s}/g,copyRight_style));
})();