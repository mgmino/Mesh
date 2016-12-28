angular.module("services")
.service("queryService", ["$http", function($http) {

    this.getAllContacts = function() {
        return $http({
            method : "GET",
            url : "/api/db/getRecent"
        }).then(function mySuccess(response) {
            return response.data;
        });
    };

    this.getFavorites = function() {
        return $http({
            method : "GET",
            url : "/api/db/getFavs"
        }).then(function mySuccess(response) {
            return response.data;
        });
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
            url : "/api/db/getContactById/" + id
        }).then(function mySuccess(response) {
            return response.data;
        });
    };

    /*
     * Returns contacts from the People table.
     * The provided 'query' is the search portion following a WHERE clause.
     * For proof of concept use only.
     */
    this.getCustomResults = function(customQuery) {
        return $http({
            method : "GET",
            url : "/api/db/getCustomResults/" + customQuery
        }).then(
            function mySuccess(response) {
                return response.data;
            },
            function myError(response) {
                // This should probably be handled
                return [];
            });
    };

}]);