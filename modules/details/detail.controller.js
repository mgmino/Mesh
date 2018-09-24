angular
    .module('contacts')
    .controller('detailController', detailController);

detailController.$inject = ['$scope', '$routeParams', 'contactService', 'groupService', 'noteService', 'modalService', 'alertService'];

function detailController($scope, $routeParams, contactService, groupService, noteService, modalService, alertService) {

    function init() {
        var cid = $routeParams.cid;
        loadContact(cid);
    }

    $scope.loadContact= loadContact.bind(this, $routeParams.cid);

    $scope.showCreateGroupModal= showCreateGroupModal;
    $scope.showEditGroupModal= showEditGroupModal;

    $scope.showCreateNoteModal= showCreateNoteModal;
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
        groupService.createGroup(group, $routeParams.cid)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Created group', 3000);
                },
                warnError);
    }

    function updateGroup(group) {
        groupService.updateGroup(group)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Updated group', 3000);
                },
                warnError);
    }

    function createNote(note) {
        noteService.createNote(note, $routeParams.cid)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Created note', 3000);
                },
                warnError);
    }

    function updateNote(note) {
        noteService.updateNote(note)
            .then(
                function(response) {
                    loadContact($routeParams.cid);
                    // TODO: use information from the response instead
                    alertService.addAlert(alertService.TYPE.SUCCESS, 'Updated note', 3000);
                },
                warnError);
    }

    function warnError(err) {
        alertService.addAlert(alertService.TYPE.WARNING, err, 3000);
    }

    init();

}
