angular.module("sanityWorksApp").controller("signupCtrl", function($scope, mainService, $location) {
  $scope.user = {};
  $scope.signup = function() {
    if ($scope.user.password === $scope.password_repeat) {
      mainService.signup($scope.user).then(function(response) {
        $location.path('/dashboard');
      });
    }
    else {
      alert('Passwords do not match');
    }
  };
});
