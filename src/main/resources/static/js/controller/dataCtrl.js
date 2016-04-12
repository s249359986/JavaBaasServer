/**
 * Created by bill on 15/12/31.
 */
/**
 *
 */
angular.module('baas').controller('dataCtrl', ['$rootScope','$scope', '$stateParams', 'clazzService','appService', function ($rootScope,$scope, $stateParams,clazzService,appService) {
    //获取当前应用信息

    /*
    * controller通信
    *
    * */





//     $scope.$on('to-parent', function(event,data) {
//
//        console.log('ParentCtrl', data);	   //父级能得到值
//    });

    /*
     * 接收来自创建类的广播
     *
     * */
    $rootScope.$on('createClazz',function(event,data){

        $scope.clazzs.push(data);
    });
    $rootScope.$on('dropClazz',function(event,data){
        var tempClass=$scope.clazzs;
        for(var i=0;i<tempClass.length;i++)
        {
            if(tempClass[i].name==data.name)
            {
                tempClass.splice(i,1);
                break;
            }
        }
    });




    var id = $stateParams.id;
    if (id) {
        $rootScope.$on('updateClass',function(event,data){
            clazzService.getClazz(id).then(function(data){
                $scope.clazzs =data;
            },function(data1){

            });
        });




        clazzService.getClazz(id).then(function(data){
            $scope.clazzs =data;
        },function(data1){

        });
    }


}]);
angular.module('baas').controller('clazzCtrl', ['$scope', '$stateParams','clazzService','gridService','objectService','$rootScope','$uibModal', function ($scope, $stateParams,clazzService,gridService,objectService,$rootScope,$uibModal) {
    //获取当前应用信息

    $scope.ctr_id=$stateParams.id;
    $scope.ctr_clazz=$stateParams.clazz;

    $scope.query=function(data)
    {


    }


    /*
    * 删除Class
    * */
    $scope.dropClazz=function()
    {
        var b=window.confirm("确认删除Class"+$stateParams.clazz);
        if(b)
        {
            clazzService.dropClass($stateParams.id,$stateParams.clazz).then(function(data){
                clazzService.dropClazzsModel({name:$stateParams.clazz});

            },function(data1){

            });
        }
    }
    /*
     * 添加行
     * */
    $scope.addRow=function()
    {

        var grid=gridService.getGrid();

        var dd = grid.getData();

        dd.splice(0,0,{});
        grid.invalidateAllRows();
        grid.updateRowCount();
        grid.render();

    }

    /*
     * 删除行
     * 2016-03-02
     *
     * */
    $scope.deleteRow=function()
    {
        var tempSure = window.confirm("确认删除所有选中的数据?");
        if(tempSure)
        {

            var tempDelRows=[];
            var grid=gridService.getGrid();
            var tempRows=grid.getSelectedRows();
            var dd = grid.getData();
            for(var i=0;i<tempRows.length;i++)
            {
                tempDelRows.push(dd[tempRows[i]]._id);
            }
            for(var k=0;k<tempRows.length;k++)
            {
                dd.splice((tempRows[k]),1);
            }
            objectService.deleteData($stateParams.id,$stateParams.clazz,tempDelRows).then(function(data){
                $rootScope.$broadcast("bgDgPageOn");//通知条数
                $rootScope.$broadcast('updateClass');//通知菜单
                grid.setSelectedRows([]);
                grid.invalidateAllRows();
                grid.updateRowCount();
                grid.render();
            });
        }
    }
    $scope.openSetting=function(){
        var modalInstance = $uibModal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'myModalSetting.html',
            controller: 'SettingModalInstanceCtrl'
//            size: size
//            resolve: {
//                items: function () {
//                    return $scope.items;
//                }
//            }
        });




    };


}]);





