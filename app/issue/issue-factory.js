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
                console.log(issue);
                console.log(proj);

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

                $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId, {
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

            // function stringifyPriorities(priorities) {
            //     if(priorities === undefined || priorities === ""){
            //         return "";
            //     }
            //
            //     var prioritiesArray = priorities.split(',');
            //     var prioritiesOutputString = "";
            //     prioritiesArray.forEach(function (priority, i) {
            //         if (priority.trim() !== "") {
            //             prioritiesOutputString += "&priorities[" + i + "].Name=" + priority.trim();
            //         }
            //     });
            //     return prioritiesOutputString;
            // }
            //
            // function stringifyLabels(labels) {
            //     if(labels === undefined || labels === ""){
            //         return "";
            //     }
            //
            //     var labelsArray = labels.split(',');
            //     var labelsOutputString = "";
            //     labelsArray.forEach(function (label, i) {
            //         if (label.trim() !== "") {
            //             labelsOutputString += "&labels[" + i + "].Name=" + label.trim();
            //         }
            //     });
            //     return labelsOutputString;
            // }
            //
            // function allProjects() {
            //     var deferred = $q.defer();
            //
            //     $http.get(BASE_URL + 'projects/', {
            //             headers: {
            //                 "Authorization": "Bearer " + sessionStorage['accessToken']
            //             }
            //         })
            //         .then(function (response) {
            //             deferred.resolve(response.data)
            //         }, function (err) {
            //             deferred.reject(err)
            //         });
            //
            //     return deferred.promise;
            // }
            //
            //
            //
            // function addProject(project) {
            //     var deferred = $q.defer();
            //
            //     var prioritiesData = stringifyPriorities(project.priorities);
            //     var labelsData = stringifyLabels(project.labels);
            //
            //     var projectData = "Description=" + project.description
            //         + "&LeadId=" + project.leadId
            //         + "&Name=" + project.name
            //         + "&projectKey=" + project.projectKey
            //         + prioritiesData
            //         + labelsData;
            //
            //     $http.post(BASE_URL + 'projects', projectData, {
            //             headers: {
            //                 "Authorization": "Bearer " + sessionStorage['accessToken'],
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             }
            //         })
            //         .then(function (response) {
            //             deferred.resolve(response)
            //         }, function (err) {
            //             deferred.reject(err)
            //         });
            //
            //     return deferred.promise;
            // }
            //
            // function editProject(project) {
            //     var deferred = $q.defer();
            //     var prioritiesData = stringifyPriorities(project.AllPriorities);
            //     var labelsData = stringifyLabels(project.AllLabels);
            //
            //     var projectData =
            //         "Description=" + project.Description
            //         + "&LeadId=" + project.Lead.Id
            //         + "&Name=" + project.Name
            //         + prioritiesData
            //         + labelsData;
            //
            //     $http.put(BASE_URL + 'projects/' + $routeParams.id, projectData, {
            //             headers: {
            //                 "Authorization": "Bearer " + sessionStorage['accessToken'],
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             }
            //         })
            //         .then(function (response) {
            //             deferred.resolve(response)
            //         }, function (err) {
            //             deferred.reject(err)
            //         });
            //     return deferred.promise;
            // }

            return {
                addIssue: addIssue,
                getIssueById: getIssueById,
                changeStatus: changeStatus
            }
        }]);