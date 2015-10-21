angular.module('sanityWorksApp').directive('locationsDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/locations/locationsDirTmpl.html',
    scope: {
      drives: '=',
      location: '=',
      cases: '=',
      edit: '&',
      delete: '&'
    },
    controller: function($scope) {
      $scope.tempLocation = {
        name: $scope.location.name,
        nameShort: $scope.location.nameShort,
        description: $scope.location.description,
        address: $scope.location.address
      };

      $scope.deleteLocation = function() {
        var tOF = confirm("Are you sure you want to delete this location?");
        if (tOF) {
          $scope.delete({
            id: $scope.location._id
          });
        }
      };

      $scope.editLocation = function() {
        var tOF = confirm("Are you sure you want to delete this location?");
        if (tOF) {
          $scope.edit({
            id: $scope.location._id,
            location: $scope.tempLocation
          });
          $scope.toggleInputs();
        }
      };

      $scope.toggleInputs = function() {
        $scope.inputs = !$scope.inputs;
        $scope.tempLocation = {
          name: $scope.location.name,
          nameShort: $scope.location.nameShort,
          description: $scope.location.description,
          address: $scope.location.address
        };
      };
    }
  };
});
