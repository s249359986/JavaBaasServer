/**
 * Created by bill on 16/1/4.
 */

angular.module('baas').factory('fieldService', ['$q', 'rest', function ($q, rest) {
    var currentClazzFieldsModel=[];
    var currentDeleteField=null;


    function getFieldList(id,className,params)
    {

        var req = {
            method: 'GET',
            url: 'master/clazz/'+className+'/field',
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
    function deleteField(id,className,params)
    {

        var req = {
            method: 'delete',
            url: 'master/clazz/'+className+'/field/'+params.fieldName,
            data: {}
        };
        var deferred = $q.defer();
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            //currentClazzFieldsModel=response.data;
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;
    }

    function deleteCurrentField(opt)
    {
        var temp=[];
        var k=0;
        for(var i=0;i<currentClazzFieldsModel.length;i++)
        {
            if(currentClazzFieldsModel[i].name==opt.name)
            {
             continue;
            }
            temp[k]=currentClazzFieldsModel[i];
            k++;
        }
        currentClazzFieldsModel=temp;

    }


    function setDeleteField(field)
    {

        currentDeleteField=field;
    }
    function getDeleteField()
    {

       return currentDeleteField;
    }

    function getCurrentClazzFieldsModel(){
        return currentClazzFieldsModel;
    }

    /*
     * name:sdh
     * date:16-01-19
     * fun:addColumn
     *
     * */
    function addField(id,opt)
    {
        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
        var req = {
            method: 'POST',
            url: 'master/clazz/'+opt.clazzName+"/field/",
            data: {name:opt.columnName,type:opt.type,required:opt.required,security:opt.security,internal:opt.internal}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
            currentClazzFieldsModel.push({name:opt.columnName});



        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;

    }




    /*
     * name:sdh
     * date:16-03-23
     * fun:updateColumn
     *
     * */
    function updateField(id,opt)
    {
        var deferred = $q.defer();
        //if(id&&clazzName)
        //{
        var req = {
            method: 'PUT',
            url: 'master/clazz/'+opt.clazzName+"/field/"+opt.columnName,
            data: opt.data||{}
        };
        rest.master(req,id).then(function (response) {
            deferred.resolve(response.data);
         //   currentClazzFieldsModel.push({name:opt.columnName});
        }, function (response) {
            deferred.reject(response.data);
        });
        return deferred.promise;

    }




    return {getDataList:getFieldList,deleteField:deleteField,getCurrentClazzFieldsModel:getCurrentClazzFieldsModel,setDeleteField:setDeleteField,getDeleteField:getDeleteField,addField:addField,deleteCurrentField:deleteCurrentField,updateField:updateField};

}]);
