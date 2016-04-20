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

            function add(issue) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'projects/', issue, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Authorization": "Bearer " + sessionStorage['accessToken']
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
                add: add
            }
        }]);