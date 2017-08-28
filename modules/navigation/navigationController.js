angular.module('navigation', [])
.controller('navigationController', ['$scope', '$location', 'alertService', 'API_URL_REMOTE', 
function ($scope, $location, alertService) {

    $scope.nc = {};
    $scope.nc.customSearchError = false;
	$scope.nc.apiUrl = API_URL_REMOTE;
    $scope.customSearchCriteria = '';

    $scope.searchDB= 'Contacts';
	
	function init() {
		// Removes potential pre-existing queries
		$location.search('query', null);
	}

    $scope.customSearch = function() {
        $scope.nc.customSearchError = false;
		switch ($scope.searchDB) {
            case 'Quotes':
				$location.path('/quotes').search('query', $scope.customSearchCriteria);
                break;
            case 'Accounts':
				$location.path('/accounts').search('query', $scope.customSearchCriteria);
                break;
            case 'States':
				$location.path('/states').search('query', $scope.customSearchCriteria);
                break;
            case 'Countries':
				$location.path('/countries').search('query', $scope.customSearchCriteria);
                break;
//          case 'Contacts':
            default:
				$location.path('/results/custom').search('query', $scope.customSearchCriteria);
		}
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
		if ($scope.nc.apiUrl == API_URL_REMOTE) return true;
		else return false;
    };

	init();

}]);
