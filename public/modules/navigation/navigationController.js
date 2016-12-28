angular.module('navigation', [])

.controller('navigationController', ['$scope', '$location',
    function ($scope, $location) {

        $scope.nc = {};
        $scope.nc.customSearchError = false;

        // This should be an empty string.
        // I'm using a value to show a potential example.
        $scope.customSearchCriteria = "";
        $location.search('query', null);

        $scope.customSearch = function() {
            $scope.nc.customSearchError = false;
            $location.path('/results/custom').search('query', $scope.customSearchCriteria);
        };


        // $scope.$on('$routeChangeSuccess', function(event, next, current){
        //     console.log(event, next, current);
        // });
}]);