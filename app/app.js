"use strict";
var app = angular.module("MushroomApp", ["ngRoute"]);

// config
var config = {
	 apiKey: "AIzaSyDEMzF_VuXuAK-M-41vP02gHn0j8h4p3uE",
	 authDomain: "mushroomapp-c061b.firebaseapp.com",
	 databaseURL: "https://mushroomapp-c061b.firebaseio.com",
	 storageBucket: "mushroomapp-c061b.appspot.com",
	 messagingSenderId: "261402509639"
 };
 firebase.initializeApp(config);
console.log("app loaded");

// initialize database
var database = firebase.database();
console.log("database loaded");

//write mushroom data object
function writeMushroomData(shroomId, shroomName, shroomEdible, shroomImg, shroomDescrip) {
var postMushroom =
{
			uid: shroomId,
			mushroom_name: shroomName,
	    email: shroomEdible,
	    img : shroomImg,
			description: shroomDescrip
};

// Get a key for a new Post.
var newMushroomKey = firebase.database().ref().child('mushrooms').push().key;
console.log("newMushroomKey", newMushroomKey);

//update specific fields
var updates = {};
  updates['/mushrooms/' + newMushroomKey] = postMushroom;
  updates['/user-mushrooms/' + shroomId + '/' + newMushroomKey] = postMushroom;

  return firebase.database().ref().update(updates);

}

//add-new-mushroom.html
var mushroomForm = document.getElementById('mushroom-form');
console.log("mushroomForm", mushroomForm);
var mushroomInput = document.getElementById('new-mushroom-message');
console.log("mushroomInput", mushroomInput);
var titleInput = document.getElementById('new-mushroom-title');
console.log("titleInput", titleInput);
var signInButton = document.getElementById('sign-in-button');
console.log("signInButton", signInButton);
var signOutButton = document.getElementById('sign-out-button');
console.log("signOutButton", signOutButton);
var mushroomPage = document.getElementById('mushroom-page');
console.log("mushroomPage", mushroomPage);
var addMushroom = document.getElementById('add-mushroom');
console.log("addMushroom", addMushroom);
var addButton = document.getElementById('add');
console.log("addButton", addButton);
var userMushroomsSection = document.getElementById('user-mushrooms-list');
console.log("userMushroomsSection", userMushroomsSection);
var listeningFirebaseRefs = [];
console.log("listeningFirebaseRefs", listeningFirebaseRefs);

//view-my-mushrooms.html
var searchMushrooms = document.getElementById('search-mushrooms');
console.log("searchMushrooms", searchMushrooms);
var searchInput = document.getElementById('search-my-mushrooms');
console.log("searchInput", searchInput);
var searchButton = document.getElementById('search');
console.log("searchButton", searchButton);
var displayMushroom = document.getElementById('mushroom-display');
console.log("displayMushroom", displayMushroom);
var displayAllMushrooms = document.getElementById('all-mushrooms-list');
console.log("displayAllMushrooms", displayAllMushrooms);




// app.run(($location, FBCreds) => {
// 	let creds = FBCreds;
// 	let authConfig = {
// 		apiKey: creds.apiKey,
// 		authDomain: creds.authDomain
// 	};
// 	firebase.initializeApp(authConfig);
// 	console.log("app initialized");
// });
//
// app.config(function($routeProvider){
//   $routeProvider.
//   when('/', {
//     templateUrl: 'partials/mushroom-list.html',
//     controller: "MushroomListCtrl"
//   }).
//   when('/mushrooms/:mushroomId', {
//     templateUrl: "partials/mushroom-details.html",
//     controller: "MushroomViewCtrl",
//   }).
//   otherwise('/');
// });
