/**
 * Created by bill on 16/1/4.
 *
 * lean dashboard.js
 */


app.directive('bgdg',['fieldService','objectService','gridService','$uibModal','clazzService',function(fieldService,objectService,gridService,$uibModal,clazzService) {
    var globalId="";
    var globalClazz="";
    var grid=null;
    var checkboxSelector={};


    var bgdbScope=null;

    var columns = [
        {id: "title", name: "Title", field: "title"},
        {id: "duration", name: "Duration", field: "duration"},
        {id: "%", name: "% Complete", field: "percentComplete"},
        {id: "start", name: "Start", field: "start"},
        {id: "finish", name: "Finish", field: "finish"},
        {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
    ];
    var data=[];

    function initColumns(result)
    {





        var tempClazzService=clazzService.getClazzsModel();
        columns=[];
         checkboxSelector = new Slick.CheckboxSelectColumn({
            cssClass: "slick-cell-checkboxsel"
        });


        columns.push(checkboxSelector.getColumnDefinition());
        var tempStoreName="columns-view-"+globalId+"-"+globalClazz;
        var tempStore=[];
        if(localStorage[tempStoreName])
        {
            tempStore=JSON.parse(localStorage[tempStoreName]);
        }
        else
        {
            columns.push({id:"_id",name:"_id",field:"_id",formatter:Slick.Formatters.SelfIdString});
            columns.push({id:"acl",name:"acl",field:"acl",formatter:Slick.Formatters.SelfAcl,editor:Slick.Editors.SelfAcl,bgdbScope:bgdbScope,baasOpt:{type:20}});//SelfAcl  SelfAcl  bgdbScope
        }

        for(var m=0; m<tempStore.length;m++)
        {
            if("_id"==tempStore[m].name&&tempStore[m].show)
            {
                columns.push({id:"_id",name:"_id",field:"_id",formatter:Slick.Formatters.SelfIdString});

            }
            if("acl"==tempStore[m].name&&tempStore[m].show)
            {
                columns.push({id:"acl",name:"acl",field:"acl",formatter:Slick.Formatters.SelfAcl,editor:Slick.Editors.SelfAcl,bgdbScope:bgdbScope,baasOpt:{type:20}});//SelfAcl  SelfAcl  bgdbScope

            }

        }








        for(var j in result)
        {

           var BWCLAZZTYPE=[
                {value:1,title:"String",text:"字符串",formatter:Slick.Formatters.SelfString
                },
                {value:2,title:"Number",text:"数字",editor:Slick.Editors.Integer,formatter:Slick.Formatters.SelfNumber},
                {value:3,title:"Boolean",text:"布尔类型",editor:Slick.Editors.YesNoSelect
                },
               {value:4,title:"Date",text:"日期",editor:Slick.Editors.SelfDate,formatter:Slick.Formatters.SelfDate}
               //{value:4,title:"Date",text:"日期",editor:Slick.Editors.SelfDate}//
                ,
               {value:5,title:"File",text:"文件",formatter:Slick.Formatters.SelfFile},//FileText   ,editor:Slick.Editors.FileText
                {value:6,title:"Object",text:"对象",editor:Slick.Editors.SelfLongText,formatter:Slick.Formatters.SelfObject},
               {value:7,title:"Array",text:"数组",editor:Slick.Editors.SelfLongTextArray,formatter:Slick.Formatters.SelfArray},//SelfLongTextArray //SelfArray
               {value:8,title:"Pointer",text:"指针",editor:Slick.Editors.PointerSelect,formatter:Slick.Formatters.SelfPointer},//PointerSelect
                {value:9,title:"GeoPointer",text:"地理坐标"}];
            var tempTypeText="";
            var tempTypeEditor=Slick.Editors.SelfNumber||Slick.Editors.Text;
            var tempFormatterValue=Slick.Formatters.SelfDefault;


            var wrapContinue=false;
                for(var m=0; m<tempStore.length;m++)
                {
                    if(result[j].name==tempStore[m].name&&(!tempStore[m].show))
                    {
                        wrapContinue=true;
                        break;
                    }
                }
            if(wrapContinue)
            {
                continue;
            }




                for(var k in BWCLAZZTYPE)
                {
                    if(BWCLAZZTYPE[k].value==result[j].type)
                    {

                        tempTypeText=result[j].name+"  "+BWCLAZZTYPE[k].text;
                        tempTypeEditor=BWCLAZZTYPE[k].editor||Slick.Editors.Text;

                        if(result[j].type==5)
                        {
                            tempTypeEditor=null;
                        }
                        tempFormatterValue=BWCLAZZTYPE[k].formatter||Slick.Formatters.SelfDefault;
                        break;
                    }

                 }

            columns.push({id:result[j].id,name:tempTypeText,formatter:tempFormatterValue,field:result[j].name,baasOpt:result[j],classModel:tempClazzService,bgdbScope:bgdbScope,editor: tempTypeEditor,header:{menu:{items:[{
               // iconImage: "../images/sort-asc.gif",
                title: "升序",
                command: "desc"
            },{
                //iconImage: "../images/sort-asc.gif",
                title: "降序",
                command: "asc"
            },{
                //iconImage: "../images/sort-asc.gif",
                title: "删除",
                command: "delete"
            },{
                    //iconImage: "../images/sort-asc.gif",
                    title: "编辑",
                    command: "edit"
                }
            ]}

            }});
            }





        for(var m=0; m<tempStore.length;m++)
        {
            if("createdAt"==tempStore[m].name&&tempStore[m].show)
            {

                columns.push({id:"createdAt",name:"createdAt",field:"createdAt",formatter:Slick.Formatters.SelfDate,bgdbScope:bgdbScope,baasOpt:{type:4},header:{menu:{items:[{
                    // iconImage: "../images/sort-asc.gif",
                    title: "升序",
                    command: "desc"
                },{
                    //   iconImage: "../images/sort-asc.gif",
                    title: "降序",
                    command: "asc"
                }]}

                }});//SelfAcl  SelfAcl  bgdbScope

            }
            if("updatedAt"==tempStore[m].name&&tempStore[m].show)
            {
                columns.push({id:"updatedAt",name:"updatedAt",field:"updatedAt",formatter:Slick.Formatters.SelfDate,bgdbScope:bgdbScope,baasOpt:{type:4},header:{menu:{items:[{
                    //   iconImage: "../images/sort-asc.gif",
                    title: "升序",
                    command: "desc"
                },{
                    //  iconImage: "../images/sort-asc.gif",
                    title: "降序",
                    command: "asc"
                }]}

                }});//SelfAcl  SelfAcl  bgdbScope

            }

        }

        if(tempStore.length==0)
        {


            columns.push({id:"createdAt",name:"createdAt",field:"createdAt",formatter:Slick.Formatters.SelfDate,bgdbScope:bgdbScope,baasOpt:{type:4},header:{menu:{items:[{
                // iconImage: "../images/sort-asc.gif",
                title: "升序",
                command: "desc"
            },{
                //   iconImage: "../images/sort-asc.gif",
                title: "降序",
                command: "asc"
            }]}

            }});//SelfAcl  SelfAcl  bgdbScope

            columns.push({id:"updatedAt",name:"updatedAt",field:"updatedAt",formatter:Slick.Formatters.SelfDate,bgdbScope:bgdbScope,baasOpt:{type:4},header:{menu:{items:[{
                //   iconImage: "../images/sort-asc.gif",
                title: "升序",
                command: "desc"
            },{
                //  iconImage: "../images/sort-asc.gif",
                title: "降序",
                command: "asc"
            }]}

            }});//SelfAcl  SelfAcl  bgdbScope
        }










    }
    function initData(result)
    {
        data=result;
    }


    function initDg(scope, element, attrs)
    {

        var options = {
            autoHeight:true,
            defaultColumnWidth:190,
            editable: true,
            enableAddRow: false,//true:new row,false:no new row
            enableCellNavigation: true,
            asyncEditorLoading: false,
            autoEdit: false
        };

     //  grid=scope.grid= new Slick.Grid(element, data, columns, options);

        grid=scope.grid= new Slick.Grid(element, data, columns, options);

        grid.registerPlugin(checkboxSelector);
        grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false}));
        grid.onClick.subscribe(function (e,args) {

            var cell = grid.getCellFromEvent(e);

        });

        grid.onCellChange.subscribe(function (e,args) {//修改


            var curGrid=args.grid;
            var rowIndex=args.row;
            var rowData=curGrid.getDataItem(rowIndex);
            var tempCurColumn=curGrid.getColumns()[args.cell];
            var curUpdateValue=rowData[tempCurColumn.field];
            var curUpdateKey=tempCurColumn.field+"";
            var curUpdateObj={};



            var BWCLAZZTYPE=[
                {value:1,title:"String",text:"字符串",formatter:Slick.Formatters.SelfString
                },
                {value:2,title:"Number",text:"数字",editor:Slick.Editors.Integer,formatter:Slick.Formatters.SelfNumber},
                {value:3,title:"Boolean",text:"布尔类型",editor:Slick.Editors.YesNoSelect
                },
                {value:4,title:"Date",text:"日期",editor:Slick.Editors.SelfDate,formatUpDate:function(value){
                    if(value)
                    return new Date(value).getTime();
                    else
                    return new Date().getTime();
                }}
                ,
                {value:5,title:"File",text:"文件",formatter:Slick.Formatters.SelfFile},//FileText  ,editor:Slick.Editors.FileText
                {value:6,title:"Object",text:"对象",editor:Slick.Editors.SelfLongText,formatUpDate:function(value){
                   var tempValue=null;// JSON.parse(tempValue);
                    if(value)
                    {
                        if(typeof value=="object")
                        {
                            tempValue=value;
                            return tempValue;
                        }
                        tempValue=JSON.parse(value);
                        return tempValue;
                    }
                    else
                    {
                        return "";
                    }

                }},
                {value:7,title:"Array",text:"数组",editor:Slick.Editors.SelfLongTextArray},//SelfLongTextArray
                {value:8,title:"Pointer",text:"指针",editor:Slick.Editors.PointerSelect,formatter:Slick.Formatters.SelfPointer},//PointerSelect   //SelfPointer
                {value:9,title:"GeoPointer",text:"地理坐标"}];

            for(var k in BWCLAZZTYPE)
            {
                if(BWCLAZZTYPE[k].value==tempCurColumn.baasOpt.type)
                {


                    if(BWCLAZZTYPE[k].formatUpDate)
                    {
                        curUpdateValue=BWCLAZZTYPE[k].formatUpDate(curUpdateValue);
                    }

                    break;
                }

            }
            curUpdateObj[curUpdateKey]=curUpdateValue;


            if(rowData._id)
            {

                /*
                *
                * acl由control修改
                *
                * */
                if(curUpdateObj["acl"])
                {
                    return;
                }
                objectService.updateData(globalId,{className:globalClazz,data:curUpdateObj,id:rowData._id}).then(function(data){

                },function(data1){

                });
            }
            else
            {

                    objectService.addData(globalId,{className:globalClazz,data:curUpdateObj}).then(function(data){
                    if(data.code==0)
                    {
                        rowData._id=data.data._id;
                        rowData.acl={"*":{read:true,write:true}};
                        var tempDate=new Date().getTime();
                        rowData.createdAt=tempDate;
                        rowData.updatedAt=tempDate;
                        curGrid.invalidateRow(rowIndex);
                        curGrid.render();
                    }
                },function(data1){


                });
            }



        });
        grid.onValidationError.subscribe(function (e, args) {
            alert(args.validationResults.msg);
        });
        //var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
        gridService.setGrid(grid);

    }

    return {
        //restrict: 'E',


        restrict: 'A',

      //  template: '<div>Hi there</div>',
      //  controller:function(scope, element, attrs){
      //      debugger;
      //  },
      //  compile: function(scope, element, attrs) {
      //     debugger;
      //  },
        link:function(scope, element, attrs){

            bgdbScope=scope;
            var id = globalId=scope.ctr_id;
            var clazz =globalClazz= scope.ctr_clazz;
            if (id&&clazz) {
                fieldService.getDataList(id,clazz).then(function(data){




                    initColumns(data);
                    objectService.setPage({skip:0,limit:20});
                    objectService.setQuery('{}');
                    objectService.setOrder('{"createdAt":-1}');

                    objectService.getDataList(id,clazz).then(function(data){

                        initData(data);
                        initDg(scope, element, attrs);
                        var headerMenuPlugin = new Slick.Plugins.HeaderMenu({});
                        headerMenuPlugin.onBeforeMenuShow.subscribe(function(e, args) {

                        });

                        headerMenuPlugin.onCommand.subscribe(function(e, args) {
                            switch (args.command)
                            {
                                case 'asc'://降序
                                    var tempField=args.column.field;
                                    var tempObjQuery=new BASJS.Query(globalClazz);
                                    tempObjQuery.descending(tempField);
                                    objectService.setOrder(tempObjQuery);
                                    objectService.getDataList(globalId,globalClazz).then(function(data){
                                        var tempGrid=gridService.getGrid();
                                        tempGrid.setData(data);
                                        tempGrid.render();
                                    });
                                    break;

                                case 'desc'://升序
                                    var tempField=args.column.field;
                                    var tempObjQuery=new BASJS.Query(globalClazz);
                                    tempObjQuery.ascending(tempField);

                                    objectService.setOrder(tempObjQuery);
                                    objectService.getDataList(globalId,globalClazz).then(function(data){
                                        var tempGrid=gridService.getGrid();
                                        tempGrid.setData(data);
                                        tempGrid.render();
                                    });
                                    break;
                                case 'delete':
                                    var tempField=args.column.field;
                                    fieldService.setDeleteField(tempField);
                                    var modalInstance = $uibModal.open({
                                        //  animation: scope.animationsEnabled,
                                        templateUrl: 'deleteColumnModal.html',
                                        controller: 'deleteColumnCtrl'
                                        //size: size,
                                        //resolve: {
                                        //    items: function () {
                                        //        return $scope.items;
                                        //    }
                                        //}
                                    });
                                    break;

                                case 'edit':
                                    var tempColumn=args.column;
                                    //fieldService.setDeleteField(tempField);
                                    var modalInstance = $uibModal.open({
                                        //  animation: scope.animationsEnabled,
                                        templateUrl: 'editColumnModal.html',
                                        controller: 'editColumnModalCtrl',
                                        //size: size,
                                        resolve: {
                                            items: function () {
                                                return tempColumn;
                                            }
                                        }
                                    });
                                    break;




                            }




                            return;

                        });

                        grid.registerPlugin(headerMenuPlugin);

                      //  grid.render();


                    },function(data1){

                    });
                },function(data1){

                });
            }
            if (id&&clazz) {
                objectService.getDataCount(id,clazz).then(function(data){


                    //initColumns(data);
                    //initDg(scope, element, attrs);

                },function(data1){

                });
            }

        },
        replace: true
    };
}]);
