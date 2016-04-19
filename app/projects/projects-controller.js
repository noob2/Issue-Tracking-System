'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/projects.html',
            controller: 'projects'
        });
    }])

    .controller('projects', [
        '$scope',
        'authentication',
        'authorisation',
        'Notification',
        '$location',
        function ($scope, authentication, authorisation, Notification, $location) {

            $scope.loading = false;
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
                    $location.path('/');
                }).finally(function () {
                $scope.loading = true;
            });
        }]);