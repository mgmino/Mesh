angular.module("services")
.service("loginService", ['$http', '$cookies', '$q', function($http, $cookies, $q) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    var TOKEN_KEY = 'MESH_AUTHORIZATION_TOKEN';

    /**
     * Authenticates a username and password.
     *
     * @param username
     * @param password
     * @returns {*} - Success: JWT to use as credentials
     * @returns {*} - Error: Errmsg containing friendly error
     */
    this.createToken = function(username, password) {
        return $http({
            method: "POST",
            url: "http://localhost:8000/mesh-api.php",
            data: {
                op: 'login',
                username: username,
                password: password
            }
        }).then( processSuccess, processError );
    };

    /**
     * Here we need to remove the cookie storing the user 'session' and perhaps
     * revoke the privilege assigned to that token server-side.
     */
    this.logout = function() {
        console.log('Removing token and headers');
        $cookies.remove(TOKEN_KEY);
        this.clearHeaders();
    };

    /**
     * Checks if a user is logged in.
     * @returns {boolean}
     */
    this.isLoggedIn = function() {
        var token = this.getToken();
        return token !== null && token !== undefined;
    };

    /**
     * Retrieves the current token if it exists.
     * @returns token
     */
    this.getToken = function() {
        return $cookies.get(TOKEN_KEY);
    };

    /**
     * Stores the given token into local memory for future use.
     * @param token - JWT to store
     */
    this.setToken = function(token) {
        $cookies.put(TOKEN_KEY, token);
    };

    this.clearHeaders = function() {
        $http.defaults.headers.common['Authorization'] = undefined;
        delete $http.defaults.headers.common['Authorization'];
    };

    this.setHeaders = function(token) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    };

    function processSuccess(response) {
        return response.data.token;
    }
    function processError(response) {
        throw response.data.errmsg;
    }

}]);
