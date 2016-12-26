angular.module("detail", [])
.controller("detailController", ["$scope", "$routeParams", "queryService", function($scope, $routeParams, queryService) {

    var cid = $routeParams.cid;
    queryService.getContactById(cid).then(function(contactObj) {
//        console.log(contactObj);
        $scope.contact = contactObj.person;
        $scope.details = contactObj.details;
    });

}]);