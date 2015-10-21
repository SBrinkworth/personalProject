angular.module("sanityWorksApp").service("mainService", function($http, dashService) {
  this.signup = function(user) {
    console.log('test');
    return $http({
      method: 'POST',
      url: 'https://localhost:8080/user/auth/signup',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.login = function(user) {
    console.log('test');
    return $http({
      method: 'POST',
      url: 'https://localhost:8080/user/auth/login',
      data: {email: user.email, password: user.password}
    }).then(function(response) {
      return response.data;
    });
  };
});
