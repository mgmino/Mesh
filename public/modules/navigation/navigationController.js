angular.module('navigation', [])

.controller('navigationController', ['$scope', '$location',
    function ($scope, $location) {

        // This should be an empty string.
        // I'm using a value to show a potential example.
        $scope.customSearchCriteria = "lname = 'Mino'";

        $scope.customSearch = function() {
            var query = $scope.customSearchCriteria;
            $location.path('/results/custom').search('query', $scope.customSearchCriteria);
        };


        // $scope.$on('$routeChangeSuccess', function(event, next, current){
        //     console.log(event, next, current);
        // });
}]);