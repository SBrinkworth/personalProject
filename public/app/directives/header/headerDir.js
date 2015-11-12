angular.module('sanityWorksApp').directive('navDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/header/headerTmpl.html',
    controller: function($scope, authService, $location) {
      $scope.logedin = false;
      authService.getCurrentUser().then(function(response) {
        $scope.user = response;
        if ($scope.user) {
          $scope.logedin = true;
        }
      }, function(error) {
        if (error) {
          
        }
      }
    );

      $scope.logout = function() {
        authService.logout();
      };
    }
  };
});
