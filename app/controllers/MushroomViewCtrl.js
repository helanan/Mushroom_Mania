"use strict";

app.controller("MushroomViewCtrl", function ($scope, $routeParams, MushroomStorage, AuthFactory) {
  $scope.mushrooms = [];

  let user = AuthFactory.getUser();

  MushroomStorage.getMushroomList(user)
  .then(function(mushroomCollection) {
    $scope.mushrooms = mushroomCollection;

    $scope.selectedMushroom = $scope.mushrooms.filter(function(mushroom){
      return mushroom.id === $routeParams.mushroomId;
    })[0];
  });
});
