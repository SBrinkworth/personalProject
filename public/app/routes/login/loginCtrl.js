angular.module("sanityWorksApp").controller("loginCtrl", function($scope, mainService, $location, users) {
  $scope.user = {};
  $scope.users = users;
  $scope.login = function() {
    mainService.login($scope.user).then(function(response) {
      $location.path('/dashboard');
    });
  };
});
