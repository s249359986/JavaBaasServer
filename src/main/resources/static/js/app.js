/**
 * AngularJs App
 */

var app = angular.module('baas', ['ui.router', 'angular-loading-bar', 'ui-notification', 'ui.bootstrap']);
app.config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeSpinner = false;

    $urlRouterProvider.otherwise("/app");

    $stateProvider
        .state('apps', {
            url: '/app',
            views: {
                '': {
                    templateUrl: 'partials/main.html'
                },
                'title@apps': {
                    templateUrl: 'partials/title.html'
                },
                'main@apps': {
                    templateUrl: 'partials/apps.html'
                }
            }
        })
        .state('app', {
            url: '/app/:id',
            views: {
                '': {
                    templateUrl: 'partials/main.html'
                },
                'title@app': {
                    templateUrl: 'partials/title.html'
                },
                'main@app': {
                    templateUrl: 'partials/app.html'
                }
            }
        })
        .state('login', {//登录
            url: '/login',
            views: {
                '': {
                    templateUrl: 'partials/main.html'
                },
                'title@login': {
                    templateUrl: 'partials/title.html'
                },
                'main@login': {
                    controller:'loginCtrl',
                    templateUrl: 'partials/login.html'
                }
            }
        })
//        .state('login', {//登录
//            controller:'loginCtrl',
//            url: '/login',
//            templateUrl: 'partials/login.html'
//
//        })
        .state('reg', {//注册
            url: '/reg',
            views: {
                '': {
                    templateUrl: 'partials/main.html'
                },
                'title@reg': {
                    templateUrl: 'partials/title.html'
                },
                'main@reg': {
                    templateUrl: 'partials/reg.html'
                }
            }
        })
        .state('app.data', {
            //controller:'dataCtrl',
            url: '/data',
            templateUrl: "partials/data.html"
        })
        .state('app.data.clazz', {
            controller:'clazzCtrl',
            url: '/clazz/:clazz',
            templateUrl: "partials/data/datagrid.html"
        })
        .state('app.push', {
            url: '/push',
            templateUrl: "partials/push.html"
        })
        .state('app.stat', {
            url: '/stat',
            templateUrl: "partials/stat.html"
        })
        .state('app.setting', {
            url: '/setting',
            templateUrl: "partials/setting.html"
        })
        .state('app.setting.common', {
            url: '/common',
            templateUrl: "partials/setting/common.html"
        })
        .state('app.setting.key', {
            url: '/key',
            templateUrl: "partials/setting/key.html"
        })
        .state('app.setting.push', {
            url: '/push',
            templateUrl: "partials/setting/push.html"
        })
        .state('app.setting.export', {
            url: '/export',
            templateUrl: "partials/setting/export.html"
        })
        .state('new', {
            url: '/new',
            views: {
                '': {
                    templateUrl: 'partials/main.html'
                },
                'title@new': {
                    templateUrl: 'partials/title.html'
                },
                'main@new': {
                    templateUrl: 'partials/new.html'
                }
            }
        });
});



