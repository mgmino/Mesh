angular.module('name-linking')
    .directive('nlMyLife', ['nameService', function(nameService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/name-linking/directives/nl-my-life.directive.htm',
            scope: {
                fname: '=',
                lname: '='
            },
            link: function (scope, elem, attrs) {
                scope.myLifeLink = 'https://www.MyLife.com/' + nameService.firstNameOnly(scope.fname) + '-' + scope.lname;
            }
        }
    }]);