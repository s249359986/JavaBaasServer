/**
 * Created by bill on 15/10/20.
 */

(function(root) {
    root.BASJS = root.BASJS|| {};
    root.BASJS.VERSION = "js1.0.0";
    root.BASJS.MASTERKEY="";
    root.BASJS.MASTERSIGN="";
    root.BASJS.SIGN="";
    root.BASJS.APPID="";
    root.BASJS.TIMESTAMP="";
    root.BASJS.PUBLIC_KEY = "*";
   // root.BASJS.SERVERPATH="http://119.254.97.91:8080/api/";//测试
    root.BASJS.SERVERPATH="https://api.javabaas.com/api/";//正式
    root.BASJS.SERVERPATHNODE="/";//正式
    var BASJS=root.BASJS;
    var _=BASJS._=root._;
    /*
    * 工具开始
    *
    * */




    function initPower()
    {
        var tempTimestamp=new Date().getTime();
        var masterKey=hex_md5(BASJS.MASTERKEY+":"+tempTimestamp+"");
        BASJS.TIMESTAMP=tempTimestamp;
        BASJS.MASTERSIGN=masterKey;

    }
    BASJS._encode = function(value, seenObjects, disallowObjects) {

        var _ = BASJS._;
        if (_.isRegExp(value)) {
            return value.source;
        }

        return value;
    };

    BASJS._ajax=function(opt,who){
     //   initPower();
                var defaultOpt={
                    type:"get",
                    //  url:bwConfig.SERVERPATH+"admin/app",
                    url:BASJS.SERVERPATH+"admin/app",
                    dataType:"json",
                    headers:{

                        // "JB-AdminSign":header.adminSign,
//                    "Timestamp":header.Timestamp,
//                    "MasterSign":header.MasterSign
                        //"content-type":"application/json;charset=UTF-8"

                        "JB-Sign":BASJS.SIGN,//为网页版添加

                        "JB-Plat":"js",
                        "JB-MasterSign":BASJS.MASTERSIGN,
                        "Content-Type":"application/json;charset=UTF-8",
                        "JB-Timestamp":BASJS.TIMESTAMP,
                        "JB-AppId":BASJS.APPID
                        //  "JB-adminsign":header.adminSign
//                    "JB-MasterSign":header.MasterSign
                    },
                    success:function(result)
                    {

                    },
                    error:function(data)
                    {

                    }
                };
                var newOpt= $.extend(true,defaultOpt,opt);
                $.ajax(newOpt);

    }

    /*
    * 工具结束
    * */



    /*
    *
    * 消息推送
    *
    * */

    BASJS.Push = BASJS.Push || {};

    /**
     * Sends a push notification.
     * @param {Object} data -  The data of the push notification.  Valid fields
     * are:
     *   <ol>
     *     <li>channels - An Array of channels to push to.</li>
     *     <li>push_time - A Date object for when to send the push.</li>
     *     <li>expiration_time -  A Date object for when to expire
     *         the push.</li>
     *     <li>expiration_interval - The seconds from now to expire the push.</li>
     *     <li>where - A AV.Query over AV.Installation that is used to match
     *         a set of installations to push to.</li>
     *     <li>cql - A CQL statement over AV.Installation that is used to match
     *         a set of installations to push to.</li>
     *     <li>data - The data to send as part of the push</li>
     *   <ol>
     * @param {Object} options An object that has an optional success function,
     * that takes no arguments and will be called on a successful push, and
     * an error function that takes a AV.Error and will be called if the push
     * failed.
     */
    BASJS.Push.send = function(opt) {

        var tempUrl="";

        if(!opt.where)
        {
            tempUrl=BASJS.SERVERPATH+"master/push";
            return;
        }
        else
        {
            var tempWhere=JSON.stringify(opt.where);
            tempUrl=BASJS.SERVERPATH+"master/push?where="+tempWhere;
        }
        var defaultOpt={
            type:"post",
            //  url:bwConfig.SERVERPATH+"admin/app",
            url:tempUrl,
            dataType:"json",
            //contentType: "application/json; charset=utf-8",
            //data:JSON.stringify(data),
            data:JSON.stringify(opt.data),
            success:function(result)
            {
                if(opt.success)
                {
                    opt.success(result);
                }
            },
            error:function(data)
            {
                if(opt.error)
                {
                    opt.error(data);
                }

            }
        };
        BASJS._ajax(defaultOpt);
    };





    /*
    *
    * 云方法开始
    * */
    BASJS.Cloud = BASJS.Cloud || {};
    _.extend(BASJS.Cloud, /** @lends AV.Cloud */ {
        /**
         * Makes a call to a cloud function.
         * @param {String} name The function name.
         * @param {Object} data The parameters to send to the cloud function.
         * @param {Object} options A Backbone-style options object
         * options.success, if set, should be a function to handle a successful
         * call to a cloud function.  options.error should be a function that
         * handles an error running the cloud function.  Both functions are
         * optional.  Both functions take a single argument.
         * @return {AV.Promise} A promise that will be resolved with the result
         * of the function.
         */

        task:function(data, options){
            var defaultOpt={
                type:"get",
                url:BASJS.SERVERPATHNODE+"users/task",
                data:data,//{episodeId:"318a96e6909b4b44b3b1b452d6584489",score:1},
                dataType:"json",
                success:function(result)
                {

                    if(options)
                    {
                        if(options.success)
                        {
                            options.success(result);
                        }
                    }
                },
                error:function(data)
                {


                    if(options)
                    {
                        if(options.error)
                        {
                            options.error(data);
                        }
                    }

                }
            };
            BASJS._ajax(defaultOpt);
        },

        run: function (name, data, options) {

            var defaultOpt={
                type:"get",
                url:BASJS.SERVERPATH+"cloud/"+name,
                data:data,//{episodeId:"318a96e6909b4b44b3b1b452d6584489",score:1},
                dataType:"json",
                success:function(result)
                {

                    if(options)
                    {
                        if(options.success)
                        {
                            options.success(result);
                        }
                    }
                },
                error:function(data)
                {



                    if(options)
                    {
                        if(options.error)
                        {
                            options.error(data);
                        }
                    }

                }
            };
            BASJS._ajax(defaultOpt);







        }
    });

/*
*
* 创建对象类开始
*
* */

    BASJS.Obj = function(attributes, options) {
        this.attributes = {};
        // Allow new AV.Object("ClassName") as a shortcut to _create.
//        if (_.isString(attributes)) {
//            return BASJS.Object._create.apply(this, arguments);
//        }
//
//        attributes = attributes || {};
//        if (options && options.parse) {
//            attributes = this.parse(attributes);
//        }
//        var defaults = AV._getValue(this, 'defaults');
//        if (defaults) {
//            attributes = _.extend({}, defaults, attributes);
//        }
//        if (options && options.collection) {
//            this.collection = options.collection;
//        }
//
//        this._serverData = {};  // The last known data for this object from cloud.
//        this._opSetQueue = [{}];  // List of sets of changes to the data.
//        this.attributes = {};  // The best estimate of this's current data.
//
//        this._hashedJSON = {};  // Hash of values of containers at last save.
//        this._escapedAttributes = {};
//        this.cid = _.uniqueId('c');
//        this.changed = {};
//        this._silent = {};
//        this._pending = {};
//        if (!this.set(attributes, {silent: true})) {
//            throw new Error("Can't create an invalid AV.Object");
//        }
//        this.changed = {};
//        this._silent = {};
//        this._pending = {};
//        this._hasData = true;
//        this._previousAttributes = _.clone(this.attributes);
//        this.initialize.apply(this, arguments);
    };
    BASJS.Obj.extend=function(className, protoProps, classProps){
        var children=null;
        children=function(className){
            this.clazzName=className;
            this.attrs={};
        }
        children.constructor=children;
        children.prototype={
            setACL: function(acl, options) {
                return this.set("acl", acl.permissionsById, options);
            },
            set:function(key,value){
                this.attrs[key]=value;
            },

            get:function(){
                return this.attrs;
            },
            delete:function(ids,obj){
                if(!ids)
                {
                    if(obj)
                    {
                        obj.error({code:-1,message:"id不能为空"});
                    }
                }
                if(ids instanceof Array)
                {
                    ids=ids.join(",");
                }

                BASJS._ajax({
                 //   url: (bwConfig.tool.getQueryString("ip")||bwConfig.SERVERPATH)+'object/'+bwConfig.bwRouterVal.clazzName+"/"+eds._id,
                     url:BASJS.SERVERPATH+'object/'+this.clazzName+"/"+ids,
                    type: "delete",
//            },
                    success:function(data){
                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {

                        if(obj)
                        {
                            obj.error(data);
                        }
                    }
                });
            },
//            deleteAll:function(ids,obj){//批量删除
//                if(!ids)
//                {
//                    if(obj)
//                    {
//                        obj.error({code:-1,message:"id不能为空"});
//                    }
//                }
//                if(ids instanceof Array)
//                {
//                    ids=ids.join(",");
//                }
//                BASJS._ajax({
//                    //   url: (bwConfig.tool.getQueryString("ip")||bwConfig.SERVERPATH)+'object/'+bwConfig.bwRouterVal.clazzName+"/"+eds._id,
//                    url:BASJS.SERVERPATH+'object/'+this.clazzName+"/"+ids,
//                    type: "delete",
////            },
//                    success:function(data){
//                        if(obj)
//                        {
//                            obj.success(data);
//                        }
//                    },
//                    error:function(data,error)
//                    {
//
//                        if(obj)
//                        {
//                            obj.error(data);
//                        }
//                    }
//                });
//            },
            save:function(obj){


                var tempParams=this.attrs;
                BASJS._ajax({
                    url: BASJS.SERVERPATH+'object/'+this.clazzName,
                    type: "post",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){
                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {
                        if(obj)
                        {
                            obj.error(data);
                        }
                    }
                });

            },
            signUp: function(obj) {
                var tempParams=this.attrs;
                BASJS._ajax({
                    url: BASJS.SERVERPATH+'user',
                    type: "post",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){
                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {
                        if(obj)
                        {
                            obj.error(JSON.parse(data.responseText));
                        }
                    }
                });
            },
            updateUser:function(id,obj){//单独针对修改用户
                var tempId="";
                var tempParams=this.attrs;
                if(_.isString(id))
                {
                    tempId=id;
                }


                BASJS._ajax({
                    url: BASJS.SERVERPATH+'user/'+tempId,

                    //  url: bwConfig.SERVERPATH+'object/'+"sound1"+"/5599f8d20cf203e6d07a97ad",
                    type: "put",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){

                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {

                        if(obj)
                        {
                            if(obj.error)
                            {
                                obj.error(data);
                            }

                        }
                    }
                });

            },
            resetSessionToken:function(id,obj){//单独针对修改用户
                var tempId="";
                var tempParams=this.attrs;
                if(_.isString(id))
                {
                    tempId=id;
                }


                BASJS._ajax({
                    url: BASJS.SERVERPATH+'user/'+tempId+"/resetSessionToken",

                    //  url: bwConfig.SERVERPATH+'object/'+"sound1"+"/5599f8d20cf203e6d07a97ad",
                    type: "put",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){

                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {

                        if(obj)
                        {
                            obj.error(data);
                        }
                    }
                });

            },
            update:function(id,obj){
                var tempId="";
                var tempParams=this.attrs;
                if(_.isString(id))
                {
                    tempId=id;
                }


                BASJS._ajax({
                    url: BASJS.SERVERPATH+'object/'+this.clazzName+"/"+tempId,

                    //  url: bwConfig.SERVERPATH+'object/'+"sound1"+"/5599f8d20cf203e6d07a97ad",
                    type: "put",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){

                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {

                        if(obj)
                        {
                            if(obj.error)
                            {
                                obj.error(data);
                            }

                        }
                    }
                });

            },
            updateIncreament:function(id,obj){//修改原子增
                var tempId="";
                var tempParams=this.attrs;
                if(_.isString(id))
                {
                    tempId=id;
                }


                BASJS._ajax({
                    url: BASJS.SERVERPATH+'object/'+this.clazzName+"/"+tempId+"/inc",

                    //  url: bwConfig.SERVERPATH+'object/'+"sound1"+"/5599f8d20cf203e6d07a97ad",
                    type: "put",
                    data:JSON.stringify(tempParams),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success:function(data){

                        if(obj)
                        {
                            obj.success(data);
                        }
                    },
                    error:function(data,error)
                    {

                        if(obj)
                        {
                            obj.error(data);
                        }
                    }
                });

            }

        };
        return new children(className);
    };
    BASJS.Obj.createWithoutData = function(name,id,type){

        var result =BASJS.Obj.extend(type);
        if(name==="File")
        {
            result.set("_id",id);
            result.set("__type","File");
            return result.get();
        }
        if(!type)
        {
            result.set("__type","Pointer");
            result.set("className",name);
            result.set("_id",id);
            return result.get();
        }

    };
    BASJS.Obj.prototype = {

        set: function(key, value, options) {
            var attrs, attr;
//            if (_.isObject(key) || AV._isNullOrUndefined(key)) {
//                attrs = key;
//                AV._objectEach(attrs, function(v, k) {
//                    attrs[k] = AV._decode(k, v);
//                });
//                options = value;
//            } else {
//                attrs = {};
//                attrs[key] = AV._decode(key, value);
//            }
//
//            // Extract attributes and options.
//            options = options || {};
//            if (!attrs) {
//                return this;
//            }
//            if (attrs instanceof AV.Object) {
//                attrs = attrs.attributes;
//            }
//
//            // If the unset option is used, every attribute should be a Unset.
//            if (options.unset) {
//                AV._objectEach(attrs, function(unused_value, key) {
//                    attrs[key] = new AV.Op.Unset();
//                });
//            }
//
//            // Apply all the attributes to get the estimated values.
//            var dataToValidate = _.clone(attrs);
//            var self = this;
////            AV._objectEach(dataToValidate, function(value, key) {
////                if (value instanceof AV.Op) {
////                    dataToValidate[key] = value._estimate(self.attributes[key],
////                        self, key);
////                    if (dataToValidate[key] === AV.Op._UNSET) {
////                        delete dataToValidate[key];
////                    }
////                }
////            });
//
//            // Run validation.
////            if (!this._validate(attrs, options)) {
////                return false;
////            }
//
//            this._mergeMagicFields(attrs);
//
//            options.changes = {};
//            var escaped = this._escapedAttributes;
//            var prev = this._previousAttributes || {};
//
//            // Update attributes.
//            AV._arrayEach(_.keys(attrs), function(attr) {
//                var val = attrs[attr];
//
//                // If this is a relation object we need to set the parent correctly,
//                // since the location where it was parsed does not have access to
//                // this object.
//                if (val instanceof AV.Relation) {
//                    val.parent = self;
//                }
//
//                if (!(val instanceof AV.Op)) {
//                    val = new AV.Op.Set(val);
//                }
//
//                // See if this change will actually have any effect.
//                var isRealChange = true;
//                if (val instanceof AV.Op.Set &&
//                    _.isEqual(self.attributes[attr], val.value)) {
//                    isRealChange = false;
//                }
//
//                if (isRealChange) {
//                    delete escaped[attr];
//                    if (options.silent) {
//                        self._silent[attr] = true;
//                    } else {
//                        options.changes[attr] = true;
//                    }
//                }
//
//                var currentChanges = _.last(self._opSetQueue);
//                currentChanges[attr] = val._mergeWithPrevious(currentChanges[attr]);
//                self._rebuildEstimatedDataForKey(attr);
//
//                if (isRealChange) {
//                    self.changed[attr] = self.attributes[attr];
//                    if (!options.silent) {
//                        self._pending[attr] = true;
//                    }
//                } else {
//                    delete self.changed[attr];
//                    delete self._pending[attr];
//                }
//            });
//
//            if (!options.silent) {
//                this.change(options);
//            }
            return this;
        }

    };

    /*
    *
    * 创建对象类结束
    * */








     BASJS.Query=function(objectClass){


//        if (_.isString(objectClass)) {
//        }
        this.objectClass = objectClass;
        this.clazzName =objectClass;//objectClass.prototype.className;
        this._where = {};
        this._include = [];
        this._limit =1000; // negative limit means, do not send a limit
        this._skip = 0;
         this._order={"updatedAt":-1};
        this._extraOptions = {};

    }
    BASJS.Query.prototype = {
        _quote: function(s) {
            //return "\\Q" + s.replace("\\E", "\\E\\\\E\\Q") + "\\E";
            return "\\Q" + s.replace("\\E", "\\E\\\\E\\Q") + "\\E";
        },
        toJSON: function() {
            var params = {
                where: this._where
            };

            if (this._include.length > 0) {
                params.include = this._include.join(",");
            }
            if (this._select) {
                params.keys = this._select.join(",");
            }
            if (this._limit >= 0) {
                params.limit = this._limit;
            }
            if (this._skip > 0) {
                params.skip = this._skip;
            }
            if (this._order !== undefined) {
                params.order = this._order;
            }
            if (this.clazzName !== undefined) {
                params.searchClass = this.clazzName;
            }

//            AV._objectEach(this._extraOptions, function(v, k) {
//                params[k] = v;
//            });

            return params;
        },
        skip: function(n) {
            this._skip = n;
            return this;
        },
        include: function(key) {
            var self = this;
            self._include.push(key);



//            BASJS._arrayEach(arguments, function(key) {
//                if (_.isArray(key)) {
//                    self._include = self._include.concat(key);
//                } else {
//                    self._include.push(key);
//                }
//            });
            return this;
        },
        _addCondition: function(key, condition, value) {
            // Check if we already have a condition
            if (!this._where[key]) {
                this._where[key] = {};
            }
            this._where[key][condition] = BASJS._encode(value);
            return this;
        },
        lessThan: function(key, value) {
            this._addCondition(key, "$lt", value);
            return this;
        },
        greaterThan: function(key, value) {
            this._addCondition(key, "$gt", value);
            return this;
        },
        lessThanOrEqualTo: function(key, value) {
            this._addCondition(key, "$lte", value);
            return this;
        },
        greaterThanOrEqualTo: function(key, value) {
            this._addCondition(key, "$gte", value);
            return this;
        },
        exists: function(key) {
            this._addCondition(key, "$exists", true);
            return this;
        },
        doesNotExist: function(key) {
            this._addCondition(key, "$exists", false);
            return this;
        },
        startsWith: function(key, value) {


            this._addCondition(key, "$regex", "^" + this._quote(value));
            return this;
        },
        notStartsWith: function(key, value) {
            this._addCondition(key, "$regex", "^[^" + this._quote(value)+"]");
            return this;
        },
        endsWith: function(key, value) {
            this._addCondition(key, "$regex", this._quote(value) + "$");
            return this;
        },
        ascending: function(key) {// 升序 ,正需
            var tempValue={};
            tempValue[key]=1;
            this._order = tempValue;
            return this;
        },
        descending: function(key) {//// 降序，倒序
            var tempValue={};
            tempValue[key]=-1;
            this._order = tempValue;
            return this;
        },
        limit: function(n) {
            this._limit = n;
            return this;
        },
        containsAll: function(key, values) {
            this._addCondition(key, "$all", values);
            return this;
        },
        containedIn: function(key, values) {
            this._addCondition(key, "$in", values);
            return this;
        },
        contains: function(key, value) {
            this._addCondition(key, "$regex", this._quote(value));
            return this;
        },
        matchesQuery: function(key, query) {
            var queryJSON = query.toJSON();
            //queryJSON.className = query.className;
            this._addCondition(key, "$sub", query);
            return this;
        },



        /**
        *相等时
         */
        equalTo: function(key, value) {
            this._where[key] = BASJS._encode(value);
            return this;
        },

        notEqualTo: function(key, value) {
            this._addCondition(key, "$ne", value);
            return this;
        },

        getQueryString:function(){
            return this._where;
        },
        getOrderObj:function(){
            return this._order;
        },
        find:function(obj){

            var tempNewParams= $.extend(true,{},{include:this._include.join(","),limit:this._limit,skip:this._skip,where:JSON.stringify(this._where),order:JSON.stringify(this._order)});

            BASJS._ajax({
                type:"get",
                url:BASJS.SERVERPATH+"object/"+this.clazzName,
                data:tempNewParams,
                dataType:"json",
                success:function(result)
                {

                    if(obj)
                    {
                        if(obj.success)
                        obj.success(result);
                    }

                },
                error:function(data)
                {

                    if(obj)
                    {
                        if(obj.error)
                        obj.error(data);
                    }

                }
            });

        }



    };






    /*
     *
     * acl类
     *
     * */

    BASJS.ACL = function(arg1) {
        var self = this;
        self.permissionsById = {};
//        if (_.isObject(arg1)) {
//            if (arg1 instanceof AV.User) {
//                self.setReadAccess(arg1, true);
//                self.setWriteAccess(arg1, true);
//            } else {
//                if (_.isFunction(arg1)) {
//                    throw "AV.ACL() called with a function.  Did you forget ()?";
//                }
//                AV._objectEach(arg1, function(accessList, userId) {
//                    if (!_.isString(userId)) {
//                        throw "Tried to create an ACL with an invalid userId.";
//                    }
//                    self.permissionsById[userId] = {};
//                    AV._objectEach(accessList, function(allowed, permission) {
//                        if (permission !== "read" && permission !== "write") {
//                            throw "Tried to create an ACL with an invalid permission type.";
//                        }
//                        if (!_.isBoolean(allowed)) {
//                            throw "Tried to create an ACL with an invalid permission value.";
//                        }
//                        self.permissionsById[userId][permission] = allowed;
//                    });
//                });
//            }
//        }
    };
    BASJS.ACL.prototype= {
        setPublicReadAccess:function(allowed)
        {
            this.setReadAccess(BASJS.PUBLIC_KEY, allowed);
        },
        setReadAccess:function(userId, allowed) {
            this._setAccess("read", userId, allowed);
        },
        setWriteAccess:function(userId, allowed){
            this._setAccess("write", userId, allowed);
        },
        setPublicWriteAccess:function(allowed) {
            this.setWriteAccess(BASJS.PUBLIC_KEY, allowed);
        },
        _setAccess:function(accessType, userId, allowed) {
            var permissions = this.permissionsById[userId];
            if (!permissions) {
                if (!allowed) {
                    // The user already doesn't have this permission, so no action needed.
                    return;
                } else {
                    permissions = {};
                    this.permissionsById[userId] = permissions;
                }
            }
            if (allowed) {
                this.permissionsById[userId][accessType] = true;
            }
        }

    }




}(this));
