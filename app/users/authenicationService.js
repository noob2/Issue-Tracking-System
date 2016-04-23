angular.module('issueTrackingSystem.users.authentication', ['ngRoute'])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        'authorisation',
        'Notification',
        function ($http, $q, BASE_URL, authorisation , Notification) {

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
                return !!sessionStorage['accessToken'];
            }
            
            function refreshUser() {
                if (isLoggedIn()) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['accessToken'];
                    authorisation.getThisUser()
                        .then(function (user) {
                            Notification.success('u re loged in!');
                            sessionStorage['userName'] = user.data.Username;
                            sessionStorage['userId'] = user.data.Id;
                            sessionStorage['isAdmin'] = user.data.isAdmin;
                        }, function () {
                            Notification.error('u re not loged in');
                        });
                }
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isLoggedIn: isLoggedIn,
                refreshUser: refreshUser
            }
        }
    ]);