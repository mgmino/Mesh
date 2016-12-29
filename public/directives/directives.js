angular.module('directives', [])

.directive('linkedIn', [function() {
    return {
        restrict: 'E',
        template: '<a ng-href="{{linkedInProfile}}" target="_blank"><img src="pix/icons/linkedin.gif"/></a>',
        scope: {
            fname: '=',
            lname: '='
        },
        link: function (scope, elem, attrs) {

            // Makes a guess
            // Will remain if neither a first nor last name is provided
            scope.linkedInProfile = 'https://www.linkedin.com/vsearch/f?keywords=' + scope.fname + ' ' + scope.lname + '&search=Search';

            scope.$watchGroup(['fname', 'lname'], function(newVals, oldVals) {
                if (!newVals[0] || !newVals[1]) return;
                var name = angular.copy(scope.fname);
                var space_index = name.indexOf(' ');
                var firstName = space_index == -1 ? name : name.substr(0, space_index);
                scope.linkedInProfile = 'https://www.linkedin.com/vsearch/f?keywords=' + firstName + ' ' + scope.lname + '&search=Search';
            });
        }
    }
}])


.directive('alertBox', ['alertService', function (alertService) {
    return {
        restrict: 'E',
        template: '<div ng-repeat="alert in getAlerts()" class="alert alert-{{alert.type}} alert-dismissible">'+
                        '<button type="button" class="close" ng-click="removeAlert(alert)" aria-hidden="true"><i class="fa fa-close"></i></button>'+
                        '<h4><i class="icon fa fa-{{getAlertIcon(alert)}}"></i> {{alert.msg}}</h4>'+
                    '</div>',

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
}]);