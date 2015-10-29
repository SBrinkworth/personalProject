angular.module('sanityWorksApp').directive('drivesDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/drives/drivesDirTmpl.html',
    scope: {
      drive: '=',
      drives: '=',
      locations: '=',
      cases: '=',
      edit: '&',
      delete: '&'
    },
    controller: function($scope, dashService) {
      $scope.tempDrive = {};
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
      $scope.tempCases = (function() {
        var tempCases = [];
        for (var i = 0; i < $scope.cases.length; i++) {
          tempCases.push({
            name: $scope.cases[i].name,
            _id: $scope.cases[i]._id
          });
        }
        return tempCases;
      })();

      $scope.deleteDrive = function() {
        var tOF = confirm("Are you sure you want to delete this drive?");
        if (tOF) {
          $scope.delete({
            id: $scope.drive._id,
            _case: $scope.drive.case._id
          });
        }
      };

      $scope.editDrive = function() {
        $scope.nameError = false;
        $scope.serialNumberError = false;

        if ($scope.tempDrive.name !== $scope.drive.name) {
          $scope.nameError = dashService.checkCaseForNameMatch($scope.tempDrive.name, $scope.drives);
        }
        if ($scope.tempDrive.serial_number !== $scope.drive.serial_number) {
          $scope.serialNumberError = dashService.checkDriveForSNMatch($scope.tempDrive.serial_number, $scope.drives);
        }
        if ($scope.nameError || $scope.serialNumberError) {
          return;
        }

        $scope.edit({
          id: $scope.drive._id,
          drive: $scope.tempDrive,
          oldCase: $scope.drive.case._id
        });
        $scope.toggleInputs();
      };

      $scope.toggleInputs = function() {
        $scope.inputs = !$scope.inputs;
        $scope.nameError = false;
        $scope.serialNumberError = false;
        $scope.tempDrive = {
          name: $scope.drive.name,
          size: $scope.drive.size,
          serial_number: $scope.drive.serial_number,
          purchase_date: new Date($scope.drive.purchase_date),
          location: $scope.drive.location._id,
          case: $scope.drive.case._id,
          backup_type: $scope.drive.backup_type,
          last_backup_dateackup: new Date($scope.drive.last_backup_date)
        };
      };
    }
  };
});
