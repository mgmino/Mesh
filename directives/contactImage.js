angular.module('directives')
.directive('contactImage', ['PIX_URL', function(PIX_URL) {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactImage.htm',
        scope: {
            contact: '=',
            size: '@'
        },
        link: function(scope, elems, attrs) {
            scope.PIX_URL = PIX_URL;
        }
    }
}]);
