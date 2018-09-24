angular
    .module('contacts')
    .controller('detailController', detailController);

detailController.$inject = ['$scope', '$routeParams', 'contactService', 'modalService', 'alertService'];

function detailController($scope, $routeParams, contactService, modalService, alertService) {

    function init() {
        var cid = $routeParams.cid;
        loadContact(cid);
    }

    $scope.loadContact= loadContact.bind(this, $routeParams.cid);
    $scope.showCreateGroupModal= showCreateGroupModal;
    $scope.showCreateNoteModal= showCreateNoteModal;
    $scope.showEditGroupModal= showEditGroupModal;
    $scope.showEditNoteModal= showEditNoteModal;

    function loadContact(cid) {
        return contactService.getContactById(cid)
            .then(
                populateView,
                function(response) {
                    alertService.addAlert(alertService.TYPE.DANGER, 'Could not load contact', 5000);
                });
    }

    function populateView(contactObj) {
        $scope.contact= contactObj.person;
        $scope.details= contactObj.details;
        $scope.groups= contactObj.groups;
        $scope.notes= contactObj.notes;
    }

    function showCreateGroupModal() {
        var modalOptions = {
            title: 'Add Group for ' + $scope.contact.fname + ' ' + $scope.contact.lname,
            actionButtonText: 'Create',
            group: undefined
        };
        modalService.showGroupModal({}, modalOptions)
            .then(createGroup, angular.noop);
    }

    function showEditGroupModal(group) {
        var modalOptions = {
            title: 'Edit Group for ' + $scope.contact.fname + ' ' + $scope.contact.lname,
            actionButtonText: 'Update',
            group: angular.copy(group)
        };
        modalService.showGroupModal({}, modalOptions)
            .then(updateGroup, angular.noop);
    }

    function showCreateNoteModal() {
        var modalOptions = {
            title: 'Add Note for ' + $scope.contact.fname + ' ' + $scope.contact.lname,
            actionButtonText: 'Create',
            note: undefined
        };
        modalService.showNoteModal({}, modalOptions)
            .then(createNote, angular.noop);
    }

    function showEditNoteModal(note) {
        var modalOptions = {
            title: 'Edit Note for ' + $scope.contact.fname + ' ' + $scope.contact.lname,
            actionButtonText: 'Update',
            note: angular.copy(note)
        };
        modalService.showNoteModal({}, modalOptions)
            .then(updateNote, angular.noop);
    }

    function createGroup(group) {
        contactService.createGroup(group)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Created group', 3000);
                },
                function(err) {
                    alertService.addAlert(alertService.TYPE.WARNING, err, 3000);
                });
    }

    function createNote(note) {
        contactService.createNote(note)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Created note', 3000);
                },
                function(err) {
                    alertService.addAlert(alertService.TYPE.WARNING, err, 3000);
                });
    }

    init();

}
