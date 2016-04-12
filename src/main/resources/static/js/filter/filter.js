/**
 * Created by bill on 16/4/12.
 */
angular.module('baas').filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);
