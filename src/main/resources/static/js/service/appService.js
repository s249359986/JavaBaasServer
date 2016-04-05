/**
 *
 */
angular.module('baas').factory('appService', ['$q', 'rest', function ($q, rest) {
    return {

        checkAdminKey:function(){
           return rest.checkAdminKey();
        },


        getAdminKey:function ()
        {
            var req = {
                method: 'GET',
                url: 'console/adminKey'
            };
            var deferred = $q.defer();
            rest.ajax(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {

                deferred.reject(response.data);
            });
            return deferred.promise;
        },
        setAdminKey:function(key){
            rest.setAdminKey(key);
        },


        getApp: function (id) {
            var req = {
                method: 'GET',
                url: 'admin/app/' + id,
                data: {}
            };
            var deferred = $q.defer();
            rest.admin(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        },
        getApps: function () {
            var req = {
                method: 'GET',
                url: 'admin/app',
                data: {}
            };
            var deferred = $q.defer();
            rest.admin(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        },
        addApp: function (name) {
            var req = {
                method: 'POST',
                url: 'admin/app',
                data: {
                    name: name
                }
            };
            var deferred = $q.defer();
            rest.admin(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        },
        deleteApp: function (id) {
            var req = {
                method: 'DELETE',
                url: 'admin/app/' + id,
                data: {}
            };
            var deferred = $q.defer();
            rest.admin(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        },
        resetMasterKey: function (id) {
            var req = {
                method: 'PUT',
                url: 'admin/app/' + id + '/resetMasterKey',
                data: {}
            };
            var deferred = $q.defer();
            rest.admin(req).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        }
    };
}]);