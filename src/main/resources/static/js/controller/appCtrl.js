/**
 *
 */
angular.module('baas').controller('appCtrl', ['$scope', '$state', '$stateParams', 'Notification', 'appService','userService', function ($scope, $state, $stateParams, Notification, appService,userService) {
    //获取当前应用信息





    function init()
    {


        var id = $stateParams.id;

        if (id) {
            appService.getApp(id).then(function (app) {
                $scope.app = app;
            });
        }
        //获取应用列表
        appService.getApps().then(function (apps) {
            $scope.apps = apps;
        });
        $scope.getApp = function (id) {
            appService.getApp(id).then(function (app) {
                $scope.app = app;
            });
        };
        $scope.addApp = function () {
            console.log($scope.name);
            appService.addApp($scope.name).then(function () {
                $state.go('apps');
            }, function (data) {
                Notification.error(data.message);
            });
        };
        $scope.deleteApp = function (id) {
            var result = confirm("应用删除后将无法恢复,是否确认删除?");
            if (result) {
                appService.deleteApp(id).then(function () {
                    $state.go('apps');
                });
            }
        };
        $scope.resetMasterKey = function (id) {
            var result = confirm("重置后当前的MasterKey将失效,请谨慎操作!");
            if (result) {
                appService.resetMasterKey(id).then(function () {
                    $scope.getApp(id);
                    Notification.success('重置成功');
                });
            }
        };

        $scope.signout=function(){

            userService.signout().then(function(data){
                if(data.code==0)
                {
                    $state.go("login");
                }

            },function(data){


            });
        }
    }






    if(appService.checkAdminKey())
    {
        init();
    }
    else
    {
        appService.getAdminKey().then(function(data){

            if(data.code==0)
            {
                appService.setAdminKey(data.key);//V1hwT1UyRkhUblZpUjNoclVWTlZlbEpEVlhwU1FTVXpSQ1V6UkElM0QlM0Qc3Rhc
                init();
            }


        },function(data){
            if(data.code==500)
            {
                alert(data.message);
                $state.go("login");
            }
            if(data.code==102)
            {
                alert(data.message);
                $state.go("login");
            }
        });

    }

}]);



