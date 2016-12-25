angular.module("detail", [])
.controller("detailController", ["$scope", "$routeParams", "queryService", function($scope, $routeParams, queryService) {

    function init() {
        var cid = $routeParams.cid;
        queryService.getContactById(cid).then(function(contact) {
            console.log(contact);
            $scope.contact = contact;
        });
    }
    init();

}]);