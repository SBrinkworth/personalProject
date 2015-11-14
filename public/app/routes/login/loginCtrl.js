angular.module("sanityWorksApp").controller("loginCtrl", function($rootScope, $scope, $location, authService) {
  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      $rootScope.company = response.company;
      $location.path('/dashboard');
    });
  };
});
