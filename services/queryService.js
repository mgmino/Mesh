angular.module("services")
.service("queryService", ['$http', '$location', function($http, $location) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.getAllContacts = function() {
        return $http({
            method : "POST",
            url : "http://mgm2.trakmark.com/mesh-api.php",
            data: {
                fld:    'lname',
                op:     'eq',
                itm:    'Mino'
            }
        }).then(processSuccess, processError);
    };

    this.getFavorites = function() {
        return $http({
            method : "POST",
            url : "http://mgm2.trakmark.com/mesh-api.php",
            data: {
                fld:    'tags',
                op:     'like',
                itm:    'LAK'
            }
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
        return $http({
            method : "POST",
            url : "http://mgm2.trakmark.com/mesh-api.php",
            data: {
                op:     'id',
                itm:    id
            }
        }).then(processSuccess, processError);
    };

    /*
     * Returns contacts from the People table.
     * The provided 'query' is the search portion following a WHERE clause.
     *
     */
    this.getCustomResults = function(customQuery) {
        var delim = customQuery.indexOf(' ');
        var queryfield = customQuery.substr(0, delim);
        var queryitem = customQuery.substr(delim+1);
        return $http({
            method : "POST",
            url : "http://mgm2.trakmark.com/mesh-api.php",
            data: {
                op:     'like',
                fld:    queryfield,
                itm:    queryitem
            }
        }).then(processSuccess, processError);
    };


    /* $http Response Handling Functions */
    function processSuccess(response) {
        return response.data;
    }
    function processError(response) {
        if (!response.data || !response.data.errmsg) throw 'Uh oh an unknown error occurred.';
        if (response.data.code == 511) {
            // Authorization failure
            $location.path('/login');
        } else {
            throw response.data.errmsg;
        }
    }

}]);