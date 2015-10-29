angular.module("sanityWorksApp").controller("dashCtrl", function($scope, dashService, drives, locations, cases, $location) {

  // Initializing Variables
  $scope.tabOneActive = true;
  $scope.drives = drives;
  $scope.locations = locations;
  $scope.cases = cases;
  $scope.company = "5627f1255824b29105784cc8";
  $scope.currentBackupDrive = '';
  $scope.nextBackupDrive = '';

  // New Object Variables
  $scope.newDrive = {
    name: "",
    size: "",
    serial_number: "",
    purchase_date: new Date(),
    company: $scope.company,
    location: "",
    case: "",
    backing_up: false,
    backup_type: "",
    last_backup_date: new Date()
  };
  $scope.newCase = {
    name: "",
    company: $scope.company,
    location: "",
    drive: ""
  };
  $scope.newLocation = {
    name: "",
    nameShort: "",
    description: "",
    address: {
      lineOne: "",
      lineTwo: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    company: $scope.company
  };

  // Functions for clearing and reseting after saves and edits
  $scope.getNone = function(type) {
    if (type === 'drive') {
      for (i = 0; i < $scope.drives.length; i++) {
        if ($scope.drives[i].name === "None") {
          return $scope.drives[i]._id;
        }
      }
    } else if (type === 'case') {
      for (i = 0; i < $scope.cases.length; i++) {
        if ($scope.cases[i].name === "None") {
          return $scope.cases[i]._id;
        }
      }
    } else if (type === 'location') {
      for (i = 0; i < $scope.locations.length; i++) {
        if ($scope.locations[i].name === "None") {
          return $scope.locations[i]._id;
        }
      }
    }
  };
  $scope.clearNew = function() {
    $scope.newDrive = {
      name: "",
      size: "",
      serial_number: "",
      purchase_date: new Date(),
      company: $scope.company,
      location: $scope.getNone('location'),
      case: $scope.getNone('case'),
      backing_up: false,
      backup_type: "",
      last_backup_date: new Date()
    };
    $scope.newCase = {
      name: "",
      company: $scope.company,
      location: $scope.getNone('location'),
      drive: $scope.getNone('drive')
    };
    $scope.newLocation = {
      name: "",
      nameShort: "",
      description: "",
      address: {
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      company: $scope.company
    };
  };
  $scope.getCurrentBackup = function() {
    for (var i = 0; i < $scope.drives.length; i++) {
      if ($scope.drives[i].backing_up) {
        $scope.currentBackupDrive = $scope.drives[i];
      }
    }
  };
  $scope.getNextBackup = function() {
    $scope.nextBackupDrive = dashService.getNextBackup($scope.drives, $scope.getNone('drive'), $scope.currentBackupDrive._id);
  };
  $scope.refresh = function() {
    dashService.getDrives().then(function(response) {
      $scope.drives = response;
    });
    dashService.getCases().then(function(response) {
      $scope.cases = response;
    });
    dashService.getLocations().then(function(response) {
      $scope.locations = response;
    });
    $scope.getCurrentBackup();
    $scope.getNextBackup($scope.drives, $scope.getNone('drive'));
  };
  $scope.clearErrors = function() {
    $scope.nameError = false;
    $scope.serialNumberError = false;
  };
  $scope.toggleDialog = function() {
    $scope.dialog = !$scope.dialog;
    $scope.clearNew();
    $scope.clearErrors();
  };
  $scope.getCurrentBackup();
  $scope.getNextBackup($scope.drives, $scope.getNone('drive'));

  // Hide and show windows and Filter object lists
  $scope.dashShow = function() {
    $scope.tabOneActive = true;
    $scope.tabTwoActive = false;
    $scope.tabThreeActive = false;
    $scope.tabFourActive = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.drivesShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = true;
    $scope.tabThreeActive = false;
    $scope.tabFourActive = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.casesShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = false;
    $scope.tabThreeActive = true;
    $scope.tabFourActive = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.locationShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = false;
    $scope.tabThreeActive = false;
    $scope.tabFourActive = true;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };

  // Object Filters for none objects
  $scope.filterDrives = function(item) {
    if (item.name === 'None') {
      return false;
    }
    return true;
  };
  $scope.filterCases = function(item) {
    if (item.name === 'None') {
      return false;
    }
    return true;
  };
  $scope.filterLocations = function(item) {
    if (item.name === 'None') {
      return false;
    }
    return true;
  };

  // CRUD Drive Functions
  $scope.addDrive = function(drive) {
    $scope.clearErrors();

    // Check for unique values
    var nameError = dashService.checkDriveForNameMatch(drive.name, $scope.drives);
    var snError = dashService.checkDriveForSNMatch(drive.serial_number, $scope.drives);
    if (nameError || snError) {
      $scope.nameError = nameError;
      $scope.serialNumberError = snError;
      return;
    }

    // Check for collections that already have desired Case
    var driveSwap = dashService.checkForCaseMatch(drive.case, $scope.drives, $scope.getNone('case'), "");
    if (driveSwap.cancel === false && driveSwap.swap === true) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to add this drive?")) {
      if (driveSwap.swap) {
        dashService.editDrive(driveSwap.drive, {case: $scope.getNone('case'), location: $scope.getNone('location')}).then(function(response) {
        });
        dashService.addDrive(drive).then(function(response) {
          dashService.editCase(drive.case, {drive: response._id, location: drive.location}).then(function(response) {
          });
        });
      } else {
        dashService.addDrive(drive).then(function(response) {
          dashService.editCase(drive.case, {drive: response._id, location: drive.location}).then(function(response) {
          });
        });
      }
      $scope.refresh();
      $scope.toggleDialog();
    } else {
      return;
    }
  };
  $scope.editDrive = function(id, drive, oldCase) {
    // Check for collections that already have desired Case
    var driveSwap = dashService.checkForCaseMatch(drive.case, $scope.drives, $scope.getNone('case'), id);
    if (!driveSwap.cancel && drive.swap) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to edit this drive?")) {
      if (driveSwap.swap) {
        dashService.editDrive(driveSwap.drive, {case: $scope.getNone('case'), location: $scope.getNone('location')}).then(function(response) {
        });
        dashService.editDrive(id, drive).then(function(response) {
          dashService.editCase(oldCase, {drive: $scope.getNone('drive')}).then(function(response) {
          });
          dashService.editCase(drive.case, {drive: response._id, location: drive.location}).then(function(response) {
          });
          $scope.refresh();
        });
      } else {
        dashService.editDrive(id, drive).then(function(response) {
          dashService.editCase(oldCase, {drive: $scope.getNone('drive')}).then(function(response) {
          });
          dashService.editCase(drive.case, {drive: response._id, location: drive.location}).then(function(response) {
          });
          $scope.refresh();
        });
      }
    } else {
      return;
    }
  };
  $scope.deleteDrive = function(id, _case) {
    dashService.deleteDrive(id).then(function(response) {
      dashService.editCase(_case, {drive: $scope.getNone('drive')});
      $scope.refresh();
    });
  };

  // CRUD Case Functions
  $scope.addCase = function(newCase) {
    $scope.clearErrors();

    // Check for unique values
    if (dashService.checkCaseForNameMatch(newCase.name, $scope.cases)) {
      $scope.nameError = true;
      return;
    }

    // Check for collections that already have desired Case
    var caseSwap = dashService.checkForDriveMatch(newCase.drive, $scope.cases, $scope.getNone('case'), "");
    if (caseSwap.cancel === false && caseSwap.swap === true) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to add this case?")) {
      // Change old case to have no drive?
      if (caseSwap.swap) {
        dashService.editCase(caseSwap.case, {drive: $scope.getNone('drive'), location: $scope.getNone('location')}).then(function(response) {
        });
        dashService.addCase(newCase).then(function(response) {
          dashService.editDrive(newCase.drive, {case: response._id, location: newCase.location}).then(function(response) {
          });
          $scope.refresh();
        });
      } else {
        dashService.addCase(newCase).then(function(response) {
          dashService.editDrive(newCase.drive, {case: response._id, location: newCase.location}).then(function(response) {
          });
          $scope.refresh();
        });
      }
      $scope.toggleDialog();
    } else {
      return;
    }
  };
  $scope.editCase = function(id, _case, oldDrive) {

    // Check for collections that already have desired Case
    var caseSwap = dashService.checkForDriveMatch(_case.drive, $scope.cases, $scope.getNone('drive'), id);
    if (!caseSwap.cancel && caseSwap.swap) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to edit this case?")) {
      if (caseSwap.swap) {
        dashService.editCase(caseSwap.case, {drive: $scope.getNone('drive'), location: $scope.getNone('location')}).then(function(response) {
        });
        dashService.editCase(id, _case).then(function(response) {
          dashService.editDrive(oldDrive, {case: $scope.getNone('drive'), location: $scope.getNone('location')}).then(function(response) {
          });
          dashService.editDrive(_case.drive, {case: response._id, location: _case.location}).then(function(response) {
          });
          $scope.refresh();
        });
      } else {
        dashService.editCase(id, _case).then(function(response) {
          dashService.editDrive(oldDrive, {case: $scope.getNone('drive'), location: $scope.getNone('location')}).then(function(response) {
          });
          dashService.editDrive(_case.drive, {case: response._id, location: _case.location}).then(function(response) {
          });
          $scope.refresh();
        });
      }
    } else {
      return;
    }
  };
  $scope.deleteCase = function(id, drive) {
    dashService.deleteCase(id).then(function(response) {
      dashService.editDrive(drive, {case: $scope.getNone('case')});
      $scope.refresh();
    });
  };

  // CRUD Locations Functions
  $scope.addLocation = function(location) {
    var nameError = dashService.checkLocationForNameMatch(location.name, $scope.locations);
    var sNameError = dashService.checkLocationForSNameMatch(location.nameShort, $scope.locations);
    if (nameError || sNameError) {
      $scope.nameError = nameError;
      $scope.shortNameError = sNameError;
      return;
    }

    dashService.addLocation(location).then(function(response) {
      $scope.refresh();
    });
    $scope.toggleDialog();
  };
  $scope.editLocation = function(id, location) {
    dashService.editLocation(id, location).then(function(response) {
      $scope.refresh();
    });
  };
  $scope.deleteLocation = function(id) {
    dashService.deleteLocation(id).then(function(response) {
      for (var i = 0; i < $scope.drives.length - 1; i++) {
        if ($scope.drives[i].location._id === id) {
          dashService.editDrive($scope.drives[i]._id, {location: $scope.getNone('location')});
        }
      }
      for (var j = 0; j < $scope.cases.length; j++) {
        if ($scope.cases[j].location._id === id) {
          dashService.editCase($scope.cases[j]._id, {location: $scope.getNone('location')});
        }
      }
      $scope.refresh();
    });
  };

  $scope.swapBackupDrives = function() {
    dashService.editDrive($scope.currentBackupDrive._id, {backing_up: false});
    dashService.editDrive($scope.nextBackupDrive._id, {backing_up: true});
    $scope.refresh();
  };
});
