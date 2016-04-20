'use strict';

angular.module('issueTrackingSystem.project.addProject', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project/add', {
            templateUrl: 'app/project/addProject/addProject.html',
            controller: 'projects'
        });
    }])

    .controller('projects', [
        '$scope',
        'authentication',
        'authorisation',
        'Notification',
        '$location',
        'project',
        function ($scope, authentication, authorisation, Notification, $location, project) {

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

            $scope.addIssue = function (pr) {
                project.add(pr)
                    .then(function (response) {
                        Notification.success('you have successfully added an issue in !');
                        $route.reload();
                    },function (err) {
                        Notification.error('error'+err.data.error_description);
                    }).finally(function () {
            
                })
            };
        }]);