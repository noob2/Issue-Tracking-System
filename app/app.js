'use strict';

angular.module('myApp', [
        'ngRoute',
        'myApp.home',
        'myApp.view2',
        'myApp.version',
        'myApp.users.authentication',
        'myApp.users.authorisation',
        'ui-notification'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');