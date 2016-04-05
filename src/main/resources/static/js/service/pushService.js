/**
 *
 */
angular.module('baas').factory('pushService', ['$q', 'rest', function ($q, rest) {
    return {
        setPushAccount: function (id, key, secret) {
            var req = {
                method: 'PUT',
                url: 'master/push/setPushAccount',
                data: {
                    key: key,
                    secret: secret
                }
            };
            var deferred = $q.defer();
            rest.master(req, id).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        }
    };
}]);