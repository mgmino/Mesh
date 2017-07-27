angular.module('directives')
.directive('mgLinkedIn', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/mgLinkedIn.htm',
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
            scope.linkedInLink= 'https://www.linkedin.com/search/results/index/?keywords=' +firstName() +'%20' +scope.lname;
        }
    }
}]);
