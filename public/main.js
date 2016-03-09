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
      }).then(function(err) {
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
      }).then(function(err) {
      });
    };

    $scope.deleteContact = function() {
      var theIndex = this.$index;
      $scope.contacts.splice(theIndex, 1);

      $http({
        method: 'DELETE',
        url: `/contacts/${theIndex}`
      }).then(function(res) {
        console.log('res: ', res);
      },function(err) {
        console.log('err on DELETE');
      });

    }




  })
;
