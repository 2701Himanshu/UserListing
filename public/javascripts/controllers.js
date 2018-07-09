angular.module('starter.controller', [])

.controller('homeCtrl', function($scope, $rootScope, userServices){
	$scope.user = {};
	$scope.addNewUser = function(){
		console.log($scope.user);
		userServices.addNewUser($scope.user).then(
			function(data){
				if(data.data.status == "102") {
					alert(data.data.msg);
					$('#addUser').modal('hide');
					return;
				}
				if(data.data.result.n != 0) {
					alert('User successfully added into DB.');
					$('#addUser').modal('hide');
					setTimeout(function(){
						$rootScope.$broadcast('refreshUserList', {});
					},500);
				}
			},
			function(err){
				console.log(err);
				debugger;
			}
		);
	}
})

.controller('userListCtrl', function($scope, $rootScope, userServices){
	
	$scope.getUserList = function(){
		userServices.getUserList().then(
			function(data){
				$scope.list = data.data;
			},
			function(err){
				console.log(err);
				debugger;
			}
		);
	};
	$scope.getUserList();

	$scope.getDetail = function(id){
		$rootScope.$broadcast('fetchDetail', id);
	};

	$scope.$on('refreshUserList', function(event, args) {
		debugger;
		$scope.getUserList();
	});
})

.controller('userDetailCtrl', function($scope, $rootScope, userServices){
	$scope.$on('fetchDetail', function(event, args) {
		var dataToSend = {
			id: args
		};
		$scope.enableUserEditing(false);
		userServices.getUserDetail(dataToSend).then(
			function(data){
				$scope.userDetail = data.data[0]
			},
			function(err){
				console.log(err);
				debugger;
			}
		);
	});

	$scope.editUserDetail = function(id){
		if(id === undefined){
			alert("Please select a user from list of the users.");
			return;
		};		
		if(document.getElementById('editBtn').textContent == "Save"){
			userServices.updateUser($scope.userDetail).then(
				function(data){
					if(data.data.nModified != 0) {
						$scope.enableUserEditing(false);
						alert("Data updated successfully.");
						$rootScope.$broadcast('refreshUserList', {});
					}
				},
				function(err){
					console.log(err);
					debugger;
				}
			);
		} else {
			$scope.enableUserEditing(true);
		}
	};
	$scope.deleteUser = function(id){
		if(id === undefined) alert("Please select a user from list of the users.");
		var dataToSend = {
			id: id
		}
		userServices.removeAUser(dataToSend).then(
			function(data){
				if(data.data.n != 0){
					alert("User deleted successfully.");
					$rootScope.$broadcast('refreshUserList', {});
				}
			},
			function(err){
				console.log(err);
				debugger;
			} 
		);
	};
	$scope.enableUserEditing = function(status){
		if(status){
			$scope.editUserBtn = status;
			document.getElementById('editBtn').textContent = "Save";
		} else {
			$scope.editUserBtn = status;
			document.getElementById('editBtn').textContent = "Edit";
		}
	}
});