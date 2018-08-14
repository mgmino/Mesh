angular
    .module('contacts')
    .controller('detailController', detailController);

detailController.$inject = ['$scope', '$routeParams', 'contactService', 'alertService'];

function detailController($scope, $routeParams, contactService, alertService) {

    function init() {
        var cid = $routeParams.cid;

        contactService.getContactById(cid)
            .then(populateView, error);
    }

    function populateView(contactObj) {
        $scope.contact = contactObj.person;
        $scope.details = contactObj.details;
        $scope.groups = contactObj.groups;
        $scope.notes = contactObj.notes;
    }

    function error(response) {
        alertService.addAlert(alertService.TYPE.DANGER, 'Could not load contact', 5000);
    }

    init();

}
