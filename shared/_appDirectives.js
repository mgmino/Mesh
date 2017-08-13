angular.module('directives', []);

angular.module('directives')
.directive('appAlertBox', ['alertService', function (alertService) {
    return {
        restrict: 'E',
        templateUrl: 'shared/appAlertBox.htm',
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
