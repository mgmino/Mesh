angular
    .module('notes')
    .service('noteService', noteService);

noteService.$inject = ['$http', '$location', 'toggleService'];

function noteService($http, $location, toggleService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.createNote = function(note, pid) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'createNote',
                note: note,
                pid: pid
            }
        }).then(processSuccess, processError);
    };

    this.updateNote = function(note) {
        return $http({
            method : 'POST',
            url : toggleService.getAPI(),
            data: {
                op:	'updateNote',
                note: note
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
