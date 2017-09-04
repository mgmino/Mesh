angular.module('name-linking')
    .directive('nlGoogle', [function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/name-linking/directives/nl-google.directive.htm',
            scope: {
                fname: '=',
                lname: '='
            },
            link: function (scope, elem, attrs) {
                function firstName() {
                    var name = angular.copy(scope.fname);
                    var space_index = name.indexOf(' ');
                    return space_index === -1 ? name : name.substr(0, space_index);
                }
                scope.GoogleLink = 'https://www.google.com/search?q=' + firstName() + '+' + scope.lname;
            }
        }
    }]);