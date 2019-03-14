angular.module('starter.service', [])

.factory('userServices', function($http){
	var userID = "";
	return {
		addNewUser: function(data){
			return $http({
				url: '/users/insertUser',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			});
		},
		getUserList: function(){
			return $http({
				url: '/users',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		},
		getUserDetail: function(data){
			return $http({
				url: '/users/getUserDetail',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			});
		},
		removeAUser: function(data) {
			return $http({
				url: '/users/removeAUser',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			});
		},
		updateUser: function(data) {
			return $http({
				url: '/users/updateUser',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			});
		}
	}
})

.service('dateService', function($http){
	this.submitDate = function(data){
		return $http({
			url: '/submitDate',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
	};

	this.getSavedData = function(){
		return $http({
			url: '/getData',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	this.getDayDetails = function(data){
		return $http({
			url: '/getCurrentDayNumbers',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
	};

	this.removeEntry = function(data){
		return $http({
			url: '/removeEntry',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
	};

	this.updateEntry = function(data){
		return $http({
			url: '/updateEntry',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
	};

	this.login = function(data){
		return $http({
			url: '/login',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		});
	}
});