angular.module('contacts')
    .directive('contactInfo', [function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/contacts/directives/contact-info.directive.htm',
            scope: {
                details: '='
            }
        }
    }]);