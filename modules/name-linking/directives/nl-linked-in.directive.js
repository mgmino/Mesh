angular.module('name-linking')
    .directive('nlLinkedIn', ['nameService', function(nameService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/name-linking/directives/nl-linked-in.directive.htm',
            scope: {
                fname: '=',
                lname: '='
            },
            link: function (scope, elem, attrs) {
                scope.linkedInLink = 'https://www.linkedin.com/search/results/index/?keywords=' + nameService.firstNameOnly(scope.fname) + '%20' + scope.lname;
            }
        }
    }]);