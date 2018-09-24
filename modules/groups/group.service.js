angular
    .module('groups')
    .service('groupService', groupService);

groupService.$inject = ['$http', '$location', 'toggleService'];

function groupService($http, $location, toggleService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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

    this.updateGroup= function(group) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'updateGroup',
                group: group
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
