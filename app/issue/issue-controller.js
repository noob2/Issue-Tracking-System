'use strict';

angular.module('issueTrackingSystem.issue.issueController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if (authentication.isLoggedIn()) {
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/issue/templates/issuePage.html',
            controller: 'issueController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'app/issue/templates/editIssue.html',
            controller: 'issueController',
            resolve: routeChecks.authenticated
        });
    }])

    .controller('issueController', [
        '$scope',
        'authentication',
        '$location',
        'projectFactory',
        'issueFactory',
        'userFactory',
        '$routeParams',
        function ($scope, authentication, $location, projectFactory, issueFactory, userFactory, $routeParams) {

            if ($location.path().match('issues\/[0-9]+$')) {
                issueFactory.getIssueById($routeParams.id)
                    .then(function (issue) {
                        issueFactory.getIssueComments($routeParams.id)
                            .then(function (response) {

                                $scope.comments = response;

                                $scope.addComment = function (comment) {
                                    issueFactory.addComment($routeParams.id, comment)
                                        .then(function (response) {
                                            $scope.comments = response.data;
                                            $scope.comment = undefined;
                                        })
                                };

                                $scope.issue = issue;

                                $scope.AllLabels = "";
                                issue.Labels.forEach(function (label) {
                                    $scope.AllLabels += label.Name + ", ";
                                });

                                $scope.changeStatus = function (statusId) {
                                    issueFactory.changeStatus($routeParams.id, statusId)
                                        .then(function (success) {
                                            if (!success[1]) {
                                                $scope.issue.Status.Name = "Closed";
                                            }
                                            else if (success[0].Name === "InProgress") {
                                                $scope.issue.Status.Name = "StoppedProgress";
                                                console.log(success[0].Name)
                                            }
                                            else if (success[1].Name === "StoppedProgress") {
                                                $scope.issue.Status.Name = "InProgress";
                                                console.log(success[1].Name)
                                            }
                                        })
                                };
                                $scope.loading = true;
                            });
                    })
            }

            else if ($location.path().match('issues\/[0-9]+\/edit')) {

                userFactory.getAllUsers()
                    .then(function (users) {
                        $scope.users = users;
                    }).finally(function () {
                    $scope.loading = true;
                });

                issueFactory.getIssueById($routeParams.id)
                    .then(function (issue) {
                        projectFactory.getProject($routeParams.id)
                            .then(function (project) {

                                issue.DueDate = new Date(issue.DueDate);

                                $scope.issue = issue;

                                $scope.issue.priorities = project.Priorities;

                                $scope.editIssue = function (issue) {
                                    issueFactory.editIssue($routeParams.id, issue)
                                        .then(function (success) {
                                            $location.path('/issues/' + $routeParams.id);
                                        })
                                }
                            });
                    });

                $scope.loading = true;
            }
        }]);