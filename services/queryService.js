angular.module('services')
.service('queryService', ['$http', '$location', 'API_URL', function($http, $location, API_URL) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.getAllContacts = function() {
        return $http({
            method : 'POST',
            url : API_URL,
            data: {
                fld:    'lname',
                op:     'eq',
                itm:    'Mino'
            }
        }).then(processSuccess, processError);
    };

    this.getFavorites = function() {
        return $http({
            method : 'POST',
            url : API_URL,
            data: {
                fld:    'tags',
                op:     'like',
                itm:    'LAK'
            }
        }).then(processSuccess, processError);
    };

    this.getView = function(view) {
        return $http({
            method : 'POST',
            url : API_URL,
            data: {
                op:	view
            }
        }).then(processSuccess, processError);
    };

    this.getEvents = function() {
        return $http({
            method : 'POST',
            url : API_URL,
            data: {
                op:	'events'
            }
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
        return $http({
            method : 'POST',
            url : API_URL,
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
        var delim= customQuery.indexOf(':');
		if (delim == -1) { //name only search
			var optype= 'name';
			var queryfield= 'na';
			var queryitem= customQuery;
		} else { //defined search
			var optype= 'defsrch';
			var queryfield= customQuery.substr(0, delim);
			var queryitem = customQuery.substr(delim+1).trim();
		}
        return $http({
            method : 'POST',
            url : API_URL,
            data: {
                op:     optype,
                fld:    queryfield,
                itm:    queryitem
            }
        }).then(processSuccess, processError);
    };


    /* $http Response Handling Functions */
    function processSuccess(response) {
        return response.data;
    }

    function processError(response) { //Authorization failure
        if (response.status === 401) {
            $location.path('/login');
        } else {
            throw response.data.errmsg;
        }
    }
}]);