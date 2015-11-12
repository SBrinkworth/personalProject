angular.module("sanityWorksApp").controller("signupCtrl", function($scope, authService, $location, companyService) {

  $scope.signup = function(user) {
    if (user.password === $scope.password_repeat) {
      authService.register(user).then(function(response) {
        $scope.user = response;
        companyService.createCompany().then(function(response) {
          console.log(response._id);
          var company = {company: response._id};
          authService.updateUser($scope.user._id, company).then(function(response) {
            console.log(response);
            $location.path('/login');
          });
        });
      });
    }
    else {
      alert('Passwords do not match');
    }
  };
});
