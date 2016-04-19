'use strict';

angular.module('issueTrackingSystem.version', [
  'issueTrackingSystem.version.interpolate-filter',
  'issueTrackingSystem.version.version-directive'
])

.value('version', '0.1');
