var express = require('express');
var router = express.Router();
var axios = require('axios');
var zk = require('../util/zk');
var config = require('../config/config.js');
var SERVICE_ROOT_PATH='/com.xk.msa.registry';
const asyncHandler = require('../middleware/asyncHandler');










/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tend', function(req, res, next) {
  axios({
    method: 'post',
    url: 'http://192.168.1.148:3100/100/tenant/l.do?t=0.7777453821080116',
    data: {
      tenantCode: 'hcyzh'
    },
    headers:{
      'Service-Name': 'm100',
      'XK-Autho1.0.0': 'token ZYXK_NOT_LOGIN_TOKEN'
    }
  }).then(function(response) {
    res.send(response.data)
  });
});



module.exports = router;
