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
                        //Notification.success('you have successfully logged in !');
                        $route.reload();
                    }, function (err) {
                        //Notification.error(err.data.error_description);
                    }).finally(function () {

                })
            };

            $scope.register = function (user) {

                    authentication.registerUser(user)
                        .then(function () {
                           // Notification.success('u have successfully registered!');
                        }, function (err) {
                            //Notification.error(err.data.ModelState[""][0]);
                        })

            };
        }]);