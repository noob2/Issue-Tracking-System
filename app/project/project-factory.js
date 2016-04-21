'use strict';

angular.module('issueTrackingSystem.project.projectsFactory', ['ngRoute'])
    .factory('projectFactory', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function allProjects() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/', {
                        headers: {
                            "Authorization": "Bearer " + sessionStorage['accessToken']
                        }
                    })
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function getProject(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id, {
                        headers: {
                            "Authorization": "Bearer " + sessionStorage['accessToken']
                        }
                    })
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function addProject(project) {
                var deferred = $q.defer();

                var priorities = project.priorities;
                var prioritiesArray = priorities.split(',');

                var prioritiesString = "";
                prioritiesArray.forEach(function (priority, i) {
                    prioritiesString += "&priorities[" + i + "].Name=" + priority;
                });

                var projectData = "Description=" + project.description
                    + "&LeadId=" + project.leadId
                    + "&Name=" + project.name
                    + "&projectKey=" + project.projectKey
                    + prioritiesString;

                $http.post(BASE_URL + 'projects', projectData, {
                        headers: {
                            "Authorization": "Bearer " + sessionStorage['accessToken'],
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            return {
                allProjects: allProjects,
                addProject: addProject,
                getProject: getProject
            }
        }]);