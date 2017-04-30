'use strict';

(() => {
  angular
  .module('app')
  .controller('participant-controller', participant_controller);

  function participant_controller($scope, $window, $location, $routeParams, $interval, SportsService, ParticipantService) {

    var gameid = $routeParams.game_id;
    $scope.sports = [
    ];
    $scope.sport = "All Sports";
    $scope.selected = 0;
    $scope.selected_sport = {};
    $scope.participants = [];

    $scope.change_view = (view) => {
      window.location.href= view + gameid;
    }

    $scope.view_profile = () => {
      window.location.href="#!/profile";
    }
    $scope.view_user = () => {
      window.location.href="#!/user";
    }

    $scope.logout = () => {
      window.location.href="#!/";
    }

    $scope.back_to_home = () => {
      window.location.href="#!/game-event";
    }

    // $scope.go_to_profile = (data) => {
    //   window.location.href="#!/profile"
    // }

    $scope.get_sports = () => {
      let data = {
        game_id : gameid
      }
      let ret_sport = [];
      SportsService
      .get_sports_game(data).
      then(function(res) {
        res.data[0].forEach(function(element){
          let obj2 = {
            sport_id: element.sport_id,
            sport_type: element.sport_type,
            division: element.division,
          };
          ret_sport.push(obj2);
        });
        $scope.sports = ret_sport;
      }, function(err) {
        console.log(err);
      });
    }

    var check_duplicates = (arr, element) => {
      let duplicate_found = false;
      arr.forEach(function(item) {
        if (item.account_id == element.account_id) {
          duplicate_found = true;
        }
      });
      return duplicate_found;
    }

    $scope.load_participants = () => {
      ParticipantService
        .get_participants(gameid)
        .then((data) => {
          if (data[0].length != 0) {
            $scope.participants = data[0];
          }
        });
    }
  }
})();
