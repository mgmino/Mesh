angular
    .module('contacts')
    .directive('contactTags', contactTags);

contactTags.$inject = [];

function contactTags() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/directives/contact-tags.directive.htm',
        scope: {
            contact: '='
        }
    }
}
