/**
 * Created by bill on 16/3/1.
 */
angular.module('baas').factory('userService', ['$q', 'rest', function ($q, rest) {




    function signin(name,pwd)
    {
        var tempPwd=hex_md5(name + "_._" + pwd);


        var req = {
            method: 'GET',
         //   url: 'console/login'+'?username=admin&password=1bb078ef2a38b6ac43a9c7d4207e6d16'

            url: 'console/login'+'?username='+name+'&password='+tempPwd
            //url: 'console/login'
         //   data:{username:"admin",password:"1bb078ef2a38b6ac43a9c7d4207e6d16"}
        };
        var deferred = $q.defer();
        rest.ajax(req).then(function (response) {

            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;


    }
    function signout()
    {
        var req = {
            method: 'GET',
            url: 'console/logout?username=admin'
        };
        var deferred = $q.defer();
        rest.ajax(req).then(function (response) {

            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }

    return {signin:signin,signout:signout};

}]);