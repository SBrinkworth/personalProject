angular.module("sanityWorksApp").controller("loginCtrl", function($scope, $location, authService) {
  $scope.login = function(user) {
    console.log(user);
    authService.login(user).then(function(response) {
      console.log(response);
    });
  };
});
