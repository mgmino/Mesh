angular.module('alerts', []);
angular.module('common', []);
angular.module('contacts', []);
angular.module('events', []);
angular.module('layout', []);
angular.module('login', []);
angular.module('name-linking', []);

angular.module('meshApp', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'ui.bootstrap',

    'alerts',
    'common',
    'contacts',
    'events',
    'layout',
    'login',
    'name-linking'
]);
