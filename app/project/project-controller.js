'use strict';

angular.module('issueTrackingSystem.project.projectController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isLoggedIn()) {
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects', {
            templateUrl: 'app/project/templates/projects.html',
            controller: 'projectsController',
            resolve: routeChecks.authenticated
        });
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/project/templates/addProject.html',
            controller: 'projectsController',
            resolve: routeChecks.authenticated
        });
        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/project/templates/projectPage.html',
            controller: 'projectsController',
            resolve: routeChecks.authenticated
        });
    }])

    .controller('projectsController', [
        '$scope',
        'authentication',
        '$location',
        'projectFactory',
        'userFactory',
        '$routeParams',
        function ($scope, authentication, $location, projectFactory, userFactory, $routeParams) {

            if ($location.path() == '/projects') {
                projectFactory.allProjects()
                    .then(function (projects) {
                        $scope.projects = projects;
                        //Notification.success('all projects loaded!');
                    }, function (err) {
                       // Notification.error('unable to load all projects' + err);
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
                            //Notification.success('you have successfully added an project in !');
                            $route.reload();
                        }, function (err) {
                            //Notification.error(err.data.Message);
                            console.log(err)
                        }).finally(function () {

                    })
                };
            }

            else if ($location.path().match('projects\/[0-9]+')) {
                projectFactory.getProject($routeParams.id)
                    .then(function (project) {
                        $scope.project = project;

                        userFactory.getAllUsers()
                            .then(function (allUsers) {
                                $scope.users = allUsers;
                                $scope.loading = true;
                            });

                    }, function (err) {
                        console.log(err);
                    }).finally(function () {
                    $scope.loading = true;
                });
            }

        }]);