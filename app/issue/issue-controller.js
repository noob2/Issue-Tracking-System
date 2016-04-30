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
                        $scope.issue = issue;

                        var AllLabels = "";
                        issue.Labels.forEach(function (label) {
                            $scope.AllLabels += label.Name + ", ";
                        });
                        $scope.AllLabels = AllLabels;
                        $scope.changeStatus = function(statusId) {
                            issueFactory.changeStatus($routeParams.id,statusId)
                                .then(function (success) {
                                    console.log(success)
                                })
                        };

                        $scope.loading = true;
                        console.log(issue)
                    })
            }


        }]);