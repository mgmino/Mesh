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
        scope.showCreateDetailModal = function() {
            var modalOptions = {
                title: 'Add Detail for ' + scope.contact.fname + ' ' + scope.contact.lname,
//              title: 'Add Detail for ' + scope.group.org + ' [' + scope.group.type + ']',
                actionButtonText: 'Add',
                detail: undefined
            };
            modalService.showDetailModal({}, modalOptions)
                .then(createDetail, angular.noop);
        };

        scope.showEditDetailModal = function(detail) {
            var modalOptions = {
                title: 'Edit Detail for ' + scope.contact.fname + ' ' + scope.contact.lname,
//              title: 'Edit Detail for ' + scope.group.org + ' [' + scope.group.type + ']',
                actionButtonText: 'Update',
                detail: detail
            };
            modalService.showDetailModal({}, modalOptions)
                .then(updateDetail, angular.noop);
        };

        function createDetail(detail) {
            contactService.createPinfo(detail, scope.contact.pid)
                .then(onSuccess, onError);
//          contactService.createGinfo(detail, scope.group.gid)
//              .then(onSuccess, onError);
        }

        function updateDetail(detail) {
            contactService.updatePinfo(detail, scope.contact.pid)
                .then(onSuccess, onError);
//          contactService.updateGinfo(detail, scope.group.gid)
//              .then(onSuccess, onError);
        }

        function onSuccess(response) {
            alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
        }

        function onError(error) {
            alertService.addAlert(alertService.TYPE.WARNING, error, '');
        }
    }
}