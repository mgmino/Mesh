angular
    .module('name-linking')
    .service('nameService', nameService);

nameService.$inject = [];

function nameService() {

    this.firstNameOnly = function (firstName) {
        var name = angular.copy(firstName);
        var space_index = name.indexOf(' ');
        return space_index === -1 ? name : name.substr(0, space_index);
    }

}
