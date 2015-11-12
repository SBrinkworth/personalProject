angular.module("sanityWorksApp").service("companyService", function($http, constants) {
  this.createCompany = function() {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'companies',
      data: {}
    }).then(function(response) {
        return response.data;
    });
  };
});
