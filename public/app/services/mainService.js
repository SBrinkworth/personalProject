angular.module("sanityWorksApp").service("mainService", function($http) {
  this.logedIn = false;
  this.signup = function(user) {
    return $http({
      method: 'POST',
      url: "https://localhost:8080/users",
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: "https://localhost:8080/users"
    }).then(function(response) {
      return response.data;
    });
  };

  this.login = function(user, users) {
    for (var i = 0; i < users.length; i++) {
      if (user.email === users[i].email && user.password === users[i].password) {
        this.logedIn = true;
      }
    }
    alert('Name or password incorrect');
  };

  this.isLogedIn = function() {
    return this.logedIn;
  };
});
