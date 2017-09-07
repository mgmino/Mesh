angular.module('layout')
.controller('navigationController', ['$scope', '$location', 'alertService', 'toggleService', 
function ($scope, $location, alertService, toggleService) {

    $scope.nc = {};
    $scope.nc.customSearchError = false;
    $scope.nc.customSearchCriteria = '';

    $scope.searchDB= 'Contacts';
	
	function init() {
		// Removes potential pre-existing queries
		$location.search('query', null);
	}

    $scope.customSearch = function() {
        $scope.nc.customSearchError = false;
		$location.path('/contacts/custom').search('query', $scope.nc.customSearchCriteria);
    };

    $scope.$on('$routeChangeSuccess', function(event, next, current){
        alertService.dismissAlerts();
        if ($location.path() === '/login') {
            $('body').addClass('login-page');
        } else {
            $('body').removeClass('login-page');
        }
    });

	$scope.isRemote = function() {
		return toggleService.isRemote();
    };

	$scope.setLocal = function() {
		return toggleService.setLocal();
    };

	$scope.setRemote = function() {
		return toggleService.setRemote();
    };

	init();

}]);
