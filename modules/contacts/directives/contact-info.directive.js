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
            details: '=',
            group: '=?'
        },
        link: link
    };

    function link(scope, elems, attrs) {
        scope.showCreateDetailModal = function() {
            var title = scope.group ?
                'Add Detail for ' + scope.group.org + ' [' + scope.group.type + ']' :
                'Add Detail for ' + scope.contact.fname + ' ' + scope.contact.lname;

            var modalOptions = {
                title: title,
                actionButtonText: 'Add',
                detail: undefined
            };
            modalService.showDetailModal({}, modalOptions)
                .then(createDetail, angular.noop);
        };

        scope.showEditDetailModal = function(detail) {
            var title = scope.group ?
                'Edit Detail for ' + scope.group.org + ' [' + scope.group.type + ']' :
                'Edit Detail for ' + scope.contact.fname + ' ' + scope.contact.lname;

            var modalOptions = {
                title: title,
                actionButtonText: 'Update',
                detail: detail
            };

            modalService.showDetailModal({}, modalOptions)
                .then(updateDetail, angular.noop);
        };

        function createDetail(detail) {
            if (scope.group) {
                contactService.createGinfo(detail, scope.group.gid).then(onSuccess, onError);
            } else {
                contactService.createPinfo(detail, scope.contact.pid).then(onSuccess, onError);
            }
        }

        function updateDetail(detail) {
            if (scope.group) {
                contactService.updateGinfo(detail, scope.group.gid).then(onSuccess, onError);
            } else {
                contactService.updatePinfo(detail, scope.contact.pid).then(onSuccess, onError);
            }
        }

        function onSuccess(response) {
            alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
        }

        function onError(error) {
            alertService.addAlert(alertService.TYPE.WARNING, error, '');
        }
    }
}