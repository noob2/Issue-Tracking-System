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
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'app/project/templates/editProject.html',
            controller: 'projectsController',
            resolve: routeChecks.authenticated
        });
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'app/project/templates/addIssue.html',
            controller: 'projectsController',
            resolve: routeChecks.authenticated
        });
    }])

    .controller('projectsController', [
        '$scope',
        'authentication',
        '$location',
        'projectFactory',
        'issueFactory',
        'userFactory',
        '$routeParams',
        function ($scope, authentication, $location, projectFactory, issueFactory, userFactory, $routeParams) {

            if ($location.path() == '/projects') {
                projectFactory.allProjects()
                    .then(function (projects) {
                        $scope.projects = projects;
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
                            $location.path('/projects');
                        });
                };
            }

            else if ($location.path().match('projects\/[0-9]+$')) {
                projectFactory.getProject($routeParams.id)
                    .then(function (project) {
                        $scope.project = project;
                    }, function (err) {
                        $location.path('/projects');
                    }).finally(function () {
                    $scope.loading = true;
                });
            }

            else if ($location.path().match('projects\/[0-9]+\/edit')) {

                projectFactory.getProject($routeParams.id)
                    .then(function (project) {
                        project.AllPriorities = "";
                        project.Priorities.forEach(function (priority) {
                            project.AllPriorities += priority.Name + ", ";
                        });

                        project.AllLabels = "";
                        project.Labels.forEach(function (label) {
                            project.AllLabels += label.Name + ", ";
                        });

                        $scope.project = project;
                    }, function (err) {
                        $location.path('/projects');
                    });

                userFactory.getAllUsers()
                    .then(function (users) {
                        $scope.users = users;
                        $scope.editProject = function (project) {
                            projectFactory.editProject(project)
                                .then(function (response) {
                                    $location.path('/projects/' + $routeParams.id);
                                })
                        };
                    }).finally(function () {
                    $scope.loading = true;
                });
            }

            else if ($location.path().match('projects\/[0-9]+\/add-issue')) {
                $scope.loading = true;

                $scope.updatePriorities = function () {
                    var proj = JSON.parse($scope.issue.project);

                    $scope.priorities = proj.Priorities;

                    $scope.AllLabels = "";
                    proj.Labels.forEach(function (label) {
                        $scope.AllLabels += label.Name + ", ";
                    });
                };

                projectFactory.allProjects()
                    .then(function (projects) {
                        $scope.allProjects = projects;
                    });

                userFactory.getAllUsers()
                    .then(function (users) {
                        $scope.allUsers = users;
                    });

                $scope.createIssue = function (issue) {
                    issueFactory.addIssue(issue)
                        .then(function (response) {
                            console.log(response)
                        },function (err) {
                            console.log(err);
                        })

                };
            }
        }]);