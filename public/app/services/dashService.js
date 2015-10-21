angular.module("sanityWorksApp").service("dashService", function($http) {
  var baseUrl = 'http://localhost:8080/';

  this.drives = [{
    name: 'Drive 1',
    size: "2 TB",
    serial_number: "123456789",
    purchase_date: new Date('December 17, 1995 03:24:00'),
    location: 12345,
    case: 12345,
    backing_up: true,
    backup_type: 2,
    last_backup_date: new Date(),
    _id: 51447
  }, {
    name: 'Drive 2',
    size: '3 TB',
    serial_number: 0987654321,
    purchase_date: new Date(),
    location: 67890,
    case: 67890,
    backing_up: false,
    backup_type: 1,
    last_backup_date: new Date(),
    _id: 47200
  }];

  this.locations = [{
    name: 'Office',
    nameShort: 'Off',
    description: 'The office where the company stores the backup drives',
    address: {
      lineOne: '677 S 1850 E',
      lineTwo: '',
      city: 'Spanish Fork',
      state: 'UT',
      zip: '84660',
      country: 'USA'
    },
    _id: "12345"
  }, {
    name: 'Home',
    nameShort: 'Home',
    description: 'My House',
    address: {
      lineOne: '677 S 1850 E',
      lineTwo: '',
      city: 'Spanish Fork',
      state: 'UT',
      zip: '84660',
      country: 'USA'
    },
    _id: "67890"
  }];

  this.cases = [{
    name: 'Case01',
    drive: 51447,
    location: 12345,
    _id: 12345
  }, {
    name: 'Case02',
    drive: 47200,
    location: 67890,
    _id: 67890
  }];

  this.getDrives = function() {
    return $http({
      method: 'GET',
      url: baseUrl + 'drives'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addDrive = function(drive) {
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


});
