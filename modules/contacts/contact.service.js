angular
    .module('contacts')
    .service('contactService', contactService);

contactService.$inject = ['$http', '$location', 'toggleService'];

function contactService($http, $location, toggleService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.getAllContacts = function() {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
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
            url : toggleService.getAPI(),
            data: {
                fld:    'tags',
                op:     'like',
                itm:    '%LAK%'
            }
        }).then(processSuccess, processError);
    };

    this.getView = function(view) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	view
            }
        }).then(processSuccess, processError);
    };

    this.createPeople= function(contact) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'createPeople',
                contact: contact
            }
        }).then(processSuccess, processError);
    };

    this.createPinfo= function(detail, pid) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'createPinfo',
                pid:	pid,
                detail: detail
            }
        }).then(processSuccess, processError);
    };

    this.updatePinfo= function(detail, pid) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'updatePinfo',
                pid:	pid,
                detail: detail
            }
        }).then(processSuccess, processError);
    };

    this.createGroup= function(group) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'createGroup',
                group: group
            }
        }).then(processSuccess, processError);
    };

    this.createGinfo= function(detail, gid) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'createGinfo',
                gid:	gid,
                detail: detail
            }
        }).then(processSuccess, processError);
    };

    this.updateGinfo= function(detail, gid) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'updateGinfo',
                gid:	gid,
                detail: detail
            }
        }).then(processSuccess, processError);
    };

    this.getContactById = function(id) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
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
    this.getCustomContacts = function(customQuery) {
        var delim = customQuery.indexOf(':');
        var NAME_SEARCH_DELIM = -1;
        var optype, queryfield, queryitem;
        
		if (delim === NAME_SEARCH_DELIM) {
			optype = 'name';
			queryfield = 'na';
			queryitem = customQuery;
		} else { //defined search
			optype = 'defsrch';
			queryfield = customQuery.substr(0, delim);
			queryitem = customQuery.substr(delim+1).trim();
		}
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:     optype,
                fld:    queryfield,
                itm:    queryitem
            }
        }).then(processSuccess, processError);
    };



    function processSuccess(response) {
        return response.data;
    }

    function processError(response) {
        if (response.status === 401) $location.path('/login');
        else throw response.data.errmsg;
    }

}
