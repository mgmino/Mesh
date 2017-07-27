angular.module('directives')
.directive('mgGoogle', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/mgGoogle.htm',
        scope: {
            fname: '=',
            lname: '='
        },
        link: function (scope, elem, attrs) {
            function firstName() {
                var name= angular.copy(scope.fname);
                var space_index= name.indexOf(' ');
                return space_index === -1 ? name : name.substr(0, space_index);
            }
            scope.GoogleLink= 'https://www.google.com/search?q=' +firstName() +'+' +scope.lname;
        }
    }
}]);
