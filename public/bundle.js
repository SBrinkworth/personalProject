angular.module("sanityWorksApp", ['ngRoute'])

.constant("constants",
{
  "baseURL": "http://localhost:9852/"
})

.config(["$routeProvider", function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: './app/routes/home/homeTmpl.html',
    controller: 'homeCtrl'
  }).when('/login', {
    templateUrl: './app/routes/login/loginTmpl.html',
    controller: 'loginCtrl',
    resolve: {

    }
  }).when('/signup', {
    templateUrl: './app/routes/signup/signupTmpl.html',
    controller: 'signupCtrl'
  }).when('/dashboard', {
    templateUrl: './app/routes/dashboard/dashTmpl.html',
    controller: 'dashCtrl',
    resolve: {
      drives: ["dashService", function(dashService) {
        return dashService.getDrives().then(function(response) {
          return response;
        });
      }],
      locations: ["dashService", function(dashService) {
        return dashService.getLocations().then(function(response) {
          return response;
        });
      }],
      cases: ["dashService", function(dashService) {
        return dashService.getCases().then(function(response) {
          return response;
        });
      }]
    }
  }).when('/settings', {
    templateUrl: './app/routes/settings/settingsTmpl.html',
    controller: 'settingsCtrl'
  }).otherwise({
    redirectTo: '/login'
  });
}]);

angular.module("sanityWorksApp").controller("mainCtrl", ["$scope", function($scope) {

}]);

angular.module("sanityWorksApp").service("authService", ["$http", "constants", function($http, constants) {
  this.register = function(user) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'user',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'logout'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user'
    }).then(function(response) {
      return response.data;
    });
  };

  this.updateUser = function(user) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'user',
      data: user
    }).then(function(response) {
      return response.data;
    });
  };
}]);

angular.module("sanityWorksApp").service("dashService", ["$http", "constants", function($http, constants) {

  // Drive Crud Functions
  this.getDrives = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'drives'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addDrive = function(drive, driveSwap) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'drives',
      data: drive
    }).then(function(response) {
      return response.data;
    });
  };
  this.editDrive = function(id, drive) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'drives/' + id,
      data: drive
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteDrive = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'drives/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Location Crud Functions
  this.getLocations = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'locations'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addLocation = function(location) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'locations',
      data: location
    }).then(function(response) {
      return response.data;
    });
  };
  this.editLocation = function(id, location) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'locations/' + id,
      data: location
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteLocation = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'locations/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Case Crud Functions
  this.getCases = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'cases'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addCase = function(_case) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'cases',
      data: _case
    }).then(function(response) {
      return response.data;
    });
  };
  this.editCase = function(id, _case) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'cases/' + id,
      data: _case
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteCase = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'cases/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Check to see if drive swapping is needed
  this.checkForCaseMatch = function(_case, drives, none, drive) {
    var response = {
      swap: false
    };
    for (var i = 0; i < drives.length - 1; i++) {
      if (_case === drives[i].case._id && _case !== none && drive !== drives[i]._id) {
        response.drive = drives[i]._id;
        response.swap = true;
        response.cancel = confirm("The case you are trying to use is already in use. Are you sure you want to use this case? The other drive will be set to having no case.");
        return response;
      }
    }
    return response;
  };
  this.checkForDriveMatch = function(drive, cases, none, _case) {
    var response = {
      swap: false
    };
    for (var i = 0; i < cases.length - 1; i++) {
      if (drive === cases[i].drive._id && drive !== none && _case !== cases[i]._id) {
        response.case = cases[i]._id;
        response.swap = true;
        response.cancel = confirm("The drive you are trying to use is already in use. Are you sure you want to use this drive? The other case will be set to having no drive.");
        return response;
      }
    }
    return response;
  };

  // Check for field matches
  this.checkDriveForNameMatch = function(name, drives) {
    for (var i = 0; i < drives.length; i++) {
      if (name.toLowerCase() === drives[i].name.toLowerCase()) {
        return true;
      }
    }
  };
  this.checkDriveForSNMatch = function(sn, drives) {
    for (var i = 0; i < drives.length; i++) {
      if (sn.toLowerCase() === drives[i].serial_number.toLowerCase()) {
        return true;
      }
    }
  };
  this.checkCaseForNameMatch = function(name, cases) {
    for (var i = 0; i < cases.length; i++) {
      if (name.toLowerCase() === cases[i].name.toLowerCase()) {
        return true;
      }
    }
  };
  this.checkLocationForNameMatch = function(name, locations) {
    for (var i = 0; i < locations.length; i++) {
      if (name.toLowerCase() === locations[i].name.toLowerCase()) {
        return true;
      }
    }
  };
  this.checkLocationForSNameMatch = function(sname, locations) {
    for (var i = 0; i < locations.length; i++) {
      if (sname.toLowerCase() === locations[i].nameShort.toLowerCase()) {
        return true;
      }
    }
  };
  this.getNextBackup = function(drives, none, current) {
    var oldest = {
      drive: {},
      date: new Date()
    };
    var backup_type = "weekly";
    var lastOfMonth = new Date( oldest.date.getFullYear(), oldest.date.getMonth()+1, 0 );

    for (var i = 0; i < drives.length; i++) {
      if (new Date(drives[i].last_backup_date) < oldest.date && drives[i]._id !== none && drives[i]._id !== current) {
        oldest.drive = drives[i];
        oldest.date = new Date(drives[i].last_backup_date);
      }
    }
    return oldest.drive;
  };

}]);

angular.module("sanityWorksApp").service("mainService", ["$http", "constants", function($http, constants) {

}]);

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
    controller: ["$scope", "dashService", function($scope, dashService) {
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
    }]
  };
});

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
    controller: ["$scope", "dashService", function($scope, dashService) {
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
    }]
  };
});

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
    controller: ["$scope", function($scope) {
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
            id: $scope.location._id,
          });
        }
      };

      $scope.editLocation = function() {
        var tOF = confirm("Are you sure you want to edit this location?");
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
    }]
  };
});

angular.module("sanityWorksApp").controller("dashCtrl", ["$scope", "dashService", "drives", "locations", "cases", "$location", function($scope, dashService, drives, locations, cases, $location) {

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
}]);

angular.module("sanityWorksApp").controller("homeCtrl", ["$scope", function($scope) {

}]);

angular.module("sanityWorksApp").controller("loginCtrl", ["$scope", "$location", "authService", function($scope, $location, authService) {
  $scope.login = function(user) {
    console.log(user);
    authService.login(user).then(function(response) {
      console.log(response);
    });
  };
}]);

angular.module("sanityWorksApp").controller("settingsCtrl", ["$scope", function($scope) {

}]);

angular.module("sanityWorksApp").controller("signupCtrl", ["$scope", "authService", "$location", function($scope, authService, $location) {

  $scope.signup = function(user) {
    if (user.password === $scope.password_repeat) {
      authService.register(user).then(function(response) {
        console.log(response);
      });
    }
    else {
      alert('Passwords do not match');
    }
  };
}]);
