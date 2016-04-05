/**
 * Created by bill on 15/12/31.
 */

angular.module('baas').factory('clazzService', ['$q', 'rest','$rootScope', function ($q, rest,$rootScope) {


    var clazzsModel={};



    function addClazzsModel(opt)
    {
        $rootScope.$broadcast("createClazz", opt);
    }

    function getClazz(id)
    {
        var req = {
            method: 'GET',
            url: 'master/clazz',
            data: {}
        };
        var deferred = $q.defer();
        rest.master(req,id).then(function (response) {
            clazzsModel=response.data;

            deferred.resolve(response.data);


        }, function (response) {

            deferred.reject(response.data);
        });
        return deferred.promise;


    }
    function getClazzsModel(){
        return clazzsModel;
    }
    /*
    * name:sdh
    * date:16-01-19
    * fun:addClass
    *
    * */
    function addClass(id,clazzName)
    {




        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
            var req = {
                method: 'POST',
                url: 'master/clazz',
                data: {name:clazzName}
            };
            rest.master(req,id).then(function (response) {
                deferred.resolve(response.data);
                clazzsModel=response.data;
            }, function (response) {
                deferred.reject(response.data);
            });

        //}
        //else
        //{
        //    deferred.reject({message:"id或者clazzName不能为空"});
        //}
        return deferred.promise;

    }
    function dropClass(id,clazzName)
    {
        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
        var req = {
            method: 'DELETE',
            url: 'master/clazz/'+clazzName,
            data: {}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            clazzsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });

        //}
        //else
        //{
        //    deferred.reject({message:"id或者clazzName不能为空"});
        //}
        return deferred.promise;

    }
    function dropClazzsModel(opt)
    {
        $rootScope.$broadcast("dropClazz", opt);
    }
    /*
     * name:sdh
     * date:16-01-19
     * fun:addColumn
     *
     * */
    function addColumn(id,opt)
    {
        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
        var req = {
            method: 'POST',
            url: 'master/clazz/'+opt.clazzName+"/field/",
            data: {name:opt.columnName,type:opt.type}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            clazzsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });

        //}
        //else
        //{
        //    deferred.reject({message:"id或者clazzName不能为空"});
        //}
        return deferred.promise;

    }


    return {getClazz:getClazz,getClazzsModel:getClazzsModel,addClass:addClass,addClazzsModel:addClazzsModel,dropClass:dropClass,dropClazzsModel:dropClazzsModel,addColumn:addColumn};

}]);
