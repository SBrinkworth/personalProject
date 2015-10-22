angular.module("sanityWorksApp").service("dashService", function($http) {
  var baseUrl = 'http://localhost:8080/';

  // Drive Crud Functions
  this.getDrives = function() {
    return $http({
      method: 'GET',
      url: baseUrl + 'drives'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addDrive = function(drive, driveSwap) {
    return $http({
      method: 'POST',
      url: baseUrl + 'drives',
      data: drive
    }).then(function(response) {
      return response.data;
    });
  };
  this.editDrive = function(id, drive) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'drives/' + id,
      data: drive
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteDrive = function(id) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'drives/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Location Crud Functions
  this.getLocations = function() {
    return $http({
      method: 'GET',
      url: baseUrl + 'locations'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addLocation = function(location) {
    return $http({
      method: 'POST',
      url: baseUrl + 'locations',
      data: location
    }).then(function(response) {
      return response.data;
    });
  };
  this.editLocation = function(id, location) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'locations/' + id,
      data: location
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteLocation = function(id) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'locations/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Case Crud Functions
  this.getCases = function() {
    return $http({
      method: 'GET',
      url: baseUrl + 'cases'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addCase = function(_case) {
    return $http({
      method: 'POST',
      url: baseUrl + 'cases',
      data: _case
    }).then(function(response) {
      return response.data;
    });
  };
  this.editCase = function(id, _case) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'cases/' + id,
      data: _case
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteCase = function(id) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'cases/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // Check to see if drive swapping is needed
  this.checkForCaseMatch = function(_case, drives, none) {
    var response = {
      swap: false
    };
    for (var i = 0; i < drives.length - 1; i++) {
      if (_case === drives[i].case._id && _case !== none) {
        response.drive = drives[i]._id;
        response.swap = true;
        response.cancel = confirm("The case you are trying to use is already in use. Are you sure you want to use this case? The other drive will be set to having no case.");
        return response;
      }
    }
    return response;
  };
  this.checkForDriveMatch = function(drive, cases, none) {
    var response = {
      swap: false
    };
    for (var i = 0; i < cases.length - 1; i++) {
      if (drive === cases[i].drive._id && drive !== none) {
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

});
