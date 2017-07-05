angular.module('navigation', [])
.controller('navigationController', ['$scope', '$location', 'alertService',
function ($scope, $location, alertService) {

    $scope.nc = {};
    $scope.nc.customSearchError = false;
    $scope.customSearchCriteria = '';

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
