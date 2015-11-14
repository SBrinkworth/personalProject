angular.module("sanityWorksApp", ['ngRoute'])

.constant("constants", {
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
        drives: function($rootScope, dashService) {
          return dashService.getDrives($rootScope.company).then(function(response) {
            return response;
          });
        },
        locations: function($rootScope, dashService) {
          return dashService.getLocations($rootScope.company).then(function(response) {
            return response;
          });
        },
        cases: function($rootScope, dashService) {
          return dashService.getCases($rootScope.company).then(function(response) {
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
