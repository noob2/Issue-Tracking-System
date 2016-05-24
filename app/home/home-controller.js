'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            
            templateUrl: 'app/home/templates/home.html',
            controller: 'HomeView'
        });
    }])

    .controller('HomeView', [
        '$scope',
        'authentication',
        'authorisation',
        '$location',
        '$route',
        'issueFactory',
        'projectFactory',
        function ($scope, authentication, authorisation, $location, $route, issueFactory, projectFactory) {
            $scope.isSomeoneLoggedIn = authentication.isLoggedIn();

            if ($scope.isSomeoneLoggedIn) {

                projectFactory.getMyProjects()
                    .then(function (myProjects) {
                        if (myProjects.data.Projects) {
                            $scope.affiliatedProjects = myProjects.data.Projects;
                        }

                    });

                issueFactory.getMyIssues()
                    .then(function (myIssues) {
                        if (myIssues.Issues){
                            $scope.affiliatedIssues = myIssues.Issues;
                            $scope.myIssues = myIssues.Issues;
                        }
                    })
            } else {

                $scope.login = function (user) {
                    authentication.loginUser(user)
                        .then(function (response) {
                            sessionStorage.setItem('accessToken', response.data.access_token);
                            authorisation.getThisUser()
                                .then(function (user) {
                                    sessionStorage.setItem('Id', user.data.Id);
                                    sessionStorage.setItem('isAdmin', user.data.isAdmin);
                                });

                            $route.reload();
                        })
                };

                $scope.register = function (user) {
                    authentication.registerUser(user)
                        .then(function () {
                            user.username = user.email;
                            authentication.loginUser(user)
                                .then(function (response) {
                                    sessionStorage.setItem('accessToken', response.data.access_token);
                                    $route.reload();
                                })
                        })
                };
            }
        }]);