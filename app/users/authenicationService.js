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
                })
                    .then(function (response) {
                        sessionStorage.setItem('accessToken',response.data.access_token);
                        console.log(response.data);
                    }, function (err) {
                        console.log(err.data.error_description);
                    });

                return deferred.promise;
            }

            function registerUser(user) {

                var emailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                // if user data is VALID
                if (emailRegexPattern.test(user.email) &&
                    user.password === user.confirmPassword &&
                    user.password.length >= 6) {

                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/Register', user, {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .then(function (response) {
                            //TODO: return msg : user created
                            console.log(response.data);
                            deferred.resolve(response.data);
                        }, function (err) {
                            //TODO: return error msg
                            console.log(err.data.ModelState[""][0]);  //strange response.....
                            deferred.resolve(err.data.ModelState[""][0]);
                        });

                    return deferred.promise;
                } else { // if user data is INVALID
                    //TODO: return msg : invalid data
                    console.log('invalid data')
                }
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser
            }
        }
    ]);