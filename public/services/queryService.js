angular.module("services")
.service("queryService", ["$http", function($http) {

    this.getAllContacts = function() {
        return $http({
            method : "GET",
//            url : "/api/db/getRecent"
              url : "http://mgm2.trakmark.com/mesh-api.php?fld=lname&op=eq&itm=Mino"
        }).then(processSuccess, processError);
    };

    this.getFavorites = function() {
        return $http({
            method : "GET",
 //           url : "/api/db/getFavs"
            url : "http://mgm2.trakmark.com/mesh-api.php?fld=tags&op=like&itm=LAK"
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
 //           url : "/api/db/getContactById/" + id
             url : "http://mgm2.trakmark.com/mesh-api.php?op=id&itm=" + id
       }).then(processSuccess, processError);
    };

    /*
     * Returns contacts from the People table.
     * The provided 'query' is the search portion following a WHERE clause.
     *
     */
    this.getCustomResults = function(customQuery) {
        var delim= customQuery.indexOf(' ')
        var qfield= customQuery.substr(0, delim)
        var qitem= customQuery.substr(delim+1)
//      console.log(delim,qfield,qitem)
        return $http({
            method : "GET",
//            url : "/api/db/getCustomResults",
             url : "http://mgm2.trakmark.com/mesh-api.php?op=like&fld=" +qfield +'&itm=' +qitem
        }).then(processSuccess, processError);
    };


    /* $http Response Handling Functions */
    function processSuccess(response) {
        return response.data;
    }
    function processError(response) {
        if (!response.data) throw 'Uh oh an unknown error occurred.';
        throw response.data;
    }

}]);