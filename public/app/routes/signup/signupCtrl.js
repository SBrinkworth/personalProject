angular.module("sanityWorksApp").controller("signupCtrl", function($scope, authService, $location, companyService, dashService) {

  $scope.signup = function(user) {
    if (user.password === $scope.password_repeat) {
      authService.register(user).then(function(response) {
        $scope.user = response;
        companyService.createCompany().then(function(response) {
          console.log(response._id);
          dashService.addDrive({
            name: 'None',
            size: 'None',
            serial_number: "000000000000000000000000000000000000000000000000000000000000000",
            purchase_date: new Date(),
            company: response._id,
            backup_type: 'None',
            last_backup_date: new Date()
          }).then(function(response) {
            console.log(response);
          });
          dashService.addCase({
            name: 'None',
            company: response._id
          }).then(function(response) {
            console.log(response);
          });
          dashService.addLocation({
            name: 'None',
            nameShort: 'None',
            description: 'None',
            address: {
              lineOne: 'None',
              lineTwo: 'None',
              city: 'None',
              state: 'None',
              zip: 'None',
              country: 'None'
            },
            company: response._id
          }).then(function(response) {
            console.log(response);
          });
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
