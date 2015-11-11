angular.module("sanityWorksApp").controller("signupCtrl", function($scope, authService, $location) {

  $scope.signup = function(user) {
    if (user.password === $scope.password_repeat) {
      authService.register(user).then(function(response) {
        console.log(response);
      });
    }
    else {
      alert('Passwords do not match');
    }
  };
});
