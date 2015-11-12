angular.module("sanityWorksApp", ['ngRoute'])

.constant("constants",
{
  "baseURL": "http://localhost:9852/"
})

.config(function($routeProvider) {

  $routeProvider
  // .when('/home', {
  //   templateUrl: './app/routes/home/homeTmpl.html',
  //   controller: 'homeCtrl'
  // })
  .when('/login', {
    templateUrl: './app/routes/login/loginTmpl.html',
    controller: 'loginCtrl',
    resolve: {

    }
  })
  .when('/signup', {
    templateUrl: './app/routes/signup/signupTmpl.html',
    controller: 'signupCtrl'
  })
  .when('/dashboard', {
    templateUrl: './app/routes/dashboard/dashTmpl.html',
    controller: 'dashCtrl',
    resolve: {
      drives: function(authService, dashService) {
        var company;
        authService.getCurrentUser().then(function(response) {
          company = response.company;
        }, function(error) {

        });
        return dashService.getDrives(company).then(function(response) {
          return response;
        });
      },
      locations: function(authService, dashService) {
        var company;
        authService.getCurrentUser().then(function(response) {
          company = response.company;
        }, function(error) {

        });
        return dashService.getLocations(company).then(function(response) {
          return response;
        });
      },
      cases: function(authService, dashService) {
        var company;
        authService.getCurrentUser().then(function(response) {
          company = response.company;
        }, function(error) {

        });
        return dashService.getCases(company).then(function(response) {
          return response;
        });
      }
    }
  })
  // .when('/settings', {
  //   templateUrl: './app/routes/settings/settingsTmpl.html',
  //   controller: 'settingsCtrl'
  // })
  .otherwise({
    redirectTo: '/login'
  });
});
