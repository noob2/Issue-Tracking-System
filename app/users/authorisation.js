'use strict';

angular.module('issueTrackingSystem.users.authorisation', ['ngRoute'])
    .factory('authorisation', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getThisUser() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.get(BASE_URL + 'Users/me')
                    .then(function (response) {
                        deferred.resolve(response)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }
            
            return{
                getThisUser:getThisUser
            }
        }]);