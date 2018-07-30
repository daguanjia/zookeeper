const httpProxy = require('http-proxy');
const proxy =  httpProxy.createProxy({proxyTimeout: 30000, changeOrigin: true});
const config = require('../config/config.js');
const zk = require('../util/zk');
const cache = require('../util/localStorage');

proxy.on('error', function (err, req, res) {
    const result={
        code: '00040003',
        result: '代理服务出错！'
    }
    res.end(result);//输出空白数据
});

proxy.on('proxyRes', function (proxyRes, req, res) {
 
});

proxy.on('proxyReq', function (proxyReq, req) {
    if(req.body){
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.setHeader('XK-Autho1.0.0', 'token ' + (req.session.token || 'ZYXK_NOT_LOGIN_TOKEN'));
        proxyReq.setHeader('userInfo', JSON.stringify(req.session.userInfo || {}));
        proxyReq.write(bodyData);
    }
});

function reverseProxy(req, res, next) {
    const moudleName = req.get('Service-Name');
    const key=config.MOUDLES[moudleName];
    const path= cache.getItem('serviceAddress')[key];
    if(path){
        const proypath=path._pool;
        proxy.web(req, res, {target: 'http://' + proypath}); 
    }else{
        const result={
            code: '00040002',
            result: '未找到授权服务！'
        }
        res.json(result);
    }
}

module.exports = reverseProxy;