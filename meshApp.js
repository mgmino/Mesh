angular.module('meshApp', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'services',
    'filters',
    'directives',
    'login',
    'navigation',
    'contact',
    'events',
    'tools',
    'results',
    'detail',
    'states',
	'countries'
])

.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/results/favorites'
        })
        .when('/results/:filter', {
            templateUrl: 'modules/contacts/results.htm',
            controller: 'resultsController'
        })
        .when('/detail/:cid', {
            templateUrl: 'modules/contacts/detail.htm',
            controller: 'detailController'
        })
        .when('/contact/:id', {
            templateUrl: 'modules/contacts/contact.htm',
            controller: 'contactController'
        })
        .when('/events', {
            templateUrl: 'modules/contacts/events.htm',
            controller: 'eventsController'
        })
        .when('/addcontact', {
            templateUrl: 'modules/contacts/addContact.htm',
            controller: 'addContactController'
        })
        .when('/states', {
            templateUrl: 'modules/otherDBs/states.htm',
            controller: 'statesController'
        })
        .when('/countries', {
            templateUrl: 'modules/otherDBs/countries.htm',
            controller: 'countriesController'
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

