"use strict";

app.controller("MushroomNewCtrl", function($scope, MushroomStorage, $location, AuthFactory){

let user = AuthFactory.getUser();

$scope.title = "Add A New Mushroom";
$scope.btnText = "Submit";

$scope.newMushroom = {
  name: "",
  description: "",
  edible: "",
  image: "",
  uid: user
};



$scope.addNewMushroom = function() {
  console.log("add new mushroom");
  MushroomStorage.postNewMushroom($scope.newMushroom)
  .then(function(response) {
    $location.url("/mushrooms/list");
  });
  $scope.newMushroom = {};
  };

});
