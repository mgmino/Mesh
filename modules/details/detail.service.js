angular
    .module('details')
    .service('detailService', detailService);

detailService.$inject = ['$http', '$location', 'toggleService'];

function detailService($http, $location, toggleService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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


    function processSuccess(response) {
        return response.data;
    }

    function processError(response) {
        if (response.status === 401) $location.path('/login');
        else throw response.data.errmsg;
    }

}
