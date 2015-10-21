var app = angular.module("sanityWorksApp", ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: 'app/routes/home/homeTmpl.html',
    controller: 'homeCtrl'
  }).when('/login', {
    templateUrl: 'app/routes/login/loginTmpl.html',
    controller: 'loginCtrl'
  }).when('/signup', {
    templateUrl: 'app/routes/signup/signupTmpl.html',
    controller: 'signupCtrl'
  }).when('/dashboard', {
    templateUrl: 'app/routes/dashboard/dashTmpl.html',
    controller: 'dashCtrl',
    resolve: {
      drives: function(dashService) {
        return dashService.getDrives().then(function(response) {
          return response;
        });
      },
      locations: function(dashService) {
        return dashService.getLocations().then(function(response) {
          return response;
        });
      },
      cases: function(dashService) {
        return dashService.getCases().then(function(response) {
          return response;
        });
      }
    }
  }).when('/settings', {
    templateUrl: 'app/routes/settings/settingsTmpl.html',
    controller: 'settingsCtrl'
  }).otherwise({
    redirectTo: '/login'
  });
});
