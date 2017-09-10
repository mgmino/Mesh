angular
    .module('contacts')
    .directive('contactInfo', contactInfo);

contactInfo.$inject = ['contactService', 'modalService', 'alertService'];

function contactInfo(contactService, modalService, alertService) {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/directives/contact-info.directive.htm',
        scope: {
            contact: '=',
            details: '='
        },
        link: link
    };

    function link(scope, elems, attrs) {
        scope.showDetailModal = function() {
            modalService.showAddDetailModal()
                .then(addDetail, angular.noop);
        };

        function addDetail(details) {
            contactService.addPinfo(details, scope.contact.id).then(
                function (response) {
                    alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
                },
                function (error) {
                    alertService.addAlert(alertService.TYPE.WARNING, error, '');
                }
            );
        }
    }
}