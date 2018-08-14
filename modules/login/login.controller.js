angular
    .module('login')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$location', 'loginService', 'alertService'];

function loginController($scope, $location, loginService, alertService) {

    $scope.username = '';
    $scope.password = '';
    $scope.rememberMe = false;

    function init() {
        $scope.authenticating = false;
        loginService.logout();
    }

    $scope.login = function () {
        console.log('logging in');
        $scope.authenticating = true;
        loginService.createToken($scope.username, $scope.password)
            .then(loginSuccess, loginFailure)
            .finally(function () {
                $scope.authenticating = false;
            });
    };

    $scope.forgotPassword = function () {
        alertService.addAlert(alertService.TYPE.INFO, 'This feature is not yet implemented');
    };

    function loginSuccess(token) {
        console.log('login success');
        // Save token in accessible location for future routes
        loginService.setToken(token);
        loginService.setHeaders(token);
        // Route to landing page
        $location.path('/');
    }

    function loginFailure(error) {
        alertService.addAlert(alertService.TYPE.WARNING, error, 8000);
    }

    init();

}
