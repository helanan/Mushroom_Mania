"use strict";

app.controller("MushroomEditCtrl", function($scope, $location, $routeParams, MushroomStorage){
  $scope.title = "Edit Mushroom";
  $scope.btnText = "Update";
  $scope.newTask = {};

  MushroomStorage.getSingleMushroom($routeParams.mushroomId)
  .then(function successCallback(response){
     console.log("getSingleMushroomresponse", response);
      $scope.newMushroom = response;
  });

  $scope.addNewMushroom = function(){
    MushroomStorage.updateMushroom($routeParams.mushroomId, $scope.newMushroom)
    .then(function successCallback(response) {
      console.log(response);
      $location.url("/mushrooms/list");
    });
  };
});
