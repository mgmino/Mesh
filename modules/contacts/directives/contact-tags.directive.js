angular.module('contacts')
    .directive('contactTags', [function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/contacts/directives/contact-tags.directive.htm',
            scope: {
                contact: '='
            }
        }
    }]);