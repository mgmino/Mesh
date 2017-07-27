angular.module('states', [])
.controller('statesController', ['$scope', '$routeParams', 'queryService', 
function($scope, $routeParams, queryService) {

	$scope.pageTitle= 'States';

	function init() {
        queryService.getStates('x').then(
            function (theStates) {
                if (theStates.length === 0) {
                    alertService.addAlert(alertService.TYPE.INFO, 'No states matched this query.', 1000);
                }
                $scope.states= theStates;
            },
            function (error) {
                $scope.states= [];
                $scope.nc.customSearchError= true;
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
        );
	}
	init();
}]);

angular.module('countries', [])
.controller('countriesController', ['$scope', '$routeParams', 'queryService', 
function($scope, $routeParams, queryService) {

	$scope.pageTitle= 'Countries';

	function init() {
        queryService.getCountries('x').then(
            function (theCountries) {
                if (theCountries.length === 0) {
                    alertService.addAlert(alertService.TYPE.INFO, 'No countries matched this query.', 1000);
                }
                $scope.countries= theCountries;
            },
            function (error) {
                $scope.countries= [];
                $scope.nc.customSearchError= true;
                alertService.addAlert(alertService.TYPE.WARNING, error, '');
            }
        );
	}
	init();
}]);
