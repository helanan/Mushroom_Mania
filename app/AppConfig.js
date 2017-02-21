"use strict";
var app = angular.module("MushroomApp", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider.
  when('/mushrooms/list', {
    templateUrl: "partials/mushroom-list.html",
    controller: "MushroomListCtrl"
  }).
  otherwise('/');
});
