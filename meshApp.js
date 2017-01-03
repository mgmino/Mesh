angular.module('meshApp', [
    'ngRoute',
    'angular.filter',
    'services',
    'filters',
    'directives',
    'navigation',
    'contact',
    'tools',
    'results',
    'detail'
])



.config(function($routeProvider) {
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
        .otherwise({
            redirectTo: "/"
        });
});