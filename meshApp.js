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
            templateUrl: 'modules/results/results.html',
            controller: 'resultsController'
        })
        .when('/detail/:cid', {
            templateUrl: 'modules/detail/detail.htm',
            controller: 'detailController'
        })
        .when('/contact/:id', {
            templateUrl: 'modules/contact/contact.html',
            controller: 'contactController'
        })
        .when('/events', {
            templateUrl: 'modules/events/events.htm',
            controller: 'eventsController'
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
        .when('/search', {
            templateUrl: 'modules/tools/tools.html',
            controller: 'toolsController'
        })
        .when('/login', {
            templateUrl: 'modules/login/login.html',
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

    }])

.constant('API_URL', 'http://mgm2.trakmark.com/mesh-api.php')
//.constant('API_URL', 'http://localhost:80/mesh-api/mesh-api.php')

.constant('PIX_URL', 'http://mgm.trakmark.com/mesh/photos');
//.constant('PIX_URL', 'assets/img/pix');
