angular.module('sanityWorksApp').directive('casesDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/cases/casesDirTmpl.html',
    scope: {
      drives: '=',
      locations: '=',
      cases: '=',
      case: '=',
      edit: '&',
      delete: '&'
    },
    controller: function($scope, dashService) {
      $scope.tempLocations = (function() {
        var tempLocations = [];
        for (var i = 0; i < $scope.locations.length; i++) {
          tempLocations.push({
            name: $scope.locations[i].name,
            _id: $scope.locations[i]._id
          });
        }
        return tempLocations;
      })();
      $scope.tempDrives = (function() {
        var tempDrives = [];
        for (var i = 0; i < $scope.drives.length; i++) {
          tempDrives.push({
            name: $scope.drives[i].name,
            _id: $scope.drives[i]._id
          });
        }
        return tempDrives;
      })();
      $scope.tempCase = {
        name: $scope.case.name,
        drive: $scope.case.drive,
        location: $scope.case.location._id
      };

      $scope.deleteCase = function() {
        var tOF = confirm("Are you sure you want to delete this case?");
        if (tOF) {
          $scope.delete({
            id: $scope.case._id,
            drive: $scope.case.drive._id
          });
        }
      };

      $scope.editCase = function() {
        $scope.nameError = false;

        if (dashService.checkCaseForNameMatch($scope.tempCase.name, $scope.cases) && $scope.tempCase.name !== $scope.case.name) {
          $scope.nameError = true;
          return;
        }

        $scope.edit({
          id: $scope.case._id,
          case: $scope.tempCase,
          oldDrive: $scope.case.drive._id
        });
        $scope.toggleInputs();
      };

      $scope.toggleInputs = function() {
        $scope.inputs = !$scope.inputs;
        $scope.nameError = false;
        $scope.tempCase = {
          name: $scope.case.name,
          drive: $scope.case.drive._id,
          location: $scope.case.location._id
        };
      };
    }
  };
});
