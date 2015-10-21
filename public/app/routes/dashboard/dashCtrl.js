angular.module("sanityWorksApp").controller("dashCtrl", function($scope, dashService, drives, locations, cases) {

  // Initializing Variables
  $scope.tabOneActive = true;
  $scope.tabTwoActive = false;
  $scope.tabThreeActive = false;
  $scope.tabFourActive = false;
  $scope.showDash = true;
  $scope.drives = drives;
  $scope.locations = locations;
  $scope.cases = cases;
  $scope.company = "5627f1255824b29105784cc8";

  // New Object Functions and Variables
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
    $scope.showDash = true;
    $scope.showDrives = false;
    $scope.showCases = false;
    $scope.showLocations = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.drivesShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = true;
    $scope.tabThreeActive = false;
    $scope.tabFourActive = false;
    $scope.showDash = false;
    $scope.showDrives = true;
    $scope.showCases = false;
    $scope.showLocations = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.casesShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = false;
    $scope.tabThreeActive = true;
    $scope.tabFourActive = false;
    $scope.showDash = false;
    $scope.showDrives = false;
    $scope.showCases = true;
    $scope.showLocations = false;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
  $scope.locationShow = function() {
    $scope.tabOneActive = false;
    $scope.tabTwoActive = false;
    $scope.tabThreeActive = false;
    $scope.tabFourActive = true;
    $scope.showDash = false;
    $scope.showDrives = false;
    $scope.showCases = false;
    $scope.showLocations = true;
    if ($scope.dialog) {
      $scope.toggleDialog();
    }
  };
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
    var tOF = false;
    var inUseCase = false;
    var errors = false;
    for (var i = 0; i < $scope.drives.length; i++) {
      if (drive.name === $scope.drives[i].name) {
        $scope.nameError = true;
        errors = true;
      }
      if (drive.serial_number === $scope.drives[i].serial_number) {
        $scope.serialNumberError = true;
        errors = true;
      }
    }
    if (errors) {
      return;
    }
    for (var i = 0; i < $scope.drives.length; i++) {
      if ($scope.drives[i].case._id === drive.case) {
        if (drive.case !== $scope.getNone('case')) {
          inUseCase = confirm("There is another drive that is already using this case. Are you sure you want to use this case? The other drive will have no case.");
        }
      }
    }
    tOF = confirm("Are you sure you want to add this drive?");
    if (tOF) {
      if (inUseCase) {
        dashService.editDrive($scope.drives[i]._id, {case: $scope.getNone('drive')}).then(function(response) {
        });
        dashService.editCase($scope.drives[i].case._id, {drive: drive.case}).then(function(response) {
        });
      } else {
        return;
      }

      dashService.addDrive(drive).then(function(response) {
        $scope.refresh();
      });
      $scope.toggleDialog();
    }
  };
  $scope.editDrive = function(id, drive) {
    dashService.editDrive(id, drive).then(function(response) {
      $scope.refresh();
    });
  };
  $scope.deleteDrive = function(id) {
    dashService.deleteDrive(id).then(function(response) {
      $scope.refresh();
    });
  };

  // CRUD Case Functions
  $scope.addCase = function(_case) {
    $scope.clearErrors();
    var errors = false;
    for (var i = 0; i < cases.length; i++) {
      if (_case.name === cases[i].name) {
        $scope.nameError = true;
        errors = true;
      }
    }
    if (errors) {
      return;
    }
    var tOF = confirm("Are you sure you want to add this case?");
    if (tOF) {
      dashService.addCase(_case).then(function(response) {
        $scope.refresh();
      });
      $scope.toggleDialog();
    }
  };
  $scope.editCase = function(id, _case) {
    dashService.editCase(id, _case).then(function(response) {
      $scope.refresh();
    });
  };
  $scope.deleteCase = function(id) {
    dashService.deleteCase(id).then(function(response) {
      $scope.refresh();
    });
  };

  // CRUD Locations Functions
  $scope.addLocation = function(location) {
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
      $scope.refresh();
    });
  };


});
