angular.module('directives')
.directive('contactImage', ['toggleService', function(toggleService) {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactImage.htm',
        scope: {
            contact: '=',
            size: '@'
        },
        link: function(scope, elems, attrs) {
            scope.PIX_URL = toggleService.getPIX();
        }
    }
}]);

angular.module('directives')
.directive('contactGoogle', [function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactGoogle.htm',
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

angular.module('directives')
.directive('contactLinkedIn', [function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactLinkedIn.htm',
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

angular.module('directives')
.directive('contactClemson', [function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactClemson.htm',
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

angular.module('directives')
.directive('contactTags', [function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactTags.htm',
        scope: {
            contact: '='
        }
    }
}]);

angular.module('directives')
.directive('contactInfo', [function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/contacts/contactInfo.htm',
        scope: {
            details: '='
        }
    }
}]);
