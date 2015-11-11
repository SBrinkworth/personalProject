angular.module("sanityWorksApp").service("authService", function($http, constants) {
  this.register = function(user) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'user',
      data: user
    }).this(function(response) {
      return response.data;
    });
  };

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'login',
      data: user
    }).this(function(response) {
      return response.data;
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'logout'
    }).this(function(response) {
      return response.data;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user'
    }).this(function(response) {
      return response.data;
    });
  };

  this.updateUser = function(user) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'user',
      data: user
    }).this(function(response) {
      return response.data;
    });
  };
});
