/*
���
nie.util.abc({
	"promark":"",//��������promark
	"callBack":"",//��ȡ�����������첽����
	"type":"js"//���������ͣ���ʱ��js
});
*/
nie.util.abc=nie.util.abc||function(options){
	var params=["promark","callBack","type"];
	for (var i=0,l=params.length;i<l;i++ ){
		if(typeof(options[params[i]) =="undefined") return;
	}
	switch(options.type){
		case "js":
			$.include("http://webdog.nie.163.com/abc/updater/"+options.promark,$(callBack));
			break;
	}

}