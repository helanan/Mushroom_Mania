"use strict";

app.controller("MushroomCtrl", function($scope, $location){
  $scope.welcome = "Welcome";
  $scope.showListView = true;

$scope.newMushroom = function(){
  console.log("you clicked on new mushroom");
  $location.url("/mushrooms/new");
};

$scope.allMushroom = function(){
  console.log("you clicked on show all mushrooms");
  $location.url("/mushrooms/list");
};

});
