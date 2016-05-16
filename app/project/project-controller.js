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

                $scope.myUserId = sessionStorage['Id'];

                projectFactory.getProject($routeParams.id)
                    .then(function (project) {
                        issueFactory.getProjectIssues($routeParams.id)
                            .then(function (issues) {

                                $scope.project = project;

                                if (issues[0]) {
                                    $scope.projectIssues = issues;
                                } else {
                                    $scope.showIssuesTable = true;
                                }

                            }).finally(function () {
                            $scope.loading = true;
                        });
                    }, function (err) {
                        $location.path('/projects');
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
                projectFactory.allProjects()
                    .then(function (projects) {
                        userFactory.getAllUsers()
                            .then(function (users) {
                                $scope.allProjects = projects;
                                $scope.allUsers = users;

                                $scope.updateProject = function () {
                                    $scope.priorities = $scope.issue.project.Priorities;

                                    var labelsSeparatedByComma = "";
                                    $scope.issue.project.Labels.forEach(function (label) {
                                        labelsSeparatedByComma += label.Name + ", ";
                                    });
                                    $scope.issue.AllLabels = labelsSeparatedByComma;
                                };

                                $scope.createIssue = function (issue) {
                                    issueFactory.addIssue(issue)
                                        .then(function (response) {
                                            console.log(response)
                                        }, function (err) {
                                            console.log(err);
                                        })

                                };
                            });
                    }).finally(function () {
                    $scope.loading = true;
                });
            }
        }]);