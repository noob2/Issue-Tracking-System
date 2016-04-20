'use strict';

angular.module('issueTrackingSystem.projects.addIssue', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/projects/addIssue/addIssue.html',
            controller: 'projects'
        });
    }])

    .controller('projects', [
        '$scope',
        'authentication',
        'authorisation',
        'Notification',
        '$location',
        'issue',
        function ($scope, authentication, authorisation, Notification, $location, issue) {

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

            $scope.addIssue = function (theIssue) {
                issue.add(theIssue)
                    .then(function (response) {
                        Notification.success('you have successfully added an issue in !');
                        $route.reload();
                    },function (err) {
                        Notification.error('error'+err.data.error_description);
                    }).finally(function () {
            
                })
            };
        }]);