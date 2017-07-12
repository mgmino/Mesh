angular.module('navigation', [])
.controller('navigationController', ['$scope', '$location', 'alertService',
function ($scope, $location, alertService) {

    $scope.nc = {};
    $scope.nc.customSearchError = false;
    $scope.customSearchCriteria = '';

    // Created an object to track information about searches. This can be called anything.
    // We could bind to a primitive (not an object) as well.
    $scope.searchABCD = {
        // This is the variable that is currently bound to the dropdown value using ng-model
        type: ''
    };

	function init() {
		// Removes potential pre-existing queries
		$location.search('query', null);
	}

    $scope.customSearch = function() {
        $scope.nc.customSearchError = false;
        $location.path('/results/custom').search('query', $scope.customSearchCriteria);
    };

    $scope.$on('$routeChangeSuccess', function(event, next, current){
        alertService.dismissAlerts();
        if ($location.path() == '/login') {
            $('body').addClass('login-page');
        } else {
            $('body').removeClass('login-page');
        }
    });

	init();

}]);
