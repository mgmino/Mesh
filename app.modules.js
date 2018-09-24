angular.module('alerts', []);
angular.module('common', []);
angular.module('contacts', []);
angular.module('details', []);
angular.module('events', []);
angular.module('groups', []);
angular.module('layout', []);
angular.module('login', []);
angular.module('name-linking', []);
angular.module('notes', []);

angular.module('meshApp', [
    'ngRoute',
    'ngCookies',
    'angular.filter',
    'ui.bootstrap',

    'alerts',
    'common',
    'details',
    'groups',
    'contacts',
    'events',
    'layout',
    'login',
    'name-linking',
    'notes'
]);
