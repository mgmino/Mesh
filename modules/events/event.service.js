angular
    .module('events')
    .service('eventService', eventService);

eventService.$inject = ['$http', '$location', 'toggleService'];

function eventService($http, $location, toggleService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.getEvents= function() {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'events'
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
