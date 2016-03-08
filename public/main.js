angular.module('contactListApp', [])
  .controller('mainCtrl', function($scope, $http) {
    $scope.contacts = [];


    $scope.initialContacList = function() {
      $http({
        method: 'GET',
        url: '/contacts',
      }).then(function(res) {
        res.data.forEach(function(contact) {
          $scope.contacts.push(contact);
        });
        console.log('$scope.contacts:', $scope.contacts);
        console.log('res: ', res);
      }).then(function(err) {
        console.log('err: ', err);
      });
    };
    $scope.initialContacList();

    $scope.addContact = function() {
      var dataObject = { "name": $scope.name , "number": $scope.phone, "email": $scope.email };
      $http({
        method: 'POST',
        url: '/contacts',
        data: dataObject
      }).then(function(res) {
        $scope.contacts.push(res.config.data);
        console.log('res: ', res);
      }).then(function(err) {
        console.log('err: ', err);
      });
    }




  })
;
