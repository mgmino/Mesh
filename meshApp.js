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



.config(['$routeProvider', function($routeProvider) {
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
         .when("/search", {
            templateUrl: "modules/tools/tools.html",
            controller: "toolsController"
        })
         .when("/import", {
            templateUrl: "modules/tools/tools.html",
            controller: "toolsController"
        })
        .when("/login", {
            templateUrl: "modules/login/login.html",
            controller: "loginController"
        })
        .otherwise({
            redirectTo: "/"
        });
}])


.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {
    var openRoutes = ['/login'];
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var goingToOpenRoute = $.inArray($location.path(), openRoutes);
        if (!goingToOpenRoute && !loginService.isLoggedIn()) {
            $location.path('/login');
        }
    });
}]);