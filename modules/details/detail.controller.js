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
    $scope.showEditContactModal= showEditContactModal;

    $scope.showCreateGroupModal= showCreateGroupModal;
    $scope.showEditGroupModal= showEditGroupModal;

    $scope.showCreateNoteModal= showCreateNoteModal;
    $scope.showEditNoteModal= showEditNoteModal;

    function loadContact(cid) {
        return contactService.getContactById(cid)
            .then(
                populateView,
                function(error) {
                    alertService.addAlert(alertService.TYPE.DANGER, error, 5000);
                });
    }

    function populateView(contactObj) {
        $scope.contact= contactObj.person;
        $scope.details= contactObj.details;
        $scope.groups= contactObj.groups;
        $scope.notes= contactObj.notes;
    }

    function showEditContactModal(contact) {
        var modalOptions = {
            title: 'Edit Contact Info for ' + $scope.contact.fname + ' ' + $scope.contact.lname,
            actionButtonText: 'Update',
            contact: angular.copy(contact)
        };
        modalService.showContactModal({}, modalOptions)
            .then(updateContact, angular.noop);
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

    function updateContact(contact) {
        contactService.updatePeople(contact)
            .then(
                refreshAndToastSuccess,
                warnError);
    }

    function createGroup(group) {
        groupService.createGroup(group, $routeParams.cid)
            .then(
                refreshAndToastSuccess,
                warnError);
    }

    function updateGroup(group) {
        groupService.updateGroup(group)
            .then(
                refreshAndToastSuccess,
                warnError);
    }

    function createNote(note) {
        noteService.createNote(note, $routeParams.cid)
            .then(
                refreshAndToastSuccess,
                warnError);
    }

    function updateNote(note) {
        noteService.updateNote(note)
            .then(
                refreshAndToastSuccess,
                warnError);
    }

    function refreshAndToastSuccess(response) {
        loadContact($routeParams.cid);
        alertService.addAlert(alertService.TYPE.SUCCESS, response.msg, 3000);
    }

    function warnError(err) {
        alertService.addAlert(alertService.TYPE.WARNING, err, 3000);
    }

    init();

}
