angular.module('directives', [])

.directive('linkedIn', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/linkedIn.htm',
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
            scope.linkedInProfile = 'https://www.linkedin.com/search/results/index/?keywords=' + firstName() + '%20' + scope.lname;
        }
    }
}])


.directive('alertBox', ['alertService', function (alertService) {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/alertBox.htm',
        link: function(scope, elems, attrs) {
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
        templateUrl: 'directives/partials/pinfo.htm',
        scope: {
            details: '='
        }
    }
}])

.directive('contactImage', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactImage.htm',
        scope: {
            contact: '='
        }
    }
}])


.directive('contactTags', [function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/contactTags.htm',
        scope: {
            contact: '='
        }
    }
}]);
