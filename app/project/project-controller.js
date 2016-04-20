'use strict';

angular.module('issueTrackingSystem.project.projectController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/project/templates/projects.html',
            controller: 'projectsController'
        });
    }])

    .controller('projectsController', [
        '$scope',
        'authentication',
        'authorisation',
        'Notification',
        '$location',
        'projectFactory',
        function ($scope, authentication, authorisation, Notification, $location, projectFactory) {

            authorisation.getThisUser()
                .then(function () {


                    projectFactory.allProjects()
                        .then(function (projects) {
                            $scope.projects = projects;
                            Notification.success('all projects loaded!');
                        }, function (err) {
                            Notification.error('unable to load all projects' + err);
                        })
                        .finally(function () {
                            $scope.loading = true;
                        });





                }, function () {
                    Notification.error('u re not loged in');
                    $location.path('/');
                });
        }]);