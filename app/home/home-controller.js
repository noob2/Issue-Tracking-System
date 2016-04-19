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
        'authentication',
        'authorisation',
        'notifier',
        function ($scope, $location, authentication, authorisation, notifier) {

            authorisation.getThisUser()
                .then(function (user) {
                    sessionStorage['userName'] = user.Username;
                    sessionStorage['userId'] = user.Id;
                    sessionStorage['isAdmin'] = user.isAdmin;
                    $scope.user = user;
                    $scope.username = user.username;
                    $scope.isSomeoneLoggedIn = true;
                }, function (err) {
                    $scope.demoNotification = {
                        template: 'Custom notification',
                        hasDelay: true,
                        delay: 3000,
                        type: 'info',
                        position: 'center'
                    };
                    $scope.customNotify = function() {
                        notifier.notify($scope.demoNotification);
                    };
                    notifier.showError("Request failed!", err.statusText);
                });


            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedInUser) {
                        // console.log(loggedInUser);
                        // $location.path('/news-feed');
                    })
            };
            //
            $scope.register = function (user) {
                authentication.getInfoAboutThisUser();
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser);
                    })
            };

        }]);