angular.module('baas').controller('SettingModalInstanceCtrl', ['$scope','$uibModal','fieldService','$uibModalInstance','$window','$stateParams', function ($scope,$uibModal,fieldService,$uibModalInstance,$window,$stateParams) {

    /*
     *
     *
     * 打开设置字段隐藏窗口
     *
     *
     * */
    var tempId=$stateParams.id;
    var tempClazz=$stateParams.clazz;
    var tempStoreName="columns-view-"+tempId+"-"+tempClazz;


    $scope.allVisible=true;


var tempLocalStore=$window.localStorage;

    if(tempLocalStore[tempStoreName])
    {
        $scope.schemaBak=JSON.parse(tempLocalStore[tempStoreName]);
    }
    else
    {

        fieldService.getDataList(tempId,tempClazz).then(function(data){

            $scope.schemaBak=[
                {name:"_id",show:true},
                {name:"createdAt",show:true},
                {name:"updatedAt",show:true}
            ];
            for(var i in data)
            {
                $scope.schemaBak.push({"name":data[i].name,show:true});
            }


            var tempJsonStr=JSON.stringify($scope.schemaBak);

            tempLocalStore[tempStoreName]=tempJsonStr;

        });

    }



    $scope.ok=function(){
        var tempSchemaBak=$scope.schemaBak;
        tempLocalStore[tempStoreName]=JSON.stringify(tempSchemaBak);
        $uibModalInstance.dismiss('cancel');
        $window.location.reload();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.changeAllColumnVisible=function(){
        if($scope.allVisible)
        {
            for(var i=0;i<$scope.schemaBak.length;i++)
            {
                $scope.schemaBak[i].show=true;
            }
        }
        else
        {
            for(var i=0;i<$scope.schemaBak.length;i++)
            {
                $scope.schemaBak[i].show=false;
            }

        }

    }
}]);



angular.module('baas').controller('ModalDemoCtrl', ['$scope','$uibModal','clazzService', function ($scope,$uibModal,clazzService) {


    //获取当前应用信息



    /*
     *
     *
     * 打开查询窗口
     *
     *
     * */

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
           // $log.info('Modal dismissed at: ' + new Date());
        });
    };



    $scope.openColumn = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addColumnModal.html',
            controller: 'addColumnModalCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
        });
    };




    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);








/*
 *
 * 查询的control
 *
 * */

