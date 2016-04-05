/**
 * Created by bill on 16/3/2.
 */
function getParam() {
    for (var a = window.location.search.substr(1), b = a.split("&"), c = {}, d = 0; d < b.length; d++) {
        var e = b[d].split("=");
        c[e[0]] = e[1]
    }
    return c
}
function isSystemFields(a) {
    for (var b = 0; b < SYSTEM_FIELDS.length; b++) if (SYSTEM_FIELDS[b] == a) return !0;
    return !1
}
function isSystemClass(a) {
    return $.inArray(a, ["_File", "_Installation", "_Notification", "_Role", "_User"])
}
function convertToType(a, b) {
    var c = {};
    switch (b) {
        case "Number":
            isNaN(a) || (c = {
                type: "Number",
                val: Number(a)
            });
            break;
        case "Boolean":
            c = {
                type: "Boolean",
                val: a && "false" != a ? !0 : !1
            };
            break;
        case "Date":
            a && "" != a && "null" != a ? moment(a).isValid() && (c = {
                type: "Date",
                val: moment(a).toDate()
            }) : c = {
                type: "Date",
                val: null
            };
            break;
        case "Array":
            try {
                a && "" != a && "null" != a ? $.isArray(JSON.parse(a)) && (c = {
                    type: "Array",
                    val: JSON.parse(a)
                }) : c = {
                    type: "Array",
                    val: null
                }
            } catch (d) {
                c = {}
            }
            break;
        case "Object":
            if (a && "" != a && "null" != a) try {
                c = {
                    type: "Object",
                    val: JSON.parse(a)
                }
            } catch (d) {
                c = {}
            } else c = {
                type: "Object",
                val: null
            };
            break;
        case "ACL":
            if (a && "" != a && "null" != a) {
                if ("string" != typeof a) return c = {
                    type: "ACL",
                    val: a
                };
                try {
                    c = {
                        type: "ACL",
                        val: new AV.ACL(JSON.parse(a))
                    }
                } catch (d) {
                    c = {}
                }
            } else c = {
                type: "ACL",
                val: null
            };
            break;
        case "GeoPoint":
            var e = a.split(",");
            if (e[0] && parseInt(e[0]) <= 180 && parseInt(e[0]) >= -180) {
                if (e[1] && parseInt(e[1]) <= 90 && parseInt(e[1]) >= -90) {
                    var f = new AV.GeoPoint({
                        latitude: Number(e[1]),
                        longitude: Number(e[0])
                    });
                    c = {
                        type: "GeoPoint",
                        val: f
                    }
                }
            } else {
                var f = new AV.GeoPoint({
                    latitude: 0,
                    longitude: 0
                });
                c = {}
            }
            break;
        default:
            c = {
                type: "String",
                val: a
            }
    }
    return c
}
function validateEmail(a) {
    var b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return b.test(a)
}
function getKeys(a) {
    var b = [];
    for (var c in a) a.hasOwnProperty(c) && b.push(c);
    return b
}
function secondFormat(a) {
    if (!a || 0 >= a) return "00:00:00";
    var b = parseInt(a / 3600),
        c = parseInt((a - 3600 * b) / 60),
        d = a % 60;
    return 10 > d && (d = "0" + d), 10 > b && (b = "0" + b), 10 > c && (c = "0" + c), b + ":" + c + ":" + d
}
function bytesToSize(a) {
    var b = ["Bytes", "KB", "MB", "GB", "TB"];
    if (0 == a) return "0 Byte";
    var c = parseInt(Math.floor(Math.log(a) / Math.log(1024)));
    return Math.round(a / Math.pow(1024, c), 2) + " " + b[c]
}
function getDaysBetweenDate(a, b) {
    var c = moment(b).valueOf() - moment(a).valueOf();
    return parseInt(c / 864e5)
}
function htmlEntities(a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
function getApiRequestHeader(a, b) {
    return {
        "X-AVOSCloud-Application-Id": a,
        "X-AVOSCloud-Application-Key": b
    }
}
function getMasterRequestHeader(a, b) {
    return {
        "X-AVOSCloud-Application-Id": a,
        "X-AVOSCloud-Master-Key": b
    }
}
function getChartOption() {
    var a = {
        chart: {
            type: "areaspline"
        },
        title: {
            x: 0
        },
        yAxis: {
            allowDecimals: !1,
            min: 0,
            title: {
                text: ""
            },
            labels: {
                overflow: "justify"
            }
        },
        xAxis: {
            labels: {
                overflow: "justify"
            },
            tickPixelInterval: 200
        },
        tooltip: {},
        plotOptions: {
            areaspline: {
                fillOpacity: .4
            }
        },
        credits: {
            enabled: !1
        },
        series: [{
            data: []
        }],
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [{
                        text: "导出为 PNG",
                        onclick: function() {
                            this.exportChart()
                        },
                        separator: !1
                    }]
                }
            }
        }
    };
    return a
}
function downloadURL(a) {
    var b = "hiddenDownloader",
        c = document.getElementById(b);
    null === c && (c = document.createElement("iframe"), c.id = b, c.style.display = "none", document.body.appendChild(c)), c.src = a
}
function syntaxHighlight(a) {
    return "string" != typeof a && (a = JSON.stringify(a, void 0, 2)), a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), a.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(a) {
        var b = "number";
        return /^"/.test(a) ? b = /:$/.test(a) ? "key" : "string" : /true|false/.test(a) ? b = "boolean" : /null/.test(a) && (b = "null"), '<span class="' + b + '">' + a + "</span>"
    })
}
var ENV = {
    WEBHOST: "@@webhost"
};
AVC = {}, AVC.Error = "error", AVC.AuthDesc = {
    stats: "分析",
    storage: "存储",
    message: "消息",
    component: "组件",
    setting: "设置"
}, AVC.Page2Auth = {
    "data.html": "storage.data",
    "cloud.html": "storage.cloud_code",
    "apistat.html": "storage.api_stat",
    "dataquery.html": "storage.bigquery",
    "messaging.html": "message",
    "stat.html": "stats",
    "devcomponent.html": "component",
    "app.html": "setting"
}, AVC.Auth2Page = {
    component: {
        feedback: "devcomponent.html#/component/feedback",
        custom_param: "devcomponent.html#/component/custom_param",
        app_search: "devcomponent.html#/component/appsearch",
        sns: "devcomponent.html#/component/sns"
    },
    message: {
        realtime: "messaging.html#/message/realtime/stat",
        push: "messaging.html#/message/push/create",
        sms: "messaging.html#/message/sms/create"
    },
    setting: {
        app_info: "app.html#/general",
        app_flags: "app.html#/permission",
        email_template: "app.html#/email",
        sms_template: "app.html#/sms",
        cooperator: "app.html#/team",
        export_data: "app.html#/export",
        security: "app.html#/security"
    },
    storage: {
        data: "data.html",
        cloud_code: "cloud.html",
        api_stat: "apistat.html",
        bigquery: "dataquery.html"
    },
    stats: {
        trend: "stat.html#/statrealtime",
        behavior: "stat.html#/stat/appuse",
        device: "stat.html#/stat/userstay",
        custom: "stat.html#/stat/customevent",
        track: "stat.html#/stat/channelpromotion",
        crash: "stat.html#/stat/crashreport",
        settings: "stat.html#/statconfig/trans_strategoy"
    }
};
var purl = "/1/",
    purl1 = "/1.1/",
    appurl = purl + "clients/self/apps/" + getParam().appid,
    cloudURL = "/1/",
    rootpage = "applist.html",
    SYSTEM_FIELDS = ["objectId", "updatedAt", "createdAt"],
    CTYPES = ["String", "Number", "Boolean", "Date", "File", "Array", "Object", "GeoPoint", "Pointer", "Relation", "Any"],
    QUERYS = {
        String: ["equals", "does not equal", "start with", "exists", "does not exist"],
        Number: ["equals", "does not equal", "less than", "greater than", "less than or equal to", "greater than or equal to", "exists", "does not exist"],
        Array: ["contains string", "does not contain string", "contains number", "does not contain number", "exists", "does not exist"],
        Boolean: ["equals", "exists", "does not exist"],
        Date: ["before", "after", "exists", "does not exist"],
        Pointer: ["equals", "does not equal", "exists", "does not exist"]
    },
    PUSH_QUERYS = {
        String: ["equals", "does not equal", "start with", "exists", "does not exist"],
        Number: ["equals", "does not equal", "less than", "greater than", "less than or equal to", "greater than or equal to", "exists", "does not exist"],
        Array: ["contains string", "does not contain string", "equals", "does not equal", "exists", "does not exist"],
        Boolean: ["equals", "exists", "does not exist"],
        Date: ["before", "after", "exists", "does not exist"]
    },
    MANGOQUERY = {
        exists: "$exists",
        "does not exist": "$exists",
        "less than": "$lt",
        "less than or equal to": "$lte",
        "greater than": "$gt",
        "does not contain string": "$ne",
        "does not contain number": "$ne",
        before: "$lt",
        after: "$gt",
        "start with": "$regex"
    },
    MAPJSAPI = {
        equals: "equalTo",
        "does not equal": "notEqualTo",
        exists: "exists",
        "does not exist": "doesNotExist",
        "less than": "lessThan",
        "less than or equal to": "lessThanOrEqualTo",
        "greater than": "greaterThan",
        "greater than or equal to": "greaterThanOrEqualTo",
        "does not contain string": "notEqualTo",
        "does not contain number": "notEqualTo",
        "contains string": "equalTo",
        "contains number": "equalTo",
        before: "lessThan",
        after: "greaterThan",
        "start with": "startsWith",
        "contains in": "containedIn",
        "does not contain in": "notContainedIn"
    },
    QUERY_TYPES = {
        "contains string": "String",
        "does not contain string": "String",
        "contains number": "Number",
        "does not contain number": "Number"
    };
