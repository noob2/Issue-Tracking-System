'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',

        'issueTrackingSystem.home',

        'issueTrackingSystem.project.projectController',
        'issueTrackingSystem.project.projectsFactory',

        'issueTrackingSystem.version',
    
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.authorisation',
        'issueTrackingSystem.users.userFactory',

        'ui-notification'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');