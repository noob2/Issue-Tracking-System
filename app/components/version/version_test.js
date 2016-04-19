'use strict';

describe('issueTrackingSystem.version module', function() {
  beforeEach(module('issueTrackingSystem.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
