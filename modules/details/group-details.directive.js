angular
    .module('details')
    .directive('groupDetails', groupDetails);

groupDetails.$inject = ['detailService', 'modalService', 'alertService'];

function groupDetails(detailService, modalService, alertService) {
    return {
        restrict: 'E',
        templateUrl: 'modules/details/group-details.directive.htm',
        scope: {
            details: '=',
            group: '=',
            update: '=?'
        },
        link: link
    };

    function link(scope, elems, attrs) {
        scope.showCreateDetailModal = function() {
            var modalOptions = {
                title: 'Add Detail for ' + scope.group.org + ' [' + scope.group.type + ']',
                actionButtonText: 'Add',
                detail: undefined
            };
            modalService.showDetailModal({}, modalOptions)
                .then(createDetail, angular.noop);
        };

        scope.showEditDetailModal = function(detail) {
            var modalOptions = {
                title: 'Edit Detail for ' + scope.group.org + ' [' + scope.group.type + ']',
                actionButtonText: 'Update',
                detail: angular.copy(detail)
            };
            modalService.showDetailModal({}, modalOptions)
                .then(updateDetail, angular.noop);
        };

        function createDetail(detail) {
            detailService.createGinfo(detail, scope.group.gid).then(onSuccess, onError);
        }

        function updateDetail(detail) {
            if (angular.equals(detail, scope.detail)) return false;
            detailService.updateGinfo(detail, scope.group.gid).then(onSuccess, onError);
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