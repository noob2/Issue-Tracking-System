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
        '$location',
        //'authenicationService',
        function ($scope, $location) {

            if (true
                //authenicationService.isLogedIn()
            ) {
                //TODO : view dashboard
            } else {
                //TODO : view login / register

                // $scope.login = function (user) {
                //     authentication.loginUser(user)
                //         .then(function (loggedInUser) {
                //             console.log(loggedInUser);
                //             $location.path('/news-feed');
                //         })
                // };
                //
                // $scope.register = function (user) {
                //     authentication.registerUser(user)
                //         .then(function (registeredUser) {
                //             console.log(registeredUser);
                //         })
                // };
            }
        }]);