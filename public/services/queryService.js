angular.module("services")
.service("queryService", ["$http", function($http) {

    this.getAllContacts = function() {
        return $http({
            method : "GET",
//            url : "/api/db/getRecent"
              url : "http://mgm2.trakmark.com/mesh-api.php?field=lname&op=eq&item=Mino"
        }).then(processSuccess, processError);
    };

    this.getFavorites = function() {
        return $http({
            method : "GET",
 //           url : "/api/db/getFavs"
            url : "http://mgm2.trakmark.com/mesh-api.php?field=tags&op=like&item=LAK"
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
 //           url : "/api/db/getContactById/" + id
             url : "http://mgm2.trakmark.com/mesh-api.php?op=id&item=" + id
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