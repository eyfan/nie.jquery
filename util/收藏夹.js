/**
 * @author Lam
 */
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
                        }  
                        catch (e) 
 { 
                                alert("��Ǹ�������������֧��ֱ����Ϊ��ҳ�������������ַ�����롰about:config�����س�Ȼ��[signed.applets.codebase_principal_support]����Ϊ��true��������������ղء�����԰�ȫ��ʾ���������óɹ���");  
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}