angular.module("contact", [])
.controller("contactController", ["$scope", "$routeParams", "queryService", function($scope, $routeParams, queryService) {

    $scope.pageTitle = "Contact";

    function init() {
        queryService.getContactById($routeParams.pid).then(function(contact) {
            $scope.contact = contact;
            Materialize.updateTextFields();
        });
    }
    init();

}]);
