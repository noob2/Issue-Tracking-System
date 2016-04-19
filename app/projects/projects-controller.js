'use strict';

angular.module('issueTrackingSystem.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'app/projects/projects.html',
    controller: 'projects'
  });
}])

.controller('projects', [function() {

}]);