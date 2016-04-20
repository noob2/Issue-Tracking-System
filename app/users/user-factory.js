'use strict';

angular.module('issueTrackingSystem.users.userFactory', ['ngRoute'])
    .factory('userFactory', [
        '$q',
        '$http',
        'BASE_URL',
        function ($q, $http, BASE_URL) {
            function getAllUsers() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users', {
                        headers: {"Authorization": "Bearer " + sessionStorage['accessToken']}
                    })
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }

            function editUser(user) {
                var deferred = $q.defer();
                $http.put(BASE_URL + 'me', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }

            function editPassword(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'api/account/changePassword', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                editUser: editUser,
                editPassword: editPassword,
                getAllUsers: getAllUsers
            }
        }]);