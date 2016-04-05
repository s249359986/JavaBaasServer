angular.module('baas').factory('rest', ['$http', '$q', function ($http, $q) {
    //服务器地址
  //  var host = "http://127.0.0.1:8080/api/";

    //var host = "http://127.0.0.1:9010/api/";

//    var host = "http://192.168.31.161:8080/api/";
//    var userHost = "http://192.168.31.161:8080/";




//    var host = "http://127.0.0.1:8080/api/";
//    var userHost = "http://127.0.0.1:8080/"; //192.168.31.104



    var host = "http://192.168.31.104:8090/api/";
    var userHost = "http://192.168.31.104:8090/"; //192.168.31.104



    var adminKey = "";//"V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc";


  //  var adminKey = "V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc";//"V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc";

    var rest = {
        apps: [],
        setAdminKey:function(key){
            adminKey=key;

        },
        checkAdminKey:function(){
            if(adminKey)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        getTimestamp: function getTimestamp() {
            return new Date().getTime();
        },
        getAdminSign: function getAdminSign(timestamp) {
            var deferred = $q.defer();
            if(rest.checkAdminKey())
            {

                deferred.resolve({code:0,data:{adminSign:hex_md5(adminKey + ":" + timestamp)}});

              //  return hex_md5(adminKey + ":" + timestamp);
            }
            else
            {
                var req = {
                    method: 'GET',
                    url: 'console/adminKey'
                };

                rest.ajax(req).then(function (response) {

                    //deferred.resolve(response.data);
                    var tempAdminKey=response.data.key;
                    rest.setAdminKey(tempAdminKey);

                    deferred.resolve({code:0,data:{adminSign:hex_md5(tempAdminKey + ":" + timestamp)}});

                    //return hex_md5(tempAdminKey + ":" + timestamp);
                }, function (response) {


                    deferred.reject(response.data);
                });
            }

            return deferred.promise;


        },
        getMasterSign: function getMasterSign(masterKey, timestamp) {
            return hex_md5(masterKey + ":" + timestamp);
        },
        admin: function (request) {
            var timestamp = rest.getTimestamp();
            var deferred = $q.defer();
            rest.getAdminSign(timestamp).then(function(data){

                var adminSign =data.data.adminSign;
                    request.url = host + request.url;
                request.headers = {
                    'JB-Plat': 'admin',
                    'JB-Timestamp': timestamp,
                    'JB-AdminSign': adminSign,
                    'Content-Type': 'application/json'
                };
                $http(request).then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (response) {
                        console.dir(response);
                        deferred.reject(response);
                    });
            },function(data){

                deferred.reject({data:{code:1,data:null}});

            });
            return deferred.promise;
        },
        master: function (request, appId) {
            var deferred = $q.defer();
            var timestamp = rest.getTimestamp();

            rest.getApp(appId)
                .then(
                    function (app) {
                        var masterSign = rest.getMasterSign(app.masterKey, timestamp);
                        request.url = host + request.url;
                     //   request.withCredentials=false;
                        request.headers = {
                            'JB-Plat': 'admin',
                            'JB-Timestamp': timestamp,
                            'JB-AppId': appId,
                            'JB-MasterSign': masterSign,
                            'Content-Type': 'application/json'
                        };
                        return $http(request);
                    })
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (response) {
                        console.dir(response);
                        deferred.reject(response);
                    });
            return deferred.promise;
        },
        getApp: function (appId) {
            var deferred = $q.defer();
            if (rest.apps[appId]) {
                deferred.resolve(rest.apps[appId]);
            } else {
                var req = {
                    method: 'GET',
                    url: 'admin/app/' + appId,
                    data: {}
                };
                rest.admin(req).then(function (response) {
                    rest.apps[appId] = response.data;
                    deferred.resolve(rest.apps[appId]);
                }, function (response) {
                    deferred.reject(response.data);
                });
            }
            return deferred.promise;
        },
        ajax:function(request){
//            var request=opt.request;
//            var timestamp = rest.getTimestamp();
//            var adminSign = rest.getAdminSign(timestamp);
            request.url = userHost + request.url;
            request.withCredentials=true;


//            request.headers = {
//
//                'Content-Type': 'application/json'
//            };
            var deferred = $q.defer();
            $http(request).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    console.dir(response);
                    deferred.reject(response);
                });
            return deferred.promise;

        }
    };
    return rest;
}]);