angular.module('baas').controller('ModalInstanceCtrl', function ($scope,$stateParams, $uibModalInstance,gridService,fieldService,objectService,$rootScope) {
    var tempId=$stateParams.id;
    var tempClazz=$stateParams.clazz;
    fieldService.getDataList(tempId,tempClazz).then(function(data){

        $scope.currentCla={
            schema:{
                "createdAt":{type:4,columnModel:{type:4,name:"createdAt"}},
                "updatedAt":{type:4,columnModel:{type:4,name:"updatedAt"}},
                "_id":{type:1,columnModel:{type:1,name:"_id"}}
               // createdAt:{type:0}
            }
        };

        for(var i in data)
        {
          //  $scope.currentCla.schema[data[i].name]={"type":data[i].type};
            $scope.currentCla.schema[data[i].name]={"type":data[i].type,columnModel:data[i]};
        }
    });



    $scope.conditions=[{
        field:"",
        value:"",
        condition:""
    }];
 //   $scope.querys=[["exists","notexists"],["equals","does not equal","start with","exists","does not exist"],["equals","does not equal","less than","greater than","less than or equal to","greater than or equal to","exists","does not exist"],["equals","exists","does not exist"],["before","after","exists","does not exist"],["file"],["object"],["array"],["equals","does not equal","exists","does not exist"]];


    $scope.querys=[[{label:"equals",value:"equalTo"}],[{label:"equals",value:"equalTo"},{label:"does not equal",value:"notEqualTo"},{label:"start with",value:"startsWith"},{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}],
        [{label:"equals",value:"equalTo"},{label:"does not equal",value:"notEqualTo"},{label:"less than",value:"lessThan"},{label:"greater than",value:"greaterThan"},{label:"less than or equal to",value:8},{label:"greater than or equal to",value:9},{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}],
        [{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}],
        [{label:"before",value:"lessThan"},{label:"after",value:"greaterThan"},{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}],
        [{label:"file",value:"file"}],
        [{label:"object",value:"object"}],
        [{label:"contains string",value:"equalTo"},{label:"does not contains string",value:"contains string"},{label:"contains number",value:"contains string"},{label:"does not contains number",value:"contains string"},{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}],//数组类型
        [{label:"equals",value:"equalTo"},{label:"does not equal",value:"notEqualTo"},{label:"exists",value:"exists"},{label:"does not exist",value:"doesNotExist"}]
    ];



    $scope.ok = function () {
        var tempObjQuery=new BASJS.Query(tempClazz);




        var tempArray=$scope.conditions;
        for(var i in tempArray)
        {
            var fnName=tempArray[i].condition;
            var tempKey=tempArray[i].field;
            var tempValue=tempArray[i].value;
            var tempType=$scope.currentCla.schema[$scope.conditions[i].field];
            switch (tempType.type)
            {
                case 1:
                    tempObjQuery[fnName](tempKey,tempValue);
                    break;
                case 2:
                    tempObjQuery[fnName](tempKey,parseInt(tempValue));
                    break;
                case 4://日期
                    tempObjQuery[fnName](tempKey,new Date(tempValue).getTime());
                    break;
                case 8:
                    tempKey+="._id";
                    tempObjQuery[fnName](tempKey,tempValue);
                    break;
                default :
                    tempObjQuery[fnName](tempKey,tempValue);
                    break;
            }
        }

        objectService.setQuery(tempObjQuery);

        objectService.getDataList(tempId,tempClazz).then(function(data){
            var tempGrid=gridService.getGrid();
            tempGrid.setData(data);
            tempGrid.render();

            $rootScope.$broadcast("bgDgPageOn");

            $uibModalInstance.close();

        });

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.addCondition=function(){//添加查询条件
        $scope.conditions.push({
            field:"",
            value:"",
            condition:""});
    }
    $scope.removeCondition=function(index){//删除查询条件
        $scope.conditions.splice(index,1);
    }



});









/*
 *
 * 删除列的control
 *
 * */

angular.module('baas').controller('deleteColumnCtrl', function ($scope, $uibModalInstance,gridService,fieldService,$stateParams) {


    var tempId=$stateParams.id;
    var tempClazz=$stateParams.clazz;
    var tempColumn=fieldService.getCurrentClazzFieldsModel();
    $scope.column=tempColumn;
    var tempSelectValue= $scope.selectValue=fieldService.getDeleteField();
    $scope.ok = function () {

        tempSelectValue=$scope.selectValue;
        fieldService.deleteField(tempId,tempClazz,{fieldName:tempSelectValue}).then(function(data){
            fieldService.deleteCurrentField({name:tempSelectValue});
            var tempGrid=gridService.getGrid();
            var tempGridData = tempGrid.getColumns();
            var tempColumn=[];

            var tempK=0;
            for(var i=0; i<tempGridData.length;i++)
            {
                if(tempGridData[i].field==tempSelectValue)
                {
                    continue;
                }
                tempColumn[tempK]=tempGridData[i];
                tempK++;
            }
            tempGrid.setColumns(tempColumn);
            tempGrid.render();

            $uibModalInstance.dismiss('cancel');

        },function(){});

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.addCondition=function(){//添加查询条件
        $scope.conditions.push({
            field:"",
            condition:""});
    }
    $scope.removeCondition=function(index){//删除查询条件
        $scope.conditions.splice(index,1);
    }
});







/*
*
* 添加列的control
*
* */


angular.module('baas').controller('addColumnModalCtrl', function ($scope,$stateParams, $uibModalInstance,gridService,clazzService,fieldService) {

    var tempFieldTypes=["String","Number","Boolean","Date","File","Object","Array","Pointer","GeoPointer"];
    $scope.fieldTypes=tempFieldTypes;
    $scope.columnRequired=false;//是否必填
    $scope.columnHidden=false;//客户端是否可见  internal
    $scope.read_only=false;
    $scope.ok = function () {
        var tempId=$stateParams.id;
        var tempClazz=$stateParams.clazz;
        var tempColumnName=$scope.newColumnName;
        var tempColumnType=$scope.newColumnType;
        var tempRequired=$scope.columnRequired;
        var tempColumnHidden=$scope.columnHidden;
        var tempUserPrivate=$scope.read_only;
        for(var i=0;i<tempFieldTypes.length;i++)
        {
            if(tempFieldTypes[i]==tempColumnType)
            {
                var tempI=i+1;
                fieldService.addField(tempId,{columnName:tempColumnName,clazzName:tempClazz,type:tempI,required:tempRequired,security:tempColumnHidden,internal:tempUserPrivate}).then(function (data) {
                    if(data.code==0)
                    {
                        var tempGrid=gridService.getGrid();
                        var tempGridData = tempGrid.getColumns();
                        var baasOpt={
                            name:tempColumnName
                        };
                        var BWCLAZZTYPE=[
                            {value:1,title:"String",text:"字符串",formatter:Slick.Formatters.SelfString
                            },
                            {value:2,title:"Number",text:"数字",editor:Slick.Editors.Integer,formatter:Slick.Formatters.SelfNumber},
                            {value:3,title:"Boolean",text:"布尔类型",editor:Slick.Editors.YesNoSelect
                            },
                            {value:4,title:"Date",text:"日期",editor:Slick.Editors.SelfDate,formatter:Slick.Formatters.SelfDate}
                            //{value:4,title:"Date",text:"日期",editor:Slick.Editors.SelfDate}//
                            ,
                            {value:5,title:"File",text:"文件",formatter:Slick.Formatters.SelfFile},//FileText
                            {value:6,title:"Object",text:"对象",editor:Slick.Editors.SelfLongText,formatter:Slick.Formatters.SelfObject},
                            {value:7,title:"Array",text:"数组",editor:Slick.Editors.SelfLongTextArray,formatter:Slick.Formatters.SelfArray},//SelfLongTextArray //SelfArray
                            {value:8,title:"Pointer",text:"指针",editor:Slick.Editors.PointerSelect,formatter:Slick.Formatters.SelfPointer},//PointerSelect
                            {value:9,title:"GeoPointer",text:"地理坐标"}];
                        var tempTypeText="";
                        var tempTypeEditor=Slick.Editors.SelfNumber||Slick.Editors.Text;
                        var tempFormatterValue=Slick.Formatters.SelfDefault;
                        for(var k in BWCLAZZTYPE)
                        {
                            if(BWCLAZZTYPE[k].value==tempI)
                            {
                                tempTypeText=tempColumnName+"  "+BWCLAZZTYPE[k].text;
                                tempTypeEditor=BWCLAZZTYPE[k].editor||Slick.Editors.Text;
                                tempFormatterValue=BWCLAZZTYPE[k].formatter||Slick.Formatters.SelfDefault;
                                break;
                            }

                        }
                        tempGridData.push({id:"",name:tempTypeText,field:tempColumnName,formatter:tempFormatterValue,baasOpt:baasOpt,editor:tempTypeEditor,header:{menu:{items:[{
                           // iconImage: "../images/sort-asc.gif",
                            title: "升序",
                            command: "desc"
                        },{
                           // iconImage: "../images/sort-asc.gif",
                            title: "降序",
                            command: "asc"
                        },{
                         //   iconImage: "../images/sort-asc.gif",
                            title: "删除",
                            command: "delete"
                        }]}

                        }});
                        tempGrid.setColumns(tempGridData);
                        tempGrid.render();
                        $uibModalInstance.dismiss('cancel');
                    }
                }, function (data) {


                });
                break;
            }
        }

      //  $uibModalInstance.close($scope.selected.item);
    };
    //
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});










/*
 *
 * 编辑列的control
 *
 * */


angular.module('baas').controller('editColumnModalCtrl', function ($scope,$stateParams, $uibModalInstance,gridService,clazzService,fieldService,items) {


    $scope.prop={};
    $scope.prop.editColumnName=items.field;
    $scope.prop.required=items.baasOpt.required;//是否必填
    $scope.prop.hidden=items.baasOpt.security;//客户端是否可见  internal
    $scope.prop.read_only=items.baasOpt.internal;

    $scope.ok = function () {
        var tempId = $stateParams.id;
        var tempClazz = $stateParams.clazz;
        var tempColumnName = $scope.prop.editColumnName;

        var tempRequired = $scope.prop.required;
        var tempColumnHidden =$scope.prop.hidden;
        var tempUserPrivate = $scope.prop.read_only;


        var tempData={required:tempRequired,security:tempColumnHidden,internal:tempUserPrivate};

        fieldService.updateField(tempId,{columnName:tempColumnName,clazzName:tempClazz,data:tempData}).then(function (data) {
            if(data.code==0)
            {
                var tempGrid=gridService.getGrid();
                var tempGridColumns = tempGrid.getColumns();
                var tempIndex=tempGrid.getColumnIndex(items.baasOpt.id);
                var tempGridColumn=tempGridColumns[tempIndex];
                tempGridColumn.baasOpt.internal=tempUserPrivate;
                tempGridColumn.baasOpt.required=tempRequired;
                tempGridColumn.baasOpt.security=tempColumnHidden;
                tempGridColumns[tempIndex]=tempGridColumn;
                tempGrid.setColumns(tempGridColumns);
                tempGrid.render();
                $uibModalInstance.dismiss('cancel');
            }
        });
        //
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});







/*
*
* slickGrid - page
* 分页
*
*
* */


angular.module('baas').controller('bgDgPageCtrl', ['$scope', '$stateParams', 'clazzService','fileService','objectService','gridService','$uibModal', function ($scope, $stateParams,clazzService,fileService,objectService,gridService,$uibModal) {



    var tempId=$scope.ctr_id=$stateParams.id;
    var tempClazz=$scope.ctr_clazz=$stateParams.clazz;


    $scope["anUibModal"]=$uibModal;



$scope.pernum="20";

    var tempPage=0;
    var tempLimit=20;



    $scope.loadpage=function(){
        tempLimit=parseInt($scope.pernum);
        objectService.getACount(tempId,{"className":tempClazz}).then(function(data){
            var totalItems=data.data.count;

            $scope.totalPage="总共"+totalItems+"条";
           var tempCurPage=tempPage+1;
            $scope.curPage="第"+tempCurPage+"页";
            objectService.setPage({skip:tempPage*tempLimit,limit:tempLimit});
            objectService.getDataList(tempId,tempClazz).then(function(data){



                var tempGrid=gridService.getGrid();
                tempGrid.setData(data);
                tempGrid.render();
            });

        });
    }



    $scope.$on('bgDgPageOn', function(event,data) {

        objectService.getACount(tempId,{"className":tempClazz}).then(function(data){
            var totalItems=data.data.count;
            $scope.totalPage="总共"+totalItems+"条";

        });
    });





    objectService.getACount(tempId,{"className":tempClazz}).then(function(data){
        var totalItems=data.data.count;
        $scope.totalPage="总共"+totalItems+"条";

    });
    $scope.curPage="第1页";

    $scope.prePage=function()
    {

        if(tempPage<1)
        {return;}
        tempPage--;
        var tempCurPage=tempPage+1;
        $scope.curPage="第"+tempCurPage+"页";
        objectService.setPage({skip:tempPage*tempLimit,limit:tempLimit});
        objectService.getDataList(tempId,tempClazz).then(function(data){

            var tempGrid=gridService.getGrid();
            tempGrid.setData(data);
            tempGrid.render();
        });
    }
    $scope.nextPage=function()
    {

        objectService.getACount(tempId,{"className":tempClazz}).then(function(data){
            var totalItems=data.data.count;
            var totalPage = (totalItems+tempLimit-1)/tempLimit;
            $scope.totalPage="总共"+totalItems+"条";
            if(tempPage>(totalPage-2))
            {
                return;
            }
            tempPage++;
            var tempCurPage=tempPage+1;
            $scope.curPage="第"+tempCurPage+"页";
            objectService.setPage({skip:tempPage*tempLimit,limit:tempLimit});
            objectService.getDataList(tempId,tempClazz).then(function(data){
                var tempGrid=gridService.getGrid();
                tempGrid.setData(data);
                tempGrid.render();
            });

        });


    }

}]);



/*
*
* slickGridController
*
*
* */
angular.module('baas').controller('bgDgCtrl', ['$scope', '$stateParams', 'clazzService','fileService','objectService','gridService','$uibModal', function ($scope, $stateParams,clazzService,fileService,objectService,gridService,$uibModal) {



    var tempId=$scope.ctr_id=$stateParams.id;
    var tempClazz=$scope.ctr_clazz=$stateParams.clazz;
    var tempPage=0;

//    $scope.showRowInfo=function(){
//
//        var modalInstance = $uibModal.open({
//            animation: $scope.animationsEnabled,
//            templateUrl: 'showInfoModalContent.html',
//            controller: 'rowInfoModalCtrl'
////            size: size,
////            resolve: {
////                items: function () {
////                    return $scope.items;
////                }
////            }
//        });
//    }


    $scope.prePage=function()
    {

        if(tempPage<1)
        {return;}
        tempPage--;
        objectService.setPage({skip:tempPage*2,limit:2});
        objectService.getDataList(tempId,tempClazz).then(function(data){

            var tempGrid=gridService.getGrid();
            tempGrid.setData(data);
            tempGrid.render();
        });
    }
    $scope.nextPage=function()
    {
        tempPage++;
        objectService.setPage({skip:tempPage*2,limit:2});
        objectService.getDataList(tempId,tempClazz).then(function(data){
            var tempGrid=gridService.getGrid();
            tempGrid.setData(data);
            tempGrid.render();
        });
    }



    $scope.uploadForm=function(){

        var that=this;
        var fileName=that.files[0].name;
        var _that=$(that);
        var _thatForm=_that.parent().parent("form");
//        var _thatFileText=_thatForm.siblings("input[name='fileValue']");
//        var _uploadTip=_thatForm.children(".uploadTip");
//        _uploadTip.text("上传中...");
        var tempText=_thatForm.find("input[name='uploadHidden']");

        fileService.getToken(tempId,{fileName:fileName}).then(function(result){

            var tempName=result.data.name;
            var tempToken=result.data.token;
            _thatForm.ajaxSubmit({
                type:'post',
                url:"http://upload.qiniu.com/",
                data:{"key":tempName,token:tempToken},
                success:function(data){

                    var tempFile=data.data.file;
                    var tempVal={
                        __type: "File",
                        _id: tempFile._id,
                        name: fileName,
                        //   url:bwConfig.bwQiniuVal.path+tempName
                        url:tempFile.url
                    }
                    tempText.val(JSON.stringify(tempVal));
                    //_uploadTip.text("上传完成");
                    //console.log(data);
                },
                error:function(XmlHttpRequest,textStatus,errorThrown){
                    debugger;

                    console.log(XmlHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });


        },function(data){

        });



    }






}]);










/*
 *
 *
 *
 * 展示row信息
 *
 *
 * */
angular.module('baas').controller('rowInfoModalCtrl', ['$scope', '$stateParams', 'clazzService','fileService','objectService','gridService','$uibModal','items','$uibModalInstance', function ($scope, $stateParams,clazzService,fileService,objectService,gridService,$uibModal,items,$uibModalInstance) {

    function toHtml(obj)
    {


        var tempH1='';

        for(var i in obj)
        {

            if(typeof obj[i] == 'object')
            {


               return tempH1+i+":{"+toHtml(obj[i])+"}";
            }
            else
            {
//                if(typeof tempRow[i]=="boolean")
//                {
//
//                    tempH1+='<div>'+i+":"+obj[i].toString()+'</div>'+',';
//                }
//                else
//                {
                    tempH1+='<div>'+i+":"+obj[i]+'</div>'+',';
                //}

            }


        }
        return tempH1;

    }


    if(items)
    {
        if(items.row)
        {
            var tempRow=items.row;
            $scope.rowView="{"+toHtml(tempRow)+"}";
        }
    }

    //$scope.rowView=tempH;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

//    var tempId=$scope.ctr_id=$stateParams.id;
//    var tempClazz=$scope.ctr_clazz=$stateParams.clazz;
//    var tempPage=0;



}]);












/*
*
* name:sdh
* date:16-01-19
* fun:下拉菜单
* */

angular.module('baas').controller('DropdownCtrl', function ($rootScope,$scope,$uibModal,clazzService) {
    //获取当前应用信息
    $scope.$emit('to-parent', 'parent');
    $scope.open = function (size) {



        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'createClazzModalContent.html',
            controller: 'createClazzCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };








    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        console.log("开");
        //$log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});


/*
* name:sdh
* date:16-01-19
*
* */
angular.module('baas').controller('createClazzCtrl', function ($scope, $uibModalInstance,clazzService,$stateParams) {
    $scope.createClazz = function () {



        var tempClassName=$scope.newClassName;
        var tempId=$stateParams.id;
        clazzService.addClass(tempId,tempClassName).then(function(data){
            if(data.code==0)
            {
                clazzService.addClazzsModel({name:tempClassName,count:0});
                $uibModalInstance.close();
            }

        },function(data){
            alert(data.message);
            //clazzService.addClazzsModel({name:tempClassName});
        });
      //  gridService.getGrid().render();
        //$uibModalInstance.close();
    };




    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});





/*
* name:sdh
* date:16-03-01
* 登录control
*
* */
angular.module('baas').controller('loginCtrl', function ($scope,userService,$state,appService) {
    $scope.signin=function(){
        var tempUserName=$scope.email;
        var tempPwd=$scope.password;
        userService.signin(tempUserName,tempPwd).then(function(data){


            if(data.code==0)
            {
                $state.go("apps");




//                appService.getAdminKey().then(function(data){
//
//                    appService.setAdminKey("V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc");
//                    $state.go("apps");
//                },function(data){
//
//                    appService.setAdminKey("V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc");
//                    $state.go("apps");
//                });


            }
            else
            {
                alert("账户或者密码错误");

            }
        },function(data){
            alert("账户或者密码错误");
        });



    }

});





/*
*
*
* acl的controller
*
*
* */


angular.module('baas').controller('aclModalInstanceCtrl', function ($scope,$stateParams, $uibModalInstance,gridService,fieldService,objectService,$rootScope,items) {


    var tempId=$stateParams.id;
    var tempClazz=$stateParams.clazz;
    var tempUpdataId=items.id;

    var acl=items.row;

    $scope.acl={
        allRead:items.row["*"]?items.row["*"].read:"",
        allWrite:items.row["*"]?items.row["*"].write:""
//        userRead:items.row["*"].read,
//        userWrite:items.row["*"].write,
//        roleRead:true,
//        roleWrite:true
    }
    $scope.user={
        ObjectId:""
    };
    $scope.aclText=JSON.stringify(items.row);
    $scope.setAllACL=function(){

        acl[$scope.user.ObjectId]={read:$scope.acl.userRead,write:$scope.acl.userWrite};
        acl["*"]={read:$scope.acl.allRead,write:$scope.acl.allWrite};
        var acls={"acl":acl};
        objectService.updateData(tempId,{className:tempClazz,data:acls,id:tempUpdataId}).then(function(data){



            $scope.aclText=JSON.stringify(acl);

        });
    }
    $scope.setUserACL=function(){

        acl[$scope.user.ObjectId]={read:$scope.acl.userRead,write:$scope.acl.userWrite};
        acl["*"]={read:$scope.acl.allRead,write:$scope.acl.allWrite};
        var acls={"acl":acl};
        objectService.updateData(tempId,{className:tempClazz,data:acls,id:tempUpdataId}).then(function(data){
            $scope.aclText=JSON.stringify(acl);
        });

    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.ok = function () {

        $uibModalInstance.close($scope.acl);
    };


});

