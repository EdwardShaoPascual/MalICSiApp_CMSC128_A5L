'use strict';

(() => {
    angular
        .module('app')
        .controller('game-event-controller', game_event_controller);

    game_event_controller.$inject = ['$scope', '$rootScope','$location', 'GameEventService', 'ProfileService'];

    function game_event_controller($scope, $rootScope, $location, GameEventService, ProfileService) {
		// fetching is being implemented by other group member

		$scope.current_games = [
			{
				game_id: undefined,
				game_starting_time_date: undefined,
				game_ending_time_date: undefined,
				game_name: undefined
			},
			{
				game_id: undefined,
				game_starting_time_date: undefined,
				game_ending_time_date: undefined,
				game_name: undefined
			},
			{
				game_id: undefined,
				game_starting_time_date: undefined,
				game_ending_time_date: undefined,
				game_name: undefined
			}
		];

		$scope.upcoming_games = [
			{
				game_id: undefined,
				game_starting_time_date: undefined,
				game_ending_time_date: undefined,
				game_name: undefined
			}
		];

		$scope.view = {
				type: undefined,
				id: undefined
		}

		$scope.view_sponsor = () => {
            window.location.href=$scope.view.type == 'upcoming'? "#!/sponsor/" + $scope.upcoming[$scope.view.id].game_id : "#!/sponsor/" + $scope.current_games[$scope.view.id].game_id;
        	// window.location.reload();
        	//^temporary
        }
        $scope.view_sports = () => {
            window.location.href=$scope.view.type == 'upcoming'? "#!/sports/" + $scope.upcoming[$scope.view.id].game_id : "#!/sports/" + $scope.current_games[$scope.view.id].game_id;
            // window.location.reload();
            // ^temporary
        }

        $scope.view_setup = (id,type) =>{
        	console.log(id);

        	$scope.view.id = id;
        	$scope.view.type = type;
        }

        $scope.view_registered_user = () => {
            window.location.href=$scope.view.type == 'upcoming'? "#!/registered-user/" + $scope.upcoming[$scope.view.id].game_id : "#!/registered-user/" + $scope.current_games[$scope.view.id].game_id;
            window.location.reload();
            //^temporary
        }

		$scope.get_current_games = () => {
			GameEventService.get_current_games().then((data) => {
				$scope.current_games = data[0];
			});
		};

		$scope.get_upcoming_games = () => {
			GameEventService
			.get_upcoming_games()
			.then((data) => {
				$scope.upcoming_games = data[0];
			});
		}
		$scope.edit_game_info = {
				game_id: undefined,
				game_starting_time_date: undefined,
				game_ending_time_date: undefined,
				game_name: undefined
			};
		$scope.setup_edit_modal = (type, id) => {
			console.log(type, id);
			if (type === 'upcoming') {
				$scope.edit_game_info =JSON.parse(JSON.stringify($scope.upcoming_games[id]));
				console.log( $scope.edit_game_info);
			} else if (type === 'current') {
				$scope.edit_game_info =JSON.parse(JSON.stringify($scope.current_games[id]));
				console.log( $scope.edit_game_info);

			}
		}

		$scope.edit_game = () => {
			$scope.edit_game_info.game_starting_time_date = $scope.edit_game_info.game_starting_time_date.replace("Z", "");
			$scope.edit_game_info.game_ending_time_date = $scope.edit_game_info.game_ending_time_date.replace("Z", "");
			GameEventService.edit_game($scope.edit_game_info).then((err, data) => {
				console.log(err, data);
			});
		}

		$scope.add_game = () => {
			var data = {
				game_name: $scope.game_name,
				account_id: $rootScope.profile.account_id,
				game_starting_time_date: $('#datepicker1').val(),
				game_ending_time_date: $('#datepicker2').val()
			};

			if (data.game_name == "" ||
                data.game_starting_time_date == "" ||
                data.game_ending_time_date == "") {
                swal("Please fill up all fields");
            } else {
				GameEventService
				.add_game(data)
				.then(function(res){
					swal(res.message);
            	},function(err){
            		swal(res.error);
                	console.log(err);
            	})
			}

			$scope.game_name = "";
           	$('#datepicker1').val('');
           	$('#datepicker2').val('');
		}

		$scope.search_game = () =>{
			var data = {
				game_name: $scope.gameSearched
			}

			console.log(data);
            GameEventService
            .search_game(data)
            .then(function(res){
                $scope.allGames = res[0];
                console.log($scope.allGames);
            },function(err){
                console.log(err);
            })
        }

		$scope.delete_game = (type, id) => {
			swal({
			  title: "Are you sure?",
			  text: "You will not be able to recover the event!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: false
			},
			function(){
				if (type === 'upcoming') {
					GameEventService.delete_game({game_id:$scope.upcoming_games[id].game_id}).then((err, data) => {
						$scope.upcoming_games.splice(id, 1);
					});
				} else {
					GameEventService.delete_game({game_id:$scope.current_games[id].game_id}).then((err, data) => {
						$scope.current_games.splice(id, 1);
					});
				}
				Materialize.toast("Successfully deleted.", 4000, 'teal');
				swal("Deleted!", "Event has been deleted.", "success");
			});
		}
    }
})();
