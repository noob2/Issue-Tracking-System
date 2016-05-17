'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'issueTrackingSystem.home',

    'issueTrackingSystem.project.projectController',
    'issueTrackingSystem.project.projectsFactory',

    'issueTrackingSystem.issue.issueController',
    'issueTrackingSystem.issue.issueFactory',

    'issueTrackingSystem.version',

    'issueTrackingSystem.users.authentication',
    'issueTrackingSystem.users.authorisation',
    'issueTrackingSystem.users.userFactory',

    'issueTrackingSystem.users.userController'
])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push(['$q', 'toastr', function ($q, toastr) {
            return {
                'request': function (response) {
                    return response;
                },
                'response': function (response) {
                    if (response.statusText === 'Created') {
                        toastr.success(response.statusText);
                    }
                    if (response.data[0] && response.data[0].Id === 3 && response.data[0].Name === "InProgress") {
                        toastr.success('status changed to "StoppedProgress"');
                    }
                    if (response.data[1] && response.data[1].Id === 4 && response.data[1].Name === "StoppedProgress") {
                        toastr.success('status changed to "InProgress"');
                    }
                    if (response.data.access_token) {
                        toastr.success('U re loged in');
                    }
                    return response;
                },
                'requestError': function (rejection) {
                },
                'responseError': function (rejection) {

                    if (rejection === 'Unauthorized Access') {
                        toastr.error(rejection);
                    }
                    if (rejection.data) {
                        if (rejection.data['error_description']) {
                            toastr.error(rejection.data['error_description']);
                        }
                        if (rejection.data.ModelState) {
                            Object.keys(rejection.data.ModelState).forEach(function (key) {
                                toastr.error(rejection.data.ModelState[key]);
                            });
                            if (rejection.data.ModelState['']) {
                                toastr.error(rejection.data.ModelState[''][0]);
                            }
                        } else if (rejection.data.Message) {
                            toastr.error(rejection.data.Message);
                            console.log(rejection.data.Message)
                        }
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