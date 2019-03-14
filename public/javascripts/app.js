angular.module('starter', ['ui.router', 'starter.controller', 'starter.service'])

.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider

  .state('home', {
      url: '/home',
      views: {
      	'': { 
      		templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
      	},
      	'userList@home': {
      		templateUrl: 'templates/userList.html',
      		controller: 'userListCtrl'
      	},
      	'userDetail@home': {
      		templateUrl: 'templates/userDetail.html',
      		controller: 'userDetailCtrl'
      	}
      }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  $urlRouterProvider.otherwise('/login');
});