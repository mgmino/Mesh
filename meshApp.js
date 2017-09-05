angular.module('meshApp', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'ui.bootstrap',

    'alerts',
    'configuration',
    'contacts',
    'events',
    'layout',
    'login',
    'name-linking'
])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/contacts/favorites'
        })
        .when('/contacts/:filter', {
            templateUrl: 'modules/contacts/contacts.htm',
            controller: 'contactsController'
        })
        .when('/detail/:cid', {
            templateUrl: 'modules/contacts/detail.htm',
            controller: 'detailController'
        })
        .when('/events', {
            templateUrl: 'modules/events/events.htm',
            controller: 'eventController'
        })
        .when('/addContact', {
            templateUrl: 'modules/contacts/addContact.htm',
            controller: 'addContactController'
        })
        .when('/addDetail/:cid', {
            templateUrl: 'modules/contacts/addDetail.htm',
            controller: 'addDetailController'
        })
        .when('/tools/utilities', {
            templateUrl: 'modules/tools/utilities.htm'
        })
        .when('/tools/tags', {
            templateUrl: 'modules/tools/tags.htm'
        })
        .when('/tools/import', {
            templateUrl: 'modules/tools/import.htm'
        })
        .when('/login', {
            templateUrl: 'modules/login/login.htm',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: '/'
        });
}])


.run(['$rootScope', '$location', '$http', '$cookies', 'loginService',
    function ($rootScope, $location, $http, $cookies, loginService) {

        // Routes here do not require a login
        var openRoutes = ['/login'];

        // Keep user logged in after page refresh
        if (loginService.isLoggedIn()) {
            console.log('mesh: Setting user credentials from previous session');
            var token = loginService.getToken();
            loginService.setHeaders(token);
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var goingToOpenRoute = $.inArray($location.path(), openRoutes) === 0;
            if (!goingToOpenRoute && !loginService.isLoggedIn()) {
                console.log('mesh: Blocked route access to ' + $location.path());
                // Cannot access restricted route without logging in
                $location.path('/login');
            }
        });

}]);

