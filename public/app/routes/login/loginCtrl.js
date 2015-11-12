angular.module("sanityWorksApp").controller("loginCtrl", function($scope, $location, authService) {
  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      $location.path('/dashboard');
    });
  };
});
