angular
    .module('alerts')
    .service('alertService', alertService);

alertService.$inject = ['$timeout', '$rootScope'];

function alertService($timeout, $rootScope) {

    /**
     * If not specified, alerts will remain for this many milliseconds.
     */
    this.DEFAULT_TIMEOUT = 3000;

    /**
     * Acceptable bootstrap types for alerts.
     */
    this.TYPE = {
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning',
        DANGER: 'danger'
    };

    /**
     * Holds the current alerts.
     */
    this.alerts = [];

    /**
     * Holds the history of alerts.
     */
    this.alertHistory = [];
    this.alertHistory[this.TYPE.SUCCESS] = [];
    this.alertHistory[this.TYPE.INFO] = [];
    this.alertHistory[this.TYPE.WARNING] = [];
    this.alertHistory[this.TYPE.DANGER] = [];

    /**
     * Gets the currently displayed alerts.
     */
    this.getAlerts = function() {
        return this.alerts;
    };

    /**
     * Get all alerts stored in history.
     * @param type - Bootstrap type of alert history to get
     * @returns {Array} alertHistory
     */
    this.getAlertHistory = function(type) {
        return this.alertHistory[type];
    };

    /**
     * Adds one alert to the current collection.
     * @param type - Bootstrap type of alert (success, info, warning, danger)
     * @param msg - The message to display
     * @param timeout - Milliseconds to display the alert. An empty string or value of 0 will require manual dismissal.
     */
    this.addAlert = function(type, msg, timeout) {
        var alert = {
            type: type,
            msg: msg,
            timeout: timeout != undefined ? timeout : this.DEFAULT_TIMEOUT
        };

        // Add to current alert
        this.alerts.push(alert);

        // Add to alert history
        this.alertHistory[type].push(alert);

        // Trigger a digest cycle or piggy back on current one
        $rootScope.$evalAsync();

        // Set time to display before auto dismiss
        // Automatically triggers digest cycle
        if (alert.timeout == '' || alert.timeout == 0) {
            // Must manually dismiss
        } else {
            $timeout(function() {
                this.dismissAlert(alert);
            }.bind(this), alert.timeout);
        }
    };

    /**
     * Dismiss an alert from the main view, but NOT the history.
     * @param alert
     */
    this.dismissAlert = function(alert) {
        for (var pos=this.alerts.length; pos>=0; pos--) {
            if (this.alerts[pos] == alert) {
                this.alerts.splice(pos, 1);
                $rootScope.$evalAsync();
                return;
            }
        }
    };

    /**
     * Dismiss all alerts from the main view, but NOT the history.
     */
    this.dismissAlerts = function() {
        for (var pos=this.alerts.length; pos>=0; pos--) {
            var alert = this.alerts[pos];
            this.dismissAlert(alert);
        }
    };

    /**
     * Removes alert from both the main view and the history.
     * @param alert
     */
    this.removeAlert = function(alert) {
        var pos;
        var type;
        // Removes from primary alert display
        this.dismissAlert(alert);

        // Removes from alert history
        for (type in this.alertHistory) {
            if (this.alertHistory.hasOwnProperty(type)) {
                for (pos=this.alertHistory[type].length; pos>=0; pos--) {
                    if (this.alertHistory[type][pos] == alert) {
                        this.alertHistory[type].splice(pos, 1);
                        $rootScope.$evalAsync();
                        break;
                    }
                }
            }
        }
    };

    /**
     * Removes all alerts from history and the main view.
     */
    this.removeAlerts = function() {
        for (var type in this.alertHistory) {
            if (this.alertHistory.hasOwnProperty(type)) {
                for (var pos=this.alertHistory[type].length; pos>=0; pos--) {
                    var alert = this.alertHistory[type][pos];
                    this.removeAlert(alert);
                }
            }
        }
    };

}