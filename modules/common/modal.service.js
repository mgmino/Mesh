angular
    .module('common')
    .service('modalService', modalService);

modalService.$inject = ['$uibModal'];

function modalService($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showDetailModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.templateUrl = 'modules/details/detail-modal.htm';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.showGroupModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.templateUrl = 'modules/groups/group-modal.htm';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.showNoteModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.templateUrl = 'modules/notes/note-modal.htm';
        return this.show(customModalDefaults, customModalOptions);
    };


    this.show = function (customModalDefaults, customModalOptions) {

        var tempModalDefaults = {};
        var tempModalOptions = {};

        // Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        // Map base.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            }]
        }

        return $uibModal.open(tempModalDefaults).result;
    };

}
