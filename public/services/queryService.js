angular.module("services")
.service("queryService", ["$http", function($http) {

    this.getAllContacts = function() {
        return $http({
            method : "GET",
            url : "/api/db/getRecent"
        }).then(processSuccess, processError);
    };

    this.getFavorites = function() {
        return $http({
            method : "GET",
            url : "/api/db/getFavs"
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
            url : "/api/db/getContactById/" + id
        }).then(processSuccess, processError);
    };

    /*
     * Returns contacts from the People table.
     * The provided 'query' is the search portion following a WHERE clause.
     *
     */
    this.getCustomResults = function(customQuery) {
        return $http({
            method : "POST",
            url : "/api/db/getCustomResults",
            data: {
                query: customQuery
            }
        }).then(processSuccess, processError);
    };


    /* $http Response Handling Functions */
    function processSuccess(response) {
        return response.data;
    }
    function processError(response) {
        if (!response.data) throw 'Uh oh an unknown error occurred.';
        throw response.data.substr(4, response.data.indexOf("</h1>")-4);
    }

}]);