"use strict";

app.factory("MushroomStorage", ($q, $http, FBCreds) => {

  let getMushroomList = (user) => {
    let mushrooms = [];
    return $q((resolve, reject) => {
      // https://mushroomapp-c061b.firebaseio.com/mushrooms/1
      $http.get(`${FBCreds.databaseURL}/mushrooms.json`)
      .then((mushroomObject) => {
        let mushroomCollection = mushroomObject.data;
        Object.keys(mushroomCollection).forEach((key) => {
            mushroomCollection[key].id = key;
            mushrooms.push(mushroomCollection[key]);
        });
        resolve(mushrooms);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  let postNewMushroom = (newMushroom) => {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/mushrooms.json`,
        JSON.stringify(newMushroom))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  let deleteMushroom = (mushroomId) => {
            console.log("Delete in factory", mushroomId);
            return $q((resolve, reject) => {
                $http.delete(`${FBCreds.databaseURL}/mushrooms/${mushroomId}.json`).
                then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

  let getSingleMushroom = (mushroomId) => {
    return $q(function(resolve, reject){
      $http.get(`${FBCreds.databaseURL}/mushrooms/${mushroomId}.json`)
      .then(function(mushroomObject){
        resolve(mushroomObject.data);
      })
      .catch(function(error){
        reject(error);
      });
    });
  };

let updateMushroom = (mushroomId, editedMushroom) => {
  return $q(function(resolve,reject){
    $http.patch(`${FBCreds.databaseURL}/mushrooms/${mushroomId}.json`,
      angular.toJson(editedMushroom))
      .then(function(ObjectFromFirebase){
        resolve(ObjectFromFirebase);
      })
      .catch(function(error){
        reject(error);
      });
  });
};


  return {getMushroomList, postNewMushroom, deleteMushroom, getSingleMushroom, updateMushroom};

});
