'use strict';

(() => {
    angular
        .module('app')
        .controller('game-event-controller', game_event_controller);

    game_event_controller.$inject = ['$scope', '$rootScope', '$location', 'GameEventService', 'ProfileService'];

    function game_event_controller($scope, $rootScope, $location, GameEventService, ProfileService) {
		// fetching is being implemented by other group member
		$scope.current_games = [
		{
			game_id: 1,
			name: "Game 1",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		},
		{
			game_id: 2,
			name: "Game 2",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		}
		];

		$scope.upcoming_games = [
		{
			game_id: 3,
			name: "Game 3",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		},
		{
			game_id: 4,
			name: "Game 4",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		},
		{
			game_id: 3,
			name: "Game 5",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		},
		{
			game_id: 4,
			name: "Game 6",
			game_starting_time_date: '2017-05-12',
			game_ending_time_date: '2017-03-13'
		},
		];


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

		$scope.edit_game_info = {};

		

		$scope.setup_edit_modal = (type, id) => {
			if (type === 'upcoming') {
				$scope.edit_game_info = $scope.upcoming_games[id];
			} else if (type === 'current') {
				$scope.edit_game_info = $scope.current_games[id];
			}
		}

		$scope.edit_game = () => {

			GameEventService.edit_game($scope.edit_game_info).then((err, data) => {
				console.log(err, data);
			});
		}

		$scope.add_game = () => {
			var data = {
				game_name: $scope.game_name,
				// game_start: $scope.game_start,
				// game_end: $scope.game_end,
				// account_id: $rootScope.profile.account_id
				game_starting_time_date: $('#datepicker1').val(),
				game_ending_time_date: $('#datepicker2').val(),
				account_id: 1
			};

			console.log($scope.game_starting_time_date);
			console.log(data);
			GameEventService.add_game(data).then((err, data) => {
				console.log(err, data);
			});
		}

        ProfileService
        .get_profile()
            .then((data) => {
            if (data[0].length != 0) {
                $scope.profile = data[0][0];
            }
        });

        $scope.view_sports = () => {
            $("#modal1").modal('close');
            window.location.href = "#!/sports";
        }

        $scope.view_profile = () => {
            window.location.href = "#!/profile";
        }

        $scope.view_user = () => {
            window.location.href = "#!/user";
        }

        $scope.logout = () => {
            window.location.href = "#!/";
        }

        $scope.view_registered_user = () => {
            $("#modal1").modal('close');
            window.location.href = "#!/registered-user";
        }

        $scope.view_sponsor = (game_id) => {
            $("#modal1").modal('close');
            window.location.href = "#!/sponsor/" + game_id;
        }

        $scope.back_to_home = () => {
            window.location.href = "#!/game-event";
        }
    }
})();
