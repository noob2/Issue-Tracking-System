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

    .config(['$routeProvider','$httpProvider', function ($routeProvider , $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

    //     $httpProvider.interceptors.push(['$q', function($q) {
    //         return {
    //             'responseError': function(rejection) {
    //                 if (rejection.data && rejection.data['error_description']) {
    //                     console.log(error(rejection.data['error_description']));
    //                 }
    //                 else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']){
    //                     var errors = rejection.data.modelState[''];
    //                     if (errors.length > 0) {
    //                         console.log(error(errors[0]));
    //                     }
    //                 }
    //
    //                 return $q.reject(rejection);
    //             }
    //         }
    //     }]);
    }])
    
    .run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {

        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection === 'Unauthorized Access') {
                $location.path('/');
            }
        });

    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');