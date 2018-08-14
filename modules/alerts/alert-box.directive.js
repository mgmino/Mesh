angular
    .module('alerts')
    .directive('alertBox', alertBox);

alertBox.$inject = ['alertService'];

function alertBox(alertService) {
    return {
        restrict: 'E',
        templateUrl: 'modules/alerts/alert-box.directive.htm',
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
                    case alertService.TYPE.DANGER:
                        return 'ban';
                    default:
                        return alert.type;
                }
            }
        }
    }
}