$(function() {
    window.ZeroClipboard && ZeroClipboard.setDefaults({
        moviePath: "scripts/lib/zeroclipboard/zeroclipboard.swf"
    })
}), Mousetrap.bind(["g s"], function() {
    angular.element(".nav-key-1").trigger("click")
}), Mousetrap.bind(["g e", "g t"], function() {
    angular.element(".nav-key-2").trigger("click")
}), Mousetrap.bind(["g a"], function() {
    angular.element(".nav-key-3").trigger("click")
}), Mousetrap.bind(["g d", "g m"], function() {
    angular.element(".nav-key-4").trigger("click")
}), Mousetrap.bind(["g c"], function() {
    angular.element(".nav-key-5").trigger("click")
}), Mousetrap.bind("?", function() {
    $("#modal-shortcuts").modal("toggle")
}), Mousetrap.bind("a", function() {
    $(".dropdown-toggle-app-name .dropdown-toggle").click()
}), Mousetrap.bind(["`", "g h"], function() {
    parent.window.location.href = "/applist.html"
}), Mousetrap.bind(["s", "/"], function() {
    return $(".app-search input").focus(), !1
}), Mousetrap.bind("e", function() {
    angular.element(".cell-edit").trigger("click")
});
var lcngUtil = {
    bytesToSize: bytesToSize
};
$(function() {
    function a(a) {
        return a.outerHeight(!0)
    }
    function b(b, c, d, e) {
        b.hasClass(d) ? e ? c.animate({
            paddingTop: a(b) + "px"
        }, 200) : c.css("paddingTop", a(b) + "px") : e ? c.animate({
            paddingTop: 0
        }, 200) : c.css("paddingTop", 0)
    }
    function c(a, c) {
        function d(a) {
            $(a).slideUp(200, function() {
                $(a).remove(), b(e, g, "on", !0)
            })
        }
        var f = 5e3;
        c = c || "success", "success" === c && $("#global-notify .msg-tip-wrapper").each(function(a, b) {
            d(b)
        }), a = a || "操作成功";
        var h = $("#notify-item-tmpl").tmpl({
            msg: a,
            type: c
        });
        h.prependTo("#global-notify").hide().slideDown(200, function(a) {
            b(e, g, "on", !0)
        }), h.on("click", ".msg-tip-close", function() {
            d(h)
        }), "success" === c && setTimeout(function() {
            d(h)
        }, f)
    }
    function d() {}
    var e = $("#global-notify"),
        f = $(".dashboard-subnav.navbar"),
        g = $(".container-fluid.dashboard-content");
    f.waypoint(function(a, c) {
        e.toggleClass("on"), b(e, g, "on", !1)
    }, {
        offset: -f.outerHeight(!0)
    }), window.showmsg = c, window.hidemsg = d
}), function() {
    var a = angular.module("dashBoard.services", ["ngResource"]);
    a.config(["$httpProvider", function(a) {
        a.responseInterceptors.push("errorHttpInterceptor"), a.interceptors.push("beforeRequestInterceptor")
    }]), a.factory("apps", ["$http", "filterFilter", function(a, b) {
        var c = {};
        return c.all = [], c.loadall = function() {
            a.get(purl + "clients/self/apps").success(function(a) {
                c.all = a
            }).error(function(a) {})
        }, c.loadall(), c
    }]), a.factory("datas", ["$http", "$rootScope", function(a, b) {
        var c = {};
        return a.get(purl + "data/" + getParam().appid + "/classes").success(function(a) {
            c.clas = a, b.$broadcast("datasready", a)
        }).error(function() {}), c
    }]), a.factory("App", ["$http", "$q", "$routeParams", "AppModel", function(a, b, c, d) {
        var e = b.defer();
        return getParam().appid ? (a.get(purl + "clients/self/apps/" + getParam().appid).success(function(a) {
            e.resolve(a), d.currentApp = a
        }).error(function() {
            window.location.href = rootpage
        }), e.promise) : (e.resolve(), e.promise)
    }]), a.factory("AppModel", ["$http", "$q", "$routeParams", function(a, b, c) {
        var d = {
            currentApp: null,
            get: function() {
                var c = b.defer();
                return a.get(purl + "clients/self/apps/" + getParam().appid).success(function(a) {
                    d.currentApp = a, c.resolve(a)
                }).error(function() {
                    window.location.href = rootpage
                }), c.promise
            }
        };
        return d
    }]), a.factory("Team", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "clients/self/teams/:id", {
            id: "@id"
        }, {})
    }]), a.factory("TeamMember", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "clients/self/teams/:teamid/members/:memberid", {
            teamid: "@teamid",
            memberid: "@memberid"
        }, {})
    }]), a.factory("Cooperator", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "clients/self/apps/:app_id/cooperators/:cooperatorid", {
            app_id: "@app_id",
            cooperatorid: "@cooperatorid"
        }, {
            query: {
                method: "GET",
                isArray: !1
            },
            "delete": {
                method: "DELETE",
                params: {
                    type: "@type"
                }
            },
            update: {
                method: "PUT",
                params: {
                    type: "@type"
                }
            }
        })
    }]), a.factory("beforeRequestInterceptor", ["$q", "$rootScope", function(a, b) {
        return {
            request: function(b) {
                return b || a.when(b)
            }
        }
    }]), a.factory("errorHttpInterceptor", ["$q", "$location", "$rootScope", function(a, b, c) {
        return function(b) {
            return b.then(function(a) {
                return a
            }, function(b) {
                return 403 === b.status ? c.$broadcast("event:loginRequired") : b.status >= 400 && b.status <= 500 && 404 != b.status && (b.data && b.data.error ? showmsg(b.data.error, AVC.Error) : showmsg("发生错误", AVC.Error)), a.reject(b)
            })
        }
    }]), a.factory("Money", ["$http", function(a) {
        return {
            price: function(b, c) {
                var d = {
                    quantity: c,
                    item: b
                };
                return a.get(purl + "payment/get-item-amount", {
                    params: d
                })
            }
        }
    }]), a.factory("HdfsQuery", ["AppModel", "$http", function(a, b) {
        function c(c, e, f) {
            function g(c) {
                var e = {};
                return $.extend(e, d, c), b.get(j, {
                    params: e,
                    headers: getMasterRequestHeader(a.currentApp.app_id, a.currentApp.master_key)
                })
            }
            function h(a) {
                var b = {
                    max: a
                };
                return g(b)
            }
            function i(a) {
                var b = {
                    where: a
                };
                return g(b)
            }
            var j = f || "/1.1/tables/" + c;
            return e && $.extend(d, e), {
                query: g,
                queryByMax: h,
                queryByWhere: i
            }
        }
        var d = {
            limit: 20,
            orderby: "createdAt"
        };
        return c
    }])
}(), function() {
    var a = angular.module("dashBoard.filters", []);
    a.filter("pushFieldFilter", function() {
        return function(a) {
            var b = {};
            return angular.forEach(a, function(a, c) {
                "ACL" != c && "Pointer" != a.type && "GeoPoint" != a.type & "Relation" != a.type && "deviceType" != c && (b[c] = a)
            }), b
        }
    }), a.filter("range", function() {
        return function(a, b, c) {
            b = parseInt(b), c = parseInt(c);
            for (var d = b; c > d; d++) a.push(d);
            return a
        }
    }), a.filter("to_trusted", ["$sce", function(a) {
        return function(b) {
            return b ? a.trustAsHtml("" + b) : ""
        }
    }]), a.filter("lc_currency", function() {
        return function(a) {
            return 0 > a ? "-¥" + Math.abs(a) : "¥" + a
        }
    })
}(), function() {
    var a = angular.module("dashBoard.directives", []);
    a.directive("staticInclude", ["$http", "$templateCache", "$compile", function(a, b, c) {
        return function(d, e, f) {
            var g = f.staticInclude;
            a.get(g, {
                cache: b
            }).success(function(a) {
                var b = e.html(a).contents();
                c(b)(d)
            })
        }
    }]), a.directive("myAgBlur", function() {
        return function(a, b, c) {
            b.bind("blur", function() {
                a.$apply(c.myAgBlur)
            })
        }
    }), a.directive("lcTab", function() {
        return function(a, b, c) {
            $(b).find("a").click(function(a) {
                a.preventDefault(), $(this).tab("show")
            })
        }
    }), a.directive("lcPopover", function() {
        var a = [],
            b = function(b) {
                $.each(a, function(a, c) {
                    c.is(b.target) || 0 !== c.has(b.target).length || 0 !== $(".popover").has(b.target).length || c.popover("hide")
                })
            },
            c = function(b) {
                $.each(a, function(c, d) {
                    d.is(b) && a.splice(c, 1)
                })
            };
        return $("body").on("click", b), function(d, e, f) {
            var g = $(e);
            g.popover(), a.push(g), d.$on("destory", function() {
                c(g), a.length || $("body").off("click", b)
            })
        }
    }), a.directive("rangeDate", function() {
        return {
            template: '<i class="icon icon-calendar icon-large"></i> <span></span> <b class="caret"></b>',
            scope: {
                selectCallback: "&",
                startDate: "=",
                endDate: "=",
                maxDate: "="
            },
            link: function(a, b, c) {
                var d = {
                    startDate: moment(a.startDate).format("YYYY/MM/DD"),
                    endDate: moment(a.endDate).format("YYYY/MM/DD"),
                    minDate: "2012/01/01",
                    maxDate: "2020/12/31",
                    dateLimit: {
                        days: 180
                    },
                    showDropdowns: !0,
                    showWeekNumbers: !0,
                    timePicker: !1,
                    timePickerIncrement: 1,
                    timePicker12Hour: !0,
                    ranges: {
                        "今天": [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
                        "昨天": [moment().subtract("days", 1).format("YYYY-MM-DD"), moment().subtract("days", 1).format("YYYY-MM-DD")],
                        "7天": [moment().subtract("days", 6), moment()],
                        "30天": [moment().subtract("days", 29), moment()]
                    },
                    opens: "left",
                    buttonClasses: ["btn btn-default"],
                    applyClass: "btn-small btn-primary",
                    cancelClass: "btn-small",
                    format: "YYYY-MM-DD",
                    separator: " to ",
                    locale: {
                        applyLabel: "确定",
                        cancelLabel: "取消",
                        customRangeLabel: "自定义日期",
                        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                        monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                        firstDay: 1
                    }
                };
                c.$observe("selectCallback", function(c) {
                    a.maxDate && (d.maxDate = moment(a.maxDate).format("YYYY/MM/DD")), b.daterangepicker(d, function(c, d) {
                        a.selectCallback({
                            start: c,
                            end: d
                        }), b.find("span").html(c.format("YYYY-MM-DD") + " 至 " + d.format("YYYY-MM-DD"))
                    })
                }), a.$watch("endDate", function() {
                    b.find("span").html(moment(a.startDate).format("YYYY-MM-DD") + " 至 " + moment(a.endDate).format("YYYY-MM-DD"))
                })
            }
        }
    }), a.directive("acPagination", function() {
        return {
            templateUrl: "views/pagination.html",
            scope: {
                currentPage: "=?",
                totalCount: "=?",
                pageSize: "=?"
            },
            controller: ["$scope", function(a) {
                a.currentPage = a.currentPage || 1, a.pageSize = a.pageSize || 10, a.goPre = function() {
                    a.currentPage > 1 && a.currentPage--
                }, a.goNext = function() {
                    a.currentPage < a.totalPage && a.currentPage++
                }
            }],
            link: function(a, b, c) {
                a.$watch("totalCount", function() {
                    a.totalCount && (a.totalPage = Math.ceil(a.totalCount / a.pageSize))
                }), a.$watch("pageSize", function() {
                    a.totalCount && (a.totalPage = Math.ceil(a.totalCount / a.pageSize))
                })
            }
        }
    }), a.directive("lcPaySelect", ["$http", function(a) {
        return {
            templateUrl: "views/pay-select.html",
            restrict: "E",
            replace: !0,
            controller: function(b) {
                a.get(purl + "payment/money-account").success(function(a) {
                    b.moneyAccount = a
                })
            }
        }
    }]), a.directive("leanCacheNameCheck", [function() {
        return {
            require: "ngModel",
            link: function(a, b, c, d) {
                var e = /^[a-zA-Z_][a-zA-Z0-9_]{0,31}$/;
                d.$parsers.unshift(function(a) {
                    return e.test(a) || "" === a.trim() ? (d.$setValidity("instance", !0), a) : void d.$setValidity("instance", !1)
                })
            }
        }
    }]), a.directive("leanJsonDetail", ["$modal", function(a) {
        return {
            restrict: "AE",
            scope: {
                jsondata: "="
            },
            link: function(b, c, d) {
                c.bind("click", function() {
                    b.jsonDetail = syntaxHighlight(b.jsondata), a({
                        scope: b,
                        template: "views/modal/json-detail-modal.html",
                        show: !0
                    })
                })
            }
        }
    }]), a.directive("leanEnter", function() {
        return function(a, b, c) {
            b.bind("keydown keypress", function(b) {
                13 === b.which && (a.$apply(function() {
                    a.$eval(c.leanEnter)
                }), b.preventDefault())
            })
        }
    })
}(), function() {
    angular.module("IndexPage", ["locales", "dashBoard.services"]);
    var a = angular.module("dashBoard", ["dashBoard.services", "dashBoard.filters", "dashBoard.directives", "dashBoard.configSer", "dashBoard.storageSer", "locales", "ngAnimate", "mgcrea.ngStrap", "ngUpload", "ngRoute", "ngLocale", "ui.gravatar", "infoCenterMod", "account.accountSer", "md5"]);
    a.run(["storageSer", function(a) {
        var b = location.search.match(/[\?&]source=([^&]*)/);
        if (b) {
            var c = b[1];
            a.item("promoCode", {
                value: c,
                date: Date.now()
            });
            var d = location.pathname + location.search.replace(/(?=\?*)&*source=[^&]*/i, "");
            d.indexOf("?") === d.length - 1 && (d = d.slice(0, d.length - 1)), history.replaceState(null, null, d), $.ajax({
                method: "POST",
                url: "https://api.leancloud.cn/1.1/functions/collect",
                headers: {
                    "X-LC-Id": "bkaTfiY3Nc2jLJW7hXRmoFiK",
                    "X-LC-Key": "FkooEOxbmkmSnlEvTjxPFEiy"
                },
                data: JSON.stringify({
                    type: "LINK_CLICKED",
                    payload: {
                        promoteCode: c,
                        referrer: document.referrer
                    }
                }),
                contentType: "application/json"
            })
        }
    }]), a.controller("NavCtrl", ["$scope", "$http", function(a, b) {
        a.nav2Testin = function(a) {
            $.ajax({
                method: "get",
                url: purl + "oauth2/testin/token",
                async: !1
            }).success(function(b) {
                $(a.target).attr("href", "http://sso.testin.cn/connect/avos/?authtoken=" + b.token)
            }).error(function() {})
        }
    }]), a.controller("RootCtrl", ["$scope", "$http", "Team", "TeamMember", "apps", "$location", "$rootScope", "$window", "infoCenterSer", "storageSer", "accountSer", "$modal", function(a, b, c, d, e, f, g, h, i, j, k, l) {
        function m(a) {
            var b = a;
            return /\.html$/.test(a) && (b = AVC.Page2Auth[a]), a.split("#").length > 1 && angular.forEach(AVC.Auth2Page, function(c, d) {
                angular.forEach(c, function(c, e) {
                    c == a && (b = d + "." + e)
                })
            }), b
        }
        function n() {
            var b = window.navigator.platform,
                c = null;
            b.match(/mac|iphone/i) && (c = !0), a.isMacOs = c
        }
        a.currentHtmlPage = location.pathname.split("/").pop(), a.env = ENV, a.XSRF_TOKEN = $.cookie("XSRF-TOKEN"), a.moment = moment, a.apps = e, a.rootState = {
            pendingRequest: 0
        }, /^us.*/.test(document.domain) ? a.nodeDomain = "us" : a.nodeDomain = "cn", a.lcngUtil = lcngUtil, a.getAppById = function(b) {
            if (a.apps.all) {
                var c = a.apps.all.filter(function(a) {
                    return a.app_id === b
                });
                return c && c[0] ? c[0] : void 0
            }
        }, a.showModal = function(b, c) {
            var d = angular.element(b.target).scope();
            a.currentModal = l({
                scope: d,
                template: c,
                show: !0
            })
        }, a.hideModal = function() {
            a.currentModal && a.currentModal.hide()
        }, a.getClass = function(a, b) {
            return b ? f.path() == a ? "active" : "" : f.path().substr(0, a.length) == a ? "active" : ""
        }, a.signout = function() {
            k.signout().then(function(a) {
                window.location.href = "login.html"
            })
        }, i.getNotification().then(function(b) {
            var c = Number(j.item("notification-count"));
            c < b.length ? (a.hasnewnotify = !0, j.item("notification-count", b.length)) : a.hasnewnotify = !1;
            var d = b.filter(function(a, b) {
                    return 1 === a.status && 4 !== a.category
                }),
                e = Number(j.item("last-notifycation-id"));
            d && d[0] && d[0].id > 104 && (!e || e && d[0].id > e) && (a.importantNotify = d[0])
        }), a.closeImportantNotify = function(a) {
            j.item("last-notifycation-id", a)
        }, a.readNotification = function() {
            a.hasnewnotify = !1, h.location.href = "/info-center.html"
        }, a.loaduser = function() {
            b.get(purl + "clients/self").success(function(b) {
                g.user = b;
                var c = moment().toDate().getTime() - moment(a.user.created).toDate().getTime();
                48 > c / 36e4 && (a.user.isNew = !0), a.user.flags && a.user.flags.indexOf("client-email-verified") > -1 && (a.user.flags.emailVerified = !0)
            }).error(function(a) {
                window.location.href = "login.html"
            })
        }, a.$on("$routeChangeSuccess", function(a, b) {}), a.$on("$viewContentLoaded", function(a, b) {}), NProgress.configure({
            showSpinner: !1,
            easing: "ease",
            speed: 400,
            trickleRate: .04
        }), a.hasPendingRequest = function() {
            return b.pendingRequests.length > 0 || a.rootState.pendingRequest > 0
        }, a.$watch(function() {
            a.hasPendingRequest() ? NProgress.start() : NProgress.done()
        }), a.gotoApp = function(b, c) {
            c || (c = Object.keys(AVC.Page2Auth).indexOf(a.currentHtmlPage) > -1 ? a.currentHtmlPage : "data.html");
            var d = Object.keys(AVC.Page2Auth),
                e = AVC.Page2Auth[c];
            if (e) if (a.hasPermission(e, b)) a.gotoPageWithId(c, b);
            else for (var f = 0; f < d.length; f++) if (a.hasPermission(d[f], b)) {
                    a.gotoPageWithId(d[f], b);
                    break
                }
        }, a.hasPermission = function(b, c) {
            var d;
            if (c && angular.forEach(a.apps.all, function(a, b) {
                a.app_id == c && (d = a)
            }), d = d || a.currentApp, a.currentApp && (c = c || a.currentApp.app_id), !d || !c) return !1;
            if ("cooperator" == d.app_relation && 1 != d.permission_modules["*"]) {
                var e = !1;
                b = m(b);
                var f = b.split(".")[0],
                    g = b.split(".")[1];
                return d.permission_modules[f] === !0 && (e = !0), "object" != typeof d.permission_modules[f] || g || angular.forEach(d.permission_modules[f], function(a, b) {
                    a === !0 && (e = !0)
                }), g && d.permission_modules[f] && d.permission_modules[f][g] === !0 && (e = !0), e
            }
            return !0
        }, a.gotoHash = function(b) {
            a.currentApp && f.path(b)
        }, a.gotoPageWithId = function(b, c) {
            c = c || a.currentApp.app_id;
            var d, e, f;
            if (b = m(b), c) {
                var g = b.split(".")[0],
                    i = b.split(".")[1];
                if (i) a.hasPermission(b, c) && (d = AVC.Auth2Page[g][i].split("#")[0], f = AVC.Auth2Page[g][i].split("#")[1], e = f ? d + "?appid=" + c + "#" + f : d + "?appid=" + c, h.location.href = e);
                else for (var j = Object.keys(AVC.Auth2Page[g]), k = 0; k < j.length; k++) if (i = j[k], a.hasPermission(g + "." + i, c)) {
                    d = AVC.Auth2Page[g][i].split("#")[0], f = f || AVC.Auth2Page[g][i].split("#")[1], e = f ? d + "?appid=" + c + "#" + f : d + "?appid=" + c, h.location.href = e;
                    break
                }
            }
        }, a.loaduser(), n()
    }]), a.controller("UserCtrl", ["$scope", "$http", "$location", "storageSer", "accountSer", function(a, b, c, d, e) {
        a.env = ENV, a.location = c, a.rootState = {
            pendingRequest: 0
        }, a.activeClass = c.path().substring(1), a.loaduser = function() {
            b.get(purl + "clients/self").success(function(b) {
                a.user = b, a.user.flags && a.user.flags.indexOf("client-email-verified") > -1 && (a.user.flags.emailVerified = !0)
            }).error(function(a) {
                /login.html#\/signup/.test(window.location.href) && window.ga && ga("send", "event", "Login", "VsiteRegistryWithoutSession")
            })
        }, a.signout = function() {
            e.signout().then(function(a) {
                window.location.href = "login.html"
            })
        }, a.hasPendingRequest = function() {
            return b.pendingRequests.length > 0 || a.rootState.pendingRequest > 0
        }, a.loaduser()
    }]), angular.module("ui.gravatar").config(["gravatarServiceProvider", function(a) {
        a.defaults = {
            size: 100,
            "default": "https://leancloud.cn/images/static/default-avatar.png"
        }, a.secure = !0
    }])
}();
var lang_zh_cn = {
    DASHBOARD: "控制台",
    APP_ALL: "所有应用",
    APP_SET: "应用设置",
    APP_KEY_SET: "应用 key",
    APP_PUSH: "推送设置",
    APP_EMAIL: "邮件设置",
    APP_INFO: "应用信息",
    APP_NAME: "应用名称",
    APP_DESC: "应用描述",
    APP_DELETE: "删除应用",
    USER_PASS_MODIFY: "修改密码",
    USER_PASS_PRE: "原密码",
    USER_PASS_NEW: "新密码",
    USER_PASS_CONFIRM: "新密码确认",
    DATA_CLASSES: "所有 class",
    DATA_CLASS_ADDNEW: "创建 Class",
    DATA_CLASS_ADD_TIP: "Class 名称只能包含字母、数字、下划线，必须以字母开头",
    DATA_RESIZE: "隐藏侧栏",
    DATA_ADD_ROW: "添加行",
    DATA_REDUCE_ROW: "删除行",
    DATA_ADD_COLUMN: "添加列",
    DATA_ADD_COLUMN_TITLE: "添加列",
    DATA_ADD_COLUMN_TIP: "只能包含字母、数字、下划线，必须以字母或数字开头",
    DATA_QUERY: "查询",
    DATA_QUERY_CON: "查询条件",
    DATA_RELOAD: "刷新",
    DATA_OTHERS: "其他",
    DATA_DELETE_COLUMN: "删除列",
    DATA_DELETE_ALLROWS: "删除所有数据",
    DATA_DROP_CLASS: "删除 Class",
    DATA_INDEX: "索引",
    DATA_PERMISSIN: "权限设置",
    DATA_INDEX_LIST: "索引列表",
    DATA_INDEX_NAME: "索引名称",
    DATA_INDEX_KEY: "索引键值",
    DATA_INDEX_OPTION: "索引选项",
    DATA_INDEX_DELETE: "删除",
    DATA_INDEX_NEW: "新建索引",
    DATA_INDEX_TYPE: "选择索引类型",
    DATA_INDEX_TYPE_NORMAL: "普通",
    DATA_INDEX_TYPE_UNIQUE: "唯一",
    DATA_INDEX_TYPE_SPARSE: "稀疏",
    DATA_INDEX_COLUMN: "选择索引字段",
    DATA_INDEX_COLUMN_1: "正序",
    "DATA_INDEX_COLUMN_-1": "倒序",
    DATA_INDEX_COLUMN_2d: "2dsphere",
    DATA_INDEX_COLUMN_hash: "哈希",
    DATA_PERMISSION_TITLE: "设置 {{name}}",
    DATA_PERMISSIN_FIELD_TITLE: " {{claName}} -- {{fieldName}} 权限设置 ",
    DATA_PERMISSIN_FIELD_TIP: "设置用户在 {{claName}} 的 {{fieldName}} 字段可以执行的权限。",
    DATA_PERMISSION_TIP_ALL: "所有用户都有此权限",
    DATA_PERMISSION_TIP: "为 {{name}}class 选择你的客户端应用的权限操作类型。",
    DATA_CLASS_DROP_TIP: "确定删除这个 class 并删除里面所有的数据？此操作不可恢复。",
    DATA_DELETE_ALL_ROWS_TIP: "确定删除这个 class 的所有数据？此操作不可恢复。",
    PUSH_SENDTO: "推送目标",
    PUSH_DEVICE: "终端类别",
    PUSH_NO_ACT: "未活跃天数",
    PUSH_SEND_TIME: "推送时间",
    PUSH_EXP_TIME: "推送过期时间",
    PUSH_MSG: "推送内容",
    PUSH_ALL: "所有",
    PUSH_PART: "限定推送条件",
    PUSH_NOW: "现在",
    PUSH_SPECIFIC: "指定时间",
    PUSH_NEVER: "从不",
    PUSH_INTERVAL: "过期间隔时间",
    PUSH_CON: "指定条件",
    PUSH_CON_ADD: "添加条件",
    PUSH_iOS_UPLOAD_TIP: 'iOS 需要先 <a href="app.html?appid={{app.app_id}}#/push">上传</a> Apple SSL Certificate 文件 ',
    PUSH_DEVICE_IOS: "iOS 设备",
    PUSH_DEVICE_ANDROID: "Android 设备",
    PUSH_MORETHAN: "超过",
    PUSH_DAY: "天",
    CLOUD_REPOSITORY: "代码库",
    CLOUD_DEPLOY: "部署",
    CLOUD_LOG: "日志",
    CLOUD_REPOSITORY_HOST: "代码库地址",
    CLOUD_REPOSITORY_CREATE: "创建代码库",
    CLOUD_DOWNLOAD: "下载项目框架",
    CLOUD_DEPLOY_DEV: "部署到开发环境",
    CLOUD_DEV_VERSION: "开发环境版本号",
    CLOUD_DEPLOY_PROD: "部署到生产环境",
    CLOUD_PROD_VERSION: "生产环境版本号",
    CLOUD_REVISION: "版本或分支号",
    CLOUD_ACTION_DEPLOY: "部署",
    APP_ID: "应用 ID",
    APP_KEY: "应用 key",
    APP_PUSH_CERT: "Apple 推送认证",
    APP_PUSH_UPLOADED: "已上传文件",
    APP_PUSH_UPLOAD: "上传文件",
    APP_EMAIL_TEMPLATES: "邮件模板",
    APP_EMAIL_VERIFY_TMPL: "邮件认证模板",
    APP_EMAIL_SUBJECT: "主题",
    APP_EMAIL_CONTENT: "内容",
    APP_EMAIL_PASS_TMPL: "密码重置模板",
    NAV_ANALYTIC: "统计分析",
    NAV_DATA: "数据管理",
    NAV_PUSH: "消息推送",
    NAV_CLOUD: "云引擎",
    NAV_SET: "应用设置",
    NAV_DOC: "文档",
    NAV_SDK: "SDK下载",
    NAV_FORUM: "论坛",
    NAV_INDEX_SOCIAL: "社交组件",
    NAV_INDEX_DATA: "数据存储",
    NAV_INDEX_PUSH: "消息推送",
    NAV_INDEX_CLOUD: "云引擎",
    NAV_DATA_DESC: "通过 SDK 和 Rest API，提供服务端数据解决方案。",
    NAV_PUSH_DESC: "提供 iOS 和 Android 的数据推送服务。",
    NAV_SOCIAL_DESC: "提供方便的社交分享组件，如 QQ 和微博分享。",
    NAV_CLOUD_DESC: "通过编写 Node.js，自定义服务端逻辑。",
    NAV_SUPPORT: "我们目前支持的开发平台",
    ACTION_SAVE: "保存",
    ACTION_DELETE: "删除",
    ACTION_COPY: "复制",
    ACTION_UPLOAD: "上传",
    ACTION_CREATE: "创建",
    ACTION_CREATE_APP: "创建应用",
    ACTION_LOGOUT: "退出",
    ACTION_LOGIN: "登录",
    ACTION_APPLY_ACCOUNT: "申请账号",
    ACTION_CANCEL: "关闭",
    ACTION_QUERY: "查询",
    ACTION_APPLY: "申请",
    OPERATE_TIP: "操作提示",
    TIP_PUSH: "上传后缀名为 .p12 的 Apple SSL Certificate 文件，导出 .p12 文件时不要加密码保护。",
    TIP_VIEW_PUSH: "查看推送文档",
    TIP_FUNCTION: "功能说明",
    TIP_CLOUD_DEPLOY: "可以根据<b>分支</b>或<b>版本号</b>发布特定版本到测试或生产环境中。",
    TIP_FUNCTION_CLOUD_DEPLOY: " 点击<b>部署</b>，会发布相应的<b>分支</b>或<b>版本号</b>到测试或生产环境中。 ",
    TIP_FUNCTION_REPOSITORY: '云引擎可以放在如 <a href="https://github.com/" target="_blank">GitHub</a>、<a href="https://bitbucket.org/" target="_blank">Bitbucket</a> 和 <a href="https://code.csdn.net/" target="_blank">CSDNCode</a> 的代码库。部署的时候提供分支号或版本号，就可以从代码库上发布到开发或生产环境中。',
    TIP_OPERATE_REPOSITORY: " 点击<b>保存</b>，会保存您输入的代码库地址。",
    FORM_EMAIL: "邮箱",
    FORM_PASS: "密码",
    FORM_FORGOTPASS: "忘记密码",
    FORM_REGISTRY: "注册",
    FORM_USER_NAME: "用户名",
    FORM_CAPTCHA: "验证码",
    FORM_CAPTCHA_CHANGE: "换一个",
    FORM_COMPANY: "公司",
    FORM_POSITION: "职位",
    FORM_PROJECT: "项目信息",
    FORM_FIND_PASS: "找回密码",
    STAT_BAR: "柱状图",
    STAT_LINE: "线性图",
    PAGE_PRE: "&larr; 前一页",
    PAGE_NEXT: "后一页 &rarr;"
};
angular.module("ngLocale", [], ["$provide", function(a) {
    var b = {
        ZERO: "zero",
        ONE: "one",
        TWO: "two",
        FEW: "few",
        MANY: "many",
        OTHER: "other"
    };
    a.value("$locale", {
        DATETIME_FORMATS: {
            AMPMS: ["上午", "下午"],
            DAY: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            MONTH: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            SHORTDAY: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            SHORTMONTH: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            fullDate: "y年M月d日EEEE",
            longDate: "y年M月d日",
            medium: "yyyy-M-d ah:mm:ss",
            mediumDate: "yyyy-M-d",
            mediumTime: "ah:mm:ss",
            "short": "yy-M-d ah:mm",
            shortDate: "yy-M-d",
            shortTime: "ah:mm"
        },
        NUMBER_FORMATS: {
            CURRENCY_SYM: "¥",
            DECIMAL_SEP: ".",
            GROUP_SEP: ",",
            PATTERNS: [{
                gSize: 3,
                lgSize: 3,
                macFrac: 0,
                maxFrac: 3,
                minFrac: 0,
                minInt: 1,
                negPre: "-",
                negSuf: "",
                posPre: "",
                posSuf: ""
            }, {
                gSize: 3,
                lgSize: 3,
                macFrac: 0,
                maxFrac: 2,
                minFrac: 2,
                minInt: 1,
                negPre: "(¤",
                negSuf: ")",
                posPre: "¤",
                posSuf: ""
            }]
        },
        id: "zh-cn",
        pluralCat: function(a) {
            return b.OTHER
        }
    })
}]), angular.module("locales", ["pascalprecht.translate"], ["$translateProvider", function(a) {
    a.translations("zh_CN", lang_zh_cn), a.preferredLanguage("zh_CN")
}]), angular.module("dashBoard.storageSer", []).factory("storageSer", ["$window", function(a) {
    function b(b) {
        var c = a.localStorage.getItem(b);
        return /^\{/.test(c) && /\}$/.test(c) && (c = JSON.parse(c)), c
    }
    function c(b, c) {
        return "object" == typeof c && (c = JSON.stringify(c)), a.localStorage.setItem(b, c)
    }
    function d(b) {
        a.localStorage.removeItem(b)
    }
    return {
        item: function(a, d) {
            switch (arguments.length) {
                case 1:
                    return b(a);
                case 2:
                    return c(a, d)
            }
        },
        remove: function(a) {
            d(a)
        },
        removeAll: function() {
            var a = ["notification-count"];
            $.each(a, function(a, b) {
                d(b)
            })
        }
    }
}]), angular.module("dashBoard.configSer", []).factory("configSer", ["$rootScope", "$location", function(a, b) {
    return {
        apiUrl: "/1",
        httpTimeout: 1e4
    }
}]), angular.module("dashBoard").directive("uiSwitch", function() {
    var a = '<div class="switch-wrap"><span class="switch-input"></span><span class="switch-label" data-on="On" data-off="Off"></span><span class="switch-handle"></span></div>';
    return {
        restrict: "E",
        template: a,
        scope: !0,
        replace: !0,
        require: "?ngModel",
        controller: ["$scope", function(a) {}],
        link: function(a, b, c, d) {
            d.$render = function() {
                b.toggleClass("on", d.$viewValue)
            }, b.on("click", function() {
                b.toggleClass("on"), a.$apply(function() {
                    d.$setViewValue(!d.$viewValue)
                })
            })
        }
    }
}), window.appMod = angular.module("appMod", ["dashBoard", "dataMod.service", "appSettingMod"]), window.appSetMod = angular.module("appSetMod", ["appMod"]), appSetMod.config(["$routeProvider", function(a) {
    a.when("/general", {
        templateUrl: "views/setting/general-set.html"
    }).when("/key", {
        templateUrl: "views/app-key-set.html",
        controller: "AppKeyCtrl"
    }).when("/security", {
        templateUrl: "views/setting/security.html",
        controller: "securityCtrl"
    }).when("/email", {
        templateUrl: "views/app-email-set.html",
        controller: "AppEmailCtrl"
    }).when("/export", {
        templateUrl: "views/app-export-data.html",
        controller: "ExportDataCtrl"
    }).when("/team", {
        templateUrl: "views/app-team-set.html",
        controller: "CooperatorCtrl"
    }).when("/permission", {
        templateUrl: "views/app-permission-set.html",
        controller: "AppGeneralConfigCtrl"
    }).otherwise({
        redirectTo: "/general"
    })
}]), appMod.controller("AppCtrl", ["$scope", "$http", "$location", "filterFilter", "apps", "App", "AppModel", "$rootScope", "Cooperator", "$timeout", "$window", function(a, b, c, d, e, f, g, h, i, j, k) {
    function l(b) {
        a.openappfile = "/node/apps/" + a.app.app_id, a.appopen.name || (a.appopen.name = a.app.app_name), a.appopen.description || (a.appopen.description = a.app.description)
    }
    getParam().appid && (a.apps = e, a.appopen = {}, a.location = c, a.uploadCertDisable = !0, f.then(function(b) {
        h.currentApp = b, a.hasPermission(a.currentHtmlPage, a.currentApp.app_id) || (location.href = "401.html");
        var c = b;
        window.AV && (AV._initialize(c.app_id, c.app_key, c.master_key), AV._useMasterKey = !0)
    }), f.then(function(a) {
        h.app = a, l(a)
    }, function() {
        window.location.href = rootpage
    }), a.pushaction = purl + "clients/self/apps/" + getParam().appid, a.isNotCurrentApp = function(b) {
        return a.currentApp.app_name != b.app_name
    }, a.deleteapp = function() {
        function c() {
            b["delete"](purl + "clients/self/apps/" + a.app.app_id, {
                params: {
                    password: $("#user_password").val()
                }
            }).success(function(a) {
                window.location.href = rootpage
            })
        }
        var d = window.confirm("确定删除此应用？应用删除后不可恢复。点击「取消」可以撤销删除操作");
        d && c()
    }, a.updatehost = function() {
        b.put(purl + "clients/self/apps/" + a.app.app_id, {
            app_domain: a.app.app_domain
        }).success(function(a) {
            showmsg("操作成功")
        })
    }, a.updateapp = function() {
        b.put(purl + "clients/self/apps/" + a.app.app_id, {
            name: a.app.app_name,
            description: a.app.description
        }).success(function(a) {
            showmsg("操作成功")
        })
    }, $(document).on("change", "[name='cert_file']", function() {
        ".p12" == $(this).val().substring($(this).val().length - 4) ? a.$apply(function() {
            a.uploadCertDisable = !1
        }) : a.$apply(function() {
            a.uploadCertDisable = !0
        })
    }), a.loadApp = function() {
        g.get().then(function(b) {
            a.currentApp = a.app = b
        })
    })
}]), appMod.controller("AppKeyCtrl", ["$http", "$scope", "$modal", function(a, b, c) {
    b.appKeys = [{
        type: "app",
        name: "App Key",
        tip: "适用于所有平台",
        keyName: "app_key"
    }, {
        type: "master",
        name: "Master Key",
        tip: "适用于所有平台，并不受权限设定限制",
        keyName: "master_key"
    }], b.editKey = function(a) {
        angular.forEach(b.appKeys, function(c, d) {
            c.type === a && (b.editingKey = c)
        }), c({
            scope: b,
            template: "views/modal/key-reset-modal.html",
            show: !0
        })
    }, b.$on("$viewContentLoaded", function() {
        var a = new ZeroClipboard;
        a.glue($(".copy")), a.on("mousedown", function(b, c) {
            a.setText($(this).parents(".form-group").find("input:text").val())
        }), a.on("complete", function() {
            showmsg("复制成功", 3e3)
        }), a.on("noflash", function() {
            $(".copybtn").parent().addClass("no-flash").parent().addClass("no-flash"), $(".copybtn").hide()
        })
    })
}]), appMod.controller("ApKeyResetCtrl", ["$http", "$scope", function(a, b) {
    b.resetKey = function() {
        a.put(purl + "clients/self/apps/" + getParam().appid + "/resetAppKey", {
            app_key_type: b.editingKey.type,
            password: b.resetPassword
        }).then(function() {
            b.loadApp()
        })
    }
}]), appMod.controller("TransferAppCtrl", ["$http", "$scope", "$timeout", "$window", function(a, b, c, d) {
    b.queryCooperatorsTip = function(c, d) {
        return c && "object" != typeof c && c && "" != c.trim() ? a.get(purl + "clients/find/like", {
            params: {
                type: d,
                name: c
            }
        }).then(function(a) {
            return b.tipCooperators = a.data.results, a.data.results
        }) : void 0
    }, b.transferApp = function() {
        var e;
        angular.forEach(b.tipCooperators, function(a, c) {
            a.name === b.acceptAppUserName && (e = a.id)
        }), e && a.post(purl + "clients/self/apps/" + getParam().appid + "/transfer/" + e, {
            password: b.userPasswordTransfer
        }).success(function() {
            showmsg("应用转让成功，将自动跳转到应用列表页"), c(function() {
                d.location.href = rootpage
            }, 3e3)
        })
    }, b.getCooperatorByName = function(a, c) {
        var d;
        return angular.forEach(b.tipCooperators, function(b, e) {
            b.type == a && b.name == c && (d = b)
        }), d
    }
}]), appMod.controller("AppPublishCtrl", ["$http", "$scope", function(a, b) {
    a.get("/node/apps/" + getParam().appid).success(function(a) {
        $.extend(b.appopen, a)
    }), b.publishapp = function() {
        a.post("/node/apps/" + b.app.app_id, {
            name: b.appopen.name,
            description: b.appopen.description,
            show: b.appopen.show,
            iconImage: b.appopen.iconImage,
            url: b.appopen.url
        }).success(function(a) {
            a.error ? showmsg(a.error, AVC.Error) : showmsg("操作成功")
        }).error(function(a) {})
    }, b.uploadIconresults = function(a, c) {
        if (c && a.length > 0) try {
            b.appopen.icon = JSON.parse(a).icon, showmsg("上传成功")
        } catch (d) {
            showmsg("上传失败", AVC.Error)
        }
    }, b.isValidIcon = function(a) {
        return /\.(jpg|jpeg|png|JPG|PNG)$/.test(a) ? !0 : (showmsg("仅支持PNG或JPG类型的图片", AVC.Error), !1)
    }
}]), appMod.controller("AppGeneralConfigCtrl", ["$scope", "$http", "App", "appSettingSer", function(a, b, c, d) {
    a.appflags = {};
    var e = getParam().appid;
    d.getAppSettingFlag(e).success(function(b) {
        angular.forEach(b, function(b, c) {
            a.appflags[b] = !0
        })
    }), a.updateAppFlag = function(b) {
        var c = {
            flag: b
        };
        a.appflags[b] ? d.updateEnableFlag(e, c).then(function() {
            showmsg("保存成功")
        }) : d.updateDisableFlag(e, c).then(function() {
            showmsg("保存成功")
        })
    }
}]), appMod.controller("AppEmailCtrl", ["$scope", "$http", function(a, b) {
    function c(a) {
        var b = [];
        return b[0] = a.match(/<!-- (.*)-->/)[1], b[1] = a.substring(a.match(/<!-- (.*)-->/)[0].length), b
    }
    b.get(purl + "clients/self/apps/" + getParam().appid + "/emailTemplates").success(function(b) {
        var d = c(b.verify_email_tpl);
        a.verify_email_tpl_subject = d[0], a.verify_email_tpl_body = d[1];
        var d = c(b.reset_password_tpl);
        a.reset_password_tpl_subject = d[0], a.reset_password_tpl_body = d[1], a.verify_email_url = b.verify_email_url, a.reset_password_url = b.reset_password_url, a.send_email_url = b.app_email
    }).error(function() {}), a.setEmailVerify = function() {
        a.emailVerifyEmabled ? b.put(purl + "clients/self/apps/" + getParam().appid + "/enable-flag", {
            flag: "verify-user-emails"
        }).success(function(b) {
            a.emailVerifyEmabled = !0
        }) : b.put(purl + "clients/self/apps/" + getParam().appid + "/disable-flag", {
            flag: "verify-user-emails"
        }).success(function(b) {
            a.emailVerifyEmabled = !1
        })
    }, a.updateTpl = function() {
        b.put(purl + "clients/self/apps/" + getParam().appid + "/emailTemplates", {
            templates: {
                app_email: a.send_email_url,
                verify_email_tpl: "<!-- " + a.verify_email_tpl_subject + " -->" + a.verify_email_tpl_body,
                reset_password_tpl: "<!-- " + a.reset_password_tpl_subject + " -->" + a.reset_password_tpl_body
            }
        }).success(function(a) {
            showmsg("操作成功")
        }).error(function() {})
    }, a.updateVeriyURL = function() {
        b.put(purl + "clients/self/apps/" + getParam().appid + "/emailTemplates", {
            templates: {
                verify_email_url: a.verify_email_url
            }
        }).success(function(a) {
            showmsg("操作成功")
        }).error(function() {})
    }, a.updatePasswordURL = function() {
        b.put(purl + "clients/self/apps/" + getParam().appid + "/emailTemplates", {
            templates: {
                reset_password_url: a.reset_password_url
            }
        }).success(function(a) {
            showmsg("操作成功")
        }).error(function() {})
    }
}]), appMod.controller("ExportDataCtrl", ["$scope", "$http", "SchemaLoader", function(a, b, c) {
    c.fetch().then(function(b) {
        a.clas = b
    }), a["export"] = {
        limit: !0,
        start: moment().subtract("days", 1).format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
        limitClass: !1,
        classes: []
    }, a.exportData = function() {
        var c = {};
        a["export"].limit && (c = {
            from_date: moment(a["export"].start).format("YYYY-MM-DD"),
            to_date: moment(a["export"].end).add("days", 1).format("YYYY-MM-DD")
        }), a["export"].limitClass && (c.classes = a["export"].classes.join(",")), a["export"].limitSchema && (c["only-schema"] = a["export"].limitSchema), b.get(purl + "clients/self/apps/" + getParam().appid + "/export", {
            params: c
        }).success(function(a) {
            showmsg("数据导出成功")
        }).error(function(a) {
            showmsg(a.error, AVC.Error)
        })
    }, a.toggleClass = function(b) {
        var c = a["export"].classes.indexOf(b);
        c > -1 ? a["export"].classes.splice(c, 1) : a["export"].classes.push(b)
    }
}]), angular.module("appMod").controller("CooperatorCtrl", ["$scope", "$http", "Cooperator", function(a, b, c) {
    var d = {};
    angular.forEach(AVC.Auth2Page, function(a, b) {
        d[b] = {}, angular.forEach(a, function(a, c) {
            d[b][c] = !0
        })
    }), a.defaultPermissionConfig = d, a.loadCooperator = function() {
        c.query({
            app_id: getParam().appid
        }, function(b) {
            var c = b.results;
            angular.forEach(c, function(a, b) {
                if ("admin" == a.role) a.roleDesc = "所有权限";
                else {
                    var c = [];
                    angular.forEach(a.modules, function(a, b) {
                        c.push(AVC.AuthDesc[b])
                    }), a.roleDesc = c.join(" ")
                }
            }), a.cooperators = c
        })
    }, a.setCurrent = function(b) {
        angular.forEach(a.cooperators, function(c, d) {
            c.cooperator_id == b && (a.currentCooperator = c)
        })
    }, a.getCooperatorByName = function(b, c) {
        var d;
        return angular.forEach(a.tipCooperators, function(a, e) {
            a.type == b && a.name == c && (d = a)
        }), d
    }, a.queryCooperatorsTip = function(c, d) {
        return c && "" != c.trim() && "object" != typeof c ? b.get(purl + "clients/find/like", {
            params: {
                type: d,
                name: c
            }
        }).then(function(b) {
            return a.tipCooperators = b.data.results, b.data.results
        }) : void 0
    }, a.getOperatorType = function(b) {
        return 0 == a.tipCooperators[b].type ? "个人" : "团队"
    }, a.removeCooperator = function(b, d) {
        var e = new c;
        e.$delete({
            app_id: getParam().appid,
            cooperatorid: b,
            type: d
        }, function(c) {
            for (var d = 0; d < a.cooperators.length; d++) if (a.cooperators[d].cooperator_id == b) {
                a.cooperators.splice(d, 1);
                break
            }
        })
    }, a.loadCooperator()
}]), angular.module("appMod").controller("CooperatorEditCtrl", ["$scope", "$http", "Cooperator", function(a, b, c) {
    a.currentCooperator = a.currentCooperator || {}, a.addCooperator = function(b, d) {
        if (0 == b && d == a.user.username) return void showmsg("不能给当前登录用户本身设置权限", AVC.Error);
        if (a.toAddCooperator = null, angular.forEach(a.tipCooperators, function(c, e) {
            return c.type == b && c.name == d ? void(a.toAddCooperator = c) : void 0
        }), !a.toAddCooperator) return void showmsg("输入的用户名不存在", AVC.Error);
        var e = new c,
            b = 1;
        e.app_id = getParam().appid, e.client_id = a.toAddCooperator.client_id, e.cooperator_id = a.toAddCooperator.id, e.cooperator_type = a.toAddCooperator.type, e.name = a.toAddCooperator.name;
        JSON.parse(JSON.stringify(e));
        e.role = "normal", e.modules = a.currentCooperator.modules, 0 === e.cooperator_type && "all" == a.customUserPermission && (e.modules = a.defaultPermissionConfig), 1 === e.cooperator_type && "all" == a.customTeamPermission && (e.modules = a.defaultPermissionConfig), e.$save(function(b) {
            a.cooperatorName = "", a.cooperatorNameOrg = "", a.loadCooperator()
        })
    }, a.setCooperatorPermission = function() {
        var b = new c;
        b.cooperatorid = a.currentCooperator.cooperator_id;
        b.role = "normal", b.modules = a.currentCooperator.modules, b.$update({
            app_id: getParam().appid,
            type: a.currentCooperator.cooperator_type
        }).then(function() {
            a.loadCooperator()
        })
    }
}]), angular.module("appMod").controller("CooperatorPermissionSelectCtrl", ["$http", "$scope", function(a, b) {
    b.currentCooperator || (b.currentCooperator = {});
    var c = {};
    angular.copy(b.defaultPermissionConfig, c), b.check = {}, "admin" == b.currentCooperator.role ? (b.currentCooperator.modules = {}, angular.forEach(c, function(a, d) {
        b.currentCooperator.modules[d] = {}, angular.forEach(c[d], function(a, c) {
            b.currentCooperator.modules[d][c] = !0
        })
    })) : b.currentCooperator.modules ? angular.forEach(b.currentCooperator.modules, function(a, d) {
        a === !0 && (b.currentCooperator.modules[d] = {}, angular.forEach(c[d], function(a, c) {
            b.currentCooperator.modules[d][c] = !0
        }))
    }) : b.currentCooperator.modules = c, b.toggle = function(a) {
        angular.forEach(b.currentCooperator.modules[a], function(c, d) {
            c || (allSelect = !1), b.currentCooperator.modules[a][d] = b.check[a]
        })
    }, b.$watch("currentCooperator.modules", function() {
        b.currentCooperator && angular.forEach(b.currentCooperator.modules, function(a, c) {
            b.check[c] = !0, angular.forEach(a, function(a, d) {
                b.currentCooperator.modules[c][d] === !1 && (b.check[c] = !1)
            })
        })
    }, !0)
}]), angular.module("appMod").controller("securityCtrl", ["$scope", "appSettingSer", "$window", "$timeout", "App", "opLogSer", "Cooperator", function(a, b, c, d, e, f, g) {
    function h(a) {
        return $.each(a, function(a, b) {
            b.uiTime = c.moment(b.loggedAt).format("YYYY-MM-DD HH:MM:SS"), b.uiOpUser = b.opName || i(b.clientId) || "clientId:" + b.clientId
        }), a
    }
    function i(a) {
        var b = "";
        return $.each(m, function(c, d) {
            return String(d.cooperator_id) === a ? (b = d.name, !1) : void 0
        }), b
    }
    var j = c.showmsg,
        k = c.getParam().appid,
        l = "";
    a.securityFlag = {
        storage: !0,
        sms: !0,
        push: !0,
        realtime: !0
    }, a.whiteDomains = "", a.opLogList = [], a.opLogStart = Date.now() - 864e7, a.opLogEnd = Date.now(), a.opLogPage = {
        currentPage: 1,
        pageSize: 10,
        cuont: 0
    };
    var m = [];
    b.getSecurityFlag(k).then(function(b) {
        a.securityFlag = b
    });
    var n = function(a, c, d) {
        b.updateSecurityFlag(a, c, d).then(function() {
            j(d ? "服务已开启" : "服务已关闭")
        })
    };
    d(function() {
        a.$watch("securityFlag.storage", function(a, b) {
            a !== b && n(k, "storage", a)
        }), a.$watch("securityFlag.sms", function(a, b) {
            a !== b && n(k, "sms", a)
        }), a.$watch("securityFlag.push", function(a, b) {
            a !== b && n(k, "push", a)
        }), a.$watch("securityFlag.realtime", function(a, b) {
            a !== b && n(k, "realtime", a)
        })
    }, 1e3), e.then(function(b) {
        l = b.master_key, b.api_white_domains && (a.whiteDomains = b.api_white_domains.join("\n"))
    }), a.updateWhiteDomains = function() {
        var c = a.whiteDomains.replace(/\n/g, ",");
        b.updateWhiteDomains(k, c).then(function() {
            j("保存成功")
        })
    }, a.searchOpLog = function(b, c) {
        b = b || a.opLogStart, c = c || a.opLogEnd, f.getOpLog(k, l, {
            start: new Date(b).valueOf(),
            end: new Date(c).valueOf(),
            skip: (a.opLogPage.currentPage - 1) * a.opLogPage.pageSize,
            limit: a.opLogPage.pageSize
        }).success(function(b) {
            a.opLogList = h(b.result), a.opLogPage.count = b.count
        })
    }, g.query({
        app_id: k
    }, function(b) {
        m = b.results, a.$watchCollection("[opLogPage.currentPage, opLogPage.pageSize]", function(b, c) {
            a.searchOpLog()
        })
    })
}]), angular.module("appSettingMod", ["appMod"]).factory("appSettingSer", ["$rootScope", "$http", "$q", "$window", function(a, b, c, d) {
    var e = d.purl,
        f = {
            "disable-data-storage": !1,
            "verify-user-phone": !1,
            "allow-verify-sms-code-api": !1,
            "disable-push-notification": !1,
            "disable-realtime": !1
        };
    return {
        getAppSettingFlag: function(a) {
            return b.get(e + "clients/self/apps/" + a + "/flags")
        },
        updateEnableFlag: function(a, c) {
            return "string" == typeof c && (c = {
                flag: c
            }), b.put(e + "clients/self/apps/" + a + "/enable-flag", c)
        },
        updateDisableFlag: function(a, c) {
            return "string" == typeof c && (c = {
                flag: c
            }), b.put(e + "clients/self/apps/" + a + "/disable-flag", c)
        },
        getSecurityFlag: function(a) {
            var b = c.defer();
            return this.getAppSettingFlag(a).success(function(a) {
                for (var c in f) angular.forEach(a, function(a) {
                    return c === a ? void(f[c] = !0) : void 0
                });
                var d = {
                    storage: !f["disable-data-storage"],
                    sms: f["verify-user-phone"] || f["allow-verify-sms-code-api"],
                    push: !f["disable-push-notification"],
                    realtime: !f["disable-realtime"]
                };
                b.resolve(d)
            }), b.promise
        },
        updateSecurityFlag: function(a, b, c) {
            var d = this;
            switch (b) {
                case "storage":
                    return c ? this.updateDisableFlag(a, "disable-data-storage") : this.updateEnableFlag(a, "disable-data-storage");
                case "sms":
                    return c ? this.updateEnableFlag(a, "verify-user-phone").then(function() {
                        return d.updateEnableFlag(a, "allow-verify-sms-code-api")
                    }) : this.updateDisableFlag(a, "verify-user-phone").then(function() {
                        return d.updateDisableFlag(a, "allow-verify-sms-code-api")
                    });
                case "push":
                    return c ? this.updateDisableFlag(a, "disable-push-notification") : this.updateEnableFlag(a, "disable-push-notification");
                case "realtime":
                    return c ? this.updateDisableFlag(a, "disable-realtime") : this.updateEnableFlag(a, "disable-realtime")
            }
        },
        updateWhiteDomains: function(a, c) {
            return b.put(e + "clients/self/apps/" + a, {
                api_white_domains: c
            })
        }
    }
}]), angular.module("appSettingMod").factory("opLogSer", ["$rootScope", "$http", "$q", "$window", function(a, b, c, d) {
    var e = "https://nightswatch.avosapps.com";
    return "us.leancloud.cn" === document.domain && (e = "https://nightswatch.avosapps.us"), {
        getOpLog: function(a, c, d) {
            return b({
                method: "get",
                url: e + "/1/operation/app/" + a,
                params: {
                    startedAt: d.start,
                    endedAt: d.end,
                    limit: d.limit,
                    skip: d.skip
                },
                headers: {
                    "X-LeanCloud-Application-Id": a,
                    "X-LeanCloud-Master-Key": c
                }
            })
        },
        getUserLog: function(a, c) {
            return b.get(e + "/1/operation/client/" + a + "?startedAt=" + c.start + "&endedAt=" + c.end)
        }
    }
}]), angular.module("wallMod", ["dashBoard"]), angular.module("wallMod").controller("WallCtrl", ["$scope", "$http", function(a, b) {
    a.wall_current = 0, a.wall_perpage = 10, a.wall_next = !0, a.prewallDisabled = function() {
        return a.wall_current <= 0
    }, a.preWall = function() {
        0 != a.wall_current && (a.wall_current--, a.loadOpenApps())
    }, a.nextWall = function() {
        a.wall_current++, a.loadOpenApps()
    }, a.loadOpenApps = function(c) {
        c = c || a.wall_current * a.wall_perpage, b.get("/node/apps", {
            params: {
                skip: c
            }
        }).success(function(b) {
            a.openapps = b.results, a.openapps.length < a.wall_perpage && (a.wall_next = !1)
        })
    }, a.loadOpenApps()
}]), angular.module("searchMod", ["dashBoard"]), angular.module("searchMod").controller("SearchCtrl", ["$scope", "$http", function(a, b) {
    a.searcht = {}, getParam().q && (a.searcht.keyword = decodeURIComponent(getParam().q).replace(/\+/g, " "));
    var c = "/search/select/?hl=true&fl=url,title&hl.fl=title,content&start=0&limit=50&wt=json&hl.alternateField=content&hl.maxAlternateFieldLength=250";
    $(".search-query").keyup(function(b) {
        13 == b.keyCode && a.pageReload()
    }), a.pageReload = function() {
        window.location.href = "search.html?q=" + a.searcht.keyword
    }, a.search = function() {
        b.get(c, {
            params: {
                q: a.searcht.keyword
            }
        }).success(function(b) {
            a.searchResults = b.response.docs;
            var c = b.highlighting;
            a.searchResults.forEach(function(a) {
                a.content = c[a.url].content[0]
            }), $.isEmptyObject(a.searchResults) && (a.nosearch = !0)
        })
    }, a.searcht.keyword && a.search()
}]), angular.module("featureMod", ["dashBoard"]), angular.module("featureMod").config(["$routeProvider", "$locationProvider", function(a, b) {
    b.html5Mode(!0), a.when("/features/storage.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-storage.html"
    }).when("/features/push.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-push.html"
    }).when("/features/message.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-message.html"
    }).when("/features/analytics.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-analytic.html"
    }).when("/features/modules.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-modules.html"
    }).when("/features/social.html", {
        controller: "FeaturesCtrl",
        templateUrl: "/views/feature-social.html"
    }).otherwise({
        redirectTo: "/features/storage.html"
    })
}]).run(["$rootScope", "$location", function(a, b) {
    a.$on("$routeChangeStart", function() {
        a.ngViewClass = ""
    }), a.$on("$routeChangeSuccess", function(c, d) {
        var e = b.path().replace(/\//gi, "-").replace(".html", "").replace("-", "");
        a.bodyClass = "body-" + e, a.backgroundClass = e, a.ngViewClass = "feature-active"
    })
}]), angular.module("featureMod").controller("FeaturePageCtrl", ["$scope", "$location", function(a, b) {
    a.changePath = function(a) {
        b.path(a)
    }, a.location = b
}]), angular.module("featureMod").controller("FeaturesCtrl", ["$scope", "$route", "$location", "$rootScope", function(a, b, c, d) {
    !
        function() {
            $("pre").addClass("prettyprint"), prettyPrint()
        }(), a.ngViewActive = ".feature-active", $(function() {
        $(".tab-container").easytabs({
            animate: !0,
            animationSpeed: 160,
            panelActiveClass: "active-content-div",
            tabActiveClass: "active",
            tabs: ".feature-section-control-nav > li",
            updateHash: !0
        }).bind("easytabs:after", function() {
            $(window).resize()
        })
    })
}]);
var appListMod = angular.module("appListMod", ["appMod"]);
appListMod.config(["$routeProvider", function(a) {
    a.when("/newapp", {
        templateUrl: "/newapp.html",
        controller: "MainCtrl"
    }).when("/apps", {
        templateUrl: "views/apps.html",
        controller: "MainCtrl"
    }).otherwise({
        redirectTo: "/apps"
    })
}]), appListMod.controller("MainCtrl", ["$http", "$scope", "$location", "apps", function(a, b, c, d) {
    b.createDisabled = !1, b.apps = d, b.newapp = function() {
        b.createDisabled = !0;
        var e = {
            name: b.appname
        };
        b.createByExist && b.byAppId && (e.src_app_id = b.byAppId), a.post(purl + "clients/self/apps", e).success(function(a) {
            d.loadall(), c.path("/apps")
        }).error(function(a) {
            b.createDisabled = !1
        })
    }, b.getAppNumStr = function(a) {
        return a >= 1e9 ? (a / 1e9).toFixed(1).replace(/\.0$/, "") + "b" : a >= 1e6 ? (a / 1e6).toFixed(1).replace(/\.0$/, "") + "m" : a >= 1e3 ? (a / 1e3).toFixed(1).replace(/\.0$/, "") + "k" : a
    };
    var e = [];
    b.$watch("appSearch", function(a) {
        if (e.length || $.each(d.all, function(a, b) {
            e.push(b)
        }), a) {
            var c = [];
            $.each(e, function(b, d) {
                d.app_name.toLowerCase().indexOf(a.toLowerCase()) > -1 && c.push(d)
            }), b.apps.all = c
        } else b.apps.all = e
    })
}]), $(function() {
    $(".create-app-btn").tooltip()
});
var cloudMod = angular.module("cloudMod", ["appMod", "dataMod.service"]);
cloudMod.config(["$routeProvider", function(a) {
    a.when("/conf", {
        templateUrl: "views/cloud-conf.html"
    }).when("/deploy", {
        templateUrl: "views/app-cloud-deploy.html",
        controller: "DeployCtrl"
    }).when("/task", {
        templateUrl: "views/app-cloud-task.html",
        controller: "CloudTaskCtrl"
    }).when("/log", {
        templateUrl: "views/app-cloud-log.html",
        controller: "LogCtrl"
    }).when("/console", {
        templateUrl: "views/cloud-console.html",
        controller: "ConsoleCtrl"
    }).when("/online", {
        templateUrl: "views/cloud-online.html",
        controller: "CloudOnlineCtrl"
    }).when("/stat", {
        templateUrl: "views/cloud-stat.html",
        controller: "CloudStatCtrl"
    }).when("/cache", {
        templateUrl: "views/cloud-cache-list.html",
        controller: "LeanCacheCtrl"
    }).when("/cache/:id", {
        templateUrl: "views/cloud-cache-create.html",
        controller: "LeanCachePayCtrl"
    }).otherwise({
        redirectTo: "/online"
    })
}]), cloudMod.controller("CloudCtrl", ["$scope", "$http", "$location", "filterFilter", "apps", "App", function(a, b, c, d, e, f) {
    a.apps = e, a.deleteCloud = function() {
        b["delete"](purl + "clients/self/apps/" + a.app.app_id + "/cloudProject").success(function() {})
    }
}]), cloudMod.controller("RepositoryCtrl", ["$scope", "$http", "App", function(a, b, c) {
    if ($("#deploy_key_copy").length) {
        var d = new ZeroClipboard;
        d.glue(document.getElementById("deploy_key_copy")), d.on("mousedown", function(a, b) {
            d.setText($("#deploy_key").val())
        }), d.on("complete", function() {
            showmsg("复制成功", 3e3)
        }), d.on("noflash", function() {
            $(".copybtn").parent().addClass("no-flash"), $(".copybtn").hide()
        })
    }
    c.then(function(c) {
        a.projectURL = purl + "functions/skeleton?appId=" + a.currentApp.app_id + "&appKey=" + a.currentApp.master_key, a.projectWeb = a.projectURL + "&webHosting=true", a.btnname = a.currentApp.cloud_project_remote ? "update" : "create", a.cloud_project_remote = a.currentApp.cloud_project_remote, a.cloud_project_ssh_key = a.currentApp.cloud_project_ssh_key, b.get(purl + "functions/deployKey?appId=" + c.app_id + "&appKey=" + a.currentApp.master_key).success(function(b) {
            b.deployKey = $.trim(b.deployKey), /cloud code deploy key\s*$/.test(b.deployKey) && b.deployKey.length > 76 && (b.deployKey = b.deployKey.substring(0, b.deployKey.length - 76)), a.deployKey = b.deployKey
        })
    }), a.updateCloud = function() {
        a.cloud_project_ssh_key = "", b.put(purl + "clients/self/apps/" + a.app.app_id, {
            cloud_project_remote: a.cloud_project_remote,
            cloud_project_ssh_key: a.cloud_project_ssh_key
        }).success(function(b) {
            showmsg("操作成功"), a.loadApp()
        })
    }, a.createGitlab = function() {
        b.post(purl + "clients/self/apps/" + a.app.app_id + "/cloudProject").success(function(b) {
            a.cloud_project_remote = b.cloud_project_remote, a.currentApp.cloud_project_remote = b.cloud_project_remote
        })
    }
}]), cloudMod.controller("DeployCtrl", ["$scope", "$http", "App", "AppModel", function(a, b, c, d) {
    function e() {
        b({
            method: "get",
            url: cloudURL + "functions/status",
            headers: {
                "x-uluru-application-id": a.currentApp.app_id,
                "x-uluru-application-key": a.currentApp.master_key
            }
        }).success(function(b) {
            a.devVersion = b.dev, a.prodVersion = b.prod, a.devCommitLog = b.devLog, a.prodCommitLog = b.prodLog
        })
    }
    a.upgradeCloud = function() {
        b({
            method: "put",
            url: cloudURL + "functions/upgrade",
            headers: {
                "x-uluru-application-id": a.currentApp.app_id,
                "x-uluru-application-key": a.currentApp.master_key
            }
        }).success(function(b) {
            a.devVersion = b.dev, a.prodVersion = b.prod, a.devCommitLog = b.devLog, a.prodCommitLog = b.prodLog, d.get().then(function(b) {
                a.currentApp = b
            }), showmsg("升级云引擎成功")
        })
    }, a.deploy = function() {
        b({
            method: "put",
            url: cloudURL + "functions/publishFunctions",
            headers: {
                "x-uluru-application-id": a.currentApp.app_id,
                "x-uluru-application-key": a.currentApp.master_key
            }
        }).success(function(b) {
            a.devVersion = b.dev, a.prodVersion = b.prod, a.devCommitLog = b.devLog, a.prodCommitLog = b.prodLog, showmsg("部署成功")
        })
    }, a.deployDev = function() {
        var c = a.currentApp.cloud_project_remote,
            d = "master";
        $.trim(a.publishV) && (d = a.publishV), b({
            method: "post",
            url: cloudURL + "functions",
            headers: {
                "x-uluru-application-id": a.currentApp.app_id,
                "x-uluru-application-key": a.currentApp.master_key
            },
            data: {
                repository: {
                    url: c
                },
                after: d
            }
        }).success(function(b) {
            a.devVersion = b.dev, a.prodVersion = b.prod, a.devCommitLog = b.devLog, a.prodCommitLog = b.prodLog, showmsg("部署成功")
        })
    }, a.undeploy = function() {
        var c = window.confirm("确定清除当前的云引擎部署？");
        c && b({
            method: "post",
            url: cloudURL + "functions/undeploy/repo",
            headers: {
                "x-uluru-application-id": a.currentApp.app_id,
                "x-uluru-application-key": a.currentApp.master_key
            }
        }).success(function(b) {
            a.devVersion = "undeployed", a.prodVersion = "undeployed", showmsg("清除部署成功")
        })
    }, c.then(function(a) {
        e()
    })
}]), cloudMod.controller("LogCtrl", ["$scope", "$http", "filterFilter", "App", "$timeout", function(a, b, c, d, e) {
    function f(c) {
        var d, e = {
            limit: i
        };
        return JSON.stringify(f.logcond) === JSON.stringify(a.logcond) ? c && "pre" === c ? (d = $("#log-container").find(".log-item:first").data("createdAt"), d && (e.max = d)) : (d = $("#log-container").find(".log-item:last").data("createdAt"), d && (e.since = d)) : (clearTimeout(g.interval), $("#log-content").empty()), e.production = parseInt(a.logcond.prod), "all" !== a.logcond.level && (e.level = a.logcond.level), b.get(j, {
            params: e,
            headers: getApiRequestHeader(a.currentApp.app_id, a.currentApp.app_key)
        }).then(function(b) {
            if (b = JSON.parse(JSON.stringify(b.data.reverse())), angular.forEach(b, function(a, b) {
                a.timeDisplay = moment(a.time).format("YYYY-MM-DD HH:mm:ss")
            }), c && "pre" === c) {
                $("#log-item-tmpl").tmpl(b).prependTo("#log-content");
                var d = 0;
                $(".log-item").each(function(a, c) {
                    a < b.length && (d += $(c).height())
                }), $("#log-container").scrollTop(d), b.length < 1 && $("#load-more-log").text("没有更早日志")
            } else $("#log-item-tmpl").tmpl(b).appendTo("#log-content");
            var e = $("#log-container .log-item").length;
            e > h && location.reload(), b.length && a.logControl.autoScroll && !c && $("#log-container").animate({
                scrollTop: $("#log-container")[0].scrollHeight
            }, 1e3), $.extend(f.logcond, a.logcond)
        })
    }
    function g() {
        return clearTimeout(g.interval), f().then(function(a) {
            g.interval = setTimeout(g, 5e3)
        })
    }
    a.logcond = {
        prod: 1,
        level: "all"
    }, a.logControl = {}, a.logControl.autoScroll = !0;
    var h = 2e4,
        i = 100;
    f.logcond = {};
    var j = "1.1/tables/EngineLogs";
    a.getLog = f, d.then(function(b) {
        a.$watch("[logcond,logControl.autoScroll]", function() {
            a.logControl.autoScroll ? g() : (clearTimeout(g.interval), f())
        }, !0), $("#log-container").scroll(function() {
            0 === $("#log-container").scrollTop() && $(".log-item").length && f("pre")
        })
    }), a.$on("$destroy", function() {
        clearTimeout(g.interval)
    }), $(".timestamp-toggle").on("click", function() {
        var a = $(".log-container-wrap");
        a.toggleClass("no-timestamp")
    })
}]), cloudMod.controller("CloudTaskCtrl", ["$http", "$scope", function(a, b) {
    var c = purl + "clients/self/apps/" + getParam().appid + "/timers";
    b.task = {
        prod: 1,
        crontype: 1
    }, b.create = function() {
        b.task = {
            prod: 1,
            crontype: 1
        }
    }, b.save = function() {
        b.task.prod = parseInt(b.task.prod), 2 == b.task.crontype && (b.task.cron = "interval:" + b.task.interval), b.task.id ? a.put(c + "/" + b.task.id, b.task).success(function(a) {
            $("#cloud-task-create").modal("hide"), b.list()
        }) : a.post(c, b.task).success(function(a) {
            $("#cloud-task-create").modal("hide"), b.task = {
                prod: 1,
                crontype: 1
            }, b.list()
        })
    }, b.loadFunctions = function() {
        a.get(appurl + "/cloudFunctions", {
            params: {
                prod: b.task.prod
            }
        }).success(function(a) {
            b.cloudFunctions = a.results
        })
    }, b.list = function() {
        a.get(c).success(function(a) {
            b.tasks = a.results
        })
    }, b.updateState = function(d, e) {
        a.post(c + "/" + d + "/" + e), b.list()
    }, b["delete"] = function(d) {
        a["delete"](c + "/" + d).success(function(a) {
            b.list()
        })
    }, b.setCurrentTask = function(a) {
        b.task = a, /^interval:\d+$/.test(b.task.cron) ? (b.task.crontype = 2, b.task.interval = parseInt(b.task.cron.split(":")[1])) : b.task.crontype = 1
    }, b.list(), b.loadFunctions(), b.$watch("task.prod", b.loadFunctions)
}]), cloudMod.controller("ConsoleCtrl", ["$http", "$scope", function(a, b) {
    var c = ace.edit("form-console-content");
    c.setTheme("ace/theme/textmate"), c.getSession().setMode("ace/mode/javascript"), c.setOptions({
        maxLines: 20,
        minLines: 10
    }), b.codeResult = {
        value: null,
        error: null,
        valueType: ""
    };
    var d = "CLOUD-RECENT-CODE";
    if (b.recentCodes = [], localStorage[d]) try {
        b.recentCodes = JSON.parse(localStorage[d])
    } catch (e) {
        b.recentCodes = []
    }
    b.codeRun = function() {
        a({
            url: purl + "functions/script",
            method: "post",
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.app_key),
            data: {
                script: c.getValue()
            }
        }).success(function(a) {
            if (a.error || -1 != b.recentCodes.indexOf(c.getValue()) || (b.recentCodes.unshift(c.getValue()), b.recentCodes.length > 5 && b.recentCodes.splice(5), localStorage[d] = JSON.stringify(b.recentCodes)), b.codeResult = {
                value: null,
                error: null,
                valueType: ""
            }, a.error) b.codeResult.error = a.error;
            else {
                var e = a.result;
                "undefined" == typeof e ? (b.codeResult.value = "undefined", b.codeResult.valueType = "undefined") : "string" == typeof e ? (b.codeResult.value = '"' + e + '"', b.codeResult.valueType = "string") : "array" == typeof e || "object" == typeof e ? b.codeResult.value = JSON.stringify(e) : b.codeResult.value = e
            }
        })
    }, b.codeReset = function() {
        a({
            url: "https://cn-stg1.leancloud.cn/1/functions/context/reset",
            method: "post",
            headers: {
                "X-AVOSCloud-Application-Id": "cqvid84b63ncn7tdwkcn2x4a15ij9j11v25vqn88tnxzdjt8",
                "X-AVOSCloud-Application-Key": "6b7fgzd92ljo6wgmxtmbc9ya292vuueufnt1xzy8c7nueiok"
            }
        }).success(function(a) {
            b.codeResult.value = "重置云引擎环境成功，所有在控制台执行的代码都会被移除"
        })
    }, b.removeRecentCode = function(a) {
        b.recentCodes.splice(b.recentCodes.indexOf(a), 1), localStorage[d] = JSON.stringify(b.recentCodes)
    }, b.setEditorContent = function(a) {
        c.setValue(a)
    }
}]), cloudMod.controller("CloudStatCtrl", ["$http", "$scope", "App", function(a, b, c) {
    function d(a) {
        var c = {
            url: purl + "functions/stats/" + a,
            method: "get",
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
        };
        return c
    }
    function e(c, e) {
        var f = getChartOption();
        if (f.chart.type = "area", f.plotOptions = {
            series: {
                animation: {
                    duration: 1500
                },
                showInLegend: !0
            }
        }, f.tooltip.formatter = function() {
            return this.x + " : " + Math.floor(100 * this.y) + "%"
        }, b.statItem) {
            var g = b.statItem;
            f.tooltip.formatter = function() {
                return "memoryRss" == g ? this.x + " : " + Math.floor(this.y / 1024) + " MB" : "cpu" == g ? this.x + " : " + Math.floor(this.y) + "%" : this.x + " : " + this.y
            };
            var h = d(b.statItem);
            h.params = {}, c && (h.params.start_date = moment(c).format("YYYY-MM-DD")), e && (h.params.end_date = moment(e).format("YYYY-MM-DD")), a(h).success(function(a) {
                f.xAxis.categories = a.dates, f.xAxis.tickInterval = Math.round(f.xAxis.categories.length / 6), f.series = a.stats, "memoryRss" == g && (f.yAxis.labels = {
                    formatter: function() {
                        return Math.floor(this.value / 1014) + " MB"
                    }
                }), window.chart = $("#chart-container").highcharts(f)
            })
        }
    }
    b.cloudStatCondition = "hour", b.startDate = moment().toDate(), b.endDate = moment().toDate(), b.statItem = "functionsPv", b.loadByDate = function(a, c) {
        b.startDate = a, b.endDate = c, b.cloudStatCondition = "day", e(a, c)
    }, b.loadRecent = function() {
        b.cloudStatCondition = "hour", e()
    }, b.loadCurrent = function() {
        "day" == b.cloudStatCondition ? b.loadByDate(b.startDate, b.endDate) : b.loadRecent()
    }, c.then(function() {
        b.$watch("statItem", function() {
            b.loadCurrent()
        })
    })
}]), cloudMod.controller("CloudOnlineCtrl", ["$http", "$scope", "App", "SchemaLoader", "$modal", function(a, b, c, d, e) {
    var f = "/1.1/functions/_CloudCodeSnippets";
    b.funcDef = {
        type: "func"
    }, b.claHooks = ["beforeSave", "afterSave", "afterUpdate", "beforeDelete", "afterDelete"], b.verifyHooks = ["onVerified"], b.directHooks = ["onLogin"], b.realtimeHooks = ["_messageReceived", "_receiversOffline", "_conversationStart", "_conversationAdd", "_conversationRemove"], b.hookTypes = [].concat(b.claHooks, b.verifyHooks, b.directHooks, b.realtimeHooks), b.list = function() {
        a.get(f, {
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
        }).success(function(a) {
            angular.forEach(a, function(a, b) {
                a.typeDisplay = a.type, "func" == a.type && (a.typeDisplay = "function"), "global" == a.type && (a.name = "Global Context"), angular.forEach(a.current, function(b, c) {
                    0 == b.prod && $.extend(a, b)
                })
            }), b.funcs = a
        })
    }, b.save = function() {
        b.saveDisabled = !0;
        var c = f,
            d = {
                context: g.getValue(),
                comment: b.funcDef.comment,
                type: b.funcDef.type
            };
        d.name = b.funcDef.name, "hook" == b.funcDef.type && (b.realtimeHooks.indexOf(b.funcDef.action) > -1 ? (d.type = "func", d.name = b.funcDef.action) : d.action = b.funcDef.action);
        var e = "post";
        b.funcDef.id && (e = "put", c += "/" + b.funcDef.id), a({
            url: c,
            method: e,
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key),
            data: d
        }).success(function(a) {
            a.id && (b.funcDef.id = a.id), showmsg("已更新到预备环境中"), b.list()
        })["finally"](function() {
            b.saveDisabled = !1
        })
    }, b.setCurrent = function(a) {
        b.funcDef = a
    };
    var g;
    b.edit = function(a) {
        b.setCurrent(a), b.saveDisabled = !1;
        var c = e({
            scope: b,
            template: "views/modal/cloud-online-modal.html",
            show: !0,
            backdrop: "static"
        });
        c.$scope.$on("modal.show", function() {
            function a(a, b, c, d) {
                b = b || 0, c = c || 0, d = d || 1 / 0, a.each(function() {
                    function a() {
                        setTimeout(function() {
                            g.html(e.val().replace(/ /g, "&nbsp"));
                            var a = Math.min(d, g.width() + b);
                            d > a && e.scrollLeft(0), e.val() ? $(e).css("min-width", "") : $(e).css("min-width", c + "px"), e.width(a)
                        }, 0)
                    }
                    var e = $(this),
                        f = btoa(Math.floor(Math.random() * Math.pow(2, 64))),
                        g = $('<span id="' + f + '">' + e.val() + "</span>").css({
                            display: "none",
                            "font-family": e.css("font-family"),
                            "font-size": "96%"
                        }).appendTo("body");
                    a(), e.keydown(a)
                })
            }
            g = ace.edit("form-console-content"), g.setTheme("ace/theme/textmate"), g.getSession().setMode("ace/mode/javascript"), g.setOptions({
                maxLines: 30,
                minLines: 10
            }), a($(".cc-func-input"), 0, 66, 500)
        })
    }, b.create = function() {
        b.edit({
            type: "func"
        })
    }, b.publish = function() {
        b.saveDisabled = !0, a({
            url: f + "/" + b.funcDef.id + "/publish",
            method: "post",
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
        }).success(function(a) {
            showmsg("已发布到生产环境中"), b.list()
        })["finally"](function() {
            b.saveDisabled = !1
        })
    }, b.getProd = function(a) {
        b.setCurrent(a);
        var c = {};
        a.current.length > 1 && ($.extend(c, a), angular.forEach(c.current, function(a, b) {
            1 == a.prod && (c.contexts = [a], c.contexts[0].createdAt = moment(c.contexts[0].createdAt).format("YYYY-MM-DD HH:MM:SS"))
        })), b.funcHistory = c, e({
            template: "views/modal/cloud-function-history-modal.html",
            show: !0,
            scope: b
        })
    }, b.getHistory = function(c) {
        b.setCurrent(c), a.get(f + "/" + c.id + "/history", {
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
        }).success(function(a) {
            a.typeDisplay = a.type, "func" == a.type && (a.typeDisplay = "function"), "global" == a.type && (a.name = "Global Context"), angular.forEach(a.contexts, function(a, b) {
                a.createdAt = moment(a.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }), b.funcHistory = a, e({
                template: "views/modal/cloud-function-history-modal.html",
                show: !0,
                scope: b
            })
        })
    }, b["delete"] = function(c) {
        b.setCurrent(c);
        var d = c.action || "";
        d && (d = " " + d);
        var e = window.confirm("将在测试和生产环境下都删除函数 " + c.name + d + "，确认？");
        e && a({
            url: f + "/" + b.funcDef.id,
            method: "delete",
            headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
        }).success(function(a) {
            b.list()
        })
    }, b.editRun = function(a) {
        b.saveDisabled = !1, b.cloudRun = {
            body: "{}",
            env: 0
        }, b.setCurrent(a);
        var c = e({
            scope: b,
            template: "views/modal/cloud-online-run.html",
            show: !0,
            backdrop: "static"
        });
        c.$scope.$on("modal.show", function() {
            g = ace.edit("form-console-content"), g.setTheme("ace/theme/textmate"), g.getSession().setMode("ace/mode/json"), g.setOptions({
                maxLines: 20,
                minLines: 10
            })
        })
    }, b.run = function() {
        b.saveDisabled = !0;
        var c = getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key);
        c["X-AVOSCloud-Application-Production"] = Number(b.cloudRun.env), a({
            url: "/1.1/functions/" + b.funcDef.name,
            method: "post",
            headers: c,
            data: g.getValue()
        }).success(function(a) {
            b.cloudRun.result = a
        })["finally"](function() {
            b.saveDisabled = !1
        })
    }, c.then(function(a) {
        b.list(), d.get().then(function(a) {
            b.classes = a
        })
    })
}]), angular.module("cloudMod").controller("LeanCachePayCtrl", ["$http", "$scope", "$modal", "$routeParams", "$location", "cacheService", "App", "Money", function(a, b, c, d, e, f, g, h) {
    function i() {
        j > -1 && f.list().then(function(a) {
            angular.forEach(a.data, function(a, c) {
                "" + a.id === j && (b.currentLeanCache = a)
            })
        })
    }
    b.chargeConfirmForm = {}, b.instances = f.instances(), b.currentLeanCache = {
        max_memory: 128,
        max_memory_policy: "volatile-lru"
    }, b.policy = [];
    var j = d.id;
    b.createCacheNode = function() {
        b.actionDisabled = !0;
        var a = {
            instance: b.currentLeanCache.instance,
            max_memory: b.currentLeanCache.max_memory,
            client_id: b.user.id,
            max_memory_policy: b.currentLeanCache.max_memory_policy
        };
        f.create(a).then(function(a) {
            e.path("/cache")
        })["finally"](function() {
            b.actionDisabled = !1
        })
    }, g.then(function() {
        i()
    })
}]), angular.module("cloudMod").controller("LeanCacheCtrl", ["$scope", "$http", "App", "cacheService", "$modal", "Money", function(a, b, c, d, e, f) {
    a.instances = d.instances(), a.cacheList = function() {
        d.list().then(function(b) {
            a.leanCaches = b.data
        })
    }, a.showResizeView = function(b) {
        a.currentLeanCache = b, a.$resizeModal = e({
            scope: a,
            template: "views/modal/cloud-cache-resize-modal.html",
            show: !0
        })
    }, a.resizeCache = function() {
        a.actionDisabled = !0, d.resize(a.currentLeanCache.instance, a.currentLeanCache.targetSize).then(function() {
            a.$resizeModal.destroy(), a.cacheList()
        })["finally"](function() {
            a.actionDisabled = !1
        })
    }, a.deleteCache = function() {
        var b = a.currentLeanCache,
            c = window.confirm("确认删除 LeanCache " + b.instance);
        c && d["delete"](b.instance).then(function(b) {
            a.cacheList(), a.$resizeModal.destroy()
        })
    }, c.then(function() {
        a.cacheList()
    })
}]), angular.module("cloudMod").controller("LeanCacheHistoryCtrl", ["cacheService", "$scope", "App", function(a, b, c) {
    var d = moment().year();
    b.years = [d, d - 1, d - 2], b.logQuery = {
        year: d,
        month: moment().month() + 1
    }, b.query = function(c) {
        a.usage(c).then(function(a) {
            b.cacheLogs = a
        })
    }, c.then(function() {
        b.$watch("logQuery", function() {
            b.query(b.logQuery.year + "-" + b.logQuery.month)
        }, !0)
    })
}]), angular.module("cloudMod").factory("cacheService", ["$http", "AppModel", function(a, b) {
    function c(a) {
        return a.map(function(a, b) {
            return a.map(function(a, b) {
                return a.tdate = moment(a.date, "YYYY-MM-DD"), a
            }).sort(function(a, b) {
                var c = a.tdate.valueOf() - b.tdate.valueOf();
                return c > 0 ? 1 : 0 === c ? 0 : -1
            })
        })
    }
    function d(a) {
        var b = a.reduce(function(a, b) {
                return a[b.instance] || (a[b.instance] = []), a[b.instance].push(b), a
            }, {}),
            c = [];
        return Object.keys(b).forEach(function(a) {
            c.push(b[a])
        }), c
    }
    function e(a, b) {
        return !a && b ? !1 : a.max_size !== b.max_size ? !1 : !0
    }
    function f(a) {
        return a.map(function(a, b) {
            var c = [];
            return a.reduce(function(a, b) {
                var d = e(a, b);
                return d ? (a.sameCount += 1, a.endDate.add(1, "days"), a) : (b.sameCount = 1, b.startDate = b.tdate, b.endDate = moment(b.startDate), c.push(b), b)
            }, null), c
        })
    }
    var g = "/1.1/__cache/ops/instances";
    return {
        list: function() {
            return a.get(g, {
                headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
            })
        },
        create: function(c) {
            return a.post(g, c, {
                headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
            })
        },
        resize: function(c, d) {
            return a.post(g + "/" + c + "/resize", {
                max_memory: d
            }, {
                headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
            })
        },
        "delete": function(c) {
            return a["delete"](g + "/" + c, {
                headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
            })
        },
        usage: function(e) {
            return a.get("/1.1/__cache/ops/usage", {
                params: {
                    month: e
                },
                headers: getApiRequestHeader(b.currentApp.app_id, b.currentApp.master_key)
            }).then(function(a) {
                var b = d(a.data.result),
                    e = c(b),
                    g = f(e);
                return g
            })
        },
        instances: function() {
            return [{
                name: "128 MB",
                item_type: 11,
                size: 128,
                max_memory_policy: "volatile-lru",
                price: 1
            }, {
                name: "256 MB",
                item_type: 12,
                size: 256,
                price: 1.5
            }, {
                name: "512 MB",
                item_type: 13,
                size: 512,
                price: 3
            }, {
                name: "1 GB",
                item_type: 14,
                size: 1024,
                price: 5
            }, {
                name: "2 GB",
                item_type: 15,
                size: 2048,
                price: 10
            }, {
                name: "4 GB",
                item_type: 16,
                size: 4096,
                price: 20
            }, {
                name: "8 GB",
                item_type: 17,
                size: 8192,
                price: 50
            }]
        }
    }
}]), angular.module("cloudMod").directive("lcCacheSelect", ["Money", "cacheService", function(a, b) {
    return {
        scope: {
            ngModel: "="
        },
        restrict: "AE",
        replace: !0,
        require: "ngModel",
        templateUrl: "views/cache-select.html",
        link: function(a, c, d, e) {
            a.instances = b.instances(), e.$modelValue || (a.selectInstance = 128), a.$watch("selectInstance", function(b, c) {
                b && (a.ngModel = b, a.price = a.instances.filter(function(a) {
                    return a.size === b
                })[0].price)
            }, !0)
        }
    }
}]), function() {
    "use strict";
    angular.module("messageMod", ["appMod"]), angular.module("messageMod").config(["$routeProvider", function(a) {
        a.when("/message/realtime/stat", {
            templateUrl: "views/messaging/realtime-stat.html",
            controller: "MessageCtrl"
        }).when("/message/realtime/history", {
            templateUrl: "views/messaging/realtime-history.html",
            controller: "MessageHistoryCtrl"
        }).when("/message/realtime/tool", {
            templateUrl: "views/messaging/realtime-tool.html",
            controller: "RealtimeToolCtrl"
        }).when("/message/push/create", {
            templateUrl: "views/messaging/push-create.html",
            controller: "PushCtrl"
        }).when("/message/push/list", {
            templateUrl: "views/messaging/push-list.html",
            controller: "PushListCtrl"
        }).when("/message/push/scheduled", {
            templateUrl: "views/messaging/push-scheduled.html",
            controller: "PushScheduledCtrl"
        }).when("/message/push/conf", {
            templateUrl: "views/messaging/app-push-set.html",
            controller: "PushConfigCtrl"
        }).when("/message/push/tool", {
            templateUrl: "views/messaging/push-tool.html",
            controller: "PushToolCtrl"
        }).when("/message/realtime/conf", {
            templateUrl: "views/messaging/realtime-config.html",
            controller: "RealtimeConfigCtrl"
        }).when("/message/sms/stat", {
            templateUrl: "views/messaging/sms-stat.html",
            controller: "SmsStatCtrl"
        }).when("/message/sms/create", {
            templateUrl: "views/messaging/msg-list.html",
            controller: "SmsCtrl"
        }).when("/message/sms/conf", {
            templateUrl: "views/messaging/sms-set.html",
            controller: "SmsConfigCtrl"
        }).otherwise({
            redirectTo: "/message/realtime/stat"
        })
    }])
}(), angular.module("messageMod").controller("PushCtrl", ["$scope", "$http", "$location", "filterFilter", "apps", "datas", function(a, b, c, d, e, f) {
    function g() {
        angular.forEach(a.datas.clas, function(b, c) {
            return "_Installation" == b.name ? void(a.currentCla = b) : void 0
        })
    }
    var h = $(".datetimepicker").datetimepicker();
    h.show();
    var i = ace.edit("form-push-content");
    i.setOptions({
        maxLines: 20,
        minLines: 10
    }), i.setTheme("ace/theme/github"), a.deviceType = "all", $(function() {
        $("#form-push-file").change(function() {
            a.uploadPushFile()
        })
    }), a.msgtype = "text", a.$watch("msgtype", function() {
        "json" == a.msgtype ? i.getSession().setMode("ace/mode/json") : i.getSession().setMode("ace/mode/text")
    }), a.certType = "prod", a.datas = f, a.pushconditions = [], a.querys = PUSH_QUERYS, a.$watch("datas.clas", function() {
        a.datas.clas && g()
    }), a.pushTime = moment().format("YYYY-MM-DD HH:mm:ss"), a.expireTime = moment().format("YYYY-MM-DD HH:mm:ss"), a.addCondition = function() {
        var b = {
            field: "",
            condition: "",
            value: ""
        };
        a.pushconditions.push(b)
    }, a.uploadPushFile = function() {
        var b = $("#form-push-file")[0];
        if (b.files.length > 0) {
            var c = b.files[0],
                d = c.name,
                e = new AV.File(d, c);
            e.save().then(function(b) {
                showmsg("文件上传成功"), a.pushFileUrl = b._url
            })
        }
    }, a.pushmsg = function() {
        var b, c = new AV.Query(AV.Installation);
        if (a.msg = $.trim(i.getValue()), "" != a.msg) {
            if ("json" == a.msgtype) try {
                b = JSON.parse(a.msg)
            } catch (d) {
                return void showmsg("JSON 数据格式错误", AVC.Error)
            } else b = {
                alert: a.msg
            };
            var e = {
                data: b,
                where: c
            };
            if ("all" != a.deviceType && c.equalTo("deviceType", a.deviceType), "ios" == a.deviceType && (a.iosbadge && (b.badge = "Increment"), a.iossound && (b.sound = a.iossound)), a.pushFileUrl && (b.file_url = a.pushFileUrl), "ios" == a.deviceType && a.certType && (e.prod = a.certType), "1" === a.moreCondition && (angular.forEach(a.pushconditions, function(b, d) {
                var e = b.value;
                "array" !== a.currentCla.schema[b.field].type.toLowerCase() && (e = convertToType(b.value, a.currentCla.schema[b.field].type).val), c[MAPJSAPI[b.condition]](b.field, e)
            }), a.noactivecheck && c.lessThan("updatedAt", new Date(moment().add("day", -a.noactivedays).toJSON())), 1 == a.pushTimeSelect && (e.push_time = moment(moment($("#push-time").data("DateTimePicker").getDate()))), -1 === a.expireIntervalSelect && (e.expiration_time = moment(moment($("#expire-time").data("DateTimePicker").getDate()).add("days", 7))), 1 == a.expireIntervalSelect && (e.expiration_time = moment(moment($("#expire-time").data("DateTimePicker").getDate()))), 2 == a.expireIntervalSelect)) {
                var f = 1 == a.expireUnit ? 60 * a.expireNum * 60 : 60 * a.expireNum * 60 * 24;
                e.expiration_interval = f
            }
            AV.Push.send(e, {
                success: function() {
                    showmsg("发送成功，请注意查看推送结果")
                },
                error: function(a) {
                    showmsg(a.message, AVC.Error)
                }
            })
        }
    }, a.removeCondition = function(b) {
        a.pushconditions.splice(b, 1)
    }
}]), function() {
    "use strict";

    function a(a, b) {
        a.queryStatus = function() {
            b.get(purl + "data/rtm/" + getParam().appid + "/device", {
                params: {
                    iid: a.userID
                }
            }).success(function(b) {
                a.realStatus = b
            })
        }
    }
    angular.module("messageMod").controller("PushToolCtrl", ["$scope", "$http", a])
}(), angular.module("messageMod").controller("PushListCtrl", ["$scope", "HdfsQuery", "App", "$modal", "$http", function(a, b, c, d, e) {
    function f(a, b) {
        var c = a.data.results;
        return c.forEach(function(a, b) {
            delete a["app-id"], delete a["api-version"], delete a.id
        }), c
    }
    a.queryOption = {
        endTime: moment().toISOString()
    }, a.maxTableTime = a.queryOption.endTime, a.statusMap = {
        "in-queue": "等待推送",
        scheduled: "定时推送",
        done: "完成推送"
    }, a.where = {}, a.notifies = [];
    var g = 10,
        h = b("Notifications", {
            limit: g
        });
    a.queryById = function() {
        var b = {
            where: {
                notificationId: a.queryOption.notificationId
            }
        };
        h.query(b).then(function(b) {
            a.notifies = f(b), a.noNext = !0
        })
    }, a.more = function() {
        var b;
        b = a.notifies[a.notifies.length - 1].createdAt;
        var c = {
            max: b
        };
        a.where.status && (c.where = {
            status: a.where.status
        }), h.query(c).then(function(b) {
            a.notifies = a.notifies.concat(f(b)), b.data.results.length < g ? a.noNext = !0 : a.noNext = !1
        })
    }, a.queryByWhere = function(b) {
        b = b || a.queryOption.endTime, b = moment(moment(b).add(1, "days").format("YYYY-MM-DD"));
        var c = {
            max: moment(b).toISOString()
        };
        a.where.status && (c.where = {
            status: a.where.status
        }), h.query(c).then(function(b) {
            b.data.results.length < g ? a.noNext = !0 : a.noNext = !1, a.notifies = f(b), a.queryOption.notificationId = ""
        })
    }, a.detailView = function(b) {
        var c = $.extend({}, b);
        delete c.$$hashKey, a.currentNotify = syntaxHighlight(c), d({
            scope: a,
            template: "views/messaging/notifycation-detail-modal.html",
            show: !0
        })
    }, c.then(function() {
        a.queryByWhere(a.queryOption.endTime), a.$watch("queryOption.queryMode", function(b, c) {
            b !== c && "where" === b && a.queryByWhere()
        }), a.$watch("queryOption.endTime", function(b, c) {
            b && b != c && a.queryByWhere()
        })
    })
}]), angular.module("messageMod").controller("PushScheduledCtrl", ["$http", "$scope", function(a, b) {
    var c = "/1.1/clients/self/apps/" + getParam().appid + "/scheduledPushMsgs";
    b.list = function() {
        a.get(c).then(function(a) {
            b.notifies = a.data.results
        })
    }, b.cancelScheduled = function(c) {
        var d = window.confirm("确认取消推送任务 " + c.push_msg.msg.alert + " ?");
        d && a["delete"](purl + "clients/self/apps/" + getParam().appid + "/scheduledPushMsgs/" + c.id).then(function() {
            b.list()
        })
    }, b.list()
}]), function() {
    "use strict";

    function a(a, b, c, d, e, f) {
        a.certFile = {}, f.then(function() {
            a.certFile = a.currentApp.cert_file_path
        }), a.uploadresults = function(b, d) {
            if (d && b.length > 0) try {
                b = JSON.parse(b), b.error ? showmsg(b.error, AVC.Error) : c(function() {
                    e.get().then(function(b) {
                        a.currentApp = b, a.certFile = b.cert_file_path
                    })
                })
            } catch (f) {
                showmsg("上传失败", AVC.Error)
            }
        }, a.deleteCertFile = function(c, d) {
            var f = window.confirm("确认删除证书 " + d + " ？");
            f && b["delete"](purl + "clients/self/apps/" + a.currentApp.app_id + "/iOSPushCertFile", {
                params: {
                    deviceProfile: c
                }
            }).success(function(b) {
                e.get().then(function(b) {
                    a.currentApp = b, a.certFile = b.cert_file_path
                })
            })
        }
    }
    angular.module("messageMod").controller("PushConfigCtrl", ["$scope", "$http", "$timeout", "apps", "AppModel", "App", a])
}(), angular.module("messageMod").controller("MessageCtrl", ["$scope", "$http", "$timeout", function(a, b, c) {
    function d() {
        return {
            chart: {
                type: "areaspline"
            },
            title: {
                x: 0
            },
            yAxis: {
                allowDecimals: !1,
                min: 0,
                gridLineColor: "#f4f1f1",
                title: {
                    text: ""
                },
                labels: {
                    overflow: "justify"
                }
            },
            xAxis: {
                labels: {
                    overflow: "justify"
                },
                minTickInterval: 864e5
            },
            tooltip: {},
            plotOptions: {
                areaspline: {
                    fillOpacity: .4
                }
            },
            credits: {
                enabled: !1
            },
            series: [{
                data: []
            }]
        }
    }
    function e(a, b) {
        return "undefined" == typeof b ? "data-new" : b > a ? "data-smaller" : a > b ? "data-bigger" : void 0
    }
    a.statItem = "push_session", a.dataTrend = {
        s: 1
    };
    var f, g = 0,
        h = d();
    $.extend(h.xAxis, {
        type: "datetime",
        labels: {
            formatter: function() {
                return moment(this.value).format("YYYY-MM-DD")
            },
            overflow: "justify",
            maxStaggerLines: 1
        }
    }), $.extend(h.tooltip, {
        formatter: function() {
            var a = this.x,
                b = this.y;
            a = moment(this.x).format("YYYY-MM-DD");
            var c = a + ": " + b;
            return c
        }
    }), a.startTime = moment().subtract("days", 7).toDate(), a.endTime = moment().subtract("days", 1).toDate(), a.getRealtimeData = function() {
        function d() {
            a.dataTrend = {}, g++, b.get(h).success(function(b) {
                1 == g && (new Odometer({
                    el: $(".transition-number.logins")[0],
                    value: b.logins - Math.floor(Math.random() * b.logins * .001) + 1,
                    format: "(,ddd).dd"
                }), new Odometer({
                    el: $(".transition-number.sessions")[0],
                    value: b.sessions - Math.floor(Math.random() * b.sessions * .001) + 1,
                    format: "(,ddd).dd"
                }), new Odometer({
                    el: $(".transition-number.udirect-sessions")[0],
                    value: b["udirect-sessions"] - Math.floor(Math.random() * b["udirect-sessions"] * .001) + 1,
                    format: "(,ddd).dd"
                }), new Odometer({
                    el: $(".transition-number.directs")[0],
                    value: b.directs - Math.floor(Math.random() * b.directs * .001) + 1,
                    format: "(,ddd).dd"
                })), $("#message-numbers .logins").text(b.logins), $("#message-numbers .sessions").text(b.sessions), $("#message-numbers .directs").text(b.directs), $("#message-numbers .udirect-sessions").text(b["udirect-sessions"]), a.dataTrend.logins = e(b.logins, i.logins), a.dataTrend.sessions = e(b.sessions, i.sessions), a.dataTrend.directs = e(b.directs, i.directs), a.dataTrend["udirect-sessions"] = e(b["udirect-sessions"], i["udirect-sessions"]), i = b, f = c(d, 1e4)
            })
        }
        var h = purl + "data/rtm/" + getParam().appid + "/stats",
            i = {};
        d(), a.$on("$destroy", function() {
            c.cancel(f)
        })
    }, a.getStatData = function(c) {
        c = c || a.statItem;
        var d = remoteURL + "load_stats_data",
            e = {
                appid: getParam().appid,
                start_date: moment(a.startTime).format("YYYYMMDD"),
                end_date: moment(a.endTime).format("YYYYMMDD"),
                stats: c
            };
        b.get(d, {
            params: e
        }).success(function(b) {
            h.series = b.stats, h.series && h.series[0] && 1 == h.series.length && (h.series[0].name = moment(a.startTime).format("YYYY-MM-DD") + "至" + moment(a.endTime).format("YYYY-MM-DD")), h.series && h.series[0] && (h.yAxis.labels.step = Math.round(h.series[0].data.length / 10), angular.forEach(h.series, function(b, c) {
                b.pointStart = moment.utc(moment(a.startTime).format("YYYY-MM-DD"), "YYYY-MM-DD").valueOf(), b.pointInterval = 864e5
            }), h.series[0].data.length > 30 && (h.plotOptions.areaspline.marker = {
                enabled: !1
            })), $("#chart-container").highcharts(h)
        })
    }, a.loadByDate = function(b, c) {
        a.$apply(function() {
            a.startTime = b, a.endTime = c, a.getStatData()
        })
    }, a.getRealtimeData(), a.$watch("statItem", function() {
        a.getStatData()
    })
}]), function() {
    "use strict";

    function a(a, b) {
        a.queryStatus = function() {
            b.get(purl + "data/rtm/" + getParam().appid + "/device", {
                params: {
                    iid: a.userID,
                    session: 1
                }
            }).success(function(b) {
                a.realStatus = b
            })
        }
    }
    angular.module("messageMod").controller("RealtimeToolCtrl", ["$scope", "$http", a])
}(), function() {
    "use strict";

    function a(a, b, c) {
        function d() {
            var b = a.app.chat_push_msg;
            if (b) {
                try {
                    b = JSON.parse("" + b)
                } catch (c) {} finally {
                    "object" != typeof b && (b = {
                        alert: b
                    })
                }
                a.useDevProfile ? b._profile = "dev" : delete b._profile, b = JSON.stringify(b), a.app.chat_push_msg = b
            }
        }
        a.saveOfflinePushMessage = function() {
            var c = a.app.chat_push_msg;
            b.put(purl + "clients/self/apps/" + getParam().appid + "/update-chat-push", {
                msg: c
            }).success(function() {
                showmsg("保存成功")
            })
        }, a.syncInputWithCheck = d, c.then(function() {
            try {
                a.useDevProfile = JSON.parse(a.app.chat_push_msg)._profile ? !0 : !1
            } catch (b) {
                a.useDevProfile = !1
            }
        }), a.getMsgCB = function() {
            b.get(purl + "clients/self/apps/" + getParam().appid + "/im-config").success(function(b) {
                a.webhook_url = b.webhook_url
            })
        }, a.setMsgCB = function() {
            b.put(purl + "clients/self/apps/" + getParam().appid + "/im-config", {
                webhook_url: a.webhook_url
            }).success(function(a) {})
        }, a.getMsgCB()
    }
    angular.module("messageMod").controller("RealtimeConfigCtrl", ["$scope", "$http", "App", a])
}(), angular.module("messageMod").controller("SmsCtrl", ["$scope", "Sms", function(a, b) {
    var c = {
        startTime: moment().subtract("days", 29).format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        currentPage: 1
    };
    a.queryOption = c, a.pageSize = 10, a.statusMap = {
        SUCCESS: "成功",
        FAIL: "失败",
        PENDING: "等待回执",
        ERROR: "失败",
        UNKNOWN: "无法确认",
        VERIFIED: "验证成功"
    }, a.query = function(d, e, f) {
        f = f || 1, 1 === f && (a.queryOption.currentPage = 1);
        var g = {
            "start-time": moment(d || c.startTime).format("YYYYMMDD"),
            "end-time": moment(e || c.endTime).format("YYYYMMDD"),
            count: !0,
            limit: a.pageSize,
            skip: (f - 1) * a.pageSize
        };
        a.queryOption.like && (g.like = a.queryOption.like), a.queryOption.phone && (g.phone = a.queryOption.phone), a.queryOption.status && (g.status = a.queryOption.status), b.getPage(g).then(function(b) {
            a.rowCollection = b.results, a.totalCount = b.count
        })
    }, a.loadByDate = function(b, c) {
        a.queryOption.startTime = moment(b).format("YYYY-MM-DD"), a.queryOption.endTime = moment(c).format("YYYY-MM-DD"), a.queryOption.currentPage = 1, a.query(b, c)
    }, a.query(), a.$watch("queryOption.currentPage", function(b, c) {
        b !== c && a.query(null, null, a.queryOption.currentPage)
    }), a.$watch("pageSize", function(b, c) {
        b !== c && a.query(null, null, 1)
    })
}]), angular.module("messageMod").factory("Sms", ["$http", "$q", function(a, b) {
    function c(c) {
        var d = b.defer();
        return a.get(purl + "clients/self/apps/" + getParam().appid + "/sms", {
            params: c
        }).success(function(a) {
            d.resolve(a)
        }), d.promise
    }
    return {
        getPage: c
    }
}]), angular.module("messageMod").factory("SmsTemplate", ["$resource", function(a) {
    var b = purl + "clients/self/apps/:app_id/smsTemplates/:id";
    return a(b, {
        app_id: getParam().appid,
        id: "@id"
    }, {
        update: {
            method: "PUT"
        }
    })
}]), angular.module("messageMod").factory("SmsSign", ["$resource", function(a) {
    var b = purl + "clients/self/apps/:app_id/smsSigns/:id";
    return a(b, {
        app_id: getParam().appid,
        id: "@id"
    }, {
        update: {
            method: "PUT"
        }
    })
}]), angular.module("messageMod").controller("SmsConfigCtrl", ["$scope", "$http", "SmsTemplate", "App", "$modal", "SmsSign", function(a, b, c, d, e, f) {
    a.signForm = {}, a.smsTypeMap = {
        10: "验证码类型",
        12: "通知类型",
        13: "营销类型"
    }, d.then(function() {
        a.testPhone = a.currentApp.test_mobile_phones
    }), a.list = function() {
        c.query().$promise.then(function(b) {
            f.query().$promise.then(function(c) {
                a.signsVerified = c.filter(function(a) {
                    return 12 === a.status
                }), b.forEach(function(a) {
                    if (a.sign_id) {
                        var b = c.filter(function(b) {
                            return b.id == a.sign_id
                        });
                        a.sign = b && b[0]
                    }
                }), a.smsTpls = b
            })
        })
    }, a["delete"] = function(b) {
        var d = window.confirm("确定删除该短信模板？");
        d && c["delete"]({
            id: b
        }, function() {
            a.list()
        })
    }, a.setTestPhone = function() {
        b.put(purl + "clients/self/apps/" + getParam().appid, {
            test_mobile_phones: a.testPhone
        })
    }, a.showSmsModal = function(b) {
        a.currentSmsId = b, a.smsModal = e({
            scope: a,
            template: "views/modal/sms-modal.html",
            show: !0
        })
    }, a.list()
}]), angular.module("messageMod").controller("SmsSignCtrl", ["$scope", "SmsSign", "$modal", function(a, b, c) {
    a.save = function() {
        var c = {
            sign: a.currentSign.sign
        };
        a.currentSign.id && (c.id = a.currentSign.id), c = new b(c), a.currentSign.id ? c.$update(function() {
            d.hide(), a.list()
        }) : c.$save(function() {
            d.hide(), a.list()
        })
    }, a.list = function() {
        b.query().$promise.then(function(b) {
            a.smsSigns = b
        })
    }, a["delete"] = function(c) {
        var d = window.confirm("确定删除该短信签名？");
        d && b["delete"]({
            id: c
        }, function() {
            a.list()
        })
    };
    var d;
    a.showSignModal = function(b) {
        b ? a.currentSign = {
            id: b.id,
            sign: b.sign
        } : a.currentSign.sign = b.sign, d = c({
            scope: a,
            template: "views/modal/sms-sign-modal.html",
            show: !0
        })
    }, a.list()
}]), angular.module("messageMod").controller("SmsEditCtrl", ["$scope", "$http", "SmsTemplate", "SmsSign", function(a, b, c, d) {
    a.sms = {}, angular.forEach(a.smsTpls, function(b, c) {
        b.id == a.currentSmsId && (a.sms = b)
    }), a.getSigns = function() {
        d.query().$promise.then(function(b) {
            var c = b.filter(function(a) {
                return 12 === a.status || 13 === a.status
            });
            c && c.length && (a.smsSigns = c, a.sms.sign_id = c[0].id)
        })
    }, a.getSigns(), a.save = function() {
        a.sms.type && (a.sms.type = parseInt(a.sms.type));
        var b = new c(a.sms);
        a.sms.id ? b.$update(function() {
            a.list(), a.smsModal.hide()
        }) : b.$save(function() {
            a.list(), a.smsModal.hide()
        })
    }
}]), angular.module("messageMod").controller("SmsStatCtrl", ["$scope", "App", "$http", "$q", "SmsChart", function(a, b, c, d, e) {
    a.startTime = moment().subtract("days", 6).toDate(), a.endTime = moment().toDate(), a.query = function() {
        e.queryAndDraw(a.startTime, a.endTime).then(function(b) {
            var c = 0,
                d = {};
            Object.keys(b).forEach(function(a, e) {
                d[a] = b[a].reduce(function(a, b) {
                    return a += b
                }, 0), c += d[a]
            }), d.TOTAL = c, a.statSum = d
        })
    }, a.loadByDate = function(b, c) {
        a.startTime = b, a.endTime = c, a.query()
    }, b.then(function() {
        a.query()
    })
}]), angular.module("messageMod").service("SmsChart", ["$http", function(a) {
    function b(a, b) {
        var c = [];
        Object.keys(a).forEach(function(b, d) {
            c.push({
                name: h[b],
                data: a[b],
                color: i[b]
            })
        }), f.series = c, f.plotOptions.series.pointStart = moment.utc(moment(b).format("YYYY-MM-DD"), "YYYY-MM-DD").valueOf(), f.plotOptions.series.pointInterval = 864e5, $("#chart-container").highcharts(f)
    }
    function c(a) {
        var b = a.reduce(function(a, b) {
            return Object.keys(b).forEach(function(c, d) {
                a[c] || (a[c] = []), a[c].push(b[c])
            }), a
        }, {});
        return b
    }
    function d(b, c) {
        var d = {
            from: moment(b).format("YYYYMMDD"),
            to: moment(c).format("YYYYMMDD")
        };
        return a.get(appurl + "/smsDetails/stats", {
            params: d
        })
    }
    function e(a, e) {
        return d(a, e).then(function(d) {
            var e = c(d.data);
            return delete e.UNKNOWN, b(e, a), e
        })
    }
    var f = getChartOption(),
        g = {
            chart: {
                type: "column"
            },
            title: {
                text: "短信发送统计"
            },
            xAxis: {
                type: "datetime",
                minTickInterval: 864e5,
                tickPixelInterval: 200,
                labels: {
                    align: "center",
                    formatter: function() {
                        return moment(this.value).format("YYYY-MM-DD")
                    },
                    overflow: "justify",
                    maxStaggerLines: 1
                }
            },
            yAxis: {
                allowDecimals: !1,
                title: {
                    text: ""
                },
                stackLabels: {
                    enabled: !0,
                    style: {
                        fontWeight: "bold",
                        color: Highcharts.theme && Highcharts.theme.textColor || "gray"
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return "<b>" + moment(this.x).format("YYYY-MM-DD") + "</b><br/>" + this.series.name + ": " + this.y + "<br/>当日累计: " + this.point.stackTotal
                }
            },
            plotOptions: {
                column: {
                    stacking: "normal",
                    dataLabels: {
                        enabled: !0,
                        color: Highcharts.theme && Highcharts.theme.dataLabelsColor || "white",
                        style: {
                            textShadow: "0 0 3px black"
                        }
                    }
                },
                series: {}
            }
        };
    f = $.extend(f, g);
    var h = {
            SUCCESS: "成功",
            FAIL: "投递失败",
            PENDING: "等待回执",
            ERROR: "调用失败",
            VERIFIED: "验证成功"
        },
        i = {
            SUCCESS: "#94d455",
            FAIL: "#cc2346",
            PENDING: "#f2ca1d",
            ERROR: "#ad246a",
            VERIFIED: "#4dc8e3"
        };
    return {
        queryAndDraw: e
    }
}]), angular.module("messageMod").controller("MessageHistoryCtrl", ["$scope", "HdfsQuery", "App", "md5", function(a, b, c, d) {
    function e(a) {
        return a.data.forEach(function(a) {
            a.time = moment(a.timestamp).format("YYYY-MM-DD HH:mm:ss")
        }), a.data
    }
    function f() {
        var b = {};
        return "convid" === a.chatType ? b.convid = a.queryOption.convid : "from" === a.chatType ? b.from = a.queryOption.from : "system" === a.chatType && (b.convid = d(a.queryOption.sysConvid + ":" + a.queryOption.sysFrom)), b
    }
    function g(b) {
        b.data.length < h ? a.noNext = !0 : a.noNext = !1
    }
    var h = 10,
        i = b(null, {
            limit: h
        }, purl1 + "rtm/messages/logs");
    a.chatType = "all", a.queryOption = {}, a.tableTime = moment().toISOString(), a.maxTableTime = moment().toISOString(), a.query = function() {
        var b = f(),
            c = moment(moment(a.tableTime).format("YYYY-MM-DD")).add("days", 1);
        b.max_ts = c.valueOf(), i.query(b).then(function(b) {
            g(b), a.msgs = e(b)
        })
    }, a.more = function() {
        if (a.msgs && !(a.msgs.length < 1)) {
            var b = a.msgs[a.msgs.length - 1].timestamp,
                c = f();
            c.max_ts = b, i.query(c).then(function(b) {
                g(b), a.msgs = a.msgs.concat(e(b))
            })
        }
    }, a.detail = function(b) {
        var c = {};
        $.extend(c, b), delete c.$$hashKey, a.detailView = c
    }, c.then(function() {
        a.query(), a.$watch("tableTime", function(b, c) {
            b && b != c && a.query()
        }), a.$watch("chatType", function(b, c) {
            b !== c && "all" === b && a.query()
        })
    })
}]), angular.module("dataQueryMod", ["appMod", "dataMod.service"]), angular.module("dataQueryMod").config(["$routeProvider", function(a) {
    a.when("/:claid", {
        templateUrl: "views/cla-query.html",
        controller: "SingleBigDataQueryCtrl"
    }).otherwise({
        redirectTo: "/_User"
    })
}]), angular.module("dataQueryMod").controller("BigDataQueryCtrl", ["$http", "$scope", "SchemaLoader", "$routeParams", "claQueryService", "$location", "$timeout", "BigqueryService", function(a, b, c, d, e, f, g, h) {
    var i;
    b.$on("$viewContentLoaded", function() {
        i = ace.edit("form-console-content"), i.setOptions({
            maxLines: 20,
            minLines: 10
        }), i.setTheme("ace/theme/textmate"), i.getSession().setMode("ace/mode/sql"), b.claQueryService.editor = i;
        var a = f.path().substring(1);
        0 === a.indexOf("_") && (a = "`" + a + "`"), i.setValue("select * from " + a, 1), b.currentPage = 1, b.queryDatas = []
    }), b.claQueryService = e, b.usedQuery = localStorage["bigquery-sql"] && JSON.parse(localStorage["bigquery-sql"]) || [], b.pageSize = 20, b.loadSchema = function() {
        b.datas = {}, b.currentPage = 1, c.get().then(function(a) {
            a && 0 != a.length || showmsg("应用正在创建中,请稍后刷新"), b.datas.clas = a
        })
    }, b.claOrder = function(a) {
        return a.name.toLowerCase()
    };
    var j = "/1.1/bigquery/job";
    b.useQuery = function(a) {
        i.setValue(a, 1), $("#used-query").collapse("hide"), $("#create-query").collapse("show")
    }, b.query = function(c) {
        function d() {
            b.queryDisabled && (b.queryEclipased = (Date.now() - b.queryStart) / 1e3, g(d, 100))
        }
        b.currentJobId = -1, "undefined" != typeof c && (b.currentPage = c), b.queryDisabled = !0, b.queryEclipased = 0, b.queryStart = Date.now(), d(), b.error = null, b.exportURL = null, b.queryDatas = null, a.post(j, {
            appId: getParam().appid,
            jobConfig: {
                sql: i.getValue().trim()
            }
        }).success(function(a) {
            -1 == $.inArray(i.getValue().trim(), b.usedQuery) && (b.usedQuery.length > 4 && b.usedQuery.shift(), b.usedQuery.push(i.getValue().trim()), localStorage["bigquery-sql"] = JSON.stringify(b.usedQuery)), b.getJob(a.id)
        }).error(function() {
            showmsg("查询出错", "error"), b.queryDisabled = !1
        })
    }, b.getJob = function(c) {
        function d() {
            a.get(j + "/" + c, {
                params: {
                    limit: b.pageSize,
                    anchor: (b.currentPage - 1) * b.pageSize
                }
            }).success(function(a) {
                "RUNNING" == a.status ? g(d, 3e3) : "ERROR" == a.status ? (b.queryDisabled = !1, b.error = a.error) : (b.queryDisabled = !1, b.currentJobId = a.id, b.previewCount = a.previewCount, b.totalCount = a.totalCount, b.previewCount = a.previewCount, b.queryDatas = a.results)
            }).error(function() {
                b.queryDisabled = !1
            })
        }
        d()
    }, b.addField = function(a) {
        var b = i.getValue();
        /^select \S{1,} from/.test(b) ? i.insert("," + a) : i.insert(a)
    }, b.saveResult = function() {
        h.saveResultAsCla(b.currentJobId, b.saveClaName).then(function() {
            b.error = "", showmsg("保存为 Class 成功")
        }, function(a) {
            b.error = a
        }), $("#dataquery-save-result").modal("hide")
    }, b["export"] = function() {
        a.post(purl + "bigquery/job/" + b.currentJobId + "/export").success(function(a) {
            b.exportURL = a.path
        })
    }, b.loadSchema(), b.$watch("currentPage", function() {
        b.currentJobId && -1 != b.currentJobId && b.getJob(b.currentJobId)
    }), b.$watch("pageSize", function(a, c) {
        a !== c && b.query(1)
    })
}]), angular.module("dataQueryMod").controller("SingleBigDataQueryCtrl", ["$http", "$scope", "$routeParams", "SchemaLoader", "claQueryService", function(a, b, c, d, e) {
    d.get().then(function(a) {
        angular.forEach(a, function(a, b) {
            a.name == c.claid && (e.currentQueryCla = a)
        })
    })
}]), angular.module("dataQueryMod").factory("claQueryService", [function() {
    return {
        currentQueryCla: {}
    }
}]), angular.module("dataMod", ["appMod", "dataMod.service", "dataMod.singleClassMod", "dataMod.column", "dataMod.import"]), angular.module("dataMod").config(["$routeProvider", function(a) {
    a.when("/", {
        templateUrl: "views/cla-nodata.html"
    }).when("/:claid", {
        templateUrl: "views/cla.html",
        controller: "SingleClassCtrl"
    }).when("/:claid/:parentCla/:objid", {
        templateUrl: "views/cla.html",
        controller: "SingleClassCtrl"
    }).when("/:claid/:parentCla/:objid/:column", {
        templateUrl: "views/cla.html",
        controller: "SingleClassCtrl"
    }).when("/:claid/:parentCla/:objid/:column/addexist", {
        templateUrl: "views/cla.html",
        controller: "SingleClassCtrl"
    })
}]), angular.module("dataMod").controller("DataBrowserCtrl", ["$scope", "$http", "$routeParams", "$route", "Schema", "SchemaLoader", "$translate", "$location", function(a, b, c, d, e, f, g, h) {
    function i() {
        var b = !1;
        return angular.forEach(a.datas.clas, function(a) {
            isNaN(a.rows_count) && (b = a)
        }), b
    }
    function j(b) {
        for (var c = 0; c < a.datas.clas.length; c++) if (a.datas.clas[c].name == b) return void a.datas.clas.splice(c, 1)
    }
    a.datas = {}, a.relcla = {}, a.fieldTypes = CTYPES, a.claModalTpl = "views/cla-modal.html", a.setModalTpl = function(b) {
        a.claModalTpl = "views/" + b
    }, a.$on("$routeChangeSuccess", function(b, c, e, f) {
        var g = d.current.params;
        g.parentCla ? a.relcla[g.parentCla] = {
            name: g.claid
        } : a.relcla = {}
    }), a.loadSchema = function() {
        a.schemaLoader = f, a.schemaLoader.fetch().then(function(b) {
            b && 0 != b.length || showmsg("应用正在创建中,请稍后刷新"), a.datas.clas = b;
            var c = i();
            c && showmsg(c.name + " 绑定的 Class 已经被删除，需要在 " + c.name + " 的绑定设置中解除绑定关系", "error")
        })
    }, a.loadSchema(), a.location = h, a.claOrder = function(a) {
        return a.name.toLowerCase()
    }, a.dropClass = function() {
        var b = window.confirm(g("确认删除 Class '" + c.claid + "'？"));
        if (b) {
            var d = new e;
            d.id = c.claid, d.$delete(function(b) {
                j(c.claid), a.$broadcast("dropClass")
            })
        }
    }, a.createClass = function() {
        var b = $("#createClass input:text");
        if (!/^[a-zA-Z][\w]*$/.test(b.val())) return !1;
        var c = new e;
        c.class_name = b.val(), c.class_type = a.classType ? "log" : "normal", c.$save(function(b) {
            b.rows_count = 0, a.datas.clas.push(b)
        }), b.val(""), $("#createClass").modal("hide")
    }, a.getClassMeta = function() {}, a.$on("loadschema", a.loadSchema), a.getClaNumStr = function(a) {
        return a >= 1e9 ? (a / 1e9).toFixed(1).replace(/\.0$/, "") + "b" : a >= 1e6 ? (a / 1e6).toFixed(1).replace(/\.0$/, "") + "m" : a >= 1e3 ? (a / 1e3).toFixed(1).replace(/\.0$/, "") + "k" : a
    }
}]);
var grid;
angular.module("dataMod.singleClassMod", ["dataMod.service"]), angular.module("dataMod.singleClassMod").controller("SingleClassCtrl", ["$scope", "$http", "$location", "$routeParams", "filterFilter", "$translate", "$compile", "App", "$q", "$modal", "$timeout", "$window", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(b) {
        var c = grid.getActiveCell(),
            d = c.cell,
            e = c.row,
            f = grid.getColumns()[d];
        a.cladatas[e][f.field];
        a.acl.value = b.toJSON(), a.cladatas[e].ACL = b.toJSON(), a.saveRow(e, d, b.toJSON(), f, a.cladatas[e])
    }
    function n() {
        var b = grid.getActiveCell(),
            c = b.cell,
            d = b.row,
            e = grid.getColumns()[c],
            f = a.cladatas[d][e.field];
        return f
    }
    function o() {
        if (a.schemaBak = {}, angular.copy(a.currentCla.schema, a.schemaBak), a.state.hiddenColumns = [], angular.forEach(a.schemaBak, function(a, b) {
            a.columnView = !0
        }), localStorage["columns-view-" + getParam().appid + "-" + a.currentCla.name]) {
            try {
                a.state.hiddenColumns = JSON.parse(localStorage["columns-view-" + getParam().appid + "-" + a.currentCla.name])
            } catch (b) {}
            angular.forEach(a.schemaBak, function(b, c) {
                a.state.hiddenColumns.indexOf(c) > -1 && (b.columnView = !1)
            })
        }
    }
    function p(b) {
        b = angular.copy(b, []);
        for (var c = b.length - 1; c >= 0; c--) if (b[c]) {
            var d = b[c],
                e = c;
            a.state.hiddenColumns.indexOf(d.field) > -1 && b.splice(e, 1)
        }
        return b
    }
    function q() {
        function b(a, b) {
            return a + "<span class=data-type>" + b + "</span>"
        }
        function c(a, c) {
            if (e[a]) {
                var c = c || {
                    id: a,
                    field: a,
                    name: b(a, e[a].type),
                    width: k,
                    sortable: !0
                };
                c.toolTip = e[a].comment, g && -1 !== g.indexOf(a) ? d[g.indexOf(a)] = c : d.push(c)
            }
        }
        var d = [];
        if (a.currentCla && a.currentCla.schema || (a.columnDefs = d), a.currentCla && a.currentCla.schema) {
            var e = a.currentCla.schema,
                f = 0;
            angular.forEach(e, function(a, b) {
                f++
            });
            var g;
            g = localStorage["columns-" + getParam().appid + "-" + a.currentCla.name];
            try {
                g = g && JSON.parse(g)
            } catch (h) {}
            if (window.localStorage && g) {
                for (var i = 0; i < g.length; i++) e[g[i]] || (g.splice(i, 1), localStorage["columns-" + getParam().appid + "-" + a.currentCla.name] = JSON.stringify(g));
                angular.forEach(e, function(b, c) {
                    g.indexOf(c) < 0 && (g.push(c), localStorage["columns-" + getParam().appid + "-" + a.currentCla.name] = JSON.stringify(g))
                })
            }
            var j = $("#clas").width() - 25,
                k = parseInt(j / f);
            k = Math.max(200, k), c("objectId", {
                id: "objectId",
                field: "objectId",
                name: b("objectId", "String"),
                width: k
            }), angular.forEach(e, function(d, e) {
                -1 === ["createdAt", "updatedAt", "objectId"].indexOf(e) && ("_File" == a.currentCla.name ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k
                }) : "Boolean" == d.type ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k,
                    editor: Slick.Editors.YesNoSelect,
                    sortable: !0
                }) : "Relation" == d.type ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k
                }) : "Pointer" == d.type ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k,
                    editor: Slick.Editors.Text
                }) : "File" == d.type ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k
                }) : "ACL" == d.type ? c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k,
                    editor: Slick.Editors.Text
                }) : c(e, {
                    id: e,
                    field: e,
                    name: b(e, d.type),
                    width: k,
                    editor: Slick.Editors.Text,
                    sortable: !0
                }))
            }), c("createdAt"), c("updatedAt"), d.forEach(function(b, c) {
                b.sortable = !1;
                var d = "log" === a.currentCla["class-type"] ? !0 : !1;
                "objectId" !== b.id && (b.header = {
                    menu: {
                        items: [{
                            title: "升序",
                            command: "sort-asc"
                        }, {
                            title: "降序",
                            command: "sort-desc"
                        }, {
                            title: "编辑",
                            command: "edit"
                        }, {
                            title: "重命名",
                            command: "rename",
                            disabled: d
                        }, {
                            title: "删除",
                            command: "delete"
                        }]
                    }
                })
            }), o(), a.columnDefs = p(d)
        }
    }
    function r() {
        a.$watch("currentCla.schema", q, !0)
    }
    function s() {
        function c(c, d, e) {
            function f(b) {
                var c = new AV.File(b.name, b);
                c.save().then(function(b) {
                    if ("_File" == a.currentCla.name && "url" == grid.getColumns()[e].field) x();
                    else {
                        var c = b,
                            f = new AV.File(c._name);
                        f.id = c.id, f._url = c._url, f.__type = "File", a.saveRow(d, e, f, grid.getColumns()[e], a.cladatas[d])
                    }
                }, function(a) {
                    a && showmsg(a.message, AVC.Error)
                })
            }
            function g(c) {
                var f, g = function() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                };
                c.name.indexOf(".") && (f = c.name.split(".").pop());
                var h = g() + g() + g() + g();
                f && (h += "." + f);
                var i = {
                    key: h,
                    name: c.name,
                    metaData: {
                        owner: "unknown",
                        size: c.size
                    }
                };
                b.post(purl + "qiniu", i, {
                    headers: {
                        "x-uluru-application-id": a.currentApp.app_id,
                        "x-uluru-application-key": a.currentApp.master_key
                    }
                }).then(function(b) {
                    var f = new FormData;
                    f.append("file", c), f.append("key", h), f.append("token", b.data.token), a.rootState.pendingRequest++, $.ajax("https://up.qbox.me/", {
                        method: "POST",
                        contentType: !1,
                        processData: !1,
                        data: f
                    }).success(function(f) {
                        if (a.rootState.pendingRequest--, "_File" === a.currentCla.name && "url" === grid.getColumns()[e].field) x();
                        else {
                            var g = b.data,
                                h = new AV.File(c.name);
                            h.id = g.objectId, h._url = g.url, h.__type = "File", a.saveRow(d, e, h, grid.getColumns()[e], a.cladatas[d])
                        }
                    }).error(function(b) {
                        a.rootState.pendingRequest--
                    })
                })
            }
            $(c.target).parents(".file-td-wrapper").find('input[type="file"]').off("change"), $(c.target).parents(".file-td-wrapper").find('input[type="file"]').change(function() {
                if ($(this).val() && $(this)[0].files.length > 0) {
                    var b = $(this)[0].files[0];
                    "us" === a.nodeDomain ? f(b) : g(b)
                }
            })
        }
        function d(b, c) {
            a.deleteCellFile(b, c)
        }
        function e(c) {
            b({
                method: "post",
                url: purl + "requestEmailVerify",
                headers: {
                    "X-AVOSCloud-Application-Id": a.app.app_id,
                    "X-AVOSCloud-Application-Key": a.app.app_key,
                    _MasterKey: a.app.master_key
                },
                data: {
                    email: c
                }
            }).success(function() {
                showmsg("发送验证邮件成功")
            })
        }
        if (a.cladatas) {
            var f = {
                    editable: !0,
                    enableAddRow: !1,
                    enableCellNavigation: !0,
                    asyncEditorLoading: !1,
                    autoHeight: !0,
                    autoEdit: !1,
                    enableTextSelectionOnCells: !0,
                    defaultFormatter: a.getDisplay,
                    defaultEditFormatter: a.getEditDisplay,
                    defaultValidator: convertToType,
                    currentScope: a
                },
                g = new Slick.CheckboxSelectColumn({
                    cssClass: "slick-cell-checkboxsel"
                });
            a.columnDefs.unshift(g.getColumnDefinition()), grid = new Slick.Grid("#myGrid", a.cladatas, a.columnDefs, f), grid.setSelectionModel(new Slick.RowSelectionModel({
                selectActiveRow: !1
            })), grid.registerPlugin(g), grid.onCellChange.subscribe(function(b, c) {
                var d = c.grid.getColumns()[c.cell].field;
                a.saveRow(c.row, c.cell, a.cladatas[c.row][d], c.grid.getColumns()[c.cell], c.item)
            }), grid.onActiveCellChanged.subscribe(function(b, c) {
                k(function() {
                    a.hasEditableActiveCell = a.isCurrentCellTextEditable()
                })
            }), grid.onColumnsReordered.subscribe(function(b, c) {
                for (var d = [], e = c.grid.getColumns(), f = 1; f < e.length; f++) d.push(e[f].field);
                a.currentCla && d.length && localStorage && (localStorage["columns-" + getParam().appid + "-" + a.currentCla.name] = JSON.stringify(d)), q()
            }), grid.onBeforeEditCell.subscribe(function(b, c) {
                var d = a.currentCla.name,
                    e = c.grid.getColumns()[c.cell].field,
                    f = c.item;
                return "_Role" == d && "name" == e && f.objectId ? !1 : "log" === a.currentCla["class-type"] && f.objectId ? !1 : void 0
            });
            var h = new Slick.Plugins.HeaderMenu,
                i = j({
                    scope: a,
                    template: "views/modal/cla-column-delete-modal.html",
                    show: !1
                }),
                m = j({
                    scope: a,
                    template: "views/modal/cla-column-rename-modal.html",
                    show: !1
                }),
                n = j({
                    scope: a,
                    template: "views/modal/cla-column-edit-modal.html",
                    show: !1
                });
            h.onCommand.subscribe(function(b, c) {
                a.currentColumn = c.column.id;
                var d = c.command;
                "delete" == d ? i.show() : "sort-asc" == d ? (a.sortInfo = {
                    directions: ["asc"],
                    fields: [a.currentColumn]
                }, x()) : "sort-desc" == d ? (a.sortInfo = {
                    directions: ["desc"],
                    fields: [a.currentColumn]
                }, x()) : "rename" == d ? m.show() : "edit" == d && n.show()
            }), grid.registerPlugin(h), grid.onClick.subscribe(function(b, f) {
                var g = f.row,
                    h = f.cell,
                    i = f.grid.getColumns()[f.cell].field;
                if (a.currentCla.schema[i]) {
                    a.currentCla.schema[i].type;
                    if ($(b.target).hasClass("file-upload")) c(b, g, h);
                    else if ($(b.target).hasClass("file-delete")) {
                        var k = a.cladatas[g].objectId;
                        d(k, i)
                    } else if ($(b.target).hasClass("cell-reset-password")) a.requestPasswordReset(a.cladatas[g].email);
                    else if ($(b.target).hasClass("cell-verify-email")) e(a.cladatas[g].email);
                    else if ($(b.target).hasClass("cell-acl-edit")) {
                        a.acl = {
                            userRead: !0,
                            userWrite: !0,
                            roleRead: !0,
                            roleWrite: !0,
                            allWrite: !0,
                            allRead: !0,
                            value: a.cladatas[g][i]
                        };
                        var l = j({
                            scope: a.$new(),
                            template: "views/modal/cla-acl-modal.html",
                            show: !0,
                            container: "#cla_data",
                            prefixEvent: "aclModal"
                        });
                        a.aclEditModal = l
                    } else $(b.target).hasClass("show-row-detail") && a.showRowDetail(g, h)
                }
            }), grid.onKeyDown.subscribe(function(b, c) {
                var d = c.row,
                    e = c.cell,
                    f = c.grid.getColumns()[c.cell].field;
                if (13 == b.which) {
                    if (!f || !a.currentCla.schema[f]) return;
                    var g = a.currentCla.schema[f].type,
                        h = grid.getCellNode(d, e);
                    f = f.toLowerCase(), g = g.toLowerCase(), "objectid" == f && (a.showRowDetail(d, e), $("#one-row-detail-modal").modal("show")), "pointer" == g || "relation" == g ? $(h).find("a").click() : "file" == g && l.open($(h).find("a").attr("href"))
                }
            })
        }
    }
    function t() {
        grid.setData(a.cladatas), grid.setColumns(a.columnDefs), grid.updateRowCount(), grid.render()
    }
    function u(b, c, d) {
        var e = a.currentCla.schema[c].type;
        if (d = convertToType(d, e).val, "Pointer" == e) {
            var f = a.currentCla.schema[c].className,
                g = AV.Object.extend(f),
                h = new g;
            h.id = d, b.set(c, h), d && "" != d.trim() || b.set(c, null)
        } else "ACL" != c && b.set(c, d);
        "ACL" == c && b.setACL(d)
    }
    function v(b, c, e, f, g, h) {
        if ("_User" != a.currentCla.name || "password" != f.field || e && "" != $.trim(e)) {
            var i = !0,
                j = g.objectId,
                l = f.field,
                m = (a.currentCla.schema[f.field].type, a.cladatas[b]),
                n = AV.Object.extend(a.currentCla.name),
                o = new n;
            j && "" != $.trim(j) && (i = !1, o.set("objectId", j)), e && "File" == e.__type ? u(o, l, e) : i ? angular.forEach(g, function(a, b) {
                u(o, b, a)
            }) : u(o, l, e), o.save(null, {
                success: function(c) {
                    k(function() {
                        $.extend(m, c.toJSON())
                    }), i && o.fetch({
                        success: function(c) {
                            k(function() {
                                $.extend(a.cladatas[b], c.toJSON())
                            })
                        }
                    });
                    var f = {};
                    if (f[l] = e, i && d.parentCla && d.column) {
                        var g = AV.Object.extend(d.parentCla),
                            h = new AV.Query(g);
                        h.get(d.objid, {
                            success: function(a) {
                                var b = a.relation(d.column);
                                b.add(o), a.save()
                            },
                            error: function(a) {
                                showmsg(a.message, AVC.Error)
                            }
                        })
                    }
                    k(function() {
                        i && (a.currentCla.rows_count += 1)
                    })
                },
                error: function(a) {
                    showmsg(a.message, AVC.Error)
                }
            })
        }
    }
    function w() {
        function b() {
            a.schemaarr = [], a.currentCla && angular.forEach(a.currentCla.schema, function(b, c) {
                var d = {};
                d.columnname = c, d.columntype = b.type, "objectId" == c ? d.order = 0 : isSystemFields(c) ? d.order = 2 : d.order = 1, b.className && (d.classname = b.className), a.schemaarr.push(d)
            })
        }
        a.querys = QUERYS, a.predicate = "-updatedAt", a.$watch("currentCla.schema", b, !0), a.currentPage = 0, a.pernum = $.cookie("pernum") || 20, a.allSelected = !1, a.schemaLoader.get().then(function(a) {
            x(), b()
        }), a.$on("dropClass", function() {
            a.cladatas = [], a.currentCla.schema = null, a.schemaarr = []
        }), a.getClaMeta = function() {
            a.schemaLoader.fetch().then(function(c) {
                a.datas.clas = c, x(), b()
            })
        }, a.$on("getClaMeta", a.getClaMeta)
    }
    function x() {
        angular.forEach(a.datas.clas, function(b, e) {
            return b.name == d.claid ? (a.currentCla = b, d.parentCla && d.objid && d.column && (a.parentCla = d.parentCla, a.parentColumn = d.column, /\/addexist$/.test(c.path()) ? a.addExistToRelation = !0 : a.addNewToRelation = !0), a.relationURL = "#/" + d.claid + "/" + d.parentCla + "/" + d.objid + "/" + d.column, void(d.parentCla ? y(d.parentCla, d.objid, d.column) : d.objid ? y(-1, d.objid, null) : y())) : void 0
        })
    }
    function y(b, c, d) {
        var e, f, g = a.currentPage * a.pernum,
            h = a.pernum;
        b && c && d && !a.addExistToRelation ? (e = AV.Object.extend(b), f = new AV.Query(e), f.get(c, {
            success: function(c) {
                var e = c.relation(d);
                f = e.query(), B(f), a.sortInfo ? "asc" == a.sortInfo.directions[0] ? f.ascending(a.sortInfo.fields[0]) : f.descending(a.sortInfo.fields[0]) : f.descending("updatedAt"), f.skip(g), f.limit(h), f.descending("updatedAt"), f.find({
                    success: function(b) {
                        a.$apply(function() {
                            a.cladatas = JSON.parse(JSON.stringify(b))
                        })
                    }
                }), f.count({
                    success: function(c) {
                        a.$apply(function() {
                            a.relcla[b].count = c
                        })
                    },
                    error: function(a, b) {
                        showmsg(a.message, AVC.Error)
                    }
                })
            }
        })) : (e = AV.Object.extend(a.currentCla.name), f = new AV.Query(e), c && !a.addExistToRelation && f.equalTo("objectId", c), B(f), a.sortInfo ? "asc" == a.sortInfo.directions[0] ? f.ascending(a.sortInfo.fields[0]) : f.descending(a.sortInfo.fields[0]) : f.descending("updatedAt"), f.skip(g), f.limit(h), f.find({
            success: function(b) {
                a.$apply(function() {
                    var c = JSON.parse(JSON.stringify(b));
                    a.cladatas = c
                })
            },
            error: function(a, b) {
                showmsg(a.message, AVC.Error)
            }
        }), f.count({
            success: function(d) {
                a.$apply(function() {
                    c ? a.relcla[b].count = d : a.currentCla.rows_count = d
                })
            },
            error: function(a, b) {
                showmsg(a.message, AVC.Error)
            }
        }))
    }
    function z(a, b, c, d, e) {
        var f = c || "",
            g = c || "",
            h = e.objectId;
        d.field;
        if (h) return '<a class="file-link" target="_blank" href="' + f + '" >' + g + "</a>";
        var i = '<div class="file-td-wrapper"    ><a class="file-link" target="_blank" href="' + f + '" >' + g + '</a><span class="cell-form" ><input type="file" name="file" class="file-input" > <input type="button" class="btn btn-default btn-xs cell-btn file-upload fake-uploader" value="上传"></input>';
        return f && (i += '<button class="btn btn-default btn-xs cell-btn file-delete " ><span class="glyphicon glyphicon-remove file-delete"></span></button>'), i += "</span> </div>"
    }
    function A(b) {
        for (var c = 0; c < a.cladatas.length; c++)
            if (a.cladatas[c].objectId == b)
                return void a.cladatas.splice(c, 1)
    }
    function B(b) {
        for (var c = 0; c < a.conditions.length; c++) {
            var d = a.conditions[c].field;
            if ("" == d.trim()) return;
            var e = a.conditions[c].condition,
                f = a.conditions[c].value;
            if (QUERY_TYPES[e]) f = "Number" == QUERY_TYPES[e] ? Number(f) : String(f);
            else if (a.currentCla.schema[d].type && "Pointer" == a.currentCla.schema[d].type) {
                var g = AV.Object.extend(a.currentCla.schema[d].className),
                    h = new g;
                h.set("objectId", f), f = h
            } else f = convertToType(f, a.currentCla.schema[d].type).val;
            b[MAPJSAPI[e]] && b[MAPJSAPI[e]](d, f)
        }
    }
    function C() {
        $.cookie("pernum", a.pernum), d.parentCla && d.objid && d.column ? y(d.parentCla, d.objid, d.column) : a.conditions.length && "" != $.trim(a.conditions[0].value) ? a.query() : y()
    }
    a.$on("modal.hide", function() {
        grid && grid.focus()
    }), $(document).on("hidden.bs.modal", function(a) {
        grid.focus()
    }), grid = null, a.$compile = g, a.state = {}, a.queryUsersByName = function(b) {
        if (b) {
            var c = i.defer(),
                d = new AV.Query("User");
            d.contains("username", b);
            var e = new AV.Query("User");
            return e.equalTo("objectId", b), AV.Query.or(d, e).find({
                success: function(b) {
                    a.$apply(function() {
                        var d = JSON.parse(JSON.stringify(b));
                        a.aclTipUser = d, c.resolve(d)
                    })
                }
            }), c.promise
        }
    }, a.queryRolesByName = function(b) {
        if (b) {
            var c = i.defer(),
                d = new AV.Query("_Role");
            return d.contains("name", b), d.find({
                success: function(b) {
                    a.$apply(function() {
                        var d = JSON.parse(JSON.stringify(b));
                        a.aclTipRole = d, c.resolve(d)
                    })
                }
            }), c.promise
        }
    }, a.setUserACL = function() {
        var b;
        if (angular.forEach(a.aclTipUser, function(c, d) {
            (c.username == a.acl.username || c.objectId == a.acl.username) && (b = c)
        }), b) {
            var c = new AV.ACL(n());
            c.setReadAccess(b.objectId, a.acl.userRead), c.setWriteAccess(b.objectId, a.acl.userWrite), m(c)
        }
    }, a.setRoleACL = function() {
        var b;
        if (angular.forEach(a.aclTipRole, function(c, d) {
            (c.name == a.acl.rolename || c.objectId == a.acl.username) && (b = c)
        }), b) {
            var c = new AV.ACL(n());
            c.setRoleReadAccess(b.name, a.acl.roleRead), c.setRoleWriteAccess(b.name, a.acl.roleWrite), m(c)
        }
    }, a.setAllACL = function() {
        var b = new AV.ACL;
        b.setPublicReadAccess(a.acl.allRead), b.setPublicWriteAccess(a.acl.allWrite), m(b)
    }, r();
    d.claid;
    a.$watch("[cladatas,columnDefs]", function(b, c, d) {
        "undefined" != typeof a.cladatas && (a.cladatas && 0 == a.cladatas.length && a.cladatas.push({}), a.columnDefs && (grid ? t() : s()))
    }, !0), a.$on("aclModal.hide", function() {
        a.aclEditModal && a.aclEditModal.destroy()
    }), a.saveRow = v, h.then(function() {
        w()
    }), a.beforeFileUpload = function(b) {
        clas, a.$$phase ? a.rootState.pendingRequest++ : a.$apply(function() {
            a.rootState.pendingRequest++
        });
        var c = $(b.target).parents("form").find(":file").val().split("\\").pop();
        $(b.target).parents("form").attr("action", "/1/files/" + c)
    }, a.uploadCellResults = function(b, c, d, e) {
        if (c && b.length > 0) try {
            var f = (grid.getCellFromEvent(e).row, grid.getCellFromEvent(e).cell);
            a.$$phase ? a.rootState.pendingRequest-- : a.$apply(function() {
                a.rootState.pendingRequest--
            });
            var g = JSON.parse(b),
                h = new AV.File(g.name);
            h.id = g.objectId, h._url = g.url, h.__type = "File", "_File" == a.currentCla.name && "url" == grid.getColumns()[f].field && x()
        } catch (e) {}
    }, a.deleteCellFile = function(b, c) {
        var d = AV.Object.extend(a.currentCla.name),
            e = new d;
        e.set(c, null), e.set("objectId", b), e.save(null, {
            success: function(b) {
                a.$apply(function() {
                    for (var d = 0; d < a.cladatas.length; d++) if (a.cladatas[d].objectId == b.id) {
                        var f = new AV.File;
                        f.id = a.cladatas[d][c].id, f.destroy(), $.extend(a.cladatas[d], e.toJSON());
                        break
                    }
                })
            },
            error: function(a) {
                a && showmsg(a.message, AVC.Error)
            }
        })
    }, a.getDisplay = function(b, c, d, e, f) {
        var g = e.field,
            h = d;
        if ("objectId" === g && d) return '<a data-toggle="modal" data-target="#one-row-detail-modal" data-keyboard="true"  class="show-row-detail">' + d + "</a>";
        if (f.objectId && "_User" == a.currentCla.name && "password" == g) return f.email ? '<span class="cell-has-btn">(hidden)</span> <button class="btn btn-default btn-xs cell-btn cell-btn-right cell-reset-password">请求重置</button> ' : "(hidden) ";
        if (f.objectId && "_User" == a.currentCla.name && "email" == g && f.email) return '<span class="cell-has-btn">' + f.email + '</span><button class="btn btn-default btn-xs cell-btn cell-btn-right cell-verify-email">请求验证</button> ';
        if ("_File" == a.currentCla.name && ("url" == g || "File" == a.currentCla.schema[g].type)) return z(b, c, d, e, f);
        if (!a.currentCla.schema[g]) return h;
        switch (a.currentCla.schema[g].type) {
            case "String":
                return h && "" != $.trim(h) ? (h + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
            case "Number":
                return "undefined" == typeof h || "" == $.trim(h) ? "" : h;
            case "Boolean":
                return "undefined" == typeof h || "" == $.trim(h) ? "" : h;
            case "Date":
                return h && "" != $.trim(h) ? h.__type && "Date" == h.__type ? moment(h.iso).format("YYYY-MM-DD HH:mm:ss") : moment(h).format("YYYY-MM-DD HH:mm:ss") : "";
            case "Pointer":
                if (!f.objectId) return "";
                if ("string" == typeof a.cladatas[b][g]) return "";
                if (a.cladatas[b][g]) {
                    var i = a.cladatas[b][g].className,
                        j = a.cladatas[b][g].objectId,
                        k = "#" + i + "/" + a.currentCla.name + "/" + j;
                    return '<a href="' + k + '"    >' + j + " </a>"
                }
                return "";
            case "Relation":
                if (!f.objectId) return "";
                var i = a.cladatas[b][g] ? a.cladatas[b][g].className : "",
                    j = (a.currentCla.name, a.cladatas[b].objectId),
                    k = "#" + i + "/" + a.currentCla.name + "/" + j + "/" + g;
                return '<a href="' + k + '" >    Relations </a>';
            case "File":
                var l = a.cladatas[b][g] ? a.cladatas[b][g].url : "",
                    m = a.cladatas[b][g] ? a.cladatas[b][g].name : "",
                    j = a.cladatas[b].objectId;
                "function" == typeof m && (m = "");
                var n = '<div class="file-td-wrapper"    ><a class="file-link" target="_blank" href="' + l + '" >' + m + '</a><span class="cell-form"><input type="file" name="file" class="file-input" > <button class="btn btn-default btn-xs cell-btn file-upload fake-uploader">上传</button>';
                return l && (n += '<button class="btn btn-default btn-xs file-delete " ><span class="glyphicon glyphicon-remove file-delete"></span></button>'), n += "</span> </div>";
            case "GeoPoint":
                return "string" == typeof h ? h : h ? h.longitude + "," + h.latitude : "";
            case "ACL":
                var o, n = ' <button class="btn btn-default btn-xs cell-btn cell-acl-edit" >编辑</button> ';
                return o = h ? "object" == typeof h ? JSON.stringify(h) : h + n : "", '<span class="acl-cell-text">' + o + "</span>" + n;
            case "Array":
            case "Object":
                return h ? "object" == typeof h ? JSON.stringify(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : h.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
            default:
                return h
        }
    }, a.getEditDisplay = function(b, c, d, e, f) {
        var g = e.field,
            h = d;
        return "_User" == a.currentCla.name && "password" == g ? "" : a.currentCla.schema[g] ? "Date" == a.currentCla.schema[g].type ? h && "" != $.trim(h) ? h.__type && "Date" == h.__type ? moment(h.iso).format("YYYY-MM-DD HH:mm:ss") : moment(h).format("YYYY-MM-DD HH:mm:ss") : "" : "Pointer" == a.currentCla.schema[g].type ? h.objectId : "GeoPoint" == a.currentCla.schema[g].type ? h ? h.longitude + "," + h.latitude : "0,0" : "ACL" == a.currentCla.schema[g].type || "Object" == a.currentCla.schema[g].type || "Array" == a.currentCla.schema[g].type ? h ? JSON.stringify(h) : "" : h : h
    }, a.showRelation = function(a, b, d, e) {
        c.path(a + "/" + b + "/" + d + "/" + e)
    }, a.showPointer = function(b, d) {
        c.path(b + "/" + a.currentCla.name + "/" + d)
    }, a.toggleSelectAll = function() {
        a.allSelected = !a.allSelected, $("#datas :checkbox:visible").prop("checked", a.allSelected)
    }, a.emptyRows = [], a.requestPasswordReset = function(a) {
        AV.Object.extend("_User").requestPasswordReset(a, {
            success: function() {
                showmsg("发送密码重置邮件成功")
            },
            error: function(a) {
                showmsg(a.message, AVC.Error)
            }
        })
    }, a.addRow = function() {
        a.cladatas.unshift({})
    }, a.deleteRow = function() {
        var c = [];
        if (angular.forEach(grid.getSelectedRows(), function(b, d) {
            a.cladatas[b] && a.cladatas[b].objectId && c.push(a.cladatas[b].objectId)
        }), 0 != c.length) {
            var e = window.confirm("确认删除所有选中的数据?");
            e && b["delete"](purl + "data/" + getParam().appid + "/classes/" + d.claid + "/rows/" + c.join(",")).success(function() {
                a.currentCla.rows_count -= c.length;
                for (var b = 0; b < c.length; b++) A(c[b]);
                grid.setSelectedRows([])
            }).error(function(a) {
                showmsg(a.error, AVC.Error)
            })
        }
    }, a.deleteAllRows = function() {
        var c = window.confirm(f("DATA_DELETE_ALL_ROWS_TIP"));
        c && b["delete"](purl + "data/" + getParam().appid + "/classes/" + d.claid + "/rows").success(function() {
            a.cladatas = [], a.currentCla.rows_count = 0
        })
    }, a.showRowDetail = function(b, c) {
        k(function() {
            a.currentRowData = syntaxHighlight(a.cladatas[b])
        })
    }, a.isCurrentCellTextEditable = function() {
        if (!grid) return !1;
        var b = grid.getActiveCell();
        if (!b) return !1;
        if ("_File" == a.currentCla.name) return !1;
        var c = grid.getActiveCell().cell,
            d = grid.getColumns()[c];
        if (!a.currentCla.schema[d.field]) return !1;
        var e = a.currentCla.schema[d.field].type;
        return ["objectId", "createdAt", "updatedAt"].indexOf(d.field) > -1 ? !1 : ["Relation", "File", "Boolean"].indexOf(e) > -1 ? !1 : !0
    }, a.showEditCell = function() {
        a.isCurrentCellTextEditable() && (a.cellEditModal = j({
            template: "views/modal/cla-cell-edit-modal.html",
            scope: a,
            show: !0,
            container: "#cla_data"
        }))
    }, a.updateExistObjectToRelation = function(b) {
        var c = AV.Object.extend(d.parentCla),
            e = new c;
        e.id = d.objid;
        var f = AV.Object.extend(d.claid),
            g = e.relation(d.column),
            h = [];
        angular.forEach(grid.getSelectedRows(), function(b, c) {
            if (a.cladatas[b] && a.cladatas[b].objectId) {
                var d = new f;
                d.id = a.cladatas[b].objectId, h.push(d)
            }
        }), g[b](h), 0 != h.length && e.save(null, {
            success: function(c) {
                "add" == b ? location.hash = a.relationURL : "remove" == b && x()
            }
        })
    }, a.conditions = [{
        field: "",
        condition: "",
        value: ""
    }], a.addCondition = function() {
        var b = {
            field: "",
            condition: "",
            value: ""
        };
        a.conditions.push(b)
    }, a.reloadData = function() {
        window.location.reload()
    }, a.query = function(b) {
        "undefined" != typeof b && (a.currentPage = b), y(d.parentCla, d.objid, d.column)
    }, a.removeCondition = function(b) {
        a.conditions.splice(b, 1)
    }, a.hasNext = function() {
        if (a.currentCla && a.currentCla.rows_count <= 0) return !1;
        if (a.currentCla && a.currentCla.rows_count > 0) {
            if (a.currentCla.rows_count < a.pernum) return !1;
            if (a.currentPage >= a.currentCla.rows_count / a.pernum - 1) return !1
        }
        return !0
    }, a.hasPrevious = function() {
        return a.currentPage <= 0 ? !1 : !0
    }, a.loadpage = C, a.showNext = function() {
        a.currentPage++, C()
    }, a.showPrevious = function() {
        a.currentPage--, C()
    }, a.hasOpPermision = function() {
        return a.currentCla && "log" !== a.currentCla["class-type"]
    }, a.$on("loaddata", x)
}]), function() {
    "use strict";

    function a(a, b) {
        b.allVisible = !0, b.changeAllColumnVisible = function() {
            angular.forEach(b.schemaBak, function(a, c) {
                a.columnView = !b.allVisible
            })
        }, b.setColumnView = function() {
            b.currentCla.name, getParam().appid;
            b.state.hiddenColumns = [], angular.forEach(b.schemaBak, function(a, c) {
                a.columnView || b.state.hiddenColumns.push(c)
            }), localStorage["columns-view-" + getParam().appid + "-" + b.currentCla.name] = JSON.stringify(b.state.hiddenColumns), window.location.reload()
        }
    }
    angular.module("dataMod").controller("ColumnVisibleCtrl", ["$http", "$scope", a])
}(), $(function() {
    $(document).on("click", ".fake-uploader", function() {
        $(this).parents(".file-td-wrapper").find('input[type="file"]').click()
    })
}), function() {
    angular.module("dataMod").controller("CellEditCtrl", ["$http", "$scope", "$timeout", function(a, b, c) {
        function d() {
            l = ace.edit("cell-edit"), l.commands.addCommand({
                name: "myCommand",
                bindKey: {
                    win: "Ctrl-Enter",
                    mac: "Command-Enter"
                },
                exec: function(a) {
                    c(function() {
                        b.save()
                    })
                }
            }), l.setOptions({
                maxLines: 99999,
                minLines: 10
            }), l.setTheme("ace/theme/github"), l.setValue("" + j, 1), "Object" == h || "ACL" == h ? l.getSession().setMode("ace/mode/json") : l.getSession().setMode("ace/mode/text"), l.focus()
        }
        var e = grid.getActiveCell().row,
            f = grid.getActiveCell().cell,
            g = grid.getColumns()[f],
            h = b.currentCla.schema[g.field].type,
            i = b.cladatas[e][g.field],
            j = i ? b.getEditDisplay(e, f, i, g) : "";
        if ("ACL" == h || "Object" == h || "Array" == h) try {
            j = JSON.stringify(JSON.parse(j), null, 4)
        } catch (k) {}
        var l, m = b.cladatas[e];
        b.save = function() {
            var a = l.getValue().trim(),
                c = convertToType(a, h);
            c && c.type ? (a != j && (m[g.field] = l.getValue(), b.saveRow(e, f, l.getValue(), g, m)), b.cellEditModal.hide()) : ($("#cell-edit").addClass("error"), l.focus())
        }, c(function() {
            d()
        })
    }])
}(), angular.module("dataMod.import", []).controller("DataImportCtrl", ["$scope", "$http", "$timeout", "$route", function(a, b, c, d) {
    function e(d) {
        b.get(purl + "importer/" + d).success(function(b) {
            b.status && "done" == b.status ? (a.importError = "", showmsg("导入完成，注意查看邮件通知"), $("#screen-tip").modal("hide"), setTimeout(function() {
                window.location.reload()
            }, 2e3)) : b.status.indexOf("error") > -1 ? a.importError = b.status.split(":")[1] : (b.status.indexOf("importing") > -1 || "ready" == b.status) && (b.status.indexOf("importing") > -1 && (a.importPercent = b.status.split(":")[1]), c(function() {
                e(d)
            }, 1e3))
        }).error(function() {
            $("#screen-tip").modal("hide")
        })
    }
    a["import"] = {}, a.classFileChanged = function() {
        var b = $("#data-import-file")[0].files[0];
        c(function() {
            var c, d;
            b && (d = b.name.substring(0, b.name.indexOf(".")), /^[a-zA-Z][\w]*$/.test(d) && (c = d)), a["import"].importClass = c
        })
    }, a.createClass = function() {
        a.$broadcast("createclass")
    }, a.appid = getParam().appid, a.importClassData = function() {
        if ($("#import_class_data").hasClass("active")) {
            if (!a["import"].importClass) return showmsg("Class 名称不能为空", AVC.Error), !1;
            $("#import-submit").click()
        } else $("#import-relation-submit").click();
        $("#importData").modal("hide"), a.importError = "", $("#screen-tip").modal({
            show: !0
        })
    }, a.importUploaded = function(b, c) {
        c && b.length > 0 && (b = JSON.parse(b), b.id && e(b.id), b.error && (a.importError = b.error))
    }
}]), function() {
    var a = angular.module("dataMod.service", []);
    a.filter("fieldFilter", function() {
        return function(a) {
            var b = {};
            return angular.forEach(a, function(a, c) {
                ["ACL", "GeoPoint", "Relation", "File", "Object"].indexOf(a.type) < 0 && (b[c] = a)
            }), b
        }
    }), a.factory("Schema", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "data/" + getParam().appid + "/classes/:id", {
            id: "@id"
        }, {})
    }]), a.factory("SchemaLoader", ["Schema", "$q", function(a, b) {
        var c;
        return {
            get: function() {
                if (c) return c;
                var d = b.defer();
                return a.query(function(a) {
                    localDatas = a, d.resolve(a)
                }, function() {
                    d.reject("Unable to fetch recipes")
                }), c = d.promise, d.promise
            },
            fetch: function() {
                var d = b.defer();
                return a.query(function(a) {
                    localDatas = a, d.resolve(a)
                }, function() {
                    d.reject("Unable to fetch recipes")
                }), c = d.promise, d.promise
            }
        }
    }]), a.factory("AppSchema", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "data/:id/classes", {
            id: "@id"
        }, {})
    }]), a.factory("Column", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "data/" + getParam().appid + "/classes/:claid/columns/:id", {
            id: "@id",
            claid: "@claid"
        }, {
            rename: {
                method: "PUT"
            },
            update: {
                method: "PUT"
            }
        })
    }]), a.factory("Row", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "data/" + getParam().appid + "/classes/:claid/rows/:id", {
            id: "@id",
            claid: "@claid"
        }, {})
    }]), a.factory("indices", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "data/" + getParam().appid + "/classes/:claid/indices/:id", {
            id: "@id",
            claid: "@claid"
        }, {
            query: {
                method: "GET",
                isArray: !1
            }
        })
    }]), a.factory("BigqueryService", ["$http", "$q", "$timeout", function(a, b, c) {
        function d(b, e) {
            a.get(purl + "importer/" + b).success(function(a) {
                a.status && "done" == a.status ? e.resolve() : a.status.indexOf("error") > -1 ? e.reject(a.status.split(":")[1]) : (a.status.indexOf("importing") > -1 || "ready" == a.status) && c(function() {
                    d(b, e)
                }, 1e3)
            })
        }
        var e = {};
        return e.saveResultAsCla = function(c, e) {
            var f = b.defer();
            return a.post(purl + "bigquery/job/" + c + "/import/" + e).success(function(a) {
                a.id && d(a.id, f), a.error && f.reject(a.error)
            }), f.promise
        }, e
    }])
}(), function() {
    var a = angular.module("dataMod.column", ["dataMod.service"]);
    a.controller("ColumnCtrl", ["$scope", "$rootScope", "$http", "$routeParams", "Column", "indices", function(a, b, c, d, e, f) {
        a.delColumnName = a.currentColumn, a.preColumnName = a.currentColumn, a.prop = {}, a.addColumn = function() {
            var b = $("#createColumn input:text");
            if (!/^[a-zA-Z][\w]*$/.test(b.val())) return !1;
            var c = new e;
            c.claid = d.claid;
            var f = a.newColumnName,
                g = a.newColumnType;
            c.column = a.newColumnName, c.type = a.newColumnType, "number" == g.toLowerCase() && (c.auto_increment = a.columnIncrement), a.newColumnRelCla && (c.class_name = a.newColumnRelCla), c.required = a.columnRequired, c.comment = a.columnComment, c["default"] = a.columnDefault, c.hidden = a.columnHidden, c.read_only = a.read_only, "_User" == a.currentCla.name && (c.user_private = a.user_private), c.$save(function(b) {
                a.currentCla.schema[f] = {
                    type: g
                }, a.$emit("getClaMeta"), $("#createColumn").modal("hide"), $("#createColumn .text-error").text("")
            }, function(a) {
                $("#createColumn .text-error").text(a.error)
            }), b.val("")
        }, a.renameColumn = function() {
            e.rename({
                claid: d.claid,
                column: a.preColumnName,
                new_column: a.newColumnReName
            }, function(b) {
                a.$emit("getClaMeta")
            })
        }, a.deleteColumn = function() {
            var b = a.delColumnName;
            if (deleteColumn) {
                var c = new e;
                c.id = b, c.claid = d.claid, c.$delete(function(c) {
                    var d;
                    if (window.localStorage) {
                        d = localStorage["columns-" + getParam().appid + "-" + a.currentCla.name];
                        try {
                            d = d && JSON.parse(d)
                        } catch (e) {}
                        d && d.indexOf(b) && (d.splice(d.indexOf(b), 1), localStorage["columns-" + getParam().appid + "-" + a.currentCla.name] = JSON.stringify(d))
                    }
                    delete a.currentCla.schema[b], $("#deleteColumn").modal("hide"), a.$emit("getClaMeta")
                })
            }
        }
    }]), a.controller("ColumnEditCtrl", ["$http", "$scope", "Column", function(a, b, c) {
        var d = b.currentCla.schema[b.currentColumn];
        b.editColumnName = b.currentColumn, angular.forEach(d, function(a, c) {
            "object" == typeof a || "Array" == typeof a ? b.prop[c] = JSON.stringify(a) : b.prop[c] = a
        }), b.editColumn = function() {
            var a = new c;
            a.claid = b.currentCla.name;
            a.id = b.editColumnName;
            a.required = b.prop.required, a.comment = b.prop.comment, a["default"] = "" == b.prop["default"] ? null : b.prop["default"], a.hidden = b.prop.hidden, a.read_only = b.prop.read_only, "_User" == b.currentCla.name && (a.user_private = b.prop.user_private), "Number" == b.currentCla.schema[b.editColumnName].type && (a.auto_increment = b.prop.auto_increment, a.reset = b.prop.reset), a.$update().then(function() {
                b.$emit("getClaMeta")
            })
        }
    }]), a.controller("DataIndexCtrl", ["$scope", "$rootScope", "$http", "$routeParams", "Column", "indices", function(a, b, c, d, e, f) {
        a.newIndex = function() {
            var b = {},
                c = new f;
            c.claid = d.claid;
            for (var e = {}, g = 0; g < a.schemaarr.length; g++) if (a.schemaarr[g].selected) {
                var h = a.schemaarr[g].columnindex;
                ("1" == h || "-1" == h) && (h = parseInt(h)), b[a.schemaarr[g].columnname] = h
            }
            c.columns = b, c.options = e, c.options.unique = !0, a.sparse && (c.options.sparse = !0), c.$save(function() {
                for (var b = 0; b < a.schemaarr.length; b++) a.schemaarr[b].selected = !1;
                a.loadIndex()
            })
        }, a.loadIndex = function() {
            var a = new f;
            a.claid = d.claid, a.$query(function(a) {
                for (var c = [], d = 0; d < a.results.length; d++) {
                    var e = {};
                    "_id_" != a.results[d].name && (e.key = a.results[d].key, e.name = a.results[d].name, delete a.results[d].ns, delete a.results[d].key, delete a.results[d].name, e.option = {}, angular.forEach(a.results[d], function(a, b) {
                        e.option[b] = a
                    }), c.push(e))
                }
                b.indexes = c
            })
        }, a.deleteIndex = function(a, c) {
            var e = new f;
            e.claid = d.claid, e.id = c, e.$delete(function() {
                b.indexes.splice(a, 1)
            })
        }, a.loadIndex()
    }]), a.controller("ClaPermissionCtrl", ["$scope", "$http", "$routeParams", function(a, b, c) {
        a.getPermissionDisplay = function(a) {
            var b, c = 0,
                d = 0;
            return a["*"] === !0 ? b = "Public" : a.onlySignInUsers === !0 ? "SessionUsers" : (c = "string" == typeof a.roles && "" != a.roles.trim() ? a.roles.split(",").length : a.roles ? a.roles.length : 0, d = "string" == typeof a.users && "" != a.users.trim() ? a.users.split(",").length : a.users ? a.users.length : 0, b = c + " Roles, " + d + " Users")
        }, a.getPermissionClass = function(a) {
            var b;
            return b = a["*"] ? "field-public" : a.onlySignInUsers ? "field-restricted" : "field-private"
        }, a.setPermission = function(b, c) {
            a.permission = {
                prop: b
            }, a.permission.value = c, c.roles ? "string" == typeof c.roles && (a.permission.value.roles = c.roles.split(",")) : a.permission.value.roles = [], c.users ? "string" == typeof c.users && (a.permission.value.users = c.users.split(",")) : a.permission.value.users = []
        }
    }]), a.controller("ClaPermissionUpdateCtrl", ["$scope", "$http", "$routeParams", function(a, b, c) {
        a.$watch("permission.prop", function() {
            a.permission && (a.permission.value["*"] ? a.permissionType = "*" : a.permission.value.onlySignInUsers ? a.permissionType = "onlySignInUsers" : a.permissionType = "specified")
        }), a.addUser = function() {
            delete a.permission.value["*"];
            var b;
            angular.forEach(a.aclTipUser, function(c, d) {
                (c.username == a.userId || c.objectId == a.userId) && (b = c)
            }), b && -1 === a.permission.value.users.indexOf(b.objectId) && (a.permission.value.users.push(b.objectId), a.updatePermission({
                users: a.permission.value.users,
                roles: a.permission.value.roles
            }))
        }, a.removeUser = function(b) {
            a.permission.value.users.splice(a.permission.value.users.indexOf(b), 1), a.updatePermission({
                users: a.permission.value.users,
                roles: a.permission.value.roles
            })
        }, a.addRole = function() {
            delete a.permission.value["*"];
            var b;
            angular.forEach(a.aclTipRole, function(c, d) {
                (c.name == a.roleId || c.objectId == a.roleId) && (b = c)
            }), b && -1 === a.permission.value.roles.indexOf(b.name) && (a.permission.value.roles.push(b.name), a.updatePermission({
                users: a.permission.value.users,
                roles: a.permission.value.roles
            }))
        }, a.removeRole = function(b) {
            a.permission.value.roles.splice(a.permission.value.roles.indexOf(b), 1), a.updatePermission({
                users: a.permission.value.users,
                roles: a.permission.value.roles
            })
        }, a.updatePermission = function(d) {
            var e = {
                permissions: {}
            };
            e.permissions[a.permission.prop] = d, b.put(purl + "data/" + getParam().appid + "/classes/" + c.claid + "/permissions", e).success(function(b) {
                $("#permissionedit").modal("hide"), a.$emit("getClaMeta"), a.userId = "", a.roleId = ""
            }).error(function(a) {
                showmsg(a.error, AVC.Error)
            })
        }, a.$watch("permissionType", function() {
            if (a.permission) {
                var b = {};
                "*" == a.permissionType || "onlySignInUsers" == a.permissionType ? (b[a.permissionType] = !0, b.users = [], b.roles = []) : b = {
                    users: a.permission.value.users && a.permission.value.users.join(","),
                    roles: a.permission.value.roles && a.permission.value.roles.join(",")
                }, a.updatePermission(b)
            }
        })
    }]), a.controller("ClaShareCtrl", ["$scope", "$http", "AppSchema", "$routeParams", function(a, b, c, d) {
        function e(b) {
            c.query({
                id: b
            }, function(b) {
                a.claSchema = b
            })
        }
        function f() {
            b.get(purl + "data/" + getParam().appid + "/classes/" + d.claid + "/bind").then(function(b) {
                a.currentSharedCla = b.data, a.apps.all.forEach(function(b, c) {
                    b.app_id == a.currentSharedCla.app_id && (a.currentSharedCla.app_name = b.app_name, a.targetShareApp = b)
                }), a.targetShareCla = a.currentSharedCla["class"]
            })
        }
        a.targetSharePermission = {
            read: !1,
            write: !1,
            "delete": !1
        }, a.$watch("targetShareApp", function() {
            a.targetShareApp && e(a.targetShareApp.app_id)
        }), a.$watch("targetShareCla", function() {
            return a.currentSharedCla && a.targetShareApp.app_id == a.currentSharedCla.app_id && a.currentSharedCla["class"] == a.targetShareCla ? (a.targetSharePermission.read = a.currentSharedCla.read, a.targetSharePermission.write = a.currentSharedCla.write, void(a.targetSharePermission["delete"] = a.currentSharedCla["delete"])) : void(a.targetSharePermission = {
                read: !1,
                write: !1,
                "delete": !1
            })
        }), f(), a.hasShared = function() {
            return a.currentSharedCla && a.currentSharedCla.app_name ? !0 : !1
        }, a.shareCla = function() {
            b.post(purl + "data/" + getParam().appid + "/classes/" + d.claid + "/bind", {
                app_id: a.targetShareApp.app_id,
                "class": a.targetShareCla,
                read: a.targetSharePermission.read,
                write: a.targetSharePermission.write,
                "delete": a.targetSharePermission["delete"]
            }).then(function() {
                delete localStorage["columns-" + getParam().appid + "-" + a.currentCla.name], delete localStorage["columns-view-" + getParam().appid + "-" + a.currentCla.name], showmsg("Class 绑定操作成功"), setTimeout(function() {
                    window.location.reload()
                }, 500)
            })
        }, a.deleteShareCla = function() {
            b["delete"](purl + "data/" + getParam().appid + "/classes/" + d.claid + "/bind").then(function() {
                delete localStorage["columns-" + getParam().appid + "-" + a.currentCla.name], delete localStorage["columns-view-" + getParam().appid + "-" + a.currentCla.name], showmsg("解除绑定操作成功"), setTimeout(function() {
                    window.location.reload()
                }, 500)
            })
        }, a.appNotCurrent = function() {
            return function(b) {
                return b.app_name !== a.currentApp.app_name
            }
        }
    }]), a.controller("AppSearchCtrl", ["$scope", "$http", "App", "SchemaLoader", function(a, b, c, d) {
        a.appSearch = {
            uri_host: "avoscloud"
        }, a.searchColumnMap = {}, a.appSearchConfig = {
            fields: []
        }, c.then(function(b) {
            a.appSearch.app_name = b.app_name
        });
        var e = (purl + "data/apps/" + getParam().appid + "/deeplink", purl + "data/apps/" + getParam().appid);
        a.loadClaOptions = function() {
            b.get(e + "/" + a.currentCla.name + "/search").success(function(b) {
                $.extend(a.appSearchConfig, b), angular.forEach(a.appSearchConfig.fields, function(b, c) {
                    a.searchColumnMap[b] = !0
                })
            })
        }, a.saveSearchClaConfig = function() {
            a.appSearchConfig.fields = [], angular.forEach(a.searchColumnMap, function(b, c) {
                b && a.appSearchConfig.fields.push(c)
            }), b.post(e + "/" + a.currentCla.name + "/search", a.appSearchConfig).success(function(a) {})
        }, a.forceRebuildIndex = function() {
            b.post(e + "/" + a.currentCla.name + "/searchIndexBuild").success(function(a) {
                showmsg("重建完成后将会收到邮件通知")
            })
        }, a.loadClaOptions()
    }]), a.filter("searchColumnFilter", function() {
        return function(a, b) {
            var c = {};
            return angular.forEach(a, function(a, b) {
                return ["objectId", "ACL", "createdAt", "updatedAt"].indexOf(b) < 0 ? c[b] = a : void 0
            }), c
        }
    })
}();
var STAT_TIPS = {
        items: {
            new_user: "第一次使用应用的用户，以设备为判断标准，一个设备对应一个用户",
            active_user: "在一定时间段内使用过应用的用户，启动应用一次即视为活跃用户，包括新增用户和老用户。",
            accumulate_user: "应用从开始收集统计数据到现在的全部用户总数（去重）",
            session: "启动应用的总次数（应用切换至后台一段时间，再切换至前台算一次新的启动）",
            dau: "一日活跃用户去重后的总数",
            wau: "一周活跃用户去重后的总数",
            mau: "一个月活跃用户去重后的总数",
            avg_user_time: "平均每个用户一天使用应用的总时长（多次启动累计）",
            avg_session_time: "平均用户每次使用的时长",
            page_visit_rank: "用户访问次数从高到低的页面排名",
            page_duration_rank: "用户停留总时间从长到短的的页面排名",
            avg_page_count: "平均每个用户访问的页面总数（反复访问例如：A -> B -> A 算 3 个页面）",
            avg_page_duration: "平均每个用户在所有页面停留的总时长",
            event_pv: "事件发生的总数",
            event_uv: "有多少用户触发了此事件（相同用户多次触发算一个用户数）",
            event_du: "事件的累积时长",
            push_login: "当日连接到推送服务的安卓设备数，iOS 设备通过苹果服务推送不在此统计之列",
            push_ack: "当日收到推送消息的安卓设备数。对于当日因离线或其他原因次日收到多条推送的设备，这个计数会合并到次日，所以此计数仅作为活跃设备数参考，并不代表单条推送到达率。",
            push_session: "当日聊天登录数",
            push_direct: "当日聊天消息数",
            lost_user_7: "从上次活跃到本日已经有 7 天未使用应用的用户数量",
            lost_user_rate_7: "流失用户数比活跃用户数，当日的流失用户数占 7 天前的活跃用户总数的比例",
            lost_user_14: "从上次活跃到本日已经有 14 天未使用应用的用户数量",
            lost_user_rate_14: "流失用户数比活跃用户数，当日的流失用户数占 14 天前的活跃用户总数的比例"
        },
        page: {
            usefrequence: "按每天使用次数划分，各使用频率的用户数占比",
            userstay: "用户 n 日存留率，表示某日产生的新用户中，在 n 天后当天还有使用应用的用户数的百分比。例如，10 月 1 日新产生用户 100 人，10 月 2 日还有 30 人使用，则次日存留率 30%。7 天后，10 月 8 号这 100 人中有 10 人启动过应用，则 7 日存留率 10%",
            "customevent-eventid": "事件触发/启动次数，表示平均一次启动发生多少次事件，用户参与度表示，活跃用户中有多少比例的用户触发了此事件。",
            usepath: "一个节点上的次数和百分比，表示从起点通过蓝色路径访问到当前页面的次数总数和它占全部路径的百分比",
            channelpromotion: "在 <a href='#/statconfig/channels'>推广营销设置</a> 中 ，设置应用下载链接并创建推广渠道链接。可以跟踪各个推广链接的点击数和由相应推广链接所产生的实际安装激活数",
            appuse: "需要在 SDK 中进行相应的调用才可以触发此部分统计，请参考相应的消息推送指南。",
            statrealtime: "活跃用户指最近五分钟内活跃的用户"
        },
        usetip: {
            chatpush: "<p>通过我们的实时通信服务您可以开发实时的用户间聊天、游戏对战等互动功能</p> <p><a class='btn btn-default' href='/docs/realtime_v2.html'>查看「实时通信」相关文档</a></p>",
            usepath: "<p>统计数据请开启页面路径统计功能</p> <p><a class='btn btn-default' href='/docs/android_statistics.html#统计页面路径'>查看「统计页面路径」相关文档</a></p>",
            pagevisit: "<p>统计数据请开启页面路径统计功能</p> <p><a class='btn btn-default' href='/docs/android_statistics.html#统计页面路径'>查看「统计页面路径」相关文档</a></p>",
            appuse: "<p>跟踪推送打开和应用打开的相关数据</p> <p><a class='btn btn-default' href='/docs/android_push_guide.html#跟踪_Android_推送和应用的打开情况'>查看「App 使用」相关文档</a></p>"
        }
    },
    statConfig = {
        summary: {
            chart: [{
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }],
            table: [{
                name: "type",
                displayName: "类型"
            }, {
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }],
            tableDisplayFunc: function(a, b) {
                if (b || (b = "0"), "total" == b) return "总计";
                if ("type" == a) {
                    var c = b.toLowerCase();
                    return "<a href='stat.html?appid=" + getParam().appid + "&os=" + c + "#/stat/keydata'>" + b + "</a>"
                }
                return b
            }
        },
        keydata: {
            chart: [{
                name: "new_user",
                displayName: "新增用户",
                tableEvent: "keydata"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }],
            table: [{
                name: "date",
                displayName: "日期"
            }, {
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }]
        },
        versiondata: {
            chart: [{
                name: "new_user",
                displayName: "新增用户",
                tableEvent: "versiondata"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }, {
                name: "upgrade_user",
                displayName: "升级用户"
            }],
            table: [{
                name: "version",
                displayName: "版本名称"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }, {
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "new_user_rate",
                displayName: "占比"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "active_user_rate",
                displayName: "占比"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "upgrade_user",
                displayName: "升级用户"
            }]
        },
        channeldata: {
            chart: [{
                name: "new_user",
                displayName: "新增用户",
                tableEvent: "channeldata"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }],
            table: [{
                name: "version",
                displayName: "渠道名称"
            }, {
                name: "accumulate_user",
                displayName: "累计用户"
            }, {
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "new_user_rate",
                displayName: "占比"
            }, {
                name: "active_user",
                displayName: "活跃用户"
            }, {
                name: "active_user_rate",
                displayName: "占比"
            }, {
                name: "session",
                displayName: "启动次数"
            }]
        },
        audata: {
            chart: [{
                name: "dau",
                displayName: "日活跃",
                tableEvent: "audata"
            }, {
                name: "wau",
                displayName: "周活跃"
            }, {
                name: "dau-wau",
                displayName: "日活跃/周活跃"
            }, {
                name: "mau",
                displayName: "月活跃"
            }, {
                name: "dau-mau",
                displayName: "日活跃/月活跃"
            }],
            table: [{
                name: "date",
                displayName: "日期"
            }, {
                name: "dau",
                displayName: "日活跃"
            }, {
                name: "wau",
                displayName: "周活跃"
            }, {
                name: "dau-wau",
                displayName: "日活跃/周活跃"
            }, {
                name: "mau",
                displayName: "月活跃"
            }, {
                name: "dau-mau",
                displayName: "日活跃/月活跃"
            }]
        },
        appuse: {
            chart: [{
                name: "!AV!AppOpen",
                displayName: "App 打开"
            }, {
                name: "!AV!PushOpen",
                displayName: "Push 打开"
            }],
            table: []
        },
        chatpush: {
            chart: [{
                name: "push_login",
                displayName: "Push 用户数"
            }, {
                name: "push_ack",
                displayName: "Push 到达数"
            }],
            table: []
        },
        usepath: {
            chart: [],
            table: []
        },
        usetime: {
            chart: [{
                name: "avg_user_time",
                displayName: "人均使用时长",
                displayTitle: "人均使用时长(时:分:秒)",
                tableEvent: "user_time_histo"
            }, {
                name: "avg_session_time",
                displayName: "次均使用时长",
                displayTitle: "次均使用时长(时:分:秒)",
                tableEvent: "session_time_histo"
            }],
            table_user_time_histo: [{
                name: "name",
                displayName: "使用时长"
            }, {
                name: "active_user",
                displayName: "活跃用户数"
            }, {
                name: "active_user_rate",
                displayName: "活跃用户数占比"
            }, {
                name: "new_user",
                displayName: "安装用户数"
            }, {
                name: "new_user_rate",
                displayName: "安装用户数占比"
            }],
            table_session_time_histo: [{
                name: "name",
                displayName: "使用时长"
            }, {
                name: "session",
                displayName: "启动次数"
            }, {
                name: "session_rate",
                displayName: "占比"
            }]
        },
        usefrequence: {
            chart: [],
            table: [{
                name: "name",
                displayName: "使用频率"
            }, {
                name: "active_user",
                displayName: "活跃用户数"
            }, {
                name: "active_user_rate",
                displayName: "占比"
            }, {
                name: "new_user",
                displayName: "安装数"
            }, {
                name: "new_user_rate",
                displayName: "占比"
            }]
        },
        pagevisit: {
            chart: [{
                name: "page_visit_rank",
                displayName: "页面访问排名",
                tableEvent: "avg_visit"
            }, {
                name: "avg_page_count",
                displayName: "人均页面访问数"
            }, {
                name: "page_duration_rank",
                displayName: "页面停留时长",
                displayTitle: "页面停留时长(时:分:秒)"
            }, {
                name: "page_avg_duration",
                displayName: "页面平均访问时长",
                displayTitle: "页面平均访问时长(时:分:秒)"
            }, {
                name: "page_exit_rate",
                displayName: "页面跳出率"
            }],
            table: [{
                name: "date",
                displayName: "日期"
            }, {
                name: "count",
                displayName: "人均页面访问数"
            }, {
                name: "duration",
                displayName: "人均访问时长(时:分:秒)"
            }]
        },
        userstay: {
            chart: [{
                name: "lost_user_7",
                displayName: "7 天流失"
            }, {
                name: "lost_user_rate_7",
                displayName: "7 天流失率"
            }, {
                name: "lost_user_14",
                displayName: "14 天流失"
            }, {
                name: "lost_user_rate_14",
                displayName: "14 天流失率"
            }],
            table: [{
                name: "date",
                displayName: "首次启动日"
            }, {
                name: "new_user",
                displayName: "新增用户"
            }, {
                name: "s1",
                displayName: "次日"
            }, {
                name: "s2",
                displayName: "2天后"
            }, {
                name: "s3",
                displayName: "3天后"
            }, {
                name: "s4",
                displayName: "4天后"
            }, {
                name: "s5",
                displayName: "5天后"
            }, {
                name: "s6",
                displayName: "6天后"
            }, {
                name: "s7",
                displayName: "7天后"
            }, {
                name: "s14",
                displayName: "14天后"
            }, {
                name: "s30",
                displayName: "30天后"
            }]
        },
        userclient: {
            chart: [{
                name: "os_version",
                displayName: "操作系统版本"
            }, {
                name: "device_model",
                displayName: "设备型号"
            }, {
                name: "access",
                displayName: "网络环境"
            }, {
                name: "carrier",
                displayName: "运营商"
            }, {
                name: "resolution",
                displayName: "分辨率"
            }]
        },
        userlocation: {
            chart: [{
                name: "location",
                displayName: "用户地理位置分布"
            }, {
                name: "location_new_user",
                displayName: "新增用户地理位置分布"
            }]
        },
        customevent: {
            chart: [],
            table: [{
                name: "event",
                displayName: "事件ID"
            }, {
                name: "total-pv",
                displayName: "事件总数"
            }, {
                name: "today-pv",
                displayName: "今日"
            }],
            tableDisplayFunc: function(a, b) {
                return b || (b = "0"), "event" == a ? "<a href='#/stat/custom/" + b + "'>" + b + "</a>" : b
            }
        },
        custom: {
            chart: [{
                name: "event_pv",
                displayName: "事件触发数"
            }, {
                name: "event_uv",
                displayName: "独立用户数"
            }, {
                name: "event_du",
                displayName: "事件时长",
                displayTitle: "事件时长(时:分:秒)"
            }, {
                name: "event_new_user",
                displayName: "当日新用户"
            }, {
                name: "event_accumulate_user",
                displayName: "累计用户数"
            }],
            table: [{
                name: "date",
                displayName: "日期"
            }, {
                name: "pv",
                displayName: "事件触发数"
            }, {
                name: "event_session",
                displayName: "事件触发数/启动次数"
            }, {
                name: "uv",
                displayName: "独立用户数"
            }, {
                name: "uv_au",
                displayName: "用户参与度"
            }, {
                name: "du",
                displayName: "事件时长(时:分:秒)"
            }]
        },
        channelpromotion: {
            chart: [{
                name: "channel_pv",
                displayName: "总点击",
                tableEvent: "channel_total"
            }, {
                name: "channel_m_pv",
                displayName: "移动端点击"
            }, {
                name: "channel_install",
                displayName: "激活"
            }, {
                name: "channel_active_rate",
                displayName: "激活率"
            }],
            table: [{
                name: "name",
                displayName: "渠道名称"
            }, {
                name: "pv",
                displayName: "总点击"
            }, {
                name: "m_pv",
                displayName: "移动端点击"
            }, {
                name: "install",
                displayName: "激活"
            }, {
                name: "active_rate",
                displayName: "激活率"
            }]
        },
        crashstat: {
            chart: [{
                name: "crash",
                displayName: "错误数"
            }, {
                name: "crash_session",
                displayName: "错误数／启动数"
            }]
        },
        crashreport: {
            tableEvent: "crash",
            table: [{
                name: "reason",
                displayName: "错误摘要"
            }, {
                name: "version",
                displayName: "版本"
            }, {
                name: "count",
                displayName: "错误数"
            }, {
                name: "time",
                displayName: "时间"
            }],
            tableDisplayFunc: function(a, b, c, d) {
                return "reason" == a ? '<a ng-click="setCurrentCrashDetail($parent.data)" >' + htmlEntities(b) + "</a>" : b
            }
        },
        eventfunnel: {
            chart: [{
                name: "funnel",
                displayName: "分步转化",
                tableEvent: "funnel"
            }, {
                name: "funnel_rate_trend",
                displayName: "转化趋势(按比例)",
                tableEvent: "funnel_rate"
            }],
            table_funnel: [{
                name: "name",
                displayName: "事件"
            }, {
                name: "count",
                displayName: "用户数"
            }, {
                name: "prev_rate",
                displayName: "上一步转化率"
            }, {
                name: "total_rate",
                displayName: "总体转化率"
            }]
        },
        funnel_config: {
            table: [{
                name: "name",
                displayName: "名称"
            }, {
                name: "steps",
                displayName: "事件步骤"
            }],
            tableDisplayFunc: function(a, b, c, d) {
                return "name" == a ? '<a href="#stat/eventfunnel/' + c.id + '">' + b + "</a>" : b
            }
        }
    },
    statConfigModule = angular.module("statconfig", []);
