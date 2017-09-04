angular.module('contacts')
    .directive('contactImage', ['toggleService', function(toggleService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/contacts/directives/contact-image.directive.htm',
            scope: {
                contact: '=',
                size: '@'
            },
            link: function(scope, elems, attrs) {
                scope.PIX_URL = toggleService.getPIX();
            }
        }
    }]);