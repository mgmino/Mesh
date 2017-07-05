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
    'tools',
    'results',
    'detail'
])

.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
    $routeProvider
        .when("/", {
            redirectTo: "/results/all"
        })
        .when("/results/:filter", {
            templateUrl: "modules/results/results.html",
            controller: "resultsController"
        })
        .when("/detail/:cid", {
            templateUrl: "modules/detail/detail.htm",
            controller: "detailController"
        })
        .when("/contact/:id", {
            templateUrl: "modules/contact/contact.html",
            controller: "contactController"
        })
        .when("/tools", {
            templateUrl: "modules/tools/tools.html",
            controller: "toolsController"
        })
        .when('/about', {
            templateUrl: 'modules/about.htm'
        })
        .when('/tags', {
            templateUrl: 'modules/tags.htm'
        })
         .when("/search", {
            templateUrl: "modules/tools/tools.html",
            controller: "toolsController"
        })
         .when('/import', {
            templateUrl: 'modules/import.htm'
        })
        .when("/login", {
            templateUrl: "modules/login/login.html",
            controller: "loginController"
        })
        .otherwise({
            redirectTo: "/"
        });
}])


.run(['$rootScope', '$location', '$http', '$cookies', 'loginService',
    function ($rootScope, $location, $http, $cookies, loginService) {

        // Routes here do not require a login
        var openRoutes = ['/login'];

        // Keep user logged in after page refresh
        if (loginService.isLoggedIn()) {
            console.log('Setting credentials for user from previous session');
            var token = loginService.getToken();
            loginService.setHeaders(token);
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var goingToOpenRoute = $.inArray($location.path(), openRoutes) === 0;
            if (!goingToOpenRoute && !loginService.isLoggedIn()) {
                console.log('Blocked route access to ' + $location.path());
                // Cannot access restricted route without logging in
                $location.path('/login');
            }
        });

    }])

//.constant ('API_URL', 'http://mgm2.trakmark.com/mesh-api.php');
.constant ('API_URL', 'http://localhost:80/mesh-api/mesh-api.php');
