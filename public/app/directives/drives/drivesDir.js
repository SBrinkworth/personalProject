angular.module('sanityWorksApp').directive('drivesDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/drives/drivesDirTmpl.html',
    scope: {
      drive: '=',
      locations: '=',
      cases: '=',
      edit: '&',
      delete: '&'
    },
    controller: function($scope) {
      var Drive = function(name, size, serial_number, purchase_date, company, location, _case, backing_up, backup_type, last_backup_date) {
        return {
          name: name,
          size: size,
          serial_number: serial_number,
          purchase_date: purchase_date,
          company: company,
          location: location,
          case: _case,
          backing_up: backing_up,
          backup_type: backup_type,
          last_backup_date: last_backup_date
        };
      };
      $scope.tempDrive = new Drive($scope.drive.name,  $scope.drive.size, $scope.drive.serial_number, $scope.drive.purchase_date, $scope.drive.location, $scope.drive.case, $scope.drive.backup_type, $scope.drive.last_backup_date);
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
        var tOF = confirm("Are you sure you want to edit this drive?");
        if (tOF) {
          $scope.edit({
            id: $scope.drive._id,
            drive: $scope.tempDrive
          });
          $scope.toggleInputs();
        }
      };

      $scope.toggleInputs = function() {
        $scope.inputs = !$scope.inputs;
        $scope.tempDrive = {
          name: $scope.drive.name,
          size: $scope.drive.size,
          serial_number: $scope.drive.serial_number,
          purchase_date: new Date($scope.drive.purchase_date),
          location: $scope.drive.location,
          case: $scope.drive.case._id,
          backup_type: $scope.drive.backup_type,
          last_backup_dateackup: new Date($scope.drive.last_backup_date)
        };
      };
    }
  };
});
