'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home',

        'issueTrackingSystem.project.projectController',
        'issueTrackingSystem.project.projectsFactory',

        'issueTrackingSystem.version',

        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.authorisation',
        'issueTrackingSystem.users.userFactory'
    ])

    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push(['$q', 'toastr', function ($q, toastr) {
            return {
                'request': function (response) {
                    //console.log(response);
                    //     if(response.statusText && response.statusText === 'OK'){
                    //     toastr.error('U re loged in');
                    // }
                    return response;
                },
                'response': function (response) {
                    if (response.data.access_token) {
                        toastr.success('U re loged in');
                    }
                    return response;
                },
                'requestError': function (rejection) {
                },
                'responseError': function (rejection) {
                    if (rejection.data && rejection.data['error_description']) {
                        toastr.error(rejection.data['error_description']);
                    }
                    else if (rejection === 'Unauthorized Access') {
                        toastr.error(rejection);
                    }
                    else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']) {
                        toastr.error(rejection.data.modelState['']);
                    }
                    else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['model.Password']) {
                        toastr.error(rejection.data.ModelState['model.Password']);
                    }
                    else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['model.ConfirmPassword']) {
                        toastr.error(rejection.data.ModelState['model.ConfirmPassword']);
                    }
                    else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState[""][0]) {
                        toastr.error(rejection.data.ModelState[""][0]);
                    }
                    return $q.reject(rejection);
                }
            }
        }]);
    }])

    .run(['$rootScope', '$location', 'toastr', function ($rootScope, $location, toastr) {

        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'Unauthorized Access') {
                toastr.error(rejection);
                $location.path('/');
            }
        });
    }])
    .constant('jQuery', $)
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');