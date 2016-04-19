'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',

        'issueTrackingSystem.home',
    
        'issueTrackingSystem.projects',
        'issueTrackingSystem.projects.addIssue',
    
        'issueTrackingSystem.version',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.authorisation',
        'issueTrackingSystem.services.issue',

        'ui-notification'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');