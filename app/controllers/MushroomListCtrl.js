"use strict";

app.controller("MushroomListCtrl", function($scope, MushroomStorage, SearchTermData, AuthFactory){

  $scope.searchText = SearchTermData;
  let user = AuthFactory.getUser();

  MushroomStorage.getMushroomList(user)
  .then(function(mushroomCollection){
    $scope.mushrooms = mushroomCollection;
  });

$scope.mushroomDelete = function(mushroomId){
  console.log("delete this mushroom", mushroomId);
  MushroomStorage.deleteMushroom(mushroomId)
  .then(function(response){
    MushroomStorage.getMushroomList(user).then(function(mushroomCollection){
      $scope.mushrooms = mushroomCollection;
      console.log("mushroom collection", mushroomCollection);
    });
  });
  };
  $scope.inputChange = function(mushroom){
      MushroomStorage.updateCompletedStatus(mushroom)
          .then(function(response){
              console.log(response);
          });
        };
});
