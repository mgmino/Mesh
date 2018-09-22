angular
    .module('meshApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/contacts/favorites'
        })
        .when('/contacts/:filter', {
            templateUrl: 'modules/contacts/viewContacts.htm',
            controller: 'contactsController'
        })
        .when('/detail/:cid', {
            templateUrl: 'modules/details/viewDetail.htm',
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
}

angular
    .module('meshApp')
    .run(run);

run.$inject = ['$rootScope', '$location', '$http', '$cookies', 'loginService'];

function run($rootScope, $location, $http, $cookies, loginService) {
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
}
