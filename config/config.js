var MOUDLES = {
    m000:'/com.xk.msa.registry',
    m100:'/com.xk.msa.config',
    m101:'/com.zyxk.sl.sysadmin',
    m102:'/com.xk.msa.api.caservice',
    m103:'/com.xk.msa.framework',
    m104:'/com.xk.hb.hbpush',
    m105:'/com.xk.hb.hbsms',
    m106:'/com.xk.hb.hbweixin',
    m107:'/com.xk.msa.crservice',
    m108:'/com.zyxk.sl.ctservice',
    m109:'/com.zyxk.sl.cgservice',
    m110:'/com.zyxk.sl.fileservice',
    m111:'/com.zyxk.sl.chservice',
    m112:'/com.zyxk.sl.forumservice',
    m113:'/com.zyxk.sl.adapter.fmservice',
    m114:'/com.zyxk.sl.hylcservice',
    m115:'/com.zyxk.sl.adapter.cardservice',
    m116:'/com.xk.hb.hbadapter',
    m117:'/com.zyxk.sl.wsdcservice',
    m118:'/com.zyxk.sl.wsgwservice',
    m119:'/com.zyxk.sl.wsdxservice',
    m120:'/com.zyxk.sl.portal',
    m121:'/com.zyxk.sl.console',
    m122:'/com.zyxk.sl.logservice',
    m123:'/com.xk.hb.hbplatform',
    m124:'/com.zyxk.sl.wsdgservice',
    m125:'/com.zyxk.sl.mailservice',
    m126:'/com.zyxk.sl.kcglservice',
    m127:'/com.zyxk.sl.pad.kcgl',
    m128:'/com.zyxk.sl.smservice'
};

var RESCODE = {
    zookeepererror:'00040000',//zookeeper报错
    notjson:'00040001',//代理返回非Json数据
    proxyerror:'00040002',//代理出错，比如超时
    notlogin:'00040004',//未登陆
    invalidurl:'00040005',//非法请求
    zookeeperconnecterror:'00040006'//zookeeper连接报错
};

exports.MOUDLES = MOUDLES;

exports.RESCODE = RESCODE;