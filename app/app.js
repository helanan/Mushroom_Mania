"use strict";

var app = angular.module("MushroomApp", ["ngRoute"]);

//used to authenticate user when navigating to other views
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
	AuthFactory.isAuthenticated()
	.then ( (userExists) => {
    console.log("userExists", userExists);
		if (userExists){
      console.log("Authenticated, go ahead.");
			resolve();
		}else {
      console.log("Authentication rejected, go away.");
			reject();
		}
	});
});

//run this right when the app loads
app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});

app.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'partials/login.html',
    controller: "UserCtrl"
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: "UserCtrl"
  }).
  when('/logout', {
    templateUrl: 'partials/login.html',
    controller: "UserCtrl"
  }).
  when('/mushrooms/list',{
    templateUrl: "partials/mushroom-list.html",
    controller: "MushroomListCtrl",
    resolve: {isAuth}
  }).
  when('/mushrooms/new', {
    templateUrl: "partials/mushroom-form.html",
    controller: "MushroomNewCtrl",
    resolve: {isAuth}
  }).
  when('/mushrooms/:mushroomId', {
    templateUrl: "partials/mushroom-details.html",
    controller: "MushroomViewCtrl",
    resolve: {isAuth}
  }).
  when('/mushrooms/:mushroomId/edit', {
    templateUrl: "partials/mushroom-form.html",
    controller: "MushroomEditCtrl",
    resolve: {isAuth}
  }).
  otherwise('/');
});
