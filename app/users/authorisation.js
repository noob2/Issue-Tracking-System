'use strict';

angular.module('myApp.users.authorisation', ['ngRoute'])
    .factory('authorisation', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getThisUser() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users/me', {
                        headers: {"Authorization": "Bearer 2qYaYrz39S3-FXS5dELrknFc73Jg7vcUJ2JNTltz4XKwDXDRFQJ7Py2_yUAbpl_QFl0WAN6QtFbr64Ds5yDWTk8rDlps5dEM2Je98ftcg4RFp8XrwofaYTkkznSlqkbu18OKatMAeLInyNLJJeapTG7CSXmAwJxpnCbsmyppSXhZU4uvA-dj-YOFFkRtU4Sh-E0OSXTULpS9NY-8FmC67UQLTn0GGEELCmlsrs3Yq75KILS6g5zEpWRFUM_s9Ua99XXxFjyL9JAJoziyKmpV55IYgyKBVD5_WdizgE9E4XVN4F9xdpIi9urqQr6GqkfhY4RBT96gpsXerngv1nZNp7DFfG0XGLmKWUmciWGjI-wlWpDqKrVATkoJ6xDzkKR2RbSyq6VLYFzuPJNDijuW91LmE4BjiR9EUJcUmRRQ2jgxcYLanJZ02p7katFyxxPgsUdouWUMDai7_AQsqtR0irR1uJc6LXs8NjWSQhx25qU"}
                    })
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