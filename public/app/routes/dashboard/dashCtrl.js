angular.module("sanityWorksApp").controller("dashCtrl", function($scope, dashService, drives, locations, cases) {

  // Initializing Variables
  $scope.tabOneActive = true;
  $scope.drives = drives;
  $scope.locations = locations;
  $scope.cases = cases;
  $scope.company = "5627f1255824b29105784cc8";

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
    var driveSwap = dashService.checkForCaseMatch(drive.case, $scope.drives, $scope.getNone('case'));
    if (!driveSwap.cancel && drive.swap) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to add this drive?")) {
      if (driveSwap.swap) {
        dashService.editDrive(driveSwap.drive, {case: $scope.getNone('case')}).then(function(response) {
        });
        dashService.addDrive(drive).then(function(response) {
          dashService.editCase(drive.case, {drive: response._id}).then(function(response) {
          });
          $scope.refresh();
        });
      } else {
        dashService.addDrive(drive).then(function(response) {
          dashService.editCase(drive.case, {drive: response._id}).then(function(response) {
          });
          $scope.refresh();
        });
      }

      $scope.toggleDialog();
    } else {
      return;
    }
  };
  $scope.editDrive = function(id, drive) {
    dashService.editDrive(id, drive).then(function(response) {
      $scope.refresh();
    });
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
    var caseSwap = dashService.checkForDriveMatch(newCase.drive, $scope.cases, $scope.getNone('case'));
    if (!caseSwap.swap) {
      return;
    }

    // Confirm and Swap
    if (confirm("Are you sure you want to add this case?")) {
      if (caseSwap.swap) {
        dashService.editCase(caseSwap.case, {drive: $scope.getNone('drive')}).then(function(response) {
        });
        dashService.addCase(newCase).then(function(response) {
          dashService.editDrive(newCase.drive, {case: response._id}).then(function(response) {
          });
          $scope.refresh();
        });
      } else {
        dashService.addCase(newCase).then(function(response) {
          dashService.editDrive(_case.drive, {case: response._id}).then(function(response) {
          });
          $scope.refresh();
        });
      }
      $scope.toggleDialog();
    } else {
      return;
    }
  };
  $scope.editCase = function(id, _case) {
    dashService.editCase(id, _case).then(function(response) {
      $scope.refresh();
    });
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

});
