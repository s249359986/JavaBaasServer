/**
 * Created by bill on 16/1/6.
 */
angular.module('baas').factory('gridService', ['$q', 'rest','$window','$uibModal','fileService','$stateParams','objectService', function ($q, rest,window,$uibModal,fileService,$stateParams,objectService) {

    var currentGrid=null;

    function setGrid(grid)
    {
        currentGrid=grid;
    }
    function getGrid()
    {


        return currentGrid;
    }





    /*
    *
    * data:2016-3-14
    * auth:sdh
    *
    * des: slickEditor暂时移到这里
    *
    *
    * */




    (function ($) {







        // register namespace
        $.extend(true, window, {
            "Slick": {
                "Editors": {
                    "Text": TextEditor,
                    "Integer": IntegerEditor,
                    "Date": DateEditor,
                    "SelfDate": SelfDateEditor,
                    "YesNoSelect": YesNoSelectEditor,
                    "Checkbox": CheckboxEditor,
                    "PercentComplete": PercentCompleteEditor,
                    "LongText": LongTextEditor,
                    "SelfLongText":SelfLongTextEditor,//object
                    "SelfLongTextArray":SelfLongTextArrayEditor,//array
                    "SelfNumber":SelfNumberEditor,
                    "NumericRangeEditor":zidingyi,
                    "PointerSelect": PointerSelectEditor,
                    "FileText":FileTextEditor,
                    "SelfAcl":SelfAclEditor

                }
            }
        });




        function SelfAclEditor(args) {
            var $select;
            var $input;

            var scope = this;
            var curItem=null;
            var defaultValue="";
            var changeValue="";
            var curValue=null;
            var modalInstance;


            var tempColumn=args.column.field;

            this.init = function () {






            };

            this.destroy = function () {
//                $select.remove();
            };

            this.focus = function () {
//                $select.focus();
            };

            this.loadValue = function (item) {


                curItem=item[args.column.field];
                if(curItem)
                {
                    defaultValue=JSON.stringify(curItem);
                }


                if(!modalInstance)
                {
                    modalInstance = $uibModal.open({
                        //animation: $scope.animationsEnabled,
                        templateUrl: 'aclEditorModalContent.html',
                        controller:"aclModalInstanceCtrl",  //ModalInstanceCtrl
                        //size: size,
                        resolve: {
                            items: function () {
                                return {row:curItem,id:item._id}
                            }
                        }
                    });
                    modalInstance.result.then(function (data) {
                        if(data)
                        {
                            curValue={"*":{
                                read:data.allRead,
                                write:data.allWrite
                            }}
                            changeValue=JSON.stringify(curValue);
                        }
                        scope.save();
                    }, function (data) {

                        changeValue=defaultValue;
                        scope.cancel();

                    });
                }




//                var tempInputValue="";
//
//                var tempItem=item[args.column.field]||"";
//                defaultValue=tempItem;
//                $input.val(tempInputValue);
//                $select.select();
            };

            this.save = function () {

                args.commitChanges();
            };

            this.cancel = function () {


                args.cancelChanges();
            };


            this.serializeValue = function () {
                return curValue;
            };

            this.applyValue = function (item, state) {// return 返回的值 state

                item[args.column.field] = state;
            };

            this.isValueChanged = function () {

                return (changeValue != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };
            this.show = function () {



                //$wrapper.show();
            };

            this.init();
        }







        function FileTextEditor(args) {
            var $select;
            var $input;
            var defaultValue;
            var scope = this;
            var tempColumn=args.column.field;
            var tempItems=args.item;

            this.init = function () {
                var tempId=$stateParams.id;
                var tempClazz=$stateParams.clazz;
                var uploadFormH='<form class="uploadFormId" method="post" action="http://upload.qiniu.com/"enctype="multipart/form-data">';
                var uploadFormCH='</form>';
                var tempFn=args.column.bgdbScope.uploadForm;
                var inputH='<a href="javascript:;" class="upload-a">选择文件<input class="upload-file" type="file" name="file"></a>';
                var inputHidden='<input type="hidden" name="uploadHidden">';
                var tempWrap=uploadFormH+inputH+inputHidden+uploadFormCH;
                $input=$(tempWrap);
                $input.appendTo(args.container);
                $input.find(".upload-file").change(function(){
                    var that=this;
                    var fileName=that.files[0].name;
                    var _that=$(that);
                    var _thatForm=_that.parent().parent("form");
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
                                    _id: tempFile._id
                                    //name: fileName
                                    //   url:bwConfig.bwQiniuVal.path+tempName
                                  //  url:tempFile.url
                                }
                                var tempUploadData={};
                                tempUploadData[tempColumn]=tempVal;
                                if(tempItems._id)
                                {
                                    objectService.updateData(tempId,{className:tempClazz,data:tempUploadData,id:tempItems._id}).then(function(data){

                                    },function(data1){

                                    });

                                }
                                else
                                {

                                    objectService.addData(tempId,{className:tempClazz,data:tempUploadData}).then(function(data){
                                        if(data.code==0)
                                        {
//                                            rowData._id=data.data._id;
//                                            rowData.acl={"*":{read:true,write:true}};
//                                            var tempDate=new Date().getTime();
//                                            rowData.createdAt=tempDate;
//                                            rowData.updatedAt=tempDate;
//                                            curGrid.invalidateRow(rowIndex);
//                                            curGrid.render();
                                        }
                                    },function(data1){


                                    });

                                }



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
                });
                //$select.focus();
                $input.focus();
            };

            this.destroy = function () {
                $select.remove();
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
//                var tempInputValue="";
//                var tempSelectValue="";
//                var tempItem=item[args.column.field]||"";
//                defaultValue=tempItem;
//                if($.type(tempItem)==="object")
//                {
//                    tempSelectValue=tempItem.className;
//                    tempInputValue=tempItem._id;
////                $select.val(tempSelectValue);
////                $input.val(tempInputValue);
//
//                }
//                $select.val(tempSelectValue);
//                $input.val(tempInputValue);
//                // $select.val((defaultValue = item[args.column.field]||""));
//                $select.select();
            };

            this.serializeValue = function () {
//                var tempClazzName=$select.val();
//                var tempId=$input.val();
//                var tempObj={"__type":"Pointer","className":tempClazzName,"_id":tempId};
//                return tempObj;

            };

            this.applyValue = function (item, state) {// return 返回的值 state
//                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
//                return ($select.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }






        function PointerSelectEditor(args) {
            var $select;
            var $input;
            var defaultValue;
            var scope = this;
            var tempColumn=args.column.field;

            this.init = function () {
                var tempOptionStr='';
                var tempClazzModel=args.column.classModel;
                for(var i in tempClazzModel)
                {
                    var tempName=tempClazzModel[i].name;
                    tempOptionStr+='<OPTION value='+tempName+'>'+tempName+'</OPTION>';

                }
                $select = $("<SELECT tabIndex='0' class='editor-pointer-select  form-control'>"+tempOptionStr+"</SELECT>");
                $input = $("<INPUT type=text class='editor-pointer-input' />");
                $select.appendTo(args.container);
                $input.appendTo(args.container);
                //$select.focus();
                $input.focus();
            };

            this.destroy = function () {
                $select.remove();
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
                var tempInputValue="";
                var tempSelectValue="";
                var tempItem=item[args.column.field]||"";
                defaultValue=tempItem;
                if($.type(tempItem)==="object")
                {
                    tempSelectValue=tempItem.className;
                    tempInputValue=tempItem._id;
//                $select.val(tempSelectValue);
//                $input.val(tempInputValue);

                }
                $select.val(tempSelectValue);
                $input.val(tempInputValue);
                // $select.val((defaultValue = item[args.column.field]||""));
                $select.select();
            };

            this.serializeValue = function () {
                //{"setction":{"__type":"Pointer","className":"tempRecommendSection","_id":"b5dbb2aae1c640c6bdd8a78851da8f09"}}

                var tempClazzName=$select.val();
                var tempId=$input.val();
                var tempObj={"__type":"Pointer","className":tempClazzName,"_id":tempId};







                return tempObj;


                //  return ($select.val() == "yes");
            };

            this.applyValue = function (item, state) {// return 返回的值 state


                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return ($select.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }




        /*
         * An example of a "detached" editor.
         * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
         * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
         */
        function SelfLongTextArrayEditor(args) {
            var $input, $wrapper;
            var defaultValue;
            var scope = this;

            this.init = function () {
                var $container = $("body");

                $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
                    .appendTo($container);

                $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
                    .appendTo($wrapper);

                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);

                $wrapper.find("button:first").bind("click", this.save);
                $wrapper.find("button:last").bind("click", this.cancel);
                $input.bind("keydown", this.handleKeyDown);

                scope.position(args.position);
                $input.focus().select();
            };

            this.handleKeyDown = function (e) {
                if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
                    scope.save();
                } else if (e.which == $.ui.keyCode.ESCAPE) {
                    e.preventDefault();
                    scope.cancel();
                } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
                    e.preventDefault();
                    args.grid.navigatePrev();
                } else if (e.which == $.ui.keyCode.TAB) {
                    e.preventDefault();
                    args.grid.navigateNext();
                }
            };

            this.save = function () {
                args.commitChanges();
            };

            this.cancel = function () {
                $input.val(defaultValue);
                args.cancelChanges();
            };

            this.hide = function () {
                $wrapper.hide();
            };

            this.show = function () {
                $wrapper.show();
            };

            this.position = function (position) {
                $wrapper
                    .css("top", position.top - 5)
                    .css("left", position.left - 5)
            };

            this.destroy = function () {
                $wrapper.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {



                var tempValue=item[args.column.field];
                if($.type(tempValue)==="array")
                {
                    tempValue=tempValue.join(",");
                    tempValue="["+tempValue+"]";
                    $input.val(defaultValue = tempValue);
                }
                else
                {
                    $input.val(defaultValue = item[args.column.field]);
                }


                $input.select();
            };

            this.serializeValue = function () {


                var tempValue=$input.val();
                var tempArrayValue=tempValue.replace('[',"").replace(']',"").split(",");
                if($.type(tempArrayValue)==="array")
                {
                    return  tempValue;
                }
                else
                {
                    return $input.val();
                }
            };

            this.applyValue = function (item, state) {
                var tempState=state.replace('[',"").replace(']',"").split(",");
                item[args.column.field] = tempState;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {


                var tempValue=$input.val();
                var tempArrayValue=tempValue.replace('[',"").replace(']',"").split(",");
                if($.type(tempArrayValue)==="array")
                {
                    return {
                        valid: true,
                        msg: null
                    };
                }
                else
                {
                    return {
                        valid: false,
                        msg: "数组格式不对"
                    };
                }






            };

            this.init();
        }



        /*
         *
         * 编辑number类型
         *
         * */
        function SelfNumberEditor(args)
        {

            var $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />")
                    .appendTo(args.container)
                    .bind("keydown.nav", function (e) {
                        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                            e.stopImmediatePropagation();
                        }
                    })
                    .focus()
                    .select();
            };

            this.handleKeyDown = function (e) {
                if (e.keyCode == $.ui.keyCode.LEFT || e.keyCode == $.ui.keyCode.RIGHT || e.keyCode == $.ui.keyCode.TAB) {
                    e.stopImmediatePropagation();
                }
            };

            this.destroy = function () {
                $input.remove();
            };

            this.focus = function () {
                $input.focus();
            };
            this.serializeValue = function () {

                return $input.val();
            };

            this.applyValue = function (item, state) {

                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {

                if (isNaN(parseInt($input.val(), 10))) {
                    return {valid: false, msg: "必须为数字类型"};
                }
                return {valid: true, msg: null};
            };
            this.getValue = function () {
                return $input.val();
            };

            this.setValue = function (val) {
                $input.val(val);
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field] || "";
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.init();

        }



        function zidingyi(args) {
            var $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />")
                    .appendTo(args.container)
                    .bind("keydown.nav", function (e) {
                        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                            e.stopImmediatePropagation();
                        }
                    })
                    .focus()
                    .select();
            };

            this.destroy = function () {
                $input.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.getValue = function () {
                return $input.val();
            };

            this.setValue = function (val) {
                $input.val(val);
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field] || "";
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.serializeValue = function () {
                return $input.val();
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                if (args.column.validator) {
                    var validationResults = args.column.validator($input.val());
                    if (!validationResults.valid) {
                        return validationResults;
                    }
                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function TextEditor(args) {

            var $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />")
                    .appendTo(args.container)
                    .bind("keydown.nav", function (e) {
                        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                            e.stopImmediatePropagation();
                        }
                    })
                    .focus()
                    .select();
            };

            this.destroy = function () {
                $input.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.getValue = function () {
                return $input.val();
            };

            this.setValue = function (val) {
                $input.val(val);
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field] || "";
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.serializeValue = function () {
                return $input.val();
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                if (args.column.validator) {
                    var validationResults = args.column.validator($input.val());
                    if (!validationResults.valid) {
                        return validationResults;
                    }
                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function IntegerEditor(args) {
            var $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text form-control' />");

                $input.bind("keydown.nav", function (e) {
                    if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                });

                $input.appendTo(args.container);
                $input.focus().select();
            };

            this.destroy = function () {
                $input.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {

                defaultValue = item[args.column.field];
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.serializeValue = function () {
                return parseInt($input.val(), 10) || 0;
            };

            this.applyValue = function (item, state) {

                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                if (isNaN($input.val())) {
                    return {
                        valid: false,
                        msg: "请输入数字类型"
                    };
                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function DateEditor(args) {
            var $input;
            var defaultValue;
            var scope = this;
            var calendarOpen = false;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />");
                $input.appendTo(args.container);
                $input.focus().select();
                $input.datepicker({
                    showOn: "button",
                    buttonImageOnly: true,
                    buttonImage: "./lib/slickgrid/images/calendar.gif",
                    beforeShow: function () {
                        calendarOpen = true
                    },
                    onClose: function () {
                        calendarOpen = false
                    }
                });
                $input.width($input.width() - 18);
            };

            this.destroy = function () {
                $.datepicker.dpDiv.stop(true, true);
                $input.datepicker("hide");
                $input.datepicker("destroy");
                $input.remove();
            };

            this.show = function () {
                if (calendarOpen) {
                    $.datepicker.dpDiv.stop(true, true).show();
                }
            };

            this.hide = function () {
                if (calendarOpen) {
                    $.datepicker.dpDiv.stop(true, true).hide();
                }
            };

            this.position = function (position) {
                if (!calendarOpen) {
                    return;
                }
                $.datepicker.dpDiv
                    .css("top", position.top + 30)
                    .css("left", position.left);
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field];
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.serializeValue = function () {
                return $input.val();
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }
        function SelfDateEditor(args) {

            var $input;
            var defaultValue;
            var scope = this;
            var calendarOpen = false;

            this.init = function () {
                //$input = $("<INPUT type=text class='editor-text' />");
                $input = $("<INPUT class='editor-text' type='text'/>");
                $input.appendTo(args.container);
                $input.focus().select();

                var tempDateValue=Util.Common.dateFormat(new Date());

                $input.datetimepicker({value:tempDateValue,step:10});
                $input.width($input.width() - 18);
            };

            this.destroy = function () {
                $input.datetimepicker("remove");
                $input.remove();
//            $.datepicker.dpDiv.stop(true, true);
//            $input.datepicker("hide");
//            $input.datepicker("destroy");
//            $input.remove();
            };

            this.show = function () {


//            if (calendarOpen) {
//                $.datepicker.dpDiv.stop(true, true).show();
//            }
            };

            this.hide = function () {


//            if (calendarOpen) {
//                $.datepicker.dpDiv.stop(true, true).hide();
//            }
            };

            this.position = function (position) {





//            if (!calendarOpen) {
//                return;
//            }
//            $.datepicker.dpDiv
//                .css("top", position.top + 30)
//                .css("left", position.left);
            };

            this.focus = function () {


//            $input.focus();
            };

            this.loadValue = function (item) {

//            defaultValue = item[args.column.field];
//            $input.val(defaultValue);
//            $input[0].defaultValue = defaultValue;
//            $input.select();
            };

            this.serializeValue = function () {

                return $input.val();

            };

            this.applyValue = function (item, state) {
                item[args.column.field] =state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function YesNoSelectEditor(args) {

            var $select;
            var defaultValue;
            var scope = this;

            this.init = function () {


                $select = $("<SELECT tabIndex='0' class='editor-yesno  form-control'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
                $select.appendTo(args.container);
                $select.focus();
            };

            this.destroy = function () {
                $select.remove();
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
                $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
                $select.select();
            };

            this.serializeValue = function () {
                return ($select.val() == "yes");
            };

            this.applyValue = function (item, state) {

                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return ($select.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function CheckboxEditor(args) {
            var $select;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
                $select.appendTo(args.container);
                $select.focus();
            };

            this.destroy = function () {
                $select.remove();
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
                defaultValue = !!item[args.column.field];
                if (defaultValue) {
                    $select.prop('checked', true);
                } else {
                    $select.prop('checked', false);
                }
            };

            this.serializeValue = function () {
                return $select.prop('checked');
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (this.serializeValue() !== defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        function PercentCompleteEditor(args) {
            var $input, $picker;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-percentcomplete' />");
                $input.width($(args.container).innerWidth() - 25);
                $input.appendTo(args.container);

                $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
                $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

                $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

                $input.focus().select();

                $picker.find(".editor-percentcomplete-slider").slider({
                    orientation: "vertical",
                    range: "min",
                    value: defaultValue,
                    slide: function (event, ui) {
                        $input.val(ui.value)
                    }
                });

                $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
                    $input.val($(this).attr("val"));
                    $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
                })
            };

            this.destroy = function () {
                $input.remove();
                $picker.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                $input.val(defaultValue = item[args.column.field]);
                $input.select();
            };

            this.serializeValue = function () {
                return parseInt($input.val(), 10) || 0;
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
            };

            this.validate = function () {
                if (isNaN(parseInt($input.val(), 10))) {
                    return {
                        valid: false,
                        msg: "Please enter a valid positive number"
                    };
                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }




        /*
         * An example of a "detached" editor.
         * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
         * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
         */
        function SelfLongTextEditor(args) {
            var $input, $wrapper;
            var defaultValue;
            var scope = this;

            this.init = function () {
                var $container = $("body");

                $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
                    .appendTo($container);

                $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
                    .appendTo($wrapper);

                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);

                $wrapper.find("button:first").bind("click", this.save);
                $wrapper.find("button:last").bind("click", this.cancel);
                $input.bind("keydown", this.handleKeyDown);

                scope.position(args.position);
                $input.focus().select();
            };

            this.handleKeyDown = function (e) {
                if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
                    scope.save();
                } else if (e.which == $.ui.keyCode.ESCAPE) {
                    e.preventDefault();
                    scope.cancel();
                } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
                    e.preventDefault();
                    args.grid.navigatePrev();
                } else if (e.which == $.ui.keyCode.TAB) {
                    e.preventDefault();
                    args.grid.navigateNext();
                }
            };

            this.save = function () {
                args.commitChanges();
            };

            this.cancel = function () {
                $input.val(defaultValue);
                args.cancelChanges();
            };

            this.hide = function () {
                $wrapper.hide();
            };

            this.show = function () {
                $wrapper.show();
            };

            this.position = function (position) {
                $wrapper
                    .css("top", position.top - 5)
                    .css("left", position.left - 5)
            };

            this.destroy = function () {
                $wrapper.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {//加载是向编辑框内加载


                var tempValue=item[args.column.field];
                if(typeof tempValue=="object")
                {

                    tempValue= JSON.stringify(tempValue);
                }
                $input.val(defaultValue = tempValue);//设置为字符串
                $input.select();
            };

            this.serializeValue = function () {

                var tempValue=$input.val();//字符串

                //  if(typeof tempValue=="string"&&tempValue!="")
                if($.type(tempValue)==="string"&&tempValue!="")
                {
                    return JSON.parse($input.val());
                }
                //if(typeof tempValue=="object")
                if($.type(tempValue)==="object")
                {
                    return JSON.stringify($input.val());
                }
                return tempValue;


            };

            this.applyValue = function (item, state) {


                item[args.column.field] =state;//对象
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {

                var tempValue=$input.val();//字符串

                if($.type(tempValue)==="string"&&tempValue!="")
                {


                    try
                    {
                        JSON.parse(tempValue);
                    }
                    catch (e)
                    {
                        return {
                            valid: false,
                            msg:"格式错误"
                        };

                    }


                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }

        /*
         * An example of a "detached" editor.
         * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
         * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
         */
        function LongTextEditor(args) {
            var $input, $wrapper;
            var defaultValue;
            var scope = this;

            this.init = function () {
                var $container = $("body");

                $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
                    .appendTo($container);

                $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
                    .appendTo($wrapper);

                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);

                $wrapper.find("button:first").bind("click", this.save);
                $wrapper.find("button:last").bind("click", this.cancel);
                $input.bind("keydown", this.handleKeyDown);

                scope.position(args.position);
                $input.focus().select();
            };

            this.handleKeyDown = function (e) {
                if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
                    scope.save();
                } else if (e.which == $.ui.keyCode.ESCAPE) {
                    e.preventDefault();
                    scope.cancel();
                } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
                    e.preventDefault();
                    args.grid.navigatePrev();
                } else if (e.which == $.ui.keyCode.TAB) {
                    e.preventDefault();
                    args.grid.navigateNext();
                }
            };

            this.save = function () {
                args.commitChanges();
            };

            this.cancel = function () {
                $input.val(defaultValue);
                args.cancelChanges();
            };

            this.hide = function () {
                $wrapper.hide();
            };

            this.show = function () {
                $wrapper.show();
            };

            this.position = function (position) {
                $wrapper
                    .css("top", position.top - 5)
                    .css("left", position.left - 5)
            };

            this.destroy = function () {
                $wrapper.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                $input.val(defaultValue = item[args.column.field]);
                $input.select();
            };

            this.serializeValue = function () {
                return $input.val();
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        }
    })(jQuery);






    /*
     *
     * data:2016-3-22
     * auth:sdh
     *
     * des: slickFormmater暂时移到这里
     *
     *
     * */




    (function ($) {
        // register namespace
        $.extend(true, window, {
            "Slick": {
                "Formatters": {
                    "PercentComplete": PercentCompleteFormatter,
                    "PercentCompleteBar": PercentCompleteBarFormatter,
                    "YesNo": YesNoFormatter,
                    "Checkmark": CheckmarkFormatter,
                    "SelfObject":SelfObjectFormatter,
                    "SelfDate":SelfDateFormatter,
                    "SelfDefault":SelfDefaultFormatter,
                    "SelfArray":SelfArrayFormatter,
                    "SelfPointer":SelfPointerFormatter,
                    "SelfAcl":SelfAclFormatter,
                    "SelfString":SelfStringFormatter,
                    "SelfNumber":SelfNumberFormatter,
                    "SelfIdString":SelfIdStringFormatter,
                    "SelfFile":SelfFileFormatter

                }
            }
        });

        function SelfFileFormatter(row, cell, value, columnDef, dataContext) {


            var tempId=$stateParams.id;
            var tempClazz=$stateParams.clazz;




            var tempRadom1=parseInt(Math.random()*50);
            var tempRadom2=parseInt(Math.random()*50);
            var tempRadom3=parseInt(Math.random()*50);
            var tempTime=new Date().getTime();
            var buttonId=tempRadom1+"b"+tempRadom2+"t"+tempRadom3+"n"+tempTime;
            var btnRemoveId="rm"+buttonId;


            var tempA='<a class="upload-name" target="_blank"  href=""></a><span class="upload-remove glyphicon glyphicon-remove" style="float: right;display: none;cursor: pointer;"></span>';//btn btn-default btn-xs file-delete

            if($.type(value)=='object')
            {
                tempA='<a class="upload-name" target="_blank"  href="'+value.url+'">'+value.name+'</a><span id="'+btnRemoveId+'" class="upload-remove glyphicon glyphicon-remove" style="float: right;cursor:pointer;"></span>';

            }
            var uploadFormH='<form class="uploadFormId" method="post" action="http://upload.qiniu.com/"enctype="multipart/form-data">';
            var uploadFormCH='</form>';
            var inputH='<a href="javascript:;" class="upload-a">上传<input id="'+buttonId+'" class="upload-file" type="file" name="file"></a>';
            var tempWrap=uploadFormH+tempA+inputH+uploadFormCH;


            function removeFile(id,columnName)
            {
                var tempData={};
                tempData[columnName]="";
                objectService.updateData(tempId,{className:tempClazz,data:tempData,id:id}).then(function(data){

                },function(data1){

                });

            }



            function upload(_this){
                var tempGrid=getGrid();
                var tempColumn=tempGrid.getColumns()[cell];
                var tempColumnName=tempColumn.field;
                var tempItems=tempGrid.getDataItem(row);
                var that=_this;
                var fileName=that.files[0].name;
                var _that=$(that);
                var _thatForm=_that.parent().parent("form");
                var tempText=_thatForm.find(".upload-name");
                var tempRemoveBtn=_thatForm.find(".upload-remove");
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
                                _id: tempFile._id
                                //name: fileName
                                //   url:bwConfig.bwQiniuVal.path+tempName
                                //  url:tempFile.url
                            }
                            tempText.text(fileName);
                            tempText.attr("href",tempFile.url);
                            var tempUploadData={};
                            tempUploadData[tempColumnName]=tempVal;
                            if(tempItems._id)
                            {
                                objectService.updateData(tempId,{className:tempClazz,data:tempUploadData,id:tempItems._id}).then(function(data){

                                    tempRemoveBtn.show();
                                    tempRemoveBtn.click(function(){
                                        tempItems[tempColumnName]="";
                                        tempGrid.invalidateRow(row);
                                        tempGrid.render();
                                        removeFile(tempItems._id,tempColumnName);
                                    });


                                },function(data1){

                                });

                            }
                            else
                            {

                                objectService.addData(tempId,{className:tempClazz,data:tempUploadData}).then(function(data){
                                    if(data.code==0)
                                    {
                                            tempItems._id=data.data._id;
                                            tempItems.acl={"*":{read:true,write:true}};
                                            tempItems[tempColumnName]={
                                                __type:"File",
                                                _id:tempFile._id,
                                                name:fileName,
                                                url:tempFile.url
                                            };
                                            var tempDate=new Date().getTime();
                                            tempItems.createdAt=tempDate;
                                            tempItems.updatedAt=tempDate;
                                        tempGrid.invalidateRow(row);
                                        tempGrid.render();


                                      //  tempRemoveBtn.click(removeFile(tempItems._id,tempColumnName));

                                    }
                                },function(data1){


                                });

                            }

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



            setTimeout(function(){
                $("#"+buttonId).bind("change",function(event){
                    var that=this;
                    upload(that);
                    event.stopPropagation();
                });


                $("#"+btnRemoveId).bind("click",function(){

                    $(this).siblings(".upload-name").text("");
                    $(this).hide();
                    removeFile(dataContext._id,columnDef.field);


                });

            },1000);

            return tempWrap;
        }
        function SelfIdStringFormatter(row, cell, value, columnDef, dataContext) {

            function showRow()
            {

                var tempGrid=getGrid();
                var tempColumn=tempGrid.getColumns()[cell];

                var tempItems=tempGrid.getDataItem(row);


              var  modalInstance = $uibModal.open({
                    //animation: $scope.animationsEnabled,
                    templateUrl: 'showInfoModalContent.html',
                    controller:"rowInfoModalCtrl",  //ModalInstanceCtrl
                    //size: size,
                    resolve: {
                        items: function () {
                            return {row:tempItems}
                        }
                    }
                });
            }
            var tempRadom1=parseInt(Math.random()*50);
            var tempRadom2=parseInt(Math.random()*50);
            var tempRadom3=parseInt(Math.random()*50);
            var tempTime=new Date().getTime();
            var buttonId=tempRadom1+"b"+tempRadom2+"t"+tempRadom3+"n"+tempTime;
            var btnShowInfoId="showInfo"+buttonId;
            setTimeout(function(){
                $("#"+btnShowInfoId).bind("click",showRow);
            },1000);


            var tempH='<a href="javascript:void(0);" id="'+btnShowInfoId+'">'+value+'</a>';

            return tempH;
        }



        function SelfNumberFormatter(row, cell, value, columnDef, dataContext) {
            var tempValue="";
            if($.type(value)==="number")
            {
                tempValue=value;
            }

            return tempValue;
        }
        function SelfStringFormatter(row, cell, value, columnDef, dataContext) {
            var tempValue="";
            if($.type(value)==="string")
            {
                tempValue=value;
            }

            return tempValue;
        }


        function SelfAclFormatter(row, cell, value, columnDef, dataContext) {

            var tempValue="";
            if($.type(value)==="object")
            {
                tempValue=JSON.stringify(value);
            }

            return tempValue;
        }



        function SelfPointerFormatter(row, cell, value, columnDef, dataContext) {


            var tempValue="";
            if($.type(value)==="object")
            {
                tempValue=value._id+":"+value.className;
            }

            return tempValue;
        }

        function SelfArrayFormatter(row, cell, value, columnDef, dataContext) {


            var tempValue="";
            if($.type(value)==="array")
            {
                tempValue=value.join(",");
                tempValue="["+tempValue+"]";

            }

            return tempValue;
        }

        function SelfObjectFormatter(row, cell, value, columnDef, dataContext) {
            if($.type(value)=="object")
            {
                return JSON.stringify(value);
            }
            else
            {
                return "";
            }

        }
        function SelfDefaultFormatter(row, cell, value, columnDef, dataContext) {
            return value;
        }
        function SelfDateFormatter(row, cell, value, columnDef, dataContext) {
            if(value)
            {
                return Util.Common.dateFormat(new Date(value));
            }
            else
            {
                return "";
            }
        }
        function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
            if (value == null || value === "") {
                return "-";
            } else if (value < 50) {
                return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
            } else {
                return "<span style='color:green'>" + value + "%</span>";
            }
        }

        function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
            if (value == null || value === "") {
                return "";
            }

            var color;

            if (value < 30) {
                color = "red";
            } else if (value < 70) {
                color = "silver";
            } else {
                color = "green";
            }

            return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
        }

        function YesNoFormatter(row, cell, value, columnDef, dataContext) {

            return value ? "Yes" : "No";
        }

        function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
            return value ? "<img src='../images/tick.png'>" : "";
        }
    })(jQuery);

















    return {setGrid:setGrid,getGrid:getGrid};
}]);