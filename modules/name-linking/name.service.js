angular.module('name-linking')
.service('nameService', [function() {

    this.firstNameOnly = function (firstName) {
        var name = angular.copy(firstName);
        var space_index = name.indexOf(' ');
        return space_index === -1 ? name : name.substr(0, space_index);
    }

}]);