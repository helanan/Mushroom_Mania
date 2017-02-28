"use strict";

app.controller("MushroomCtrl", function($scope, $location){
  $scope.welcome = "Welcome";
  $scope.showListView = true;

$scope.newMushroom = function(){
  console.log("you clicked on new mushroom");
  // $scope.showListView = false;
  $location.url("/mushrooms/new");
};

$scope.allMushroom = function(){
  console.log("you clicked on show all mushrooms");
  // $scope.showListView = true;
  $location.url("/mushrooms/list");
};

});
