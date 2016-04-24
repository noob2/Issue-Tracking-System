'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeView'
        });
    }])

    .controller('HomeView', [
        '$scope',
        'authentication',
        'authorisation',
        '$location',
        '$route',
        function ($scope, authentication, authorisation, $location, $route) {
            $scope.isSomeoneLoggedIn = authentication.isLoggedIn();

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        sessionStorage.setItem('accessToken', response.data.access_token);
                        $route.reload();
                    })
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function () {
                        user.username = user.email;
                        authentication.loginUser(user)
                            .then(function (response) {
                                sessionStorage.setItem('accessToken', response.data.access_token);
                                $route.reload();
                            })
                    })
            };
        }]);