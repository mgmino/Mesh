angular
    .module('name-linking')
    .directive('nlClemson', nlClemson);

nlClemson.$inject = ['nameService'];

function nlClemson(nameService) {
    return {
        restrict: 'E',
            templateUrl: 'modules/name-linking/directives/nl-clemson.directive.htm',
            scope: {
            fname: '=',
                lname: '='
        },
        link: function (scope, elem, attrs) {
            scope.ClemsonLink = 'https://my.clemson.edu/#/directory/search/' + nameService.firstNameOnly(scope.fname) + '%20' + scope.lname;
        }
    };
}
