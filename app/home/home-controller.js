'use strict';

angular.module('myApp.home', ['ngRoute'])

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
        'Notification',
        function ($scope, authentication, authorisation, Notification) {
            authorisation.getThisUser()
                .then(function (user) {
                    Notification.success('u re loged in!');
                    sessionStorage['userName'] = user.Username;
                    sessionStorage['userId'] = user.Id;
                    sessionStorage['isAdmin'] = user.isAdmin;
                    $scope.user = user;
                    $scope.username = user.username;
                    $scope.isSomeoneLoggedIn = true;
                }, function () {
                    Notification.error('u re not loged in');
                });

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        sessionStorage.setItem('accessToken',response.data.access_token);
                        Notification.success('you have successfully logged in !');
                        location.reload();
                    },function (err) {
                        Notification.error(err.data.error_description);
                    })
            };

            $scope.register = function (user) {

                var emailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                // if user data is VALID
                if (emailRegexPattern.test(user.email) && user.password === user.confirmPassword && user.password.length >= 6) {

                authentication.registerUser(user)
                    .then(function () {
                        Notification.success('u have successfully registered!');
                    },function (err) {
                        Notification.error(err.data.ModelState[""][0]);
                    })

                } else { // if user data is INVALID
                    Notification.error('invalid data');
                }
            };

        }]);