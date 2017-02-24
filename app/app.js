"use strict";
var app = angular.module("MushroomApp", ["ngRoute"]);

//text data
app.controller('MushroomListCtrl', function MushroomListCtrl($scope) {

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

//write mushroom data object
function writeNewMushroom(uid, shroomName, shroomEdible, shroomImg, shroomDescrip) {
var postMushroom =
{
			uid: uid,
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
  updates['/user-mushrooms/' + uid + '/' + newMushroomKey] = postMushroom;

  return firebase.database().ref().update(updates);

}

function createMushroomElement(mushroomId, shroomName, shroomEdible, shroomImg, shroomDescrip) {
	var uid = firebase.auth().currentUser.uid;

	var html =
	'<div class="mushroom mushroom-' + mushroomId + ' mdl-cell mdl-cell--12-col ' +
							'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
		'<div class="mdl-card mdl-shadow--2dp">' +
			'<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
				'<h4 class="mdl-card__title-text"></h4>' +
			'</div>' +
			'<div class="header">' +
				'<div>' +
					'<div class="avatar"></div>' +
					'<div class="username mdl-color-text--black"></div>' +
				'</div>' +
			'</div>' +
			'<span class="star">' +
				'<div class="not-starred material-icons">star_border</div>' +
				'<div class="starred material-icons">star</div>' +
				'<div class="star-count">0</div>' +
			'</span>' +
			'<div class="text"></div>' +
			'<div class="comments-container"></div>' +
			'<form class="add-comment" action="#">' +
				'<div class="mdl-textfield mdl-js-textfield">' +
					'<input class="mdl-textfield__input new-comment" type="text">' +
					'<label class="mdl-textfield__label">Comment...</label>' +
				'</div>' +
			'</form>' +
		'</div>' +
	'</div>';

	  // Create the DOM element from the HTML.
var div = document.createElement('div');
div.innerHTML = html;
var postElement = div.firstChild;

var addMushroomForm = postElement.getElementByClassName('add-mushroom')[0];
var commentInput = postElement.getElementsByClassName('new-comment')[0];

//set values
postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = shroomName;
postElement.getElementsByClassName('username')[0].innerText = shroomDescrip || 'Edible';
postElement.getElementsByClassName('avatar')[0].style.backgroundImage = 'url("' +
      (shroomImg || './silhouette.jpg') + '")';

return postElement;

}

function startDatabaseQueries() {
	  var myUserId = firebase.auth().currentUser.uid;
		var userMushroomsRef = firebase.database().ref('user-mushrooms/' + myUserId);

		var fetchMushrooms = function(mushroomsRef, sectionElement) {
			mushroomsRef.on('child_added', function(data) {
			var name = data.val().name || 'Anonymous';
			var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
			containerElement.insertBefore(
          createMushroomElement(data.key, data.val().name, data.val().edible, data.val().uid, data.val().shroomImg, data.val().shroomDescrip),
          containerElement.firstChild);
});
};

fetchMushrooms(userMushroomsRef, userMushroomsSection);
 listeningFirebaseRefs.push(userMushroomsRef);
}

function writeUserData(shroomId, name, email, shroomImg) {
  firebase.database().ref('users/' + shroomId).set({
    username: name,
    email: email,
    mushroom_image : shroomImg
  });
}

function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && shroomId === user.uid) {
    return;
  }
	addButton.onclick = function() {
     showSection(addPost);
     messageInput.value = '';
     titleInput.value = '';
   };
}
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

});
