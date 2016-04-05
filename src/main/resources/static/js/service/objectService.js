/**
 * Created by bill on 15/12/31.
 */


angular.module('baas').factory('objectService', ['$q', 'rest', function ($q, rest) {
    var currentClazzFieldsModel=[];
    var curQuery='{}';
    var curOrder='{"createdAt":-1}';
    var curPage={
        skip:0,
        limit:20
    };
    function setOrder(o)
    {
        curOrder=o;
    }
    function getOrder()
    {
        return curOrder;
    }

    function setQuery(q)
    {
        curQuery=q;
    }
    function getQuery()
    {
      return curQuery;
    }
    function setPage(opt)
    {
        curPage=opt||{skip:0,limit:20}
    }
    function getPage()
    {
        return curPage;
    }
    function getDataList(id,className,params)
    {
        var tempCurQuery=getQuery();
        var tempCurOrder=getOrder();
        if(tempCurQuery instanceof BASJS.Query)
        {
            tempCurQuery=tempCurQuery.getQueryString();
        }
        if(tempCurOrder instanceof BASJS.Query)
        {
            curOrder=tempCurOrder.getOrderObj();
        }

        var tempCurPage=getPage();
        var req = {
            method: 'GET',
            url: 'object/'+className,
            data: {},
            params:{skip:tempCurPage.skip,limit:tempCurPage.limit,where:tempCurQuery,order:curOrder}
        };
        var deferred = $q.defer();
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            currentClazzFieldsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;


    }



    /*
     * name:sdh
     * date:16-03-10
     * fun:getACount
     *
     * */
    function getACount(id,opt)
    {
        var tempCurQuery=getQuery();
        if(tempCurQuery instanceof BASJS.Query)
        {
            tempCurQuery=tempCurQuery.getQueryString();
        }

        var tempCurPage=getPage();
        var deferred = $q.defer();
        var req = {
            method: 'GET',
            url: 'object/'+opt.className+"/count",
            data:{},
            params:{skip:tempCurPage.skip,limit:tempCurPage.limit,where:tempCurQuery}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);

            //currentClazzFieldsModel.push({name:opt.columnName});

        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }







    /*
     * name:sdh
     * date:16-02-29
     * fun:addData
     *
     * */
    function addData(id,opt)
    {
        var deferred = $q.defer();
        var req = {
            method: 'POST',
            url: 'object/'+opt.className,
            data:opt.data||{}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);

            //currentClazzFieldsModel.push({name:opt.columnName});

        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }
    /*
     * name:sdh
     * date:16-03-02
     * fun:updateData
     *
     * */
    function updateData(id,opt)
    {
        var deferred = $q.defer();
        var req = {
            method: 'put',
            url: 'object/'+opt.className+"/"+opt.id,
            data:opt.data||{}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);

            //currentClazzFieldsModel.push({name:opt.columnName});

        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }

    function getDataCount(id,className,params)
    {

        var req = {
            method: 'GET',
            url: 'object/'+className+'/count',
            data: {}
        };
        var deferred = $q.defer();
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            currentClazzFieldsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;


    }

    function deleteData(id,className,ids)
    {
        if(ids)
        {
            if(ids instanceof Array)
            {
                ids=ids.join(",");
            }
        }
        else
        {
            return;
        }

        var req = {
            method: 'delete',
            url: 'object/'+className+'/'+ids,
            data: {}
        };
        var deferred = $q.defer();
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            currentClazzFieldsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;


    }

    function getCurrentClazzFieldsModel(){
        return currentClazzFieldsModel;
    }
    return {getDataList:getDataList,getDataCount:getDataCount,addData:addData,updateData:updateData,deleteData:deleteData,setPage:setPage,getACount:getACount,setQuery:setQuery,setOrder:setOrder};
}]);