statConfigModule.directive("statTdCell", ["$compile", function(a) {
    return {
        link: function(b, c, d) {
            var e = b.label,
                f = b.data;
            c.html(b.tableDisplayFunc(e.name, f[e.name], f, b.$parent.data)), a(c.contents())(b)
        }
    }
}]), statConfigModule.directive("statTraceDetail", ["$compile", function(a) {
    return {
        link: function(b, c, d) {
            b.errorTraceToggle = !1;
            var e = '<pre style="display:none"><code> dwarfdump --arch=armv7 `mdfind "com_apple_xcode_dsym_uuids == {uuid}"` --lookup {memory} | grep "Line\\ table"</code></pre>';
            b.errorTraceVisible = [], b.setCurrentTrace = function(a) {
                angular.element(a.target).parent("div").find("pre").toggle()
            }, b.$watch("statCurrentError", function() {
                var d = b.statCurrentError;
                if (d && d.trace) {
                    var f = d.bid,
                        g = d.display_name,
                        h = /\b0x\w*\b/,
                        i = d.trace,
                        j = [];
                    j.push('<div class="stat-crash-title thread-title">' + d.reason + "</div>"), "ios" != b.statPlat || d.symbolized || j.push('<div class="stat-crash-tip"><div class="callout callout-info">还没有上传符号文件，请查看 <a href="/docs/ios_crashreporting_guide.html#符号化">相关文档</a> 获得更多信息</div>');
                    for (var k = 0; k < i.length; k++) {
                        var l = i[k];
                        if (l = htmlEntities(l), f && "" != f.trim()) if (l.indexOf(g) > -1) {
                            var m = l.match(h),
                                n = l.split(h);
                            j.push('<div class="trace-line">'), j.push(n[0] + "<a ng-click='setCurrentTrace($event)'>" + m + "</a>" + n[1]), j.push(e.replace("{uuid}", f).replace("{memory}", m)), j.push("</div>")
                        } else j.push("<div >"), j.push(l), j.push("</div>");
                        else j.push("<div>"), j.push(l), j.push("</div>")
                    }
                    angular.forEach(d.other_threads, function(a, b) {
                        j.push('<div class="thread-title"> Thread ' + (b + 1) + "</div>"), angular.forEach(a, function(a, b) {
                            j.push('<div class="trace-line">' + a + "</div>")
                        })
                    }), c.html(j.join("")), a(c.contents())(b)
                }
            })
        }
    }
}]), statConfigModule.directive("myInputEdit", ["$compile", function(a) {
    return {
        restrict: "A",
        link: function(b, c, d) {
            c.on("dblclick", function(e) {
                var f, g, h = d.prop;
                "id" == h ? (f = b.key, g = '<input type="text"    value="' + f + '" >') : (f = b.value[h], g = '<input type="text" ng-model="value' + h + '" value="' + f + '" >'), compiled = a(g)(b), c.html(compiled), c.find("input").on("blur", function() {
                    c.text($(this).val()), b.updateStatCustomParam(b.key, h, $(this).val())
                })
            })
        }
    }
}]), angular.module("statMod", ["appMod", "statconfig", "ngTable", "statMod.other", "statConfigMod"]);
var remoteURL = "/1/stats/";
angular.module("statMod").config(["$routeProvider", function(a) {
    a.when("/stat/:statpageid", {
        templateUrl: "views/app-stat.html",
        controller: "StatQueryCtrl"
    }).when("/statrealtime", {
        templateUrl: "views/stat-realtime.html",
        controller: "StatRealtimeCtrl"
    }).when("/stat/:statpageid/:eventid", {
        templateUrl: "views/app-stat.html",
        controller: "StatQueryCtrl"
    }).when("/selfconfig/funnel_config", {
        templateUrl: "views/app-stat-event-funnel.html",
        controller: "EventFunnelCtrl"
    }).when("/selfconfig/usergroup", {
        templateUrl: "views/stat-user-group-list.html",
        controller: "UserGroupCtrl"
    }).when("/selfconfig/usergroup/:groupid", {
        templateUrl: "views/stat-user-config.html",
        controller: "UserGroupCreateCtrl"
    }).when("/statconfig/trans_strategoy", {
        templateUrl: "views/app-stat-tranconfig.html",
        controller: "analyticsDataSetting"
    }).otherwise({
        redirectTo: "/statrealtime"
    })
}]), angular.module("statMod").value("$strapConfig", {
    datepicker: {
        language: "zh-CN"
    }
}), angular.module("statMod").controller("StatCtrl", ["$scope", "$http", "$location", "filterFilter", "apps", "$routeParams", "$rootScope", "$location", function(a, b, c, d, e, f, g, c) {
    a.$on("$routeChangeSuccess", function(b, d) {
        a.isStatConfig = /^\/statconfig\//.test(c.path()), a.noCondition = /\/chatpush/.test(c.path())
    }), a.routeCtrlMap = {
        crashreport: "views/analytics/stat-crashreport.html",
        crashstat: "views/analytics/stat-crashstat.html"
    }, a.apps = e, a.pagestat = statConfig, a.appid = getParam().appid, a.startTime = moment().subtract("days", 6).toDate(), a.endTime = moment().toDate(), a.rangeDateSelector = !0, g.statPlat = "all", g.statSelected = $.cookie("stat-last-selected"), a.hasStatPlatAll = !0, a.loadPlats = function() {
        var c = {
            column: "platform",
            appid: a.appid
        };
        b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.availablePlats = b
        })
    }, a.platMap = {
        ios: "iOS",
        android: "Android",
        osx: "OSX",
        unity: "Unity",
        windows: "Windows"
    }, a.loadPlats(), a.statpageid = f.statpageid, a.hasStatPlatAll = ["usepath", "crashreport", "versiondata", "channeldata"].indexOf(a.statpageid) > -1 ? !1 : !0, g.statSelected ? a.hasStatPlatAll || "all" != g.statSelected ? g.statPlat = g.statSelected : g.statPlat = "ios" : a.hasStatPlatAll ? g.statPlat = "all" : g.statPlat = "ios", a.getChartOption = function() {
        return {
            chart: {
                type: "areaspline"
            },
            title: {
                x: 0
            },
            yAxis: {
                allowDecimals: !1,
                min: 0,
                gridLineColor: "#f4f1f1",
                title: {
                    text: ""
                },
                labels: {
                    overflow: "justify"
                }
            },
            xAxis: {
                labels: {
                    overflow: "justify"
                },
                tickPixelInterval: 200
            },
            tooltip: {},
            plotOptions: {
                areaspline: {
                    fillOpacity: .4
                }
            },
            credits: {
                enabled: !1
            },
            series: [{
                data: []
            }],
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: [{
                            text: "导出为 PNG",
                            onclick: function() {
                                this.exportChart()
                            },
                            separator: !1
                        }]
                    }
                }
            }
        }
    }, a.setPageTip = function(b) {
        var b = b || f.statpageid,
            c = a.pagestat[b] && a.pagestat[b].chart,
            d = [];
        if (c) for (var e = 0; e < c.length; e++) STAT_TIPS.items[c[e].name] && d.push({
            desc: STAT_TIPS.items[c[e].name],
            name: c[e].displayName
        });
        a.tipitems = d, a.tippage = STAT_TIPS.page[b], a.hastip = a.tipitems.length || a.tippage, a.tipuse = STAT_TIPS.usetip[b]
    }
}]), angular.module("statMod").controller("StatQueryCtrl", ["$scope", "$http", "$routeParams", "$timeout", "$rootScope", "$location", "$timeout", "$compile", "ngTableParams", function(a, b, c, d, e, f, d, g, h) {
    function i() {
        a.startTime = moment().subtract("days", 7), a.endTime = moment().subtract("days", 1), a.maxTime = a.endTime, a.maxContrastTime = moment(a.maxTime).format("YYYY-MM-DD")
    }
    function j() {
        a.tableEvent = "event_summary", a.isCustomEvent = !0, a.selectedErrors = {
            checked: !1,
            items: {}
        }, a.$watch("selectedErrors.checked", function(b) {
            angular.forEach(a.statErrors, function(c) {
                angular.isDefined(c.event) && (a.selectedErrors.items[c.event] = b)
            })
        }), a.$watch("selectedErrors.items", function(b) {
            if (a.statErrors) {
                var c = 0,
                    d = 0,
                    e = a.statErrors.length;
                angular.forEach(a.statErrors, function(b) {
                    c += a.selectedErrors.items[b.event] || 0, d += !a.selectedErrors.items[b.event] || 0
                }), (0 == d || 0 == c) && (a.selectedErrors.checked = c == e)
            }
        }, !0), a.updateCustomState = function() {
            var c = window.confirm("禁用选中事件后，将不再对禁用的事件进行统计");
            if (c) {
                var d = [];
                angular.forEach(a.selectedErrors.items, function(a, b) {
                    a && d.push(b)
                }), b.post(remoteURL + "apps/" + getParam().appid + "/event", {
                    os: a.statPlat,
                    events: d.join(",")
                }).success(function(b) {
                    a.tableParams.reload(), a.selectedErrors.items = {}
                })
            }
        }
    }
    function k() {
        function b() {
            q(function(b) {
                a.tableEventDatas = b.stats
            }, "event_attributes_pv")
        }
        a.customEventId = c.eventid, a.tableEvent = "event", a.currentEventParam = a.customEventId, a.tableDisplayFunc = function(a, b) {
            return b || (b = "0"), "du" == a ? b = secondFormat(b) : "date" == a && (b = moment(b, "YYYYMMDD").format("YYYY-MM-DD")), b
        }, a.$watch("startTime && endTime", b), a.loadEventParams(), a.$watch("startTime && endTime", a.loadEventParams), a.$watch("statchannels", a.loadEventParams), a.$watch("statversions", a.loadEventParams), a.$watch("statchannels", b), a.$watch("statversions", b), a.tableEventLabels = [{
            name: "name",
            displayName: "参数值"
        }, {
            name: "value",
            displayName: "事件触发数"
        }, {
            name: "rate",
            displayName: "占比"
        }], a.setCurrentEventParam = function(b) {
            a.currentEventParam = b
        }, a.$watch("currentEventParam", b)
    }
    function l() {
        function b(b) {
            a.$watch("eventname", function() {
                angular.forEach(a.pagestat[c.statpageid].chart, function(b, d) {
                    b.name == a.eventname && (a.tableEvent = b.tableEvent, a.tableLabels = a.pagestat[c.statpageid]["table_" + a.tableEvent])
                }), a.queryTable()
            })
        }
        a.contrastDate = moment(a.endTime).subtract("months", 1).format("YYYY-MM-DD"), a.$watch("contrastDate", function() {
            return a.contrastClicked ? a.contrastDate ? void(moment(a.contrastDate).format("YYYY-MM-DD") != moment(a.endTime).subtract("days", 6).format("YYYY-MM-DD") && s()) : void(a.contrastDate = moment(a.endTime).subtract("days", 6).toDate()) : void 0
        });
        var d = c.statpageid;
        a.rangeDateSelector = !0, a.loadByDate = m, a.charType = "areaspline", a.versionSelector = ["versionSelector", "channelpromotion"].indexOf(d) > -1 ? !1 : !0, a.channelSelector = ["channelpromotion", "channeldata"].indexOf(d) > -1 ? !1 : !0;
        var f, g, h = function(b) {
            a.tableDatas = b.stats
        };
        if (a.pagestat[c.statpageid]) {
            if (a.setPageTip(), a.tableDisplayFunc = a.pagestat[c.statpageid].tableDisplayFunc ||
                function(a, b) {
                    return b || (b = "0"), b
                }, a.pagestat[c.statpageid].chart && a.pagestat[c.statpageid].chart[0] && (a.eventname = a.pagestat[c.statpageid].chart[0].name, a.tableEvent = a.pagestat[c.statpageid].chart[0].tableEvent), a.pagestat[c.statpageid].tableEvent && (a.tableEvent = a.pagestat[c.statpageid].tableEvent), a.pagestat[c.statpageid] && (a.chartLabels = a.pagestat[c.statpageid].chart, a.tableLabels = a.pagestat[c.statpageid].table), a.maxTime = moment(), a.maxContrastTime = moment(a.maxTime).format("YYYY-MM-DD"), ["versiondata", "channeldata", "usetime"].indexOf(d) > -1 && a.$watch("endTime", function() {
                a.hasSelectDate ? a.tableTitle = "- " + moment(a.endTime).format("YYYY-MM-DD") : a.tableTitle = "- " + moment(a.endTime).subtract("days", 1).format("YYYY-MM-DD"), a.tableStartDate = a.tableEndDate = moment(a.endTime).format("YYYYMMDD")
            }), a.isChannelPage = "channeldata" == d, a.isVersionPage = "versiondata" == d, ["usepath", "usetime", "usefrequence", "pagevisit", "userstay", "userclient", "userlocation", "audata"].indexOf(d) > -1 && i(), ["usepath", "usefrequence", "customevent"].indexOf(d) > -1 && (a.chartHide = !0), "usetime" == d && (a.tableStartDate = a.tableEndDate = moment().subtract("days", 1).format("YYYYMMDD"), b()), "usepath" == d && a.loadVisitPath(), "usefrequence" == c.statpageid) a.tableTime = moment().subtract("days", 1).format("YYYY-MM-DD"), a.maxTableTime = moment(a.tableTime).format("YYYY-MM-DD"), a.$watch("tableTime", function() {
                a.loadChannels(), a.loadVersions(), a.tableStartDate = a.tableEndDate = moment(a.tableTime).format("YYYYMMDD"), a.queryTable()
            }), a.eventname = "active_user_freq", a.tableEvent = "active_user_freq", a.tableDateSelector = !0, a.rangeDateSelector = !1;
            else if ("pagevisit" == c.statpageid) h = function(b) {
                angular.forEach(b.stats, function(a, b) {
                    a.duration = secondFormat(a.duration)
                }), a.tableDatas = b.stats
            };
            else if ("userstay" == c.statpageid) a.tableTitle = "（用户留存）", a.tableEvent = "user_survive";
            else if ("customevent" == c.statpageid) j();
            else if ("eventfunnel" == c.statpageid) a.funnelId = c.eventid, angular.forEach(e.funnels, function(b, c) {
                b.id == a.funnelId && (a.currentFunnel = b)
            }), h = function(b) {
                "funnel_rate" == a.tableEvent && b.stats && b.stats[0] ? (a.tableDatas = b.stats, a.tableLabels = [{
                    name: "date",
                    displayName: "日期"
                }], angular.forEach(b.stats[0], function(b, c) {
                    "date" != c && "rate" != c && a.tableLabels.push({
                        name: c,
                        displayName: c
                    })
                }), a.tableLabels.push({
                    name: "rate",
                    displayName: "转化率"
                })) : a.tableDatas = b.stats
            }, b(h);
            else if ("custom" == c.statpageid) k();
            else if ("audata" == c.statpageid) {
                var l = moment().subtract("days", 1).format("YYYYMMDD");
                f = g = l, h = function(b) {
                    a.yesterdayActiveData = b.stats[0]
                }
            } else "channelpromotion" == c.statpageid && (a.noPlat = !0);
            a.isVersionPage || a.isChannelPage || (t(), a.queryTable(h))
        }
    }
    function m(b, d) {
        a.$apply(function() {
            a.hasSelectDate = !0, a.startTime = b, a.endTime = d, "keydata" == c.statpageid && a.startTime.format("YYYY-MM-DD") == a.endTime.format("YYYY-MM-DD") && moment().subtract(7, "days").valueOf() > moment(a.startTime).valueOf() && showmsg("选择单日进行查询会返回当日每个小时的数据，目前仅支持查询 7 天内的单日数据", "error"), "usepath" == c.statpageid && a.loadVisitPath(), "usetime" == c.statpageid && (a.tableStartDate = a.tableEndDate = moment(a.endTime).format("YYYYMMDD")), a.isVersionPage || a.isChannelPage || (t(), a.queryTable()), a.loadChannels(), a.loadVersions()
        })
    }
    function n() {
        a.queryStat(), a.queryTable(), "usepath" == c.statpageid && a.loadVisitPath()
    }
    function o(b) {
        a.tableParams ? a.tableParams.reload() : a.tableParams = new h({
            page: 1,
            count: 10
        }, {
            total: 1,
            getData: function(c, d) {
                var e, f = (d.page() - 1) * d.count(),
                    g = d.count();
                d.orderBy().length && (e = d.orderBy()[0]);
                q(function(e) {
                    var f = e.stats;
                    b(e), d.total(e.total), a.statErrors = f, c.resolve(f)
                }, null, f, g, e)
            }
        })
    }
    function p(b, d) {
        var e = a.tableStartDate || moment(a.startTime).format("YYYYMMDD"),
            f = a.tableEndDate || moment(a.endTime).format("YYYYMMDD"),
            g = (a.eventname, {
                appid: a.appid,
                start_date: e,
                end_date: f,
                stats: b || a.tableEvent
            });
        return d && $.extend(g, d), a.customEventId && (g.event = a.customEventId), a.funnelId && (g.funnelid = a.funnelId), a.currentEventParam && (g.param = a.currentEventParam), a.statchannels && (g.channel = a.statchannels), a.statversions && (g.version = a.statversions), g.os = a.statPlat, c.statpageid && "crashreport" == c.statpageid && (g.marked = a.tableCondition.statErrorCondition), a.currentTagName && a.customTag.selected && (g.tag = a.currentTagName + "_" + a.customTag.selected), a.currentUserGroupName && (g.group = a.currentUserGroupName), g
    }
    function q(c, d, e, f, g, h) {
        if (d || a.tableEvent) {
            var i = p(d, h);
            i.skip = e, i.limit = f, i.orderby = g;
            var j = remoteURL + "load_table_data";
            b.get(j, {
                params: i
            }).success(function(a) {
                c(a)
            })
        }
    }
    function r(b) {
        var d = !1,
            e = a.pagestat[c.statpageid].chart;
        return angular.forEach(e, function(a, c) {
            a.name == b && (d = !0)
        }), d
    }
    function s() {
        var c = remoteURL + "load_stats_data",
            d = angular.copy(a.contrastParams),
            e = moment(d.end_date, "YYYYMMDD") - moment(d.start_date, "YYYYMMDD"),
            f = moment(d.start_date, "YYYYMMDD").format("YYYY-MM-DD"),
            g = moment(f);
        e = parseInt(e / 864e5);
        var h = moment(a.contrastDate),
            i = moment(h).subtract("days", e);
        a.chartDates.push(i), d.start_date = i.format("YYYYMMDD"), d.end_date = h.format("YYYYMMDD"), b.get(c, {
            params: d
        }).success(function(b) {
            var c = b.stats[0];
            c.name = i.format("YYYY-MM-DD") + "至" + h.format("YYYY-MM-DD");
            var d = [];
            angular.forEach(a.chartOption.series, function(a, b) {
                d.push({
                    name: a.name,
                    data: a.data
                })
            }), a.chartOption.series = d, a.chartOption.series.push(c), b.label_type && "day" == b.label_type && angular.forEach(a.chartOption.series, function(a, b) {
                a.pointStart = moment.utc(f, "YYYYMMDD").valueOf(), a.pointInterval = 864e5
            }), a.chartOption.tooltip.formatter = function() {
                var a = (getDaysBetweenDate(g, moment(this.x)), this.x);
                b.label_type && "day" == b.label_type && (a = moment(this.x).format("YYYY-MM-DD"));
                var c = "<b>" + a + "</b>";
                return $.each(this.points, function(a, d) {
                    var e = d.y;
                    b.data_type && "time" == b.data_type && (e = secondFormat(d.y)), c += "<br/>" + d.series.name + ": " + e
                }), c
            }, $("#chart-container").highcharts(a.chartOption)
        })
    }
    function t() {
        $.inArray(a.eventname, ["page_visit_rank", "page_duration_rank", "page_exit_rate", "page_avg_duration", "os_version", "device_model", "carrier", "access", "resolution", "location", "location_new_user"]) > -1 ? (a.charType = "bar", a.contrastDateHide = !0) : "funnel" == a.eventname ? a.charType = "column" : (a.charType = "areaspline", a.contrastDateHide = !1), $.inArray(c.statpageid, ["versiondata", "channeldata", "channelpromotion"]) > -1 && (a.contrastDateHide = !0), a.chartOption = a.getChartOption(), a.charType && (a.chartOption.chart.type = a.charType), "areaspline" == a.chartOption.chart.type && $.extend(a.chartOption.tooltip, {
            shared: !0,
            crosshairs: !0
        });
        var d = a.chartOption,
            e = moment(a.startTime),
            f = moment(a.endTime),
            g = (moment(a.endTime), a.eventname);
        if (a.chartDates = [moment(a.startTime)], r(g)) {
            var h = "";
            if (a.pagestat[c.statpageid].chart) for (var i = 0; i < a.pagestat[c.statpageid].chart.length; i++) if (a.pagestat[c.statpageid].chart[i].name == g) {
                h = a.pagestat[c.statpageid].chart[i].displayTitle || a.pagestat[c.statpageid].chart[i].displayName;
                break
            }
            d.title.text = h, e = moment(e).format("YYYYMMDD"), f = moment(f).format("YYYYMMDD");
            var j = remoteURL + "load_stats_data",
                k = {
                    appid: a.appid,
                    start_date: e,
                    end_date: f,
                    stats: g
                };
            a.customEventId && (k.event = a.customEventId), a.statchannels && (k.channel = a.statchannels), a.statversions && (k.version = a.statversions), a.statPlat && (k.os = a.statPlat), a.currentTagName && a.customTag.selected && (k.tag = a.currentTagName + "_" + a.customTag.selected), a.currentUserGroupName && (k.group = a.currentUserGroupName), a.funnelId && (k.funnelid = a.funnelId), "!AV!AppOpen" == g && (k.stats = "event_pv", k.event = "!AV!AppOpen"), "!AV!PushOpen" == g && (k.stats = "event_pv", k.event = "!AV!PushOpen"), a.contrastParams = k, b.get(j, {
                params: k
            }).success(function(b) {
                b.data_type && "time" == b.data_type ? $.extend(d.yAxis, {
                    labels: {
                        formatter: function() {
                            return secondFormat(this.value)
                        },
                        overflow: "justify"
                    }
                }) : b.data_type && "percentage" == b.data_type && $.extend(d.yAxis, {
                    labels: {
                        formatter: function() {
                            return this.value + "%"
                        },
                        overflow: "justify"
                    }
                }), "crash_session" == g && (d.yAxis.allowDecimals = !0), b.label_type && "day" == b.label_type ? $.extend(d.xAxis, {
                    type: "datetime",
                    labels: {
                        formatter: function() {
                            return moment(this.value).format("YYYY-MM-DD")
                        },
                        overflow: "justify",
                        maxStaggerLines: 1
                    }
                }) : (d.xAxis.categories = b.dates, "hour" == b.label_type && (d.xAxis.labels.step = Math.round(d.xAxis.categories.length / 6))), b.stats && b.stats[0] && b.stats.length < 2 && (b.stats[0].showInLegend = !1), b.stats && b.stats.length > 1 ? ($.extend(d.tooltip, {
                    shared: !0,
                    crosshairs: !0
                }), b.label_type && "day" == b.label_type && (d.tooltip.xDateFormat = "%Y-%m-%d")) : $.extend(d.tooltip, {
                    formatter: function() {
                        var a = this.x,
                            c = this.y;
                        b.label_type && "day" == b.label_type && (a = moment(this.x).format("YYYY-MM-DD")), b.data_type && "time" == b.data_type && (c = secondFormat(this.y)), "percentage" == b.data_type && (c = this.y + "%");
                        var d = a + ": " + c;
                        return d
                    }
                }), d.series = b.stats, d.series && d.series[0] && 1 == d.series.length && (d.series[0].name = moment(a.startTime).format("YYYY-MM-DD") + "至" + moment(a.endTime).format("YYYY-MM-DD"), d.series[0].data.length < 1 ? a.needChartTip = !0 : a.needChartTip = !1), d.series && d.series[0] && (d.yAxis.labels.step = Math.round(d.series[0].data.length / 10), b.label_type && "day" == b.label_type && angular.forEach(d.series, function(a, b) {
                    a.pointStart = moment.utc(e, "YYYYMMDD").valueOf(), a.pointInterval = 864e5
                }), d.series[0].data.length > 30 && (d.plotOptions.areaspline.marker = {
                    enabled: !1
                })), a.chartElem = $("#chart-container").highcharts(d)
            })
        }
    }
    a.customTag = {}, a.statpageid = c.statpageid, a.tableConfig = {}, a.tableCondition = {}, a.hasStatPlatAll = ["usepath", "crashreport", "versiondata", "channeldata"].indexOf(a.statpageid) > -1 ? !1 : !0, e.statSelected ? a.hasStatPlatAll || "all" != e.statSelected ? e.statPlat = e.statSelected : e.statPlat = "ios" : a.hasStatPlatAll ? e.statPlat = "all" : e.statPlat = "ios", a.setCurrentTag = function(b) {
        a.currentTagName = b, n()
    }, a.setCurrentUserGroup = function(b) {
        b && -1 != b ? a.currentUserGroupName = b : a.currentUserGroupName = null, n()
    }, a.setCurrentVersion = function(b) {
        a.statversions = b, a.loadStatData()
    }, a.setCurrentChannel = function(b) {
        a.statchannels = b, a.loadStatData()
    }, a.init = l, a.loadStatData = n, a.platSelect = function(b) {
        e.statSelected = b, $.cookie("stat-last-selected", b), e.statPlat = b, a.isVersionPage || a.isChannelPage || n(), "all" != a.statPlat && (a.loadChannels(), a.loadVersions(), a.loadUserGroups())
    }, a.loadVisitPathByStep = function(b, c) {
        function d(a) {
            for (var b = 0; b < a.length; b++) {
                if (!a[b]) return "";
                if (1 == a[b].current) return a[b].name
            }
        }
        if (!(b >= 4) && "_other_" != c && "_exit_" != c) {
            for (var e = 0; e < a.visitDatas[b].length; e++) a.visitDatas[b][e] && (a.visitDatas[b][e].name == c ? a.visitDatas[b][e].current = !0 : a.visitDatas[b][e].current = !1);
            for (var f = [], e = 0; b + 1 > e; e++) f.push(d(a.visitDatas[e]));
            a.loadVisitPath(void 0, void 0, f.join(","))
        }
    }, a.getVisitStepTitle = function(b) {
        if (0 == b) return "首次进入用户分布: " + a.visitCount;
        for (var c = 0, d = 0; d < a.visitDatas[b - 1].length; d++) a.visitDatas[b - 1][d] && a.visitDatas[b - 1][d].current && (c = a.visitDatas[b - 1][d].count);
        return "第" + b + "次跳转用户分布: " + c
    }, a.getVisitCursor = function(a) {
        return a ? "_exit_" == a.name || "_other_" == a.name ? "default" : "pointer" : "default"
    }, a.getVisitStepName = function(a) {
        return "_other_" == a ? "其它" : "_exit_" == a ? "退出" : a
    }, a.loadVisitPath = function(c, d, e) {
        a.needChartTip = !1;
        var f = c || moment(a.startTime).format("YYYYMMDD"),
            g = d || moment(a.endTime).format("YYYYMMDD"),
            h = remoteURL + "load_visit_path",
            i = (a.eventname, {
                appid: a.appid,
                start_date: f,
                end_date: g
            });
        e && (i.path = e), a.statchannels && (i.channel = a.statchannels), a.statversions && (i.version = a.statversions), a.currentUserGroupName && (i.group = a.currentUserGroupName), i.os = a.statPlat, b.get(h, {
            params: i
        }).success(function(b) {
            if (e) {
                var c = e.split(","),
                    d = c.length;
                a.visitDatas.splice(d), a.visitDatas[d] = b
            } else {
                if (!b[0] || !b[0][0]) return a.visitCount = 0, a.needChartTip = !0, void(a.visitDatas = b);
                a.visitCount = 0;
                for (var f = 0; f < b.length - 1; f++) b[f][0] && (b[f][0].current = !0);
                a.visitDatas = b;
                for (var f = 0; f < b[0].length; f++) a.visitCount += b[0][f].count
            }
            for (var f = 0; f < a.visitDatas.length; f++) for (var g = 0; g < a.visitDatas[f].length; g++) a.visitDatas[f][g] && (a.visitDatas[f][g].percent = (100 * a.visitDatas[f][g].count / a.visitCount).toFixed(2) + "%");
            for (var f = 0; f < a.visitDatas.length; f++) for (var h = a.visitDatas[f].length, g = h; 12 > g; g++) a.visitDatas[f][g] = void 0
        })
    }, a.loadChannels = function() {
        var c = {
            column: "channel",
            appid: a.appid,
            start_date: moment(a.startTime).format("YYYYMMDD"),
            end_date: moment(a.endTime).format("YYYYMMDD")
        };
        c.os = a.statPlat, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.allchannels = b, a.isChannelPage && (a.statchannels = a.allchannels.join(","), t(), a.queryTable())
        })
    }, a.loadVersions = function() {
        var c = {
            column: "app_version",
            appid: a.appid,
            start_date: moment(a.startTime).format("YYYYMMDD"),
            end_date: moment(a.endTime).format("YYYYMMDD")
        };
        c.os = a.statPlat, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.allversions = b, a.isVersionPage && (a.statversions = a.allversions.join(","), t(), a.queryTable())
        })
    }, a.loadCustomTags = function() {
        var c = {
            column: "app_version",
            appid: a.appid
        };
        c.os = a.statPlat, b.get(remoteURL + "load_custom_tags", {
            params: c
        }).success(function(b) {
            $.isEmptyObject(b) ? a.alltags = null : a.alltags = b
        })
    }, a.loadUserGroups = function() {
        var c = {
            column: "groups",
            appid: a.appid
        };
        c.os = a.statPlat, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            $.isEmptyObject(b) ? a.usergroups = null : a.usergroups = b
        })
    }, a.loadEventParams = function() {
        var c = moment(a.startTime).format("YYYYMMDD"),
            d = moment(a.endTime).format("YYYYMMDD"),
            e = {
                start_date: c,
                end_date: d,
                appid: a.appid,
                event: a.customEventId
            };
        e.os = a.statPlat, a.statchannels && (e.channel = a.statchannels), a.statversions && (e.version = a.statversions), b.get(remoteURL + "load_event_params", {
            params: e
        }).success(function(b) {
            a.customEventParams = b, a.customEventParams.length > 0 && (a.currentEventParam = a.customEventParams[0])
        })
    }, a.loadChannels(), a.loadVersions(), a.loadUserGroups(), a.queryTable = function(b) {
        var c = function(b) {
            a.tableDatas = b.stats
        };
        b = b || a.tableConfig.tableQueryCallback || c, o(b)
    }, a.queryTablePagination = o, a.exportTableData = function() {
        var b = p();
        b["export"] = "csv";
        var c = remoteURL + "load_table_data",
            d = [];
        angular.forEach(b, function(a, b) {
            d.push(b + "=" + a)
        }), a.exportUrl = c + "?" + d.join("&")
    }, a.changeTableOrder = function(b) {
        a.changeTableOrder[b] = a.changeTableOrder[b] || -1, a.changeTableOrder[b] = -a.changeTableOrder[b], a.tableDatas.sort(function(c, d) {
            if (a.changeTableOrder[b] > 0) {
                if (c[b] < d[b]) return 1;
                if (d[b] < c[b]) return -1
            } else {
                if (c[b] < d[b]) return -1;
                if (d[b] < c[b]) return 1
            }
            return 0
        })
    }, a.getConditionStr = function() {
        var b = [];
        return a.statchannels && a.statchannels.split(",").length < 2 && b.push(a.statchannels), a.statversions && a.statversions.split(",").length < 2 && b.push("v" + a.statversions), b.join(" - ")
    }, a.queryStat = function(b) {
        a.eventname = b || a.eventname;
        var c = moment(a.startTime),
            d = moment(a.endTime);
        a.eventname;
        return c.isValid() && d.isValid() ? void t() : void showmsg("日期格式非法，需要遵循 YYYY-MM-DD", AVC.Error)
    }, a.selectContrast = function(b) {
        a.contrastClicked = !0
    }, a.getTableSortClass = function(b) {
        if ("reason" == b || "version" == b) return "sort-disable";
        if (a.tableParams) {
            if (a.tableParams.isSortBy(b, "asc")) return "sort-asc";
            if (a.tableParams.isSortBy(b, "desc")) return "sort-desc"
        }
        return "sortable"
    }, a.sortTable = function(b) {
        "reason" != b && "version" != b && a.tableParams.sorting(b, a.tableParams.isSortBy(b, "asc") ? "desc" : "asc")
    }, a.routeCtrlMap[a.statpageid] || l()
}]), angular.module("statMod").controller("StatRealtimeCtrl", ["$http", "$scope", "$timeout", "$rootScope", "$location", function(a, b, c, d, e) {
    function f(a, b) {
        return "undefined" == typeof b ? "data-new" : b > a ? "data-smaller" : a > b ? "data-bigger" : void 0
    }
    function g() {
        b.loadData(), j = c(function() {
            g()
        }, 15e3)
    }
    e.path();
    b.setPageTip("statrealtime"), b.realTime = {}, b.statAnimation = {
        page_visit: [],
        events: [],
        location: []
    };
    var h = (new Odometer({
        el: $(".transition-number")[0],
        value: 0,
        format: ""
    }), b.getChartOption());
    h.xAxis.categories = [], h.xAxis.tickInterval = 5;
    for (var i = 30; i > 0; i--) h.xAxis.categories.push("-" + i + " 分钟");
    h.plotOptions.series = {
        animation: !1
    };
    var j;
    b.loadData = function() {
        a.get(remoteURL + "realtime", {
            params: {
                appid: getParam().appid,
                os: b.statPlat
            }
        }).success(function(a) {
            if (e.path() && "/statrealtime" != e.path()) return void(j && c.cancel(j));
            b.statAnimation = {
                page_visit: [],
                events: [],
                location: []
            }, b.statAnimation.current_active = f(a.current_active, b.realTime.current_active), $(".transition-number").text(a.current_active);
            var d = !0;
            angular.forEach(a.page_visit, function(a, c) {
                if (d = !0, b.realTime.page_visit) for (var e = 0; e < b.realTime.page_visit.length; e++) if (a.name == b.realTime.page_visit[e].name) {
                    b.statAnimation.page_visit[c] = f(a.count, b.realTime.page_visit[e].count), d = !1;
                    break
                }
                d && (b.statAnimation.page_visit[c] = f(a.count))
            }), angular.forEach(a.events, function(a, c) {
                if (d = !0, b.realTime.events) for (var e = 0; e < b.realTime.events.length; e++) if (a.name == b.realTime.events[e].name) {
                    b.statAnimation.events[c] = f(a.count, b.realTime.events[e].count), d = !1;
                    break
                }
                d && (b.statAnimation.events[c] = f(a.count))
            }), angular.forEach(a.location, function(a, c) {
                if (d = !0, b.realTime.location) for (var e = 0; e < b.realTime.location.length; e++) if (a.location == b.realTime.location[e].location) {
                    b.statAnimation.location[c] = f(a.count, b.realTime.location[e].count), d = !1;
                    break
                }
                d && (b.statAnimation.location[c] = f(a.count))
            }), b.realTime = a, h.yAxis.min = Math.min.apply(null, a.active_30min), h.yAxis.startOnTick = !1, h.yAxis.showFirstLabel = !0, h.series[0].name = "活跃用户", h.series[0].data = a.active_30min.reverse(), h.series[0].showInLegend = !1, $("#chart-container").highcharts(h)
        })
    }, b.platSelect = function(a) {
        d.statSelected = a, $.cookie("stat-last-selected", a), d.statPlat = a, j && c.cancel(j), g()
    }, g()
}]), function() {
    function a(a, b) {
        b.tableHasCheckbox = !0, b.errorConditionSelector = !0, b.tableCondition.statErrorCondition = !1, b.crashDetailConditions = [{
            name: "trace",
            displayName: "Stack Trace"
        }, {
            name: "device",
            displayName: "设备类型分布"
        }, {
            name: "os",
            displayName: "操作系统分布"
        }], b.selectedErrors = {
            checked: !1,
            items: {}
        }, b.$watch("selectedErrors.checked", function(a) {
            angular.forEach(b.statErrors, function(c) {
                angular.isDefined(c.id) && (b.selectedErrors.items[c.id] = a)
            })
        }), b.$watch("selectedErrors.items", function(a) {
            if (b.statErrors) {
                var c = 0,
                    d = 0,
                    e = b.statErrors.length;
                angular.forEach(b.statErrors, function(a) {
                    c += b.selectedErrors.items[a.id] || 0, d += !b.selectedErrors.items[a.id] || 0
                }), (0 == d || 0 == c) && (b.selectedErrors.checked = c == e)
            }
        }, !0), b.updateErrorState = function() {
            var c = [];
            angular.forEach(b.selectedErrors.items, function(a, b) {
                a && c.push(b)
            }), a.post(remoteURL + "apps/" + getParam().appid + "/crash", {
                error_keys: c.join(","),
                os: b.statPlat,
                fix: !b.tableCondition.statErrorCondition
            }).success(function(a) {
                b.tableParams.reload(), b.selectedErrors.items = {}
            })
        }, b.showCrashReportList = function() {
            $("#stat-table-pagination").show(), $("#stat-error-detail").hide(), $("#stat-error-detail .nav-tabs li").removeClass("active"), $("#stat-error-detail .nav-tabs li:first").addClass("active"), $("#stat-crash-chart").hide(), $(".trace-detail").show()
        }, b.setCurrentCrashDetail = function(a) {
            b.statCurrentError = a, $("#stat-table-pagination").hide(), $("#stat-error-detail").show()
        }, b.queryCrashDetail = function(c, d) {
            if ("trace" == c) return $("#stat-crash-chart").hide(), void $(".trace-detail").show();
            $(".trace-detail").hide(), $("#stat-crash-chart").show();
            var e = {
                appid: getParam().appid,
                os: b.statPlat,
                crashid: b.statCurrentError.id,
                info: c
            };
            a.get(remoteURL + "crash/detail", {
                params: e
            }).success(function(a) {
                $("#stat-crash-chart").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: !1
                    },
                    credits: {
                        enabled: !1
                    },
                    title: {
                        text: ""
                    },
                    tooltip: {
                        formatter: function() {
                            return this.key + ": <b>" + this.y + "</b>"
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: !0,
                            cursor: "pointer",
                            dataLabels: {
                                enabled: !0,
                                color: "#000000",
                                connectorColor: "#000000",
                                format: "<b>{point.name}</b>: {point.percentage:.1f} %"
                            }
                        }
                    },
                    series: [{
                        type: "pie",
                        name: d,
                        data: a
                    }]
                })
            })
        }, b.showTraceDetail = function() {}, b.getCrashsByFilter = function(a) {
            b.tableCondition.statErrorCondition = a, b.queryTablePagination()
        }, b.init()
    }
    angular.module("statMod").controller("StatCrashReportCtrl", ["$http", "$scope", a])
}(), angular.module("statMod.api", ["statMod"]), angular.module("statMod.api").config(["$routeProvider", function(a) {
    a.when("/:statpageid", {
        templateUrl: "views/app-stat-api.html",
        controller: "APIQueryCtrl"
    }).when("/storage/:statpageid", {
        templateUrl: "views/app-stat-api.html",
        controller: "APIQueryCtrl"
    }).otherwise({
        redirectTo: "/_apiRequest"
    })
}]), function() {
    "use strict";

    function a(a) {
        a.apiStatCon = {
            groupBy: "platform",
            apiChartType: "areaspline"
        }, a.statDate = {
            startTime: moment().subtract("days", 6).toDate(),
            endTime: moment().toDate()
        }
    }
    angular.module("statMod.api").controller("APIQueryWrapperCtrl", ["$scope", a])
}(), angular.module("statMod.api").controller("APIQueryCtrl", ["$scope", "$http", "$routeParams", "$location", "App", "SchemaLoader", "$timeout", function(a, b, c, d, e, f, g) {
    function h(b, c) {
        g(function() {
            a.statDate.startTime = b, a.statDate.endTime = c, i()
        }, 100)
    }
    function i() {
        d.path().indexOf("/storage") > -1 ? a.fileStat() : k()
    }
    function j(a) {
        var b = {
            title: {
                text: "",
                x: 0
            },
            xAxis: {
                type: "datetime",
                tickPixelInterval: 200,
                labels: {
                    formatter: function() {
                        return moment(this.value).format("YYYY-MM-DD")
                    },
                    overflow: "justify",
                    maxStaggerLines: 1
                },
                minTickInterval: 864e5
            },
            yAxis: {
                title: {
                    text: ""
                },
                min: 0,
                allowDecimals: !1,
                gridLineColor: "#f4f1f1",
                labels: {}
            },
            credits: {
                enabled: !1
            },
            series: [{
                data: [],
                showInLegend: !1
            }],
            plotOptions: {
                areaspline: {
                    fillOpacity: .4
                }
            },
            chart: {
                type: "areaspline",
                reflow: !0
            },
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: [{
                            text: "导出为 PNG",
                            onclick: function() {
                                this.exportChart()
                            },
                            separator: !1
                        }]
                    }
                }
            }
        };
        return b.tooltip = {
            formatter: function() {
                return moment(this.x).format("YYYY-MM-DD") + ":    <b>" + this.y + "</b>"
            }
        }, a && (b = $.extend(b, a)), b
    }
    function k() {
        var d = j(),
            e = {
                from: moment(a.statDate.startTime).format("YYYYMMDD"),
                to: moment(a.statDate.endTime).format("YYYYMMDD")
            };
        "_apiRequest" != c.statpageid && (e.event_id = c.statpageid), d.chart.type = a.apiStatCon.apiChartType, "areaspline" === a.apiStatCon.apiChartType ? (d.xAxis.type = "datetime", d.series[0].pointInterval = 864e5, d.series[0].pointStart = moment.utc(moment(a.statDate.startTime).format("YYYYMMDD"), "YYYYMMDD").valueOf(), e.clazz = a.apiStatCon.clazz, e.platform = a.apiStatCon.platform) : "pie" === a.apiStatCon.apiChartType && (d.tooltip = {
            formatter: function() {
                return this.key + ":    <b>" + this.y + "</b>"
            }
        }, e.group_by = a.apiStatCon.groupBy), b({
            url: purl + "statistics/details",
            headers: getApiRequestHeader(a.currentApp.app_id, a.currentApp.app_key),
            params: e
        }).success(function(a) {
            d.series[0].data = a.results, $("#chart-container").highcharts(d)
        })
    }
    new RegExp(["_push", "_sms", "storage"].join("|")).test(d.path()) || (a.isApiStat = !0, f.fetch().then(function(b) {
        a.clas = b
    })), a.$watch("apiStatCon", function() {
        a.currentApp && i()
    }, !0), a.loadByDate = h, a.maxTime = a.statDate.endTime, a.platform = "", a.clazz = "", a.groupBy = "platform", a.pageId = c.statpageid, "_apiRequest" !== a.pageId && "event_id" === a.apiStatCon.groupBy && (a.apiStatCon.groupBy = "platform"), a.stat = i, a.fileStat = function() {
        var d = {},
            e = c.statpageid,
            f = moment(a.statDate.startTime).format("YYYYMMDD"),
            g = moment(a.statDate.endTime).format("YYYYMMDD");
        d.item = e, d.from = f, d.to = g, "storageup" == e && (d.item = "apicall", d.type = "put"), "storagedown" == e && (d.item = "apicall", d.type = "get"), b.get(appurl + "/fileStats", {
            params: d
        }).success(function(b) {
            var d, e = [],
                f = 0;
            angular.forEach(b.results, function(a, b) {
                0 == f && (d = b), f++, e.push(a)
            });
            var g = j();
            ["space", "transfer"].indexOf(c.statpageid) > -1 && (g.tooltip = {
                formatter: function() {
                    return moment(this.x).format("YYYY-MM-DD") + ":    <b>" + bytesToSize(this.y) + "</b>"
                }
            }, g.yAxis.labels.formatter = function() {
                return bytesToSize(this.value)
            }), g.series[0].data = e, g.series[0].pointStart = moment.utc(d, "YYYYMMDD").valueOf(), g.series[0].pointInterval = 864e5, a.chartData = g, $("#chart-container").highcharts(a.chartData)
        })
    }, a.apiStat = k, e.then(function() {
        i()
    })
}]), angular.module("statMod.other", ["appMod", "statconfig", "ngTable"]), angular.module("statMod.other").controller("EventFunnelCtrl", ["$scope", "$http", "ngTableParams", "$rootScope", function(a, b, c, d) {
    function e() {
        a.tableParams ? a.tableParams.reload() : a.tableParams = new c({
            page: 1,
            count: 10
        }, {
            total: 0,
            getData: function(b, c) {
                var d, e = (c.page() - 1) * c.count(),
                    f = c.count();
                c.orderBy().length && (d = c.orderBy()[0]), a.loadFunnels(b, e, f).then(function(a) {})
            }
        })
    }
    a.funnelPlat = "all", a.loadEvents = function() {
        var c = {
            column: "event",
            appid: getParam().appid
        };
        c.os = a.funnelPlat, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.statEvents = b
        })
    }, a.loadFunnels = function(a, c, e) {
        return b.get(remoteURL + "funnels", {
            params: {
                appid: getParam().appid,
                os: "all",
                skip: c,
                limit: e
            }
        }).success(function(b) {
            d.funnels = b, a.resolve(b)
        })
    }, a.addFunnel = function() {
        b.post(remoteURL + "funnels", {
            appid: getParam().appid,
            name: a.statFunnel.name,
            steps: a.statFunnel.steps.join(",")
        }).success(function(a) {
            e(), $("#stat-add-funnel").modal("hide")
        })
    }, a.deleteFunnel = function(a) {
        b["delete"](remoteURL + "funnels/" + a).success(function(a) {
            e()
        })
    }, a.unvalidFunnelSteps = function() {
        var b = 0;
        return angular.forEach(a.statFunnel.steps, function(a, c) {
            a && b++
        }), b > 1 ? !1 : !0
    }, a.addNewEvent = function() {
        a.statFunnel.steps.push("")
    }, a.removeEvent = function(b) {
        a.statFunnel.steps.splice(b, 1)
    }, a.platSelect = function(a) {
        d.statPlat = a, e()
    }, a.funnelPlatSelect = function(b) {
        a.funnelPlat = b, a.loadEvents()
    }, a.pagestat = statConfig, a.statFunnel = {}, a.stepsNumMap = ["一", "二", "三", "四", "五"], a.statFunnel.steps = new Array(2), a.tableDisplayFunc = a.pagestat.funnel_config.tableDisplayFunc ||
        function(a, b) {
            return b || (b = "0"), b
        }, a.tableLabels = a.pagestat.funnel_config.table, a.loadEvents(), e()
}]), angular.module("statMod.other").factory("UserGroups", ["$http", "$q", "$routeParams", "$rootScope", function(a, b, c, d) {
    var e = {};
    return e.load = function() {
        var c = b.defer();
        return a.get(remoteURL + "usergroups", {
            params: {
                appid: getParam().appid,
                os: d.platSelect
            }
        }).success(function(a) {
            for (var b = 0; b < a.length; b++) a[b].defination = JSON.parse(a[b].defination);
            c.resolve(a)
        }), c.promise
    }, e
}]), angular.module("statMod.other").controller("UserGroupCtrl", ["$scope", "$http", "$rootScope", "UserGroups", function(a, b, c, d) {
    d.load().then(function(b) {
        a.userGroups = b
    }), a.deleteUserGroup = function(c) {
        b["delete"](remoteURL + "usergroups/" + c).success(function() {
            d.load().then(function(b) {
                a.userGroups = b
            })
        })
    }
}]), angular.module("statMod.other").controller("UserGroupCreateCtrl", ["$scope", "$http", "ngTableParams", "$rootScope", "$routeParams", "UserGroups", function(a, b, c, d, e, f) {
    function g() {
        a.eventCondition = {}, a.userPush = {}, a.userPush.msgtype = "text", a.userPush.pushTime = moment().format("YYYY-MM-DD HH:mm:ss"), a.userPush.expireTime = moment().format("YYYY-MM-DD HH:mm:ss"), "-1" != e.groupid.trim() ? angular.forEach(a.userGroups, function(b, c) {
            if (b.id == e.groupid) {
                a.currentUserGroup = b, a.currentUserGroup.os = b.platform, a.currentUserGroup.location = b.defination.location;
                var d = [];
                b.defination.weekly_active && (d = Object.keys(b.defination.weekly_active)), a.currentUserGroup.weekyActive = {}, d.length && (a.currentUserGroup.weekyActive.op = d[0], a.currentUserGroup.weekyActive.value = b.defination.weekly_active[d[0]]);
                var f = [];
                angular.forEach(a.currentUserGroup.defination.events, function(b, c) {
                    if (a.loadEventParam(b.event), b.attributes && b.attributes.length) for (var d = 0; d < b.attributes.length; d++) f.push({
                        event: b.event,
                        attribute: b.attributes[d].name,
                        op: b.attributes[d].op.substring(1),
                        value: b.attributes[d].value
                    });
                    else f.push({
                        event: b.event
                    })
                }), a.eventCondition[a.currentUserGroup.os] = f, a.queryEventUser()
            }
        }) : (a.currentUserGroup = {
            os: "ios"
        }, a.eventCondition = {
            ios: [{
                event: "",
                attribute: ""
            }]
        }), a.eventParams = {}, a.loadEvents(), a.loadUserLocations(), a.$watch("currentUserGroup.os", function() {
            a.loadEvents()
        })
    }
    function h() {
        function b(a, b, c) {
            if (a && "" != a.trim()) {
                var d = {
                    name: a
                };
                return b && (d.op = "$" + b, d.value = c), d
            }
        }
        var c = [],
            d = !1;
        return angular.forEach(a.eventCondition[a.currentUserGroup.os], function(a, e) {
            if (a.event) {
                for (var f = 0; f < c.length; f++) if (c[f].event == a.event) {
                    d = !0;
                    break
                }
                var g = b(a.attribute, a.op, a.value);
                d ? g && (c[f].attributes.length ? c[f].attributes.push(g) : c[f].attributes = [g]) : g ? c.push({
                    event: a.event,
                    attributes: [g]
                }) : c.push({
                    event: a.event
                })
            }
        }), c
    }
    a.opMap = {
        eq: "等于",
        gt: "大于",
        lt: "小于"
    }, a.currentStep = 1, a.nextStep = function() {
        a.currentStep = 2
    }, f.load().then(function(b) {
        a.userGroups = b, g()
    }), a.platSelect = function(b) {
        a.currentUserGroup.os = b, a.eventCondition[b] || (a.eventCondition[b] = [{
            event: "",
            attribute: ""
        }]), a.queryEventUser()
    }, a.loadUserLocations = function() {
        var c = {
            column: "locations",
            appid: getParam().appid
        };
        c.os = a.currentUserGroup.os, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.statUserLocations = b
        })
    }, a.loadEvents = function() {
        var c = {
            column: "event",
            appid: getParam().appid
        };
        c.os = a.currentUserGroup.os, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.statEvents = b
        })
    }, a.loadEventParam = function(c, d) {
        "undefined" != typeof d && (a.eventCondition[a.currentUserGroup.os][d].attribute = "", a.eventCondition[a.currentUserGroup.os][d].op = "", a.eventCondition[a.currentUserGroup.os][d].value = "");
        var e = {
            column: "event_params",
            event: c,
            appid: getParam().appid
        };
        e.os = a.currentUserGroup.os, b.get(remoteURL + "load_distinct_values", {
            params: e
        }).success(function(b) {
            a.eventParams[c] = b
        })
    }, a.addNewEventCondition = function() {
        a.eventCondition[a.currentUserGroup.os] ? a.eventCondition[a.currentUserGroup.os].push({
            event: "",
            attributes: ""
        }) : a.eventCondition[a.currentUserGroup.os] = [{
            event: "",
            attributes: ""
        }]
    }, a.queryEventUser = function() {
        var c = h(),
            d = {
                appid: getParam().appid,
                query: {
                    events: c
                },
                limit: 20
            };
        a.currentUserGroup.location && (d.query.location = a.currentUserGroup.location), a.currentUserGroup.weekyActive && a.currentUserGroup.weekyActive.op && (d.query.weekly_active = {}, d.query.weekly_active[a.currentUserGroup.weekyActive.op] = a.currentUserGroup.weekyActive.value), d.query.platform = a.currentUserGroup.os, b.post(remoteURL + "user_search", d).success(function(b) {
            a.eventUsers = b.hits, a.eventUserNum = b.total
        })
    }, a.removeEvent = function(b) {
        a.eventCondition[a.currentUserGroup.os].splice(b, 1), a.queryEventUser()
    }, a.saveUserGroup = function() {
        var c = remoteURL + "usergroups",
            d = a.currentUserGroup && a.currentUserGroup.id,
            e = "post";
        d && (c = remoteURL + "usergroups/" + d, e = "put");
        var f = {
            appid: getParam().appid,
            os: a.currentUserGroup.os,
            name: a.currentUserGroup.name,
            defination: {
                events: h()
            }
        };
        a.currentUserGroup.location && (f.defination.location = a.currentUserGroup.location), a.currentUserGroup.weekyActive && a.currentUserGroup.weekyActive.op && (f.defination.weekly_active = {}, f.defination.weekly_active[a.currentUserGroup.weekyActive.op] = a.currentUserGroup.weekyActive.value), b[e](c, f).success(function(a) {
            window.location.href = "#/statconfig/usergroup"
        })
    }, a.setCurrentUserDeviceId = function(b) {
        a.currentDeviceId = b
    }, a.pushmsg = function() {
        if (a.msg = $.trim(a.userPush.msg), "" != a.msg) {
            if ("json" == a.userPush.msgtype) try {
                data = JSON.parse(a.msg)
            } catch (c) {
                return void showmsg("JSON 数据格式错误", AVC.Error)
            } else data = {
                alert: a.msg
            };
            var d = {
                data: data
            };
            if (1 == a.userPush.pushTimeSelect) {
                if (!moment(a.userPush.pushTime).isValid()) return void showmsg("发送时间格式非法", AVC.Error);
                d.push_time = moment(a.userPush.pushTime)
            }
            if (1 == a.userPush.expireIntervalSelect) {
                if (!moment(a.userPush.expireTime).isValid()) return void showmsg("过期时间格式非法", AVC.Error);
                d.expiration_time = moment(a.userPush.expireTime)
            }
            if (2 == a.userPush.expireIntervalSelect) {
                var e = 1 == a.userPush.expireUnit ? 60 * a.userPush.expireNum * 60 : 60 * $scop.userPush.expireNum * 60 * 24;
                d.expiration_interval = e
            }
            var f = h(),
                g = {
                    events: f
                };
            a.currentUserGroup.location && (g.location = a.currentUserGroup.location), a.currentUserGroup.weekyActive && a.currentUserGroup.weekyActive.op && (g.weekly_active = {}, g.weekly_active[a.currentUserGroup.weekyActive.op] = a.currentUserGroup.weekyActive.value), g.platform = a.currentUserGroup.os, d.user_group_query = g, d._ApplicationId = a.currentApp.app_id, d._ApplicationKey = a.currentApp.app_key, d._MasterKey = a.currentApp.master_key, b({
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                url: purl + "stats/push",
                data: d
            }).success(function() {
                showmsg("推送成功")
            }).error(function(a) {
                showmsg(a.error, AVC.Error)
            })
        }
    }
}]), angular.module("statMod.other").controller("StatUserActionCtrl", ["$http", "$scope", function(a, b) {
    b.loadUserActions = function(c) {
        c && (b.currentDeviceId = c);
        var d = {
            page: "浏览页面",
            event: "触发事件",
            session: "启动应用"
        };
        a.get(remoteURL + "user_action_details", {
            params: {
                did: b.currentDeviceId,
                limit: 10,
                ts: b.userActions ? b.userActions[b.userActions.length - 1].ts : null,
                appid: getParam().appid
            }
        }).success(function(a) {
            (!a || a.length < 1) && (b.nomoreUserActions = !0);
            angular.forEach(a, function(a, b) {
                a.name ? a.desc = d[a["action-type"]] + " " + a.name : a.desc = d[a["action-type"]]
            }), b.userActions ? b.userActions = b.userActions.concat(a) : b.userActions = a
        })
    }, b.loadUserActions()
}]), angular.module("loginMod", ["dashBoard", "dashBoard.storageSer"]), angular.module("loginMod").config(["$routeProvider", function(a) {
    a.when("/signup", {
        templateUrl: "/signup.html",
        controller: "SignUpCtrl"
    }).when("/signin", {
        templateUrl: "/signin.html",
        controller: "SignUpCtrl"
    }).when("/apply", {
        templateUrl: "/apply.html",
        controller: "SignUpCtrl"
    }).when("/forgotpass", {
        templateUrl: "/forgotpass.html",
        controller: "SignUpCtrl"
    }).otherwise({
        redirectTo: "/signin"
    })
}]), angular.module("loginMod").controller("SignUpCtrl", ["$scope", "$http", "$route", "$location", "storageSer", function(a, b, c, d, e) {
    /login.html#\/signup/.test(window.location.href) && window.ga && ga("send", "event", "Login", "VisitRegistry"), a.$watch("user", function() {
        a.user && (/login.html#\/signup/.test(window.location.href) && window.ga && ga("send", "event", "Login", "VisitRegistryWithSession"), d.path().indexOf("forgotpass") < 0 && (window.location.href = rootpage))
    }), a.accept = !1, a.captchaurl = purl + "captcha?" + Math.random(), a.inputCoupon = getParam().refcode, a.changeCaptcha = function() {
        $("#captcha-wrapper").html("<img src='" + purl + "captcha??" + Math.random() + "'>")
    }, a.signup = function() {
        if (a.accept) {
            var c = $("#signupform input[name=email]").val(),
                d = $("#signupform input[name=password]").val(),
                f = $("#signupform input[name=username]").val(),
                g = $("#signupform input[name=phone]").val(),
                h = $("#inputCoupon").val(),
                i = e.item("promoCode"),
                j = {
                    email: c,
                    password: d,
                    username: f
                };
            g && (j.phone = g), h && (j.coupon = h), i && (i.date + 864e5 <= Date.now() ? e.remove("promoCode") : j.promoteCode = i.value), b.post(purl + "signup", j).success(function(a) {
                location.href = rootpage
            }).error(function(b) {
                203 == b.code ? a.signuperror = ["该邮箱已经存在，你可以直接 <a href='#/signin'>登录</a>，或 <a href='#/forgotpass'>找回密码</a>"] : a.signuperror = [b.error]
            })
        }
    }, a.validateCoupon = function() {
        var c = $("#inputCoupon");
        c.val() && b.get(purl + "check-coupon/" + a.inputCoupon).success(function(b) {
            a.couponValidate = b, a.couponValidate.hasVerified = !0
        }).error(function() {
            a.couponValidate = {}, a.couponValidate.hasVerified = !0
        })
    }, getParam().refcode && a.validateCoupon(), a.signin = function() {
        var c = $("#signinform input[name=email]").val(),
            d = $("#signinform input[name=password]").val();
        b.post(purl + "signin", {
            email: c,
            password: d
        }).success(function(a) {
            location.href = rootpage
        }).error(function(b) {
            a.signinerror = [b.error]
        })
    }, a.apply = function() {
        var c = $("#applyform input[name=email]").val(),
            d = $("#applyform input[name=company]").val(),
            e = $("#applyform input[name=title]").val(),
            f = $("#applyform [name=description]").val();
        b.post("/admin/1/applications", {
            email: c,
            company: d,
            title: e,
            description: f
        }).success(function(b) {
            a.applyerror = ["申请成功，我们将在审核通过后发邮件到您的邮箱"]
        }).error(function(b) {
            b.error && "Email existed!" == b.error && (a.applyerror = ["该邮箱已经存在，你可以直接 <a href='#/signin'>登录</a>，或 <a href='#/forgotpass'>找回密码</a>"])
        })
    }, a.deleteAlert = function() {
        a.signinerror = [], a.signuperror = []
    }, a.sendForgot = function() {
        var c = $("#forgotform input[name=email]").val(),
            d = $("#forgotform input[name=captcha]").val();
        b.post(purl + "resetPasswordForClient", {
            email: c,
            code: d
        }).success(function(b) {
            a.forgoterr = ["申请成功！我们将发送重置密码邮件到您的邮箱。"]
        }).error(function(b) {
            a.changeCaptcha(), a.forgoterr = [b.error]
        })
    }
}]), angular.module("account.accountSer", ["dashBoard.storageSer"]).factory("accountSer", ["$http", "$q", "storageSer", function(a, b, c) {
    return {
        signout: function() {
            var d = b.defer();
            return a.post(purl + "signout").success(function(a) {
                d.resolve(), c.removeAll()
            }), d.promise
        }
    }
}]), angular.module("startMod", ["dashBoard", "appMod"]), angular.module("startMod").controller("StartCtrl", ["$http", "$scope", "apps", function(a, b, c) {
    b.links = {
        android: {
            doc: "/docs/android_guide.html",
            demo: "/docs/sdk_down.html"
        },
        ios: {
            doc: "/docs/ios_os_x_guide.html",
            demo: "/docs/sdk_down.html"
        },
        js: {
            doc: "/docs/js_guide.html",
            demo: "/docs/sdk_down.html"
        },
        unity: {
            doc: "/docs/unity_guide.html",
            demo: "/docs/sdk_down.html"
        },
        wp: {
            doc: "/docs/dotnet_guide.html",
            demo: "/docs/sdk_down.html"
        }
    }, b.apps = c, b.selectedPlat = "ios", b.$watch("apps.all", function() {
        b.apps.all.length > 0 && (b.SelectedApp = b.apps.all[0])
    }), b.$watch("SelectedApp", function() {
        b.SelectedApp && (b.app_id = b.SelectedApp.app_id, b.app_key = b.SelectedApp.app_key)
    }), b.createApp = function() {
        a.post(purl + "clients/self/apps", {
            name: b.appname
        }).success(function(a) {
            b.SelectedApp = a
        }).error(function(a) {})
    }, b.docloaded = function() {}
}]), angular.module("settingMod", ["dashBoard", "appMod", "billMod"]), angular.module("settingMod").config(["$routeProvider", function(a) {
    a.when("/setting/info", {
        templateUrl: "views/site/basic_set.html"
    }).when("/setting/password", {
        templateUrl: "/setting_password.html"
    }).when("/setting/mail", {
        templateUrl: "/setting_email.html"
    }).when("/setting/self", {
        templateUrl: "/setting_self.html"
    }).when("/setting/team", {
        templateUrl: "/setting_team.html",
        controller: "SettingTeamCtrl"
    }).when("/setting/invite", {
        templateUrl: "/setting_invite.html",
        controller: "InviteUserCtrl"
    }).otherwise({
        redirectTo: "/setting/info"
    })
}]), angular.module("settingMod").controller("SettingCtrl", ["$scope", "$http", "Team", "TeamMember", "$modal", function(a, b, c, d, e) {
    a.$watch("user.username", function() {
        a.user && a.user.username && (a.invite_url = "http://leancloud.cn/login.html?refuser=" + encodeURIComponent(a.user.username) + "#/signup")
    }), a.changePassword = function() {
        var a = $("#user-reset [name='prepass']").val(),
            c = $("#user-reset [name='newpass']").val(),
            d = $("#user-reset [name='newpass1']").val();
        return c != d ? void showmsg("新密码输入不一致", AVC.Error) : void b.post(purl + "clients/self/changePassword", {
            old_password: a,
            new_password: c
        }).success(function(a) {
            showmsg("密码重置成功"), $("#user-reset").modal("hide")
        }).error(function(a) {})
    }, a.verifyEmail = {}, a.changeEmail = function() {
        b.post(purl + "clients/self/changeEmailForClient", {
            new_email: a.verifyEmail.email,
            password: a.verifyEmail.password
        }).success(function(a) {
            showmsg("保存成功，我们将发确认邮件到您的新邮箱"), $("#user-reset-email").modal("hide")
        }).error(function(a) {})
    }, a.setEmailOption = function() {
        b.post(purl + "clients/self", {
            accept_email: a.user.accept_email
        }).success(function(a) {
            $("#user-spec").modal("hide")
        })
    }, a.verifyEmail = function() {
        b.get(purl + "requestClientEmailVerify").then(function() {
            showmsg("操作成功，注意查收验证邮件")
        })
    }, a.showPhoneEditView = function(a) {}
}]), angular.module("settingMod").controller("InviteUserCtrl", ["$scope", "$http", function(a, b) {
    a.inviteJoin = function() {
        for (var c = a.inviteEmails.split(/,|，/), d = 0; d < c.length; d++) if (c[d] = c[d].trim(), !validateEmail(c[d])) return void showmsg("邮件格式有误", AVC.Error);
        b.post(purl + "invite", {
            emails: c.join(",")
        }).success(function(a) {
            showmsg("邀请发送成功")
        })
    }
}]), angular.module("settingMod").controller("SettingUserDetailCtrl", ["$scope", "$http", function(a, b) {
    a.getUserDetail = function() {
        b.get(purl + "clients/self/detail").success(function(b) {
            a.userDetail = {
                client_type: b.client_type,
                client_name: b.client_name,
                company: b.company,
                company_site: b.company_site,
                phone: b.phone,
                oicq: b.oicq,
                address: b.address,
                invoice_title: b.invoice_title
            }
        })
    }, a.updateUserDetail = function() {
        a.userDetail.client_type && (a.userDetail.client_type = parseInt(a.userDetail.client_type)), b.post(purl + "clients/self/detail", a.userDetail).success(function(a) {
            showmsg("开发者信息更新成功")
        })
    }, a.getUserDetail()
}]), angular.module("settingMod").controller("SettingInfoCtrl", ["$scope", "$http", function(a, b) {
    a.getClientDetail = function() {}, a.updateClientDetail = function() {}
}]), angular.module("settingMod").controller("SettingTeamCtrl", ["$scope", "$http", "Team", "TeamMember", function(a, b, c, d) {
    a.teams = [], a.loadTeams = function() {
        c.query(function(b) {
            a.teams = b
        })
    }, a.deleteTeamById = function(b) {
        var d = new c;
        d.id = b, d.$delete(function(c) {
            for (var d = 0; d < a.teams.length; d++) if (a.teams[d].id == b) {
                a.teams.splice(d, 1);
                break
            }
        })
    }, a.setCurrentTeamId = function(b) {
        a.teamId = b
    }, a.loadTeams(), a.$on("modal.hide", function() {
        a.loadTeams()
    })
}]), angular.module("settingMod").controller("SettingTeamInstanceCtrl", ["$scope", "$http", "Team", "TeamMember", "$timeout", function(a, b, c, d, e) {
    a.editteam = {}, a.currentTeam = {}, a.$watch("currentTeam.id", function() {
        a.teamaction = "/1/clients/self/teams/" + a.currentTeam.id
    }), a.loadTeamMembersById = function(b) {
        b = b || a.teamId, b && -1 != b && d.get({
            teamid: b
        }, function(b) {
            a.currentTeam.members = b.results
        })
    }, a.getCooperatorByName = function(b) {
        var c;
        return angular.forEach(a.tipTeamUsers, function(a, d) {
            a.name == b && (c = a)
        }), c
    }, a.saveTeamName = function() {
        var b = new c;
        a.currentTeam && (b.id = a.currentTeam.id), b.name = a.editteam.name, b.$save(function(b) {
            b.client_id ? (a.teams.push(b), a.currentTeam = b, a.loadTeamMembersById(b.id)) : a.currentTeam.name = a.editteam.name
        }), $(".team-name-placeholder").show(), $(".team-name-update-form").hide()
    }, a.updateTeamNamePlaceholder = function() {
        $(".team-name-placeholder").hide(), $(".team-name-update-form").show()
    }, a.addTeamMemberPlaceholder = function() {
        $(".user-name-placeholder").hide(), $(".team-manage-form-add").show()
    }, a.addTeamMember = function() {
        var b = new d;
        b.teamid = a.currentTeam.id;
        for (var c, e = 0; e < a.tipTeamUsers.length; e++) if (a.tipTeamUsers[e].name == a.currentTeam.teamMemberName) {
            c = a.tipTeamUsers[e].id;
            break
        }
        c && (b.member_id = c, b.$save(function(c) {
            a.loadTeamMembersById(b.teamid)
        }), $(".team-manage-form-add").hide(), $(".user-name-placeholder").show())
    }, a.removeTeamMember = function(b, c) {
        var e = new d;
        e.teamid = b, e.memberid = c, e.$delete(function(b) {
            for (var d = 0; d < a.currentTeam.members.length; d++) if (a.currentTeam.members[d].client_id == c) {
                a.currentTeam.members.splice(d, 1);
                break
            }
        })
    }, a.queryClientsByName = function(c, d) {
        return c && "" != c.trim() ? b.get(purl + "clients/find/like", {
            params: {
                type: d,
                name: c
            }
        }).then(function(b) {
            return a.tipTeamUsers = b.data.results, b.data.results
        }) : void 0
    }, a.getTeam = function() {
        c.get({
            id: a.teamId
        }, function(b) {
            $.extend(a.currentTeam, b), a.editteam = {}, a.editteam.name = a.currentTeam.name
        })
    }, a.uploadLogoCB = function(b, d) {
        if (d && b.length > 0) try {
            b = JSON.parse(b), b.error ? showmsg(b.error, AVC.Error) : c.get({
                id: a.currentTeam.id
            }, function(b) {
                e(function() {
                    $.extend(a.currentTeam, b)
                })
            })
        } catch (f) {}
    }, -1 != a.teamId && (a.loadTeamMembersById(a.teamId), a.getTeam())
}]), angular.module("settingMod").controller("PhoneSetCtrl", ["$http", "$scope", "$timeout", "$rootScope", function(a, b, c, d) {
    function e() {
        b.nextTime > 0 && (b.nextTime--, c(e, 1e3))
    }
    b.phoneSet = {}, b.nextTime = -1;
    var f = "验证码已经已成功发送，注意查收";
    b.getChangePhoneCode = function() {
        b.nextTime = 60, e(), a.get(purl + "clients/self/requestChangeClientPhoneSmsCode", {
            params: {
                phone: b.phoneSet.phone
            }
        }).success(function() {
            showmsg(f)
        }).error(function() {
            b.nextTime = 0
        })
    }, b.changePhone = function() {
        a.post(purl + "clients/self/changePhoneForClient", b.phoneSet).success(function(a) {
            b.loaduser(), b.hideModal()
        })
    }, b.getVerifyCode = function() {
        b.nextTime = 60, e(), a.get(purl + "requestClientPhoneVerify").success(function() {
            showmsg(f)
        }).error(function() {
            b.nextTime = 0
        })
    }, b.verifyPhone = function() {
        a.get(purl + "verifyClientPhone/" + b.phoneSet.code).success(function(a) {
            b.loaduser(), b.hideModal()
        })
    }
}]), angular.module("billMod", ["dashBoard", "appMod"]), angular.module("billMod").config(["$routeProvider", function(a) {
    a.when("/bill/general", {
        templateUrl: "views/bill/bill_general.html",
        controller: "BillGeneralCtrl"
    }).when("/bill", {
        templateUrl: "views/bill/bill_list.html"
    }).when("/bill/charge/:item/:money?", {
        templateUrl: "views/bill/bill_charge.html",
        controller: "ChargeCtrl"
    }).when("/bill/record", {
        templateUrl: "views/bill/bill_charge_record.html"
    }).when("/bill/detail/:billid", {
        templateUrl: "/setting_bill_detail.html",
        controller: "SettingBillDetailCtrl"
    }).when("/bill/invoice", {
        templateUrl: "/views/bill/bill_invoice.html",
        controller: "BillInvoiceCtrl"
    }).otherwise({
        redirectTo: "/bill/general"
    })
}]), angular.module("billMod").controller("BillCtrl", ["$scope", "$http", function(a, b) {
    a.userpay = {
        selectedPay: "alipay"
    }, a.pays = [{
        value: "alipay",
        img: "alipay-v3.png",
        title: "支付宝"
    }], a.$watch("userpay.selectedPay", function() {
        a.userpay.selectedPay && angular.forEach(a.pays, function(b, c) {
            b.value == a.userpay.selectedPay && (a.currentCharge = b)
        })
    }), a.getBillNumStr = function(a) {
        return a >= 1e9 ? (a / 1e9).toFixed(1).replace(/\.0$/, "") + "b" : a >= 1e6 ? (a / 1e6).toFixed(1).replace(/\.0$/, "") + "m" : a >= 1e3 ? (a / 1e3).toFixed(1).replace(/\.0$/, "") + "k" : a
    }, a.getBillBytesToSize = function(a) {
        if (0 == a) return "0";
        var b = ["字节", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            c = 1024,
            d = parseInt(Math.floor(Math.log(a) / Math.log(c)));
        return 0 == d ? a + " " + b[d] : (a / Math.pow(c, d)).toFixed(1) + " " + b[d]
    }, a.getBillBytesToGig = function(a) {
        return a >= 1e9 ? (a / 1e9).toFixed(2).replace(/\.0$/, "") + " GB" : a >= 1e6 ? (a / 1e6).toFixed(2).replace(/\.0$/, "") + " MB" : a >= 1e3 ? (a / 1e3).toFixed(2).replace(/\.0$/, "") + " KB" : a + " 字节"
    }, a.getBillUsage = function(a, b) {
        var c = (b / a * 100).toFixed(2);
        return c > 100 ? 100 : c
    }
}]), angular.module("billMod").controller("BillGeneralCtrl", ["$scope", "$http", function(a, b) {
    a.getBillGeneralInfo = function() {
        b.get(purl + "payment/money-account").success(function(b) {
            a.billGeneral = b
        })
    }, a.getBillGeneralInfo()
}]), angular.module("billMod").controller("ChargeCtrl", ["$scope", "$http", "$routeParams", function(a, b, c) {
    a.buyItem = c.item, isNaN(Number(c.money)) || (a.userpay.chargeValue = Number(c.money)), a.createCharge = function() {
        a.chargeConfirmForm = {}, b.post(purl + "payment/prepaid-order", {
            amount: a.userpay.chargeValue
        }).success(function(b) {
            a.chargeConfirmForm = b
        })
    }, a.confirmToPay = function() {
        $("#charge_modal").modal("hide"), $("#charge_confirm_modal").modal("show")
    }, a.finishPay = function() {
        $("#charge_confirm_modal").modal("hide"), setTimeout(function() {
            location.href = "/bill.html#/bill/general"
        }, 1e3)
    }, a.useCode = function() {
        b.post(purl + "payment/coupon-charge ", {
            code: a.chargeCode
        }).success(function(b) {
            a.codeChargeError = "", a.codeChargeSuccess = '充值成功, <a href="#/bill/general"> 查看账户</a> '
        }).error(function(b) {
            a.codeChargeSuccess = "", a.codeChargeError = b.error
        })
    }
}]), angular.module("billMod").controller("SmsPayCtrl", ["$scope", "$http", "$timeout", "$window", function(a, b) {
    a.smsPay = {
        type: "alipay"
    }, a.createSmsPayForm = function() {
        a.smsPayForm = {}, "alipay" == a.smsPay.type && b.post(purl + "payment/item-order", {
            quantity: a.smsPay.quantity,
            item: 1
        }).success(function(b) {
            a.chargeConfirmForm = b
        })
    }, a.confirmToBuySms = function() {
        "alipay" === a.smsPay.type ? $("#sms_pay_form").submit() : "account" == a.smsPay.type && b.post(purl + "payment/buy-item", {
            item: 1,
            quantity: a.smsPay.quantity
        }).success(function() {
            showmsg('购买短信成功，返回 <a href="/bill.html#/bill/general">财务</a> 查看')
        }), $("#sms_pay_modal").modal("hide"), "alipay" == a.smsPay.type && $("#charge_confirm_modal").modal("show")
    }, a.finishPay = function() {
        $("#charge_confirm_modal").modal("hide"), $timeout(function() {
            $window.location.href = "/bill.html#/bill/general"
        }, 1e3)
    }
}]), angular.module("billMod").controller("TicketPayCtrl", ["$scope", "$http", "$timeout", "$window", "Team", function(a, b, c, d, e) {
    a.pay = {
        type: "alipay",
        unit: {
            pro: 200,
            ep: 500
        },
        serviceType: "pro",
        item: {
            pro: 2,
            ep: 3
        }
    }, a.$watch("billGeneral", function() {
        a.billGeneral && a.billGeneral.current_support_service && (2 == a.billGeneral.current_support_service.item_type ? a.pay.serviceType = "pro" : (a.pay.serviceType = "ep", a.pay.team = a.billGeneral.current_support_service.client_id))
    }), a.getPrice = function() {
        var c = {
            quantity: a.pay.quantity,
            item: a.pay.item[a.pay.serviceType]
        };
        "ep" == a.pay.serviceType && (c.client_id = a.pay.team, c.client_type = 1), b.get(purl + "payment/get-item-amount", {
            params: c
        }).success(function(b) {
            a.pay.amount = b.amount
        })
    }, a.loadTeams = function() {
        e.query(function(b) {
            a.teams = b
        })
    }, a.isFormValid = function() {
        if (!a.billGeneral) return !1;
        var b = a.ticketForm.$valid;
        return "ep" == a.pay.serviceType && (b = b && a.pay.team && a.pay.quantity > 5 ? !0 : !1), b
    }, a.createPayForm = function() {
        if ("alipay" == a.pay.type) {
            var c = {
                quantity: a.pay.quantity,
                item: a.pay.item[a.pay.serviceType]
            };
            "ep" == a.pay.serviceType && (c.client_id = a.pay.team, c.client_type = 1), b.post(purl + "payment/item-order", c).success(function(b) {
                a.chargeConfirmForm = b
            })
        }
    }, a.confirmToBuy = function() {
        if ("alipay" === a.pay.type) $("#ticket_pay_form").submit();
        else if ("account" == a.pay.type) {
            var c = {
                quantity: a.pay.quantity,
                item: a.pay.item[a.pay.serviceType]
            };
            "ep" == a.pay.serviceType && (c.client_id = a.pay.team, c.client_type = 1), b.post(purl + "payment/buy-item", c).success(function() {
                showmsg('购买成功，返回 <a href="/bill.html#/bill/general">财务</a> 查看')
            })
        }
        $("#ticket_pay_modal").modal("hide"), "alipay" == a.pay.type && $("#charge_confirm_modal").modal("show")
    }, a.finishPay = function() {
        $("#charge_confirm_modal").modal("hide"), c(function() {
            d.location.href = "/bill.html#/bill/general"
        }, 1e3)
    }, a.loadTeams(), a.$watch("[pay.quantity,pay.serviceType]", function() {
        a.isFormValid() ? a.getPrice() : a.pay.amount = 0
    }, !0)
}]), angular.module("billMod").controller("ChargeCallbackCtrl", ["$scope", "$http", function(a, b) {
    a.getCharge = function(c) {
        c = c || getParam().chargeid, b.get(purl + "payment/prepaid-order/" + c).success(function(b) {
            a.chargeCallbackInfo = b
        })
    }, a.getCharge()
}]), angular.module("billMod").controller("ChargeRecordCtrl", ["$scope", "$http", "ChargeRecordSer", function(a, b, c) {
    a.currentPage = 1, a.pageSize = 10, a.queryCondition = {}, a.getChargeRecords = function(b, d, e, f) {
        c.getByType({
            tx_type: b,
            item_type: d,
            skip: e,
            limit: f
        }).then(function(b) {
            a.billCharges = b.items, a.totalCount = b.total
        })
    }, a.setCondition = function(b, c) {
        a.queryCondition.tx_type = b, a.queryCondition.item_type = c
    }, a.$watchCollection("[pageSize,currentPage]", function() {
        a.getChargeRecords(a.queryCondition.tx_type, a.queryCondition.item_type, (a.currentPage - 1) * a.pageSize, a.pageSize)
    }), a.$watch("queryCondition", function(b, c) {
        JSON.stringify(b) !== JSON.stringify(c) && (a.currentPage = 1, a.getChargeRecords(a.queryCondition.tx_type, a.queryCondition.item_type, 0, a.pageSize))
    }, !0)
}]), angular.module("billMod").controller("BillListCtrl", ["$scope", "$http", function(a, b) {
    a.currentPage = 1, a.pageSize = 10, a.loadBills = function() {
        b.get(purl + "clients/self/bills", {
            params: {
                skip: (a.currentPage - 1) * a.pageSize,
                limit: a.pageSize
            }
        }).success(function(b) {
            angular.forEach(b, function(a, b) {
                a.bfill_date = moment("" + a.bill_date, "YYYYMM").format("YYYY - MM")
            }), a.bills = b.items, a.totalCount = b.total
        })
    }, a.loadBills(), a.$watch("[currentPage,pageSize]", function(b, c) {
        b[0] !== c[0] && a.loadBills()
    }, !0)
}]), angular.module("billMod").controller("SettingBillDetailCtrl", ["$scope", "$http", "$routeParams", function(a, b, c) {
    b.get(purl + "clients/self/bills/" + c.billid).success(function(b) {
        b.total.bill_date = moment("" + b.total.bill_date, "YYYYMM").format("YYYY-MM"), a.billDetail = b
    })
}]), angular.module("billMod").controller("BillInvoiceCtrl", ["$scope", "$http", "$routeParams", "ChargeRecordSer", "$modal", function(a, b, c, d, e) {
    function f() {
        a.getInvoices().then(function() {
            g()
        })
    }
    function g() {
        var c = {};
        a.invoices && a.invoices.length > 0 ? ($.extend(c, a.invoices[0]), delete c.id, delete c.amount, a.invoice = c) : b.get(purl + "clients/self/detail").success(function(b) {
            b.address && b.phone && b.invoice_title || (a.invoiceTip = !0), a.invoice = {}, a.invoice.reciever_address = b.address, a.invoice.reciever_phone = b.phone, a.invoice.invoice_title = b.invoice_title, a.invoice.invoice_type = 1
        })
    }
    a.currentPage = 1, a.pageSize = 10, a.initList = f, a.setCurrentInvoice = function(b) {
        b ? a.invoice = b : a.invoice || g(), a.$formModal = e({
            scope: a,
            template: "views/bill/invoice_form.html",
            show: !0
        })
    }, a.cancelInvoice = function(b) {
        d.cancelInvoice(b || a.invoice.id).then(function() {
            a.initList(), a.$formModal && a.$formModal.hide()
        })
    }, a.getInvoices = function() {
        return d.getInvoiceList({
            skip: (a.currentPage - 1) * a.pageSize,
            limit: a.pageSize
        }).then(function(b) {
            a.invoices = b.items, a.totalCount = b.total
        })
    }, a.$watch("[currentPage,pageSize]", function(b, c) {
        b[0] != c[0] && a.getInvoices()
    }, !0), f()
}]), angular.module("billMod").controller("BillInvoiceFormCtrl", ["$scope", "$http", "$routeParams", "ChargeRecordSer", function(a, b, c, d) {
    function e() {
        a.invoice.id ? d.getInvoice(a.invoice.id).then(function(b) {
            a.invoice = b
        }) : d.getRecordForInvoice().then(function(b) {
            a.availableCharges = b
        })
    }
    a.selectedChargesIds = [], a.toggleCharge = function() {
        var b = a.availableCharges.filter(function(a) {
            return a.selected
        });
        b && (a.selectedChargesIds = b.map(function(a) {
            return a.id
        }), a.invoice.amount = 0, b.forEach(function(b) {
            a.invoice.amount += b.amount
        }))
    }, a.saveInvoice = function() {
        1 === a.invoice.invoice_type ? a.invoice.invoice_item = "技术服务费" : 2 === a.invoice.invoice_type && (a.invoice.invoice_item = "信息技术服务费"), a.invoice.recharges = a.selectedChargesIds;
        var c = "post",
            d = purl + "clients/self/invoices";
        a.invoice.id && (c = "put", d += "/" + a.invoice.id), b({
            method: c,
            url: d,
            data: a.invoice
        }).success(function(b) {
            showmsg("申请发票成功"), a.$formModal.hide(), a.initList()
        }).error(function() {})
    }, e()
}]), angular.module("billMod").factory("ChargeRecordSer", ["$http", function(a) {
    function b(b) {
        return a.get(purl + "payment/transactions", {
            params: b
        }).then(function(a) {
            return a.data
        })
    }
    function c(b) {
        return a.get(purl + "clients/self/invoices", {
            params: b
        }).then(function(a) {
            return a.data.items.forEach(function(a) {
                a.applyDate = moment(a.created.iso).format("YYYY-MM-DD"), a.deliverDate = a.delivered ? moment(a.created.iso).format("YYYY-MM-DD") : ""
            }), a.data
        })
    }
    function d(b) {
        return a.post(purl + "clients/self/invoices/" + b + "/cancel")
    }
    function e(b) {
        return a.get(purl + "clients/self/invoices/" + b).then(function(a) {
            return a.data
        })
    }
    function f() {
        return a.get(purl + "payment/transactions", {
            params: {
                tx_type: 1,
                item_type: 0,
                invoice_status: 0
            }
        }).then(function(a) {
            return a.data.items
        })
    }
    return {
        getByType: b,
        getInvoiceList: c,
        cancelInvoice: d,
        getInvoice: e,
        getRecordForInvoice: f
    }
}]), function() {
    angular.module("devComponentMod", ["appMod", "devComponent.service", "ngTable"]);
    var a = angular.module("devComponentMod");
    angular.module("devComponentMod").config(["$routeProvider", function(a) {
        a.when("/component/feedback", {
            templateUrl: "views/component-feedback.html",
            controller: "FeedbackCtrl"
        }).when("/component/custom_param", {
            templateUrl: "views/app-stat-custom.html",
            controller: "CustomParamCtrl"
        }).when("/component/appsearch", {
            templateUrl: "views/app-search-set.html",
            controller: "AppSearchURLCtrl"
        }).when("/component/sns", {
            templateUrl: "views/sns-set.html",
            controller: "SnsCtrl"
        }).otherwise({
            redirectTo: "/component/feedback"
        })
    }]), angular.module("devComponentMod").controller("CustomParamCtrl", ["$http", "$scope", "App", function(a, b, c) {
        b.statCustomParams = {}, c.then(function() {
            b.currentApp && b.currentApp.stats_kvs && (b.statCustomParams = b.currentApp.stats_kvs)
        }), b.setCurrentStatParam = function(a, c) {
            b.statParam = {
                name: a,
                value: c.value,
                desc: c.desc,
                prename: a
            }
        }, b.updateStatCustomParam = function(c, d, e, f) {
            return c = c || b.statParam.prename, d = d || b.statParam.name, f = f || b.statParam.desc, e = e || b.statParam.value, d ? e ? (b.statCustomParams[d] = {
                value: e,
                desc: f
            }, c && c != d && delete b.statCustomParams[c], $("#stat-edit-custom-params").modal("hide"), void a.post(purl + "clients/self/apps/" + b.app.app_id + "/customParams", {
                stats_kvs: JSON.stringify(b.statCustomParams)
            }).success(function(a) {})) : void showmsg("参数值不能为空", AVC.Error) : void showmsg("参数名不能为空", AVC.Error)
        }, b.deleteStatCustomParam = function(c) {
            delete b.statCustomParams[c], a.put(purl + "clients/self/apps/" + b.app.app_id, {
                stats_kvs: JSON.stringify(b.statCustomParams)
            }).success(function(a) {})
        }, b.addStatCustomParam = function() {
            b.statParam = {
                name: "",
                value: "",
                desc: ""
            }
        }
    }]), a.controller("AppSearchURLCtrl", ["$scope", "$http", "App", "SchemaLoader", function(a, b, c, d) {
        a.appSearch = {
            uri_host: "avoscloud"
        }, a.appSearchConfig = {}, c.then(function(b) {
            a.appSearch.app_name = b.app_name
        });
        var e = purl + "data/apps/" + getParam().appid + "/deeplink",
            f = purl + "data/apps/" + getParam().appid;
        a.saveSearchURL = function() {
            b.post(e, a.appSearch).success(function(a) {
                showmsg("操作成功")
            })
        }, a.getSearchURL = function() {
            b.get(e).success(function(b) {
                angular.forEach(b, function(c, d) {
                    c && (a.appSearch[d] = b[d])
                })
            })
        }, a.saveSearchClaConfig = function(c) {
            b.post(f + "/" + c + "/search", {
                enable: a.appSearchConfig[c]
            }).success(function(a) {})
        }, a.getSearchURL()
    }])
}(), function() {
    var a = angular.module("devComponentMod");
    a.controller("FeedbackCtrl", ["$http", "$scope", "ngTableParams", "App", function(a, b, c, d) {
        var e = {};
        d.then(function() {
            e.headers = {
                "X-AVOSCloud-Application-Id": b.currentApp.app_id,
                "X-AVOSCloud-Application-Key": b.currentApp.app_key
            }, b.queryPagination()
        }), b.queryPagination = function() {
            b.tableParams ? b.tableParams.reload() : b.tableParams = new c({
                page: 1,
                count: 10
            }, {
                total: 1,
                getData: function(a, c) {
                    var d = (c.page() - 1) * c.count(),
                        e = c.count(),
                        c = {};
                    c.skip = d, c.limit = e, c.order = "-updatedAt", b.getFeedbackList(c).then(function(b) {
                        a.resolve(b.data.results)
                    })
                }
            })
        }, b.nextPage = function() {
            var a = b.tableParams.$params.page;
            b.tableParams.page(a + 1)
        }, b.prePage = function() {
            var a = b.tableParams.$params.page;
            b.tableParams.page(a - 1)
        }, b.getFeedbackList = function(b) {
            return a({
                method: "GET",
                url: purl + "feedback",
                headers: e.headers,
                params: b
            })
        }, b.setCurrentFeedback = function(a) {
            b.feedback = a
        }, b.updateFeedbackStatus = function(c, d) {
            a({
                method: "PUT",
                url: purl + "feedback/" + c,
                headers: {
                    "X-AVOSCloud-Application-Id": b.currentApp.app_id,
                    "X-AVOSCloud-Application-Key": b.currentApp.app_key
                },
                data: {
                    status: d
                }
            }).success(function(a) {
                b.queryPagination()
            })
        }, b.deleteFeedback = function(c) {
            a({
                method: "DELETE",
                url: purl + "feedback/" + c,
                headers: {
                    "X-AVOSCloud-Application-Id": b.currentApp.app_id,
                    "X-AVOSCloud-Application-Key": b.currentApp.app_key
                }
            }).success(function(a) {
                b.queryPagination()
            })
        }
    }]), a.controller("FeedbackCommentCtrl", ["$http", "$scope", function(a, b) {
        function c(c) {
            a({
                method: "POST",
                url: purl + "feedback/" + b.feedback.objectId + "/threads",
                headers: {
                    "X-AVOSCloud-Application-Id": b.currentApp.app_id,
                    "X-AVOSCloud-Application-Key": b.currentApp.app_key
                },
                data: c
            }).success(function(a) {
                b.feedbackContent = "", $("#feedback-file").val(""), b.getComments()
            })
        }
        b.getComments = function() {
            return a({
                method: "GET",
                url: purl + "feedback/" + b.feedback.objectId + "/threads",
                headers: {
                    "X-AVOSCloud-Application-Id": b.currentApp.app_id,
                    "X-AVOSCloud-Application-Key": b.currentApp.app_key
                }
            }).success(function(a) {
                a.results.unshift({
                    type: "user",
                    content: b.feedback.content,
                    attachment: b.feedback.attachment,
                    updatedAt: b.feedback.updatedAt
                }), b.feedback.comments = a.results
            })
        }, b.sendFeedback = function() {
            var a = {
                type: "dev"
            };
            a.content = b.feedbackContent;
            var d = $("#feedback-file")[0];
            if (d.files.length > 0) {
                var e = d.files[0],
                    f = new AV.File(e.name, e);
                f.save().then(function(b) {
                    a.attachment = b._url, c(a)
                })
            } else c(a)
        }, b.getComments()
    }])
}(), function() {
    var a = angular.module("devComponent.service", []);
    a.factory("Feedback", ["$resource", "$q", "$routeParams", function(a, b, c) {
        return a(purl + "feedback/:id", {
            id: "@id"
        }, {})
    }])
}(), function() {
    "use strict";

    function a(a, b, c) {
        b.snsplats = {
            qq: {},
            weixin: {},
            weibo: {}
        }, b.list = function() {
            c.query().$promise.then(function(a) {
                angular.forEach(a, function(a, c) {
                    b.snsplats[a.platform] = a
                })
            })
        }, b.save = function(a) {
            var d = b.snsplats[a],
                e = new c({
                    platform: a,
                    platform_key: d.platform_key,
                    platform_secret: d.platform_secret,
                    platform_scope: d.platform_scope,
                    id: d.id
                });
            e.id ? e.$update(function() {
                b.list()
            }) : e.$save(function() {
                b.list()
            })
        }, b.list()
    }
    angular.module("devComponentMod").factory("Sns", ["$resource", function(a) {
        var b = purl + "clients/self/apps/:app_id/snsConfigs/:id";
        return a(b, {
            app_id: getParam().appid,
            id: "@id"
        }, {
            update: {
                method: "PUT"
            }
        })
    }]), angular.module("devComponentMod").controller("SnsCtrl", ["$http", "$scope", "Sns", a])
}(), function() {
    "use strict";
    angular.module("statConfigMod", ["statConfigMod.channelctrl", "statConfigMod.datactrl", "statConfigMod.reportctrl"]), angular.module("statConfigMod").config(["$routeProvider", function(a) {
        a.when("/statconfig/report", {
            templateUrl: "views/app-stat-report.html",
            controller: "analyticsReportSetting"
        }).when("/statconfig/channels", {
            templateUrl: "views/app-stat-channels.html",
            controller: "analyticsDataSetting"
        }).when("/statconfig/generate_channel", {
            templateUrl: "views/stat-channel-generate.html",
            controller: "analyticsDataSetting"
        })
    }])
}(), angular.module("statConfigMod.datactrl", []).controller("analyticsDataSetting", ["$scope", "$rootScope", "$http", "$location", function(a, b, c, d) {
    a.statTransConfig = "6", a.$watch("app", function() {
        a.app && (a.stat_open = a.app.enable_stats), a.app && a.app.stats_send_policy && (a.statTransConfig = a.app.stats_send_policy)
    }), a.saveTransConfig = function() {
        c.post(purl + "clients/self/apps/" + a.app.app_id + "/sendPolicy", {
            stats_send_policy: a.statTransConfig
        }).success(function(a) {
            showmsg("保存成功")
        })
    }, a.saveSDKConfig = function() {
        c.put(purl + "clients/self/apps/" + a.app.app_id, {
            enable_stats: a.stat_open
        }).success(function(a) {
            showmsg("保存成功")
        })
    }, a.saveAppDownURL = function() {
        c.put(purl + "clients/self/apps/" + a.app.app_id, {
            stats_download_url: a.app.stats_download_url
        }).success(function(a) {
            showmsg("保存成功")
        })
    }, a.loadStatCustomChannel = function() {
        c.get(purl + "stats/apps/" + getParam().appid + "/channels").success(function(b) {
            a.statCustumChannels = b
        })
    }, a.addStatCustomChannel = function() {
        c.post(purl + "stats/apps/" + a.app.app_id + "/channels", {
            name: a.statChannel.name
        }).success(function(b) {
            $("#stat-edit-channels").modal("hide"), a.loadStatCustomChannel()
        })
    }, a.deleteStatCustomChannel = function(b) {
        var d = window.confirm("删除渠道将无法再看到该渠道相关的统计数据");
        d && c["delete"](purl + "stats/apps/" + a.app.app_id + "/channels/" + b).success(function(b) {
            a.loadStatCustomChannel()
        })
    }, /\/channels$/.test(d.path()) && a.loadStatCustomChannel()
}]), angular.module("statConfigMod.reportctrl", []).controller("analyticsReportSetting", ["$scope", "$http", function(a, b) {
    var c = remoteURL + "apps/" + getParam().appid + "/report_subcribers";
    a.getReportState = function() {
        b.get(c).success(function(b) {
            a.statReportConfig = b
        })
    }, a.updateReportState = function() {
        b.post(c, a.statReportConfig)
    }, a.getReportState()
}]), angular.module("statConfigMod.channelctrl", []).controller("analyticsChannelSetting", ["$scope", "$http", function(a, b) {
    var c = remoteURL + "apps/" + getParam().appid + "/channel_accounts";
    a.statPlat = "ios", a.setOS = function(b) {
        a.statPlat = b
    }, a.$watch("statPlat", function() {
        a.getAllChannels(), a.getGeneratedChannels()
    }), a.getGeneratedChannels = function() {
        var d = {};
        d.os = a.statPlat, b.get(c, {
            params: d
        }).success(function(b) {
            a.allGeneratedChannels = b
        })
    }, a.getAllChannels = function() {
        var c = {
            column: "channel",
            appid: getParam().appid
        };
        c.os = a.statPlat, b.get(remoteURL + "load_distinct_values", {
            params: c
        }).success(function(b) {
            a.allchannels = b, a.allchannels.length && (a.generateChannel = a.allchannels[0])
        })
    }, a.generateChannelFunc = function(d) {
        if (d = d || a.generateChannel) {
            var e = {};
            e.os = a.statPlat, b.post(c + "/" + d, e).success(function(b) {
                a.getGeneratedChannels(), $("#stat-generate-channel").modal("hide")
            })
        }
    }, a.deleteGeneratedChannel = function(d) {
        var e = {};
        e.os = a.statPlat, b["delete"](c + "/" + d, {
            params: e
        }).success(function(b) {
            a.getGeneratedChannels()
        })
    }
}]), angular.module("infoCenterMod", ["appMod", "infoCenterMod.ser", "infoCenterMod.ctrl"]).config(["$routeProvider", "$httpProvider", function(a, b) {
    a.when("/index", {
        templateUrl: "views/info-center/index.html",
        controller: "infoCenter"
    }).otherwise({
        redirectTo: "/index"
    })
}]), angular.module("infoCenterMod.ctrl", []).controller("infoCenter", ["$scope", "infoCenterSer", "storageSer", function(a, b, c) {
    function d(b) {
        var c = [];
        $.each(e, function(a, d) {
            d.category === b && c.push(d)
        }), a.infoList = c
    }
    var e = [];
    a.infoList = [];
    var f = [];
    b.getNotification().then(function(c) {
        e = c, f = b.getInfoCategory(), a.infoList = e, a.category = [{
            id: -1,
            title: "全部",
            isClicked: !0,
            count: a.infoList.length
        }, {
            id: 5,
            title: f[5].title,
            isClicked: !1,
            count: f[5].count
        }, {
            id: 1,
            title: f[1].title,
            isClicked: !1,
            count: f[1].count
        }, {
            id: 3,
            title: f[3].title,
            isClicked: !1,
            count: f[3].count
        }, {
            id: 4,
            title: f[4].title,
            isClicked: !1,
            count: f[4].count
        }, {
            id: 2,
            title: f[2].title,
            isClicked: !1,
            count: f[2].count
        }, {
            id: 0,
            title: f[0].title,
            isClicked: !1,
            count: f[0].count
        }]
    }), a.switchCategory = function(b) {
        -1 === b.id ? a.infoList = e : d(b.id)
    }
}]), angular.module("infoCenterMod.ser", []).factory("infoCenterSer", ["$rootScope", "$http", "$q", "configSer", function(a, b, c, d) {
    var e = [],
        f = function() {
            e = [{
                title: "其它",
                count: 0
            }, {
                title: "财务相关",
                count: 0
            }, {
                title: "协作",
                count: 0
            }, {
                title: "网站更新",
                count: 0
            }, {
                title: "工具提示",
                count: 0
            }, {
                title: "告警信息",
                count: 0
            }]
        };
    return {
        getInfoCategory: function() {
            return e
        },
        getNotification: function() {
            var a = c.defer();
            return b.get(d.apiUrl + "/sitenotifications", {
                params: {
                    skip: 0,
                    limit: 200
                }
            }).success(function(b) {
                f(), $.each(b, function(a, b) {
                    b.time = new Date(b.created.iso).toISOString().substring(0, 10), e[b.category].count++
                }), a.resolve(b)
            }), a.promise
        },
        getNotificationByStatus: function(a) {
            var b = c.defer();
            return this.getNotification().then(function(c) {
                b.resolve(c.filter(function(b, c) {
                    return b.status === a
                }))
            }), b.promise
        }
    }
}]);