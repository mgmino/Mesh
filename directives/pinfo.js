angular.module('directives')
.directive('pinfo', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/pinfo.htm',
        scope: {
            details: '='
        }
    }
}]);

