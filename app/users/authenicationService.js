angular.module('myApp.users.authentication', ['ngRoute'])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function loginUser(user) {
                var deferred = $q.defer();
                var loginUserData = "grant_type=password&username=" + user.username + "&password=" + user.password;
                $http.post(BASE_URL + 'api/Token', loginUserData, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function registerUser(user) {
                var deferred = $q.defer();

                var registerUserData = "email=" + user.email + "&password=" + user.password + "&ConfirmPassword=" + user.confirmPassword;

                $http.post(BASE_URL + 'api/Account/Register', registerUserData, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            function isLoggedIn() {
                //return !sessionStorage['accessToken'];
                return false;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isLoggedIn: isLoggedIn
            }
        }
    ]);