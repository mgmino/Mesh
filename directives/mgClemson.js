angular.module('directives')
.directive('mgClemson', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/mgClemson.htm',
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
            scope.ClemsonLink= 'https://my.clemson.edu/#/directory/search/' +firstName() +'%20' +scope.lname;
        }
    }
}]);
