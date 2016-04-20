'use strict';

angular.module('issueTrackingSystem.project.projectController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/project/templates/projects.html',
            controller: 'projectsController'
        });
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/project/templates/addProject.html',
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
        'userFactory',
        function ($scope, authentication, authorisation, Notification, $location, projectFactory, userFactory) {

            authorisation.getThisUser()
                .then(function () {

                    if ($location.path() == '/projects') {
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
                    }

                    else if ($location.path() == '/projects/add') {
                        
                        userFactory.getAllUsers()
                            .then(function (allUsers) {
                                $scope.users = allUsers;
                                $scope.loading = true;
                            });
                        
                        $scope.addProject = function (project) {
                            projectFactory.addProject(project)
                                .then(function (response) {
                                    Notification.success('you have successfully added an project in !');
                                    $route.reload();
                                },function (err) {
                                    Notification.error(err.data.Message);
                                    console.log(err)
                                }).finally(function () {
                        
                            })
                        };
                    }

                }, function () {
                    Notification.error('u re not loged in');
                    $location.path('/');
                });
        }]);