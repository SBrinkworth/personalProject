angular.module("sanityWorksApp").controller("signupCtrl", function($scope, mainService, $location) {
  $scope.user = {};
  $scope.user.company = "5627f1255824b29105784cc8";
  $scope.signup = function() {
    if ($scope.user.password === $scope.password_repeat) {
      mainService.signup($scope.user).then(function(response) {
        $location.path('/login');
      });
    }
    else {
      alert('Passwords do not match');
    }
  };
});
