'use strict';

angular.module('issueTrackingSystem.issue.issueFactory', ['ngRoute'])
    .factory('issueFactory', [
        '$http',
        '$q',
        'BASE_URL',
        '$routeParams',
        function ($http, $q, BASE_URL, $routeParams) {
            function stringifyLabels(labels) {
                if (labels === undefined || labels === "") {
                    return "";
                }

                var labelsArray = labels.split(',');
                var labelsOutputString = "";
                labelsArray.forEach(function (label, i) {
                    if (label.trim() !== "") {
                        labelsOutputString += "&labels[" + i + "].Name=" + label.trim();
                    }
                });
                return labelsOutputString;
            }

            function addIssue(issue) {

                var proj = JSON.parse(issue.project);

                var deferred = $q.defer();
                var labelsData = stringifyLabels(issue.AllLabels);
                var date = String(issue.DueDate).substr(0, 25);
                var issueData = "DueDate=" + date
                    + "&ProjectId=" + proj.Id
                    + "&PriorityId=" + issue.PriorityId
                    + "&Title=" + issue.Title
                    + "&Description=" + issue.Description
                    + "&AssigneeId=" + issue.AssigneeId
                    + labelsData;

                $http.post(BASE_URL + 'issues', issueData, {
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

            function addComment(id, comment) {
                var deferred = $q.defer();
                
                $http.post(BASE_URL + 'issues/' + id + '/comments', 'Text=' + comment, {
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

            function getIssueById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id, {
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

            function changeStatus(issueId, statusId) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId, {})
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function getIssueComments(issueId) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.get(BASE_URL + 'issues/' + issueId + '/comments', {})
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function editIssue(issueId,issue) {
                var deferred = $q.defer();
                var date = String(issue.DueDate).substr(0, 25);
                var issueData = "DueDate=" + date
                    + "&PriorityId=" + issue.PriorityId
                    + "&Title=" + issue.Title
                    + "&Description=" + issue.Description
                    + "&AssigneeId=" + issue.AssigneeId;

                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.put(BASE_URL + 'issues/' + issueId,issueData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                })
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function getMyIssues() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.get(BASE_URL + '/issues/me?orderBy=Project.Name desc, IssueKey&pageSize=20&pageNumber=1', {})
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            function getProjectIssues(id) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = "Bearer " + sessionStorage['accessToken'];
                $http.get(BASE_URL + '/projects/'+id+'/issues', {})
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });

                return deferred.promise;
            }

            return {
                addIssue: addIssue,
                addComment: addComment,
                getIssueById: getIssueById,
                changeStatus: changeStatus,
                getIssueComments: getIssueComments,
                editIssue: editIssue,
                getMyIssues: getMyIssues,
                getProjectIssues: getProjectIssues
            }
        }]);