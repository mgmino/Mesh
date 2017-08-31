angular.module('services')
.service('toggleService', ['API_URL', function(API_URL) {

    /* Defaults to local */
    var api = API_URL.REMOTE;

    this.getAPI = function() {
        return api;
    };

    this.setAPI = function(newApi) {
        api = newApi;
    };

    this.isRemote = function(testApi) {
        return testApi === API_URL.REMOTE;
    };

}]);
