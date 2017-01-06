angular.module("services")
.service("loginService", ['$http', '$cookies', function($http, $cookies) {

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
    this.login = function(username, password) {
        return $http({
            method : "POST",
            // TODO: This must be implemented
            url : "http://mgm2.trakmark.com/mesh-api.php",
            data: {
                op:     'login',
                user:   username,
                pass:   password
            }
        }).then(processSuccess, processError);
    };

    /**
     * Here we need to remove the cookie storing the user 'session' and perhaps
     * revoke the privilege assigned to that token server-side.
     */
    this.logout = function() {
        var token = this.getToken();
        if (token) {
            this.removeToken();
        }
    };

    /**
     * Checks if a user is logged in.
     * @returns {boolean}
     */
    this.isLoggedIn = function() {
        var token = this.getToken();
        return token != null;
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
        $cookies.set(TOKEN_KEY, token);
    };

    /**
     * Removes the current token.
     */
    this.removeToken = function() {
        $cookies.remove(TOKEN_KEY);
    };


    /* $http Response Handling Functions */
    function processSuccess(response) {
        return response.data;
    }
    function processError(response) {
        if (!response.data || !response.data.errmsg) throw 'Uh oh an unknown error occurred.';
        throw response.data.errmsg;
    }

}]);
