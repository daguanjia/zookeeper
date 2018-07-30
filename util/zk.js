const zookeeper = require('node-zookeeper-client');
const REGISTRY_NAME = process.env.zookeeperserver;
const SERVICE_ROOT_PATH='/com.xk.msa.registry';
const zkClient = zookeeper.createClient(REGISTRY_NAME,{ sessionTimeout: 10000 });
const config = require('../config/config.js');
const loadbalance = require('loadbalance');
const cache = require('./localStorage');

cache.setItem('serviceAddress', {});

function connect() {
    zkClient.connect();
    zkClient.once('connected', function() {
        console.log('Connected to ZooKeeper.');
        getServices(SERVICE_ROOT_PATH);
    });
}

/**
 * 获取服务列表
 */
function getServices(path) {
    zkClient.getChildren(
        path,
        function(event) {
            console.log('Got Services watcher event: %s', event);
            getServices(SERVICE_ROOT_PATH);
        },
        function(error, children, stat) {
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                return;
            }
            // 遍历服务列表，获取服务节点信息
            children.forEach(function(item) {
                getService(path + '/' + item);
            })

        }
    );
}

/**
 * 获取服务节点信息（IP,Port）
 */
function getService(path) {
    zkClient.getChildren(
        path,
        function(event) {
            console.log('Got Serivce watcher event: %s', event);
            getService(path);
        },
        function(error, children, stat) {
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                return;
            }
            if(children.length){
                children.forEach(function (t) {
                    zkClient.getData(
                        path + '/' + t,
                        function (event) {
                            console.log('Got event: %s.', event);
                        },
                        function (error, serviceAddress, stat) {
                            if (error) {
                                console.log(error.stack);
                                return;
                            }
                            var key= path.slice(20);
                            cache.getItem('serviceAddress')[key] = loadbalance.roundRobin(serviceAddress.toString('utf8'));
                            // 打印节点信息
                            console.log('path: ' + path + '----' + '节点：' + serviceAddress);
                        }
                    );
                })
         

            }

        }
    );
}




exports.connect = connect;

