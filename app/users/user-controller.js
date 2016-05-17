'use strict';

angular.module('issueTrackingSystem.users.userController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {

            templateUrl: 'app/home/templates/home.html',
            controller: 'userController'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/users/templates/change-password.html',
            controller: 'userController'
        });
    }])

    .controller('userController', [
        '$scope',
        'authentication',
        'authorisation',
        '$location',
        'userFactory',
        function ($scope, authentication, authorisation, $location,userFactory) {
            if ($location.path() == '/logout') {
                sessionStorage.clear();
                $location.path('#/');
            } else if ($location.path() == '/profile/password') {
                
                $scope.changePassword = function (userData) {
                    userFactory.changePassword(userData)
                        .then(function (success) {
                            toastr.success('successfully changed password');
                            $location.path('/');
                        }, function (err) {

                        });
                }
            }
        }]);