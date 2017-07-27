angular.module('directives')
.directive('contactTags', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactTags.htm',
        scope: {
            contact: '='
        }
    }
}]);
