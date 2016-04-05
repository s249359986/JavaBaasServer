/**
 * Created by bill on 16/3/9.
 */



angular.module('baas').factory('fileService', ['$q', 'rest', function ($q, rest) {

    /*
     * name:sdh
     * date:16-03-09
     * fun:getToken
     *
     * */
    function getToken(id,opt)
    {

        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
//        var req = {
//            method: 'get',
//            url:"file/getToken"+"?fileName="+opt.fileName+"&platform=qiniu"
//        };
        var req = {
            method: 'GET',
            url:'file/getToken'+'?fileName='+opt.fileName+'&platform=qiniu',
            data: {}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);


        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;

    }




    return {getToken:getToken};

}]);
