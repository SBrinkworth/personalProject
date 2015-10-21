angular.module("sanityWorksApp").controller("loginCtrl", function($scope, mainService, $location) {
  $scope.user = {};
  $scope.login = function() {
    mainService.login($scope.user).then(function(response) {
      $location.path('/dashboard');
    });
  };
});
