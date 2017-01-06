angular.module('directives', [])

.directive('linkedIn', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/linkedIn.html',
        scope: {
            fname: '=',
            lname: '='
        },
        link: function (scope, elem, attrs) {
            function firstName() {
                var name = angular.copy(scope.fname);
                var space_index = name.indexOf(' ');
                return space_index == -1 ? name : name.substr(0, space_index);
            }
            scope.linkedInProfile = 'https://www.linkedin.com/vsearch/f?keywords=' + firstName() + ' ' + scope.lname + '&search=Search';
        }
    }
}])


.directive('alertBox', ['alertService', function (alertService) {
    return {
        restrict: 'EA',
        templateUrl: 'directives/partials/alertBox.html',
        link: function(scope, elem, attrs) {
            scope.getAlerts = function() {
                return alertService.getAlerts();
            };
            scope.removeAlert = function(alert) {
                alertService.removeAlert(alert);
            };
            scope.getAlertIcon = function(alert) {
                switch (alert.type) {
                    case alertService.TYPE.SUCCESS:
                        return 'check';
                        break;
                    case alertService.TYPE.DANGER:
                        return 'ban';
                        break;
                    default:
                        return alert.type;
                        break;
                }
            }
        }
    }
}])

.directive('pinfo', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/pinfo.html',
        scope: {
            details: '='
        }
    }
}])

.directive('contactImage', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactImage.html',
        scope: {
            contact: '='
        }
    }
}])


.directive('contactTags', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactTags.html',
        scope: {
            contact: '='
        }
    }
}])

// Not currently used, but might come in handy later
.directive('hideOnLogin', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var loginRoute = '/login';

            scope.$on('$routeChangeSuccess', function(e, current, pre) {
                var route = $location.path();
                console.log('Current route name: ' + route);
                if (route == loginRoute) {
                    elem.hide();
                } else {
                    elem.show();
                }
            });
        }
    };
}]);
