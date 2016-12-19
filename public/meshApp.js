angular.module('meshApp', [
    'ngRoute',
    'services',
    'contact',
    'tools',
    'results'
])



.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            redirectTo: "/results"
        })
        .when("/results", {
            redirectTo: "/results/all"
        })
        .when("/results/:filter", {
            templateUrl: "modules/results/results.html",
            controller: "resultsController"
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