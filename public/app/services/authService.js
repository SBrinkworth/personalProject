angular.module("sanityWorksApp").service("authService", function($http, constants, $location) {
  this.register = function(user) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'user',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'logout'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user'
    }).then(function(response) {
      console.log(response);
      return response.data;
    });
  };

  this.updateUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'user/' + id,
      data: user
    }).then(function(response) {
      return response.data;
    });
  };
});
