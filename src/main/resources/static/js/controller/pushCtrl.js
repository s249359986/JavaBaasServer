angular.module('baas').controller('pushSettingCtrl', ['$scope', '$state', '$stateParams', 'Notification', 'appService', 'pushService', function ($scope, $state, $stateParams, Notification, appService, pushService) {
    //获取当前应用信息
    var id = $stateParams.id;
    appService.getApp(id).then(function (app) {
        if (app.pushAccount) {
            $scope.pushAccount = app.pushAccount;
        }
    });
    /**
     * 保存设置
     */
    $scope.setPushAccount = function () {
        pushService.setPushAccount(id, $scope.pushAccount.key, $scope.pushAccount.secret).then(function () {
            Notification.success('保存成功');
        });
    };
}]);
