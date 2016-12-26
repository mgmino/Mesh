angular.module("services")
.service("queryService", ["$http", function($http) {

    this.getAllContacts = function() {
        return $http({
            method : "GET",
            url : "/api/db/getRecent"
        }).then(function mySucces(response) {
            return response.data;
        });
    };

    this.getFavorites = function() {
        return $http({
            method : "GET",
            url : "/api/db/getFavs"
        }).then(function mySucces(response) {
            return response.data;
        });
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
            url : "/api/db/getContactById/" + id
        }).then(function mySucces(response) {
            return response.data;
        });
    };

}]);