'use strict';

angular.module('issueTrackingSystem.services.issue', ['ngRoute'])
    .factory('issue', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function add(issue) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/',issue, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                            "Authorization": "Bearer " + sessionStorage['accessToken']}
                    })
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            return{
                add:add
            }
        }]);