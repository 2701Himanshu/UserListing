angular.module('starter.controller', [])

.controller('loginCtrl', function($scope, $state, dateService){
	$scope.user = {};
	$scope.login = function(){
		dateService.login($scope.user).then(
			data=> {
				window.localStorage.setItem('user', data.data);
				$state.go('home');
			},
			error=> {
				console.log(error);
				debugger;
			}
		);
	};	
})

.controller('homeCtrl', function($scope, $state, $rootScope, dateService){
	$scope.num = {};

	$scope.logout = function(){
		window.localStorage.clear();
		$state.go('login');
	};

	$scope.addNewUser = function(){
		var numEntry = [];
		var insertData = 0;
		var tempArray = Object.entries($scope.num);
		for(let i=0; i<5; i++){
			let val = tempArray[i];
			if(val != undefined){
				numEntry.push({time: val[0], number: val[1]});
			} else {
				numEntry.push({});
			}
		}

		dateService.getSavedData().then(
			function(data){
				data.data.map(item=>{
					if(item.date == $scope.getFormattedDate($scope.title)){
						insertData = 1;
						return;
					}
				});
				if(insertData == 0){
					dateService.submitDate({
						date: $scope.getFormattedDate($scope.title),
						numEntry: numEntry
					}).then(
						data=> {
							if(data.data.status == 401){
								alert(data.data.message);
								return;
							}
							if(data.data.result.ok == 1){
								alert('Data Successfully Inserted');
								$rootScope.$broadcast('refreshUserList', {});
								$('#addUser').modal('hide');
							}
						},
						error=> {
							console.log(error);
							debugger;
						}
					);
				} else {
					alert('Numbers Already Inserted Today.');
					$('#addUser').modal('hide');
				}
			},
			function(err){
				console.log(err);
				debugger;
			}
		);
	}

	let date = new Date();
	$scope.title = date;

	$scope.getFormattedDate = function(data){
		let date = new Date(data);
	    let year = date.getFullYear();
	    let month = date.getMonth() < 9 ? 0+''+date.getMonth() : date.getMonth();
	    let day = date.getDate() < 9 ? 0+''+date.getDate() : date.getDate();
	    return year+'-'+month+'-'+day;
	};
})

.controller('userListCtrl', function($scope, $rootScope, userServices, dateService){
	
	$scope.getUserList = function(){
		dateService.getSavedData().then(
			function(data){
				$scope.list = data.data;
				$scope.getDetail(data.data[0]._id);
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
		$scope.getUserList();
	});
})

.controller('userDetailCtrl', function($scope, $rootScope, dateService){
	$scope.dayDetails;
	$scope.$on('fetchDetail', function(event, args) {
		var dataToSend = {
			id: args
		};
		$scope.enableUserEditing(false);
		dateService.getDayDetails(dataToSend).then(
			function(data){
				$scope.dayDetails = data.data[0];
			},
			function(err){
				console.log(err);
				debugger;
			}
		);
	});

	$scope.editDetail = function(details){
		if(details._id === undefined){
			alert("Please select a user from list of the users.");
			return;
		};		
		if(document.getElementById('editBtn').textContent == "Save"){
			dateService.updateEntry(details).then(
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
	$scope.deleteEntry = function(id){
		if(id === undefined) alert("Please select a user from list of the users.");
		var dataToSend = {
			id: id
		}
		dateService.removeEntry(dataToSend).then(
			function(data){
				if(data.data.n != 0){
					alert("Entry Deleted Successfully.");
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
})

.filter('CustomDate', function(){
	return function(input) {
	    let date = new Date(input);
	    let year = date.getFullYear();
	    let month = date.getMonth() < 9 ? 0+''+date.getMonth() : date.getMonth();
	    let day = date.getDate() < 9 ? 0+''+date.getDate() : date.getDate();
	    return year+'-'+month+'-'+day;
	}
});