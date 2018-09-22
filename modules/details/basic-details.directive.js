angular
    .module('details')
    .directive('basicDetails', basicDetails);

basicDetails.$inject = ['detailService', 'modalService', 'alertService'];

function basicDetails(detailService, modalService, alertService) {
    return {
        restrict: 'E',
        templateUrl: 'modules/details/basic-details.directive.htm',
        scope: {
            details: '=',
            contact: '=',
            update: '=?'
        },
        link: link
    };

    function link(scope, elems, attrs) {
        scope.showCreateDetailModal = function() {
            var modalOptions = {
                title: 'Add Detail for ' + scope.contact.fname + ' ' + scope.contact.lname,
                actionButtonText: 'Add',
                detail: undefined
            };
            modalService.showDetailModal({}, modalOptions)
                .then(createDetail, angular.noop);
        };

        scope.showEditDetailModal = function(detail) {
            var modalOptions = {
                title: 'Edit Detail for ' + scope.contact.fname + ' ' + scope.contact.lname,
                actionButtonText: 'Update',
                detail: angular.copy(detail)
            };
            modalService.showDetailModal({}, modalOptions)
                .then(updateDetail, angular.noop);
        };

        function createDetail(detail) {
            detailService.createPinfo(detail, scope.contact.pid).then(onSuccess, onError);
        }

        function updateDetail(detail) {
            if (angular.equals(detail, scope.detail)) return false;
            detailService.updatePinfo(detail, scope.contact.pid).then(onSuccess, onError);
        }

        function onSuccess(response) {
            if (scope.update) scope.update();
            alertService.addAlert(alertService.TYPE.INFO, response.msg, 3000);
        }

        function onError(error) {
            alertService.addAlert(alertService.TYPE.WARNING, error, '');
        }
    }
}