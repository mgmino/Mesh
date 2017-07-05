angular.module('detail', [])
.controller('detailController', ['$scope', '$routeParams', 'queryService', 'alertService',
function($scope, $routeParams, queryService, alertService) {

    var cid = $routeParams.cid;
    queryService.getContactById(cid).then(
        function success(contactObj) {
    //        console.log(contactObj);
            $scope.contact = contactObj.person;
            $scope.details = contactObj.details;
        },
        function error(error) {
            alertService.addAlert(alertService.TYPE.DANGER, 'Could not load contact', 5000);
        });

}]);
