angular.module('myApp.users.authentication', ['ngRoute'])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function loginUser(user) {
                var deferred = $q.defer();

                var loginRequest = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: user
                };

                $http(loginRequest)
                    .then(function (response) {
                        //sessionStorage.setItem('authorisationToken',response.data._kmd.authtoken);
                        //sessionStorage.setItem('user',response.data.username);
                        console.log(response.data);
                    }, function (err) {
                        console.log(err);
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

                    var registerRequest = {
                        method: 'POST',
                        url: BASE_URL + 'api/Account/Register',
                        data: user
                    };

                    $http(registerRequest)
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